/**
 * Command palette helpers — fuzzy filter for Ctrl/Cmd+K.
 * Labels stay plain language; shortcuts shown beside matches.
 */

export function fuzzyScore(query, text) {
  query = String(query || "").trim().toLowerCase();
  text = String(text || "").toLowerCase();
  if (!query) return 1;
  if (text === query) return 100;
  if (text.startsWith(query)) return 80;
  if (text.includes(query)) return 60;
  // subsequence match
  let ti = 0, score = 0, gap = 0;
  for (let qi = 0; qi < query.length; qi++) {
    const ch = query[qi];
    let found = -1;
    for (let j = ti; j < text.length; j++) {
      if (text[j] === ch) { found = j; break; }
    }
    if (found < 0) return 0;
    score += 10 - Math.min(9, found - ti);
    gap += found - ti;
    ti = found + 1;
  }
  return Math.max(1, score - Math.floor(gap / 4));
}

/**
 * @param {Array<{id:string,label:string,hint?:string,keywords?:string,shortcut?:string,run:Function}>} commands
 * @param {string} query
 * @param {number} limit
 */
export function filterCommands(commands, query, limit) {
  limit = limit == null ? 12 : limit;
  const scored = [];
  for (let i = 0; i < commands.length; i++) {
    const c = commands[i];
    const hay = [c.label, c.hint || "", c.keywords || "", c.shortcut || ""].join(" ");
    const s = fuzzyScore(query, hay);
    if (s > 0) scored.push({ cmd: c, score: s });
  }
  scored.sort((a, b) => b.score - a.score || a.cmd.label.localeCompare(b.cmd.label));
  return scored.slice(0, limit).map(x => x.cmd);
}
