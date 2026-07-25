// Realistic mock data for the app. All read-only; connect to APIs later.

export type Meeting = {
  id: string;
  title: string;
  date: string; // ISO
  duration: number; // min
  status: "upcoming" | "in_progress" | "completed";
  organization: string;
  participants: string[]; // ids
  summary?: string;
  decisions?: string[];
  keyPoints?: string[];
  risks?: string[];
  tags?: string[];
};

export type Participant = {
  id: string;
  name: string;
  role: string;
  email: string;
  avatarColor: string;
  skills?: string[];
  responsibilities?: string[];
};

export type ActionItem = {
  id: string;
  title: string;
  owner: string; // participant id
  meetingId: string;
  due: string;
  status: "todo" | "in_progress" | "review" | "done";
  priority: "low" | "medium" | "high";
};

export type Organization = {
  id: string;
  name: string;
  members: number;
  meetings: number;
  description: string;
  createdAt: string;
};

export type Notification = {
  id: string;
  title: string;
  body: string;
  time: string;
  kind: "meeting" | "action" | "system";
  read?: boolean;
};

export const participants: Participant[] = [
  { id: "p1", name: "Aarav Sharma", role: "Product Lead", email: "aarav@northwind.co", avatarColor: "oklch(0.62 0.14 45)", skills: ["Product Strategy","Roadmapping","AI"], responsibilities: ["Roadmap ownership","Stakeholder alignment"] },
  { id: "p2", name: "Sofia Ramírez", role: "Engineering Manager", email: "sofia@northwind.co", avatarColor: "oklch(0.55 0.12 25)", skills: ["Backend","Systems","Hiring"], responsibilities: ["Team delivery","Architecture"] },
  { id: "p3", name: "Kenji Watanabe", role: "Design Lead", email: "kenji@northwind.co", avatarColor: "oklch(0.60 0.09 200)", skills: ["Design Systems","Research"], responsibilities: ["Design quality","Brand"] },
  { id: "p4", name: "Priya Menon", role: "Data Scientist", email: "priya@northwind.co", avatarColor: "oklch(0.65 0.13 85)", skills: ["ML","Analytics","SQL"], responsibilities: ["Model performance","Experimentation"] },
  { id: "p5", name: "Leo Almeida", role: "Marketing", email: "leo@northwind.co", avatarColor: "oklch(0.58 0.11 60)", skills: ["Growth","Content"], responsibilities: ["GTM plan","Launches"] },
  { id: "p6", name: "Hannah Weiss", role: "Founder / CEO", email: "hannah@northwind.co", avatarColor: "oklch(0.50 0.08 40)", skills: ["Vision","Fundraising"], responsibilities: ["Strategy","Investor updates"] },
];

export const organizations: Organization[] = [
  { id: "o1", name: "Northwind Labs", members: 42, meetings: 128, description: "AI infrastructure for enterprise teams.", createdAt: "2024-03-11" },
  { id: "o2", name: "Harbor & Hill", members: 18, meetings: 61, description: "Boutique product studio.", createdAt: "2024-08-02" },
  { id: "o3", name: "Fieldnote", members: 7, meetings: 24, description: "Field research platform.", createdAt: "2025-01-19" },
];

export const meetings: Meeting[] = [
  {
    id: "m1", title: "Q4 Roadmap Review", date: "2026-07-24T14:00:00Z", duration: 60,
    status: "upcoming", organization: "Northwind Labs", participants: ["p1","p2","p3","p6"],
    tags: ["roadmap","planning"],
  },
  {
    id: "m2", title: "Design Systems Sync", date: "2026-07-23T09:30:00Z", duration: 45,
    status: "upcoming", organization: "Northwind Labs", participants: ["p3","p1"],
    tags: ["design"],
  },
  {
    id: "m3", title: "Model Evaluation Deep Dive", date: "2026-07-21T15:00:00Z", duration: 75,
    status: "completed", organization: "Northwind Labs", participants: ["p4","p2","p1"],
    summary: "Reviewed the v3 retrieval model. Precision improved 12% on internal benchmarks. Discussed rollout to enterprise tenants and mitigation for latency regressions on cold cache.",
    keyPoints: ["v3 retrieval +12% precision", "Cold-cache p95 up ~180ms", "Enterprise rollout gated by SOC2 review"],
    decisions: ["Ship v3 to design partners next Monday", "Hold general rollout until Aug 5", "Priya to own latency task force"],
    risks: ["Latency regression may impact SLA", "Vector store cost climbing 8% MoM"],
    tags: ["ml","research"],
  },
  {
    id: "m4", title: "Weekly All-Hands", date: "2026-07-18T16:00:00Z", duration: 30,
    status: "completed", organization: "Northwind Labs", participants: ["p1","p2","p3","p4","p5","p6"],
    summary: "Company update on ARR, hiring, and Q4 themes. Two customer wins announced. Onboarding revamp shipping this week.",
    keyPoints: ["ARR crossed $4.2M", "2 enterprise wins closed", "Onboarding v2 shipping Friday"],
    decisions: ["Freeze new hiring for 30 days", "Move All-Hands to biweekly"],
    tags: ["all-hands"],
  },
  {
    id: "m5", title: "Enterprise Onboarding — Vertex Bank", date: "2026-07-16T13:00:00Z", duration: 90,
    status: "completed", organization: "Northwind Labs", participants: ["p1","p5","p6"],
    summary: "Kick-off with Vertex Bank. Scope covers 3 business units and read-only Confluence ingestion in phase 1.",
    keyPoints: ["Phase 1: 3 BUs", "Read-only Confluence + Slack", "Go-live target Sep 15"],
    decisions: ["Assign Leo as CS lead", "Weekly steering committee on Thursdays"],
    tags: ["enterprise","onboarding"],
  },
  {
    id: "m6", title: "Marketing Site Refresh", date: "2026-07-14T10:00:00Z", duration: 45,
    status: "completed", organization: "Harbor & Hill", participants: ["p3","p5"],
    summary: "Aligned on new positioning and hero narrative. Kenji to draft three visual directions by Friday.",
    tags: ["marketing"],
  },
];

