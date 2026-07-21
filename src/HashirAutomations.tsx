import React, { useState, useRef, useEffect } from "react";
import {
  Zap,
  Bot,
  Wrench,
  MessageSquareText,
  ArrowRight,
  ArrowUpRight,
  Sparkles,
  Send,
  Loader2,
  Check,
  Menu,
  X,
  Mail,
  Workflow,
  Cpu,
  Clock,
  DollarSign,
  ChevronRight,
  Table2,
  Webhook,
  FolderInput,
  BrainCircuit,
  MailCheck,
  MessageCircle,
  ShieldCheck,
  User,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Design tokens & dynamic CSS                                       */
/* ------------------------------------------------------------------ */
const FONT_IMPORT = `
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500;700&display=swap');

.font-display { font-family: 'Space Grotesk', sans-serif; }
.font-body { font-family: 'Inter', sans-serif; }
.font-mono { font-family: 'JetBrains Mono', monospace; }

@keyframes hashir-flow {
  0% { transform: translateY(-6%); opacity: 0; }
  10% { opacity: 1; }
  90% { opacity: 1; }
  100% { transform: translateY(106%); opacity: 0; }
}
@keyframes hashir-marquee {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
@keyframes hashir-pulse-ring {
  0% { box-shadow: 0 0 0 0 rgba(139, 92, 246, 0.45); }
  100% { box-shadow: 0 0 0 14px rgba(139, 92, 246, 0); }
}
@keyframes hashir-fade-up {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
.hashir-animate-in { animation: hashir-fade-up 0.5s ease both; }

@media (prefers-reduced-motion: reduce) {
  .hashir-reduce-motion, .hashir-reduce-motion * {
    animation-duration: 0.001ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.001ms !important;
  }
}

input[type="range"].hashir-slider {
  -webkit-appearance: none;
  appearance: none;
  height: 6px;
  border-radius: 9999px;
  background: linear-gradient(90deg, #8b5cf6 var(--fill, 50%), #1e293b var(--fill, 50%));
  outline: none;
}
input[type="range"].hashir-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 9999px;
  background: #f8fafc;
  border: 3px solid #8b5cf6;
  box-shadow: 0 0 12px rgba(139, 92, 246, 0.8);
  cursor: pointer;
  margin-top: -0.5px;
}
input[type="range"].hashir-slider::-moz-range-thumb {
  width: 20px;
  height: 20px;
  border-radius: 9999px;
  background: #f8fafc;
  border: 3px solid #8b5cf6;
  box-shadow: 0 0 12px rgba(139, 92, 246, 0.8);
  cursor: pointer;
}
`;

/* ------------------------------------------------------------------ */
/*  Reusable Components                                               */
/* ------------------------------------------------------------------ */

function GlassPanel({ className = "", children, style }: { className?: string; children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div
      className={`rounded-2xl border border-slate-800 bg-slate-900/40 backdrop-blur-xl ${className}`}
      style={style}
    >
      {children}
    </div>
  );
}

function GlowButton({ children, variant = "primary", className = "", ...props }: any) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold font-body transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950";
  if (variant === "primary") {
    return (
      <button
        className={`${base} bg-gradient-to-r from-violet-600 to-blue-500 text-white hover:brightness-110 hover:-translate-y-0.5 ${className}`}
        style={{ boxShadow: "0 0 24px rgba(139,92,246,0.45)" }}
        {...props}
      >
        {children}
      </button>
    );
  }
  return (
    <button
      className={`${base} border border-slate-700 bg-slate-900/60 text-slate-100 hover:border-violet-400 hover:text-violet-300 hover:-translate-y-0.5 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-3 py-1 font-mono text-xs uppercase tracking-widest text-violet-300">
      <Sparkles className="h-3 w-3" />
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Section: Nav                                                      */
/* ------------------------------------------------------------------ */

function NavBar({ refs }: { refs: any }) {
  const [open, setOpen] = useState(false);
  const links = [
    { label: "Services", ref: refs.services },
    { label: "Portfolio", ref: refs.portfolio },
    { label: "Pricing", ref: refs.pricing },
    { label: "ROI Calculator", ref: refs.roi },
    { label: "Contact", ref: refs.contact },
  ];

  const scrollTo = (ref: any) => {
    setOpen(false);
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 w-full overflow-x-hidden border-b border-slate-800/60 bg-slate-950/70 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex min-w-0 shrink-0 items-center gap-2 font-display text-lg font-semibold text-white"
        >
          <span
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-blue-500 text-sm font-bold text-white"
            style={{ boxShadow: "0 0 16px rgba(139,92,246,0.55)" }}
          >
            HA
          </span>
          <span className="hidden truncate sm:inline">Hashir Automations</span>
        </button>

        <nav className="hidden items-center gap-8 font-body text-sm text-slate-300 md:flex">
          {links.map((l) => (
            <button
              key={l.label}
              onClick={() => scrollTo(l.ref)}
              className="relative py-1 transition-colors hover:text-white after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-gradient-to-r after:from-violet-400 after:to-blue-400 after:transition-all after:duration-300 hover:after:w-full"
            >
              {l.label}
            </button>
          ))}
        </nav>

        <div className="hidden md:block">
          <GlowButton onClick={() => scrollTo(refs.contact)} className="!px-5 !py-2.5 text-xs">
            Book a Free Audit
            <ArrowRight className="h-3.5 w-3.5" />
          </GlowButton>
        </div>

        <button
          className="shrink-0 text-slate-200 md:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-slate-800/60 bg-slate-950/95 px-6 py-4 md:hidden">
          <div className="flex flex-col gap-4 font-body text-sm text-slate-300">
            {links.map((l) => (
              <button key={l.label} onClick={() => scrollTo(l.ref)} className="text-left">
                {l.label}
              </button>
            ))}
            <GlowButton onClick={() => scrollTo(refs.contact)} className="w-full">
              Book a Free Audit
            </GlowButton>
          </div>
        </div>
      )}
    </header>
  );
}

/* ------------------------------------------------------------------ */
/*  Section: Hero + Pipeline Visual                                   */
/* ------------------------------------------------------------------ */

function PipelineVisual() {
  const nodes = [
    { label: "Lead Trigger", detail: "New form submission", icon: Webhook, color: "violet" },
    { label: "AI Processor", detail: "Gemini drafts a reply", icon: BrainCircuit, color: "blue" },
    { label: "CRM Update", detail: "Contact record synced", icon: FolderInput, color: "violet" },
    { label: "Gmail Auto-Reply", detail: "Email sent in <10s", icon: MailCheck, color: "blue" },
  ];

  return (
    <GlassPanel className="relative overflow-hidden p-6 hashir-reduce-motion">
      <div
        className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-violet-600/20 blur-3xl"
        aria-hidden="true"
      />
      <div className="mb-5 flex items-center justify-between">
        <span className="font-mono text-xs uppercase tracking-widest text-slate-400">
          Live Automation Pipeline
        </span>
        <span className="flex shrink-0 items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-1 font-mono text-xs text-emerald-400">
          <span
            className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400"
            style={{ animation: "hashir-pulse-ring 1.8s ease-out infinite" }}
          />
          Running
        </span>
      </div>

      <div className="relative flex flex-col">
        {nodes.map((node, i) => {
          const Icon = node.icon;
          const isLast = i === nodes.length - 1;
          const accent = node.color === "violet" ? "#8b5cf6" : "#38bdf8";
          return (
            <div key={node.label} className="relative">
              <div className="flex items-center gap-4 rounded-xl border border-slate-800 bg-slate-950/60 p-4">
                <div
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg"
                  style={{ background: `${accent}1A`, border: `1px solid ${accent}55` }}
                >
                  <Icon className="h-5 w-5" style={{ color: accent }} />
                </div>
                <div className="min-w-0">
                  <p className="break-words font-body text-sm font-semibold text-white">{node.label}</p>
                  <p className="truncate font-mono text-xs text-slate-400">{node.detail}</p>
                </div>
                <ChevronRight className="ml-auto h-4 w-4 shrink-0 text-slate-600" />
              </div>

              {!isLast && (
                <div className="relative mx-5 h-8 w-px overflow-hidden bg-slate-800">
                  <span
                    className="absolute left-1/2 h-3 w-3 -translate-x-1/2 rounded-full"
                    style={{
                      background: "radial-gradient(circle, #a78bfa 0%, rgba(167,139,250,0) 70%)",
                      boxShadow: "0 0 10px 2px rgba(139,92,246,0.9)",
                      animation: `hashir-flow 2.2s ${i * 0.5}s linear infinite`,
                    }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </GlassPanel>
  );
}

function Hero({ sectionRef, refs }: { sectionRef: any; refs: any }) {
  return (
    <section
      ref={sectionRef}
      className="relative mx-auto flex w-full max-w-7xl flex-col gap-14 px-4 pb-24 pt-36 sm:px-6 md:flex-row md:items-center md:pt-44 lg:px-8"
    >
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-violet-600/10 blur-3xl"
        aria-hidden="true"
      />
      <div className="relative flex-1 hashir-animate-in">
        <Eyebrow>Automation &amp; AI Systems</Eyebrow>
        <h1 className="mt-5 break-words font-display text-4xl font-bold leading-tight text-white sm:text-5xl">
          We build AI &amp; automation systems that{" "}
          <span className="bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
            buy your time back.
          </span>
        </h1>
        <p className="mt-5 max-w-xl break-words font-body text-base leading-relaxed text-slate-400">
          Stop wasting hours on repetitive manual work. We design, build, and troubleshoot
          high-performance Make.com &amp; Zapier integrations that run your business on autopilot.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <GlowButton onClick={() => refs.portfolio.current?.scrollIntoView({ behavior: "smooth" })}>
            See Our Work
            <ArrowUpRight className="h-4 w-4" />
          </GlowButton>
          <GlowButton
            variant="secondary"
            onClick={() => refs.roi.current?.scrollIntoView({ behavior: "smooth" })}
          >
            Calculate Savings
          </GlowButton>
        </div>
      </div>

      <div className="relative flex-1 hashir-animate-in" style={{ animationDelay: "0.15s" }}>
        <PipelineVisual />
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Section: Trust Bar Ticker                                         */
/* ------------------------------------------------------------------ */

function TrustBar() {
  const tools = [
    "Make.com",
    "Zapier",
    "Google Gemini",
    "Google Sheets",
    "Gmail",
    "Slack",
    "HubSpot",
    "Custom APIs",
  ];
  const doubled = [...tools, ...tools];

  return (
    <section className="border-y border-slate-800/60 bg-slate-950/60 py-6 hashir-reduce-motion">
      <p className="mb-4 text-center font-mono text-xs uppercase tracking-widest text-slate-500">
        Integrated with the tools you already run on
      </p>
      <div className="relative overflow-hidden">
        <div
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-slate-950 to-transparent"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-slate-950 to-transparent"
          aria-hidden="true"
        />
        <div
          className="flex w-max items-center gap-4"
          style={{ animation: "hashir-marquee 26s linear infinite" }}
        >
          {doubled.map((tool, i) => (
            <span
              key={tool + i}
              className="flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900/50 px-4 py-2 font-mono text-xs text-slate-300"
            >
              <Zap className="h-3.5 w-3.5 text-violet-400" />
              {tool}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Section: Services                                                 */
/* ------------------------------------------------------------------ */

function ServicesSection({ sectionRef }: { sectionRef: any }) {
  const services = [
    {
      title: "Workflow Automation",
      desc: "Make.com and Zapier pipelines that bridge the daily apps your team already uses.",
      icon: Workflow,
      detail: "Scenario design, error handling, and modular scenarios built to scale past 10k+ ops/month.",
    },
    {
      title: "AI & API Integrations",
      desc: "Leveraging LLM APIs to auto-process data and draft dynamic content.",
      icon: Bot,
      detail: "Prompt-engineered pipelines that read, summarize, classify, and write in your brand voice.",
    },
    {
      title: "Instant Lead Responders",
      desc: "Speed-to-lead setups using SMS, WhatsApp, and Gmail to close leads instantly.",
      icon: MessageSquareText,
      detail: "Median first-response time under 60 seconds, around the clock, no manual monitoring.",
    },
    {
      title: "System Troubleshooting",
      desc: "Fixing broken webhooks, mapping JSON errors, and correcting 400/500 router bugs.",
      icon: Wrench,
      detail: "Audit-first diagnosis of failing scenarios, with a written map of every point of failure.",
    },
  ];

  return (
    <section ref={sectionRef} className="mx-auto w-full max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <div className="mb-12 max-w-2xl">
        <Eyebrow>Services</Eyebrow>
        <h2 className="mt-4 break-words font-display text-3xl font-bold text-white sm:text-4xl">
          What we build and fix
        </h2>
        <p className="mt-3 font-body text-slate-400">
          Four ways we take repetitive, error-prone work off your plate.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        {services.map((s) => {
          const Icon = s.icon;
          return (
            <div
              key={s.title}
              className="group relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/40 p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-violet-500/50"
            >
              <div
                className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-violet-600/0 blur-2xl transition-colors duration-500 group-hover:bg-violet-600/20"
                aria-hidden="true"
              />
              <div
                className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl border border-violet-500/30 bg-violet-500/10 transition-transform duration-300 group-hover:scale-110"
              >
                <Icon className="h-6 w-6 text-violet-300" />
              </div>
              <h3 className="break-words font-display text-lg font-semibold text-white">{s.title}</h3>
              <p className="mt-2 break-words font-body text-sm text-slate-400">{s.desc}</p>

              <div className="mt-4 max-h-0 overflow-hidden opacity-0 transition-all duration-300 group-hover:max-h-24 group-hover:opacity-100">
                <p className="break-words border-t border-slate-800 pt-3 font-mono text-xs leading-relaxed text-blue-300">
                  {s.detail}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Section: Portfolio Blueprint                                      */
/* ------------------------------------------------------------------ */

function PortfolioSection({ sectionRef }: { sectionRef: any }) {
  const steps = [
    {
      title: "Lead Capture",
      icon: Table2,
      copy: "Watches Google Drive or Sheets for new leads the moment a row is added, no polling delay.",
      preview: { label: "trigger.sheet_row", value: "new_lead@example.com · added 2s ago" },
    },
    {
      title: "AI Synthesis",
      icon: BrainCircuit,
      copy: "Gemini AI reads the lead's context and drafts a highly custom outreach message.",
      preview: { label: "ai.draft_message", value: "\"Hi Alex, saw you're scaling fulfillment...\"" },
    },
    {
      title: "Instant Outbox",
      icon: MailCheck,
      copy: "Gmail formats the draft into clean HTML and sends it safely, with delivery tracked.",
      preview: { label: "gmail.send", value: "status: 200 · delivered in 1.4s" },
    },
  ];
  const [active, setActive] = useState(0);
  const Icon = steps[active].icon;

  return (
    <section ref={sectionRef} className="mx-auto w-full max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <div className="mb-12 max-w-2xl">
        <Eyebrow>Featured Blueprint</Eyebrow>
        <h2 className="mt-4 break-words font-display text-3xl font-bold text-white sm:text-4xl">
          Automated AI Outreach System
        </h2>
        <p className="mt-3 font-body text-slate-400">
          A flagship build: from raw lead to a sent, personalized email — with zero manual steps.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-5">
        <div className="flex min-w-0 w-full flex-col gap-3 lg:col-span-2">
          {steps.map((step, i) => {
            const isActive = i === active;
            return (
              <button
                key={step.title}
                onClick={() => setActive(i)}
                className={`flex w-full items-start gap-4 rounded-xl border p-4 text-left transition-all duration-300 ${
                  isActive
                    ? "border-violet-500/60 bg-violet-500/10"
                    : "border-slate-800 bg-slate-900/30 hover:border-slate-700"
                }`}
              >
                <div
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg font-mono text-xs font-bold ${
                    isActive ? "bg-violet-500 text-white" : "bg-slate-800 text-slate-400"
                  }`}
                >
                  {i + 1}
                </div>
                <div className="min-w-0 flex-1">
                  <p
                    className={`break-words font-body text-sm font-semibold ${
                      isActive ? "text-white" : "text-slate-300"
                    }`}
                  >
                    {step.title}
                  </p>
                  <p className="mt-1 break-words font-body text-xs text-slate-500">{step.copy}</p>
                </div>
              </button>
            );
          })}
        </div>

        <div className="w-full min-w-0 lg:col-span-3">
          <GlassPanel className="flex h-full w-full flex-col justify-between p-6 sm:p-8">
            <div>
              <div
                className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-blue-400/30 bg-blue-500/10"
                style={{ boxShadow: "0 0 24px rgba(56,189,248,0.25)" }}
              >
                <Icon className="h-7 w-7 text-blue-300" />
              </div>
              <h3 className="break-words font-display text-2xl font-semibold text-white">
                {steps[active].title}
              </h3>
              <p className="mt-3 break-words font-body text-sm leading-relaxed text-slate-400">
                {steps[active].copy}
              </p>
            </div>

            <div className="mt-8 rounded-xl border border-slate-800 bg-slate-950/70 p-4">
              <p className="font-mono text-xs uppercase tracking-widest text-slate-500">Live data flow</p>
              <div className="mt-2 flex items-center justify-between gap-3">
                <span className="min-w-0 truncate font-mono text-xs text-violet-300">
                  {steps[active].preview.label}
                </span>
                <span
                  className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400"
                  style={{ animation: "hashir-pulse-ring 1.8s ease-out infinite" }}
                />
              </div>
              <p className="mt-2 truncate font-mono text-sm text-slate-200">{steps[active].preview.value}</p>
            </div>
          </GlassPanel>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Section: Process                                                  */
