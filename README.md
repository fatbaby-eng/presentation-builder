# Presentation Builder

A free, self-hostable tool for building **interactive presentations** — the
click-through, guided-tour kind (think Arcade / Storylane). Build slides
**from scratch** with your own brand look, or upload screenshots and add
hotspots with tooltips. Blur out anything sensitive, then export a single
standalone HTML file you can share with anyone.

No accounts. No backend. No data ever leaves the browser.

## What you can build

- **From-scratch content slides** — Title, Section divider, Bulleted list, and
  Statement/quote layouts, plus plain text slides. No screenshot required.
- **Paste an outline** — drop in a numbered list, bullets, markdown headings, or a
  `.txt` / `.md` / `.pdf` / `.docx` file and get a full slide deck in one click.
  Text is extracted locally in your browser.
- **Screenshot slides** — drop in images and overlay clickable hotspots and
  redactions for guided product tours.
- **Hotspot animation presets** — Pulse, Bounce, Glow, Spotlight, or None — pick
  per hotspot, no timeline to learn.
- **One brand kit, applied everywhere** — import your brand standards (colours,
  fonts, logo) and every slide *and* the exported presentation pick up your look
  and feel automatically. Drop logos or brand images to auto-build a colour
  palette and suggested free system font pairs.
- **Your images** — add logos, icons, or photos once, then click to place them on any
  slide. Search or filter to “On this slide.” Large photos shrink automatically.
  Select a placed image to try Looks (black & white, warm, vivid…) and brightness.
- **Drawing tools** — boxes, circles, frames, arrows, highlights, and message boxes.
  Move, resize, and rotate them. Fills can be solid or gradient, with shadow and glow.
- **Text styles** — pick Heading or Body styles from your Brand kit. Change size and
  spacing on one message box without breaking the rest.
- **Saved pieces** — save a shape or Frame to reuse on other slides. Tweak text or
  colours on one copy, or unlink it to edit freely.
- **Smart guides** — while dragging, red lines help you line things up (hold **Alt**
  to move freely). Toggle **Grid**, **Rulers**, and **Safe** area from the toolbar.
