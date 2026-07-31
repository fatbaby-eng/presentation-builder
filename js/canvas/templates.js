/**
 * Starter templates + custom template save/load (local only).
 * Plain language: "Start from a template", "Save as template".
 *
 * Atlas samples use fictional project cards (Work / Freelance / Personal)
 * so people can try shapes, notes, motion, and transitions with real-feeling copy.
 */

const ATLAS_BRAND = {
  primary: "#c45c26",
  secondary: "#2a9d8f",
  accent: "#e9c46a",
  bg: "#12151c",
  text: "#f4f1ea",
  bg2: "#1c2430",
  bgMode: "gradient",
  bgAngle: 155,
  fontHeading: "georgia",
  fontBody: "system"
};

/** Compact message “card” for sample decks. */
function msg(id, x, y, w, h, text, extra) {
  return Object.assign({
    id,
    type: "message",
    x, y, w, h,
    rot: 0,
    fill: "#1a222e",
    stroke: "#2d3a4d",
    strokeWidth: 1,
    opacity: 1,
    radius: 12,
    text,
    textColor: "#f4f1ea",
    fontSize: 13,
    fontWeight: 500,
    lineHeight: 1.35,
    textAlign: "left",
    shadowOn: true,
    shadowX: 0,
    shadowY: 6,
    shadowBlur: 18,
    shadowOpacity: 0.4,
    shadowColor: "#000000"
  }, extra || {});
}

function chip(id, x, y, w, h, text, fill) {
  return msg(id, x, y, w, h, text, {
    fill: fill || "#c45c26",
    strokeWidth: 0,
    radius: 8,
    fontSize: 11,
    fontWeight: 700,
    textAlign: "center",
    shadowOn: false
  });
}

