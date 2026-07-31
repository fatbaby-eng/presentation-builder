/**
 * Starter templates + custom template save/load (local only).
 * Plain language: "Start from a template", "Save as template".
 *
 * Samples (group: "sample") are full demo decks with sample data.
 * Starters (group: "starter") are blank-ish outlines to fill in.
 */

function mot(appear, delay, duration) {
  return {
    appear: appear || "none",
    appearDelay: delay == null ? 0 : delay,
    appearDuration: duration == null ? 0.5 : duration,
    attention: "none",
    attentionDelay: 0.6,
    disappear: "none",
    disappearDelay: 2.5,
    disappearDuration: 0.45,
    easing: "ease-out"
  };
}

function tx(type, duration) {
  return { type: type || "fade", duration: duration == null ? 0.45 : duration };
}

function box(opts) {
  return Object.assign({
    type: "box", x: 0, y: 0, w: 20, h: 20, rot: 0, flipX: false, flipY: false,
    fill: "#ffffff", stroke: "#ffffff", strokeWidth: 0, opacity: 1, radius: 10,
    text: "", textColor: "#1b1f2a", parentId: null,
    fillMode: "solid", shadowOn: false, glowOn: false
  }, opts);
}

function msg(opts) {
  return Object.assign({
    type: "message", x: 0, y: 0, w: 30, h: 12, rot: 0, flipX: false, flipY: false,
    fill: "#fffaf5", stroke: "#d6c7b5", strokeWidth: 1, opacity: 1, radius: 10,
    text: "", textColor: "#1a2332", parentId: null, textStyle: "body",
    fillMode: "solid", shadowOn: true, shadowY: 4, shadowBlur: 10, shadowOpacity: 0.2,
    glowOn: false
  }, opts);
}

function highlight(opts) {
  return Object.assign({
    type: "highlight", x: 0, y: 0, w: 20, h: 8, rot: 0, flipX: false, flipY: false,
    fill: "#e0a84a", stroke: "#e0a84a", strokeWidth: 0, opacity: 0.35, radius: 4,
    text: "", textColor: "#1b1f2a", parentId: null,
    fillMode: "solid", shadowOn: false, glowOn: false
  }, opts);
}

function ellipse(opts) {
  return Object.assign({
    type: "ellipse", x: 0, y: 0, w: 4, h: 7, rot: 0, flipX: false, flipY: false,
    fill: "#c9783f", stroke: "#c9783f", strokeWidth: 0, opacity: 1, radius: 0,
    text: "", textColor: "#1b1f2a", parentId: null,
    fillMode: "solid", shadowOn: false, glowOn: false
  }, opts);
}

/** Warm map / curious-builder palette — not purple-AI default. */
const ATLAS_BRAND = {
  primary: "#c9783f",
  secondary: "#4a7c6f",
  accent: "#e0a84a",
  bg: "#1a2332",
  text: "#f4efe6",
  success: "#5b8f6b",
  warning: "#d4a017",
  danger: "#c45c4a",
  bg2: "#2a3548",
  bgMode: "gradient",
  bgAngle: 155,
  fontHeading: "georgia",
  fontBody: "system"
};

const ATLAS_CTA = {
  enabled: true,
  text: "Visit toddboswell.com",
  url: "https://toddboswell.com"
};

