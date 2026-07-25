import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { PageHeader } from "./app";
import { suggestedQuestions, knowledgeAnswers, getMeeting } from "@/lib/mock";
import { Sparkles, Send, Search } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/app/knowledge")({
  head: () => ({
    meta: [
      { title: "Knowledge search · Clio" },
      { name: "description", content: "Ask your organization's memory anything." },
    ],
  }),
  component: KnowledgePage,
});

type Msg = { role: "user" | "ai"; text: string; sources?: { meetingId: string; snippet: string }[] };

function KnowledgePage() {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [q, setQ] = useState("");

  const ask = (question: string) => {
    if (!question.trim()) return;
    const ans = knowledgeAnswers.default;
    setMessages(m => [...m, { role: "user", text: question }]);
    setTimeout(() => {
      setMessages(m => [...m, { role: "ai", text: ans.answer, sources: ans.sources }]);
    }, 400);
    setQ("");
  };

  return (
    <div className="flex flex-col min-h-[calc(100vh-3.5rem)]">
      <PageHeader
        title="Knowledge search"
        description="Ask a question. Get an answer with meeting sources."
      />

      <div className="flex-1 px-4 md:px-8 py-6">
        {messages.length === 0 ? (
          <div className="max-w-2xl mx-auto text-center py-10">
            <div className="inline-grid h-12 w-12 place-items-center rounded-full bg-muted mb-4">
              <Sparkles className="h-5 w-5 text-accent" />
            </div>
            <h2 className="font-display text-2xl font-medium">What do you want to remember?</h2>
            <p className="mt-2 text-sm text-muted-foreground">Ask about decisions, action items, meetings, or people.</p>
            <div className="mt-6 grid grid-cols-1 gap-2 sm:grid-cols-2">
              {suggestedQuestions.map(s => (
                <button key={s} onClick={() => ask(s)}
                  className="rounded-xl border border-border bg-card p-3 text-left text-sm hover:-translate-y-0.5 transition">
                  {s}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="max-w-2xl mx-auto space-y-4 pb-24">
            <AnimatePresence initial={false}>
              {messages.map((m, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                  className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm ${m.role === "user" ? "bg-foreground text-background" : "bg-card border border-border"}`}>
                    <p className="leading-relaxed">{m.text}</p>
                    {m.sources && (
                      <div className="mt-3 space-y-2">
                        <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Sources</p>
                        {m.sources.map((s, j) => {
                          const meeting = getMeeting(s.meetingId);
                          return (
                            <Link key={j} to="/app/meetings/$id" params={{ id: s.meetingId }}
                              className="block rounded-lg border border-border bg-background p-2 hover:bg-muted transition">
                              <p className="text-[11px] font-medium">{meeting?.title}</p>
                              <p className="text-[10px] text-muted-foreground line-clamp-2">"{s.snippet}"</p>
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="sticky bottom-0 border-t border-border bg-background/90 backdrop-blur px-4 md:px-8 py-4">
        <form onSubmit={(e) => { e.preventDefault(); ask(q); }}
          className="max-w-2xl mx-auto flex items-center gap-2 rounded-2xl border border-border bg-card px-4 py-2.5">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input value={q} onChange={(e) => setQ(e.target.value)}
            placeholder="Ask your organization's memory…"
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground" />
          <button className="grid h-8 w-8 place-items-center rounded-full bg-foreground text-background">
            <Send className="h-3.5 w-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
}
