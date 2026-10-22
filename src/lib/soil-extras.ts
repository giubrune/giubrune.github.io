// Extra soil features for the hero drawing:
// stones, macropores (earthworm and root channels) and pores cut by the section plane.
// Deterministic, computed at build time.
import { WIDTH, WATER_TABLE, rng, round, surface, boundary1, boundary2 } from './soil-profile';

type Pt = [number, number];

/** Closed SVG path through points. */
const closed = (pts: Pt[]) => pts.map(([x, y], i) => `${i ? 'L' : 'M'}${round(x)} ${round(y)}`).join(' ') + ' Z';
const open = (pts: Pt[]) => pts.map(([x, y], i) => `${i ? 'L' : 'M'}${round(x)} ${round(y)}`).join(' ');

/** Irregular, slightly flattened stone outline. */
function stone(cx: number, cy: number, radius: number, r: () => number) {
  const n = 7 + Math.floor(r() * 4);
  const rot = r() * Math.PI;
  const flat = 0.65 + r() * 0.25;
  const pts: Pt[] = [];
  for (let i = 0; i < n; i++) {
    const a = rot + (i / n) * Math.PI * 2;
    const rad = radius * (0.72 + r() * 0.4);
    pts.push([cx + Math.cos(a) * rad, cy + Math.sin(a) * rad * flat]);
  }
  return closed(pts);
}

/** Stones placed inside a layer, kept clear of its boundaries. */
function stonesIn(
  seed: number,
  count: number,
  rMin: number,
  rMax: number,
  top: (x: number) => number,
  bottom: (x: number) => number,
) {
  const r = rng(seed);
  return Array.from({ length: count }, () => {
    const radius = rMin + r() * (rMax - rMin);
    const x = r() * WIDTH;
    const t = top(x) + radius;
    const b = bottom(x) - radius;
    return { d: stone(x, t + r() * Math.max(1, b - t), radius, r), large: radius > (rMin + rMax) / 2 };
  });
}

export const stones = [
  ...stonesIn(401, 8, 2.5, 5, (x) => surface(x) + 6, boundary1),
  ...stonesIn(402, 18, 4, 11, boundary1, boundary2),
  ...stonesIn(403, 30, 5, 15, boundary2, () => WATER_TABLE - 2),
];

export interface Macropore {
  points: Pt[];
  width: number;
  /** Deepest point (the tip of the channel). */
  tip: Pt;
}

/** Vertical, slightly sinuous channels from the surface; most end in the topsoil, a few reach the sand. */
export const macropores: Macropore[] = (() => {
  const r = rng(509);
  const out: Macropore[] = [];
  let x0 = 30 + r() * 50;
  while (x0 < WIDTH - 20) {
    const kind = r();
    const end =
      kind < 0.45
        ? boundary1(x0) - 25 + r() * 30
        : kind < 0.8
          ? boundary1(x0) + 20 + r() * (boundary2(x0) - boundary1(x0) - 30)
          : boundary2(x0) + 15 + r() * 55;
    let x = x0;
    let y = surface(x0) + 1;
    let drift = (r() - 0.5) * 1.2;
    const pts: Pt[] = [[x, y]];
    while (y < end) {
      drift = drift * 0.75 + (r() - 0.5) * 2.2;
      x += drift;
      y += 6;
      pts.push([x, Math.min(y, end)]);
    }
    out.push({ points: pts, width: 2 + r() * 1.8, tip: pts[pts.length - 1] });
    x0 += 70 + r() * 90;
  }
  return out;
})();

export const macroporePaths = macropores.map((m) => ({ d: open(m.points), width: round(m.width), deep: m.tip[1] > boundary1(m.tip[0]) }));

/** Pores cut across by the section plane: small dark ellipses in the topsoil and subsoil. */
export const cutPores = (() => {
  const r = rng(611);
  return Array.from({ length: 70 }, () => {
    const x = r() * WIDTH;
    const deep = r() < 0.35;
    const top = deep ? boundary1(x) + 4 : surface(x) + 5;
    const bottom = deep ? boundary2(x) - 4 : boundary1(x) - 4;
    return { cx: round(x), cy: round(top + r() * (bottom - top)), rx: round(1.2 + r() * 2), ry: round(0.9 + r() * 1.3) };
  });
})();

/** Distance from a point to a polyline. */
export function distanceToPolyline(px: number, py: number, pts: Pt[]) {
  let best = Infinity;
  for (let i = 1; i < pts.length; i++) {
    const [ax, ay] = pts[i - 1];
    const [bx, by] = pts[i];
    const dx = bx - ax;
    const dy = by - ay;
    const len2 = dx * dx + dy * dy || 1;
    const t = Math.max(0, Math.min(1, ((px - ax) * dx + (py - ay) * dy) / len2));
    const qx = ax + t * dx - px;
    const qy = ay + t * dy - py;
    best = Math.min(best, qx * qx + qy * qy);
  }
  return Math.sqrt(best);
}
