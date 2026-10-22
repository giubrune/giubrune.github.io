// Water content θ(x, z) on the soil-profile drawing, rendered at build time as a small PNG
// that the browser scales up smoothly. Illustrative values, not a simulation.
import { deflateSync } from 'node:zlib';
import { WIDTH, HEIGHT, WATER_TABLE, surface, boundary1, boundary2, wettingFront, wavy } from './soil-profile';
import { macropores, distanceToPolyline } from './soil-extras';

/** Residual and saturated water content, and initial saturation, per layer (illustrative). */
export const layers = [
  { name: 'topsoil', thetaR: 0.08, thetaS: 0.45, initial: 0.3 },
  { name: 'subsoil', thetaR: 0.1, thetaS: 0.48, initial: 0.42 },
  { name: 'sand', thetaR: 0.05, thetaS: 0.38, initial: 0.12 },
];
export const THETA_MIN = 0.05;
export const THETA_MAX = 0.48;

const layerAt = (x: number, z: number) => (z < boundary1(x) ? 0 : z < boundary2(x) ? 1 : 2);

/** Smooth step from 1 (above the front) to 0 (below it). */
const behind = (z: number, front: number, width = 3) => 0.5 * (1 - Math.tanh((z - front) / width));

/** Saturation before infiltration, with a capillary fringe above the water table. */
function initialSaturation(x: number, z: number) {
  const s0 = layers[layerAt(x, z)].initial;
  return s0 + (1 - s0) * Math.exp(-(WATER_TABLE - z) / 16);
}

/** Saturation behind a front: high at the surface, lower towards the front (by `drop`). */
function wetSaturation(x: number, z: number, front: number, drop = 0.13) {
  const top = surface(x);
  return 0.95 - drop * Math.min(1, (z - top) / Math.max(1, front - top));
}

/** Variant B: uniform infiltration with fingering in the sand. */
export function saturationB(x: number, z: number) {
  if (z >= WATER_TABLE) return 1;
  const s0 = initialSaturation(x, z);
  const front = wettingFront(x);
  return s0 + (Math.max(s0, wetSaturation(x, z, front, 0.4)) - s0) * behind(z, front);
}

/** Variant C: shallow matrix front, with water running down the macropores. */
const shallowFront = wavy(0, 10, 97);
export const matrixFrontC = (x: number) => surface(x) + 52 + shallowFront(x);

/** Part of the pore space filled by water infiltrated through the soil matrix (0–1). */
export function matrixWetC(x: number, z: number) {
  if (z >= WATER_TABLE) return 0;
  const s0 = layers[layerAt(x, z)].initial;
  const front = matrixFrontC(x);
  return Math.max(0, (wetSaturation(x, z, front) - s0) / (1 - s0)) * behind(z, front, 4);
}

/** Part of the pore space filled by water that ran down the macropores (0–1). */
export function macroWetC(x: number, z: number) {
  if (z >= WATER_TABLE) return 0;
  const front = matrixFrontC(x);
  let w = 0;
  for (const m of macropores) {
    if (m.tip[1] < front + 10) continue; // channels inside the wet zone add nothing
    if (Math.abs(x - m.tip[0]) > 60) continue;
    const d = distanceToPolyline(x, z, m.points);
    const halo = 4 + 0.035 * (z - surface(x));
    const along = 0.93 * Math.exp(-((d / halo) ** 2));
    const dt = Math.hypot(x - m.tip[0], z - m.tip[1]);
    const bulb = 0.9 * Math.exp(-((dt / 16) ** 2));
    w = Math.max(w, Math.max(along, bulb) * (z <= m.tip[1] + 2 ? 1 : 0.85));
  }
  return w;
}

/** Groundwater before any infiltration: capillary fringe above the water table (0–1). */
export function groundwaterWetC(x: number, z: number) {
  if (z >= WATER_TABLE) return 1;
  const s0 = layers[layerAt(x, z)].initial;
  return (initialSaturation(x, z) - s0) / (1 - s0);
}

export function theta(x: number, z: number, saturation: number) {
  const l = layers[layerAt(x, z)];
  return l.thetaR + (l.thetaS - l.thetaR) * saturation;
}

// ---------------------------------------------------------------------------
// Colour ramps
// ---------------------------------------------------------------------------

type RGB = [number, number, number];
export interface Stop {
  at: number;
  color: string;
}

const toRgb = (hex: string): RGB => [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16)) as RGB;

