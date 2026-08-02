/**
 * Generates js/canvas/samplePizza.js with embedded screenshot base64.
 * Run: node scripts/gen-sample-pizza.js
 */
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const pngPath = path.join(root, "assets", "backyard-pizza-oven.png");
const outPath = path.join(root, "js", "canvas", "samplePizza.js");

const dataUrl = "data:image/png;base64," + fs.readFileSync(pngPath).toString("base64");
const ovenSvg =
  "data:image/svg+xml," + encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 128 128">' +
    '<rect width="128" height="128" rx="28" fill="#1a1a14"/>' +
    '<ellipse cx="64" cy="92" rx="42" ry="10" fill="#2a2418"/>' +
    '<path d="M28 88 Q28 36 64 28 Q100 36 100 88 Z" fill="#6b4a2e"/>' +
    '<path d="M40 88 Q40 48 64 42 Q88 48 88 88 Z" fill="#3d2a18"/>' +
    '<ellipse cx="64" cy="78" rx="18" ry="14" fill="#1a1208"/>' +
    '<ellipse cx="64" cy="74" rx="10" ry="8" fill="#e8a020"/>' +
    '<ellipse cx="64" cy="70" rx="5" ry="4" fill="#f5d060"/>' +
    '<rect x="58" y="20" width="12" height="14" rx="3" fill="#8a6a3c"/>' +
    "</svg>"
  );

