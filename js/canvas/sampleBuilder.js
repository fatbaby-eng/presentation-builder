/**
 * Flagship satire sample: a deck about Presentation Builder itself.
 * Dry tongue-in-cheek — polish theater, page-size debates, export anxiety.
 */

import {
  mot, tx, box, msg, highlight, ellipse, frame, arrow, focus, typeText, phoneDot
} from "./sampleHelpers.js";

/** Simple “slides” mark — used as image-holder content. */
export const PB_MARK =
  "data:image/svg+xml," + encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 128 128">' +
    '<rect width="128" height="128" rx="28" fill="#2a3344"/>' +
    '<rect x="22" y="30" width="84" height="52" rx="8" fill="#c4a574" opacity=".95"/>' +
    '<rect x="30" y="38" width="40" height="6" rx="3" fill="#1a2332"/>' +
    '<rect x="30" y="50" width="56" height="4" rx="2" fill="#1a2332" opacity=".55"/>' +
    '<rect x="30" y="60" width="48" height="4" rx="2" fill="#1a2332" opacity=".4"/>' +
    '<circle cx="96" cy="96" r="14" fill="#5b8f9a"/>' +
    '</svg>'
  );

export const BUILDER_BRAND = {
  primary: "#c4a574",
  secondary: "#5b8f9a",
  accent: "#d4b896",
  bg: "#1a2332",
  text: "#f4efe6",
  success: "#5b8f6b",
  warning: "#d4a017",
  danger: "#c45c4a",
  bg2: "#2a3344",
  bgMode: "gradient",
  bgAngle: 152,
  fontHeading: "georgia",
  fontBody: "system"
};

export const BUILDER_CTA = {
  enabled: true,
  text: "Visit toddboswell.com",
  url: "https://toddboswell.com"
};

function markFrame(opts) {
  return frame(Object.assign({
    image: PB_MARK, imageFit: "cover", radius: 18,
    stroke: "#5b8f9a", strokeWidth: 2, fill: "#2a3344"
  }, opts));
}

