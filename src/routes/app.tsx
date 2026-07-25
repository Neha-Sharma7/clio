import { Outlet, Link, useRouterState, createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useState, type ReactNode } from "react";
import {
  LayoutDashboard, Calendar, Building2, Search, ListChecks, Settings,
  Bell, ChevronRight, Menu, X, Plus, PanelLeftClose, PanelLeftOpen,
} from "lucide-react";

import { Logo } from "@/components/logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { Avatar } from "@/components/avatar";
import { participants, notifications } from "@/lib/mock";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app")({
  head: () => ({
    meta: [
      { title: "Workspace · Clio" },
      { name: "description", content: "Your organizational memory workspace." },
    ],
  }),
  component: AppLayout,
});

const NAV = [
  { to: "/app", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { to: "/app/meetings", label: "Meetings", icon: Calendar },
  { to: "/app/organizations", label: "Organizations", icon: Building2 },
  { to: "/app/knowledge", label: "Knowledge search", icon: Search },
  { to: "/app/action-items", label: "Action items", icon: ListChecks },
  { to: "/app/settings", label: "Settings", icon: Settings },
];

function AppLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Sidebar (desktop) */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 hidden border-r border-border bg-sidebar md:flex md:flex-col transition-[width] duration-300 ease-out",
          collapsed ? "w-16" : "w-60"
        )}
      >
        <div className={cn("flex h-14 items-center border-b border-border", collapsed ? "justify-center px-2" : "justify-between px-5")}>
          {!collapsed && <Logo />}
          <button
            onClick={() => setCollapsed(v => !v)}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            className="grid h-8 w-8 place-items-center rounded-full text-muted-foreground hover:bg-muted hover:text-foreground transition"
          >
            {collapsed ? <PanelLeftOpen className="h-4 w-4" /> : <PanelLeftClose className="h-4 w-4" />}
          </button>
        </div>
        <nav className={cn("flex-1 py-4 space-y-0.5", collapsed ? "px-2" : "px-3")}>
          {NAV.map((n) => {
            const active = n.exact ? pathname === n.to : pathname.startsWith(n.to);
            return (
              <Link
                key={n.to}
                to={n.to}
                title={collapsed ? n.label : undefined}
                className={cn(
                  "group flex items-center rounded-lg text-sm transition",
                  collapsed ? "justify-center h-10 w-10 mx-auto" : "gap-2.5 px-3 py-2",
                  active
                    ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                    : "text-muted-foreground hover:bg-sidebar-accent/60 hover:text-foreground"
                )}
              >
                <n.icon className="h-4 w-4 shrink-0" />
                {!collapsed && <span>{n.label}</span>}
                {!collapsed && active && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-accent" />}
              </Link>
            );
          })}
        </nav>
        <div className={cn("border-t border-border", collapsed ? "p-2" : "p-3")}>
          {collapsed ? (
            <Link to="/app/meetings/new" title="New meeting" className="grid h-10 w-10 mx-auto place-items-center rounded-lg bg-foreground text-background hover:opacity-90 transition">
              <Plus className="h-4 w-4" />
            </Link>
          ) : (
            <>
              <Link to="/app/meetings/new" className="flex items-center gap-2 rounded-lg bg-foreground px-3 py-2 text-sm font-medium text-background hover:opacity-90 transition">
                <Plus className="h-4 w-4" /> New meeting
              </Link>
              <div className="mt-3 flex items-center gap-2 px-1 py-2">
                <Avatar p={participants[0]} size={28} />
                <div className="min-w-0">
                  <div className="truncate text-xs font-medium">{participants[0].name}</div>
                  <div className="truncate text-[10px] text-muted-foreground">{participants[0].role}</div>
                </div>
              </div>
            </>
          )}
        </div>
      </aside>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-40 bg-black/40 md:hidden"
            />
            <motion.aside
              initial={{ x: -280 }} animate={{ x: 0 }} exit={{ x: -280 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed inset-y-0 left-0 z-50 w-64 bg-sidebar border-r border-border md:hidden flex flex-col"
            >
              <div className="flex h-14 items-center justify-between px-5 border-b border-border">
                <Logo />
                <button onClick={() => setMobileOpen(false)} className="grid h-8 w-8 place-items-center rounded-full hover:bg-muted">
                  <X className="h-4 w-4" />
                </button>
              </div>
              <nav className="flex-1 px-3 py-4 space-y-0.5">
                {NAV.map((n) => (
                  <Link key={n.to} to={n.to} onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-sidebar-accent hover:text-foreground">
                    <n.icon className="h-4 w-4" />
                    {n.label}
                  </Link>
                ))}
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main */}
      <div className={cn("transition-[padding] duration-300 ease-out", collapsed ? "md:pl-16" : "md:pl-60")}>
        {/* Topbar */}
        <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-border bg-background/80 backdrop-blur px-4 md:px-8">
          <button onClick={() => setMobileOpen(true)} className="md:hidden grid h-9 w-9 place-items-center rounded-full hover:bg-muted">
            <Menu className="h-4 w-4" />
          </button>

          <div className="hidden md:flex items-center gap-2 flex-1 max-w-md">
            <div className="flex flex-1 items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-sm text-muted-foreground">
              <Search className="h-3.5 w-3.5" />
              <span className="flex-1">Search meetings, decisions, people…</span>
              <kbd className="hidden md:inline text-[10px] rounded bg-muted px-1.5 py-0.5 font-mono">⌘K</kbd>
            </div>
          </div>

          <div className="ml-auto flex items-center gap-2">
            <ThemeToggle />
            <div className="relative">
              <button onClick={() => setNotifOpen(v => !v)} className="relative grid h-9 w-9 place-items-center rounded-full border border-border bg-card hover:bg-muted transition">
                <Bell className="h-4 w-4" />
                <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-accent" />
              </button>
              <AnimatePresence>
                {notifOpen && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setNotifOpen(false)} />
                    <motion.div
                      initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 6 }}
                      className="absolute right-0 mt-2 w-80 rounded-2xl border border-border bg-popover shadow-xl z-20 overflow-hidden"
                    >
                      <div className="border-b border-border p-3 text-xs font-medium">Notifications</div>
                      <ul className="max-h-80 overflow-auto">
                        {notifications.map((n) => (
                          <li key={n.id} className="border-b border-border/60 p-3 last:border-b-0 hover:bg-muted/60 transition">
                            <div className="flex items-start gap-3">
                              <span className={cn("mt-1 h-1.5 w-1.5 rounded-full", n.read ? "bg-muted-foreground/30" : "bg-accent")} />
                              <div className="min-w-0 flex-1">
                                <p className="text-sm font-medium truncate">{n.title}</p>
                                <p className="text-xs text-muted-foreground">{n.body}</p>
                              </div>
                              <span className="text-[10px] text-muted-foreground whitespace-nowrap">{n.time}</span>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
            <Link to="/app/settings" className="grid h-9 w-9 place-items-center rounded-full">
              <Avatar p={participants[0]} size={32} />
            </Link>
          </div>
        </header>

        <main className="min-h-[calc(100vh-3.5rem)]">
          <PageTransitionKey key={pathname}>
            <Outlet />
          </PageTransitionKey>
        </main>
      </div>
    </div>
  );
}


function PageTransitionKey({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

// Shared page header component
export function PageHeader({ title, description, actions, crumbs }: { title: string; description?: string; actions?: ReactNode; crumbs?: { label: string; to?: string }[] }) {
  return (
    <div className="border-b border-border px-4 md:px-8 py-6">
      {crumbs && (
        <nav className="mb-3 flex items-center gap-1 text-xs text-muted-foreground">
          {crumbs.map((c, i) => (
            <span key={i} className="flex items-center gap-1">
              {c.to ? <Link to={c.to} className="hover:text-foreground">{c.label}</Link> : <span>{c.label}</span>}
              {i < crumbs.length - 1 && <ChevronRight className="h-3 w-3" />}
            </span>
          ))}
        </nav>
      )}
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="font-display text-2xl font-medium md:text-3xl">{title}</h1>
          {description && <p className="mt-1 text-sm text-muted-foreground">{description}</p>}
        </div>
        {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
      </div>
    </div>
  );
}
