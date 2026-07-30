/**
 * Starter templates + custom template save/load (local only).
 * Plain language: "Start from a template", "Save as template".
 */

export const BUILTIN_TEMPLATES = [
  {
    id: "pitch",
    name: "Pitch deck",
    blurb: "Title, problem, solution, traction, and ask",
    brand: {
      primary: "#0d9488", secondary: "#14b8a6", accent: "#f59e0b",
      bg: "#042f2e", text: "#ecfdf5", bg2: "#0f766e", bgMode: "gradient", bgAngle: 145
    },
    steps: [
      { type: "content", layout: "title", name: "Title", heading: "Your product name", subhead: "One-line value for buyers", bullets: [] },
      { type: "content", layout: "bullets", name: "Problem", heading: "The problem", subhead: "", bullets: ["Pain point one", "Pain point two", "Why it matters now"] },
      { type: "content", layout: "bullets", name: "Solution", heading: "Our solution", subhead: "", bullets: ["How it works", "Why it’s different", "Proof it helps"] },
      { type: "content", layout: "statement", name: "Traction", heading: "Early traction that builds trust", subhead: "Customers, usage, or pipeline", bullets: [] },
      { type: "content", layout: "section", name: "Ask", heading: "The ask", subhead: "What you want next", bullets: [] }
    ],
    cta: { enabled: true, text: "Book a demo", url: "https://example.com" }
  },
  {
    id: "tour",
    name: "Product tour",
    blurb: "Welcome, walkthrough sections, and next steps",
    brand: {
      primary: "#4f46e5", secondary: "#6366f1", accent: "#22d3ee",
      bg: "#0b1020", text: "#eef2ff", bg2: "#1e1b4b", bgMode: "gradient", bgAngle: 130
    },
    steps: [
      { type: "content", layout: "title", name: "Welcome", heading: "Welcome to the product", subhead: "A short guided tour", bullets: [] },
      { type: "content", layout: "section", name: "Getting started", heading: "Getting started", subhead: "Set up in minutes", bullets: [] },
      { type: "content", layout: "bullets", name: "Key features", heading: "What you’ll use most", subhead: "", bullets: ["Feature one", "Feature two", "Feature three"] },
      { type: "content", layout: "bullets", name: "Tips", heading: "Tips for success", subhead: "", bullets: ["Tip one", "Tip two", "Where to get help"] },
      { type: "content", layout: "statement", name: "Next", heading: "You’re ready — try it yourself", subhead: "Open the app and follow along", bullets: [] }
    ],
    cta: { enabled: true, text: "Open the app", url: "https://example.com" }
  },
  {
    id: "training",
    name: "Training outline",
    blurb: "Agenda, lessons, practice, and recap",
    brand: {
      primary: "#0369a1", secondary: "#0ea5e9", accent: "#f97316",
      bg: "#0c1222", text: "#f0f9ff", bg2: "#0c4a6e", bgMode: "gradient", bgAngle: 160
    },
    steps: [
      { type: "content", layout: "title", name: "Training", heading: "Team training", subhead: "Goals for today’s session", bullets: [] },
      { type: "content", layout: "bullets", name: "Agenda", heading: "Agenda", subhead: "", bullets: ["Warm-up", "Core lesson", "Practice", "Q&A"] },
      { type: "content", layout: "section", name: "Lesson", heading: "Core lesson", subhead: "Key idea to remember", bullets: [] },
      { type: "content", layout: "bullets", name: "Practice", heading: "Practice checklist", subhead: "", bullets: ["Try step one", "Try step two", "Share what you learned"] },
      { type: "content", layout: "statement", name: "Recap", heading: "Recap — three takeaways", subhead: "Write them down before you leave", bullets: [] }
    ],
    cta: { enabled: false, text: "Get started", url: "" }
  },
  {
    id: "status",
    name: "Status update",
    blurb: "Wins, risks, and next week’s plan",
    brand: {
      primary: "#b45309", secondary: "#d97706", accent: "#0ea5e9",
      bg: "#1c1917", text: "#fffbeb", bg2: "#78350f", bgMode: "gradient", bgAngle: 150
    },
    steps: [
      { type: "content", layout: "title", name: "Status", heading: "Weekly status", subhead: "Team · date", bullets: [] },
      { type: "content", layout: "bullets", name: "Wins", heading: "Wins this week", subhead: "", bullets: ["Win one", "Win two", "Win three"] },
      { type: "content", layout: "bullets", name: "Risks", heading: "Risks & blockers", subhead: "", bullets: ["Risk one", "Help needed on…"] },
      { type: "content", layout: "bullets", name: "Next", heading: "Plan for next week", subhead: "", bullets: ["Priority one", "Priority two", "Decision needed"] }
    ],
    cta: { enabled: false, text: "Get started", url: "" }
  }
];

const STORE_KEY = "pb-custom-templates-v1";

export function listCustomTemplates() {
  try {
    const raw = JSON.parse(localStorage.getItem(STORE_KEY) || "[]");
    if (!Array.isArray(raw)) return [];
    return raw.filter(t => t && t.id && t.name && t.payload).slice(0, 40);
  } catch (e) { return []; }
}

export function saveCustomTemplate(entry) {
  const list = listCustomTemplates().filter(t => t.id !== entry.id);
  list.unshift(entry);
  localStorage.setItem(STORE_KEY, JSON.stringify(list.slice(0, 40)));
}

export function deleteCustomTemplate(id) {
  const list = listCustomTemplates().filter(t => t.id !== id);
  localStorage.setItem(STORE_KEY, JSON.stringify(list));
}

export function templateToProjectPayload(tpl) {
  return {
    title: tpl.name || "Untitled",
    brand: Object.assign({}, tpl.brand || {}),
    steps: (tpl.steps || []).map(s => Object.assign({}, s)),
    cta: Object.assign({ enabled: false, text: "Get started", url: "" }, tpl.cta || {}),
    assets: [],
    symbols: [],
    logo: null
  };
}

export function projectToTemplatePayload(project, name) {
  return {
    id: "c" + Date.now().toString(36),
    name: String(name || project.title || "My template").slice(0, 80),
    blurb: "Saved from your deck",
    savedAt: Date.now(),
    payload: {
      title: project.title,
      brand: project.brand,
      logo: project.logo,
      steps: project.steps,
      cta: project.cta,
      assets: project.assets || [],
      symbols: project.symbols || []
    }
  };
}