export const actionItems: ActionItem[] = [
  { id: "a1", title: "Draft SOC2 gate checklist for v3 rollout", owner: "p2", meetingId: "m3", due: "2026-07-28", status: "in_progress", priority: "high" },
  { id: "a2", title: "Own latency task force + weekly report", owner: "p4", meetingId: "m3", due: "2026-08-01", status: "todo", priority: "high" },
  { id: "a3", title: "Publish onboarding v2 changelog", owner: "p1", meetingId: "m4", due: "2026-07-24", status: "review", priority: "medium" },
  { id: "a4", title: "Set up Vertex Bank steering cadence", owner: "p5", meetingId: "m5", due: "2026-07-23", status: "done", priority: "medium" },
  { id: "a5", title: "Three hero visual directions", owner: "p3", meetingId: "m6", due: "2026-07-25", status: "in_progress", priority: "low" },
  { id: "a6", title: "Q4 roadmap draft for review", owner: "p1", meetingId: "m1", due: "2026-07-24", status: "todo", priority: "high" },
  { id: "a7", title: "Design partner briefing deck", owner: "p3", meetingId: "m3", due: "2026-07-26", status: "todo", priority: "medium" },
];

export const notifications: Notification[] = [
  { id: "n1", title: "Meeting starting in 15 minutes", body: "Q4 Roadmap Review · 4 participants", time: "15m", kind: "meeting" },
  { id: "n2", title: "New action item assigned", body: "Draft SOC2 checklist — due Jul 28", time: "1h", kind: "action" },
  { id: "n3", title: "AI briefing ready", body: "Pre-meeting brief for Design Systems Sync", time: "3h", kind: "system" },
  { id: "n4", title: "Kenji added a decision", body: "In: Marketing Site Refresh", time: "yesterday", kind: "system", read: true },
];

export const transcript: { speaker: string; text: string; time: string }[] = [
  { speaker: "Priya Menon", text: "Rolling into evals — v3 retrieval hit 84.2 precision on the internal set, up from 75. The big gains came from the reranker changes.", time: "00:02" },
  { speaker: "Sofia Ramírez", text: "Great. What did we see on latency? I saw a p95 blip in staging.", time: "00:24" },
  { speaker: "Priya Menon", text: "Yes — cold cache p95 is up about 180 milliseconds. Warm looks flat. I have a fix drafted.", time: "00:41" },
  { speaker: "Aarav Sharma", text: "For rollout: I think design partners next Monday, hold general until SOC2 sign-off, target Aug 5.", time: "01:12" },
  { speaker: "Sofia Ramírez", text: "Agreed. Let's make Priya the DRI on the latency task force and share a weekly note.", time: "01:33" },
];

export const dashboardStats = [
  { label: "Meetings this week", value: "12", delta: "+3" },
  { label: "Action items open", value: "38", delta: "-6" },
  { label: "Decisions logged", value: "127", delta: "+14" },
  { label: "Knowledge queries", value: "412", delta: "+82" },
];

export const activityFeed = [
  { id: "af1", who: "Sofia Ramírez", what: "closed 4 action items in", target: "Model Evaluation Deep Dive", when: "10 min ago" },
  { id: "af2", who: "Clio", what: "generated a pre-meeting briefing for", target: "Q4 Roadmap Review", when: "1 hour ago" },
  { id: "af3", who: "Aarav Sharma", what: "recorded a decision in", target: "Weekly All-Hands", when: "3 hours ago" },
  { id: "af4", who: "Priya Menon", what: "added notes to", target: "Model Evaluation Deep Dive", when: "yesterday" },
];

export const aiInsights = [
  "3 action items from last week are overdue and share the same owner — consider rebalancing.",
  "Two enterprise onboarding meetings mention 'Confluence permissions'. Worth a shared runbook.",
  "Design Systems Sync has met 6 weeks in a row without a decision — try a working session format.",
];

export const suggestedQuestions = [
  "What did we decide about the v3 rollout?",
  "Which action items are blocking Vertex Bank onboarding?",
  "Summarize what Priya has owned in the last 30 days.",
  "When did we last discuss the SOC2 timeline?",
];

export const knowledgeAnswers: Record<string, { answer: string; sources: { meetingId: string; snippet: string }[] }> = {
  default: {
    answer:
      "Based on 4 meetings across the last 21 days, the team agreed to ship v3 retrieval to design partners on Jul 27 and hold general rollout until Aug 5, gated by SOC2 sign-off. Priya owns the latency task force with a weekly note.",
    sources: [
      { meetingId: "m3", snippet: "Ship v3 to design partners next Monday. Hold general rollout until Aug 5. Priya to own latency task force." },
      { meetingId: "m4", snippet: "Onboarding v2 shipping Friday; ARR crossed $4.2M." },
      { meetingId: "m5", snippet: "Kick-off with Vertex Bank. Go-live target Sep 15." },
    ],
  },
};

export function getParticipant(id: string) {
  return participants.find(p => p.id === id);
}
export function getMeeting(id: string) {
  return meetings.find(m => m.id === id);
}
export function getOrg(id: string) {
  return organizations.find(o => o.id === id);
}