function ramp(stops: Stop[], t: number): RGB {
  const c = Math.max(0, Math.min(1, t));
  for (let i = 1; i < stops.length; i++) {
    if (c <= stops[i].at) {
      const a = stops[i - 1];
      const b = stops[i];
      const f = (c - a.at) / (b.at - a.at);
      const ca = toRgb(a.color);
      const cb = toRgb(b.color);
      return ca.map((v, k) => Math.round(v + (cb[k] - v) * f)) as RGB;
    }
  }
  return toRgb(stops[stops.length - 1].color);
}

/** θ colour scale for variant B, light and dark versions (dry → saturated). */
export const thetaRampLight: Stop[] = [
  { at: 0, color: '#f3ead3' },
  { at: 0.3, color: '#d6e4da' },
  { at: 0.55, color: '#86bfd8' },
  { at: 0.8, color: '#2f7fb5' },
  { at: 1, color: '#143d68' },
];
export const thetaRampDark: Stop[] = [
  { at: 0, color: '#1e2528' },
  { at: 0.3, color: '#23424c' },
  { at: 0.55, color: '#2b6f92' },
  { at: 0.8, color: '#55a8d6' },
  { at: 1, color: '#c2e6f7' },
];

/** Vivid water colour for the overlay in variant C (more water → deeper blue). */
export const vividRamp: Stop[] = [
  { at: 0, color: '#7fd0f5' },
  { at: 0.5, color: '#2a9ae0' },
  { at: 1, color: '#0b4c9c' },
];

/** CSS linear-gradient for a colour bar. */
export const cssGradient = (stops: Stop[]) =>
  `linear-gradient(to right, ${stops.map((s) => `${s.color} ${Math.round(s.at * 100)}%`).join(', ')})`;

// ---------------------------------------------------------------------------
// PNG output
// ---------------------------------------------------------------------------

const CRC_TABLE = Array.from({ length: 256 }, (_, n) => {
  let c = n;
  for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
  return c >>> 0;
});

function crc32(buf: Buffer) {
  let c = 0xffffffff;
  for (const b of buf) c = CRC_TABLE[(c ^ b) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}

function chunk(type: string, data: Buffer) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length);
  const body = Buffer.concat([Buffer.from(type, 'ascii'), data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(body));
  return Buffer.concat([len, body, crc]);
}

/** Encode RGBA pixels as a PNG data URI. */
function pngDataUri(w: number, h: number, pixel: (i: number, j: number) => [number, number, number, number]) {
  const raw = Buffer.alloc((w * 4 + 1) * h);
  for (let j = 0; j < h; j++) {
    raw[j * (w * 4 + 1)] = 0; // filter: none
    for (let i = 0; i < w; i++) {
      const [r, g, b, a] = pixel(i, j);
      const o = j * (w * 4 + 1) + 1 + i * 4;
      raw[o] = r;
      raw[o + 1] = g;
      raw[o + 2] = b;
      raw[o + 3] = a;
    }
  }
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(w, 0);
  ihdr.writeUInt32BE(h, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 6; // RGBA
  const png = Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk('IHDR', ihdr),
    chunk('IDAT', deflateSync(raw, { level: 9 })),
    chunk('IEND', Buffer.alloc(0)),
  ]);
  return `data:image/png;base64,${png.toString('base64')}`;
}

/** Field resolution: one pixel per CELL drawing units. */
const CELL = 5;
const COLS = WIDTH / CELL;
const ROWS = HEIGHT / CELL;
const at = (i: number, j: number) => [(i + 0.5) * CELL, (j + 0.5) * CELL] as const;

/** Variant B: θ as an opaque colour field (clip it to the ground when drawing). */
export function thetaImage(stops: Stop[]) {
  return pngDataUri(COLS, ROWS, (i, j) => {
    const [x, z] = at(i, j);
    const t = (theta(x, z, saturationB(x, z)) - THETA_MIN) / (THETA_MAX - THETA_MIN);
    return [...ramp(stops, t), 255];
  });
}

/**
 * Variant C: translucent water overlays; dry soil stays visible, wetter soil turns deeper blue.
 * Three layers so they can be revealed separately: groundwater (always there), matrix, macropores.
 * Clip to the ground when drawing.
 */
export function waterOverlayImage(part: 'groundwater' | 'matrix' | 'macropores') {
  const wetness = { groundwater: groundwaterWetC, matrix: matrixWetC, macropores: macroWetC }[part];
  return pngDataUri(COLS, ROWS, (i, j) => {
    const [x, z] = at(i, j);
    const wet = Math.min(1, wetness(x, z));
    if (wet <= 0.005) return [0, 0, 0, 0];
    const alpha = z >= WATER_TABLE ? 0.75 : 0.8 * wet ** 0.9;
    return [...ramp(vividRamp, 0.3 + 0.7 * wet), Math.round(alpha * 255)];
  });
}
