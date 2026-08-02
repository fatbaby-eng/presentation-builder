/**
 * Satire sample: backyard pizza oven as enterprise quest theater.
 * Dry humor + focus rings, arrows, motion timing like the Dog Slack decks.
 */

import {
  mot, tx, box, msg, highlight, ellipse, frame, arrow, focus, typeText, phoneDot
} from "./sampleHelpers.js";
import { PIZZA_OVEN_SHOT } from "./samplePizzaShot.js";

/** Pixel oven mark — matches the dark UI / gold fire vibe. */
export const PIZZA_OVEN_MARK =
  "data:image/svg+xml," + encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 128 128">' +
    '<rect width="128" height="128" rx="28" fill="#1a1814"/>' +
    '<rect x="28" y="48" width="72" height="52" rx="6" fill="#5a4030"/>' +
    '<path d="M34 48c0-22 20-34 30-34s30 12 30 34" fill="#6b4a36"/>' +
    '<ellipse cx="64" cy="72" rx="18" ry="14" fill="#1a1814"/>' +
    '<ellipse cx="64" cy="74" rx="12" ry="8" fill="#e0a84a"/>' +
    '<ellipse cx="64" cy="76" rx="7" ry="4" fill="#f0c75a"/>' +
    '<rect x="22" y="96" width="84" height="10" rx="2" fill="#3d2e24"/>' +
    '</svg>'
  );

export const PIZZA_BRAND = {
  primary: "#e0a84a",
  secondary: "#c9a66b",
  accent: "#f0c75a",
  bg: "#1a1814",
  text: "#f4efe6",
  success: "#5b8f6b",
  warning: "#d4a017",
  danger: "#c45c4a",
  bg2: "#2a241c",
  bgMode: "gradient",
  bgAngle: 148,
  fontHeading: "georgia",
  fontBody: "system"
};

export const PIZZA_CTA = {
  enabled: true,
  text: "Visit toddboswell.com",
  url: "https://toddboswell.com"
};

function markFrame(opts) {
  return frame(Object.assign({
    image: PIZZA_OVEN_MARK, imageFit: "cover", radius: 18,
    stroke: "#e0a84a", strokeWidth: 2, fill: "#2a241c"
  }, opts));
}

function shotFrame(opts) {
  return frame(Object.assign({
    image: PIZZA_OVEN_SHOT, imageFit: "cover", radius: 12,
    stroke: "#c9a66b", strokeWidth: 2, fill: "#2a241c"
  }, opts));
}