/** Desktop widescreen sample — denser layout, side-by-side cards. */
function atlasDesktopSteps() {
  return [
    {
      type: "content", layout: "title", name: "Cover",
      heading: "Atlas",
      subhead: "Project map for a curious person.",
      bullets: [],
      notes: "Demo deck with sample data — nothing here is live product data.",
      transition: tx("fade", 0.5),
      shapes: [
        ellipse({ x: 8, y: 18, w: 2.2, h: 4, fill: "#c9783f", motion: mot("pop", 0.2, 0.4) }),
        ellipse({ x: 12, y: 28, w: 1.6, h: 2.8, fill: "#e0a84a", opacity: 0.85, motion: mot("pop", 0.35, 0.4) }),
        ellipse({ x: 6, y: 36, w: 1.8, h: 3.2, fill: "#4a7c6f", motion: mot("pop", 0.5, 0.4) }),
        msg({
          x: 62, y: 62, w: 32, h: 18, text: "Demo with sample data\nWork · Freelance · Personal",
          textStyle: "caption", fill: "#243044", stroke: "#3d4f66", textColor: "#f4efe6",
          shadowOn: false, motion: mot("fade", 0.55, 0.5)
        })
      ]
    },
    {
      type: "content", layout: "bullets", name: "What it is",
      heading: "What Atlas tracks",
      subhead: "",
      bullets: [
        "Projects across Work, Freelance, and Personal lanes",
        "Each card has a dossier, an activity log, and an AI reflection tool",
        "Reflection thinks through what’s stuck, what’s next, and what to let go",
        "Dashboard shows workload forecasting and tech spread"
      ],
      transition: tx("push-left", 0.45),
      shapes: [
        highlight({ x: 6, y: 78, w: 28, h: 6, motion: mot("fade", 0.4, 0.4) })
      ]
    },
    {
      type: "content", layout: "section", name: "Lanes",
      heading: "Three lanes",
      subhead: "Same map. Different kinds of work.",
      bullets: [],
      transition: tx("fade", 0.4),
      shapes: [
        box({
          x: 6, y: 42, w: 28, h: 44, fill: "#243044", stroke: "#3d4f66", strokeWidth: 1, radius: 12,
          shadowOn: true, shadowY: 6, shadowBlur: 14, shadowOpacity: 0.28,
          motion: mot("fly-up", 0.1, 0.45)
        }),
        msg({
          x: 8, y: 46, w: 24, h: 34, fill: "#243044", stroke: "#243044", strokeWidth: 0, shadowOn: false,
          text: "WORK\n3 projects\n\nActive + shipped\n+ planning",
          textColor: "#f4efe6", textStyle: "body", motion: mot("fade", 0.25, 0.4)
        }),
        box({
          x: 36, y: 42, w: 28, h: 44, fill: "#243044", stroke: "#3d4f66", strokeWidth: 1, radius: 12,
          shadowOn: true, shadowY: 6, shadowBlur: 14, shadowOpacity: 0.28,
          motion: mot("fly-up", 0.22, 0.45)
        }),
        msg({
          x: 38, y: 46, w: 24, h: 34, fill: "#243044", stroke: "#243044", strokeWidth: 0, shadowOn: false,
          text: "FREELANCE\n2 projects\n\nClient work\n+ pauses",
          textColor: "#f4efe6", textStyle: "body", motion: mot("fade", 0.35, 0.4)
        }),
        box({
          x: 66, y: 42, w: 28, h: 44, fill: "#243044", stroke: "#3d4f66", strokeWidth: 1, radius: 12,
          shadowOn: true, shadowY: 6, shadowBlur: 14, shadowOpacity: 0.28,
          motion: mot("fly-up", 0.34, 0.45)
        }),
        msg({
          x: 68, y: 46, w: 24, h: 34, fill: "#243044", stroke: "#243044", strokeWidth: 0, shadowOn: false,
          text: "PERSONAL\n3 projects\n\nBuilds, dogs,\nand bread",
          textColor: "#f4efe6", textStyle: "body", motion: mot("fade", 0.45, 0.4)
        })
      ]
    },
    {
      type: "content", layout: "section", name: "Work",
      heading: "Work lane",
      subhead: "Pinned work sits at the top of the map.",
      bullets: [],
      transition: tx("wipe-left", 0.4),
      shapes: [
        msg({
          x: 4, y: 38, w: 30, h: 48,
          text: "📌 Brand Strategist\nactive · 2400 XP\n\nQ3 Campaign — Summer Push\nNext: Finalize hero photography\n#brand #campaign #q3",
          textStyle: "caption", motion: mot("fly-up", 0.08, 0.45)
        }),
        msg({
          x: 35, y: 38, w: 30, h: 48,
          text: "Training Architect\nshipped · 3100 XP\n\nOnboarding Emulator — Mobile\nNext: Hand off to training team\n#training #emulator #mobile",
          textStyle: "caption", motion: mot("fly-up", 0.2, 0.45)
        }),
        msg({
          x: 66, y: 38, w: 30, h: 48,
          text: "Compliance Ranger\nplanning · 1800 XP\n\nAccessibility Audit — Public Site\nNext: axe-core on top 20 pages\n#a11y #audit #compliance",
          textStyle: "caption", motion: mot("fly-up", 0.32, 0.45)
        })
      ]
    },
    {
      type: "content", layout: "section", name: "Dossier",
      heading: "Open a dossier",
      subhead: "Brand Strategist · Q3 Campaign",
      bullets: [],
      notes: "Point out PINNED, status, and the Next line — those are the map’s wayfinding cues.",
      transition: tx("zoom", 0.45),
      shapes: [
        box({
          x: 8, y: 36, w: 54, h: 52, fill: "#fffaf5", stroke: "#d6c7b5", strokeWidth: 1, radius: 14,
          shadowOn: true, shadowY: 8, shadowBlur: 18, shadowOpacity: 0.25,
          motion: mot("zoom", 0.1, 0.5)
        }),
        msg({
          x: 11, y: 40, w: 48, h: 44, fill: "#fffaf5", stroke: "#fffaf5", strokeWidth: 0, shadowOn: false,
          text: "PINNED · active · 2400 XP\n\nSummer Push\nNext: Finalize hero photography direction\n\nTags: brand, campaign, q3\nActivity log + AI reflection live here.",
          textColor: "#1a2332", textStyle: "body", motion: mot("fade", 0.3, 0.45)
        }),
        box({
          x: 66, y: 36, w: 26, h: 52, fill: "#243044", stroke: "#4a7c6f", strokeWidth: 2, radius: 14,
          motion: mot("fly-right", 0.25, 0.5)
        }),
        msg({
          x: 68, y: 42, w: 22, h: 40, fill: "#243044", stroke: "#243044", strokeWidth: 0, shadowOn: false,
          text: "AI reflection\n\nStuck?\nWhat’s next?\nWhat to let go?",
          textColor: "#f4efe6", textStyle: "caption", motion: mot("fade", 0.45, 0.4)
        })
      ]
    },
    {
      type: "content", layout: "bullets", name: "Reflection",
      heading: "AI reflection — Brand Strategist",
      subhead: "Sample thoughts on this project",
      bullets: [
        "Stuck: hero photography direction still open",
        "Next: lock the visual direction before copy finalizes",
        "Let go: extra mood boards that aren’t moving the campaign"
      ],
      transition: tx("fade", 0.4),
      shapes: [
        ellipse({ x: 88, y: 18, w: 3, h: 5.5, fill: "#c9783f", motion: mot("bounce", 0.2, 0.55) })
      ]
    },
    {
      type: "content", layout: "section", name: "Freelance",
      heading: "Freelance lane",
      subhead: "Client work with honest pauses.",
      bullets: [],
      transition: tx("push-left", 0.4),
      shapes: [
        msg({
          x: 8, y: 40, w: 40, h: 44,
          text: "Freelance Artisan · active · 1200 XP\n\nPortfolio Site — River City Barber\nNext: Send comp 2 for review\n#freelance #portfolio #local",
          textStyle: "caption", motion: mot("fly-up", 0.1, 0.45)
        }),
        msg({
          x: 52, y: 40, w: 40, h: 44,
          text: "Identity Shaper · paused · 900 XP\n\nLogo + Brand Kit — Sunrise Yoga\nNext: Client on retreat until July\n#freelance #brand #paused",
          textStyle: "caption", motion: mot("fly-up", 0.24, 0.45)
        })
      ]
    },
    {
      type: "content", layout: "section", name: "Personal",
      heading: "Personal lane",
      subhead: "The curious stuff that still counts as work.",
      bullets: [],
      transition: tx("push-left", 0.4),
      shapes: [
        msg({
          x: 3, y: 38, w: 30, h: 48,
          text: "📌 Firebrick Wrangler\nactive · 1600 XP\n\nBackyard Pizza Oven — Phase 2\nNext: Source firebrick, 46 count\n#build #pizza #outdoor",
          textStyle: "caption", motion: mot("fly-up", 0.08, 0.45)
        }),
        msg({
          x: 35, y: 38, w: 30, h: 48,
          text: "Canine UX Lead\nactive · 750 XP\n\nTeach the Dog to Use Slack\nNext: Wrong emoji reactions\n#dog #slack #experiment",
          textStyle: "caption", motion: mot("fly-up", 0.2, 0.45)
        }),
        msg({
          x: 67, y: 38, w: 30, h: 48,
          text: "Fermentation Diplomat\npaused\n\nSourdough Starter Custody\nNext: Mediation Thursday\n#bread #fermentation #diplomacy",
          textStyle: "caption", motion: mot("fly-up", 0.32, 0.45)
        })
      ]
    },
    {
      type: "content", layout: "bullets", name: "Dashboard",
      heading: "Dashboard signals",
      subhead: "Sample forecasting & tech spread",
      bullets: [
        "Workload: Work heavy this week; Freelance paused item waiting on client",
        "Forecast: pizza oven sourcing + campaign photo direction collide mid-week",
        "Tech spread: brand systems, a11y tooling, mobile emulator, local portfolio"
      ],
      transition: tx("fade", 0.4),
      shapes: [
        box({
          x: 72, y: 70, w: 22, h: 16, fill: "#4a7c6f", strokeWidth: 0, radius: 10, opacity: 0.9,
          motion: mot("pop", 0.35, 0.4)
        }),
        msg({
          x: 73, y: 72, w: 20, h: 12, fill: "#4a7c6f", stroke: "#4a7c6f", strokeWidth: 0, shadowOn: false,
          text: "8 projects\non the map",
          textColor: "#f4efe6", textStyle: "caption"
        })
      ]
    },
    {
      type: "content", layout: "statement", name: "Close",
      heading: "A project map for anyone curious enough to keep score.",
      subhead: "— Atlas · sample data demo",
      bullets: [],
      transition: tx("fade", 0.55),
      shapes: [
        ellipse({
          x: 48, y: 78, w: 2.4, h: 4.4, fill: "#c9783f",
          motion: Object.assign(mot("pop", 0.15, 0.45), { attention: "pulse", attentionDelay: 0.7 })
        })
      ]
    }
  ];
}

