import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { PageHeader } from "./app";
import { actionItems as seed, participants, type ActionItem } from "@/lib/mock";
import { format, parseISO } from "date-fns";
import { useState } from "react";
import { LayoutGrid, List } from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/action-items")({
  head: () => ({
    meta: [
      { title: "Action items · Clio" },
      { name: "description", content: "Track every action across every meeting." },
    ],
  }),
  component: ActionItemsPage,
});

const COLUMNS: { key: ActionItem["status"]; label: string }[] = [
  { key: "todo", label: "To do" },
  { key: "in_progress", label: "In progress" },
  { key: "review", label: "Review" },
  { key: "done", label: "Done" },
];

function ActionItemsPage() {
  const [view, setView] = useState<"board" | "timeline">("board");
  const done = seed.filter(a => a.status === "done").length;
  const progress = Math.round((done / seed.length) * 100);

  return (
    <div>
      <PageHeader
        title="Action items"
        description="What was decided, who owns it, when it's due."
        actions={
          <div className="inline-flex gap-1 rounded-full border border-border bg-card p-1 text-xs">
            <button onClick={() => setView("board")} className={cn("inline-flex items-center gap-1 px-3 py-1.5 rounded-full transition", view === "board" ? "bg-foreground text-background" : "text-muted-foreground")}>
              <LayoutGrid className="h-3 w-3" /> Board
            </button>
            <button onClick={() => setView("timeline")} className={cn("inline-flex items-center gap-1 px-3 py-1.5 rounded-full transition", view === "timeline" ? "bg-foreground text-background" : "text-muted-foreground")}>
              <List className="h-3 w-3" /> Timeline
            </button>
          </div>
        }
      />
      <div className="px-4 md:px-8 py-6 space-y-5">
        <div className="rounded-2xl border border-border bg-card p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-wider text-muted-foreground">Overall progress</p>
              <p className="mt-1 font-display text-2xl font-medium">{done} / {seed.length} completed</p>
            </div>
            <span className="font-display text-xl">{progress}%</span>
          </div>
          <div className="mt-3 h-2 w-full rounded-full bg-muted">
            <motion.div className="h-full rounded-full bg-accent" initial={{ width: 0 }} animate={{ width: `${progress}%` }} transition={{ duration: 0.8 }} />
          </div>
        </div>

        {view === "board" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {COLUMNS.map(col => {
              const items = seed.filter(a => a.status === col.key);
              return (
                <div key={col.key} className="rounded-2xl border border-border bg-card p-3">
                  <div className="flex items-center justify-between px-2 mb-2">
                    <h3 className="text-xs font-medium">{col.label}</h3>
                    <span className="text-[10px] text-muted-foreground">{items.length}</span>
                  </div>
                  <div className="space-y-2">
                    {items.map(a => {
                      const owner = participants.find(p => p.id === a.owner)!;
                      return (
                        <motion.div key={a.id}
                          initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                          className="rounded-xl border border-border bg-background p-3">
                          <div className="flex items-center justify-between">
                            <span className={cn("h-1.5 w-1.5 rounded-full",
                              a.priority === "high" ? "bg-accent" : a.priority === "medium" ? "bg-chart-4" : "bg-muted-foreground/40")} />
                            <span className="text-[10px] text-muted-foreground">Due {format(parseISO(a.due), "MMM d")}</span>
                          </div>
                          <p className="mt-2 text-sm font-medium">{a.title}</p>
                          <p className="mt-2 text-[10px] text-muted-foreground">{owner.name}</p>
                        </motion.div>
                      );
                    })}
                    {items.length === 0 && <p className="px-2 py-4 text-[11px] text-muted-foreground">Nothing here.</p>}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="rounded-2xl border border-border bg-card">
            <ul className="divide-y divide-border">
              {[...seed].sort((a,b) => a.due.localeCompare(b.due)).map(a => {
                const owner = participants.find(p => p.id === a.owner)!;
                return (
                  <li key={a.id} className="flex items-center gap-4 p-4">
                    <div className="w-20 text-xs text-muted-foreground">{format(parseISO(a.due), "MMM d")}</div>
                    <span className={cn("h-1.5 w-1.5 rounded-full",
                      a.priority === "high" ? "bg-accent" : a.priority === "medium" ? "bg-chart-4" : "bg-muted-foreground/40")} />
                    <div className="flex-1">
                      <p className="text-sm font-medium">{a.title}</p>
                      <p className="text-[10px] text-muted-foreground">{owner.name} · {a.priority} priority</p>
                    </div>
                    <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium capitalize">{a.status.replace("_"," ")}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
