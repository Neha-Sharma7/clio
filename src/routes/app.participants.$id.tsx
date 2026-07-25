import { createFileRoute, notFound } from "@tanstack/react-router";
import { PageHeader } from "./app";
import { getParticipant, meetings, actionItems, participants } from "@/lib/mock";
import { Avatar } from "@/components/avatar";
import { Mail, Sparkles, CheckCircle2, Clock } from "lucide-react";
import { format, parseISO } from "date-fns";

export const Route = createFileRoute("/app/participants/$id")({
  loader: ({ params }) => {
    const p = getParticipant(params.id);
    if (!p) throw notFound();
    return { p };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: loaderData ? `${loaderData.p.name} · Clio` : "Profile · Clio" },
      { name: "description", content: loaderData ? `${loaderData.p.name} — ${loaderData.p.role}` : "Participant profile." },
    ],
  }),
  component: ParticipantPage,
});

function ParticipantPage() {
  const { p } = Route.useLoaderData();
  const attended = meetings.filter(m => m.participants.includes(p.id));
  const tasks = actionItems.filter(a => a.owner === p.id);
  const pending = tasks.filter(t => t.status !== "done");
  const done = tasks.filter(t => t.status === "done");

  return (
    <div>
      <PageHeader title={p.name} description={p.role} crumbs={[{ label: "People" }, { label: p.name }]} />
      <div className="px-4 md:px-8 py-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="space-y-6">
          <section className="rounded-2xl border border-border bg-card p-6 text-center">
            <div className="flex justify-center"><Avatar p={p} size={80} /></div>
            <h2 className="mt-4 font-display text-xl font-medium">{p.name}</h2>
            <p className="text-sm text-muted-foreground">{p.role}</p>
            <a href={`mailto:${p.email}`} className="mt-3 inline-flex items-center gap-1.5 text-xs text-accent hover:underline">
              <Mail className="h-3 w-3" /> {p.email}
            </a>
          </section>

          <section className="rounded-2xl border border-border bg-card p-5">
            <h3 className="font-display text-sm font-medium mb-3">Skills</h3>
            <div className="flex flex-wrap gap-1.5">
              {p.skills?.map((s: string) => (
                <span key={s} className="rounded-full bg-muted px-2.5 py-1 text-[11px]">{s}</span>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-border bg-card p-5">
            <h3 className="font-display text-sm font-medium mb-3">Responsibilities</h3>
            <ul className="space-y-1.5 text-sm">
              {p.responsibilities?.map((r: string) => (
                <li key={r} className="flex gap-2"><span className="mt-1.5 h-1 w-1 rounded-full bg-accent" />{r}</li>
              ))}
            </ul>
          </section>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <section className="rounded-2xl border border-border bg-card p-5">
            <h3 className="font-display text-sm font-medium mb-3 flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-accent" /> AI insights
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="rounded-lg border border-border bg-background p-3">
                {p.name.split(" ")[0]} has contributed to {attended.length} meetings across the last 30 days.
              </li>
              <li className="rounded-lg border border-border bg-background p-3">
                Frequently pairs with {participants.find(x => x.id !== p.id)?.name} on delivery topics.
              </li>
              <li className="rounded-lg border border-border bg-background p-3">
                Owns {pending.length} pending tasks — {pending.filter(t => t.priority === "high").length} high priority.
              </li>
            </ul>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <section className="rounded-2xl border border-border bg-card p-5">
              <h3 className="font-display text-sm font-medium mb-3 flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5 text-accent" /> Pending tasks
              </h3>
              <ul className="space-y-2">
                {pending.length === 0 && <p className="text-xs text-muted-foreground">All clear.</p>}
                {pending.map(t => (
                  <li key={t.id} className="rounded-lg border border-border bg-background p-3">
                    <p className="text-sm">{t.title}</p>
                    <p className="mt-1 text-[10px] text-muted-foreground">Due {format(parseISO(t.due), "MMM d")}</p>
                  </li>
                ))}
              </ul>
            </section>
            <section className="rounded-2xl border border-border bg-card p-5">
              <h3 className="font-display text-sm font-medium mb-3 flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-accent" /> Completed
              </h3>
              <ul className="space-y-2">
                {done.length === 0 && <p className="text-xs text-muted-foreground">Nothing yet.</p>}
                {done.map(t => (
                  <li key={t.id} className="rounded-lg border border-border bg-background p-3 text-sm line-through text-muted-foreground">
                    {t.title}
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <section className="rounded-2xl border border-border bg-card p-5">
            <h3 className="font-display text-sm font-medium mb-3">Meeting history</h3>
            <ol className="relative border-l border-border ml-2 space-y-4">
              {attended.map(m => (
                <li key={m.id} className="ml-4">
                  <span className="absolute -left-[5px] mt-1.5 h-2 w-2 rounded-full bg-accent" />
                  <p className="text-sm font-medium">{m.title}</p>
                  <p className="text-[10px] text-muted-foreground">{format(parseISO(m.date), "EEE, MMM d · h:mm a")}</p>
                </li>
              ))}
            </ol>
          </section>
        </div>
      </div>
    </div>
  );
}
