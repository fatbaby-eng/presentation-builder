/**
 * Starter templates + custom template save/load (local only).
 * Plain language: "Start from a template", "Save as template".
 *
 * Samples (group: "sample") are full demo decks with sample data.
 * Starters (group: "starter") are blank-ish outlines to fill in.
 */

import { CANINE_UX_LEAD } from "./sampleDog.js";
import {
  mot, tx, box, msg, highlight, ellipse, frame, arrow, focus, typeText
} from "./sampleHelpers.js";
import { BUILDER_SAMPLES } from "./sampleBuilder.js";
import { PHISH_SAMPLES } from "./samplePhish.js";

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


export const BUILTIN_TEMPLATES = [
  ...BUILDER_SAMPLES,
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
  ...PHISH_SAMPLES,
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
