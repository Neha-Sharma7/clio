import { useEffect, useRef } from "react";
import { Link } from "@tanstack/react-router";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowRight, Github, Sparkles, Search, Brain,
  Shield, Server, Lock, Users, ArrowUpRight,
  CalendarDays, FileCheck2, CheckSquare, Bot, Mic, Database, UsersRound, FileText, Play, Download, ArrowUpRight as ArrowUpRightIcon,
} from "lucide-react";
import { Logo } from "@/components/logo";
import mark from "@/assets/clio-mark-v2.png.asset.json";
import meetLogo from "@/assets/google-meet.png.asset.json";
import zoomLogo from "@/assets/zoom.png.asset.json";
import chatgptLogo from "@/assets/chatgpt.png.asset.json";
import claudeLogo from "@/assets/claude.png.asset.json";
import groqLogo from "@/assets/groq.png.asset.json";
import { ThemeToggle } from "@/components/theme-toggle";
import { createFileRoute } from "@tanstack/react-router";


export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Clio — Meeting intelligence for teams that ship" },
      { name: "description", content: "Clio is the memory layer for organizations. Real-time meeting capture, decision extraction, and searchable context — via API or hosted dashboard." },
      { property: "og:title", content: "Clio — Meeting intelligence for teams that ship" },
      { property: "og:description", content: "Real-time meeting capture, decision extraction, and searchable context." },
    ],
  }),
  component: Landing,
});

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