const ATLAS_DESKTOP = {
  id: "atlas-desktop",
  name: "Try Atlas (desktop)",
  blurb: "Sample deck from fake project cards — widescreen layout",
  brand: ATLAS_BRAND,
  steps: [
    {
      type: "content", layout: "title", name: "Atlas",
      heading: "Atlas",
      subhead: "Project map for a curious person",
      bullets: [], body: "",
      transition: { type: "fade", duration: 0.5 },
      notes: "Demo deck with sample data. Atlas is a project map across Work, Freelance, and Personal.",
      shapes: [
        chip("d0a", 8, 82, 14, 6, "DEMO DATA", "#2a9d8f")
      ]
    },
    {
      type: "content", layout: "bullets", name: "What it is",
      heading: "What Atlas tracks",
      subhead: "",
      bullets: [
        "Projects across Work, Freelance, and Personal lanes",
        "Each card: dossier, activity log, AI reflection",
        "Reflection asks what’s stuck, what’s next, what to let go",
        "Dashboard: workload forecast + tech spread"
      ],
      body: "",
      transition: { type: "push-left", duration: 0.45 },
      notes: "This is a demo with sample data — not a live account."
    },
    {
      type: "content", layout: "section", name: "Work",
      heading: "Work · 3 projects",
      subhead: "Active client and product work",
      bullets: [], body: "",
      transition: { type: "fade", duration: 0.4 },
      shapes: [
        msg("dw1", 6, 28, 28, 52,
          "Brand Strategist  ·  active  ·  PINNED\n\nQ3 Campaign — Summer Push\nNext: Finalize hero photography direction\n\nbrand · campaign · q3\n2400 XP",
          { motion: { appear: "fade", appearDelay: 0.05, appearDuration: 0.5, attention: "none", disappear: "none", easing: "ease-out" } }),
        msg("dw2", 36, 28, 28, 52,
          "Training Architect  ·  shipped\n\nOnboarding Emulator — Mobile\nNext: Hand off to training team\n\ntraining · emulator · mobile\n3100 XP",
          { motion: { appear: "fade", appearDelay: 0.15, appearDuration: 0.5, attention: "none", disappear: "none", easing: "ease-out" } }),
        msg("dw3", 66, 28, 28, 52,
          "Compliance Ranger  ·  planning\n\nAccessibility Audit — Public Site\nNext: Run axe-core on top 20 pages\n\na11y · audit · compliance\n1800 XP",
          { motion: { appear: "fade", appearDelay: 0.25, appearDuration: 0.5, attention: "none", disappear: "none", easing: "ease-out" } })
      ]
    },
    {
      type: "content", layout: "bullets", name: "Work spotlight",
      heading: "Spotlight: Summer Push",
      subhead: "Brand Strategist · pinned",
      bullets: [
        "Status: active",
        "Next: Finalize hero photography direction",
        "Tags: brand, campaign, q3",
        "2400 XP earned on this card"
      ],
      body: "",
      transition: { type: "wipe-left", duration: 0.45 },
      notes: "Deep-dive slide — good place to demo Present notes (N in export)."
    },
    {
      type: "content", layout: "section", name: "Freelance",
      heading: "Freelance · 2 projects",
      subhead: "Client work on the side",
      bullets: [], body: "",
      transition: { type: "fade", duration: 0.4 },
      shapes: [
        msg("df1", 10, 30, 38, 48,
          "Freelance Artisan  ·  active\n\nPortfolio Site — River City Barber\nNext: Send comp 2 for review\n\nfreelance · portfolio · local\n1200 XP"),
        msg("df2", 52, 30, 38, 48,
          "Identity Shaper  ·  paused\n\nLogo + Brand Kit — Sunrise Yoga\nNext: Client on retreat until July\n\nfreelance · brand · paused\n900 XP")
      ]
    },
    {
      type: "content", layout: "section", name: "Personal",
      heading: "Personal · 3 projects",
      subhead: "Builds, dogs, and bread diplomacy",
      bullets: [], body: "",
      transition: { type: "push-up", duration: 0.45 },
      shapes: [
        msg("dp1", 6, 28, 28, 52,
          "Firebrick Wrangler  ·  active  ·  PINNED\n\nBackyard Pizza Oven — Phase 2\nNext: Source firebrick, 46 count\n\nbuild · pizza · outdoor\n1600 XP"),
        msg("dp2", 36, 28, 28, 52,
          "Canine UX Lead  ·  active\n\nTeach the Dog to Use Slack\nNext: He keeps reacting with the wrong emoji\n\ndog · slack · experiment\n750 XP"),
        msg("dp3", 66, 28, 28, 52,
          "Fermentation Diplomat  ·  paused\n\nSourdough Starter Custody Agreement\nNext: Mediation scheduled for Thursday\n\nbread · fermentation · diplomacy")
      ]
    },
    {
      type: "content", layout: "statement", name: "Fun card",
      heading: "Teach the Dog to Use Slack",
      subhead: "Next: He keeps reacting with the wrong emoji",
      bullets: [], body: "",
      transition: { type: "zoom", duration: 0.5 },
      notes: "Personality slide — shows statement layout with Atlas sample humor."
    },
    {
      type: "content", layout: "bullets", name: "Dashboard",
      heading: "Dashboard teaser",
      subhead: "What the sample data implies",
      bullets: [
        "Workload forecast across three lanes",
        "Tech spread: brand, training, a11y, build…",
        "XP totals help spot what’s getting energy",
        "Pinned cards rise to the top of each lane"
      ],
      body: "",
      transition: { type: "fade", duration: 0.4 }
    },
    {
      type: "content", layout: "statement", name: "Close",
      heading: "A map for work you actually care about",
      subhead: "Remix these cards — try Motion, Present, and Export",
      bullets: [], body: "",
      transition: { type: "fade", duration: 0.45 },
      notes: "Invite viewers to open Present mode or tweak a card shape."
    }
  ],
  cta: { enabled: true, text: "Explore Atlas", url: "https://toddboswell.com" }
};

