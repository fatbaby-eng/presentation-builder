/**
 * Recent presentations — stored locally in the browser.
 * Plain language: "Recent", "Close presentation".
 */

const RECENTS_KEY = "presentationBuilder.recents.v1";
const MAX_RECENTS = 10;

function safeParse(raw) {
  try {
    const v = JSON.parse(raw);
    return Array.isArray(v) ? v : [];
  } catch (e) { return []; }
}

export function listRecents() {
  try {
    return safeParse(localStorage.getItem(RECENTS_KEY))
      .filter(e => e && e.id && e.payload)
      .slice(0, MAX_RECENTS);
  } catch (e) { return []; }
}

function writeRecents(list) {
  localStorage.setItem(RECENTS_KEY, JSON.stringify(list.slice(0, MAX_RECENTS)));
}

/** Snapshot a project into Recents (newest first). Drops oldest if storage is full. */
export function upsertRecent(project, sanitizeProject) {
  if (!project || typeof project !== "object") return;
  const steps = project.steps || [];
  if (!steps.length && !(project.assets && project.assets.length)) return;

  let payload;
  try {
    payload = sanitizeProject ? sanitizeProject(project) : project;
  } catch (e) { return; }

  const id = String(payload.id || project.id || ("r" + Date.now().toString(36))).slice(0, 40);
  payload.id = id;
  const first = steps[0] || {};
  const entry = {
    id,
    title: String(payload.title || "Untitled").slice(0, 120),
    updatedAt: Date.now(),
    slideCount: steps.length,
    blurb: String(first.heading || first.name || first.body || (steps.length + " slides")).slice(0, 80),
    payload
  };

  let list = listRecents().filter(e => e.id !== id);
  list.unshift(entry);

  while (list.length) {
    try {
      writeRecents(list);
      return;
    } catch (e) {
      // Quota — drop oldest and retry; strip images as last resort
      if (list.length <= 1) {
        try {
          const slim = JSON.parse(JSON.stringify(entry));
          slim.payload.assets = [];
          slim.payload.logo = null;
          (slim.payload.steps || []).forEach(s => {
            if (s.image && String(s.image).length > 5000) s.image = "";
            (s.shapes || []).forEach(sh => { if (sh.image && String(sh.image).length > 5000) sh.image = null; });
          });
          writeRecents([slim]);
        } catch (e2) {}
        return;
      }
      list.pop();
    }
  }
}

export function getRecent(id) {
  return listRecents().find(e => e.id === id) || null;
}

export function removeRecent(id) {
  writeRecents(listRecents().filter(e => e.id !== id));
}

export function formatRecentWhen(ts) {
  const t = Number(ts) || 0;
  if (!t) return "";
  const mins = Math.round((Date.now() - t) / 60000);
  if (mins < 1) return "Just now";
  if (mins < 60) return mins + " min ago";
  const hrs = Math.round(mins / 60);
  if (hrs < 48) return hrs + " hr ago";
  const days = Math.round(hrs / 24);
  return days + " day" + (days === 1 ? "" : "s") + " ago";
}