function Landing() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const ctx = gsap.context(() => {
      gsap.from(".hero-eyebrow", { y: 12, opacity: 0, duration: 0.6, ease: "power2.out" });
      gsap.from(".hero-line", {
        y: 40, opacity: 0, duration: 0.9, stagger: 0.08, delay: 0.1, ease: "power3.out",
      });
      gsap.from(".hero-sub", { y: 20, opacity: 0, duration: 0.7, delay: 0.5, ease: "power2.out" });
      gsap.from(".hero-cta", { y: 16, opacity: 0, duration: 0.6, delay: 0.65, stagger: 0.06 });
      gsap.from(".hero-social", { opacity: 0, duration: 0.7, delay: 0.9 });
      gsap.from(".hero-mock", { y: 30, opacity: 0, duration: 1, delay: 0.3, ease: "power3.out" });

      gsap.to(".blob-1", { y: -60, scrollTrigger: { trigger: heroRef.current, scrub: true } });
      gsap.to(".blob-2", { y: 80, scrollTrigger: { trigger: heroRef.current, scrub: true } });

      gsap.utils.toArray<HTMLElement>(".reveal").forEach(el => {
        gsap.from(el, {
          y: 24, opacity: 0, duration: 0.7, ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 88%" },
        });
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      <TopNav />

      {/* Hero */}
      <section ref={heroRef} className="relative pt-36 pb-20 md:pt-44 md:pb-28">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="blob-1 absolute -top-24 -left-24 h-[440px] w-[440px] rounded-full opacity-40 blur-3xl"
               style={{ background: "radial-gradient(closest-side, oklch(0.72 0.10 165 / 0.45), transparent)" }} />
          <div className="blob-2 absolute top-40 -right-24 h-[520px] w-[520px] rounded-full opacity-30 blur-3xl"
               style={{ background: "radial-gradient(closest-side, oklch(0.52 0.11 165 / 0.30), transparent)" }} />
        </div>

        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <div className="hero-eyebrow inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" />
            AI-first · Team memory · Open API
          </div>
          <h1 className="mt-6 font-display text-[44px] leading-[1.02] font-medium tracking-tight md:text-[72px]">
            <span className="hero-line block">Meeting intelligence</span>
            <span className="hero-line block">
              for teams <span className="italic text-accent">that ship</span>.
            </span>
          </h1>
          <p className="hero-sub mx-auto mt-6 max-w-xl text-base text-muted-foreground md:text-lg">
            Clio captures every conversation, extracts the decisions and action items that matter,
            and gives your team a searchable memory across every meeting — via hosted dashboard or API.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link to="/register" className="hero-cta inline-flex items-center gap-1.5 rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background hover:opacity-90 transition">
              Get started free <ArrowRight className="h-4 w-4" />
            </Link>
            <a href="https://github.com" target="_blank" rel="noreferrer" className="hero-cta inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-3 text-sm font-medium hover:bg-muted transition">
              <Github className="h-4 w-4" /> View on GitHub
            </a>
          </div>
          <div className="hero-social mt-8 flex items-center justify-center gap-3 text-xs text-muted-foreground">
            <div className="flex -space-x-2">
              {["#c8b6a6","#a4b494","#7a9e7e","#b8a99a","#8ba888"].map((c,i)=>(
                <span key={i} className="h-6 w-6 rounded-full border-2 border-background" style={{ background: c }} />
              ))}
            </div>
            <span>Trusted by <span className="text-foreground font-medium">2.4k+</span> teams</span>
          </div>
        </div>

        <div className="hero-mock relative mx-auto mt-16 max-w-4xl px-6">
          <MockTranscript />
        </div>
      </section>

      {/* Streams / integrations */}
      <StreamsSection />

      {/* Features */}
      <FeaturesSection />


      {/* How it works */}
      <section id="how" className="mx-auto max-w-6xl px-6 py-24">
        <div className="reveal max-w-2xl">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">How it works</p>
          <h2 className="mt-3 font-display text-3xl font-medium md:text-5xl">
            Zero setup. <span className="italic">Continuous memory.</span>
          </h2>
        </div>
        <div className="mt-14 relative">
          <div className="absolute left-0 right-0 top-6 h-px bg-border hidden md:block" />
          <ol className="grid grid-cols-1 gap-8 md:grid-cols-4">
            {[
              { t: "Connect", d: "Link your calendar and video platform." },
              { t: "Capture", d: "Clio joins, records, and transcribes." },
              { t: "Extract", d: "Decisions, actions, and risks surfaced." },
              { t: "Retrieve", d: "Search or ask before your next meeting." },
            ].map((s, i) => (
              <li key={i} className="reveal relative">
                <div className="relative grid h-12 w-12 place-items-center rounded-full border border-border bg-background font-display text-sm font-medium">
                  {i + 1}
                </div>
                <h3 className="mt-4 font-display text-lg font-medium">{s.t}</h3>
                <p className="mt-1 text-sm text-muted-foreground max-w-[220px]">{s.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Enterprise / Control */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <div className="reveal rounded-3xl border border-border bg-card p-10 md:p-14">
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Enterprise</p>
            <h2 className="mt-3 font-display text-3xl font-medium md:text-5xl">
              Meeting intelligence you <span className="italic text-accent">control completely.</span>
            </h2>
            <p className="mt-4 text-muted-foreground">
              Self-hostable, auditable, and yours. Meeting data never has to leave your network.
            </p>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
            {[
              { i: Server, t: "Self-hosted deployment", d: "Docker, Kubernetes, or bare metal — wherever compliance requires." },
              { i: Shield, t: "Data sovereignty", d: "GDPR and HIPAA-ready. Meeting data stays inside your perimeter." },
              { i: Lock, t: "Auditable & open", d: "Every decision traceable to a transcript segment and a speaker." },
            ].map((c, i) => (
              <div key={i} className="rounded-2xl border border-border bg-background p-6">
                <c.i className="h-4 w-4 text-accent" />
                <h3 className="mt-4 font-display text-base font-medium">{c.t}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{c.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <div className="reveal text-center">
          <h2 className="mx-auto max-w-2xl font-display text-3xl font-medium md:text-5xl">
            Start remembering <span className="text-accent italic">today.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-muted-foreground">
            Begin with your next meeting. Clio ingests, understands, and remembers — so your team compounds what it knows.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/register" className="inline-flex items-center gap-1.5 rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background hover:opacity-90 transition">
              Create organization <ArrowUpRight className="h-4 w-4" />
            </Link>
            <Link to="/pricing" className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-5 py-3 text-sm font-medium hover:bg-muted transition">
              See pricing
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

export function TopNav() {
  return (
    <header className="fixed top-0 z-50 w-full">
      <div className="mx-auto mt-4 flex max-w-6xl items-center justify-between rounded-full glass px-5 py-2.5">
        <Logo />
        <nav className="hidden items-center gap-7 text-sm text-muted-foreground md:flex">
          <Link to="/products" className="hover:text-foreground transition">Products</Link>
          <a href="#" className="hover:text-foreground transition">Blog</a>
          <Link to="/pricing" className="hover:text-foreground transition">Pricing</Link>
          <a href="https://github.com" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 hover:text-foreground transition">
            <Github className="h-3.5 w-3.5" /> GitHub
          </a>
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link to="/login" className="hidden md:inline-flex text-sm text-muted-foreground hover:text-foreground px-3 py-2">
            Login
          </Link>
          <Link to="/register" className="inline-flex items-center gap-1.5 rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background hover:opacity-90 transition">
            Get started <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-10 px-6 py-14 md:grid-cols-5">
        <div className="col-span-2">
          <Logo />
          <p className="mt-3 max-w-xs text-xs text-muted-foreground">
            The AI memory layer for organizations. Built for teams who meet — and forget — too much.
          </p>
        </div>
        <FooterCol title="Product" links={[
          { l: "Products", to: "/products" },
          { l: "Pricing", to: "/pricing" },
          { l: "Login", to: "/login" },
        ]} />
        <FooterCol title="Company" links={[
          { l: "Blog", href: "#" },
          { l: "Contact", href: "#" },
          { l: "Careers", href: "#" },
        ]} />
        <FooterCol title="Developers" links={[
          { l: "GitHub", href: "https://github.com", ext: true },
          { l: "Documentation", href: "#" },
          { l: "Changelog", href: "#" },
        ]} />
      </div>
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6 text-xs text-muted-foreground">
          <span>© 2026 Clio Labs</span>
          <span className="flex items-center gap-1"><Users className="h-3 w-3" /> Made for organizations that remember</span>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: { l: string; href?: string; to?: string; ext?: boolean }[] }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wider text-foreground">{title}</p>
      <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
        {links.map((l, i) => (
          <li key={i}>
            {l.to ? (
              <Link to={l.to} className="hover:text-foreground">{l.l}</Link>
            ) : (
              <a href={l.href} target={l.ext ? "_blank" : undefined} rel={l.ext ? "noreferrer" : undefined} className="hover:text-foreground">{l.l}</a>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

function MockTranscript() {
  return (
    <div className="relative">
      <div className="absolute -inset-8 rounded-[36px] bg-gradient-to-br from-accent/10 to-transparent blur-2xl" />
      <div className="relative rounded-2xl border border-border bg-card p-5 shadow-[0_30px_80px_-30px_oklch(0.22_0.02_55_/_0.25)]">
        <div className="flex items-center justify-between border-b border-border pb-3">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            <span className="text-xs font-medium">clio · live transcript</span>
          </div>
          <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Q4 roadmap review · 12 min</span>
        </div>
        <div className="mt-4 space-y-3 text-sm">
          {[
            { s: "Alice Chen", c: "We need to ship the new API before the end of Q3.", tag: "DECISION" },
            { s: "Bob Rodriguez", c: "I'll have the spec ready by Friday and loop in security review.", tag: "ACTION" },
            { s: "Carol Wu", c: "Let's revisit the pricing rollout on the next call.", tag: null },
          ].map((r, i) => (
            <div key={i} className="rounded-xl border border-border/60 bg-background p-3">
              <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                <span className="font-medium text-foreground">{r.s}</span>
                {r.tag && (
                  <span className="rounded-full bg-accent/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-accent">
                    {r.tag}
                  </span>
                )}
              </div>
              <p className="mt-1.5">{r.c}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 flex items-center justify-between rounded-xl bg-muted px-3 py-2 text-[11px] text-muted-foreground">
          <span>Connected · Google Meet</span>
          <span className="font-mono">01:13:34 PM</span>
        </div>
      </div>
    </div>
  );
}

function StreamsSection() {
  const line = "#79D6C2";
  const sources = [
    {
      name: "Microsoft Teams",
      node: (
        <svg viewBox="0 0 32 32" className="h-7 w-7" aria-hidden>
          <path fill="#5059C9" d="M20 11h8a2 2 0 0 1 2 2v6a5 5 0 0 1-5 5 5 5 0 0 1-5-5v-8z" />
          <circle cx="26" cy="7" r="3" fill="#5059C9" />
          <path fill="#4B53BC" d="M2 8h18v14a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V8z" />
          <circle cx="14" cy="5" r="4" fill="#4B53BC" />
          <path fill="#fff" d="M6 12h10v2h-4v8h-2v-8H6z" />
        </svg>
      ),
    },
    {
      name: "Google Meet",
      node: <img src={meetLogo.url} alt="Google Meet" className="h-8 w-8 object-contain" />,
    },
    {
      name: "Zoom",
      node: <img src={zoomLogo.url} alt="Zoom" className="h-8 w-8 object-contain" />,
    },
  ];
  const targets = [
    {
      name: "ChatGPT",
      node: <img src={chatgptLogo.url} alt="ChatGPT" className="h-8 w-8 object-contain" />,
    },
    {
      name: "Claude",
      node: <img src={claudeLogo.url} alt="Claude" className="h-8 w-8 object-contain" />,
    },
    {
      name: "Groq",
      node: <img src={groqLogo.url} alt="Groq" className="h-8 w-8 object-contain" />,
    },
  ];
  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <div className="reveal rounded-3xl border border-border bg-card p-8 md:p-14">
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
          {/* Diagram */}
          <div className="relative h-[360px] w-full">
            <svg viewBox="0 0 500 360" className="absolute inset-0 h-full w-full" fill="none" preserveAspectRatio="none">
              {/* Left: straight lines from each source card (x=64, y=50/180/310) to hub left edge (x=186, y=180) */}
              <line x1="64" y1="50" x2="186" y2="180" stroke={line} strokeWidth="1.5" />
              <line x1="64" y1="180" x2="186" y2="180" stroke={line} strokeWidth="1.5" />
              <line x1="64" y1="310" x2="186" y2="180" stroke={line} strokeWidth="1.5" />
              {/* Right: straight lines from hub right edge (x=314, y=180) to target cards (x=436, y=50/180/310) */}
              <line x1="314" y1="180" x2="436" y2="50" stroke={line} strokeWidth="1.5" />
              <line x1="314" y1="180" x2="436" y2="180" stroke={line} strokeWidth="1.5" />
              <line x1="314" y1="180" x2="436" y2="310" stroke={line} strokeWidth="1.5" />
            </svg>

            {/* Source tiles */}
            <div className="absolute left-0 top-0 flex h-full flex-col justify-between">
              {sources.map((s) => (
                <div
                  key={s.name}
                  title={s.name}
                  className="grid h-14 w-14 place-items-center rounded-xl border border-border bg-background shadow-sm"
                >
                  {s.node}
                </div>
              ))}
            </div>

            {/* Clio hub - centered vertically, larger */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 grid h-32 w-32 place-items-center rounded-2xl bg-foreground shadow-lg">
              <img
                src={mark.url}
                alt="Clio"
                className="h-16 w-16 object-contain invert dark:invert-0"
              />
            </div>

            {/* Target tiles */}
            <div className="absolute right-0 top-0 flex h-full flex-col justify-between">
              {targets.map((t) => (
                <div
                  key={t.name}
                  title={t.name}
                  className="grid h-14 w-14 place-items-center rounded-xl border border-border bg-background shadow-sm"
                >
                  {t.node}
                </div>
              ))}
            </div>
          </div>

          {/* Copy */}
          <div>
            <div className="inline-flex items-center gap-2 text-xs text-muted-foreground">
              <Sparkles className="h-3.5 w-3.5 text-accent" />
              Real-time meeting data for AI
            </div>
            <h2 className="mt-4 font-display text-3xl font-medium leading-tight md:text-5xl">
              Feed meetings into your AI. <span className="italic text-accent">Live.</span>
            </h2>
            <p className="mt-5 max-w-md text-muted-foreground">
              AI needs data, and the best data is real-time. Clio streams transcripts, audio, and context
              from any meeting straight to your models and agents — as it happens.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function FeaturesSection() {
  const features = [
    {
      icon: CalendarDays,
      title: "Pre-Meeting Summary",
      desc: "Agendas, previous context, pending action items, participants, and discussion history — surfaced before you dial in.",
      mock: (
        <div className="space-y-2">
          {[
            { l: "Agenda", v: "Q4 roadmap · 4 items" },
            { l: "Previous meeting", v: "Oct 12 · 8 decisions" },
            { l: "Pending tasks", v: "3 open" },
            { l: "Participants", v: "5 invited" },
          ].map((r) => (
            <div key={r.l} className="flex items-center justify-between rounded-md bg-white/[0.03] px-2.5 py-1.5 text-[11px]">
              <span className="text-white/60">{r.l}</span>
              <span className="text-white/90">{r.v}</span>
            </div>
          ))}
        </div>
      ),
    },
    {
      icon: FileCheck2,
      title: "Post-Meeting Summary",
      desc: "Executive summary, key discussion points, decisions, next steps, and highlights — the moment the call ends.",
      mock: (
        <div className="space-y-1.5 text-[11px]">
          {[
            ["Executive Summary", "3 paragraphs"],
            ["Key Highlights", "6 bullets"],
            ["Decisions", "4 tagged"],
            ["Next Steps", "5 owners"],
          ].map(([l, v]) => (
            <div key={l} className="flex items-center gap-2 rounded-md bg-white/[0.03] px-2.5 py-1.5">
              <CheckSquare className="h-3 w-3 text-emerald-400" />
              <span className="text-white/80 flex-1">{l}</span>
              <span className="text-white/50">{v}</span>
            </div>
          ))}
        </div>
      ),
    },
    {
      icon: CheckSquare,
      title: "Suggested Actions & Tasks",
      desc: "Action items extracted automatically with owners, priorities, deadlines, and status assigned by AI.",
      mock: (
        <div className="space-y-1.5 text-[11px]">
          {[
            { t: "Ship API v2", o: "Bob", p: "High", d: "Fri", s: "open" },
            { t: "Security review", o: "Alice", p: "Med", d: "Mon", s: "todo" },
            { t: "Update pricing", o: "Carol", p: "Low", d: "Nov 3", s: "done" },
          ].map((r) => (
            <div key={r.t} className="grid grid-cols-[1fr_auto_auto_auto] items-center gap-2 rounded-md bg-white/[0.03] px-2.5 py-1.5">
              <span className="text-white/90 truncate">{r.t}</span>
              <span className="text-white/50">{r.o}</span>
              <span className={`rounded px-1.5 py-0.5 text-[10px] ${r.p === "High" ? "bg-rose-500/20 text-rose-300" : r.p === "Med" ? "bg-amber-500/20 text-amber-300" : "bg-white/10 text-white/60"}`}>{r.p}</span>
              <span className="text-white/50">{r.d}</span>
            </div>
          ))}
        </div>
      ),
    },
    {
      icon: Bot,
      title: "Interactive AI Bot",
      desc: "Ask questions, summarize discussions, explain decisions, search transcripts, and execute commands in real time.",
      mock: (
        <div className="space-y-2">
          <div className="rounded-md bg-white/[0.03] px-2.5 py-1.5 text-[11px] text-white/70">
            <span className="text-emerald-400">You:</span> Summarize the pricing thread
          </div>
          <div className="rounded-md bg-white/[0.05] px-2.5 py-1.5 text-[11px] text-white/80">
            <span className="text-white/50">Clio:</span> Team agreed on tiered pricing, launch Nov 3…
          </div>
          <div className="flex flex-wrap gap-1.5">
            {["Summarize", "Explain", "Search", "Ask AI"].map((c) => (
              <span key={c} className="rounded-full border border-white/10 bg-white/[0.03] px-2 py-0.5 text-[10px] text-white/70">{c}</span>
            ))}
          </div>
        </div>
      ),
    },
    {
      icon: Mic,
      title: "Recordings",
      desc: "Secure recording with synchronized transcript playback and audio waveform visualization.",
      mock: (
        <div className="rounded-md bg-white/[0.03] p-2.5">
          <div className="flex items-center justify-between text-[11px] text-white/70">
            <span className="flex items-center gap-1.5"><Play className="h-3 w-3" /> standup-11-14.webm</span>
            <Download className="h-3 w-3 text-white/50" />
          </div>
          <div className="mt-2 flex h-8 items-end gap-[2px]">
            {Array.from({ length: 40 }).map((_, i) => (
              <span key={i} className="flex-1 rounded-sm bg-emerald-400/70" style={{ height: `${20 + Math.abs(Math.sin(i * 0.7)) * 80}%`, opacity: i < 22 ? 1 : 0.35 }} />
            ))}
          </div>
          <div className="mt-1 flex justify-between text-[10px] text-white/50">
            <span>12:04</span><span>34:12</span>
          </div>
        </div>
      ),
    },
    {
      icon: Database,
      title: "Storage",
      desc: "Recordings, summaries, transcripts, documents, and metadata — one secure centralized workspace.",
      mock: (
        <div className="grid grid-cols-2 gap-1.5 text-[11px]">
          {[
            ["Recordings", "128"],
            ["Summaries", "342"],
            ["Transcripts", "421"],
            ["Shared Files", "89"],
          ].map(([l, v]) => (
            <div key={l} className="rounded-md bg-white/[0.03] px-2.5 py-2">
              <div className="text-white/60">{l}</div>
              <div className="text-white/90 font-medium">{v}</div>
            </div>
          ))}
        </div>
      ),
    },
    {
      icon: UsersRound,
      title: "Team Management",
      desc: "Members, roles, permissions, departments, and workspace settings — under a single control plane.",
      mock: (
        <div className="space-y-1.5 text-[11px]">
          {[
            { n: "Alice Chen", r: "Admin", c: "#c8b6a6" },
            { n: "Bob Rodriguez", r: "Editor", c: "#a4b494" },
            { n: "Carol Wu", r: "Viewer", c: "#7a9e7e" },
          ].map((m) => (
            <div key={m.n} className="flex items-center gap-2 rounded-md bg-white/[0.03] px-2.5 py-1.5">
              <span className="h-5 w-5 rounded-full" style={{ background: m.c }} />
              <span className="flex-1 text-white/90 truncate">{m.n}</span>
              <span className="rounded bg-white/10 px-1.5 py-0.5 text-[10px] text-white/70">{m.r}</span>
            </div>
          ))}
        </div>
      ),
    },
    {
      icon: FileText,
      title: "Transcripts",
      desc: "Speaker-separated, timestamped transcripts with high accuracy and searchable conversation history.",
      mock: (
        <div className="space-y-1.5 text-[11px] font-mono">
          {[
            { t: "00:02", s: "Alice", c: "Let's finalize the API." },
            { t: "00:10", s: "Bob", c: "I'll prepare the docs." },
            { t: "00:25", s: "Carol", c: "We should deploy tomorrow." },
          ].map((r) => (
            <div key={r.t} className="rounded-md bg-white/[0.03] px-2.5 py-1.5">
              <span className="text-white/40">{r.t}</span>{" "}
              <span className="text-emerald-400">{r.s}:</span>{" "}
              <span className="text-white/80">{r.c}</span>
            </div>
          ))}
        </div>
      ),
    },
    {
      icon: Search,
      title: "Knowledge Search",
      desc: "Search across meetings, transcripts, summaries, recordings, and uploaded documents in natural language.",
      mock: (
        <div className="space-y-2">
          <div className="flex items-center gap-2 rounded-md bg-white/[0.03] px-2.5 py-1.5 text-[11px] text-white/60">
            <Search className="h-3 w-3" /> Ask across all meetings…
          </div>
          <div className="flex flex-wrap gap-1.5">
            {["Q4 roadmap", "API launch", "pricing"].map((c) => (
              <span key={c} className="rounded-full border border-white/10 bg-white/[0.03] px-2 py-0.5 text-[10px] text-white/70">{c}</span>
            ))}
          </div>
          <div className="rounded-md bg-white/[0.05] px-2.5 py-1.5 text-[11px] text-white/80">
            3 meetings · 12 decisions matched
          </div>
        </div>
      ),
    },
  ];

  return (
    <section id="features" className="relative py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="rounded-3xl bg-[#0a0a0a] p-6 md:p-10 lg:p-14 text-white">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
            {/* Left hero */}
            <div className="relative flex flex-col justify-between overflow-hidden rounded-2xl bg-gradient-to-b from-white/[0.04] to-transparent p-8 md:p-10 min-h-[520px]">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[11px] text-white/60">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> All-in-one platform
                </div>
                <h2 className="mt-6 font-display text-3xl font-medium leading-[1.05] md:text-5xl">
                  Everything your meetings need — <span className="italic text-emerald-300">powered by AI.</span>
                </h2>
                <p className="mt-5 max-w-md text-sm text-white/60 md:text-base">
                  Capture meetings, generate intelligent summaries, assign action items, search organizational knowledge,
                  and collaborate with AI — all from one unified platform.
                </p>
              </div>

              {/* Glowing orb */}
              <div className="relative mt-10 flex items-center justify-center">
                <div className="absolute h-56 w-56 rounded-full bg-emerald-500/20 blur-3xl" />
                <div className="absolute h-40 w-40 rounded-full bg-emerald-300/30 blur-2xl" />
                <div className="relative h-32 w-32 rounded-full bg-gradient-to-br from-emerald-200 via-emerald-400 to-emerald-700 shadow-[0_0_80px_20px_rgba(52,211,153,0.35)]">
                  <div className="absolute inset-3 rounded-full bg-gradient-to-tl from-transparent via-white/20 to-white/60 mix-blend-overlay" />
                </div>
              </div>
            </div>

            {/* Right feature grid 3x3 */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {features.map((f) => (
                <div key={f.title} className="reveal group flex flex-col rounded-2xl border border-white/10 bg-white/[0.02] p-5 transition hover:bg-white/[0.04]">
                  <div className="flex items-center justify-between">
                    <div className="grid h-8 w-8 place-items-center rounded-lg bg-white/[0.06]">
                      <f.icon className="h-4 w-4 text-emerald-300" />
                    </div>
                    <ArrowUpRightIcon className="h-4 w-4 text-white/30 transition group-hover:text-white/70" />
                  </div>
                  <h3 className="mt-4 font-display text-base font-medium">{f.title}</h3>
                  <p className="mt-1.5 text-xs text-white/55 leading-relaxed">{f.desc}</p>
                  <div className="mt-4 pt-4 border-t border-white/5">{f.mock}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

