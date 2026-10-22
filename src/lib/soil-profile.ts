// Geometry of the soil profile in the home-page hero. Computed at build time from fixed
// seeds, so the picture is identical on every build. Units are SVG user units;
// y grows downwards and y < surface is above ground.

export const WIDTH = 1600;
export const HEIGHT = 360;
export const SURFACE = 16;
export const WATER_TABLE = 326;

/** Small deterministic random number generator (mulberry32). */
export function rng(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export const round = (n: number) => Math.round(n * 10) / 10;

/** A gently undulating line: depth at x. */
export function wavy(base: number, amp: number, seed: number) {
  const r = rng(seed);
  const waves = [0, 1, 2].map(() => ({ len: 90 + r() * 260, phase: r() * Math.PI * 2, w: 0.3 + r() * 0.7 }));
  const total = waves.reduce((s, w) => s + w.w, 0);
  return (x: number) => base + (amp * waves.reduce((s, w) => s + w.w * Math.sin(x / w.len + w.phase), 0)) / total;
}

export const surface = wavy(SURFACE, 3, 11);
export const boundary1 = wavy(122, 9, 23); // topsoil → subsoil
export const boundary2 = wavy(222, 8, 37); // subsoil → sand

const XS = Array.from({ length: WIDTH / 20 + 1 }, (_, i) => i * 20);

/** SVG path along a line, left to right. */
function along(f: (x: number) => number) {
  return XS.map((x, i) => `${i ? 'L' : 'M'}${x} ${round(f(x))}`).join(' ');
}

/** Closed band between two lines. */
function band(top: (x: number) => number, bottom: (x: number) => number) {
  const back = [...XS].reverse().map((x) => `L${x} ${round(bottom(x))}`).join(' ');
  return `${along(top)} ${back} Z`;
}

const flat = (y: number) => () => y;

/** Fine roots: a few branching lines from the surface into the topsoil. */
function roots() {
  const r = rng(71);
  const out: { d: string; main: boolean }[] = [];
  const starts = [70, 205, 330, 520, 640, 790, 905, 1060, 1150, 1290, 1420, 1540];
  for (const x0 of starts) {
    let x = x0 + (r() - 0.5) * 20;
    let y = surface(x);
    const bottom = boundary1(x) - 14 - r() * 40;
    const pts: [number, number][] = [[x, y]];
    while (y < bottom) {
      y += 8 + r() * 6;
      x += (r() - 0.5) * 9;
      pts.push([x, y]);
      if (r() < 0.28) {
        const dir = r() < 0.5 ? -1 : 1;
        const len = 2 + Math.floor(r() * 3);
        const br: [number, number][] = [[x, y]];
        let bx = x;
        let by = y;
        for (let k = 0; k < len; k++) {
          bx += dir * (6 + r() * 8);
          by += 4 + r() * 6;
          br.push([bx, by]);
        }
        out.push({ d: br.map(([a, b], i) => `${i ? 'L' : 'M'}${round(a)} ${round(b)}`).join(' '), main: false });
      }
    }
    out.push({ d: pts.map(([a, b], i) => `${i ? 'L' : 'M'}${round(a)} ${round(b)}`).join(' '), main: true });
  }
  return out;
}

/** Grain positions for a pattern tile. */
function grains(seed: number, n: number, w: number, h: number, rMin: number, rMax: number) {
  const r = rng(seed);
  return Array.from({ length: n }, () => {
    const cx = round(r() * w);
    const cy = round(r() * h);
    const rx = round(rMin + r() * (rMax - rMin));
    return { cx, cy, rx, ry: round(rx * (0.65 + r() * 0.35)), rot: Math.round(r() * 180) };
  });
}

export const profile = {
  topsoil: band(surface, boundary1),
  subsoil: band(boundary1, boundary2),
  sand: band(boundary2, flat(WATER_TABLE)),
  ground: band(surface, flat(HEIGHT)),
  surfaceLine: along(surface),
  boundary1Line: along(boundary1),
  boundary2Line: along(boundary2),
  roots: roots(),
  tiles: {
    fine: { w: 120, h: 80, grains: grains(101, 46, 120, 80, 0.7, 1.5) },
    dense: { w: 60, h: 40, grains: grains(202, 44, 60, 40, 0.5, 0.85) },
    coarse: { w: 160, h: 100, grains: grains(303, 16, 160, 100, 3, 6.5) },
  },
};
