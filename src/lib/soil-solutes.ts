// Solute in the hero: small particles of a dissolved substance carried by the water.
// Behind the infiltration front in the soil matrix, deeper along the macropores, and
// taken up by the plants into stems, leaves and fruits. Static positions, build time.
import { rng, round, surface } from './soil-profile';
import { macropores } from './soil-extras';
import { matrixFront } from './soil-field';
import { plants, type Pt } from './soil-plants';

const r = rng(907);
const out: { x: number; y: number; inPlant: boolean }[] = [];

/** Point at a fraction f of a polyline's length. */
function pointAt(pts: Pt[], f: number): Pt {
  const seg = pts.slice(1).map((p, i) => Math.hypot(p[0] - pts[i][0], p[1] - pts[i][1]));
  let left = seg.reduce((a, b) => a + b, 0) * f;
  for (let i = 0; i < seg.length; i++) {
    if (left <= seg[i]) {
      const k = seg[i] ? left / seg[i] : 0;
      return [pts[i][0] + (pts[i + 1][0] - pts[i][0]) * k, pts[i][1] + (pts[i + 1][1] - pts[i][1]) * k];
    }
    left -= seg[i];
  }
  return pts[pts.length - 1];
}

// Soil matrix: behind the front, denser near the surface.
for (let i = 0; i < 75; i++) {
  const x = 10 + r() * 1580;
  const top = surface(x);
  const reach = matrixFront(x) - 18 - top;
  out.push({ x, y: top + 4 + reach * r() ** 1.4, inPlant: false });
}

// Macropores that reach below the front: a few particles along each.
for (const m of macropores) {
  if (m.tip[1] < matrixFront(m.tip[0]) + 10) continue;
  for (let k = 0; k < 3; k++) {
    const [x, y] = pointAt(m.points, 0.4 + r() * 0.55);
    out.push({ x: x + (r() - 0.5) * 6, y, inPlant: false });
  }
}

// Plants: near the end of some uptake routes (upper stem, leaves, fruits).
for (const p of plants) {
  p.uptake.forEach((route, i) => {
    if (i % 2) return;
    const [x, y] = pointAt(route, 0.9 + r() * 0.1);
    out.push({ x, y, inPlant: true });
  });
}

export const solutes = out.map((s) => ({ cx: round(s.x), cy: round(s.y), inPlant: s.inPlant }));
