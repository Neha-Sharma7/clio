import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { PageHeader } from "./app";
import { ArrowUpRight, Plus, Sparkles, CalendarClock, ArrowRight } from "lucide-react";
import { AvatarStack } from "@/components/avatar";
import { dashboardStats, meetings, actionItems, activityFeed, aiInsights, participants } from "@/lib/mock";
import { cn } from "@/lib/utils";
import { format, parseISO } from "date-fns";

export const Route = createFileRoute("/app/")({
  head: () => ({
    meta: [
      { title: "Dashboard · Clio" },
      { name: "description", content: "Your organizational memory at a glance." },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  const upcoming = meetings.filter(m => m.status === "upcoming").slice(0, 3);
  const recent = meetings.filter(m => m.status === "completed").slice(0, 4);
  const pending = actionItems.filter(a => a.status !== "done").slice(0, 5);

  return (
    <div>
      <PageHeader
        title={`Good afternoon, ${participants[0].name.split(" ")[0]}`}
        description="Here's what your organization is remembering today."
        actions={
          <Link to="/app/meetings/new" className="inline-flex items-center gap-1.5 rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background hover:opacity-90 transition">
            <Plus className="h-3.5 w-3.5" /> New meeting
          </Link>
        }
      />
      <div className="px-4 md:px-8 py-8 space-y-8">
        {/* Stats */}
        <motion.div
          initial="hidden" animate="show"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}
          className="grid grid-cols-2 gap-3 md:grid-cols-4"
        >
          {dashboardStats.map((s) => (
            <motion.div
              key={s.label}
              variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}
              className="rounded-2xl border border-border bg-card p-5"
            >
              <div className="text-xs uppercase tracking-wider text-muted-foreground">{s.label}</div>
              <div className="mt-2 flex items-end justify-between">
                <div className="font-display text-3xl font-medium">{s.value}</div>
                <span className={cn("text-xs", s.delta.startsWith("+") ? "text-accent" : "text-muted-foreground")}>{s.delta}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Left col */}
          <div className="lg:col-span-2 space-y-6">
            <Section title="Upcoming meetings" href="/app/meetings">
              <div className="divide-y divide-border">
                {upcoming.map(m => (
                  <Link key={m.id} to="/app/meetings/$id" params={{ id: m.id }} className="flex items-center gap-4 py-4 group">
                    <div className="grid h-11 w-11 place-items-center rounded-xl border border-border bg-background">
                      <CalendarClock className="h-4 w-4 text-accent" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <p className="truncate font-medium text-sm">{m.title}</p>
                        <StatusBadge status={m.status} />
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {format(parseISO(m.date), "EEE, MMM d · h:mm a")} · {m.duration}m · {m.organization}
                      </p>
                    </div>
                    <AvatarStack ids={m.participants} />
                    <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition" />
                  </Link>
                ))}
              </div>
            </Section>

            <Section title="Recent meetings" href="/app/meetings">
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                {recent.map(m => (
                  <Link key={m.id} to="/app/meetings/$id" params={{ id: m.id }}
                    className="rounded-xl border border-border bg-background p-4 hover:-translate-y-0.5 transition">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">{m.title}</p>
                      <StatusBadge status={m.status} />
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{m.summary}</p>
                    <div className="mt-3 flex items-center justify-between">
                      <AvatarStack ids={m.participants} />
                      <span className="text-[10px] text-muted-foreground">{format(parseISO(m.date), "MMM d")}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </Section>

            <Section title="Recent activity">
              <ul className="space-y-3">
                {activityFeed.map(a => (
                  <li key={a.id} className="flex items-start gap-3 text-sm">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-accent" />
                    <p className="flex-1">
                      <span className="font-medium">{a.who}</span>{" "}
                      <span className="text-muted-foreground">{a.what}</span>{" "}
                      <span className="font-medium">{a.target}</span>
                    </p>
                    <span className="text-xs text-muted-foreground whitespace-nowrap">{a.when}</span>
                  </li>
                ))}
              </ul>
            </Section>
          </div>

          {/* Right col */}
          <div className="space-y-6">
            <Section title="AI insights" icon={<Sparkles className="h-3.5 w-3.5 text-accent" />}>
              <ul className="space-y-3">
                {aiInsights.map((t, i) => (
                  <li key={i} className="rounded-xl border border-border bg-background p-3 text-xs leading-relaxed text-muted-foreground">
                    {t}
                  </li>
                ))}
              </ul>
            </Section>

            <Section title="Pending actions" href="/app/action-items">
              <ul className="space-y-2">
                {pending.map(a => {
                  const owner = participants.find(p => p.id === a.owner)!;
                  return (
                    <li key={a.id} className="flex items-center gap-3 rounded-lg border border-border bg-background p-3">
                      <span className={cn("h-1.5 w-1.5 rounded-full",
                        a.priority === "high" ? "bg-accent" : a.priority === "medium" ? "bg-chart-4" : "bg-muted-foreground/40")} />
                      <p className="flex-1 text-xs font-medium truncate">{a.title}</p>
                      <span className="text-[10px] text-muted-foreground">{owner.name.split(" ")[0]}</span>
                    </li>
                  );
                })}
              </ul>
            </Section>

            <Section title="Quick actions">
              <div className="grid grid-cols-2 gap-2">
                {[
                  { l: "New meeting", to: "/app/meetings/new" },
                  { l: "Ask memory", to: "/app/knowledge" },
                  { l: "Organizations", to: "/app/organizations" },
                  { l: "Action items", to: "/app/action-items" },
                ].map(q => (
                  <Link key={q.l} to={q.to} className="rounded-lg border border-border bg-background p-3 text-xs font-medium hover:bg-muted transition">
                    {q.l}
                  </Link>
                ))}
              </div>
            </Section>
          </div>
        </div>
      </div>
    </div>
  );
}

function Section({ title, href, children, icon }: { title: string; href?: string; children: React.ReactNode; icon?: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-border bg-card p-5">
      <div className="flex items-center justify-between mb-3">
        <h2 className="flex items-center gap-1.5 font-display text-sm font-medium">
          {icon}{title}
        </h2>
        {href && (
          <Link to={href} className="text-xs text-muted-foreground hover:text-foreground inline-flex items-center gap-0.5">
            View all <ArrowUpRight className="h-3 w-3" />
          </Link>
        )}
      </div>
      {children}
    </section>
  );
}

export function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    upcoming: "bg-accent/10 text-accent",
    completed: "bg-muted text-muted-foreground",
    in_progress: "bg-chart-4/15 text-chart-4",
    todo: "bg-muted text-muted-foreground",
    review: "bg-chart-3/15 text-chart-3",
    done: "bg-accent/10 text-accent",
  };
  return (
    <span className={cn("rounded-full px-2 py-0.5 text-[10px] font-medium capitalize", map[status] || "bg-muted text-muted-foreground")}>
      {status.replace("_", " ")}
    </span>
  );
}
