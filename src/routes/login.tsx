import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Logo } from "@/components/logo";
import { useState } from "react";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Login · Clio" },
      { name: "description", content: "Sign in to your Clio organization memory." },
      { property: "og:title", content: "Login · Clio" },
      { property: "og:description", content: "Sign in to your Clio organization memory." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [forgot, setForgot] = useState(false);
  return (
    <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2 bg-background">
      <div className="relative hidden lg:flex flex-col justify-between p-10 bg-muted grain overflow-hidden">
        <Logo />
        <motion.div
          initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }}
          className="max-w-md"
        >
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Welcome back</p>
          <h1 className="mt-3 font-display text-4xl font-medium leading-tight">
            The memory of your organization, one login away.
          </h1>
          <p className="mt-4 text-sm text-muted-foreground">
            "We reduced weekly status meetings by 40% in the first month." — Northwind Labs
          </p>
        </motion.div>
        <p className="text-xs text-muted-foreground">© 2026 Clio</p>
        <div className="pointer-events-none absolute -bottom-40 -left-24 h-96 w-96 rounded-full opacity-40 blur-3xl"
             style={{ background: "radial-gradient(closest-side, oklch(0.58 0.155 42 / 0.35), transparent)" }} />
      </div>

      <div className="flex items-center justify-center p-6">
        <motion.form
          initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
          onSubmit={(e) => { e.preventDefault(); navigate({ to: "/app" }); }}
          className="w-full max-w-sm"
        >
          <div className="lg:hidden mb-8"><Logo /></div>
          <h2 className="font-display text-2xl font-medium">{forgot ? "Reset password" : "Log in"}</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {forgot ? "We'll email a reset link." : "Continue to your organization."}
          </p>

          <div className="mt-6 space-y-3">
            <div>
              <label className="text-xs font-medium text-muted-foreground">Email</label>
              <input type="email" required defaultValue="you@northwind.co"
                className="mt-1 w-full rounded-xl border border-border bg-card px-4 py-2.5 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-ring transition" />
            </div>
            {!forgot && (
              <div>
                <div className="flex items-center justify-between">
                  <label className="text-xs font-medium text-muted-foreground">Password</label>
                  <button type="button" onClick={() => setForgot(true)} className="text-xs text-accent hover:underline">Forgot?</button>
                </div>
                <input type="password" required defaultValue="••••••••"
                  className="mt-1 w-full rounded-xl border border-border bg-card px-4 py-2.5 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-ring transition" />
              </div>
            )}
          </div>

          <button className="mt-6 inline-flex w-full items-center justify-center gap-1.5 rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background hover:opacity-90 transition">
            {forgot ? "Send reset link" : "Log in"} <ArrowRight className="h-4 w-4" />
          </button>

          {!forgot && (
            <>
              <div className="my-6 flex items-center gap-4 text-xs text-muted-foreground">
                <span className="h-px flex-1 bg-border" /> or <span className="h-px flex-1 bg-border" />
              </div>
              <button type="button" className="w-full rounded-full border border-border bg-card px-5 py-3 text-sm font-medium hover:bg-muted transition">
                Continue with Google
              </button>
            </>
          )}

          <p className="mt-6 text-center text-xs text-muted-foreground">
            {forgot ? (
              <button type="button" onClick={() => setForgot(false)} className="text-accent hover:underline">Back to login</button>
            ) : (
              <>New here? <Link to="/register" className="text-accent hover:underline">Create an account</Link></>
            )}
          </p>
        </motion.form>
      </div>
    </div>
  );
}