/** Phone-friendly sample — narrow content column, larger cards, one idea per slide. */
function atlasMobileSteps() {
  const bezelL = box({
    x: 0, y: 0, w: 16, h: 100, fill: "#0f141c", strokeWidth: 0, radius: 0, opacity: 1, shadowOn: false
  });
  const bezelR = box({
    x: 84, y: 0, w: 16, h: 100, fill: "#0f141c", strokeWidth: 0, radius: 0, opacity: 1, shadowOn: false
  });
  const frame = [bezelL, bezelR];

  return [
    {
      type: "content", layout: "title", name: "Cover",
      heading: "Atlas",
      subhead: "Project map for a curious person.",
      bullets: [],
      notes: "Phone sample: taller framing, fewer items, bigger tap targets.",
      transition: tx("fade", 0.5),
      shapes: [
        ...frame,
        ellipse({ x: 22, y: 22, w: 3.5, h: 6.5, fill: "#c9783f", motion: mot("pop", 0.25, 0.45) }),
        msg({
          x: 20, y: 72, w: 60, h: 16,
          text: "Tap through — sample data only",
          textStyle: "caption", fill: "#243044", stroke: "#3d4f66", textColor: "#f4efe6",
          shadowOn: false, radius: 12, motion: mot("fly-up", 0.4, 0.45)
        })
      ]
    },
    {
      type: "content", layout: "bullets", name: "What",
      heading: "One map. Three lanes.",
      subhead: "",
      bullets: [
        "Work, Freelance, Personal",
        "Dossier + activity + AI reflection",
        "Forecasting on the dashboard"
      ],
      transition: tx("push-up", 0.45),
      shapes: [...frame]
    },
    {
      type: "content", layout: "section", name: "Lanes",
      heading: "Pick a lane",
      subhead: "Big targets — easy to tap.",
      bullets: [],
      transition: tx("push-up", 0.4),
      shapes: [
        ...frame,
        msg({
          x: 20, y: 36, w: 60, h: 16,
          text: "WORK — 3 projects",
          textStyle: "h2", fill: "#c9783f", stroke: "#c9783f", textColor: "#1a2332",
          radius: 14, motion: mot("fly-up", 0.08, 0.4)
        }),
        msg({
          x: 20, y: 55, w: 60, h: 16,
          text: "FREELANCE — 2 projects",
          textStyle: "h2", fill: "#4a7c6f", stroke: "#4a7c6f", textColor: "#f4efe6",
          radius: 14, motion: mot("fly-up", 0.2, 0.4)
        }),
        msg({
          x: 20, y: 74, w: 60, h: 16,
          text: "PERSONAL — 3 projects",
          textStyle: "h2", fill: "#e0a84a", stroke: "#e0a84a", textColor: "#1a2332",
          radius: 14, motion: mot("fly-up", 0.32, 0.4)
        })
      ]
    },
    {
      type: "content", layout: "section", name: "Work",
      heading: "Work",
      subhead: "Three cards. One lane.",
      bullets: [],
      transition: tx("push-up", 0.4),
      shapes: [
        ...frame,
        msg({
          x: 19, y: 34, w: 62, h: 18,
          text: "📌 Brand Strategist · active\nQ3 Campaign — Summer Push · 2400 XP",
          textStyle: "caption", radius: 12, motion: mot("fly-up", 0.08, 0.4)
        }),
        msg({
          x: 19, y: 54, w: 62, h: 18,
          text: "Training Architect · shipped\nOnboarding Emulator — Mobile · 3100 XP",
          textStyle: "caption", radius: 12, motion: mot("fly-up", 0.2, 0.4)
        }),
        msg({
          x: 19, y: 74, w: 62, h: 18,
          text: "Compliance Ranger · planning\nAccessibility Audit · 1800 XP",
          textStyle: "caption", radius: 12, motion: mot("fly-up", 0.32, 0.4)
        })
      ]
    },
    {
      type: "content", layout: "section", name: "Dossier",
      heading: "Dossier",
      subhead: "Brand Strategist",
      bullets: [],
      transition: tx("zoom", 0.4),
      shapes: [
        ...frame,
        msg({
          x: 19, y: 36, w: 62, h: 50,
          text: "PINNED · active · 2400 XP\n\nSummer Push\nNext: Finalize hero photography direction\n\nTags: brand · campaign · q3",
          textStyle: "body", radius: 14, motion: mot("zoom", 0.12, 0.5)
        })
      ]
    },
    {
      type: "content", layout: "bullets", name: "Reflect",
      heading: "AI reflection",
      subhead: "What’s stuck · next · let go",
      bullets: [
        "Stuck: photo direction",
        "Next: lock the hero look",
        "Let go: unused mood boards"
      ],
      transition: tx("fade", 0.4),
      shapes: [...frame]
    },
    {
      type: "content", layout: "section", name: "Personal",
      heading: "Personal pin",
      subhead: "Because curiosity counts.",
      bullets: [],
      transition: tx("push-up", 0.4),
      shapes: [
        ...frame,
        msg({
          x: 19, y: 38, w: 62, h: 44,
          text: "📌 Firebrick Wrangler\nactive · 1600 XP\n\nBackyard Pizza Oven — Phase 2\nNext: Source firebrick, 46 count\n#build #pizza #outdoor",
          textStyle: "body", radius: 14, motion: mot("fly-up", 0.15, 0.45)
        })
      ]
    },
    {
      type: "content", layout: "statement", name: "Close",
      heading: "You’re on the map.",
      subhead: "Atlas · phone sample · toddboswell.com",
      bullets: [],
      transition: tx("fade", 0.5),
      shapes: [
        ...frame,
        ellipse({ x: 48, y: 72, w: 4, h: 7.5, fill: "#c9783f", motion: mot("pop", 0.2, 0.45) })
      ]
    }
  ];
}

