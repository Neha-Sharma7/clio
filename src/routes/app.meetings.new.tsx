import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { PageHeader } from "./app";
import { participants, organizations } from "@/lib/mock";
import { toast } from "sonner";

export const Route = createFileRoute("/app/meetings/new")({
  head: () => ({
    meta: [
      { title: "New meeting · Clio" },
      { name: "description", content: "Schedule a meeting with AI briefing." },
    ],
  }),
  component: NewMeeting,
});

function NewMeeting() {
  const nav = useNavigate();
  return (
    <div>
      <PageHeader
        title="New meeting"
        description="Schedule it. We'll brief the room and remember the outcome."
        crumbs={[{ label: "Meetings", to: "/app/meetings" }, { label: "New" }]}
      />
      <div className="px-4 md:px-8 py-6">
        <form
          onSubmit={(e) => { e.preventDefault(); toast.success("Meeting scheduled"); nav({ to: "/app/meetings" }); }}
          className="max-w-2xl space-y-5 rounded-2xl border border-border bg-card p-6"
        >
          <Field label="Title"><input required defaultValue="Q4 Planning Kickoff" className={inputCls} /></Field>
          <Field label="Description">
            <textarea rows={3} defaultValue="Kickoff the Q4 planning cycle: goals, headcount, and top themes."
              className={inputCls} />
          </Field>
          <Field label="Agenda">
            <textarea rows={4} placeholder="1. Review Q3&#10;2. Set Q4 themes&#10;3. Owners"
              className={inputCls} />
          </Field>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Field label="Date"><input type="date" defaultValue="2026-07-28" className={inputCls} /></Field>
            <Field label="Time"><input type="time" defaultValue="10:00" className={inputCls} /></Field>
          </div>
          <Field label="Organization">
            <select className={inputCls}>
              {organizations.map(o => <option key={o.id}>{o.name}</option>)}
            </select>
          </Field>
          <Field label="Participants">
            <div className="flex flex-wrap gap-2">
              {participants.map(p => (
                <label key={p.id} className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1.5 text-xs cursor-pointer hover:bg-muted transition">
                  <input type="checkbox" defaultChecked className="accent-[oklch(0.58_0.155_42)]" />
                  {p.name}
                </label>
              ))}
            </div>
          </Field>
          <div className="flex justify-end gap-2 pt-2">
            <button type="button" onClick={() => nav({ to: "/app/meetings" })}
              className="rounded-full border border-border bg-background px-4 py-2 text-sm font-medium hover:bg-muted transition">
              Cancel
            </button>
            <button className="rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background hover:opacity-90 transition">
              Schedule meeting
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

const inputCls = "w-full rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-ring transition";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="text-xs font-medium text-muted-foreground">{label}</label>
      <div className="mt-1">{children}</div>
    </div>
  );
}
