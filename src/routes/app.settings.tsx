import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "./app";
import { participants } from "@/lib/mock";
import { Avatar } from "@/components/avatar";
import { useState } from "react";
import { toast } from "sonner";
import { useTheme } from "@/lib/theme";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/settings")({
  head: () => ({
    meta: [
      { title: "Settings · Clio" },
      { name: "description", content: "Manage your profile, appearance, and account." },
    ],
  }),
  component: SettingsPage,
});

const TABS = ["Profile","Appearance","Notifications","Organization","Security","Connections"] as const;

function SettingsPage() {
  const [tab, setTab] = useState<(typeof TABS)[number]>("Profile");
  const { theme, setTheme } = useTheme();
  const me = participants[0];

  return (
    <div>
      <PageHeader title="Settings" description="Preferences and account." />
      <div className="px-4 md:px-8 py-6 grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-6">
        <nav className="flex flex-row lg:flex-col gap-1 overflow-x-auto">
          {TABS.map(t => (
            <button key={t} onClick={() => setTab(t)}
              className={cn("rounded-lg px-3 py-2 text-sm text-left whitespace-nowrap transition",
                tab === t ? "bg-card border border-border font-medium" : "text-muted-foreground hover:text-foreground")}>
              {t}
            </button>
          ))}
        </nav>

        <div className="rounded-2xl border border-border bg-card p-6 space-y-6 max-w-2xl">
          {tab === "Profile" && (
            <>
              <div className="flex items-center gap-4">
                <Avatar p={me} size={64} />
                <div>
                  <p className="font-display text-lg font-medium">{me.name}</p>
                  <p className="text-xs text-muted-foreground">{me.email}</p>
                </div>
              </div>
              <Field label="Full name"><input defaultValue={me.name} className={input} /></Field>
              <Field label="Role"><input defaultValue={me.role} className={input} /></Field>
              <Field label="Email"><input defaultValue={me.email} className={input} /></Field>
              <SaveBar />
            </>
          )}

          {tab === "Appearance" && (
            <>
              <p className="text-sm font-medium">Theme</p>
              <div className="grid grid-cols-2 gap-3 max-w-md">
                {(["light","dark"] as const).map(t => (
                  <button key={t} onClick={() => setTheme(t)}
                    className={cn("rounded-xl border p-4 text-left transition",
                      theme === t ? "border-accent bg-background" : "border-border bg-background hover:bg-muted")}>
                    <div className={cn("mb-3 h-16 rounded-lg", t === "light" ? "bg-[oklch(0.965_0.014_85)]" : "bg-[oklch(0.18_0.012_55)]")} />
                    <p className="text-sm font-medium capitalize">{t}</p>
                  </button>
                ))}
              </div>
            </>
          )}

          {tab === "Notifications" && (
            <>
              {["Meeting reminders","AI briefings","Action item updates","Weekly digest"].map(n => (
                <label key={n} className="flex items-center justify-between">
                  <span className="text-sm">{n}</span>
                  <input type="checkbox" defaultChecked className="h-4 w-4 accent-[oklch(0.58_0.155_42)]" />
                </label>
              ))}
              <SaveBar />
            </>
          )}

          {tab === "Organization" && (
            <>
              <Field label="Organization name"><input defaultValue="Northwind Labs" className={input} /></Field>
              <Field label="Domain"><input defaultValue="northwind.co" className={input} /></Field>
              <Field label="Default meeting duration">
                <select className={input}><option>30 min</option><option>45 min</option><option>60 min</option></select>
              </Field>
              <SaveBar />
            </>
          )}

          {tab === "Security" && (
            <>
              <Field label="Current password"><input type="password" className={input} /></Field>
              <Field label="New password"><input type="password" className={input} /></Field>
              <Field label="Confirm password"><input type="password" className={input} /></Field>
              <div className="rounded-xl border border-border bg-background p-4">
                <p className="text-sm font-medium">Two-factor authentication</p>
                <p className="mt-1 text-xs text-muted-foreground">Currently disabled.</p>
                <button className="mt-3 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium hover:bg-muted transition">Enable 2FA</button>
              </div>
              <SaveBar />
            </>
          )}

          {tab === "Connections" && (
            <>
              {[
                { n: "Google Calendar", s: "Connected" },
                { n: "Slack", s: "Connected" },
                { n: "Notion", s: "Not connected" },
                { n: "Zoom", s: "Not connected" },
              ].map(c => (
                <div key={c.n} className="flex items-center justify-between rounded-xl border border-border bg-background p-4">
                  <div>
                    <p className="text-sm font-medium">{c.n}</p>
                    <p className="text-xs text-muted-foreground">{c.s}</p>
                  </div>
                  <button className="rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium hover:bg-muted transition">
                    {c.s === "Connected" ? "Disconnect" : "Connect"}
                  </button>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

const input = "w-full rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-ring transition";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="text-xs font-medium text-muted-foreground">{label}</label>
      <div className="mt-1">{children}</div>
    </div>
  );
}

function SaveBar() {
  return (
    <div className="flex justify-end pt-2 border-t border-border">
      <button onClick={() => toast.success("Saved")} className="rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background hover:opacity-90 transition">
        Save changes
      </button>
    </div>
  );
}