export function pizzaDesktopSteps() {
  return [
    {
      type: "content", layout: "title", name: "Cover",
      heading: "Backyard Pizza Oven — Phase 2",
      subhead: "FIREBRICK WRANGLER — 1600 XP · personal lane · marital disclosure pending",
      bullets: [],
      notes: "Satire sample — backyard build as enterprise quest theater.",
      transition: tx("fade", 0.4),
      shapes: [
        ellipse({ x: 8, y: 18, w: 2.2, h: 4, fill: "#e0a84a", motion: mot("pop", 0.05, 0.35) }),
        ellipse({ x: 13, y: 26, w: 1.5, h: 2.7, fill: "#c9a66b", opacity: 0.9, motion: mot("pop", 0.18, 0.35) }),
        markFrame({
          x: 74, y: 14, w: 16, h: 28,
          glowOn: true, glowColor: "#e0a84a", glowBlur: 18, glowOpacity: 0.45,
          motion: mot("pop", 0.12, 0.45, { attention: "heartbeat", attentionDelay: 0.75 })
        }),
        typeText({
          x: 6, y: 56, w: 58, h: 8, text: "Yes, we filed a deck for masonry.",
          textColor: "#f0c75a", textStyle: "h2",
          motion: mot("fly-up", 0.4, 0.45)
        }),
        msg({
          x: 6, y: 68, w: 54, h: 18,
          text: "Personal lane · sample quest\nDome work. Budget diplomacy. Firebrick logistics.",
          textStyle: "caption", fill: "#2a241c", stroke: "#3d3428", textColor: "#f4efe6",
          shadowOn: false, radius: 12, motion: mot("fade", 0.55, 0.45)
        }),
        arrow({
          x: 58, y: 28, w: 14, h: 10, stroke: "#e0a84a", fill: "#e0a84a", arrowStyle: "curved",
          strokeWidth: 3, flipY: true,
          motion: mot("fade", 0.7, 0.4, { attention: "pulse", attentionDelay: 1.25 })
        })
      ]
    },
    {
      type: "content", layout: "section", name: "The quest",
      heading: "Active Quest (XP makes mortar official)",
      subhead: "Forty-six firebricks. A number that sounds like a purchase order.",
      bullets: [],
      transition: tx("push-left", 0.35),
      shapes: [
        markFrame({
          x: 80, y: 12, w: 12, h: 21,
          motion: mot("fly-right", 0.05, 0.4)
        }),
        box({
          x: 6, y: 42, w: 88, h: 46, fill: "#242018", stroke: "#3d3428", strokeWidth: 1, radius: 14,
          shadowOn: true, shadowY: 8, shadowBlur: 18, shadowOpacity: 0.28,
          motion: mot("fly-up", 0.15, 0.45)
        }),
        msg({
          x: 10, y: 46, w: 58, h: 36, fill: "#242018", stroke: "#242018", strokeWidth: 0, shadowOn: false,
          text: "STATUS · active · 1600 XP\n\nQuest: Source firebrick, 46 count\nLane: Personal (where shame lives)\nNext: Form the dome without improvising geometry\n#build #pizza #outdo #firebrick",
          textColor: "#f4efe6", textStyle: "body", motion: mot("fade", 0.35, 0.4)
        }),
        arrow({
          x: 62, y: 64, w: 12, h: 14, stroke: "#c9a66b", fill: "#c9a66b", arrowStyle: "dashed",
          strokeWidth: 2, flipX: true,
          motion: mot("fade", 0.55, 0.35)
        }),
        msg({
          x: 70, y: 48, w: 20, h: 14, fill: "#2a241c", stroke: "#e0a84a", strokeWidth: 1, shadowOn: false,
          text: "Pinned\n“for real”",
          textColor: "#f4efe6", textStyle: "caption", radius: 10,
          motion: mot("pop", 0.7, 0.4, { attention: "glow", attentionDelay: 1.25 })
        })
      ]
    },
    {
      type: "content", layout: "section", name: "Overview",
      heading: "Phase plan (marital risk included)",
      subhead: "Foundation shipped. Dome in progress. Disclosure: deferred.",
      bullets: [],
      notes: "Dry joke: Phase 3 is the real blocker.",
      transition: tx("zoom", 0.35),
      shapes: [
        box({
          x: 6, y: 32, w: 52, h: 56, fill: "#f4efe6", stroke: "#d6c7b5", strokeWidth: 1, radius: 14,
          shadowOn: true, shadowY: 8, shadowBlur: 18, shadowOpacity: 0.25,
          motion: mot("zoom", 0.05, 0.45)
        }),
        msg({
          x: 9, y: 36, w: 46, h: 46, fill: "#f4efe6", stroke: "#f4efe6", strokeWidth: 0, shadowOn: false,
          text: "OVERVIEW\n\nPhase 1 was the foundation.\nPhase 2 is the dome.\nPhase 3 is telling my wife how much firebrick costs.\n\nScope creep: delicious.\nBudget: classified.",
          textColor: "#1a1814", textStyle: "body", motion: mot("fade", 0.25, 0.4)
        }),
        shotFrame({
          x: 64, y: 34, w: 28, h: 36,
          motion: mot("fly-right", 0.2, 0.45)
        }),
        highlight({
          x: 10, y: 62, w: 40, h: 10, fill: "#e0a84a", opacity: 0.28,
          motion: mot("fade", 0.45, 0.35)
        }),
        arrow({
          x: 48, y: 52, w: 14, h: 12, stroke: "#e0a84a", fill: "#e0a84a", arrowStyle: "thick",
          strokeWidth: 4,
          motion: mot("fly-left", 0.55, 0.4, { attention: "pulse", attentionDelay: 1.1 })
        }),
        msg({
          x: 64, y: 74, w: 28, h: 12, fill: "#2a241c", stroke: "#c9a66b", strokeWidth: 1, shadowOn: false,
          text: "Phase 3 · blocked",
          textColor: "#f4efe6", textStyle: "caption", radius: 10,
          motion: mot("pop", 0.7, 0.4, { attention: "pulse", attentionDelay: 1.25 })
        })
      ]
    },
    {
      type: "content", layout: "section", name: "Sourcing",
      heading: "Module 1: Count the bricks (twice)",
      subhead: "A guided tour for a shopping list that somehow became a roadmap.",
      bullets: [],
      transition: tx("wipe-left", 0.35),
      shapes: [
        box({
          x: 8, y: 34, w: 54, h: 52, fill: "#242018", stroke: "#3d3428", strokeWidth: 1, radius: 14,
          shadowOn: true, shadowY: 6, shadowBlur: 14, shadowOpacity: 0.3,
          motion: mot("fly-up", 0.05, 0.4)
        }),
        msg({
          x: 11, y: 38, w: 48, h: 12, fill: "#2a241c", stroke: "#2a241c", strokeWidth: 0, shadowOn: false,
          text: "PROCUREMENT · firebrick SKU TBD",
          textColor: "#f4efe6", textStyle: "caption", motion: mot("fade", 0.2, 0.35)
        }),
        msg({
          x: 11, y: 52, w: 40, h: 12, fill: "#1a1814", stroke: "#3d3428", strokeWidth: 1, shadowOn: false,
          text: "Qty: 46  ·  Status: Active",
          textColor: "#f0c75a", textStyle: "h2", radius: 8, motion: mot("fade", 0.35, 0.4)
        }),
        msg({
          x: 66, y: 36, w: 26, h: 22,
          text: "Wrong count =\nanother weekend.\nCongrats, I guess.",
          textStyle: "caption", fill: "#f4efe6", stroke: "#d6c7b5", textColor: "#1a1814",
          radius: 12, motion: mot("fly-right", 0.5, 0.4)
        }),
        arrow({
          x: 48, y: 54, w: 16, h: 10, stroke: "#e23d4b", fill: "#e23d4b", arrowStyle: "solid",
          strokeWidth: 3,
          motion: mot("fade", 0.7, 0.35, { attention: "pulse", attentionDelay: 1.2 })
        }),
        focus({
          x: 14, y: 50, w: 34, h: 16,
          motion: mot("fade", 0.85, 0.35, { attention: "focus-rings", attentionDelay: 1.35 })
        }),
        typeText({
          x: 66, y: 64, w: 26, h: 10, text: "Especially not 45.",
          textColor: "#c45c4a", textStyle: "body",
          motion: mot("pop", 1.0, 0.35)
        }),
        ellipse({
          x: 18, y: 72, w: 3, h: 5.4, fill: "#c9a66b",
          motion: mot("bounce", 0.3, 0.4, {
            move: "from-to", moveDelay: 0.55, moveDuration: 0.9,
            moveFromX: 72, moveFromY: 74, moveToX: 18, moveToY: 72
          })
        })
      ]
    },
    {
      type: "content", layout: "section", name: "Dome",
      heading: "Module 2: Dome before diplomacy",
      subhead: "Radical idea: finish the arch. Someone will still ask about the receipt.",
      bullets: [],
      transition: tx("push-left", 0.35),
      shapes: [
        msg({
          x: 6, y: 36, w: 28, h: 48,
          text: "Foundation\nPhase 1\nShipped\n\n→ do not reopen",
          textStyle: "caption", fill: "#242018", stroke: "#3d3428", textColor: "#f4efe6",
          shadowOn: false, radius: 12, motion: mot("fly-up", 0.05, 0.4)
        }),
        msg({
          x: 36, y: 36, w: 28, h: 48,
          text: "Dome\nPhase 2\nIn flight\n\n→ count bricks",
          textStyle: "caption", fill: "#f4efe6", stroke: "#d6c7b5", textColor: "#1a1814",
          radius: 12, motion: mot("fly-up", 0.2, 0.4)
        }),
        msg({
          x: 66, y: 36, w: 28, h: 48,
          text: "Disclosure\nPhase 3\nDeferred\n\n→ do not enter",
          textStyle: "caption", fill: "#2a241c", stroke: "#c45c4a", textColor: "#f4efe6",
          shadowOn: false, radius: 12, motion: mot("fly-up", 0.35, 0.4)
        }),
        arrow({
          x: 28, y: 28, w: 14, h: 10, stroke: "#e0a84a", fill: "#e0a84a", arrowStyle: "block",
          strokeWidth: 2, flipY: true,
          motion: mot("fade", 0.55, 0.35, { attention: "pulse", attentionDelay: 1.0 })
        }),
        arrow({
          x: 58, y: 78, w: 16, h: 8, stroke: "#c9a66b", fill: "#c9a66b", arrowStyle: "double",
          strokeWidth: 2,
          motion: mot("fade", 0.7, 0.35)
        }),
        focus({
          x: 44, y: 42, w: 12, h: 18,
          motion: mot("fade", 0.8, 0.35, { attention: "focus-rings", attentionDelay: 1.3 })
        })
      ]
    },
    {
      type: "content", layout: "section", name: "Ask Claude",
      heading: "Ask Claude (peak overkill)",
      subhead: "AI reflection for a backyard build. Because 2020s.",
      bullets: [],
      transition: tx("fade", 0.35),
      shapes: [
        msg({
          x: 5, y: 36, w: 29, h: 50,
          text: "Revive or archive?\n\nIs this still a quest — or did pizza win just by existing?",
          textStyle: "caption", fill: "#f4efe6", stroke: "#d6c7b5", textColor: "#1a1814",
          radius: 12, motion: mot("fly-up", 0.05, 0.4)
        }),
        msg({
          x: 35.5, y: 36, w: 29, h: 50,
          text: "What’s unfinished?\n\nThe dome. The count. Not mentioning the invoice at dinner.",
          textStyle: "caption", fill: "#f4efe6", stroke: "#d6c7b5", textColor: "#1a1814",
          radius: 12, motion: mot("fly-up", 0.22, 0.4)
        }),
        msg({
          x: 66, y: 36, w: 29, h: 50,
          text: "Audit for gaps\n\nWhere “weekend project” ends and “please open an incident” begins.",
          textStyle: "caption", fill: "#242018", stroke: "#e0a84a", textColor: "#f4efe6",
          shadowOn: false, radius: 12, motion: mot("fly-up", 0.4, 0.4)
        }),
        typeText({
          x: 5, y: 88, w: 70, h: 8, text: "We asked a language model about firebrick. Naturally.",
          textColor: "#f0c75a", textStyle: "caption",
          motion: mot("fade", 0.7, 0.4)
        })
      ]
    },
    {
      type: "content", layout: "bullets", name: "Checklist",
      heading: "Build checklist (theater)",
      subhead: "Sample progress — not live masonry telemetry",
      bullets: [
        "Foundation poured without a deck — shipped (barely)",
        "Source firebrick × 46 — forever “in progress”",
        "Form the dome — blocked by geometry & optimism",
        "Phase 3 disclosure — the only KPI leadership (spouse) cared about"
      ],
      transition: tx("push-left", 0.35),
      shapes: [
        markFrame({
          x: 82, y: 12, w: 10, h: 18,
          motion: mot("bounce", 0.1, 0.45)
        }),
        arrow({
          x: 68, y: 20, w: 12, h: 10, stroke: "#e0a84a", fill: "#e0a84a", arrowStyle: "curved",
          strokeWidth: 3,
          motion: mot("fade", 0.35, 0.35, { attention: "pulse", attentionDelay: 0.85 })
        }),
        highlight({
          x: 6, y: 76, w: 48, h: 8, fill: "#c9a66b", opacity: 0.35,
          motion: mot("fade", 0.45, 0.4, { attention: "glow", attentionDelay: 1.0 })
        }),
        ellipse({ x: 58, y: 80, w: 2.2, h: 4, fill: "#e0a84a", motion: mot("pop", 0.65, 0.35) })
      ]
    },
    {
      type: "content", layout: "statement", name: "Close",
      heading: "Nobody needed this walkthrough. Especially not the oven.",
      subhead: "— Firebrick Wrangler · 1600 XP · still on the map · sample",
      bullets: [],
      transition: tx("fade", 0.45),
      shapes: [
        msg({
          x: 24, y: 48, w: 52, h: 12,
          text: "Certificate of completion: crust vibes only.",
          textStyle: "caption", fill: "#2a241c", stroke: "#3d3428", textColor: "#f4efe6",
          shadowOn: false, radius: 10, motion: mot("fly-up", 0.2, 0.4)
        }),
        markFrame({
          x: 42, y: 62, w: 14, h: 24,
          glowOn: true, glowColor: "#e0a84a", glowBlur: 16, glowOpacity: 0.4,
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
      subhead: "Phone edition of masonry theater · 1600 XP",
      bullets: [],
      notes: "Portrait 9:16 pizza-oven satire sample.",
      transition: tx("fade", 0.4),
      shapes: [
        phoneDot({ x: 12, y: 18, h: 3.2, fill: "#e0a84a", motion: mot("pop", 0.05, 0.35) }),
        phoneDot({ x: 22, y: 22, h: 2.2, fill: "#c9a66b", opacity: 0.9, motion: mot("pop", 0.15, 0.35) }),
        markFrame({
          x: 34, y: 28, w: 32, h: 18, radius: 16,
          glowOn: true, glowColor: "#e0a84a", glowBlur: 14, glowOpacity: 0.4,
          motion: mot("pop", 0.15, 0.45, { attention: "heartbeat", attentionDelay: 0.75 })
        }),
        msg({
          x: 8, y: 68, w: 84, h: 18,
          text: "FIREBRICK WRANGLER · 1600 XP\nYes, we verticalized the absurdity.",
          textStyle: "caption", fill: "#2a241c", stroke: "#3d3428", textColor: "#f4efe6",
          shadowOn: false, radius: 14, motion: mot("fly-up", 0.45, 0.4)
        })
      ]
    },
    {
      type: "content", layout: "section", name: "Quest",
      heading: "Active Quest",
      subhead: "Gamified because “buy bricks” felt under-documented.",
      bullets: [],
      transition: tx("push-up", 0.35),
      shapes: [
        msg({
          x: 7, y: 30, w: 86, h: 28,
          text: "STATUS · active · 1600 XP\n\nSource firebrick, 46 count\nNext: form the dome",
          textStyle: "body", fill: "#242018", stroke: "#3d3428", textColor: "#f4efe6",
          shadowOn: false, radius: 16, motion: mot("fly-up", 0.08, 0.4)
        }),
        arrow({
          x: 70, y: 52, w: 18, h: 10, stroke: "#e0a84a", fill: "#e0a84a", arrowStyle: "dashed",
          strokeWidth: 2, flipY: true,
          motion: mot("fade", 0.4, 0.35)
        }),
        msg({
          x: 7, y: 62, w: 86, h: 20,
          text: "Pinned: “for real”\nTranslation: someone opened a spreadsheet.",
          textStyle: "caption", fill: "#2a241c", stroke: "#e0a84a", textColor: "#f4efe6",
          shadowOn: false, radius: 14,
          motion: mot("fly-up", 0.55, 0.4, { attention: "glow", attentionDelay: 1.1 })
        })
      ]
    },
    {
      type: "content", layout: "section", name: "Overview",
      heading: "Phase plan",
      subhead: "Foundation. Dome. Then the conversation.",
      bullets: [],
      transition: tx("zoom", 0.35),
      shapes: [
        msg({
          x: 7, y: 28, w: 86, h: 36,
          text: "Phase 1 was the foundation.\nPhase 2 is the dome.\nPhase 3 is telling my wife how much firebrick costs.",
          textStyle: "body", fill: "#f4efe6", stroke: "#d6c7b5", textColor: "#1a1814",
          radius: 16, motion: mot("zoom", 0.08, 0.45)
        }),
        highlight({
          x: 12, y: 52, w: 76, h: 8, fill: "#e0a84a", opacity: 0.28,
          motion: mot("fade", 0.4, 0.35)
        }),
        shotFrame({
          x: 22, y: 68, w: 56, h: 18, radius: 12,
          motion: mot("fly-up", 0.5, 0.4, { attention: "pulse", attentionDelay: 1.05 })
        })
      ]
    },
    {
      type: "content", layout: "section", name: "Sourcing",
      heading: "Count the bricks",
      subhead: "Focus rings for a qty field a raised eyebrow could’ve audited.",
      bullets: [],
      transition: tx("push-up", 0.35),
      shapes: [
        msg({
          x: 7, y: 28, w: 86, h: 12,
          text: "PROCUREMENT · firebrick SKU TBD",
          textStyle: "caption", fill: "#242018", stroke: "#3d3428", textColor: "#f4efe6",
          shadowOn: false, radius: 12, motion: mot("fade", 0.05, 0.35)
        }),
        msg({
          x: 14, y: 44, w: 72, h: 12,
          text: "Qty: 46  ·  Status: Active",
          textStyle: "h2", fill: "#1a1814", stroke: "#3d3428", textColor: "#f0c75a",
          shadowOn: false, radius: 10, motion: mot("fade", 0.25, 0.4)
        }),
        focus({
          x: 18, y: 42, w: 64, h: 14,
          motion: mot("fade", 0.5, 0.35, { attention: "focus-rings", attentionDelay: 1.1 })
        }),
        arrow({
          x: 30, y: 56, w: 40, h: 10, stroke: "#e23d4b", fill: "#e23d4b", arrowStyle: "thick",
          strokeWidth: 3,
          motion: mot("fade", 0.7, 0.35, { attention: "pulse", attentionDelay: 1.25 })
        }),
        phoneDot({
          x: 12, y: 80, h: 3.4, fill: "#c9a66b",
          motion: mot("bounce", 0.2, 0.4, {
            move: "from-to", moveDelay: 0.5, moveDuration: 0.85,
            moveFromX: 70, moveFromY: 80, moveToX: 12, moveToY: 80
          })
        })
      ]
    },
    {
      type: "content", layout: "section", name: "Ask Claude",
      heading: "Ask Claude",
      subhead: "Silicon Valley for “maybe don’t mention the receipt.”",
      bullets: [],
      transition: tx("fade", 0.35),
      shapes: [
        msg({
          x: 7, y: 28, w: 86, h: 18,
          text: "Revive or archive?\nHas pizza already won by existing?",
          textStyle: "caption", fill: "#f4efe6", stroke: "#d6c7b5", textColor: "#1a1814",
          radius: 14, motion: mot("fly-up", 0.05, 0.4)
        }),
        msg({
          x: 7, y: 50, w: 86, h: 18,
          text: "What’s unfinished?\nDome geometry. Dinner diplomacy.",
          textStyle: "caption", fill: "#f4efe6", stroke: "#d6c7b5", textColor: "#1a1814",
          radius: 14, motion: mot("fly-up", 0.25, 0.4)
        }),
        msg({
          x: 7, y: 72, w: 86, h: 16,
          text: "We asked AI about firebrick.",
          textStyle: "h2", fill: "#242018", stroke: "#e0a84a", textColor: "#f4efe6",
          shadowOn: false, radius: 14, motion: mot("fly-up", 0.45, 0.4)
        })
      ]
    },
    {
      type: "content", layout: "bullets", name: "Checklist",
      heading: "Checklist (theater)",
      subhead: "Not a real badge. Still smells like woodsmoke.",
      bullets: [
        "Foundation — shipped (barely)",
        "Firebrick × 46 — eternally “in progress”",
        "Dome form — blocked by optimism",
        "Phase 3 disclosure — the real goal"
      ],
      transition: tx("push-up", 0.35),
      shapes: [
        highlight({
          x: 8, y: 78, w: 70, h: 8, fill: "#c9a66b", opacity: 0.35,
          motion: mot("fade", 0.35, 0.4, { attention: "glow", attentionDelay: 0.9 })
        })
      ]
    },
    {
      type: "content", layout: "statement", name: "Close",
      heading: "You didn’t need this. Neither did the oven.",
      subhead: "Firebrick Wrangler · phone sample · crust certificate",
      bullets: [],
      transition: tx("fade", 0.4),
      shapes: [
        typeText({
          x: 10, y: 48, w: 80, h: 8, text: "Certificate: crust vibes only.",
          textColor: "#f0c75a", textStyle: "caption",
          motion: mot("fade", 0.2, 0.4)
        }),
        markFrame({
          x: 34, y: 58, w: 32, h: 18, radius: 16,
          glowOn: true, glowColor: "#e0a84a", glowBlur: 14, glowOpacity: 0.4,
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
    blurb: "Widescreen satire — backyard masonry as enterprise quest with gold accents & screenshot",
    brand: Object.assign({}, PIZZA_BRAND),
    artboard: { id: "16:9", w: 1920, h: 1080 },
    steps: pizzaDesktopSteps(),
    cta: Object.assign({}, PIZZA_CTA),
    logo: PIZZA_OVEN_MARK,
    assets: [
      { id: "pizza-oven-mark", name: "Pizza oven mark", image: PIZZA_OVEN_MARK },
      { id: "pizza-oven-shot", name: "Pizza oven screenshot", image: PIZZA_OVEN_SHOT }
    ]
  },
  {
    id: "pizza-oven-phone",
    group: "sample",
    name: "Backyard Pizza Oven — Phase 2 (phone)",
    title: "Backyard Pizza Oven — Phase 2 — Phone",
    blurb: "Portrait 9:16 — same firebrick quest, thumb-sized marital risk",
    brand: Object.assign({}, PIZZA_BRAND),
    artboard: { id: "9:16", w: 1080, h: 1920 },
    steps: pizzaPhoneSteps(),
    cta: Object.assign({}, PIZZA_CTA),
    logo: PIZZA_OVEN_MARK,
    assets: [
      { id: "pizza-oven-mark", name: "Pizza oven mark", image: PIZZA_OVEN_MARK },
      { id: "pizza-oven-shot", name: "Pizza oven screenshot", image: PIZZA_OVEN_SHOT }
    ]
  }
];
