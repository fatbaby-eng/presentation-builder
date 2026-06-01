# Presentation Builder

A free, self-hostable tool for building **interactive presentations** — the
click-through, guided-tour kind (think Arcade / Storylane). Upload screenshots
or slides, add hotspots with tooltips, blur out anything sensitive, and export a
single standalone HTML file you can share with anyone.

No accounts. No backend. No data ever leaves the browser.

## Use it

Open `index.html` in any browser. That's the whole tool.

To give it away to a company, just hand them `index.html` (or host it on any
static host — GitHub Pages, Netlify, S3, a plain web server). It needs nothing
else.

## Build a presentation

1. **Add slides** — drag-and-drop images or click *+ Screenshots*; each image
   becomes a slide. Or add a **+ Text slide** (heading + body) for intros and
   section breaks.
2. **Place hotspots** — with the **Hotspot** tool, click anywhere on a slide to
   drop a pulsing hotspot. Add as many as you like; each gets its own tooltip.
3. **Write tooltips** — select a hotspot, type its text, and choose where the
   tooltip sits (top / bottom / left / right).
4. **Redact sensitive info** — with the **Redact** tool, drag a box over emails,
   names, or numbers. Choose **Black out** (solid) or **Blur** per region.
5. **Brand it** — set an accent color and upload a logo to show in the viewer bar.
6. **Organize** — drag slides to reorder (or use the ↑/↓ buttons), duplicate, or
   delete.
7. **Add a final CTA** (optional) — a button shown at the end, e.g.
   *Start free trial → https://…*.
8. **Preview** to click through it exactly as your viewers will.
9. **Export** → downloads one `.html` file with the images embedded. Share that
   file; it runs offline, anywhere.

Use **Save** / **Open** to keep working later — it downloads a
`.presentation.json` you can reload into the editor. (Older project files are
loaded and upgraded automatically.)

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
- **Untrusted project files are sanitized.** Loading a `.presentation.json`
  validates every field: images and logos must be `data:image/…`, the brand
  color must match a hex pattern (blocks CSS injection), coordinates are clamped,
  and URLs re-checked.
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
