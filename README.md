# Presentation Builder

A free, self-hostable tool for building **interactive presentations** — the
click-through, guided-tour kind (think Arcade / Storylane). Upload screenshots or
slides, drop a hotspot on each one, write a tooltip, and export a single
standalone HTML file you can share with anyone.

No accounts. No backend. No data ever leaves the browser.

## Use it

Open `index.html` in any browser. That's the whole tool.

To give it away to a company, just hand them `index.html` (or host it on any
static host — GitHub Pages, Netlify, S3, a plain web server). It needs nothing
else.

## Build a presentation

1. **Add slides** — drag-and-drop images, or click *Add screenshots*. Each
   image becomes a step.
2. **Place a hotspot** — click anywhere on a slide to drop the pulsing hotspot
   where the viewer should click.
3. **Write a tooltip** — add the text and choose where it sits (top/bottom/left/right).
4. **Reorder / rename / duplicate** steps in the left panel.
5. **Add a final CTA** (optional) — a button shown at the end, e.g.
   *Start free trial → https://…*.
6. **Preview** to click through it exactly as your viewers will.
7. **Export presentation** → downloads one `.html` file with the images embedded.
   Share that file; it runs offline, anywhere.

Use **Save project** / **Open project** to keep working later — it downloads a
`.presentation.json` you can reload into the editor.

## Viewer controls (in an exported presentation)

- Click the hotspot or **Next** to advance, **Back** to go back
- Arrow keys ← → (or space) to navigate
- A progress bar and step counter, plus a Restart at the end

## Security

This tool is built to be safe to give away, because exported presentations are
HTML files that companies hand to their own customers:

- **No backend, no uploads.** Everything runs locally in your browser via the
  File API. Nothing is sent anywhere.
- **No XSS in exported files.** All author-supplied text (titles, tooltips, CTA
  labels) is rendered with `textContent` / `createElement`, never `innerHTML`.
- **Link allow-list.** CTA links are restricted to `http`, `https`, and `mailto`
  at both export and render time, so `javascript:`/`data:` links can't sneak in.
- **Untrusted project files are sanitized.** Loading a `.presentation.json`
  validates every field: images must be `data:image/…`, the brand color must
  match a hex pattern (blocks CSS injection), coordinates are clamped, and URLs
  re-checked.
- **No script-tag breakout.** Presentation data is embedded as inert
  `<script type="application/json">` with `<` escaped.
- **Locked-down exports.** Each exported file ships a strict
  `Content-Security-Policy` (`default-src 'none'`, images `data:` only) and makes
  **zero network requests** — no CDNs, fonts, or trackers — so even a
  hypothetical injection can't load a remote payload or exfiltrate anything.

## License

MIT — see `LICENSE`. Free to use, modify, and redistribute, including
commercially.
