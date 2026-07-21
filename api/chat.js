// api/chat.js
//
// Secure backend proxy for the Hashir Automations chatbot.
//
// This is a Vercel Serverless Function. It receives the user's message
// and chat history from the client, attaches the system prompt, and
// forwards everything to the Google AI Studio (Gemini) API using an
// API key that is only ever read from a server-side environment
// variable — it is never sent to or exposed in the browser.
//
// ------------------------------------------------------------------
// SETUP: Environment variable
// ------------------------------------------------------------------
// In your Vercel project:
//   1. Go to Project Settings -> Environment Variables.
//   2. Add a variable named GEMINI_API_KEY with your Google AI Studio
//      API key as the value.
//   3. Apply it to Production (and Preview/Development if needed) and
//      redeploy.
// Never commit the key to source control or hardcode it here.
// ------------------------------------------------------------------

const GEMINI_MODEL = "gemini-2.0-flash";
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

const CHATBOT_SYSTEM_PROMPT =
  "You are Hashir's Automation Assistant. You help visitors understand how automation can save them time and money. Be professional, technical, and encourage them to book a free audit.";

// Simple allowlist for CORS. Set this to your actual frontend domain(s),
// or leave as "*" while testing if the API and frontend are on different
// origins during development.
const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN || "*";

function setCorsHeaders(res) {
  res.setHeader("Access-Control-Allow-Origin", ALLOWED_ORIGIN);
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
}

export default async function handler(req, res) {
  setCorsHeaders(res);

  // Preflight
  if (req.method === "OPTIONS") {
    res.status(204).end();
    return;
  }

  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error("GEMINI_API_KEY is not set in the environment.");
    res.status(500).json({ error: "Server is not configured correctly." });
    return;
  }

  try {
    const { message, history } = req.body || {};

    if (!message || typeof message !== "string") {
      res.status(400).json({ error: "Missing or invalid 'message' field." });
      return;
    }

    // History is optional; if provided it should be an array of
    // { role: 'user' | 'model', text: string } entries, mirroring the
    // client's message state. Fall back to just the current message.
    const conversation =
      Array.isArray(history) && history.length > 0
        ? history
        : [{ role: "user", text: message }];

    // Basic shape validation so a malformed client payload can't crash
    // the function or get forwarded to Gemini as garbage.
    const contents = conversation
      .filter(
        (m) =>
          m &&
          (m.role === "user" || m.role === "model") &&
          typeof m.text === "string"
      )
      .map((m) => ({
        role: m.role,
        parts: [{ text: m.text }],
      }));

    if (contents.length === 0) {
      res.status(400).json({ error: "No valid conversation history provided." });
      return;
    }

    const geminiResponse = await fetch(`${GEMINI_URL}?key=${apiKey}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        system_instruction: { parts: [{ text: CHATBOT_SYSTEM_PROMPT }] },
        contents,
      }),
    });

    if (!geminiResponse.ok) {
      const errorText = await geminiResponse.text().catch(() => "");
      console.error(
        `Gemini API error: ${geminiResponse.status} ${errorText}`
      );
      res.status(502).json({
        error: "The assistant is temporarily unavailable. Please try again.",
      });
      return;
    }

    const data = await geminiResponse.json();
    const reply =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Sorry, I couldn't generate a response just now.";

    res.status(200).json({ reply });
  } catch (err) {
    console.error("Unexpected error in /api/chat:", err);
    res.status(500).json({ error: "Something went wrong. Please try again." });
  }
};