export const BUILTIN_TEMPLATES = [
  {
    id: "atlas-desktop",
    group: "sample",
    name: "Try Atlas (desktop)",
    title: "Atlas — Desktop",
    blurb: "Widescreen product demo with sample Work, Freelance & Personal projects",
    brand: Object.assign({}, ATLAS_BRAND),
    steps: atlasDesktopSteps(),
    cta: Object.assign({}, ATLAS_CTA)
  },
  {
    id: "atlas-mobile",
    group: "sample",
    name: "Try Atlas (phone)",
    title: "Atlas — Mobile",
    blurb: "Narrow framing, larger cards, one idea per slide — same sample data",
    brand: Object.assign({}, ATLAS_BRAND),
    steps: atlasMobileSteps(),
    cta: Object.assign({}, ATLAS_CTA)
  },
  {
    id: "pitch",
    group: "starter",
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
    group: "starter",
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
    group: "starter",
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
    group: "starter",
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
    title: tpl.title || tpl.name || "Untitled",
    brand: Object.assign({}, tpl.brand || {}),
    steps: (tpl.steps || []).map(s => Object.assign({}, s, {
      shapes: (s.shapes || []).map(sh => Object.assign({}, sh)),
      bullets: Array.isArray(s.bullets) ? s.bullets.slice() : [],
      transition: s.transition ? Object.assign({}, s.transition) : undefined,
      notes: s.notes
    })),
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
