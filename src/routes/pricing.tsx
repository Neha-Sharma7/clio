import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, ArrowRight } from "lucide-react";
import { TopNav, SiteFooter } from "./index";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing · Clio" },
      { name: "description", content: "Simple, per-seat pricing for teams of every size. Start free, self-host if you need to." },
      { property: "og:title", content: "Pricing · Clio" },
      { property: "og:description", content: "Simple, per-seat pricing for teams of every size." },
    ],
  }),
  component: PricingPage,
});

const TIERS = [
  {
    name: "Starter",
    price: "Free",
    per: "up to 10 seats",
    features: ["50 meetings / month", "AI summaries & decisions", "Action item tracking", "7-day history"],
    cta: { label: "Start free", to: "/register" as const },
    featured: false,
  },
  {
    name: "Team",
    price: "$18",
    per: "per seat / month",
    features: ["Unlimited meetings", "Knowledge search + citations", "Slack & calendar sync", "1-year history", "Priority support"],
    cta: { label: "Start Team trial", to: "/register" as const },
    featured: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    per: "self-hosted or dedicated",
    features: ["On-prem deployment", "SSO / SCIM / audit logs", "Custom retention", "Dedicated engineer", "SLA + monthly review"],
    cta: { label: "Book a call", to: "/register" as const },
    featured: false,
  },
];

function PricingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <TopNav />
      <section className="mx-auto max-w-4xl px-6 pt-36 pb-14 text-center md:pt-44">
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Pricing</p>
        <h1 className="mt-3 font-display text-4xl font-medium md:text-6xl">
          Simple pricing. <span className="italic text-accent">No lock-in.</span>
        </h1>
        <p className="mx-auto mt-5 max-w-lg text-muted-foreground">
          Start free. Upgrade when your team grows. Self-host any time.
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {TIERS.map((t) => (
            <div
              key={t.name}
              className={
                "flex flex-col rounded-2xl border p-8 transition " +
                (t.featured
                  ? "border-accent/60 bg-card shadow-[0_20px_60px_-30px_oklch(0.52_0.11_165_/_0.4)] md:-translate-y-2"
                  : "border-border bg-card")
              }
            >
              <div className="flex items-center justify-between">
                <h3 className="font-display text-lg font-medium">{t.name}</h3>
                {t.featured && (
                  <span className="rounded-full bg-accent/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-accent">
                    Popular
                  </span>
                )}
              </div>
              <div className="mt-4 flex items-baseline gap-2">
                <span className="font-display text-4xl font-medium">{t.price}</span>
                <span className="text-xs text-muted-foreground">{t.per}</span>
              </div>
              <ul className="mt-6 space-y-2.5 text-sm text-muted-foreground">
                {t.features.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <Link
                to={t.cta.to}
                className={
                  "mt-8 inline-flex items-center justify-center gap-1.5 rounded-full px-5 py-3 text-sm font-medium transition " +
                  (t.featured
                    ? "bg-foreground text-background hover:opacity-90"
                    : "border border-border bg-background hover:bg-muted")
                }
              >
                {t.cta.label} <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          ))}
        </div>

        <p className="mt-12 text-center text-xs text-muted-foreground">
          All plans include end-to-end encryption, GDPR compliance, and open-source self-hosting.
        </p>
      </section>
      <SiteFooter />
    </div>
  );
}