const ATLAS_MOBILE = {
  id: "atlas-mobile",
  name: "Try Atlas (phone)",
  blurb: "Same fake project cards — one card per slide, easy to tap through",
  brand: Object.assign({}, ATLAS_BRAND, { bgAngle: 180, bg: "#0e1116", bg2: "#1a2330" }),
  steps: [
    {
      type: "content", layout: "title", name: "Atlas",
      heading: "Atlas",
      subhead: "Project map for a curious person",
      bullets: [], body: "",
      transition: { type: "fade", duration: 0.45 },
      notes: "Phone-friendly sample: fewer cards per slide, larger type.",
      shapes: [
        chip("m0a", 30, 78, 40, 8, "SAMPLE · PHONE LAYOUT", "#2a9d8f")
      ]
    },
    {
      type: "content", layout: "bullets", name: "Lanes",
      heading: "Three lanes",
      subhead: "",
      bullets: [
        "Work — 3 projects",
        "Freelance — 2 projects",
        "Personal — 3 projects"
      ],
      body: "",
      transition: { type: "push-up", duration: 0.4 }
    },
    {
      type: "content", layout: "section", name: "Card anatomy",
      heading: "What’s on a card",
      subhead: "Dossier · activity log · AI reflection",
      bullets: [], body: "",
      transition: { type: "fade", duration: 0.4 },
      shapes: [
        msg("ma1", 12, 32, 76, 48,
          "Stuck?\nWhat’s next?\nWhat to let go?\n\nReflection lives on every card.",
          { fontSize: 16, textAlign: "center", fill: "#18202b" })
      ]
    },
    {
      type: "content", layout: "section", name: "Work card",
      heading: "Work",
      subhead: "Pinned",
      bullets: [], body: "",
      transition: { type: "push-left", duration: 0.4 },
      shapes: [
        msg("mw1", 10, 26, 80, 58,
          "Brand Strategist\nactive · PINNED\n\nQ3 Campaign — Summer Push\n\nNext: Finalize hero photography direction\n\nbrand · campaign · q3\n2400 XP",
          { fontSize: 15 })
      ],
      notes: "One full card — good for mobile demos."
    },
    {
      type: "content", layout: "section", name: "Work shipped",
      heading: "Work",
      subhead: "Shipped",
      bullets: [], body: "",
      transition: { type: "push-left", duration: 0.35 },
      shapes: [
        msg("mw2", 10, 26, 80, 58,
          "Training Architect\nshipped\n\nOnboarding Emulator — Mobile\n\nNext: Hand off to training team\n\ntraining · emulator · mobile\n3100 XP",
          { fontSize: 15 })
      ]
    },
    {
      type: "content", layout: "section", name: "Freelance card",
      heading: "Freelance",
      subhead: "Active",
      bullets: [], body: "",
      transition: { type: "push-left", duration: 0.35 },
      shapes: [
        msg("mf1", 10, 26, 80, 58,
          "Freelance Artisan\nactive\n\nPortfolio Site — River City Barber\n\nNext: Send comp 2 for review\n\nfreelance · portfolio · local\n1200 XP",
          { fontSize: 15 })
      ]
    },
    {
      type: "content", layout: "section", name: "Personal card",
      heading: "Personal",
      subhead: "Pinned",
      bullets: [], body: "",
      transition: { type: "push-left", duration: 0.35 },
      shapes: [
        msg("mp1", 10, 26, 80, 58,
          "Firebrick Wrangler\nactive · PINNED\n\nBackyard Pizza Oven — Phase 2\n\nNext: Source firebrick, 46 count\n\nbuild · pizza · outdoor\n1600 XP",
          { fontSize: 15 })
      ]
    },
    {
      type: "content", layout: "statement", name: "Wild card",
      heading: "Canine UX Lead",
      subhead: "Teach the Dog to Use Slack — 750 XP",
      bullets: [], body: "",
      transition: { type: "zoom", duration: 0.45 }
    },
    {
      type: "content", layout: "bullets", name: "Also in Atlas",
      heading: "Also in the sample",
      subhead: "",
      bullets: [
        "Compliance Ranger — Accessibility Audit (planning)",
        "Identity Shaper — Sunrise Yoga brand kit (paused)",
        "Fermentation Diplomat — sourdough custody (paused)"
      ],
      body: "",
      transition: { type: "fade", duration: 0.4 }
    },
    {
      type: "content", layout: "statement", name: "Close",
      heading: "Tap through. Remix a card.",
      subhead: "Try Present, Motion, and Export on this sample",
      bullets: [], body: "",
      transition: { type: "fade", duration: 0.4 }
    }
  ],
  cta: { enabled: true, text: "Explore Atlas", url: "https://toddboswell.com" }
};

export const BUILTIN_TEMPLATES = [
  ATLAS_DESKTOP,
  ATLAS_MOBILE,
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
    steps: (tpl.steps || []).map(s => JSON.parse(JSON.stringify(s))),
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
