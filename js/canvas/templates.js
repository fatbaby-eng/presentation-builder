/**
 * Starter templates + custom template save/load (local only).
 * Plain language: "Start from a template", "Save as template".
 *
 * Samples (group: "sample") are full demo decks with sample data.
 * Starters (group: "starter") are blank-ish outlines to fill in.
 */

import { CANINE_UX_LEAD } from "./sampleDog.js";

function mot(appear, delay, duration, extra) {
  return Object.assign({
    appear: appear || "none",
    appearDelay: delay == null ? 0 : delay,
    appearDuration: duration == null ? 0.5 : duration,
    attention: "none",
    attentionDelay: 0.6,
    disappear: "none",
    disappearDelay: 2.5,
    disappearDuration: 0.45,
    easing: "ease-out",
    move: "none",
    moveDelay: 0,
    moveDuration: 0.8,
    moveFromX: 10,
    moveFromY: 40,
    moveToX: 40,
    moveToY: 40
  }, extra || {});
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

function frame(opts) {
  return Object.assign({
    type: "frame", x: 0, y: 0, w: 18, h: 32, rot: 0, flipX: false, flipY: false,
    fill: "#1a2418", stroke: "#3d4f3a", strokeWidth: 0, opacity: 1, radius: 999,
    text: "", textColor: "#1b1f2a", parentId: null,
    image: null, imageFit: "cover", layout: "none", padding: 0,
    fillMode: "solid", shadowOn: true, shadowY: 6, shadowBlur: 16, shadowOpacity: 0.35,
    glowOn: false
  }, opts);
}

function arrow(opts) {
  return Object.assign({
    type: "arrow", x: 0, y: 0, w: 16, h: 12, rot: 0, flipX: false, flipY: false,
    fill: "#c9a66b", stroke: "#c9a66b", strokeWidth: 3, opacity: 1, radius: 0,
    text: "", textColor: "#1b1f2a", parentId: null, arrowStyle: "solid",
    fillMode: "solid", shadowOn: false, glowOn: false
  }, opts);
}

function focus(opts) {
  const base = {
    type: "focus", x: 0, y: 0, w: 8, h: 14, rot: 0, flipX: false, flipY: false,
    fill: "#e23d4b", stroke: "#e23d4b", strokeWidth: 3, opacity: 0.08, radius: 0,
    text: "", textColor: "#1b1f2a", parentId: null,
    fillMode: "solid", shadowOn: false, glowOn: false,
    motion: mot("fade", 0.15, 0.35, { attention: "focus-rings", attentionDelay: 0.25 })
  };
  return Object.assign(base, opts || {});
}

function typeText(opts) {
  return Object.assign({
    type: "text", x: 0, y: 0, w: 28, h: 10, rot: 0, flipX: false, flipY: false,
    fill: "#ffffff", stroke: "#ffffff", strokeWidth: 0, opacity: 0, radius: 0,
    text: "", textColor: "#f0ebe3", parentId: null, textStyle: "h2",
    textArcOn: false, textArc: 35, textOpacity: 1,
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

/** Brand kit matched to the pixel-art dog icon (dark green, warm brown, teal). */
const DOG_BRAND = {
  primary: "#a06b3c",
  secondary: "#5aa8a0",
  accent: "#c9a66b",
  bg: "#1a2418",
  text: "#f0ebe3",
  success: "#5b8f6b",
  warning: "#d4a017",
  danger: "#c45c4a",
  bg2: "#2a3828",
  bgMode: "gradient",
  bgAngle: 148,
  fontHeading: "georgia",
  fontBody: "system"
};

const DOG_CTA = {
  enabled: true,
  text: "Visit toddboswell.com",
  url: "https://toddboswell.com"
};

/**
 * Widescreen showcase — dry humor, motion-forward onboarding mock.
 * Packs image holders, arrow styles, focus rings, attention, move, type, etc.
 */
function dogSlackSteps() {
  return [
    {
      type: "content", layout: "title", name: "Cover",
      heading: "Teach the Dog to Use Slack",
      subhead: "Required training for a problem a raised eyebrow could’ve solved · 750 XP",
      bullets: [],
      notes: "Showcase sample — poke fun at corporate training theater while flexing builder features.",
      transition: tx("fade", 0.4),
      shapes: [
        // Beat: dots → avatar → punchline → caption → arrow → pulse
        ellipse({ x: 8, y: 20, w: 2, h: 3.6, fill: "#a06b3c", motion: mot("pop", 0.05, 0.35) }),
        ellipse({ x: 12, y: 28, w: 1.4, h: 2.5, fill: "#5aa8a0", opacity: 0.9, motion: mot("pop", 0.18, 0.35) }),
        frame({
          x: 74, y: 16, w: 16, h: 28.5, image: CANINE_UX_LEAD, imageFit: "cover",
          stroke: "#5aa8a0", strokeWidth: 2, radius: 999,
          glowOn: true, glowColor: "#5aa8a0", glowBlur: 18, glowOpacity: 0.45,
          motion: mot("pop", 0.12, 0.45, { attention: "heartbeat", attentionDelay: 0.75 })
        }),
        typeText({
          x: 6, y: 58, w: 52, h: 8, text: "Yes, we built a deck for this.",
          textColor: "#c9a66b", textStyle: "h2",
          motion: mot("fly-up", 0.4, 0.45)
        }),
        msg({
          x: 6, y: 70, w: 52, h: 16,
          text: "Personal lane · sample quest\n“Sit” lacked stakeholder alignment.",
          textStyle: "caption", fill: "#2a3828", stroke: "#3d4f3a", textColor: "#f0ebe3",
          shadowOn: false, radius: 12, motion: mot("fade", 0.55, 0.45)
        }),
        arrow({
          x: 58, y: 28, w: 14, h: 10, stroke: "#c9a66b", fill: "#c9a66b", arrowStyle: "curved",
          strokeWidth: 3, flipY: true,
          motion: mot("fade", 0.7, 0.4, { attention: "pulse", attentionDelay: 1.25 })
        })
      ]
    },
    {
      type: "content", layout: "section", name: "The quest",
      heading: "Active Quest (XP makes it official)",
      subhead: "Wrong emoji reactions. We turned it into a roadmap item.",
      bullets: [],
      transition: tx("push-left", 0.35),
      shapes: [
        frame({
          x: 80, y: 12, w: 12, h: 21.5, image: CANINE_UX_LEAD, imageFit: "cover",
          stroke: "#a06b3c", strokeWidth: 2, radius: 999,
          motion: mot("fly-right", 0.05, 0.4)
        }),
        box({
          x: 6, y: 42, w: 88, h: 46, fill: "#243028", stroke: "#3d4f3a", strokeWidth: 1, radius: 14,
          shadowOn: true, shadowY: 8, shadowBlur: 18, shadowOpacity: 0.28,
          motion: mot("fly-up", 0.15, 0.45)
        }),
        msg({
          x: 10, y: 46, w: 58, h: 36, fill: "#243028", stroke: "#243028", strokeWidth: 0, shadowOn: false,
          text: "STATUS · active · 750 XP\n\nQuest: Teach Slack to a dog\nLane: Personal (where shame lives)\nNext: Negotiate a 🔥 ceasefire\n#dog #slack #emoji #hr #why",
          textColor: "#f0ebe3", textStyle: "body", motion: mot("fade", 0.35, 0.4)
        }),
        arrow({
          x: 62, y: 64, w: 12, h: 14, stroke: "#5aa8a0", fill: "#5aa8a0", arrowStyle: "dashed",
          strokeWidth: 2, flipX: true,
          motion: mot("fade", 0.55, 0.35)
        }),
        msg({
          x: 70, y: 48, w: 20, h: 14, fill: "#2a3828", stroke: "#c45c4a", strokeWidth: 1, shadowOn: false,
          text: "HR severity\n“deck-worthy”",
          textColor: "#f0ebe3", textStyle: "caption", radius: 10,
          motion: mot("pop", 0.7, 0.4, { attention: "glow", attentionDelay: 1.25 })
        })
      ]
    },
    {
      type: "content", layout: "section", name: "The incident",
      heading: "Incident: the 🔥 HR crisis",
      subhead: "He can open Slack. Impulse control filed a PTO request.",
      bullets: [],
      notes: "Dry joke: fire-emoji spam as a workplace incident.",
      transition: tx("zoom", 0.35),
      shapes: [
        box({
          x: 6, y: 32, w: 52, h: 56, fill: "#f4efe6", stroke: "#d6c7b5", strokeWidth: 1, radius: 14,
          shadowOn: true, shadowY: 8, shadowBlur: 18, shadowOpacity: 0.25,
          motion: mot("zoom", 0.05, 0.45)
        }),
        msg({
          x: 9, y: 36, w: 46, h: 46, fill: "#f4efe6", stroke: "#f4efe6", strokeWidth: 0, shadowOn: false,
          text: "Summary\n\nOpens app: yes.\nReads thread: speculative.\nReacts 🔥 to everything: policy violation.\n\nHR wants a meeting.\nAlso a spreadsheet.\nPossibly a waiver.",
          textColor: "#1a2418", textStyle: "body", motion: mot("fade", 0.25, 0.4)
        }),
        frame({
          x: 66, y: 34, w: 18, h: 32, image: CANINE_UX_LEAD, imageFit: "cover",
          stroke: "#5aa8a0", strokeWidth: 2, radius: 999,
          motion: mot("fly-right", 0.2, 0.45)
        }),
        highlight({
          x: 10, y: 58, w: 40, h: 8, fill: "#c45c4a", opacity: 0.28,
          motion: mot("fade", 0.45, 0.35)
        }),
        arrow({
          x: 50, y: 48, w: 14, h: 12, stroke: "#a06b3c", fill: "#a06b3c", arrowStyle: "thick",
          strokeWidth: 4,
          motion: mot("fly-left", 0.55, 0.4, { attention: "pulse", attentionDelay: 1.1 })
        }),
        msg({
          x: 64, y: 70, w: 24, h: 14, fill: "#2a3828", stroke: "#c9a66b", strokeWidth: 1, shadowOn: false,
          text: "🔥 × ∞\n“engagement”",
          textColor: "#f0ebe3", textStyle: "caption", radius: 10,
          motion: mot("pop", 0.7, 0.4, { attention: "pulse", attentionDelay: 1.25 })
        })
      ]
    },
    {
      type: "content", layout: "section", name: "Tap here",
      heading: "Module 1: Do not tap 🔥",
      subhead: "A guided tour for a lesson that needed a look, not a LMS.",
      bullets: [],
      transition: tx("wipe-left", 0.35),
      shapes: [
        // Beat: panel → thread → emojis → callout → arrow → rings → settle
        box({
          x: 8, y: 34, w: 54, h: 52, fill: "#243028", stroke: "#3d4f3a", strokeWidth: 1, radius: 14,
          shadowOn: true, shadowY: 6, shadowBlur: 14, shadowOpacity: 0.3,
          motion: mot("fly-up", 0.05, 0.4)
        }),
        msg({
          x: 11, y: 38, w: 48, h: 12, fill: "#2a3828", stroke: "#2a3828", strokeWidth: 0, shadowOn: false,
          text: "#general · “shipped the thing”",
          textColor: "#f0ebe3", textStyle: "caption", motion: mot("fade", 0.2, 0.35)
        }),
        msg({
          x: 11, y: 52, w: 30, h: 10, fill: "#1a2418", stroke: "#3d4f3a", strokeWidth: 1, shadowOn: false,
          text: "👍  🎉  🔥  👀",
          textColor: "#f0ebe3", textStyle: "h2", radius: 8, motion: mot("fade", 0.35, 0.4)
        }),
        msg({
          x: 66, y: 36, w: 26, h: 22,
          text: "Wrong tap =\nanother module.\nCongrats, I guess.",
          textStyle: "caption", fill: "#f4efe6", stroke: "#d6c7b5", textColor: "#1a2418",
          radius: 12, motion: mot("fly-right", 0.5, 0.4)
        }),
        arrow({
          x: 48, y: 54, w: 16, h: 10, stroke: "#e23d4b", fill: "#e23d4b", arrowStyle: "solid",
          strokeWidth: 3,
          motion: mot("fade", 0.7, 0.35, { attention: "pulse", attentionDelay: 1.2 })
        }),
        focus({
          x: 28, y: 50, w: 10, h: 16,
          motion: mot("fade", 0.85, 0.35, { attention: "focus-rings", attentionDelay: 1.35 })
        }),
        typeText({
          x: 66, y: 64, w: 26, h: 10, text: "Especially not this.",
          textColor: "#c45c4a", textStyle: "body",
          motion: mot("pop", 1.0, 0.35)
        }),
        ellipse({
          x: 18, y: 68, w: 3, h: 5.4, fill: "#5aa8a0",
          motion: mot("bounce", 0.3, 0.4, {
            move: "from-to", moveDelay: 0.55, moveDuration: 0.9,
            moveFromX: 72, moveFromY: 72, moveToX: 18, moveToY: 68
          })
        })
      ]
    },
    {
      type: "content", layout: "section", name: "Channel",
      heading: "Module 2: Channel before chaos",
      subhead: "Radical idea: pick a room. Someone will still DM the CEO a bone.",
      bullets: [],
      transition: tx("push-left", 0.35),
      shapes: [
        msg({
          x: 6, y: 36, w: 28, h: 48,
          text: "#general\nWhere judgment\ngoes to die\n\n→ lurk quietly",
          textStyle: "caption", fill: "#243028", stroke: "#3d4f3a", textColor: "#f0ebe3",
          shadowOn: false, radius: 12, motion: mot("fly-up", 0.05, 0.4)
        }),
        msg({
          x: 36, y: 36, w: 28, h: 48,
          text: "#random\nTechnically\nallowed\n\n→ still not 🔥",
          textStyle: "caption", fill: "#f4efe6", stroke: "#d6c7b5", textColor: "#1a2418",
          radius: 12, motion: mot("fly-up", 0.2, 0.4)
        }),
        msg({
          x: 66, y: 36, w: 28, h: 48,
          text: "#hr-concerns\nThey already\nknow\n\n→ do not enter",
          textStyle: "caption", fill: "#2a3828", stroke: "#c45c4a", textColor: "#f0ebe3",
          shadowOn: false, radius: 12, motion: mot("fly-up", 0.35, 0.4)
        }),
        arrow({
          x: 28, y: 28, w: 14, h: 10, stroke: "#c9a66b", fill: "#c9a66b", arrowStyle: "block",
          strokeWidth: 2, flipY: true,
          motion: mot("fade", 0.55, 0.35, { attention: "pulse", attentionDelay: 1.0 })
        }),
        arrow({
          x: 58, y: 78, w: 16, h: 8, stroke: "#5aa8a0", fill: "#5aa8a0", arrowStyle: "double",
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
      subhead: "AI reflection for an emoji habit. Because 2020s.",
      bullets: [],
      transition: tx("fade", 0.35),
      shapes: [
        msg({
          x: 5, y: 36, w: 29, h: 50,
          text: "Revive or archive?\n\nIs this still a quest — or did Slack win just by existing?",
          textStyle: "caption", fill: "#f4efe6", stroke: "#d6c7b5", textColor: "#1a2418",
          radius: 12, motion: mot("fly-up", 0.05, 0.4)
        }),
        msg({
          x: 35.5, y: 36, w: 29, h: 50,
          text: "What’s unfinished?\n\nEmoji manners. Channel sense. Not licking the trackpad in all-hands.",
          textStyle: "caption", fill: "#f4efe6", stroke: "#d6c7b5", textColor: "#1a2418",
          radius: 12, motion: mot("fly-up", 0.22, 0.4)
        }),
        msg({
          x: 66, y: 36, w: 29, h: 50,
          text: "Audit the gap\n\nWhere “good boy” ends and “please open an incident” begins.",
          textStyle: "caption", fill: "#243028", stroke: "#5aa8a0", textColor: "#f0ebe3",
          shadowOn: false, radius: 12, motion: mot("fly-up", 0.4, 0.4)
        }),
        typeText({
          x: 5, y: 88, w: 70, h: 8, text: "We asked a language model about dog emojis. Naturally.",
          textColor: "#c9a66b", textStyle: "caption",
          motion: mot("fade", 0.7, 0.4)
        })
      ]
    },
    {
      type: "content", layout: "bullets", name: "Checklist",
      heading: "Training checklist (theater)",
      subhead: "Sample progress — not live data, not a real badge",
      bullets: [
        "Opens Slack without chewing the laptop — shipped (barely)",
        "Picks a channel before reacting — forever “in progress”",
        "Stops 🔥 on every message — blocked by HR, personality, physics",
        "Earns Canine UX Lead · 1000 XP — the only KPI leadership cared about"
      ],
      transition: tx("push-left", 0.35),
      shapes: [
        frame({
          x: 82, y: 14, w: 10, h: 18, image: CANINE_UX_LEAD, imageFit: "cover",
          stroke: "#a06b3c", strokeWidth: 2, radius: 999,
          motion: mot("bounce", 0.1, 0.45)
        }),
        arrow({
          x: 68, y: 22, w: 12, h: 10, stroke: "#c9a66b", fill: "#c9a66b", arrowStyle: "curved",
          strokeWidth: 3,
          motion: mot("fade", 0.35, 0.35, { attention: "pulse", attentionDelay: 0.85 })
        }),
        highlight({
          x: 6, y: 76, w: 42, h: 8, fill: "#5aa8a0", opacity: 0.35,
          motion: mot("fade", 0.45, 0.4, { attention: "glow", attentionDelay: 1.0 })
        }),
        ellipse({ x: 58, y: 80, w: 2.2, h: 4, fill: "#a06b3c", motion: mot("pop", 0.65, 0.35) })
      ]
    },
    {
      type: "content", layout: "statement", name: "Close",
      heading: "Nobody needed this walkthrough. Especially not the dog.",
      subhead: "— Canine UX Lead · still wrong · still on the map · sample",
      bullets: [],
      transition: tx("fade", 0.45),
      shapes: [
        msg({
          x: 28, y: 48, w: 44, h: 10,
          text: "Certificate of completion: vibes only.",
          textStyle: "caption", fill: "#2a3828", stroke: "#3d4f3a", textColor: "#f0ebe3",
          shadowOn: false, radius: 10, motion: mot("fly-up", 0.2, 0.4)
        }),
        frame({
          x: 42, y: 60, w: 14, h: 25, image: CANINE_UX_LEAD, imageFit: "cover",
          stroke: "#c9a66b", strokeWidth: 2, radius: 999,
          glowOn: true, glowColor: "#c9a66b", glowBlur: 16, glowOpacity: 0.4,
          motion: mot("pop", 0.4, 0.45, { attention: "pulse", attentionDelay: 1.0 })
        })
      ]
    }
  ];
}

/**
 * True 9:16 phone showcase — stacked portrait layout, same dry tone.
 * Circle %-sizes use w/h ≈ 16/9 so they read round on portrait.
 */
function dogPhoneDot(opts) {
  const h = opts.h == null ? 3.2 : opts.h;
  const w = opts.w == null ? Math.round(h * (16 / 9) * 10) / 10 : opts.w;
  return ellipse(Object.assign({}, opts, { w, h }));
}

function dogAvatarPhone(opts) {
  const h = opts.h == null ? 18 : opts.h;
  // On 9:16, equal pixels ⇒ w% * 1080 = h% * 1920 ⇒ w = h * (16/9)
  const roundW = opts.w == null ? Math.round(h * (16 / 9) * 10) / 10 : opts.w;
  return frame(Object.assign({
    image: CANINE_UX_LEAD, imageFit: "cover", radius: 999,
    stroke: "#5aa8a0", strokeWidth: 2
  }, opts, { w: roundW, h }));
}

function dogSlackPhoneSteps() {
  return [
    {
      type: "content", layout: "title", name: "Cover",
      heading: "Teach the Dog to Use Slack",
      subhead: "Phone edition of training nobody requested.",
      bullets: [],
      notes: "Portrait 9:16 sample — dry humor, stacked cards, motion showcase.",
      transition: tx("fade", 0.4),
      shapes: [
        dogPhoneDot({ x: 10, y: 18, h: 3.2, fill: "#a06b3c", motion: mot("pop", 0.05, 0.35) }),
        dogPhoneDot({ x: 20, y: 22, h: 2.2, fill: "#5aa8a0", opacity: 0.9, motion: mot("pop", 0.15, 0.35) }),
        dogAvatarPhone({
          x: 32, y: 28, h: 16, stroke: "#5aa8a0",
          glowOn: true, glowColor: "#5aa8a0", glowBlur: 14, glowOpacity: 0.4,
          motion: mot("pop", 0.15, 0.45, { attention: "heartbeat", attentionDelay: 0.75 })
        }),
        msg({
          x: 8, y: 68, w: 84, h: 18,
          text: "750 XP · Canine UX Lead\nYes, we verticalized the absurdity.",
          textStyle: "caption", fill: "#2a3828", stroke: "#3d4f3a", textColor: "#f0ebe3",
          shadowOn: false, radius: 14, motion: mot("fly-up", 0.45, 0.4)
        })
      ]
    },
    {
      type: "content", layout: "section", name: "Quest",
      heading: "Active Quest",
      subhead: "Gamified because “no” felt under-documented.",
      bullets: [],
      transition: tx("push-up", 0.35),
      shapes: [
        msg({
          x: 7, y: 30, w: 86, h: 28,
          text: "STATUS · active · 750 XP\n\nTeach Slack to a dog\nNext: 🔥 ceasefire talks",
          textStyle: "body", fill: "#243028", stroke: "#3d4f3a", textColor: "#f0ebe3",
          shadowOn: false, radius: 16, motion: mot("fly-up", 0.08, 0.4)
        }),
        arrow({
          x: 70, y: 52, w: 18, h: 10, stroke: "#c9a66b", fill: "#c9a66b", arrowStyle: "dashed",
          strokeWidth: 2, flipY: true,
          motion: mot("fade", 0.4, 0.35)
        }),
        msg({
          x: 7, y: 62, w: 86, h: 20,
          text: "HR severity: “deck-worthy”\nTranslation: someone opened Keynote.",
          textStyle: "caption", fill: "#2a3828", stroke: "#c45c4a", textColor: "#f0ebe3",
          shadowOn: false, radius: 14,
          motion: mot("fly-up", 0.55, 0.4, { attention: "glow", attentionDelay: 1.1 })
        })
      ]
    },
    {
      type: "content", layout: "section", name: "Incident",
      heading: "Emoji crisis",
      subhead: "Opens app: yes. Judgment: out of office.",
      bullets: [],
      transition: tx("zoom", 0.35),
      shapes: [
        msg({
          x: 7, y: 28, w: 86, h: 36,
          text: "Reacts 🔥 to everything.\nHR wants a word.\nAlso a spreadsheet.\nPossibly a support-animal waiver.",
          textStyle: "body", fill: "#f4efe6", stroke: "#d6c7b5", textColor: "#1a2418",
          radius: 16, motion: mot("zoom", 0.08, 0.45)
        }),
        highlight({
          x: 12, y: 48, w: 76, h: 8, fill: "#c45c4a", opacity: 0.25,
          motion: mot("fade", 0.4, 0.35)
        }),
        dogAvatarPhone({
          x: 36, y: 68, h: 14, stroke: "#a06b3c",
          motion: mot("fly-up", 0.5, 0.4, { attention: "pulse", attentionDelay: 1.05 })
        })
      ]
    },
    {
      type: "content", layout: "section", name: "Tap here",
      heading: "Do not tap 🔥",
      subhead: "Focus rings for a lesson a look could’ve taught.",
      bullets: [],
      transition: tx("push-up", 0.35),
      shapes: [
        // Beat: thread → emojis → warning → arrow → rings → move settle
        msg({
          x: 7, y: 28, w: 86, h: 12,
          text: "#general · “shipped the thing”",
          textStyle: "caption", fill: "#243028", stroke: "#3d4f3a", textColor: "#f0ebe3",
          shadowOn: false, radius: 12, motion: mot("fade", 0.05, 0.35)
        }),
        msg({
          x: 18, y: 44, w: 64, h: 12,
          text: "👍   🎉   🔥   👀",
          textStyle: "h2", fill: "#1a2418", stroke: "#3d4f3a", textColor: "#f0ebe3",
          shadowOn: false, radius: 10, motion: mot("fade", 0.25, 0.4)
        }),
        msg({
          x: 7, y: 62, w: 86, h: 16,
          text: "Wrong tap → another module.\nYou’ve been warned. Softly.",
          textStyle: "caption", fill: "#f4efe6", stroke: "#d6c7b5", textColor: "#1a2418",
          radius: 14, motion: mot("fly-up", 0.45, 0.4)
        }),
        arrow({
          x: 28, y: 54, w: 20, h: 10, stroke: "#e23d4b", fill: "#e23d4b", arrowStyle: "thick",
          strokeWidth: 3,
          motion: mot("fade", 0.65, 0.35, { attention: "pulse", attentionDelay: 1.15 })
        }),
        focus({
          x: 48, y: 42, w: 18, h: 14,
          motion: mot("fade", 0.8, 0.35, { attention: "focus-rings", attentionDelay: 1.3 })
        }),
        dogPhoneDot({
          x: 12, y: 82, h: 3.4, fill: "#5aa8a0",
          motion: mot("bounce", 0.2, 0.4, {
            move: "from-to", moveDelay: 0.5, moveDuration: 0.85,
            moveFromX: 70, moveFromY: 82, moveToX: 12, moveToY: 82
          })
        })
      ]
    },
    {
      type: "content", layout: "section", name: "Ask Claude",
      heading: "Ask Claude",
      subhead: "Silicon Valley for “maybe don’t.”",
      bullets: [],
      transition: tx("fade", 0.35),
      shapes: [
        msg({
          x: 7, y: 28, w: 86, h: 18,
          text: "Revive or archive?\nHas Slack already won by existing?",
          textStyle: "caption", fill: "#f4efe6", stroke: "#d6c7b5", textColor: "#1a2418",
          radius: 14, motion: mot("fly-up", 0.05, 0.4)
        }),
        msg({
          x: 7, y: 50, w: 86, h: 18,
          text: "What’s unfinished?\nTrackpad licking. Channel manners.",
          textStyle: "caption", fill: "#f4efe6", stroke: "#d6c7b5", textColor: "#1a2418",
          radius: 14, motion: mot("fly-up", 0.25, 0.4)
        }),
        msg({
          x: 7, y: 72, w: 86, h: 16,
          text: "We asked AI about dog emojis.",
          textStyle: "h2", fill: "#243028", stroke: "#5aa8a0", textColor: "#f0ebe3",
          shadowOn: false, radius: 14, motion: mot("fly-up", 0.45, 0.4)
        })
      ]
    },
    {
      type: "content", layout: "bullets", name: "Checklist",
      heading: "Checklist (theater)",
      subhead: "Not a real certification. Relax.",
      bullets: [
        "Opens Slack — shipped (barely)",
        "Picks a channel first — eternally “in progress”",
        "Stops 🔥 spam — blocked by HR & physics",
        "1000 XP Canine UX Lead — the real goal"
      ],
      transition: tx("push-up", 0.35),
      shapes: [
        arrow({
          x: 72, y: 18, w: 18, h: 10, stroke: "#c9a66b", fill: "#c9a66b", arrowStyle: "curved",
          strokeWidth: 2, flipY: true,
          motion: mot("fade", 0.2, 0.35, { attention: "pulse", attentionDelay: 0.7 })
        }),
        highlight({
          x: 8, y: 78, w: 70, h: 8, fill: "#5aa8a0", opacity: 0.35,
          motion: mot("fade", 0.4, 0.4, { attention: "glow", attentionDelay: 0.95 })
        })
      ]
    },
    {
      type: "content", layout: "statement", name: "Close",
      heading: "You didn’t need this. Neither did he.",
      subhead: "Canine UX Lead · phone sample · vibes certificate",
      bullets: [],
      transition: tx("fade", 0.4),
      shapes: [
        typeText({
          x: 10, y: 48, w: 80, h: 8, text: "Certificate: vibes only.",
          textColor: "#c9a66b", textStyle: "caption",
          motion: mot("fade", 0.2, 0.4)
        }),
        dogAvatarPhone({
          x: 34, y: 58, h: 16, stroke: "#c9a66b",
          glowOn: true, glowColor: "#c9a66b", glowBlur: 14, glowOpacity: 0.4,
          motion: mot("pop", 0.4, 0.45, { attention: "pulse", attentionDelay: 1.0 })
        })
      ]
    }
  ];
}

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

/**
 * True 9:16 phone sample — full-bleed portrait board, stacked cards, no fake
 * landscape side-bezels. Circle %-sizes use w/h ≈ 16/9 so they read round on portrait.
 */
function phoneDot(opts) {
  const h = opts.h == null ? 3.2 : opts.h;
  const w = opts.w == null ? Math.round(h * (16 / 9) * 10) / 10 : opts.w;
  return ellipse(Object.assign({}, opts, { w, h }));
}

function atlasMobileSteps() {
  return [
    {
      type: "content", layout: "title", name: "Cover",
      heading: "Atlas",
      subhead: "Project map for a curious person.",
      bullets: [],
      notes: "Phone sample on a 9:16 board — stacked layout, larger tap targets.",
      transition: tx("fade", 0.5),
      shapes: [
        phoneDot({ x: 10, y: 18, h: 3.6, fill: "#c9783f", motion: mot("pop", 0.25, 0.45) }),
        phoneDot({ x: 18, y: 24, h: 2.4, fill: "#e0a84a", opacity: 0.9, motion: mot("pop", 0.4, 0.4) }),
        msg({
          x: 8, y: 72, w: 84, h: 14,
          text: "Tap through — sample data only",
          textStyle: "caption", fill: "#243044", stroke: "#3d4f66", textColor: "#f4efe6",
          shadowOn: false, radius: 14, motion: mot("fly-up", 0.4, 0.45)
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
      shapes: [
        phoneDot({ x: 82, y: 12, h: 2.8, fill: "#4a7c6f", motion: mot("pop", 0.2, 0.4) })
      ]
    },
    {
      type: "content", layout: "section", name: "Lanes",
      heading: "Pick a lane",
      subhead: "Big targets — easy to tap.",
      bullets: [],
      transition: tx("push-up", 0.4),
      shapes: [
        msg({
          x: 8, y: 32, w: 84, h: 14,
          text: "WORK — 3 projects",
          textStyle: "h2", fill: "#c9783f", stroke: "#c9783f", textColor: "#1a2332",
          radius: 16, motion: mot("fly-up", 0.08, 0.4)
        }),
        msg({
          x: 8, y: 50, w: 84, h: 14,
          text: "FREELANCE — 2 projects",
          textStyle: "h2", fill: "#4a7c6f", stroke: "#4a7c6f", textColor: "#f4efe6",
          radius: 16, motion: mot("fly-up", 0.2, 0.4)
        }),
        msg({
          x: 8, y: 68, w: 84, h: 14,
          text: "PERSONAL — 3 projects",
          textStyle: "h2", fill: "#e0a84a", stroke: "#e0a84a", textColor: "#1a2332",
          radius: 16, motion: mot("fly-up", 0.32, 0.4)
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
        msg({
          x: 7, y: 30, w: 86, h: 16,
          text: "📌 Brand Strategist · active\nQ3 Campaign — Summer Push · 2400 XP",
          textStyle: "caption", radius: 14, motion: mot("fly-up", 0.08, 0.4)
        }),
        msg({
          x: 7, y: 49, w: 86, h: 16,
          text: "Training Architect · shipped\nOnboarding Emulator — Mobile · 3100 XP",
          textStyle: "caption", radius: 14, motion: mot("fly-up", 0.2, 0.4)
        }),
        msg({
          x: 7, y: 68, w: 86, h: 16,
          text: "Compliance Ranger · planning\nAccessibility Audit · 1800 XP",
          textStyle: "caption", radius: 14, motion: mot("fly-up", 0.32, 0.4)
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
        msg({
          x: 7, y: 28, w: 86, h: 52,
          text: "PINNED · active · 2400 XP\n\nSummer Push\nNext: Finalize hero photography direction\n\nTags: brand · campaign · q3",
          textStyle: "body", radius: 16, motion: mot("zoom", 0.12, 0.5)
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
      shapes: [
        phoneDot({ x: 78, y: 14, h: 3.4, fill: "#c9783f", motion: mot("bounce", 0.15, 0.5) })
      ]
    },
    {
      type: "content", layout: "section", name: "Personal",
      heading: "Personal pin",
      subhead: "Because curiosity counts.",
      bullets: [],
      transition: tx("push-up", 0.4),
      shapes: [
        msg({
          x: 7, y: 30, w: 86, h: 48,
          text: "📌 Firebrick Wrangler\nactive · 1600 XP\n\nBackyard Pizza Oven — Phase 2\nNext: Source firebrick, 46 count\n#build #pizza #outdoor",
          textStyle: "body", radius: 16, motion: mot("fly-up", 0.15, 0.45)
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
        phoneDot({
          x: 44, y: 72, h: 3.8, fill: "#c9783f",
          motion: Object.assign(mot("pop", 0.2, 0.45), { attention: "pulse", attentionDelay: 0.7 })
        })
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
    artboard: { id: "16:9", w: 1920, h: 1080 },
    steps: atlasDesktopSteps(),
    cta: Object.assign({}, ATLAS_CTA)
  },
  {
    id: "atlas-mobile",
    group: "sample",
    name: "Try Atlas (phone)",
    title: "Atlas — Mobile",
    blurb: "Portrait 9:16 board, stacked cards, one idea per slide — same sample data",
    brand: Object.assign({}, ATLAS_BRAND),
    artboard: { id: "9:16", w: 1080, h: 1920 },
    steps: atlasMobileSteps(),
    cta: Object.assign({}, ATLAS_CTA)
  },
  {
    id: "dog-slack",
    group: "sample",
    name: "Teach the Dog to Use Slack",
    title: "Teach the Dog to Use Slack",
    blurb: "Widescreen showcase — dry humor, motion, focus rings, arrows & dog avatar",
    brand: Object.assign({}, DOG_BRAND),
    artboard: { id: "16:9", w: 1920, h: 1080 },
    steps: dogSlackSteps(),
    cta: Object.assign({}, DOG_CTA),
    logo: CANINE_UX_LEAD,
    assets: [
      { id: "canine-ux-lead", name: "Canine UX Lead", image: CANINE_UX_LEAD }
    ]
  },
  {
    id: "dog-slack-phone",
    group: "sample",
    name: "Teach the Dog to Use Slack (phone)",
    title: "Teach the Dog to Use Slack — Phone",
    blurb: "Portrait 9:16 showcase — stacked cards, same dry quest, motion-forward",
    brand: Object.assign({}, DOG_BRAND),
    artboard: { id: "9:16", w: 1080, h: 1920 },
    steps: dogSlackPhoneSteps(),
    cta: Object.assign({}, DOG_CTA),
    logo: CANINE_UX_LEAD,
    assets: [
      { id: "canine-ux-lead", name: "Canine UX Lead", image: CANINE_UX_LEAD }
    ]
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
    artboard: tpl.artboard ? Object.assign({}, tpl.artboard) : { id: "16:9", w: 1920, h: 1080 },
    steps: (tpl.steps || []).map(s => Object.assign({}, s, {
      shapes: (s.shapes || []).map(sh => Object.assign({}, sh)),
      bullets: Array.isArray(s.bullets) ? s.bullets.slice() : [],
      transition: s.transition ? Object.assign({}, s.transition) : undefined,
      notes: s.notes
    })),
    cta: Object.assign({ enabled: false, text: "Get started", url: "" }, tpl.cta || {}),
    assets: Array.isArray(tpl.assets)
      ? tpl.assets.map(a => Object.assign({}, a))
      : [],
    symbols: [],
    logo: tpl.logo || null
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
      artboard: project.artboard,
      logo: project.logo,
      steps: project.steps,
      cta: project.cta,
      assets: project.assets || [],
      symbols: project.symbols || []
    }
  };
}
