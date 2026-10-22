// Solute particles for variant C on /design-preview/: a dissolved substance applied at the
// surface, carried down by the water (lagging behind it in the soil matrix, faster along
// macropores) and taken up by the plants. Each particle has a path and a time window
// (fractions of the animation); the static picture shows every particle at the end of its path.
import { rng, round, surface } from './soil-profile';
import { macropores } from './soil-extras';
import { matrixFrontC } from './soil-field';
import { plants, type Pt } from './soil-plants';

export interface Particle {
  kind: 'matrix' | 'macropore' | 'plant';
  /** Start and end of the movement, as fractions of the animation (0–1). */
  t0: number;
  t1: number;
  path: Pt[];
}

const dist = (a: Pt, b: Pt) => Math.hypot(b[0] - a[0], b[1] - a[1]);

/** Part of a polyline from its start to a fraction f of its length. */
function cut(pts: Pt[], f: number): Pt[] {
  const total = pts.slice(1).reduce((s, p, i) => s + dist(pts[i], p), 0);
  let left = total * f;
  const out: Pt[] = [pts[0]];
  for (let i = 1; i < pts.length; i++) {
    const d = dist(pts[i - 1], pts[i]);
    if (left <= d) {
      const k = d ? left / d : 0;
      out.push([pts[i - 1][0] + (pts[i][0] - pts[i - 1][0]) * k, pts[i - 1][1] + (pts[i][1] - pts[i - 1][1]) * k]);
      return out;
    }
    left -= d;
    out.push(pts[i]);
  }
  return out;
}

/** Keep at most n points (evenly picked), always keeping the first and last. */
function thin(pts: Pt[], n = 14): Pt[] {
  if (pts.length <= n) return pts;
  return Array.from({ length: n }, (_, i) => pts[Math.round((i * (pts.length - 1)) / (n - 1))]);
}

const r = rng(907);
const particles: Particle[] = [];

// In the soil matrix: behind the water front, denser near the surface.
for (let i = 0; i < 170; i++) {
  const x = 10 + r() * 1580;
  const top = surface(x);
  const reach = matrixFrontC(x) - 16 - top;
  const depth = 3 + reach * (0.15 + 0.85 * r() ** 0.8);
  const steps = 5;
  const path: Pt[] = Array.from({ length: steps + 1 }, (_, k) => [
    x + (k ? (r() - 0.5) * 6 : 0),
    top - 2 + ((depth + 2) * k) / steps,
  ]);
  const t0 = 0.06 + r() * 0.12;
  particles.push({ kind: 'matrix', t0, t1: t0 + 0.35 + (depth / reach) * 0.3, path });
}

// Along macropores that reach below the matrix front: fast and deep.
for (const m of macropores) {
  if (m.tip[1] < matrixFrontC(m.tip[0]) + 10) continue;
  const n = 5 + Math.floor(r() * 4);
  for (let k = 0; k < n; k++) {
    const f = 0.35 + r() * 0.62;
    const side = (r() - 0.5) * 2 * (1.5 + f * 4);
    const path = thin(cut(m.points, f)).map(([px, py], j, a) => [px + (side * j) / (a.length - 1), py] as Pt);
    const t0 = 0.08 + r() * 0.1;
    particles.push({ kind: 'macropore', t0, t1: t0 + 0.22 + f * 0.25, path });
  }
}

// Uptake: from a root tip, up the root and the stem, into a leaf or a fruit.
for (const p of plants) {
  for (const route of p.uptake) {
    for (let k = 0; k < 2; k++) {
      const f = 0.82 + r() * 0.18;
      const t0 = 0.42 + r() * 0.15;
      particles.push({ kind: 'plant', t0, t1: Math.min(1, t0 + 0.4 + r() * 0.08), path: thin(cut(route, f), 18) });
    }
  }
}

export const solutes = particles.map((p) => ({
  ...p,
  t0: round(p.t0 * 1000) / 1000,
  t1: round(p.t1 * 1000) / 1000,
  path: p.path.map(([x, y]) => [round(x), round(y)] as Pt),
}));

/** Compact form for the animation script: [t0, t1, x0, y0, x1, y1, …] per particle. */
export const solutesData = solutes.map((p) => [p.t0, p.t1, ...p.path.flat()]);
