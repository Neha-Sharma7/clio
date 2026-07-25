import { createFileRoute, notFound } from "@tanstack/react-router";
import { PageHeader } from "./app";
import { getOrg, participants } from "@/lib/mock";
import { Avatar } from "@/components/avatar";
import { UserPlus, ShieldCheck, Clock } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/app/organizations/$id")({
  loader: ({ params }) => {
    const o = getOrg(params.id);
    if (!o) throw notFound();
    return { org: o };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: loaderData ? `${loaderData.org.name} · Clio` : "Organization · Clio" },
      { name: "description", content: loaderData?.org.description || "Organization details." },
    ],
  }),
  component: OrgDetail,
});

function OrgDetail() {
  const { org } = Route.useLoaderData();
  return (
    <div>
      <PageHeader
        title={org.name}
        description={org.description}
        crumbs={[{ label: "Organizations", to: "/app/organizations" }, { label: org.name }]}
        actions={
          <button
            onClick={() => toast.success("Invitation sent")}
            className="inline-flex items-center gap-1.5 rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background hover:opacity-90 transition"
          >
            <UserPlus className="h-3.5 w-3.5" /> Invite member
          </button>
        }
      />
      <div className="px-4 md:px-8 py-6 space-y-6">
        {/* Analytics */}
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {[
            { l: "Members", v: org.members },
            { l: "Meetings", v: org.meetings },
            { l: "Decisions", v: 214 },
            { l: "Actions open", v: 27 },
          ].map(s => (
            <div key={s.l} className="rounded-2xl border border-border bg-card p-5">
              <div className="text-xs uppercase tracking-wider text-muted-foreground">{s.l}</div>
              <div className="mt-2 font-display text-2xl font-medium">{s.v}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <section className="lg:col-span-2 rounded-2xl border border-border bg-card p-5">
            <h2 className="font-display text-sm font-medium mb-3">Members</h2>
            <ul className="divide-y divide-border">
              {participants.map(p => (
                <li key={p.id} className="flex items-center gap-3 py-3">
                  <Avatar p={p} size={34} />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium truncate">{p.name}</p>
                    <p className="text-[10px] text-muted-foreground">{p.email}</p>
                  </div>
                  <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium">{p.role}</span>
                  <ShieldCheck className="h-3.5 w-3.5 text-accent" />
                </li>
              ))}
            </ul>
          </section>

          <div className="space-y-6">
            <section className="rounded-2xl border border-border bg-card p-5">
              <h2 className="font-display text-sm font-medium mb-3">Pending requests</h2>
              <ul className="space-y-2">
                {[
                  { name: "Emma Costa", email: "emma@northwind.co" },
                  { name: "Jonas Kim", email: "jonas@northwind.co" },
                ].map(r => (
                  <li key={r.email} className="flex items-center justify-between rounded-lg border border-border bg-background p-3">
                    <div>
                      <p className="text-sm font-medium">{r.name}</p>
                      <p className="text-[10px] text-muted-foreground">{r.email}</p>
                    </div>
                    <div className="flex gap-1">
                      <button onClick={() => toast.success("Approved")} className="rounded-full bg-foreground px-3 py-1 text-[10px] text-background">Approve</button>
                      <button onClick={() => toast("Declined")} className="rounded-full border border-border px-3 py-1 text-[10px]">Decline</button>
                    </div>
                  </li>
                ))}
              </ul>
            </section>

            <section className="rounded-2xl border border-border bg-card p-5">
              <h2 className="font-display text-sm font-medium mb-3">Verification queue</h2>
              <ul className="space-y-2 text-xs">
                <li className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="h-3 w-3" /> 2 domain claims pending
                </li>
                <li className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="h-3 w-3" /> 1 SSO configuration in review
                </li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
