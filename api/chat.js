// api/chat.js
// Secure backend proxy for the Hashir Automations chatbot.

const GEMINI_MODEL = "gemini-1.5-flash";
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

const CHATBOT_SYSTEM_PROMPT =
  "You are Hashir's Automation Assistant. You help visitors understand how automation can save them time and money. Be professional, technical, and encourage them to book a free audit.";

const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN || "*";

function setCorsHeaders(res) {
  res.setHeader("Access-Control-Allow-Origin", ALLOWED_ORIGIN);
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
}

export default async function handler(req, res) {
  setCorsHeaders(res);

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
    console.error("GEMINI_API_KEY is not set in environment.");
    res.status(500).json({ error: "Server is not configured correctly." });
    return;
  }

  try {
    const { message, history } = req.body || {};

    if (!message || typeof message !== "string") {
      res.status(400).json({ error: "Missing or invalid 'message' field." });
      return;
    }

    // Keep context capped to the last 6 messages to keep token usage low
    const rawHistory = Array.isArray(history) && history.length > 0
      ? history.slice(-6)
      : [{ role: "user", text: message }];

    const contents = rawHistory
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
      console.error(`Gemini API error ${geminiResponse.status}:`, errorText);

      if (geminiResponse.status === 429) {
        res.status(429).json({
          error: "The assistant is currently receiving heavy traffic. Please wait a moment and try again.",
        });
        return;
      }

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
}