export function builderDesktopSteps() {
  return [
    {
      type: "content", layout: "title", name: "Cover",
      heading: "Onboarding: You Already Know How to Click",
      subhead: "A deck about decks · required viewing for people who open tools",
      bullets: [],
      notes: "Flagship sample — satire of needing a demo for the demo tool.",
      transition: tx("fade", 0.4),
      shapes: [
        ellipse({ x: 8, y: 18, w: 2.2, h: 4, fill: "#c4a574", motion: mot("pop", 0.05, 0.35) }),
        ellipse({ x: 13, y: 26, w: 1.5, h: 2.7, fill: "#5b8f9a", opacity: 0.9, motion: mot("pop", 0.18, 0.35) }),
        markFrame({
          x: 74, y: 14, w: 16, h: 28,
          glowOn: true, glowColor: "#5b8f9a", glowBlur: 18, glowOpacity: 0.4,
          motion: mot("pop", 0.12, 0.45, { attention: "heartbeat", attentionDelay: 0.75 })
        }),
        typeText({
          x: 6, y: 56, w: 58, h: 8, text: "Yes — this is a presentation about presentations.",
          textColor: "#d4b896", textStyle: "h2",
          motion: mot("fly-up", 0.4, 0.45)
        }),
        msg({
          x: 6, y: 68, w: 54, h: 18,
          text: "Stakeholder Alignment Theater, Act I\nSomeone asked for a tool demo. We opened the tool.",
          textStyle: "caption", fill: "#2a3344", stroke: "#3d4a5c", textColor: "#f4efe6",
          shadowOn: false, radius: 12, motion: mot("fade", 0.55, 0.45)
        }),
        arrow({
          x: 58, y: 26, w: 14, h: 10, stroke: "#d4b896", fill: "#d4b896", arrowStyle: "curved",
          strokeWidth: 3, flipY: true,
          motion: mot("fade", 0.7, 0.4, { attention: "pulse", attentionDelay: 1.25 })
        })
      ]
    },
    {
      type: "content", layout: "section", name: "Why",
      heading: "Why we’re here (allegedly)",
      subhead: "Not because clicking is hard. Because demos are a love language.",
      bullets: [],
      transition: tx("push-left", 0.35),
      shapes: [
        box({
          x: 6, y: 34, w: 42, h: 52, fill: "#243040", stroke: "#3d4a5c", strokeWidth: 1, radius: 14,
          shadowOn: true, shadowY: 8, shadowBlur: 18, shadowOpacity: 0.28,
          motion: mot("fly-up", 0.08, 0.4)
        }),
        msg({
          x: 9, y: 38, w: 36, h: 42, fill: "#243040", stroke: "#243040", strokeWidth: 0, shadowOn: false,
          text: "The brief\n\n“Can you show how it works?”\n\nTranslation:\nPlease build a deck that proves decks can be built.",
          textColor: "#f4efe6", textStyle: "body", motion: mot("fade", 0.25, 0.4)
        }),
        msg({
          x: 52, y: 34, w: 42, h: 24,
          text: "Deliverable: vibes\nFormat: meta\nDeadline: before the next polish pass",
          textStyle: "caption", fill: "#f4efe6", stroke: "#d6c7b5", textColor: "#1a2332",
          radius: 12, motion: mot("fly-right", 0.35, 0.4)
        }),
        arrow({
          x: 44, y: 58, w: 14, h: 12, stroke: "#5b8f9a", fill: "#5b8f9a", arrowStyle: "dashed",
          strokeWidth: 2,
          motion: mot("fade", 0.55, 0.35)
        }),
        msg({
          x: 56, y: 64, w: 36, h: 20,
          text: "Status: “just one more animation”\n(this is pass 47)",
          textStyle: "caption", fill: "#2a3344", stroke: "#c4a574", strokeWidth: 1, textColor: "#f4efe6",
          shadowOn: false, radius: 12,
          motion: mot("pop", 0.7, 0.4, { attention: "glow", attentionDelay: 1.2 })
        })
      ]
    },
    {
      type: "content", layout: "section", name: "Polish",
      heading: "Infinite polish (a lifestyle)",
      subhead: "If it still looks unfinished, add motion. If it looks finished, add doubt.",
      bullets: [],
      transition: tx("zoom", 0.35),
      shapes: [
        msg({
          x: 6, y: 32, w: 28, h: 50,
          text: "Pass 1\n“Ship it.”\n\nPass 2\n“Wait — stagger.”",
          textStyle: "caption", fill: "#243040", stroke: "#3d4a5c", textColor: "#f4efe6",
          shadowOn: false, radius: 12, motion: mot("fly-up", 0.05, 0.4)
        }),
        msg({
          x: 36, y: 32, w: 28, h: 50,
          text: "Pass 12\n“Focus rings\nfeel official.”\n\nPass 19\n“Arrow styles\nare personality.”",
          textStyle: "caption", fill: "#f4efe6", stroke: "#d6c7b5", textColor: "#1a2332",
          radius: 12, motion: mot("fly-up", 0.22, 0.4)
        }),
        msg({
          x: 66, y: 32, w: 28, h: 50,
          text: "Pass ∞\n“One more\nattention delay\nafter appear.”\n\nHR: “deck-worthy”",
          textStyle: "caption", fill: "#2a3344", stroke: "#c45c4a", textColor: "#f4efe6",
          shadowOn: false, radius: 12, motion: mot("fly-up", 0.4, 0.4)
        }),
        highlight({
          x: 68, y: 58, w: 24, h: 8, fill: "#c4a574", opacity: 0.3,
          motion: mot("fade", 0.6, 0.35)
        }),
        typeText({
          x: 6, y: 88, w: 70, h: 8, text: "We call this “intentional timing.” Leadership calls it “Tuesday.”",
          textColor: "#d4b896", textStyle: "caption",
          motion: mot("fade", 0.75, 0.4)
        })
      ]
    },
    {
      type: "content", layout: "section", name: "Page size",
      heading: "Page size debates (bloodsport)",
      subhead: "16:9 vs 9:16 — same content, different existential crisis.",
      bullets: [],
      transition: tx("wipe-left", 0.35),
      shapes: [
        box({
          x: 8, y: 36, w: 36, h: 40, fill: "#243040", stroke: "#5b8f9a", strokeWidth: 2, radius: 10,
          motion: mot("fly-up", 0.08, 0.4)
        }),
        typeText({
          x: 12, y: 48, w: 28, h: 10, text: "16:9",
          textColor: "#c4a574", textStyle: "h2",
          motion: mot("fade", 0.25, 0.35)
        }),
        msg({
          x: 12, y: 60, w: 28, h: 10,
          text: "“For the room.”",
          textStyle: "caption", fill: "#243040", stroke: "#243040", strokeWidth: 0, shadowOn: false,
          textColor: "#f4efe6", motion: mot("fade", 0.35, 0.35)
        }),
        box({
          x: 56, y: 32, w: 22, h: 48, fill: "#2a3344", stroke: "#c4a574", strokeWidth: 2, radius: 14,
          motion: mot("fly-right", 0.2, 0.4)
        }),
        typeText({
          x: 58, y: 48, w: 18, h: 10, text: "9:16",
          textColor: "#d4b896", textStyle: "h2",
          motion: mot("fade", 0.4, 0.35)
        }),
        msg({
          x: 58, y: 60, w: 18, h: 12,
          text: "“For the thumb.”",
          textStyle: "caption", fill: "#2a3344", stroke: "#2a3344", strokeWidth: 0, shadowOn: false,
          textColor: "#f4efe6", motion: mot("fade", 0.5, 0.35)
        }),
        arrow({
          x: 42, y: 50, w: 14, h: 10, stroke: "#d4b896", fill: "#d4b896", arrowStyle: "double",
          strokeWidth: 2,
          motion: mot("fade", 0.65, 0.35, { attention: "pulse", attentionDelay: 1.15 })
        }),
        focus({
          x: 62, y: 42, w: 12, h: 16,
          motion: mot("fade", 0.85, 0.35, { attention: "focus-rings", attentionDelay: 1.35 })
        }),
        msg({
          x: 80, y: 40, w: 16, h: 28,
          text: "Pick one.\nThen both.\nThen argue.",
          textStyle: "caption", fill: "#f4efe6", stroke: "#d6c7b5", textColor: "#1a2332",
          radius: 12, motion: mot("pop", 1.0, 0.4)
        })
      ]
    },
    {
      type: "content", layout: "section", name: "Brand",
      heading: "Brand kit = personality",
      subhead: "Colours aren’t hex codes. They’re “how serious we pretend to be.”",
      bullets: [],
      transition: tx("push-left", 0.35),
      shapes: [
        ellipse({ x: 10, y: 40, w: 8, h: 14.2, fill: "#c4a574",
          motion: mot("pop", 0.08, 0.4, { attention: "pulse", attentionDelay: 0.9 }) }),
        ellipse({ x: 24, y: 42, w: 8, h: 14.2, fill: "#5b8f9a",
          motion: mot("pop", 0.22, 0.4) }),
        ellipse({ x: 38, y: 44, w: 8, h: 14.2, fill: "#d4b896",
          motion: mot("pop", 0.36, 0.4) }),
        ellipse({ x: 52, y: 42, w: 8, h: 14.2, fill: "#c45c4a",
          motion: mot("pop", 0.5, 0.4) }),
        msg({
          x: 64, y: 36, w: 30, h: 44,
          text: "Georgia headings:\n“We read books.”\n\nSystem body:\n“We ship.”\n\nWarm neutrals:\n“Not purple-AI.”",
          textStyle: "caption", fill: "#243040", stroke: "#3d4a5c", textColor: "#f4efe6",
          shadowOn: false, radius: 14, motion: mot("fly-right", 0.4, 0.4)
        }),
        arrow({
          x: 48, y: 68, w: 16, h: 10, stroke: "#5b8f9a", fill: "#5b8f9a", arrowStyle: "block",
          strokeWidth: 2, flipY: true,
          motion: mot("fade", 0.7, 0.35)
        }),
        typeText({
          x: 8, y: 78, w: 50, h: 8, text: "Import once. Argue forever.",
          textColor: "#d4b896", textStyle: "caption",
          motion: mot("fade", 0.85, 0.4)
        })
      ]
    },
    {
      type: "content", layout: "section", name: "Export",
      heading: "Export anxiety (final boss)",
      subhead: "One offline HTML file. Zero excuses. Maximum staring at the button.",
      bullets: [],
      transition: tx("fade", 0.35),
      shapes: [
        box({
          x: 10, y: 34, w: 50, h: 48, fill: "#f4efe6", stroke: "#d6c7b5", strokeWidth: 1, radius: 14,
          shadowOn: true, shadowY: 8, shadowBlur: 18, shadowOpacity: 0.25,
          motion: mot("zoom", 0.08, 0.45)
        }),
        msg({
          x: 14, y: 38, w: 42, h: 28, fill: "#f4efe6", stroke: "#f4efe6", strokeWidth: 0, shadowOn: false,
          text: "Export menu\n\n↓ Download offline HTML\n↓ Speaker notes\n↓ Print / PDF…\n\n(The cursor hovers. Time stops.)",
          textColor: "#1a2332", textStyle: "body", motion: mot("fade", 0.25, 0.4)
        }),
        focus({
          x: 18, y: 52, w: 28, h: 10,
          motion: mot("fade", 0.55, 0.35, { attention: "focus-rings", attentionDelay: 1.1 })
        }),
        arrow({
          x: 58, y: 48, w: 14, h: 12, stroke: "#c45c4a", fill: "#c45c4a", arrowStyle: "thick",
          strokeWidth: 3,
          motion: mot("fly-left", 0.7, 0.4, { attention: "pulse", attentionDelay: 1.25 })
        }),
        msg({
          x: 70, y: 40, w: 24, h: 36,
          text: "Fear:\n“What if it\nlooks like\nwork?”\n\nReality:\nit is work.",
          textStyle: "caption", fill: "#2a3344", stroke: "#c4a574", textColor: "#f4efe6",
          shadowOn: false, radius: 12, motion: mot("pop", 0.85, 0.4)
        })
      ]
    },
    {
      type: "content", layout: "bullets", name: "Checklist",
      heading: "Demo checklist (theater)",
      subhead: "Sample progress — not a real onboarding score",
      bullets: [
        "Opened the builder without asking IT — shipped",
        "Added “just one more animation” — forever in progress",
        "Picked a page size, then the other one — blocked by committee",
        "Exported offline HTML — anxiety optional, file required"
      ],
      transition: tx("push-left", 0.35),
      shapes: [
        markFrame({
          x: 82, y: 12, w: 10, h: 18,
          motion: mot("bounce", 0.1, 0.45)
        }),
        arrow({
          x: 68, y: 20, w: 12, h: 10, stroke: "#d4b896", fill: "#d4b896", arrowStyle: "curved",
          strokeWidth: 3,
          motion: mot("fade", 0.35, 0.35, { attention: "pulse", attentionDelay: 0.85 })
        }),
        highlight({
          x: 6, y: 76, w: 48, h: 8, fill: "#5b8f9a", opacity: 0.35,
          motion: mot("fade", 0.45, 0.4, { attention: "glow", attentionDelay: 1.0 })
        })
      ]
    },
    {
      type: "content", layout: "statement", name: "Close",
      heading: "You already knew how to click. Now you have slides about it.",
      subhead: "— Presentation Builder · sample · toddboswell.com",
      bullets: [],
      transition: tx("fade", 0.45),
      shapes: [
        msg({
          x: 26, y: 48, w: 48, h: 12,
          text: "Certificate of completion: still meta.",
          textStyle: "caption", fill: "#2a3344", stroke: "#3d4a5c", textColor: "#f4efe6",
          shadowOn: false, radius: 10, motion: mot("fly-up", 0.2, 0.4)
        }),
        markFrame({
          x: 42, y: 62, w: 14, h: 24,
          glowOn: true, glowColor: "#c4a574", glowBlur: 16, glowOpacity: 0.4,
          motion: mot("pop", 0.4, 0.45, { attention: "pulse", attentionDelay: 1.0 })
        })
      ]
    }
  ];
}

