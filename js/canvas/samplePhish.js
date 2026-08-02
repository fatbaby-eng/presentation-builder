/**
 * Third satire sample: corporate phishing compliance training theater.
 * Dry humor + focus rings, arrows, motion timing like the Dog / Builder decks.
 */

import {
  mot, tx, box, msg, highlight, ellipse, frame, arrow, focus, typeText, phoneDot
} from "./sampleHelpers.js";

export const PHISH_MARK =
  "data:image/svg+xml," + encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 128 128">' +
    '<rect width="128" height="128" rx="28" fill="#1e2a32"/>' +
    '<path d="M24 44h80v48H24z" fill="#e8dcc8" rx="6"/>' +
    '<path d="M24 44l40 28 40-28" fill="none" stroke="#3d5a4c" stroke-width="4"/>' +
    '<circle cx="96" cy="36" r="16" fill="#c45c4a"/>' +
    '<text x="96" y="42" text-anchor="middle" font-size="22" fill="#fff" font-family="Georgia,serif">!</text>' +
    '</svg>'
  );

export const PHISH_BRAND = {
  primary: "#3d5a4c",
  secondary: "#8a9a7b",
  accent: "#c4a882",
  bg: "#1e2a32",
  text: "#f2ebe1",
  success: "#5b8f6b",
  warning: "#d4a017",
  danger: "#c45c4a",
  bg2: "#2a3a44",
  bgMode: "gradient",
  bgAngle: 148,
  fontHeading: "georgia",
  fontBody: "system"
};

export const PHISH_CTA = {
  enabled: true,
  text: "Visit toddboswell.com",
  url: "https://toddboswell.com"
};

function markFrame(opts) {
  return frame(Object.assign({
    image: PHISH_MARK, imageFit: "cover", radius: 18,
    stroke: "#8a9a7b", strokeWidth: 2, fill: "#2a3a44"
  }, opts));
}

