/**
 * Arrow style variants for demo callouts.
 * Geometry stays a % bounding box with flipX/flipY; style changes stroke/path/head.
 */

export const ARROW_STYLES = [
  { id: "solid", label: "Solid", hint: "Classic line + chevron" },
  { id: "dashed", label: "Dashed", hint: "Dashed stroke" },
  { id: "double", label: "Double head", hint: "Arrow heads on both ends" },
  { id: "thick", label: "Thick / chevrons", hint: "Bold shaft with chevron marks" },
  { id: "curved", label: "Curved", hint: "Soft bend toward the tip" },
  { id: "block", label: "Block", hint: "Filled block arrow" }
];

const STYLE_IDS = ARROW_STYLES.map(s => s.id);

export function sanitizeArrowStyle(raw) {
  return STYLE_IDS.includes(raw) ? raw : "solid";
}

function endpoints(sh) {
  const x1 = sh.flipX ? 92 : 8;
  const x2 = sh.flipX ? 8 : 92;
  const y1 = sh.flipY ? 92 : 8;
  const y2 = sh.flipY ? 8 : 92;
  return { x1, y1, x2, y2 };
}

function setStroke(node, color, sw, extras) {
  node.setAttribute("stroke", color);
  node.setAttribute("stroke-width", sw);
  node.setAttribute("vector-effect", "non-scaling-stroke");
  node.setAttribute("stroke-linecap", "round");
  node.setAttribute("stroke-linejoin", "round");
  node.setAttribute("fill", "none");
  if (extras) Object.keys(extras).forEach(k => node.setAttribute(k, extras[k]));
}

function chevronHead(NS, x, y, ang, len, color, sw) {
  const a1 = ang + Math.PI * 0.82;
  const a2 = ang - Math.PI * 0.82;
  const head = document.createElementNS(NS, "polyline");
  head.setAttribute(
    "points",
    (x + len * Math.cos(a1)) + "," + (y + len * Math.sin(a1)) + " " +
    x + "," + y + " " +
    (x + len * Math.cos(a2)) + "," + (y + len * Math.sin(a2))
  );
  setStroke(head, color, sw);
  return head;
}

function mid(a, b) { return (a + b) / 2; }

/**
 * Build an SVG element for an arrow shape.
 * @param {object} sh shape with flipX/flipY, stroke, strokeWidth, arrowStyle
 * @returns {SVGSVGElement}
 */
export function buildArrowSVG(sh) {
  const NS = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(NS, "svg");
  svg.setAttribute("viewBox", "0 0 100 100");
  svg.setAttribute("preserveAspectRatio", "none");
  svg.setAttribute("overflow", "visible");

  const style = sanitizeArrowStyle(sh.arrowStyle);
  const { x1, y1, x2, y2 } = endpoints(sh);
  const color = sh.stroke || "#e23d4b";
  const sw = Math.max(1, Number(sh.strokeWidth) || 3);
  const ang = Math.atan2(y2 - y1, x2 - x1);
  const angBack = ang + Math.PI;
  const headLen = style === "thick" ? 20 : 16;

  if (style === "block") {
    // Filled block arrow along the diagonal of the bbox
    const nx = Math.cos(ang + Math.PI / 2);
    const ny = Math.sin(ang + Math.PI / 2);
    const half = 10;
    const shaftEnd = 0.72;
    const sx = x1 + (x2 - x1) * shaftEnd;
    const sy = y1 + (y2 - y1) * shaftEnd;
    const tipX = x2, tipY = y2;
    const pts = [
      [x1 + nx * half * 0.55, y1 + ny * half * 0.55],
      [sx + nx * half * 0.55, sy + ny * half * 0.55],
      [sx + nx * half, sy + ny * half],
      [tipX, tipY],
      [sx - nx * half, sy - ny * half],
      [sx - nx * half * 0.55, sy - ny * half * 0.55],
      [x1 - nx * half * 0.55, y1 - ny * half * 0.55]
    ];
    const poly = document.createElementNS(NS, "polygon");
    poly.setAttribute("points", pts.map(p => p[0] + "," + p[1]).join(" "));
    poly.setAttribute("fill", color);
    poly.setAttribute("stroke", "none");
    svg.appendChild(poly);
    return svg;
  }

  if (style === "curved") {
    const mx = mid(x1, x2);
    const my = mid(y1, y2);
    // Bend perpendicular to the chord
    const nx = Math.cos(ang + Math.PI / 2);
    const ny = Math.sin(ang + Math.PI / 2);
    const bend = 18;
    const cx = mx + nx * bend;
    const cy = my + ny * bend;
    const path = document.createElementNS(NS, "path");
    path.setAttribute("d", "M " + x1 + " " + y1 + " Q " + cx + " " + cy + " " + x2 + " " + y2);
    setStroke(path, color, sw);
    svg.appendChild(path);
    // Head oriented along curve tangent near tip (approx chord to tip from control)
    const tipAng = Math.atan2(y2 - cy, x2 - cx);
    svg.appendChild(chevronHead(NS, x2, y2, tipAng, headLen, color, sw));
    return svg;
  }

  if (style === "thick") {
    const line = document.createElementNS(NS, "line");
    line.setAttribute("x1", x1); line.setAttribute("y1", y1);
    line.setAttribute("x2", x2); line.setAttribute("y2", y2);
    setStroke(line, color, Math.max(sw, 5));
    svg.appendChild(line);
    // Chevron marks along the shaft
    const marks = 3;
    for (let i = 1; i <= marks; i++) {
      const t = i / (marks + 1.2);
      const px = x1 + (x2 - x1) * t;
      const py = y1 + (y2 - y1) * t;
      const mlen = 9;
      const a1 = ang + Math.PI * 0.78;
      const a2 = ang - Math.PI * 0.78;
      const mark = document.createElementNS(NS, "polyline");
      mark.setAttribute(
        "points",
        (px - mlen * Math.cos(a1)) + "," + (py - mlen * Math.sin(a1)) + " " +
        px + "," + py + " " +
        (px - mlen * Math.cos(a2)) + "," + (py - mlen * Math.sin(a2))
      );
      setStroke(mark, color, Math.max(2, sw - 1));
      svg.appendChild(mark);
    }
    svg.appendChild(chevronHead(NS, x2, y2, ang, headLen, color, Math.max(sw, 4)));
    return svg;
  }

  // solid / dashed / double share a main shaft
  const dash = style === "dashed" ? { "stroke-dasharray": "8 6" } : null;
  const line = document.createElementNS(NS, "line");
  line.setAttribute("x1", x1); line.setAttribute("y1", y1);
  line.setAttribute("x2", x2); line.setAttribute("y2", y2);
  setStroke(line, color, sw, dash);
  svg.appendChild(line);

  svg.appendChild(chevronHead(NS, x2, y2, ang, headLen, color, sw));
  if (style === "double") {
    svg.appendChild(chevronHead(NS, x1, y1, angBack, headLen, color, sw));
  }
  return svg;
}

/** Retint stroke/fill nodes after brand colour resolve. */
export function recolorArrowSVG(svg, color) {
  if (!svg) return;
  svg.querySelectorAll("line, polyline, path").forEach(n => {
    n.setAttribute("stroke", color);
  });
  svg.querySelectorAll("polygon").forEach(n => {
    n.setAttribute("fill", color);
  });
}
