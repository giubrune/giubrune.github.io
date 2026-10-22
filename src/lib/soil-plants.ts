// Plants on the soil surface in the hero drawing: stems, leaves, fruits and
// root systems, plus the paths along which solute is taken up into the plant.
// Stylised, deterministic, computed at build time. y < surface is above ground.
import { rng, round, surface, boundary1, boundary2 } from './soil-profile';

export type Pt = [number, number];

const path = (pts: Pt[]) => pts.map(([x, y], i) => `${i ? 'L' : 'M'}${round(x)} ${round(y)}`).join(' ');

/** Points along a quadratic Bézier curve. */
function quad(a: Pt, c: Pt, b: Pt, n = 16): Pt[] {
  return Array.from({ length: n + 1 }, (_, i) => {
    const t = i / n;
    const u = 1 - t;
    return [u * u * a[0] + 2 * u * t * c[0] + t * t * b[0], u * u * a[1] + 2 * u * t * c[1] + t * t * b[1]];
  });
}

/** A pointed leaf attached at p, pointing in direction `angle` (radians), with length len. */
function leaf(p: Pt, angle: number, len: number, width: number) {
  const tip: Pt = [p[0] + Math.cos(angle) * len, p[1] + Math.sin(angle) * len];
  const nx = -Math.sin(angle) * width;
  const ny = Math.cos(angle) * width;
  const mid: Pt = [(p[0] + tip[0]) / 2, (p[1] + tip[1]) / 2];
  const d = `M${round(p[0])} ${round(p[1])} Q${round(mid[0] + nx)} ${round(mid[1] + ny)} ${round(tip[0])} ${round(tip[1])} Q${round(mid[0] - nx)} ${round(mid[1] - ny)} ${round(p[0])} ${round(p[1])} Z`;
  const vein = `M${round(p[0])} ${round(p[1])} L${round(tip[0])} ${round(tip[1])}`;
  return { d, vein, tip };
}

export interface Plant {
  stem: string;
  leaves: { d: string; vein: string }[];
  fruits: { cx: number; cy: number; r: number; stalk: string }[];
  roots: { d: string; main: boolean }[];
  /** Paths for solute uptake: from a root tip, up the root and stem, to a leaf or fruit. */
  uptake: Pt[][];
}

function plant(x0: number, height: number, withFruit: boolean, seed: number): Plant {
  const r = rng(seed);
  const base: Pt = [x0, surface(x0)];
  const lean = (r() - 0.5) * 24;
  const top: Pt = [x0 + lean, base[1] - height];
  const stemPts = quad(base, [x0 - lean * 0.4, base[1] - height * 0.55], top);

  // Leaves in alternating pairs along the upper two thirds of the stem.
  const leaves: { d: string; vein: string; tip: Pt; at: number }[] = [];
  [0.32, 0.48, 0.63, 0.78, 0.92].forEach((f, i) => {
    const at = Math.round(f * (stemPts.length - 1));
    const side = i % 2 ? 1 : -1;
    const len = (0.42 - f * 0.18) * height * (0.85 + r() * 0.3);
    const angle = side > 0 ? -0.55 + r() * 0.35 : Math.PI + 0.55 - r() * 0.35;
    leaves.push({ ...leaf(stemPts[at], angle, len, len * 0.24), at });
  });
  const crown = leaf(top, -Math.PI / 2 + (r() - 0.5) * 0.5, height * 0.18, height * 0.05);
  leaves.push({ ...crown, at: stemPts.length - 1 });

  // Fruits hanging from the middle of the stem.
  const fruits: Plant['fruits'] = [];
  const fruitStems: { at: number; c: Pt }[] = [];
  if (withFruit) {
    [0.45, 0.6, 0.74].forEach((f, i) => {
      const at = Math.round(f * (stemPts.length - 1));
      const p = stemPts[at];
      const side = i % 2 ? -1 : 1;
      const c: Pt = [p[0] + side * (12 + r() * 6), p[1] + 12 + r() * 5];
      fruits.push({ cx: round(c[0]), cy: round(c[1]), r: round(7.5 + r() * 3), stalk: path([p, [c[0], c[1] - 7]]) });
      fruitStems.push({ at, c });
    });
  }

  // Root system: a tap root into the subsoil and branching laterals in the topsoil.
  const roots: { pts: Pt[]; main: boolean }[] = [];
  const tapEnd = boundary1(x0) + 25 + r() * (boundary2(x0) - boundary1(x0) - 40);
  let x = x0;
  let y = base[1];
  const tap: Pt[] = [[x, y]];
  while (y < tapEnd) {
    y += 7;
    x += (r() - 0.5) * 5;
    tap.push([x, y]);
  }
  roots.push({ pts: tap, main: true });
  for (let k = 0; k < 6; k++) {
    const from = tap[Math.min(tap.length - 1, 1 + Math.floor(r() * Math.min(tap.length - 1, 12)))];
    const dir = k % 2 ? 1 : -1;
    const pts: Pt[] = [from];
    let [bx, by] = from;
    const steps = 4 + Math.floor(r() * 4);
    for (let s = 0; s < steps; s++) {
      bx += dir * (6 + r() * 7);
      by += 3 + r() * 6;
      pts.push([bx, by]);
    }
    roots.push({ pts, main: false });
  }

  // Uptake paths: root tip → root → stem → leaf tip or fruit.
  const targets = [
    ...leaves.map((l) => ({ at: l.at, end: l.tip })),
    ...fruitStems.map((f) => ({ at: f.at, end: f.c })),
  ];
  const uptake: Pt[][] = [];
  roots.forEach((root, i) => {
    const target = targets[(i * 3 + Math.floor(r() * targets.length)) % targets.length];
    const rootUp = [...root.pts].reverse();
    // Laterals join the tap root; follow the tap root up to the surface.
    const join = root.main ? [] : tap.slice(0, tap.findIndex((p) => p === root.pts[0]) + 1).reverse();
    uptake.push([...rootUp, ...join, ...stemPts.slice(0, target.at + 1), target.end]);
  });

  return {
    stem: path(stemPts),
    leaves: leaves.map(({ d, vein }) => ({ d, vein })),
    fruits,
    roots: roots.map((rt) => ({ d: path(rt.pts), main: rt.main })),
    uptake,
  };
}

export const plants: Plant[] = [
  plant(600, 148, false, 801),
  plant(870, 170, true, 802),
  plant(1130, 138, false, 803),
  plant(1390, 162, true, 804),
];

/** Highest point of the plants, to size the drawing. */
export const PLANT_TOP = -185;
