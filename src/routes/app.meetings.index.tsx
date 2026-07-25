import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { PageHeader } from "./app";
import { StatusBadge } from "./app.index";
import { meetings } from "@/lib/mock";
import { AvatarStack } from "@/components/avatar";
import { Plus, Search, Filter } from "lucide-react";
import { format, parseISO } from "date-fns";
import { useState } from "react";

export const Route = createFileRoute("/app/meetings/")({
  head: () => ({
    meta: [
      { title: "Meetings · Clio" },
      { name: "description", content: "Every meeting your organization remembers." },
    ],
  }),
  component: MeetingsList,
});

function MeetingsList() {
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState<"all" | "upcoming" | "completed">("all");
  const filtered = meetings.filter(m => {
    if (filter !== "all" && m.status !== filter) return false;
    if (q && !m.title.toLowerCase().includes(q.toLowerCase())) return false;
    return true;
  });

  return (
    <div>
      <PageHeader
        title="Meetings"
        description="A memory-backed record of every conversation."
        actions={
          <Link to="/app/meetings/new" className="inline-flex items-center gap-1.5 rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background hover:opacity-90 transition">
            <Plus className="h-3.5 w-3.5" /> New meeting
          </Link>
        }
      />
      <div className="px-4 md:px-8 py-6 space-y-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="flex flex-1 items-center gap-2 rounded-full border border-border bg-card px-3 py-2 text-sm">
            <Search className="h-3.5 w-3.5 text-muted-foreground" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search meetings…"
              className="w-full bg-transparent outline-none placeholder:text-muted-foreground" />
          </div>
          <div className="inline-flex gap-1 rounded-full border border-border bg-card p-1 text-xs">
            {(["all","upcoming","completed"] as const).map(f => (
              <button key={f} onClick={() => setFilter(f)}
                className={`px-3 py-1.5 rounded-full font-medium capitalize transition ${filter === f ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"}`}>
                {f}
              </button>
            ))}
          </div>
          <button className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-2 text-xs text-muted-foreground hover:text-foreground transition">
            <Filter className="h-3.5 w-3.5" /> Filters
          </button>
        </div>

        <motion.div
          initial="hidden" animate="show"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.04 } } }}
          className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3"
        >
          {filtered.map(m => (
            <motion.div key={m.id} variants={{ hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } }}>
              <Link to="/app/meetings/$id" params={{ id: m.id }}
                className="block rounded-2xl border border-border bg-card p-5 h-full transition hover:-translate-y-0.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-wider text-muted-foreground">{m.organization}</span>
                  <StatusBadge status={m.status} />
                </div>
                <h3 className="mt-2 font-display text-base font-medium">{m.title}</h3>
                <p className="mt-1 text-xs text-muted-foreground line-clamp-2">
                  {m.summary || "AI briefing will be prepared 30 minutes before the meeting."}
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <AvatarStack ids={m.participants} />
                  <span className="text-[10px] text-muted-foreground">
                    {format(parseISO(m.date), "MMM d · h:mm a")}
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {filtered.length === 0 && (
          <div className="rounded-2xl border border-dashed border-border p-16 text-center">
            <p className="font-display text-lg font-medium">No meetings match</p>
            <p className="mt-1 text-sm text-muted-foreground">Try clearing filters or a different query.</p>
          </div>
        )}
      </div>
    </div>
  );
}