export function phishDesktopSteps() {
  return [
    {
      type: "content", layout: "title", name: "Cover",
      heading: "Compliance Training: Don’t Click the Phish",
      subhead: "Unless It’s Lunch · mandatory theater · 30 minutes you’ll never get back",
      bullets: [],
      notes: "Satire sample — fake phishing training with real builder features.",
      transition: tx("fade", 0.4),
      shapes: [
        ellipse({ x: 8, y: 18, w: 2.2, h: 4, fill: "#3d5a4c", motion: mot("pop", 0.05, 0.35) }),
        ellipse({ x: 13, y: 26, w: 1.5, h: 2.7, fill: "#c45c4a", opacity: 0.9, motion: mot("pop", 0.18, 0.35) }),
        markFrame({
          x: 74, y: 14, w: 16, h: 28,
          glowOn: true, glowColor: "#8a9a7b", glowBlur: 18, glowOpacity: 0.4,
          motion: mot("pop", 0.12, 0.45, { attention: "heartbeat", attentionDelay: 0.75 })
        }),
        typeText({
          x: 6, y: 56, w: 60, h: 8, text: "Your inbox is a crime scene. Also a cafeteria.",
          textColor: "#c4a882", textStyle: "h2",
          motion: mot("fly-up", 0.4, 0.45)
        }),
        msg({
          x: 6, y: 68, w: 54, h: 18,
          text: "Security Awareness · Q3\nClick wrong → quiz. Click lunch → nourished.",
          textStyle: "caption", fill: "#2a3a44", stroke: "#3d4f58", textColor: "#f2ebe1",
          shadowOn: false, radius: 12, motion: mot("fade", 0.55, 0.45)
        }),
        arrow({
          x: 58, y: 26, w: 14, h: 10, stroke: "#c4a882", fill: "#c4a882", arrowStyle: "curved",
          strokeWidth: 3, flipY: true,
          motion: mot("fade", 0.7, 0.4, { attention: "pulse", attentionDelay: 1.25 })
        })
      ]
    },
    {
      type: "content", layout: "section", name: "Threat",
      heading: "Threat landscape (corporate poetry)",
      subhead: "Attackers want credentials. You want sandwich. Stay focused.",
      bullets: [],
      transition: tx("push-left", 0.35),
      shapes: [
        msg({
          x: 6, y: 34, w: 28, h: 50,
          text: "Spear phish\nPersonalized.\nFlattering.\nStill fake.",
          textStyle: "caption", fill: "#243640", stroke: "#3d4f58", textColor: "#f2ebe1",
          shadowOn: false, radius: 12, motion: mot("fly-up", 0.05, 0.4)
        }),
        msg({
          x: 36, y: 34, w: 28, h: 50,
          text: "CEO urgency\n“Wire now.”\nTone: panic.\nGrammar: suspect.",
          textStyle: "caption", fill: "#f2ebe1", stroke: "#d6c7b5", textColor: "#1e2a32",
          radius: 12, motion: mot("fly-up", 0.22, 0.4)
        }),
        msg({
          x: 66, y: 34, w: 28, h: 50,
          text: "IT reset\n“Password\nexpires in\n3 minutes.”\n(It doesn’t.)",
          textStyle: "caption", fill: "#2a3a44", stroke: "#c45c4a", textColor: "#f2ebe1",
          shadowOn: false, radius: 12, motion: mot("fly-up", 0.4, 0.4)
        }),
        highlight({
          x: 68, y: 62, w: 24, h: 8, fill: "#c45c4a", opacity: 0.28,
          motion: mot("fade", 0.6, 0.35)
        })
      ]
    },
    {
      type: "content", layout: "section", name: "Bait",
      heading: "The bait: fake urgency, real fonts",
      subhead: "Looks official. Feels official. Is not official.",
      bullets: [],
      transition: tx("zoom", 0.35),
      shapes: [
        box({
          x: 8, y: 32, w: 52, h: 54, fill: "#f2ebe1", stroke: "#d6c7b5", strokeWidth: 1, radius: 14,
          shadowOn: true, shadowY: 8, shadowBlur: 18, shadowOpacity: 0.25,
          motion: mot("zoom", 0.05, 0.45)
        }),
        msg({
          x: 11, y: 36, w: 46, h: 44, fill: "#f2ebe1", stroke: "#f2ebe1", strokeWidth: 0, shadowOn: false,
          text: "From: it-support@corp-secvrity.com\n\nSubject: ACTION REQUIRED — mailbox full\n\nClick here to verify identity before\nyour access is “temporarily limited.”\n\nLove, Definitely IT",
          textColor: "#1e2a32", textStyle: "body", motion: mot("fade", 0.25, 0.4)
        }),
        highlight({
          x: 14, y: 58, w: 36, h: 8, fill: "#c45c4a", opacity: 0.25,
          motion: mot("fade", 0.45, 0.35)
        }),
        focus({
          x: 18, y: 56, w: 28, h: 12,
          motion: mot("fade", 0.7, 0.35, { attention: "focus-rings", attentionDelay: 1.2 })
        }),
        arrow({
          x: 56, y: 52, w: 14, h: 12, stroke: "#c45c4a", fill: "#c45c4a", arrowStyle: "thick",
          strokeWidth: 3,
          motion: mot("fly-left", 0.85, 0.4, { attention: "pulse", attentionDelay: 1.35 })
        }),
        msg({
          x: 68, y: 40, w: 26, h: 36,
          text: "Red flag:\nmisspelled\ndomain +\nweaponized\npoliteness",
          textStyle: "caption", fill: "#2a3a44", stroke: "#c4a882", textColor: "#f2ebe1",
          shadowOn: false, radius: 12, motion: mot("pop", 1.0, 0.4)
        })
      ]
    },
    {
      type: "content", layout: "section", name: "Flags",
      heading: "Red flags (point and stare)",
      subhead: "Focus rings for things a raised eyebrow could’ve caught.",
      bullets: [],
      transition: tx("wipe-left", 0.35),
      shapes: [
        box({
          x: 8, y: 34, w: 54, h: 52, fill: "#243640", stroke: "#3d4f58", strokeWidth: 1, radius: 14,
          shadowOn: true, shadowY: 6, shadowBlur: 14, shadowOpacity: 0.3,
          motion: mot("fly-up", 0.05, 0.4)
        }),
        msg({
          x: 11, y: 38, w: 48, h: 12, fill: "#2a3a44", stroke: "#2a3a44", strokeWidth: 0, shadowOn: false,
          text: "Link preview · corp-secvrity.com",
          textColor: "#f2ebe1", textStyle: "caption", motion: mot("fade", 0.2, 0.35)
        }),
        msg({
          x: 11, y: 54, w: 48, h: 14, fill: "#1e2a32", stroke: "#3d4f58", strokeWidth: 1, shadowOn: false,
          text: "https://corp-secvrity.com/login…",
          textColor: "#c45c4a", textStyle: "body", radius: 8, motion: mot("fade", 0.35, 0.4)
        }),
        focus({
          x: 14, y: 52, w: 42, h: 16,
          motion: mot("fade", 0.55, 0.35, { attention: "focus-rings", attentionDelay: 1.15 })
        }),
        arrow({
          x: 48, y: 58, w: 16, h: 10, stroke: "#c45c4a", fill: "#c45c4a", arrowStyle: "solid",
          strokeWidth: 3,
          motion: mot("fade", 0.75, 0.35, { attention: "pulse", attentionDelay: 1.3 })
        }),
        msg({
          x: 66, y: 36, w: 28, h: 28,
          text: "v before i.\nAlways.\nExcept when\nit’s lunch.",
          textStyle: "caption", fill: "#f2ebe1", stroke: "#d6c7b5", textColor: "#1e2a32",
          radius: 12, motion: mot("fly-right", 0.5, 0.4)
        }),
        typeText({
          x: 66, y: 70, w: 28, h: 10, text: "Don’t tap this.",
          textColor: "#c45c4a", textStyle: "body",
          motion: mot("pop", 0.95, 0.35)
        }),
        ellipse({
          x: 18, y: 72, w: 3, h: 5.4, fill: "#8a9a7b",
          motion: mot("bounce", 0.3, 0.4, {
            move: "from-to", moveDelay: 0.55, moveDuration: 0.9,
            moveFromX: 72, moveFromY: 74, moveToX: 18, moveToY: 72
          })
        })
      ]
    },
    {
      type: "content", layout: "section", name: "Instead",
      heading: "What to do instead (the boring path)",
      subhead: "Hover. Verify. Ask. Or walk to IT and point at the screen.",
      bullets: [],
      transition: tx("push-left", 0.35),
      shapes: [
        msg({
          x: 6, y: 36, w: 28, h: 48,
          text: "1. Hover\nSee the real URL\n\n→ if weird, stop",
          textStyle: "caption", fill: "#243640", stroke: "#3d4f58", textColor: "#f2ebe1",
          shadowOn: false, radius: 12, motion: mot("fly-up", 0.05, 0.4)
        }),
        msg({
          x: 36, y: 36, w: 28, h: 48,
          text: "2. Verify\nKnown channel\n\n→ not the email",
          textStyle: "caption", fill: "#f2ebe1", stroke: "#d6c7b5", textColor: "#1e2a32",
          radius: 12, motion: mot("fly-up", 0.2, 0.4)
        }),
        msg({
          x: 66, y: 36, w: 28, h: 48,
          text: "3. Report\nForward to security\n\n→ earn 10 XP (fake)",
          textStyle: "caption", fill: "#2a3a44", stroke: "#3d5a4c", textColor: "#f2ebe1",
          shadowOn: false, radius: 12, motion: mot("fly-up", 0.35, 0.4)
        }),
        arrow({
          x: 28, y: 28, w: 14, h: 10, stroke: "#c4a882", fill: "#c4a882", arrowStyle: "block",
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
      type: "content", layout: "section", name: "Lunch",
      heading: "Exception: lunch is not a phish",
      subhead: "Legal insisted we clarify. Culinary risk ≠ security risk.",
      bullets: [],
      transition: tx("fade", 0.35),
      shapes: [
        msg({
          x: 8, y: 34, w: 50, h: 48,
          text: "Allowed clicks\n\n• “Lunch is here” from a coworker you recognize\n• Calendar invite for actual food\n• The cafeteria QR that is physically on the wall\n\nNot allowed: “Free pizza if you paste your password.”",
          textStyle: "body", fill: "#f2ebe1", stroke: "#d6c7b5", textColor: "#1e2a32",
          radius: 14, motion: mot("fly-up", 0.1, 0.4)
        }),
        markFrame({
          x: 66, y: 36, w: 22, h: 38,
          motion: mot("fly-right", 0.3, 0.45, { attention: "pulse", attentionDelay: 1.0 })
        }),
        typeText({
          x: 8, y: 88, w: 70, h: 8, text: "When in doubt: eat first, report second.",
          textColor: "#c4a882", textStyle: "caption",
          motion: mot("fade", 0.65, 0.4)
        })
      ]
    },
    {
      type: "content", layout: "bullets", name: "Checklist",
      heading: "Compliance checklist (theater)",
      subhead: "Sample progress — not live SOC telemetry",
      bullets: [
        "Hovered a sketchy link — shipped",
        "Spotted “secvrity” typo — in progress (pride)",
        "Reported fake IT email — blocked by habit",
        "Ate lunch without credentials — the real KPI"
      ],
      transition: tx("push-left", 0.35),
      shapes: [
        markFrame({
          x: 82, y: 12, w: 10, h: 18,
          motion: mot("bounce", 0.1, 0.45)
        }),
        arrow({
          x: 68, y: 20, w: 12, h: 10, stroke: "#c4a882", fill: "#c4a882", arrowStyle: "curved",
          strokeWidth: 3,
          motion: mot("fade", 0.35, 0.35, { attention: "pulse", attentionDelay: 0.85 })
        }),
        highlight({
          x: 6, y: 76, w: 48, h: 8, fill: "#8a9a7b", opacity: 0.35,
          motion: mot("fade", 0.45, 0.4, { attention: "glow", attentionDelay: 1.0 })
        })
      ]
    },
    {
      type: "content", layout: "statement", name: "Close",
      heading: "You didn’t click the phish. Unless it was lunch.",
      subhead: "— Compliance Ranger · sample · toddboswell.com",
      bullets: [],
      transition: tx("fade", 0.45),
      shapes: [
        msg({
          x: 24, y: 48, w: 52, h: 12,
          text: "Certificate: awareness performed.",
          textStyle: "caption", fill: "#2a3a44", stroke: "#3d4f58", textColor: "#f2ebe1",
          shadowOn: false, radius: 10, motion: mot("fly-up", 0.2, 0.4)
        }),
        markFrame({
          x: 42, y: 62, w: 14, h: 24,
          glowOn: true, glowColor: "#c4a882", glowBlur: 16, glowOpacity: 0.4,
          motion: mot("pop", 0.4, 0.45, { attention: "pulse", attentionDelay: 1.0 })
        })
      ]
    }
  ];
}

export function phishPhoneSteps() {
  return [
    {
      type: "content", layout: "title", name: "Cover",
      heading: "Don’t Click the Phish",
      subhead: "Unless It’s Lunch · phone edition of mandatory theater.",
      bullets: [],
      notes: "Portrait 9:16 compliance satire sample.",
      transition: tx("fade", 0.4),
      shapes: [
        phoneDot({ x: 12, y: 18, h: 3.2, fill: "#3d5a4c", motion: mot("pop", 0.05, 0.35) }),
        phoneDot({ x: 22, y: 22, h: 2.2, fill: "#c45c4a", opacity: 0.9, motion: mot("pop", 0.15, 0.35) }),
        markFrame({
          x: 34, y: 28, w: 32, h: 18, radius: 16,
          glowOn: true, glowColor: "#8a9a7b", glowBlur: 14, glowOpacity: 0.4,
          motion: mot("pop", 0.15, 0.45, { attention: "heartbeat", attentionDelay: 0.75 })
        }),
        msg({
          x: 8, y: 68, w: 84, h: 18,
          text: "Security Awareness · Q3\nVerticalized skepticism included.",
          textStyle: "caption", fill: "#2a3a44", stroke: "#3d4f58", textColor: "#f2ebe1",
          shadowOn: false, radius: 14, motion: mot("fly-up", 0.45, 0.4)
        })
      ]
    },
    {
      type: "content", layout: "section", name: "Bait",
      heading: "Fake urgency",
      subhead: "Password expires in 3 minutes. (Narrator: it doesn’t.)",
      bullets: [],
      transition: tx("push-up", 0.35),
      shapes: [
        msg({
          x: 7, y: 28, w: 86, h: 36,
          text: "From: it-support@corp-secvrity.com\n\n“Verify now or lose access.”\nLove, Definitely IT",
          textStyle: "body", fill: "#f2ebe1", stroke: "#d6c7b5", textColor: "#1e2a32",
          radius: 16, motion: mot("zoom", 0.08, 0.45)
        }),
        highlight({
          x: 14, y: 48, w: 72, h: 8, fill: "#c45c4a", opacity: 0.25,
          motion: mot("fade", 0.4, 0.35)
        }),
        focus({
          x: 24, y: 46, w: 52, h: 12,
          motion: mot("fade", 0.6, 0.35, { attention: "focus-rings", attentionDelay: 1.15 })
        }),
        msg({
          x: 7, y: 72, w: 86, h: 14,
          text: "Misspelled domain = free red flag.",
          textStyle: "caption", fill: "#2a3a44", stroke: "#c45c4a", textColor: "#f2ebe1",
          shadowOn: false, radius: 12, motion: mot("fly-up", 0.75, 0.4)
        })
      ]
    },
    {
      type: "content", layout: "section", name: "Flags",
      heading: "Don’t tap this",
      subhead: "Focus rings for the look your IT person already gave you.",
      bullets: [],
      transition: tx("push-up", 0.35),
      shapes: [
        msg({
          x: 7, y: 28, w: 86, h: 12,
          text: "Link · corp-secvrity.com",
          textStyle: "caption", fill: "#243640", stroke: "#3d4f58", textColor: "#f2ebe1",
          shadowOn: false, radius: 12, motion: mot("fade", 0.05, 0.35)
        }),
        msg({
          x: 10, y: 44, w: 80, h: 12,
          text: "https://corp-secvrity.com/login…",
          textStyle: "body", fill: "#1e2a32", stroke: "#3d4f58", textColor: "#c45c4a",
          shadowOn: false, radius: 10, motion: mot("fade", 0.25, 0.4)
        }),
        focus({
          x: 18, y: 42, w: 64, h: 14,
          motion: mot("fade", 0.5, 0.35, { attention: "focus-rings", attentionDelay: 1.1 })
        }),
        arrow({
          x: 30, y: 56, w: 40, h: 10, stroke: "#c45c4a", fill: "#c45c4a", arrowStyle: "thick",
          strokeWidth: 3,
          motion: mot("fade", 0.7, 0.35, { attention: "pulse", attentionDelay: 1.25 })
        }),
        phoneDot({
          x: 12, y: 80, h: 3.4, fill: "#8a9a7b",
          motion: mot("bounce", 0.2, 0.4, {
            move: "from-to", moveDelay: 0.5, moveDuration: 0.85,
            moveFromX: 70, moveFromY: 80, moveToX: 12, moveToY: 80
          })
        })
      ]
    },
    {
      type: "content", layout: "section", name: "Instead",
      heading: "Hover · verify · report",
      subhead: "The boring path is the winning path.",
      bullets: [],
      transition: tx("fade", 0.35),
      shapes: [
        msg({
          x: 7, y: 28, w: 86, h: 16,
          text: "1. Hover — see the real URL",
          textStyle: "caption", fill: "#f2ebe1", stroke: "#d6c7b5", textColor: "#1e2a32",
          radius: 14, motion: mot("fly-up", 0.05, 0.4)
        }),
        msg({
          x: 7, y: 48, w: 86, h: 16,
          text: "2. Verify — known channel, not the email",
          textStyle: "caption", fill: "#f2ebe1", stroke: "#d6c7b5", textColor: "#1e2a32",
          radius: 14, motion: mot("fly-up", 0.25, 0.4)
        }),
        msg({
          x: 7, y: 68, w: 86, h: 16,
          text: "3. Report — earn 10 fake XP",
          textStyle: "caption", fill: "#243640", stroke: "#3d5a4c", textColor: "#f2ebe1",
          shadowOn: false, radius: 14, motion: mot("fly-up", 0.45, 0.4)
        })
      ]
    },
    {
      type: "content", layout: "section", name: "Lunch",
      heading: "Lunch ≠ phish",
      subhead: "Legal made us say it. Culinary risk is fine.",
      bullets: [],
      transition: tx("push-up", 0.35),
      shapes: [
        msg({
          x: 7, y: 30, w: 86, h: 36,
          text: "Allowed: “Lunch is here” from a human you know.\n\nNot allowed: free pizza for your password.",
          textStyle: "body", fill: "#f2ebe1", stroke: "#d6c7b5", textColor: "#1e2a32",
          radius: 16, motion: mot("fly-up", 0.1, 0.4)
        }),
        msg({
          x: 7, y: 72, w: 86, h: 14,
          text: "When in doubt: eat first, report second.",
          textStyle: "caption", fill: "#2a3a44", stroke: "#c4a882", textColor: "#f2ebe1",
          shadowOn: false, radius: 12,
          motion: mot("fly-up", 0.45, 0.4, { attention: "glow", attentionDelay: 1.05 })
        })
      ]
    },
    {
      type: "content", layout: "bullets", name: "Checklist",
      heading: "Checklist (theater)",
      subhead: "Not a real badge. Still mandatory-feeling.",
      bullets: [
        "Hovered the sketchy link — shipped",
        "Spotted secvrity typo — pride WIP",
        "Reported fake IT — habit blocked",
        "Ate lunch credential-free — KPI"
      ],
      transition: tx("push-up", 0.35),
      shapes: [
        highlight({
          x: 8, y: 78, w: 70, h: 8, fill: "#8a9a7b", opacity: 0.35,
          motion: mot("fade", 0.35, 0.4, { attention: "glow", attentionDelay: 0.9 })
        })
      ]
    },
    {
      type: "content", layout: "statement", name: "Close",
      heading: "Awareness performed. Lunch preserved.",
      subhead: "Compliance Ranger · phone sample · toddboswell.com",
      bullets: [],
      transition: tx("fade", 0.4),
      shapes: [
        typeText({
          x: 10, y: 48, w: 80, h: 8, text: "Certificate: awareness performed.",
          textColor: "#c4a882", textStyle: "caption",
          motion: mot("fade", 0.2, 0.4)
        }),
        markFrame({
          x: 34, y: 58, w: 32, h: 18, radius: 16,
          glowOn: true, glowColor: "#c4a882", glowBlur: 14, glowOpacity: 0.4,
          motion: mot("pop", 0.4, 0.45, { attention: "pulse", attentionDelay: 1.0 })
        })
      ]
    }
  ];
}

export const PHISH_SAMPLES = [
  {
    id: "phish-desktop",
    group: "sample",
    name: "Don’t Click the Phish (Unless It’s Lunch)",
    title: "Compliance Training: Don’t Click the Phish",
    blurb: "Widescreen satire — fake phishing theater with focus rings & callouts",
    brand: Object.assign({}, PHISH_BRAND),
    artboard: { id: "16:9", w: 1920, h: 1080 },
    steps: phishDesktopSteps(),
    cta: Object.assign({}, PHISH_CTA),
    logo: PHISH_MARK,
    assets: [{ id: "phish-mark", name: "Compliance mark", image: PHISH_MARK }]
  },
  {
    id: "phish-phone",
    group: "sample",
    name: "Don’t Click the Phish (phone)",
    title: "Don’t Click the Phish — Phone",
    blurb: "Portrait 9:16 — same compliance theater, thumb-sized skepticism",
    brand: Object.assign({}, PHISH_BRAND),
    artboard: { id: "9:16", w: 1080, h: 1920 },
    steps: phishPhoneSteps(),
    cta: Object.assign({}, PHISH_CTA),
    logo: PHISH_MARK,
    assets: [{ id: "phish-mark", name: "Compliance mark", image: PHISH_MARK }]
  }
];
