import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PageHeader } from "./app";
import { StatusBadge } from "./app.index";
import { getMeeting, participants, transcript, actionItems, type Meeting } from "@/lib/mock";
import { AvatarStack, Avatar } from "@/components/avatar";
import { Mic, Download, Share2, Sparkles, ListChecks, AlertTriangle, CheckCircle2, Play, Pause } from "lucide-react";
import { format, parseISO } from "date-fns";
import { useState } from "react";
import { motion } from "framer-motion";

export const Route = createFileRoute("/app/meetings/$id")({
  loader: ({ params }): { meeting: Meeting } => {
    const m = getMeeting(params.id);
    if (!m) throw notFound();
    return { meeting: m };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: loaderData ? `${loaderData.meeting.title} · Clio` : "Meeting · Clio" },
      { name: "description", content: loaderData?.meeting.summary?.slice(0, 155) || "Meeting details, transcript, decisions, and action items." },
    ],
  }),
  component: MeetingDetail,
});

function MeetingDetail() {
  const { meeting } = Route.useLoaderData();
  const [recording, setRecording] = useState(false);
  const actions = actionItems.filter(a => a.meetingId === meeting.id);

  return (
    <div>
      <PageHeader
        title={meeting.title}
        crumbs={[{ label: "Meetings", to: "/app/meetings" }, { label: meeting.title }]}
        description={`${format(parseISO(meeting.date), "EEE, MMM d · h:mm a")} · ${meeting.duration}m · ${meeting.organization}`}
        actions={
          <>
            <button className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-2 text-xs font-medium hover:bg-muted transition">
              <Share2 className="h-3.5 w-3.5" /> Share
            </button>
            <button className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-2 text-xs font-medium hover:bg-muted transition">
              <Download className="h-3.5 w-3.5" /> Download MoM
            </button>
          </>
        }
      />

      <div className="px-4 md:px-8 py-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left */}
        <div className="lg:col-span-2 space-y-6">
          {/* Header row */}
          <div className="flex items-center justify-between rounded-2xl border border-border bg-card p-4">
            <div className="flex items-center gap-3">
              <StatusBadge status={meeting.status} />
              <AvatarStack ids={meeting.participants} max={6} size={30} />
              <span className="text-xs text-muted-foreground">{meeting.participants.length} participants</span>
            </div>
            <button
              onClick={() => setRecording(v => !v)}
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-xs font-medium transition ${recording ? "bg-accent text-accent-foreground" : "bg-foreground text-background"}`}
            >
              {recording ? <><Pause className="h-3.5 w-3.5" /> Stop recording</> : <><Mic className="h-3.5 w-3.5" /> Start recording</>}
            </button>
          </div>

          {/* AI Summary */}
          {meeting.summary && (
            <Section title="AI Summary" icon={<Sparkles className="h-3.5 w-3.5 text-accent" />}>
              <p className="text-sm leading-relaxed text-foreground/90">{meeting.summary}</p>
              {meeting.keyPoints && (
                <div className="mt-4">
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Key points</p>
                  <ul className="mt-2 space-y-1.5">
                    {meeting.keyPoints.map((k: string, i: number) => (
                      <li key={i} className="flex gap-2 text-sm"><span className="mt-1.5 h-1 w-1 rounded-full bg-accent" />{k}</li>
                    ))}
                  </ul>
                </div>
              )}
            </Section>
          )}

          {/* Decisions */}
          {meeting.decisions && (
            <Section title="Decisions" icon={<CheckCircle2 className="h-3.5 w-3.5 text-accent" />}>
              <ul className="space-y-2">
                {meeting.decisions.map((d: string, i: number) => (
                  <li key={i} className="rounded-xl border border-border bg-background p-3 text-sm">{d}</li>
                ))}
              </ul>
            </Section>
          )}

          {/* Transcript */}
          <Section title="Transcript" icon={<Play className="h-3.5 w-3.5 text-accent" />}>
            <ul className="space-y-4">
              {transcript.map((t, i) => (
                <motion.li key={i}
                  initial={{ opacity: 0, x: -8 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                  className="flex gap-3">
                  <span className="w-12 shrink-0 text-[10px] text-muted-foreground pt-1">{t.time}</span>
                  <div>
                    <p className="text-xs font-medium">{t.speaker}</p>
                    <p className="text-sm text-foreground/85">{t.text}</p>
                  </div>
                </motion.li>
              ))}
            </ul>
          </Section>
        </div>

        {/* Right */}
        <div className="space-y-6">
          <Section title="Participants">
            <ul className="space-y-2">
              {meeting.participants.map((id: string) => {
                const p = participants.find(x => x.id === id)!;
                return (
                  <li key={id}>
                    <Link to="/app/participants/$id" params={{ id }} className="flex items-center gap-3 rounded-lg p-2 hover:bg-muted transition">
                      <Avatar p={p} size={30} />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium">{p.name}</p>
                        <p className="truncate text-[10px] text-muted-foreground">{p.role}</p>
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </Section>

          <Section title="Action items" icon={<ListChecks className="h-3.5 w-3.5 text-accent" />}>
            {actions.length === 0 ? (
              <p className="text-xs text-muted-foreground">No action items yet.</p>
            ) : (
              <ul className="space-y-2">
                {actions.map(a => {
                  const owner = participants.find(p => p.id === a.owner)!;
                  return (
                    <li key={a.id} className="rounded-xl border border-border bg-background p-3">
                      <p className="text-sm font-medium">{a.title}</p>
                      <div className="mt-2 flex items-center justify-between text-[10px] text-muted-foreground">
                        <span>{owner.name.split(" ")[0]} · due {format(parseISO(a.due), "MMM d")}</span>
                        <StatusBadge status={a.status} />
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </Section>

          {meeting.risks && (
            <Section title="Risks" icon={<AlertTriangle className="h-3.5 w-3.5 text-accent" />}>
              <ul className="space-y-2">
                {meeting.risks.map((r: string, i: number) => (
                  <li key={i} className="rounded-lg border border-border bg-background p-3 text-xs">{r}</li>
                ))}
              </ul>
            </Section>
          )}
        </div>
      </div>
    </div>
  );
}

function Section({ title, icon, children }: { title: string; icon?: React.ReactNode; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-border bg-card p-5">
      <h2 className="mb-3 flex items-center gap-1.5 font-display text-sm font-medium">{icon}{title}</h2>
      {children}
    </section>
  );
}
