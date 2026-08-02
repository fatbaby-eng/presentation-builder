# Portfolio handoff — Presentation Builder

Self-contained brief for building a **portfolio case-study / project page** about this app. Do **not** rebuild the product; design a page that showcases it.

---

## Project identity

| | |
|---|---|
| **Name** | Presentation Builder |
| **Live URL** | https://fatbaby-eng.github.io/presentation-builder/ |
| **Repo** | https://github.com/fatbaby-eng/presentation-builder |
| **Local path** (optional) | `c:\Users\fatba\OneDrive\dev\presentation-builder` |
| **License** | MIT |

**One-liner:** Zero-backend, offline-first presentation builder in the browser; export a single standalone HTML file.

No accounts. No server of your own. Autosave stays in `localStorage`. Exported decks are one offline `.html` file anyone can open.

---

## What it is / who it’s for

A Figma-ish canvas for **interactive presentations** — click-through / guided-tour decks (Arcade / Storylane territory), content slides, and screenshot walkthroughs with hotspots — without SaaS lock-in.

**Audience**

- Designers & presenters who want canvas tools and brand kits without a backend
- People shipping demo / onboarding decks, product callouts, or dry satire samples that still flex real motion
- Anyone who needs a shareable single-file HTML export

---

## Key capabilities (portfolio-worthy)

Group these crisply on the page; only ship what’s listed — don’t invent features.

### Artboards & layout

- Board sizes: landscape (16:9, 16:10, 4:3, 21:9), portrait (phone 9:16 and others), square, or custom W×H
- Content reflow when the board size changes; exports use the same board

### Shape & callout tools

- Box, ellipse, image holder (Frame), arrows (multiple styles), highlight, message, Type (free text / arc bend)
- Focus rings (demo “click here” attention)
- Hotspots + redactions on screenshot slides
- Selection + corner/edge resize handles; shared inspector / shape style panel
- Quick bar: duplicate, front/back, shadow, reuse, delete
- Smart guides, grid, rulers, safe area

### Motion

- Timeline scrubbing under the slide
- Appear / attention / leave presets
- Pulse and focus-ring attention
- Point-to-point move (from → to)
- AE-style timing handles on clips
- Slide open transitions (fade, push, wipe, zoom…)
- Hotspot animation presets (pulse, bounce, glow, spotlight)

### Brand, templates, present, export

- Brand kit (colors, fonts, logo; import/export `.brandkit.json`; style-from-images)
- Templates & satire sample gallery + blank starters (Pitch, Product tour, Training, Status)
- Present mode: notes, timer, laser, pen, black/white screen
- Export: standalone HTML, speaker notes `.txt`, Print / PDF via browser
- Image library; saved pieces / symbols for reuse
- First-run welcome; command menu (⌘K); Save/Open `.presentation.json`

---

## Flagship samples (screenshots / case study)

Dry satire showcases — corporate training / quest theater used to demo the tool’s bells and whistles (motion, focus rings, arrows, image holders, dual artboards). Tone on the portfolio page: lightly wry, not goofy.

1. **Teach the Dog to Use Slack** (desktop 16:9 + phone 9:16)  
   Flagship. Canine UX Lead screenshot; wrong-emoji / training-theater energy; dark green brand mood (`#1a2418` bg, teal + warm accents).

2. **Backyard Pizza Oven — Phase 2** (desktop + phone)  
   DIY dome as enterprise quest; Firebrick Wrangler XP; gold/fire accents on dark charcoal (`#e0a84a` / `#1a1814`).

3. **Onboarding: You Already Know How to Click** (desktop + phone)  
   Meta onboarding for the builder itself — still in the sample gallery.

4. **Don’t Click the Phish (Unless It’s Lunch)** (desktop + phone)  
   Compliance satire; still in the gallery.

Also blank starters and user-saved templates — secondary to the satire flagships for portfolio visuals.

---

## Technical highlights

- Static site, ES modules — run via `npm start` / `npx serve .` (not `file://`)
- No backend; work autosaves in the browser (`localStorage`); portable project JSON
- Exported presentations: single offline HTML, strict CSP, no network/CDN fonts
- Deployed to GitHub Pages from `main` → https://fatbaby-eng.github.io/presentation-builder/

---

## Portfolio page brief (what Claude should create)

Build a **portfolio case-study / project page** (personal site section or standalone page), not a clone of the app.

### Suggested sections

1. **Hero** — project name as brand signal, one sharp headline, one supporting line, CTAs, optional hero visual (screenshot or sample still)
2. **Problem** — SaaS demo tools / account walls vs. a folder you can host yourself
3. **Approach** — offline-first canvas + brand kit + single-file export
4. **Feature highlights** — artboards, shapes/callouts, motion timeline, brand/export (use the groups above)
5. **Sample walkthroughs** — Dog Slack + Pizza Oven as primary case studies; mention Onboarding / Phish briefly
6. **Tech stack** — static HTML/CSS/JS (ES modules), localStorage, GitHub Pages; no framework required to state unless you verify `package.json` (currently no app framework dependency)
7. **Links** — Live demo + GitHub

### Visual direction

- Avoid generic purple-on-white / purple–indigo AI sludge
- Optional mood: dark green Dog brand / gold Pizza accents — **or** a clean editorial portfolio layout
- Prefer real product screenshots over abstract gradients as the main visual
- One composition per viewport; don’t dashboard the case study
- Motion: 2–3 intentional moments (e.g. fade-in stills, subtle sample scrub) — craft, not noise

### Screenshots

Capture from the live app / samples:

- Editor chrome with a sample loaded (Dog or Pizza)
- Motion bar / timeline if visible
- Present mode or exported viewer
- Phone artboard vs landscape side-by-side if space allows

### CTAs

- **Try the live demo** → https://fatbaby-eng.github.io/presentation-builder/
- **View source** → https://github.com/fatbaby-eng/presentation-builder

### Tone

Confident, craft-forward, lightly wry — matches the product’s satire without being silly.

---

## Suggested copy seeds

**Headlines (pick / adapt one)**

- Offline canvas. One-file export. No account wall.
- Presentation tools that leave with you.
- Build the walkthrough. Ship a single HTML.
- Figma-ish decks for people who don’t want a backend.

**Short project description (adapt freely)**

Presentation Builder is a zero-backend, browser-only tool for interactive decks and guided tours. Draw callouts, scrub motion, apply a brand kit, then export a standalone HTML file — or open the satire samples (dog Slack training, backyard pizza quest) and steal the timing.

**Supporting line**

No accounts. Autosave stays local. Host the folder anywhere static files run.

---

## Do not

- Invent features that aren’t shipped (stick to this brief + the repo README)
- Include secrets, tokens, or private paths beyond the optional local path note
- Rebuild the editor as the portfolio deliverable

---

## Quick verify before writing copy

Live demo and README are authoritative if this handoff drifts:

- Live: https://fatbaby-eng.github.io/presentation-builder/
- README in repo root
- Samples under `js/canvas/sample*.js` and `templates.js`
