import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles, Search, ListChecks, Brain, Building2, Calendar } from "lucide-react";
import { TopNav, SiteFooter } from "./index";

export const Route = createFileRoute("/products")({
  head: () => ({
    meta: [
      { title: "Products · Clio" },
      { name: "description", content: "Meeting capture, decision extraction, action tracking, and knowledge search — the Clio product suite." },
      { property: "og:title", content: "Products · Clio" },
      { property: "og:description", content: "The Clio product suite for organizational memory." },
    ],
  }),
  component: ProductsPage,
});

const PRODUCTS = [
  { i: Calendar, t: "Meetings", d: "Capture calls, generate summaries, and keep a canonical timeline of every conversation.", tag: "Core" },
  { i: Sparkles, t: "AI Intelligence", d: "Decisions, action items, risks, and blockers extracted the second a call ends.", tag: "AI" },
  { i: ListChecks, t: "Action items", d: "Owners, deadlines, status — synced across Slack, email, and your task tools.", tag: "Workflow" },
  { i: Search, t: "Knowledge search", d: "Ask a question in plain English. Get an answer with the exact source segment.", tag: "Retrieval" },
  { i: Brain, t: "Prep assistant", d: "Every meeting starts with context: history, decisions, and open threads.", tag: "AI" },
  { i: Building2, t: "Organizations", d: "Team spaces, membership, and verified participant profiles across companies.", tag: "Admin" },
];

function ProductsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <TopNav />
      <section className="mx-auto max-w-5xl px-6 pt-36 pb-16 text-center md:pt-44">
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Product suite</p>
        <h1 className="mt-3 font-display text-4xl font-medium md:text-6xl">
          Every part of a meeting, <span className="italic text-accent">remembered.</span>
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-muted-foreground">
          Six connected products that turn conversations into organizational memory.
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {PRODUCTS.map((p, i) => (
            <div key={i} className="group rounded-2xl border border-border bg-card p-7 transition hover:-translate-y-0.5">
              <div className="flex items-center justify-between">
                <div className="grid h-10 w-10 place-items-center rounded-lg bg-muted">
                  <p.i className="h-4 w-4 text-accent" />
                </div>
                <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                  {p.tag}
                </span>
              </div>
              <h3 className="mt-5 font-display text-lg font-medium">{p.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{p.d}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-wrap justify-center gap-3">
          <Link to="/register" className="inline-flex items-center gap-1.5 rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background hover:opacity-90 transition">
            Try it free <ArrowRight className="h-4 w-4" />
          </Link>
          <Link to="/pricing" className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-5 py-3 text-sm font-medium hover:bg-muted transition">
            See pricing
          </Link>
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}
