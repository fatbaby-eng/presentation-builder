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
- **Screenshot slides** — drop in images and overlay clickable hotspots and
  redactions for guided product tours.
- **One brand kit, applied everywhere** — import your brand standards (colours,
  fonts, logo) and every slide *and* the exported presentation pick up your look
  and feel automatically.
- **Reusable asset library** — upload logos, icons or images once, then drop them
  onto any slide and drag/scale them into place. Deleting an asset from the
  library removes it from every slide it appears on.

## Use it

Open `index.html` in any browser. That's the whole tool.

To give it away to a company, just hand them `index.html` (or host it on any
static host — GitHub Pages, Netlify, S3, a plain web server). It needs nothing
else.

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

   …or click **+ Screenshots** (or drag-and-drop images) to add image slides.
3. **Place hotspots** (image slides) — with the **Hotspot** tool, click anywhere
   on a slide to drop a pulsing hotspot. Each gets its own tooltip.
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

- **Colours** — primary (accent), secondary, slide background, and slide text.
- **Fonts** — heading and body, chosen from a set of **web-safe font stacks**, so
  exported presentations stay 100% offline (no font CDN, no network requests).
- **Logo** — shown in the viewer bar and on content slides.
- **Import / Export** — share a `.brandkit.json` across decks, or hand it to a
  teammate so every presentation matches your standards.

## The three canvas tools

| Tool | What it does |
|---|---|
| **＋ Hotspot** | Click the image to add a clickable hotspot. |
| **▦ Redact** | Drag on the image to cover an area (blur or black out). |
| **↖ Select** | Click a hotspot or redaction box to edit or remove it. |

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