/* ------------------------------------------------------------------ */

function ProcessSection() {
  const steps = [
    {
      title: "Audit",
      icon: Wrench,
      copy: "We map every manual step, tool, and handoff currently eating your team's time, and flag where things silently break.",
    },
    {
      title: "Architecture",
      icon: Workflow,
      copy: "We design the scenario before we build it — data flow, error handling, and fallback paths, documented up front.",
    },
    {
      title: "Implementation",
      icon: Cpu,
      copy: "We build in Make.com, Zapier, or custom code, with staged testing against real (not sample) data before go-live.",
    },
    {
      title: "Monitoring",
      icon: Clock,
      copy: "We watch scenario health post-launch and tune it as your volume and edge cases evolve, not just on day one.",
    },
  ];

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <div className="mb-12 max-w-2xl">
        <Eyebrow>Our Engineering Process</Eyebrow>
        <h2 className="mt-4 break-words font-display text-3xl font-bold text-white sm:text-4xl">
          A repeatable SOP, not a one-off hack
        </h2>
        <p className="mt-3 font-body text-slate-400">
          Every build follows the same four stages so nothing gets skipped under deadline pressure.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, i) => {
          const Icon = step.icon;
          const isLast = i === steps.length - 1;
          return (
            <div key={step.title} className="relative">
              <GlassPanel className="h-full p-6">
                <div className="flex items-center gap-3">
                  <div
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-violet-500/30 bg-violet-500/10 font-mono text-xs font-bold text-violet-300"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <Icon className="h-5 w-5 shrink-0 text-blue-300" />
                </div>
                <h3 className="mt-4 break-words font-display text-lg font-semibold text-white">
                  {step.title}
                </h3>
                <p className="mt-2 break-words font-body text-sm leading-relaxed text-slate-400">
                  {step.copy}
                </p>
              </GlassPanel>
              {!isLast && (
                <ChevronRight
                  className="absolute -right-4 top-1/2 hidden h-5 w-5 -translate-y-1/2 text-slate-700 lg:block"
                  aria-hidden="true"
                />
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Section: Pricing                                                  */
/* ------------------------------------------------------------------ */

function PricingSection({ sectionRef, refs }: { sectionRef: any; refs: any }) {
  const tiers = [
    {
      name: "Starter",
      price: "$1,500",
      period: "/mo",
      tagline: "For one workflow, done right.",
      features: [
        "Single workflow automation",
        "Make.com or Zapier build & docs",
        "Basic email support",
        "Monthly health check-in",
      ],
      featured: false,
    },
    {
      name: "Growth",
      price: "$3,500",
      period: "/mo",
      tagline: "For teams running on several systems at once.",
      features: [
        "Multi-system integration",
        "AI-assisted workflows (Gemini / GPT)",
        "24/7 scenario monitoring",
        "Priority support, same-day response",
      ],
      featured: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "",
      tagline: "For orgs that need governance and guarantees.",
      features: [
        "Custom API development",
        "Formal SLAs & uptime guarantees",
        "Access governance & audit logging",
        "Dedicated engineering contact",
      ],
      featured: false,
    },
  ];

  return (
    <section ref={sectionRef} className="mx-auto w-full max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <div className="mb-12 max-w-2xl">
        <Eyebrow>Pricing</Eyebrow>
        <h2 className="mt-4 break-words font-display text-3xl font-bold text-white sm:text-4xl">
          Plans that scale with your automation needs
        </h2>
        <p className="mt-3 font-body text-slate-400">
          Every tier includes a free initial audit. No long-term lock-in — cancel with 30 days' notice.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {tiers.map((tier) => (
          <GlassPanel
            key={tier.name}
            className={`relative flex h-full flex-col p-8 ${
              tier.featured ? "border-violet-500/60" : ""
            }`}
            style={
              tier.featured
                ? { boxShadow: "0 0 40px rgba(139,92,246,0.18)" }
                : undefined
            }
          >
            {tier.featured && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-violet-600 to-blue-500 px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-widest text-white">
                Most Popular
              </span>
            )}

            <h3 className="break-words font-display text-xl font-semibold text-white">{tier.name}</h3>
            <p className="mt-1 break-words font-body text-sm text-slate-400">{tier.tagline}</p>

            <div className="mt-6 flex items-end gap-1">
              <span className="break-words font-display text-4xl font-bold text-white">{tier.price}</span>
              {tier.period && (
                <span className="mb-1 font-body text-sm text-slate-500">{tier.period}</span>
              )}
            </div>

            <ul className="mt-6 flex flex-1 flex-col gap-3">
              {tier.features.map((f) => (
                <li key={f} className="flex items-start gap-2 font-body text-sm text-slate-300">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-violet-400" />
                  <span className="break-words">{f}</span>
                </li>
              ))}
            </ul>

            <GlowButton
              variant={tier.featured ? "primary" : "secondary"}
              className="mt-8 w-full"
              onClick={() => refs.contact.current?.scrollIntoView({ behavior: "smooth" })}
            >
              {tier.price === "Custom" ? "Talk to Us" : "Get Started"}
              <ArrowRight className="h-4 w-4" />
            </GlowButton>
          </GlassPanel>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Section: ROI Calculator                                           */
/* ------------------------------------------------------------------ */

function RoiCalculator({ sectionRef, refs }: { sectionRef: any; refs: any }) {
  const [hours, setHours] = useState(10);
  const [rate, setRate] = useState(40);

  const hoursSaved = hours * 52;
  const moneySaved = hours * rate * 52;

  const money = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(moneySaved);

  const hoursPct = ((hours - 1) / (40 - 1)) * 100;
  const ratePct = ((rate - 15) / (150 - 15)) * 100;

  return (
    <section ref={sectionRef} className="mx-auto w-full max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <div className="mb-12 max-w-2xl">
        <Eyebrow>ROI Calculator</Eyebrow>
        <h2 className="mt-4 break-words font-display text-3xl font-bold text-white sm:text-4xl">
          See what manual work is really costing you
        </h2>
        <p className="mt-3 font-body text-slate-400">
          Move the sliders to match your team, and watch the yearly cost update live.
        </p>
      </div>

      <GlassPanel className="grid gap-10 p-8 md:grid-cols-2 md:p-10">
        <div className="flex flex-col gap-10">
          <div>
            <div className="mb-3 flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
              <label className="min-w-0 flex-1 break-words font-body text-sm font-medium text-slate-300">
                Hours wasted on manual tasks per week
              </label>
              <span className="shrink-0 font-mono text-sm font-semibold text-violet-300">{hours} hrs</span>
            </div>
            <input
              type="range"
              min={1}
              max={40}
              value={hours}
              onChange={(e) => setHours(Number(e.target.value))}
              className="hashir-slider w-full"
              style={{ "--fill": `${hoursPct}%` } as React.CSSProperties}
              aria-label="Hours wasted on manual tasks per week"
            />
            <div className="mt-1 flex justify-between font-mono text-xs text-slate-600">
              <span>1</span>
              <span>40</span>
            </div>
          </div>

          <div>
            <div className="mb-3 flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
              <label className="min-w-0 flex-1 break-words font-body text-sm font-medium text-slate-300">
                Average hourly cost of staff / your time
              </label>
              <span className="shrink-0 font-mono text-sm font-semibold text-blue-300">${rate}/hr</span>
            </div>
            <input
              type="range"
              min={15}
              max={150}
              value={rate}
              onChange={(e) => setRate(Number(e.target.value))}
              className="hashir-slider w-full"
              style={{ "--fill": `${ratePct}%` } as React.CSSProperties}
              aria-label="Average hourly cost of staff or your time"
            />
            <div className="mt-1 flex justify-between font-mono text-xs text-slate-600">
              <span>$15</span>
              <span>$150</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center gap-6 rounded-2xl border border-slate-800 bg-slate-950/60 p-6">
          <div>
            <div className="flex min-w-0 items-center gap-2 font-mono text-xs uppercase tracking-widest text-slate-500">
              <Clock className="h-3.5 w-3.5 shrink-0" /> <span className="break-words">Hours saved per year</span>
            </div>
            <p className="mt-1 font-display text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-blue-500">
              {hoursSaved.toLocaleString()}
            </p>
          </div>
          <div>
            <div className="flex min-w-0 items-center gap-2 font-mono text-xs uppercase tracking-widest text-slate-500">
              <DollarSign className="h-3.5 w-3.5 shrink-0" /> <span className="break-words">Money saved per year</span>
            </div>
            <p
              className="mt-1 font-display text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-300 to-violet-500"
              style={{ filter: "drop-shadow(0 0 18px rgba(139,92,246,0.35))" }}
            >
              {money}
            </p>
          </div>
        </div>
      </GlassPanel>

      <div className="mt-8 flex flex-col items-center gap-4 text-center">
        <p className="break-words font-body text-lg text-slate-200">
          Ready to save{" "}
          <span className="font-display font-semibold text-violet-300">{money}</span> this year? Let's
          build it.
        </p>
        <GlowButton onClick={() => refs.contact.current?.scrollIntoView({ behavior: "smooth" })}>
          Start My Automation
          <ArrowRight className="h-4 w-4" />
        </GlowButton>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Section: About                                                    */
/* ------------------------------------------------------------------ */

function AboutSection() {
  const stats = [
    { label: "Scenarios shipped", value: "120+" },
    { label: "Avg. hours saved / client / week", value: "14" },
    { label: "Platforms integrated", value: "20+" },
  ];

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <div className="grid gap-12 md:grid-cols-2 md:items-center">
        <div>
          <Eyebrow>About Hashir Automations</Eyebrow>
          <h2 className="mt-4 break-words font-display text-3xl font-bold text-white sm:text-4xl">
            Engineering discipline. No-code speed.
          </h2>
          <p className="mt-4 font-body text-sm leading-relaxed text-slate-400">
            We blend a strong technical web development and computer science foundation with
            rapid-deployment no-code tooling. That means automations that don't just work in the
            demo — they hold up under real traffic, malformed data, and edge cases, because
            they're built by people who understand what's happening under the hood of every
            webhook and API call.
          </p>
          <p className="mt-4 font-body text-sm leading-relaxed text-slate-400">
            When a scenario breaks at 2am, we're not guessing from a no-code interface. We're
            reading the payload.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 md:grid-cols-1">
          {stats.map((s) => (
            <GlassPanel key={s.label} className="p-6">
              <p className="break-words font-display text-3xl font-bold text-white">{s.value}</p>
              <p className="mt-1 break-words font-body text-xs text-slate-400">{s.label}</p>
            </GlassPanel>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Section: Contact Form                                             */
/* ------------------------------------------------------------------ */

function ContactSection({ sectionRef }: { sectionRef: any }) {
  const options = [
    "Fix a Broken Make Scenario",
    "Build an AI Tool",
    "Automate Lead Response",
    "Other",
  ];
  const [selected, setSelected] = useState<string[]>([]);
  const [form, setForm] = useState({ name: "", email: "", details: "" });
  const [status, setStatus] = useState("idle");

  const toggleOption = (opt: string) => {
    setSelected((prev) => (prev.includes(opt) ? prev.filter((o) => o !== opt) : [...prev, opt]));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "loading") return;
    setStatus("loading");

    const web3Data = new FormData();
    web3Data.append("access_key", "e0976de8-2e2a-4d86-9380-de38db229d58");
    web3Data.append("name", form.name);
    web3Data.append("email", form.email);
    web3Data.append("message", `Selected Services: ${selected.join(", ") || "None selected"}\n\nProject Context:\n${form.details}`);

    const makeData = {
      name: form.name,
      email: form.email,
      services: selected,
      details: form.details,
      submittedAt: new Date().toISOString()
    };

    try {
      const [web3Response, makeOldResponse, makeNewResponse] = await Promise.all([
        fetch("https://api.web3forms.com/submit", { method: "POST", body: web3Data }),
        fetch("https://hook.eu1.make.com/g2udoeeu4mibqlex9mjseh9cesbyew4t", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(makeData)
        }),
        fetch("https://hook.eu1.make.com/vcl5cpqixelo41g936xiwkmbpface5rt", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(makeData)
        })
      ]);

      if (web3Response.ok || makeOldResponse.ok || makeNewResponse.ok) {
        setStatus("sent");
      } else {
        setStatus("idle");
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      setStatus("idle");
      alert("Error submitting form.");
    }
  };

  return (
    <section ref={sectionRef} className="mx-auto w-full max-w-4xl px-4 py-24 sm:px-6 lg:px-8">
      <div className="mb-10 text-center">
        <Eyebrow>Contact</Eyebrow>
        <h2 className="mt-4 break-words font-display text-3xl font-bold text-white sm:text-4xl">
          Book a free automation audit
        </h2>
        <p className="mx-auto mt-3 max-w-lg font-body text-slate-400">
          Tell us what's broken or what you want built. We'll reply with a plan, not a sales pitch.
        </p>
      </div>

      <GlassPanel className="p-8 md:p-10">
        {status === "sent" ? (
          <div className="flex flex-col items-center gap-3 py-10 text-center">
            <div
              className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/10"
              style={{ boxShadow: "0 0 24px rgba(52,211,153,0.35)" }}
            >
              <Check className="h-7 w-7 text-emerald-400" />
            </div>
            <h3 className="break-words font-display text-xl font-semibold text-white">Request sent</h3>
            <p className="font-body text-sm text-slate-400">
              We received it — expect a reply within 15 minutes.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div>
              <p className="mb-3 font-body text-sm font-medium text-slate-300">
                What do you need help with?
              </p>
              <div className="flex flex-wrap gap-2">
                {options.map((opt) => {
                  const isSelected = selected.includes(opt);
                  return (
                    <button
                      type="button"
                      key={opt}
                      onClick={() => toggleOption(opt)}
                      aria-pressed={isSelected}
                      className={`flex max-w-full items-center gap-1.5 rounded-full border px-4 py-2 text-left font-body text-xs font-medium transition-all duration-200 ${
                        isSelected
                          ? "border-violet-400 bg-violet-500/20 text-violet-200"
                          : "border-slate-700 bg-slate-900/50 text-slate-400 hover:border-slate-600"
                      }`}
                    >
                      {isSelected && <Check className="h-3.5 w-3.5 shrink-0" />}
                      <span className="break-words">{opt}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label className="mb-2 block font-body text-sm font-medium text-slate-300">Name</label>
                <input
                  required
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  className="w-full rounded-lg border border-slate-700 bg-slate-950/60 px-4 py-2.5 font-body text-sm text-white placeholder-slate-600 outline-none transition-colors focus:border-violet-400"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="mb-2 block font-body text-sm font-medium text-slate-300">Email</label>
                <input
                  required
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  className="w-full rounded-lg border border-slate-700 bg-slate-950/60 px-4 py-2.5 font-body text-sm text-white placeholder-slate-600 outline-none transition-colors focus:border-violet-400"
                  placeholder="you@company.com"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block font-body text-sm font-medium text-slate-300">
                Project details
              </label>
              <textarea
                required
                rows={4}
                name="message"
                value={form.details}
                onChange={(e) => setForm((f) => ({ ...f, details: e.target.value }))}
                className="w-full resize-none rounded-lg border border-slate-700 bg-slate-950/60 px-4 py-2.5 font-body text-sm text-white placeholder-slate-600 outline-none transition-colors focus:border-violet-400"
                placeholder="What's the workflow, and where is it breaking down or missing?"
              />
            </div>

            <GlowButton type="submit" className="self-start" disabled={status === "loading"}>
              {status === "loading" ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  Submit Request
                  <Send className="h-4 w-4" />
                </>
              )}
            </GlowButton>
          </form>
        )}
      </GlassPanel>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Floating AI Chatbot (Direct Google AI Studio API call)            */
/* ------------------------------------------------------------------ */

interface Message {
  role: "user" | "model";
  text: string;
}

function Chatbot({ refs }: { refs: any }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "model",
      text: "Hi, I'm Hashir's automation assistant. What's eating up your team's time right now?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSendMessage = async () => {
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;

    const nextMessages: Message[] = [...messages, { role: "user", text: trimmed }];
    setMessages(nextMessages);
    setInput("");
    setIsLoading(true);
    setError("");

    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

      if (!apiKey) {
        setError("VITE_GEMINI_API_KEY is not configured in Vercel settings.");
        setIsLoading(false);
        return;
      }

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            system_instruction: {
              parts: [
                {
                  text: "You are Hashir's Automation Assistant. You help visitors understand how automation can save them time and money. Be professional, technical, and encourage them to book a free audit.",
                },
              ],
            },
            contents: nextMessages.slice(-6).map((m) => ({
              role: m.role,
              parts: [{ text: m.text }],
            })),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data?.error?.message || "Assistant is temporarily unavailable.");
        return;
      }

      const reply =
        data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "Sorry, I couldn't generate a response just now.";

      setMessages((prev) => [...prev, { role: "model", text: reply }]);
    } catch (err) {
      console.error("Chat Error:", err);
      setError("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
      {isOpen && (
        <GlassPanel className="flex h-[28rem] w-[calc(100vw-2.5rem)] max-w-sm flex-col overflow-hidden bg-slate-950/95 p-0 hashir-animate-in">
          <div className="flex items-center justify-between border-b border-slate-800 px-4 py-3">
            <div className="flex min-w-0 items-center gap-2">
              <div
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-blue-500"
                style={{ boxShadow: "0 0 14px rgba(139,92,246,0.55)" }}
              >
                <Bot className="h-4 w-4 text-white" />
              </div>
              <div className="min-w-0">
                <p className="truncate font-display text-sm font-semibold text-white">
                  Automation Assistant
                </p>
                <span className="flex items-center gap-1 font-mono text-[10px] text-emerald-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Online
                </span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="shrink-0 rounded-lg p-1 text-slate-400 transition-colors hover:text-white"
              aria-label="Close chat"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] break-words rounded-2xl px-3.5 py-2 font-body text-sm leading-relaxed ${
                    m.role === "user"
                      ? "bg-gradient-to-r from-violet-600 to-blue-500 text-white"
                      : "border border-slate-800 bg-slate-900/60 text-slate-200"
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="flex items-center gap-2 rounded-2xl border border-slate-800 bg-slate-900/60 px-3.5 py-2 text-slate-400">
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  <span className="font-mono text-xs">Thinking...</span>
                </div>
              </div>
            )}
            {error && <p className="font-body text-xs text-red-400">{error}</p>}
          </div>

          <div className="border-t border-slate-800 p-3">
            <div className="mb-2 flex items-center gap-1.5 font-mono text-[10px] text-slate-600">
              <ShieldCheck className="h-3 w-3" />
              Prefers booking a free audit? Skip ahead below.
            </div>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about automating a workflow..."
                className="w-full min-w-0 flex-1 rounded-full border border-slate-700 bg-slate-950/60 px-4 py-2 font-body text-sm text-white placeholder-slate-600 outline-none transition-colors focus:border-violet-400"
              />
              <button
                onClick={handleSendMessage}
                disabled={isLoading || !input.trim()}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-violet-600 to-blue-500 text-white transition-opacity disabled:opacity-40"
                aria-label="Send message"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
            <button
              onClick={() => {
                setIsOpen(false);
                refs?.contact?.current?.scrollIntoView({ behavior: "smooth" });
              }}
              className="mt-2 w-full text-center font-mono text-[10px] uppercase tracking-widest text-violet-300 hover:text-violet-200"
            >
              Book a Free Audit Instead →
            </button>
          </div>
        </GlassPanel>
      )}

      <button
        onClick={() => setIsOpen((o) => !o)}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-violet-600 to-blue-500 text-white transition-transform hover:-translate-y-0.5"
        style={{ boxShadow: "0 0 24px rgba(139,92,246,0.55)" }}
        aria-label={isOpen ? "Close chat assistant" : "Open chat assistant"}
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Footer                                                            */
/* ------------------------------------------------------------------ */

function Footer() {
  return (
    <footer className="border-t border-slate-800/60 px-6 py-10">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-4 px-4 text-center font-body text-xs text-slate-500 sm:flex-row sm:px-6 sm:text-left lg:px-8">
        <span className="flex min-w-0 items-center gap-2 break-words">
          <Cpu className="h-4 w-4 shrink-0 text-violet-400" />
          Hashir Automations — automation &amp; AI systems.
        </span>
        <span className="flex min-w-0 items-center gap-1.5 break-words">
          <Mail className="h-3.5 w-3.5 shrink-0" /> hashirgondal5006@gmail.com
        </span>
      </div>
    </footer>
  );
}

/* ------------------------------------------------------------------ */
/*  Root Component Export                                             */
/* ------------------------------------------------------------------ */

export default function HashirAutomations() {
  const refs = {
    hero: useRef<HTMLElement>(null),
    services: useRef<HTMLElement>(null),
    portfolio: useRef<HTMLElement>(null),
    pricing: useRef<HTMLElement>(null),
    roi: useRef<HTMLElement>(null),
    contact: useRef<HTMLElement>(null),
  };

  return (
    <div className="w-full min-h-screen overflow-x-hidden bg-slate-950 font-body text-slate-100">
      <style>{FONT_IMPORT}</style>
      <NavBar refs={refs} />
      <main>
        <Hero sectionRef={refs.hero} refs={refs} />
        <TrustBar />
        <ServicesSection sectionRef={refs.services} />
        <PortfolioSection sectionRef={refs.portfolio} />
        <ProcessSection />
        <PricingSection sectionRef={refs.pricing} refs={refs} />
        <RoiCalculator sectionRef={refs.roi} refs={refs} />
        <AboutSection />
        <ContactSection sectionRef={refs.contact} />
      </main>
      <Footer />
      <Chatbot refs={refs} />
    </div>
  );
}