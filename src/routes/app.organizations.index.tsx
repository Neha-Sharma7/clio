import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { PageHeader } from "./app";
import { organizations } from "@/lib/mock";
import { Plus, Search, Users, Calendar } from "lucide-react";
import { format, parseISO } from "date-fns";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/app/organizations/")({
  head: () => ({
    meta: [
      { title: "Organizations · Clio" },
      { name: "description", content: "Manage the organizations you belong to." },
    ],
  }),
  component: OrgsList,
});

function OrgsList() {
  const [q, setQ] = useState("");
  const filtered = organizations.filter(o => o.name.toLowerCase().includes(q.toLowerCase()));
  return (
    <div>
      <PageHeader
        title="Organizations"
        description="Every team you build memory with."
        actions={
          <button
            onClick={() => toast.success("Coming soon: create organization")}
            className="inline-flex items-center gap-1.5 rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background hover:opacity-90 transition"
          >
            <Plus className="h-3.5 w-3.5" /> Create organization
          </button>
        }
      />
      <div className="px-4 md:px-8 py-6 space-y-5">
        <div className="flex items-center gap-2 rounded-full border border-border bg-card px-3 py-2 max-w-md">
          <Search className="h-3.5 w-3.5 text-muted-foreground" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search organizations…"
            className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground" />
        </div>

        <motion.div
          initial="hidden" animate="show"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05 } } }}
          className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3"
        >
          {filtered.map(o => (
            <motion.div key={o.id} variants={{ hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } }}>
              <Link to="/app/organizations/$id" params={{ id: o.id }}
                className="block rounded-2xl border border-border bg-card p-5 h-full transition hover:-translate-y-0.5">
                <div className="flex items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-xl bg-muted font-display text-sm font-medium">
                    {o.name[0]}
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-display text-base font-medium truncate">{o.name}</h3>
                    <p className="text-[10px] text-muted-foreground">Since {format(parseISO(o.createdAt), "MMM yyyy")}</p>
                  </div>
                </div>
                <p className="mt-3 text-xs text-muted-foreground">{o.description}</p>
                <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1"><Users className="h-3 w-3" /> {o.members}</span>
                  <span className="inline-flex items-center gap-1"><Calendar className="h-3 w-3" /> {o.meetings}</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