const js = `/**
 * Backyard Pizza Oven satire sample — enterprise quest theater for a DIY dome.
 * Screenshot asset: assets/backyard-pizza-oven.png (modal from toddboswell.com).
 */

import {
  mot, tx, box, msg, highlight, ellipse, frame, arrow, focus, typeText, phoneDot
} from "./sampleHelpers.js";

/** Full project-map modal screenshot (Phase 2 dossier). */
export const PIZZA_MODAL =
  ${JSON.stringify(dataUrl)};

/** Compact pixel oven for circular frames / logo. */
export const PIZZA_ICON =
  ${JSON.stringify(ovenSvg)};

export const PIZZA_BRAND = {
  primary: "#c9a227",
  secondary: "#e0b83a",
  accent: "#f0d060",
  bg: "#14140f",
  text: "#f4efe6",
  success: "#5b8f6b",
  warning: "#d4a017",
  danger: "#c45c4a",
  bg2: "#242018",
  bgMode: "gradient",
  bgAngle: 155,
  fontHeading: "georgia",
  fontBody: "system"
};

export const PIZZA_CTA = {
  enabled: true,
  text: "Visit toddboswell.com",
  url: "https://toddboswell.com"
};

function ovenRound(opts) {
  return frame(Object.assign({
    image: PIZZA_ICON, imageFit: "cover", radius: 999,
    stroke: "#c9a227", strokeWidth: 2, fill: "#1a1a14"
  }, opts));
}

function modalShot(opts) {
  return frame(Object.assign({
    image: PIZZA_MODAL, imageFit: "cover", radius: 12,
    stroke: "#c9a227", strokeWidth: 2, fill: "#1a1a14",
    shadowOn: true, shadowY: 8, shadowBlur: 20, shadowOpacity: 0.35
  }, opts));
}

export function pizzaDesktopSteps() {
  return [
    {
      type: "content", layout: "title", name: "Cover",
      heading: "Backyard Pizza Oven — Phase 2",
      subhead: "FIREBRICK WRANGLER · 1600 XP · Personal lane · pinned forever",
      bullets: [],
      notes: "Satire sample — DIY oven as enterprise quest with real builder motion.",
      transition: tx("fade", 0.4),
      shapes: [
        ellipse({ x: 8, y: 18, w: 2.2, h: 4, fill: "#c9a227", motion: mot("pop", 0.05, 0.35) }),
        ellipse({ x: 13, y: 26, w: 1.5, h: 2.7, fill: "#e0b83a", opacity: 0.9, motion: mot("pop", 0.18, 0.35) }),
        ovenRound({
          x: 74, y: 14, w: 16, h: 28.5,
          glowOn: true, glowColor: "#c9a227", glowBlur: 18, glowOpacity: 0.45,
          motion: mot("pop", 0.12, 0.45, { attention: "heartbeat", attentionDelay: 0.75 })
        }),
        typeText({
          x: 6, y: 56, w: 58, h: 8, text: "Yes — we roadmap’d a backyard oven.",
          textColor: "#f0d060", textStyle: "h2",
          motion: mot("fly-up", 0.4, 0.45)
        }),
        msg({
          x: 6, y: 68, w: 54, h: 18,
          text: "Phase 2 is the dome.\\nPhase 3 is marital disclosure.",
          textStyle: "caption", fill: "#242018", stroke: "#3d3420", textColor: "#f4efe6",
          shadowOn: false, radius: 12, motion: mot("fade", 0.55, 0.45)
        }),
        arrow({
          x: 58, y: 26, w: 14, h: 10, stroke: "#c9a227", fill: "#c9a227", arrowStyle: "curved",
          strokeWidth: 3, flipY: true,
          motion: mot("fade", 0.7, 0.4, { attention: "pulse", attentionDelay: 1.25 })
        })
      ]
    },
    {
      type: "content", layout: "section", name: "The quest",
      heading: "Active Quest (procurement edition)",
      subhead: "Source firebrick, 46 count. KPI: still not pizza.",
      bullets: [],
      transition: tx("push-left", 0.35),
      shapes: [
        ovenRound({
          x: 80, y: 12, w: 12, h: 21.5,
          motion: mot("fly-right", 0.05, 0.4)
        }),
        box({
          x: 6, y: 42, w: 88, h: 46, fill: "#1f1c14", stroke: "#c9a227", strokeWidth: 2, radius: 14,
          shadowOn: true, shadowY: 8, shadowBlur: 18, shadowOpacity: 0.28,
          motion: mot("fly-up", 0.15, 0.45)
        }),
        msg({
          x: 10, y: 46, w: 56, h: 36, fill: "#1f1c14", stroke: "#1f1c14", strokeWidth: 0, shadowOn: false,
          text: "STATUS · Active · 1600 XP\\n\\nQuest: Source firebrick, 46 count\\nLane: Personal (budget TBD)\\nPinned: yes — escape velocity: no\\n#build #pizza #outdoor",
          textColor: "#f4efe6", textStyle: "body", motion: mot("fade", 0.35, 0.4)
        }),
        arrow({
          x: 62, y: 64, w: 12, h: 14, stroke: "#e0b83a", fill: "#e0b83a", arrowStyle: "dashed",
          strokeWidth: 2, flipX: true,
          motion: mot("fade", 0.55, 0.35)
        }),
        msg({
          x: 70, y: 48, w: 20, h: 16, fill: "#242018", stroke: "#c9a227", strokeWidth: 1, shadowOn: false,
          text: "Unit cost\\n‘don’t ask’",
          textColor: "#f0d060", textStyle: "caption", radius: 10,
          motion: mot("pop", 0.7, 0.4, { attention: "glow", attentionDelay: 1.25 })
        })
      ]
    },
    {
      type: "content", layout: "section", name: "The dossier",
      heading: "The dossier (screenshot theater)",
      subhead: "Same modal. Same gold border. Same ‘Ask Claude about bricks.’",
      bullets: [],
      notes: "Uses the real project-map screenshot as an image holder.",
      transition: tx("zoom", 0.35),
      shapes: [
        modalShot({
          x: 6, y: 30, w: 52, h: 58,
          motion: mot("zoom", 0.05, 0.5)
        }),
        msg({
          x: 62, y: 34, w: 32, h: 22,
          text: "Firebrick Wrangler\\nrank unlocked.\\nPizza: still locked.",
          textStyle: "caption", fill: "#f4efe6", stroke: "#d6c7b5", textColor: "#1a1a14",
          radius: 12, motion: mot("fly-right", 0.35, 0.4)
        }),
        focus({
          x: 18, y: 42, w: 28, h: 16,
          motion: mot("fade", 0.55, 0.35, { attention: "focus-rings", attentionDelay: 1.1 })
        }),
        arrow({
          x: 48, y: 52, w: 14, h: 12, stroke: "#c9a227", fill: "#c9a227", arrowStyle: "thick",
          strokeWidth: 4,
          motion: mot("fly-left", 0.7, 0.4, { attention: "pulse", attentionDelay: 1.2 })
        }),
        typeText({
          x: 62, y: 64, w: 32, h: 12, text: "This is a real UI.\\nAlso a cry for help.",
          textColor: "#f0d060", textStyle: "caption",
          motion: mot("fade", 0.85, 0.4)
        })
      ]
    },
    {
      type: "content", layout: "section", name: "Phases",
      heading: "Roadmap (three acts of denial)",
      subhead: "Foundation. Dome. Honesty. Pick your favorite boss fight.",
      bullets: [],
      transition: tx("wipe-left", 0.35),
      shapes: [
        msg({
          x: 6, y: 34, w: 28, h: 48,
          text: "Phase 1\\nFoundation\\n\\nShipped.\\nConcrete cured.\\nOptimism intact.",
          textStyle: "caption", fill: "#1f1c14", stroke: "#3d3420", textColor: "#f4efe6",
          shadowOn: false, radius: 12, motion: mot("fly-up", 0.05, 0.4)
        }),
        msg({
          x: 36, y: 34, w: 28, h: 48,
          text: "Phase 2\\nThe dome\\n\\nActive quest.\\n46 firebricks.\\nSpreadsheet open.",
          textStyle: "caption", fill: "#f4efe6", stroke: "#c9a227", textColor: "#1a1a14",
          radius: 12, motion: mot("fly-up", 0.2, 0.4)
        }),
        msg({
          x: 66, y: 34, w: 28, h: 48,
          text: "Phase 3\\nDisclosure\\n\\nTell my wife\\nthe unit cost.\\nCourage: draft.",
          textStyle: "caption", fill: "#242018", stroke: "#c45c4a", textColor: "#f4efe6",
          shadowOn: false, radius: 12, motion: mot("fly-up", 0.35, 0.4)
        }),
        arrow({
          x: 28, y: 28, w: 14, h: 10, stroke: "#e0b83a", fill: "#e0b83a", arrowStyle: "block",
          strokeWidth: 2, flipY: true,
          motion: mot("fade", 0.55, 0.35, { attention: "pulse", attentionDelay: 1.0 })
        }),
        focus({
          x: 44, y: 42, w: 12, h: 18,
          motion: mot("fade", 0.8, 0.35, { attention: "focus-rings", attentionDelay: 1.3 })
        })
      ]
    },
    {
      type: "content", layout: "section", name: "Ask Claude",
      heading: "Reflection (Ask Claude)",
      subhead: "AI advice on pizza ovens. Peak 2020s backyard governance.",
      bullets: [],
      transition: tx("fade", 0.35),
      shapes: [
        msg({
          x: 5, y: 34, w: 29, h: 48,
          text: "Revive or archive?\\n\\nIs this still a quest — or did Home Depot win by existing?",
          textStyle: "caption", fill: "#f4efe6", stroke: "#d6c7b5", textColor: "#1a1a14",
          radius: 12, motion: mot("fly-up", 0.05, 0.4)
        }),
        msg({
          x: 35.5, y: 34, w: 29, h: 48,
          text: "What’s unfinished?\\n\\nThe dome. The budget talk. The part where pizza appears.",
          textStyle: "caption", fill: "#f4efe6", stroke: "#d6c7b5", textColor: "#1a1a14",
          radius: 12, motion: mot("fly-up", 0.22, 0.4)
        }),
        msg({
          x: 66, y: 34, w: 29, h: 48,
          text: "Audit for gaps\\n\\nWhere ‘weekend project’ ends and ‘capital expense’ begins.",
          textStyle: "caption", fill: "#1f1c14", stroke: "#c9a227", textColor: "#f4efe6",
          shadowOn: false, radius: 12, motion: mot("fly-up", 0.4, 0.4)
        }),
        typeText({
          x: 5, y: 86, w: 78, h: 8, text: "We asked a language model about firebrick. Naturally.",
          textColor: "#f0d060", textStyle: "caption",
          motion: mot("fade", 0.7, 0.4)
        })
      ]
    },
    {
      type: "content", layout: "section", name: "Meta",
      heading: "Sidebar truth (Active · Personal · Pinned)",
      subhead: "Tags: build / pizza / outdoor. Escape hatch: none.",
      bullets: [],
      transition: tx("push-up", 0.35),
      shapes: [
        box({
          x: 8, y: 34, w: 54, h: 52, fill: "#1f1c14", stroke: "#3d3420", strokeWidth: 1, radius: 14,
          shadowOn: true, shadowY: 6, shadowBlur: 14, shadowOpacity: 0.3,
          motion: mot("fly-up", 0.05, 0.4)
        }),
        msg({
          x: 11, y: 38, w: 48, h: 14, fill: "#242018", stroke: "#242018", strokeWidth: 0, shadowOn: false,
          text: "STATUS · Active    AREA · Personal",
          textColor: "#f0d060", textStyle: "caption", motion: mot("fade", 0.2, 0.35)
        }),
        msg({
          x: 11, y: 54, w: 48, h: 12, fill: "#1a1a14", stroke: "#c9a227", strokeWidth: 1, shadowOn: false,
          text: "☑ PINNED  —  cannot look away",
          textColor: "#f4efe6", textStyle: "body", radius: 8, motion: mot("fade", 0.35, 0.4)
        }),
        msg({
          x: 11, y: 70, w: 48, h: 10, fill: "#242018", stroke: "#242018", strokeWidth: 0, shadowOn: false,
          text: "#build   #pizza   #outdoor",
          textColor: "#e0b83a", textStyle: "caption", motion: mot("fade", 0.5, 0.35)
        }),
        msg({
          x: 66, y: 36, w: 26, h: 24,
          text: "Save is gold.\\nClose is optional.\\nPizza is theoretical.",
          textStyle: "caption", fill: "#f4efe6", stroke: "#d6c7b5", textColor: "#1a1a14",
          radius: 12, motion: mot("fly-right", 0.55, 0.4)
        }),
        arrow({
          x: 48, y: 56, w: 16, h: 10, stroke: "#c45c4a", fill: "#c45c4a", arrowStyle: "solid",
          strokeWidth: 3,
          motion: mot("fade", 0.75, 0.35, { attention: "pulse", attentionDelay: 1.2 })
        }),
        focus({
          x: 14, y: 52, w: 42, h: 14,
          motion: mot("fade", 0.9, 0.35, { attention: "focus-rings", attentionDelay: 1.35 })
        })
      ]
    },
    {
      type: "content", layout: "bullets", name: "Checklist",
      heading: "Firebrick checklist (theater)",
      subhead: "Sample progress — not live data, not edible yet",
      bullets: [
        "Phase 1 foundation — shipped (concrete doesn’t negotiate)",
        "Source 46 firebricks — Active Quest, spreadsheet anxiety",
        "Build the dome — blocked by weather, weekends, hubris",
        "Phase 3 marital disclosure — courage: draft · pizza: deferred"
      ],
      transition: tx("push-left", 0.35),
      shapes: [
        ovenRound({
          x: 82, y: 14, w: 10, h: 18,
          motion: mot("bounce", 0.1, 0.45)
        }),
        arrow({
          x: 68, y: 22, w: 12, h: 10, stroke: "#c9a227", fill: "#c9a227", arrowStyle: "curved",
          strokeWidth: 3,
          motion: mot("fade", 0.35, 0.35, { attention: "pulse", attentionDelay: 0.85 })
        }),
        highlight({
          x: 6, y: 76, w: 48, h: 8, fill: "#c9a227", opacity: 0.35,
          motion: mot("fade", 0.45, 0.4, { attention: "glow", attentionDelay: 1.0 })
        }),
        ellipse({ x: 58, y: 80, w: 2.2, h: 4, fill: "#e0b83a", motion: mot("pop", 0.65, 0.35) })
      ]
    },
    {
      type: "content", layout: "statement", name: "Close",
      heading: "Nobody needed a deck for firebrick. Especially not Claude.",
      subhead: "— Firebrick Wrangler · 1600 XP · still Phase 2 · sample",
      bullets: [],
      transition: tx("fade", 0.45),
      shapes: [
        msg({
          x: 26, y: 48, w: 48, h: 10,
          text: "Certificate of completion: crust pending.",
          textStyle: "caption", fill: "#242018", stroke: "#3d3420", textColor: "#f4efe6",
          shadowOn: false, radius: 10, motion: mot("fade", 0.2, 0.4)
        }),
        ovenRound({
          x: 42, y: 62, w: 14, h: 25,
          glowOn: true, glowColor: "#c9a227", glowBlur: 14, glowOpacity: 0.4,
          motion: mot("pop", 0.4, 0.45, { attention: "pulse", attentionDelay: 1.0 })
        })
      ]
    }
  ];
}

export function pizzaPhoneSteps() {
  return [
    {
      type: "content", layout: "title", name: "Cover",
      heading: "Backyard Pizza Oven — Phase 2",
      subhead: "FIREBRICK WRANGLER · 1600 XP",
      bullets: [],
      notes: "Phone sample — same dry quest, stacked for thumbs.",
      transition: tx("fade", 0.4),
      shapes: [
        phoneDot({ x: 10, y: 18, h: 3.2, fill: "#c9a227", motion: mot("pop", 0.05, 0.35) }),
        phoneDot({ x: 20, y: 22, h: 2.2, fill: "#e0b83a", opacity: 0.9, motion: mot("pop", 0.15, 0.35) }),
        ovenRound({
          x: 28, y: 28, w: 44, h: 24.5,
          glowOn: true, glowColor: "#c9a227", glowBlur: 16, glowOpacity: 0.4,
          motion: mot("pop", 0.12, 0.45, { attention: "heartbeat", attentionDelay: 0.7 })
        }),
        typeText({
          x: 8, y: 58, w: 84, h: 10, text: "Roadmap’d a backyard oven.",
          textColor: "#f0d060", textStyle: "h2",
          motion: mot("fly-up", 0.4, 0.4)
        }),
        msg({
          x: 8, y: 70, w: 84, h: 18,
          text: "Phase 2: the dome.\\nPhase 3: tell my wife the cost.",
          textStyle: "caption", fill: "#242018", stroke: "#3d3420", textColor: "#f4efe6",
          shadowOn: false, radius: 12, motion: mot("fade", 0.55, 0.4)
        })
      ]
    },
    {
      type: "content", layout: "section", name: "Quest",
      heading: "Active Quest",
      subhead: "Source firebrick, 46 count.",
      bullets: [],
      transition: tx("push-up", 0.35),
      shapes: [
        box({
          x: 7, y: 28, w: 86, h: 42, fill: "#1f1c14", stroke: "#c9a227", strokeWidth: 2, radius: 16,
          motion: mot("fly-up", 0.08, 0.45)
        }),
        msg({
          x: 12, y: 32, w: 76, h: 32, fill: "#1f1c14", stroke: "#1f1c14", strokeWidth: 0, shadowOn: false,
          text: "STATUS · Active · 1600 XP\\n\\nPersonal lane · Pinned\\nNext: dome, then honesty",
          textColor: "#f4efe6", textStyle: "body", motion: mot("fade", 0.3, 0.4)
        }),
        ovenRound({
          x: 34, y: 74, w: 32, h: 18,
          motion: mot("pop", 0.55, 0.4, { attention: "glow", attentionDelay: 1.1 })
        })
      ]
    },
    {
      type: "content", layout: "section", name: "Dossier",
      heading: "The dossier",
      subhead: "Gold borders. Real screenshot. Still no pizza.",
      bullets: [],
      transition: tx("zoom", 0.35),
      shapes: [
        modalShot({
          x: 8, y: 26, w: 84, h: 48,
          motion: mot("zoom", 0.05, 0.5)
        }),
        focus({
          x: 22, y: 36, w: 56, h: 14,
          motion: mot("fade", 0.5, 0.35, { attention: "focus-rings", attentionDelay: 1.0 })
        }),
        typeText({
          x: 10, y: 80, w: 80, h: 10, text: "Ask Claude about bricks. Peak.",
          textColor: "#f0d060", textStyle: "caption",
          motion: mot("fade", 0.7, 0.4)
        })
      ]
    },
    {
      type: "content", layout: "section", name: "Phases",
      heading: "Three phases",
      subhead: "Foundation → Dome → Disclosure",
      bullets: [],
      transition: tx("push-up", 0.35),
      shapes: [
        msg({
          x: 8, y: 26, w: 84, h: 16,
          text: "1 · Foundation — shipped",
          textStyle: "body", fill: "#1f1c14", stroke: "#3d3420", textColor: "#f4efe6",
          shadowOn: false, radius: 12, motion: mot("fly-up", 0.05, 0.35)
        }),
        msg({
          x: 8, y: 46, w: 84, h: 16,
          text: "2 · Dome — 46 firebricks (Active)",
          textStyle: "body", fill: "#f4efe6", stroke: "#c9a227", textColor: "#1a1a14",
          radius: 12, motion: mot("fly-up", 0.2, 0.35)
        }),
        msg({
          x: 8, y: 66, w: 84, h: 16,
          text: "3 · Tell my wife the cost — draft",
          textStyle: "body", fill: "#242018", stroke: "#c45c4a", textColor: "#f4efe6",
          shadowOn: false, radius: 12, motion: mot("fly-up", 0.35, 0.35)
        }),
        arrow({
          x: 30, y: 84, w: 40, h: 8, stroke: "#e0b83a", fill: "#e0b83a", arrowStyle: "double",
          strokeWidth: 2,
          motion: mot("fade", 0.55, 0.35, { attention: "pulse", attentionDelay: 1.1 })
        })
      ]
    },
    {
      type: "content", layout: "section", name: "Ask Claude",
      heading: "Ask Claude",
      subhead: "Reflection prompts, backyard edition.",
      bullets: [],
      transition: tx("fade", 0.35),
      shapes: [
        msg({
          x: 8, y: 26, w: 84, h: 16,
          text: "Revive or archive?",
          textStyle: "caption", fill: "#f4efe6", stroke: "#d6c7b5", textColor: "#1a1a14",
          radius: 12, motion: mot("fly-up", 0.05, 0.35)
        }),
        msg({
          x: 8, y: 46, w: 84, h: 16,
          text: "What’s unfinished? (the pizza)",
          textStyle: "caption", fill: "#f4efe6", stroke: "#d6c7b5", textColor: "#1a1a14",
          radius: 12, motion: mot("fly-up", 0.2, 0.35)
        }),
        msg({
          x: 8, y: 66, w: 84, h: 16,
          text: "Audit for gaps (budget honesty)",
          textStyle: "caption", fill: "#1f1c14", stroke: "#c9a227", textColor: "#f4efe6",
          shadowOn: false, radius: 12, motion: mot("fly-up", 0.35, 0.35)
        })
      ]
    },
    {
      type: "content", layout: "bullets", name: "Checklist",
      heading: "Checklist (theater)",
      subhead: "Not a real certification. Still a sample.",
      bullets: [
        "Foundation — shipped",
        "46 firebricks — Active Quest",
        "Dome — weather blocked",
        "Phase 3 disclosure — draft"
      ],
      transition: tx("push-up", 0.35),
      shapes: [
        highlight({
          x: 8, y: 78, w: 70, h: 8, fill: "#c9a227", opacity: 0.35,
          motion: mot("fade", 0.35, 0.4, { attention: "glow", attentionDelay: 0.9 })
        })
      ]
    },
    {
      type: "content", layout: "statement", name: "Close",
      heading: "Crust pending. Courage: draft.",
      subhead: "Firebrick Wrangler · phone sample",
      bullets: [],
      transition: tx("fade", 0.4),
      shapes: [
        typeText({
          x: 10, y: 48, w: 80, h: 8, text: "Certificate: oven TBD.",
          textColor: "#f0d060", textStyle: "caption",
          motion: mot("fade", 0.2, 0.4)
        }),
        ovenRound({
          x: 34, y: 58, w: 32, h: 18,
          glowOn: true, glowColor: "#c9a227", glowBlur: 14, glowOpacity: 0.4,
          motion: mot("pop", 0.4, 0.45, { attention: "pulse", attentionDelay: 1.0 })
        })
      ]
    }
  ];
}

export const PIZZA_SAMPLES = [
  {
    id: "pizza-oven",
    group: "sample",
    name: "Backyard Pizza Oven — Phase 2",
    title: "Backyard Pizza Oven — Phase 2",
    blurb: "Widescreen satire — firebrick quest, Ask Claude, real project-map screenshot",
    brand: Object.assign({}, PIZZA_BRAND),
    artboard: { id: "16:9", w: 1920, h: 1080 },
    steps: pizzaDesktopSteps(),
    cta: Object.assign({}, PIZZA_CTA),
    logo: PIZZA_ICON,
    assets: [
      { id: "pizza-oven-icon", name: "Pizza oven icon", image: PIZZA_ICON },
      { id: "backyard-pizza-oven", name: "Backyard Pizza Oven dossier", image: PIZZA_MODAL }
    ]
  },
  {
    id: "pizza-oven-phone",
    group: "sample",
    name: "Backyard Pizza Oven (phone)",
    title: "Backyard Pizza Oven — Phase 2 — Phone",
    blurb: "Portrait 9:16 — same dry DIY quest, stacked for thumbs",
    brand: Object.assign({}, PIZZA_BRAND),
    artboard: { id: "9:16", w: 1080, h: 1920 },
    steps: pizzaPhoneSteps(),
    cta: Object.assign({}, PIZZA_CTA),
    logo: PIZZA_ICON,
    assets: [
      { id: "pizza-oven-icon", name: "Pizza oven icon", image: PIZZA_ICON },
      { id: "backyard-pizza-oven", name: "Backyard Pizza Oven dossier", image: PIZZA_MODAL }
    ]
  }
];
`;

fs.writeFileSync(outPath, js);
console.log("Wrote", outPath, "(" + Math.round(js.length / 1024) + " KB)");