export function builderPhoneSteps() {
  return [
    {
      type: "content", layout: "title", name: "Cover",
      heading: "You Already Know How to Click",
      subhead: "Phone edition of a deck about decks.",
      bullets: [],
      notes: "Portrait 9:16 Presentation Builder satire sample.",
      transition: tx("fade", 0.4),
      shapes: [
        phoneDot({ x: 12, y: 18, h: 3.2, fill: "#c4a574", motion: mot("pop", 0.05, 0.35) }),
        phoneDot({ x: 22, y: 22, h: 2.2, fill: "#5b8f9a", opacity: 0.9, motion: mot("pop", 0.15, 0.35) }),
        markFrame({
          x: 34, y: 28, w: 32, h: 18, radius: 16,
          glowOn: true, glowColor: "#5b8f9a", glowBlur: 14, glowOpacity: 0.4,
          motion: mot("pop", 0.15, 0.45, { attention: "heartbeat", attentionDelay: 0.75 })
        }),
        msg({
          x: 8, y: 68, w: 84, h: 18,
          text: "Stakeholder Alignment Theater\nYes, we verticalized the meta joke.",
          textStyle: "caption", fill: "#2a3344", stroke: "#3d4a5c", textColor: "#f4efe6",
          shadowOn: false, radius: 14, motion: mot("fly-up", 0.45, 0.4)
        })
      ]
    },
    {
      type: "content", layout: "section", name: "Why",
      heading: "Why we’re here",
      subhead: "Someone asked for a demo. We made a presentation.",
      bullets: [],
      transition: tx("push-up", 0.35),
      shapes: [
        msg({
          x: 7, y: 30, w: 86, h: 28,
          text: "Brief: “Show how it works.”\nTranslation: prove decks can be decks.",
          textStyle: "body", fill: "#243040", stroke: "#3d4a5c", textColor: "#f4efe6",
          shadowOn: false, radius: 16, motion: mot("fly-up", 0.08, 0.4)
        }),
        msg({
          x: 7, y: 64, w: 86, h: 20,
          text: "Status: “just one more animation”\n(Pass 47. Still counting.)",
          textStyle: "caption", fill: "#2a3344", stroke: "#c4a574", textColor: "#f4efe6",
          shadowOn: false, radius: 14,
          motion: mot("fly-up", 0.45, 0.4, { attention: "glow", attentionDelay: 1.1 })
        })
      ]
    },
    {
      type: "content", layout: "section", name: "Polish",
      heading: "Infinite polish",
      subhead: "Stagger → callout → attention. Repeat until tasteful or tired.",
      bullets: [],
      transition: tx("zoom", 0.35),
      shapes: [
        msg({
          x: 7, y: 28, w: 86, h: 16,
          text: "Pass 1: “Ship it.”  →  Pass 12: focus rings.",
          textStyle: "caption", fill: "#f4efe6", stroke: "#d6c7b5", textColor: "#1a2332",
          radius: 14, motion: mot("fly-up", 0.08, 0.4)
        }),
        msg({
          x: 7, y: 50, w: 86, h: 16,
          text: "Pass 19: arrow styles are personality.",
          textStyle: "caption", fill: "#f4efe6", stroke: "#d6c7b5", textColor: "#1a2332",
          radius: 14, motion: mot("fly-up", 0.28, 0.4)
        }),
        msg({
          x: 7, y: 72, w: 86, h: 14,
          text: "Pass ∞: one more attentionDelay.",
          textStyle: "h2", fill: "#243040", stroke: "#c45c4a", textColor: "#f4efe6",
          shadowOn: false, radius: 14, motion: mot("fly-up", 0.48, 0.4)
        })
      ]
    },
    {
      type: "content", layout: "section", name: "Page size",
      heading: "16:9 vs 9:16",
      subhead: "Pick one. Then both. Then argue in Slack.",
      bullets: [],
      transition: tx("push-up", 0.35),
      shapes: [
        msg({
          x: 7, y: 28, w: 86, h: 18,
          text: "16:9 — “for the room”\n9:16 — “for the thumb”",
          textStyle: "body", fill: "#243040", stroke: "#3d4a5c", textColor: "#f4efe6",
          shadowOn: false, radius: 14, motion: mot("fade", 0.08, 0.4)
        }),
        focus({
          x: 36, y: 52, w: 28, h: 12,
          motion: mot("fade", 0.4, 0.35, { attention: "focus-rings", attentionDelay: 1.0 })
        }),
        arrow({
          x: 28, y: 62, w: 40, h: 10, stroke: "#d4b896", fill: "#d4b896", arrowStyle: "double",
          strokeWidth: 2,
          motion: mot("fade", 0.55, 0.35, { attention: "pulse", attentionDelay: 1.2 })
        }),
        msg({
          x: 7, y: 76, w: 86, h: 12,
          text: "Same joke. Different aspect ratio.",
          textStyle: "caption", fill: "#f4efe6", stroke: "#d6c7b5", textColor: "#1a2332",
          radius: 12, motion: mot("fly-up", 0.7, 0.4)
        })
      ]
    },
    {
      type: "content", layout: "section", name: "Export",
      heading: "Export anxiety",
      subhead: "Hover the button. Question your life. Download anyway.",
      bullets: [],
      transition: tx("fade", 0.35),
      shapes: [
        msg({
          x: 7, y: 30, w: 86, h: 28,
          text: "↓ Offline HTML\n↓ Notes\n↓ Print / PDF…",
          textStyle: "body", fill: "#f4efe6", stroke: "#d6c7b5", textColor: "#1a2332",
          radius: 16, motion: mot("zoom", 0.08, 0.45)
        }),
        focus({
          x: 20, y: 36, w: 60, h: 10,
          motion: mot("fade", 0.45, 0.35, { attention: "focus-rings", attentionDelay: 1.05 })
        }),
        msg({
          x: 7, y: 66, w: 86, h: 18,
          text: "Fear: it looks like work.\nReality: it is work.",
          textStyle: "caption", fill: "#2a3344", stroke: "#c4a574", textColor: "#f4efe6",
          shadowOn: false, radius: 14, motion: mot("fly-up", 0.65, 0.4)
        })
      ]
    },
    {
      type: "content", layout: "bullets", name: "Checklist",
      heading: "Checklist (theater)",
      subhead: "Not a real certification. Still a sample.",
      bullets: [
        "Opened the builder — shipped",
        "One more animation — eternal WIP",
        "Page size debate — committee blocked",
        "Exported HTML — anxiety optional"
      ],
      transition: tx("push-up", 0.35),
      shapes: [
        highlight({
          x: 8, y: 78, w: 70, h: 8, fill: "#5b8f9a", opacity: 0.35,
          motion: mot("fade", 0.35, 0.4, { attention: "glow", attentionDelay: 0.9 })
        })
      ]
    },
    {
      type: "content", layout: "statement", name: "Close",
      heading: "You already knew how to click.",
      subhead: "Presentation Builder · phone sample · still meta",
      bullets: [],
      transition: tx("fade", 0.4),
      shapes: [
        typeText({
          x: 10, y: 48, w: 80, h: 8, text: "Certificate: still meta.",
          textColor: "#d4b896", textStyle: "caption",
          motion: mot("fade", 0.2, 0.4)
        }),
        markFrame({
          x: 34, y: 58, w: 32, h: 18, radius: 16,
          glowOn: true, glowColor: "#c4a574", glowBlur: 14, glowOpacity: 0.4,
          motion: mot("pop", 0.4, 0.45, { attention: "pulse", attentionDelay: 1.0 })
        })
      ]
    }
  ];
}

export const BUILDER_SAMPLES = [
  {
    id: "builder-desktop",
    group: "sample",
    name: "Onboarding: You Already Know How to Click",
    title: "Onboarding: You Already Know How to Click",
    blurb: "Widescreen satire — polish theater, page sizes, brand kits & export anxiety",
    brand: Object.assign({}, BUILDER_BRAND),
    artboard: { id: "16:9", w: 1920, h: 1080 },
    steps: builderDesktopSteps(),
    cta: Object.assign({}, BUILDER_CTA),
    logo: PB_MARK,
    assets: [{ id: "pb-mark", name: "Presentation Builder mark", image: PB_MARK }]
  },
  {
    id: "builder-phone",
    group: "sample",
    name: "You Already Know How to Click (phone)",
    title: "You Already Know How to Click — Phone",
    blurb: "Portrait 9:16 — same meta demo, stacked for thumbs",
    brand: Object.assign({}, BUILDER_BRAND),
    artboard: { id: "9:16", w: 1080, h: 1920 },
    steps: builderPhoneSteps(),
    cta: Object.assign({}, BUILDER_CTA),
    logo: PB_MARK,
    assets: [{ id: "pb-mark", name: "Presentation Builder mark", image: PB_MARK }]
  }
];