- **Frames** — draw a Frame, add a photo, and optionally stack children inside it.
- **Type on the slide** — double-click a message box to edit text in place.
- **Autosave** — work is saved in your browser automatically. Use **Save**/**Open**
  for portable `.presentation.json` files.

## Use it

Open the editor with a local static server (ES modules require it):

```bash
npx --yes serve .
```

Then visit the URL it prints (usually `http://localhost:3000`).

Exported presentations remain a **single offline `.html` file** — no server needed to view or share them.

To give the tool away to a company, hand them this folder (or host it on any static host). The editor needs nothing but a static file server; exports need nothing at all.

## Build a presentation

1. **Set up your brand** (recommended first step) — click **🎨 Brand kit** to
   set your primary/secondary colours, slide background & text colours, heading
   and body fonts, and logo. **Import** an existing `.brandkit.json` to apply a
   saved look instantly, **Export** to reuse it across presentations, or click
   *Pick brand colour from logo* to sample your logo's dominant colour.
2. **Add slides** — click **＋ New slide** to add a from-scratch layout:
   - 🏷️ **Title slide** — big title + subtitle (great as a cover)
   - § **Section divider** — section heading in your brand colour
   - ≣ **Bulleted list** — heading + bullet points (one per line)
   - ❝ **Statement / quote** — a large centred statement with attribution
   - 📝 **Plain text** — simple heading + body
   - ☰ **Import content…** — paste a list or import `.txt` / `.md` / `.pdf` /
     `.docx` to generate slides

   …or click **+ Screenshots** (or drag-and-drop images) to add image slides.
   On an empty canvas you can also **Start from scratch**, **Import an outline**,
   or **Add screenshots**.
3. **Place hotspots** (image slides) — with the **Hotspot** tool, click anywhere
   on a slide to drop a hotspot. Each gets its own tooltip. Pick an animation
   (Pulse, Bounce, Glow, Spotlight, or None) in the inspector.
4. **Write tooltips** — select a hotspot, type its text, and choose where the
   tooltip sits (top / bottom / left / right).
5. **Redact sensitive info** — with the **Redact** tool, drag a box over emails,
   names, or numbers. Choose **Black out** (solid) or **Blur** per region.
6. **Organize** — drag slides to reorder (or use the ↑/↓ buttons), duplicate, or
   delete.
7. **Add a final CTA** (optional) — a button shown at the end, e.g.
   *Start free trial → https://…*.
8. **Preview** to click through it exactly as your viewers will.
9. **Export** → downloads one `.html` file with the images embedded. Share that
   file; it runs offline, anywhere.

Use **Save** / **Open** to keep working later — it downloads a
`.presentation.json` you can reload into the editor. (Older project files are
loaded and upgraded automatically — a legacy accent colour becomes your brand's
primary colour.)

## Brand kit

The brand kit is the single source of truth for your presentation's look and
feel, applied live in the editor and baked into every export:

- **Style from images** — drop logos, screenshots or brand assets into the brand
  kit to pull a colour palette and get free system font-pair suggestions. Click
  **Apply style guide** when it looks right (optionally set the first image as
  the logo).
- **Slide background** — solid colour, two-colour gradient (with angle + presets),
  or a full-bleed background image (cover / contain / stretch) with optional
  darken overlay for readable text.
- **Colours** — primary (accent), secondary, and slide text.
- **Fonts** — heading and body, chosen from a set of **web-safe font stacks**, so
  exported presentations stay 100% offline (no font CDN, no network requests).
- **Logo** — shown in the viewer bar and on content slides.
- **Import / Export** — share a `.brandkit.json` across decks, or hand it to a
  teammate so every presentation matches your standards.

## The canvas tools

Drawing tools work on **every** slide type (title, section, bullets, statement,
text and screenshot slides). Hotspots and redactions are specific to screenshot
slides.

| Tool | What it does |
|---|---|
| **↖ Select** | Click any item to select it, then drag to move, use the corner handle to resize, and restyle it in the inspector. `Delete`/`Backspace` removes it; `Esc` deselects. |
| **＋ Hotspot** *(image)* | Click the image to add a clickable hotspot. Customize its colour, size and animation (Pulse / Bounce / Glow / Spotlight / None). |
| **▦ Redact** *(image)* | Drag to cover an area (blur or black out). |
| **▭ Box / ◯ Ellipse** | Drag to draw a shape with fill colour, border colour/width, opacity (and corner radius for boxes). |
| **➶ Arrow** | Drag to draw an arrow in any direction; set its colour and thickness. |
| **▨ Highlight** | Drag to draw a translucent highlight that emphasizes part of the slide. |
| **💬 Message** | Drag to draw a text callout box with its own background, border and text colour. |

Selecting a shape opens a **Shape style** panel in the inspector for fill/border
colours, opacity, border width, corner radius and (for message boxes) the text.

## Viewer controls (in an exported presentation)

- Click a hotspot to read its tooltip; click **Next** (or the hotspot's button) to advance, **Back** to go back
- Arrow keys ← → (or space) to navigate
- A progress bar and slide counter, plus a Restart at the end

## Security

This tool is built to be safe to give away, because exported presentations are
HTML files that companies hand to their own customers:

- **No backend, no uploads.** Everything runs locally in your browser via the
  File API. Nothing is sent anywhere.
- **No XSS in exported files.** All author-supplied text (titles, tooltips,
  headings, CTA labels) is rendered with `textContent` / `createElement`, never
  `innerHTML`.
- **Link allow-list.** CTA links are restricted to `http`, `https`, and `mailto`
  at both export and render time, so `javascript:`/`data:` links can't sneak in.
- **Untrusted project & brand-kit files are sanitized.** Loading a
  `.presentation.json` or `.brandkit.json` validates every field: images and
  logos must be `data:image/…`, every brand colour must match a hex pattern
  (blocks CSS injection), fonts are restricted to a fixed web-safe allow-list,
  coordinates are clamped, and URLs re-checked.
- **No script-tag breakout.** Presentation data is embedded as inert
  `<script type="application/json">` with `<` escaped.
- **Locked-down exports.** Each exported file ships a strict
  `Content-Security-Policy` (`default-src 'none'`, images `data:` only) and makes
  **zero network requests** — no CDNs, fonts, or trackers — so even a
  hypothetical injection can't load a remote payload or exfiltrate anything.

> **Tip:** for truly sensitive information, prefer **Black out** over **Blur** —
> a solid box removes the pixels entirely, while a blur is a visual effect.

## License

MIT — see `LICENSE`. Free to use, modify, and redistribute, including
commercially.
