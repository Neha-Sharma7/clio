import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Logo } from "@/components/logo";

export const Route = createFileRoute("/register")({
  head: () => ({
    meta: [
      { title: "Create account · Clio" },
      { name: "description", content: "Start building your organization's memory in minutes." },
      { property: "og:title", content: "Create account · Clio" },
      { property: "og:description", content: "Start building your organization's memory in minutes." },
    ],
  }),
  component: RegisterPage,
});

function RegisterPage() {
  const navigate = useNavigate();
  return (
    <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2 bg-background">
      <div className="flex items-center justify-center p-6 order-2 lg:order-1">
        <motion.form
          initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
          onSubmit={(e) => { e.preventDefault(); navigate({ to: "/app" }); }}
          className="w-full max-w-sm"
        >
          <div className="lg:hidden mb-8"><Logo /></div>
          <h2 className="font-display text-2xl font-medium">Create your account</h2>
          <p className="mt-1 text-sm text-muted-foreground">Free for teams up to 10.</p>

          <div className="mt-6 space-y-3">
            {[
              { l: "Full name", t: "text", v: "Aarav Sharma" },
              { l: "Work email", t: "email", v: "aarav@northwind.co" },
              { l: "Organization", t: "text", v: "Northwind Labs" },
              { l: "Password", t: "password", v: "••••••••" },
            ].map((f) => (
              <div key={f.l}>
                <label className="text-xs font-medium text-muted-foreground">{f.l}</label>
                <input type={f.t} defaultValue={f.v} required
                  className="mt-1 w-full rounded-xl border border-border bg-card px-4 py-2.5 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-ring transition" />
              </div>
            ))}
          </div>

          <button className="mt-6 inline-flex w-full items-center justify-center gap-1.5 rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background hover:opacity-90 transition">
            Create account <ArrowRight className="h-4 w-4" />
          </button>

          <p className="mt-6 text-center text-xs text-muted-foreground">
            Already have an account? <Link to="/login" className="text-accent hover:underline">Log in</Link>
          </p>
        </motion.form>
      </div>

      <div className="relative hidden lg:flex flex-col justify-between p-10 bg-muted grain overflow-hidden order-1 lg:order-2">
        <Logo />
        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }} className="max-w-md">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Get started</p>
          <h1 className="mt-3 font-display text-4xl font-medium leading-tight">
            Ten minutes to a memory that lasts forever.
          </h1>
          <ul className="mt-6 space-y-2 text-sm text-muted-foreground">
            <li>· Import your first meeting</li>
            <li>· Invite your team</li>
            <li>· Ask your first question</li>
          </ul>
        </motion.div>
        <p className="text-xs text-muted-foreground">© 2026 Clio</p>
        <div className="pointer-events-none absolute -top-32 -right-24 h-96 w-96 rounded-full opacity-40 blur-3xl"
             style={{ background: "radial-gradient(closest-side, oklch(0.75 0.12 55 / 0.55), transparent)" }} />
      </div>
    </div>
  );
}
