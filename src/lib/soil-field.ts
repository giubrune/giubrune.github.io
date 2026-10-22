// Water in the hero soil profile, rendered at build time as a small translucent PNG that
// the browser scales up smoothly: a shallow infiltration front, water that has run down
// the macropores and wetted the soil around them, and the capillary fringe above the
// water table. Illustrative, not a simulation.
import { deflateSync } from 'node:zlib';
import { WIDTH, HEIGHT, WATER_TABLE, surface, boundary1, boundary2, wavy } from './soil-profile';
import { macropores, distanceToPolyline } from './soil-extras';

/** Initial saturation per layer (topsoil, subsoil, sand). */
const INITIAL = [0.3, 0.42, 0.12];
const layerAt = (x: number, z: number) => (z < boundary1(x) ? 0 : z < boundary2(x) ? 1 : 2);

/** Smooth step from 1 (above the front) to 0 (below it). */
const behind = (z: number, front: number, width: number) => 0.5 * (1 - Math.tanh((z - front) / width));

const frontWobble = wavy(0, 10, 97);
/** Depth of the infiltration front through the soil matrix. */
export const matrixFront = (x: number) => surface(x) + 52 + frontWobble(x);

/** How wet the soil is above its initial state, 0 (initial) to 1 (saturated). */
function wetness(x: number, z: number) {
  if (z >= WATER_TABLE) return 1;
  const s0 = INITIAL[layerAt(x, z)];
  const front = matrixFront(x);
  const top = surface(x);
  // Matrix: wettest at the surface, a little less towards the front.
  const sWet = 0.95 - 0.13 * Math.min(1, (z - top) / Math.max(1, front - top));
  let w = Math.max(0, (sWet - s0) / (1 - s0)) * behind(z, front, 4);
  // Capillary fringe above the water table.
  w = Math.max(w, Math.exp(-(WATER_TABLE - z) / 16));
  // Macropores below the front, with a wet halo and a wet bulb at the tip.
  for (const m of macropores) {
    if (m.tip[1] < front + 10 || Math.abs(x - m.tip[0]) > 60) continue;
    const d = distanceToPolyline(x, z, m.points);
    const halo = 4 + 0.035 * (z - top);
    const alongChannel = 0.93 * Math.exp(-((d / halo) ** 2));
    const bulb = 0.9 * Math.exp(-((Math.hypot(x - m.tip[0], z - m.tip[1]) / 16) ** 2));
    w = Math.max(w, Math.max(alongChannel, bulb) * (z <= m.tip[1] + 2 ? 1 : 0.85));
  }
  return Math.min(1, w);
}

// ---------------------------------------------------------------------------
// Colour and PNG output
// ---------------------------------------------------------------------------

/** From light water (just wetted) to pore-water blue (saturated). */
const LIGHT = [143, 194, 224];
const DEEP = [31, 81, 112];

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

/** One pixel per CELL drawing units. */
const CELL = 5;

/** The water overlay as a PNG data URI (clip it to the ground when drawing). */
export function waterImage() {
  const w = WIDTH / CELL;
  const h = HEIGHT / CELL;
  const raw = Buffer.alloc((w * 4 + 1) * h);
  for (let j = 0; j < h; j++) {
    for (let i = 0; i < w; i++) {
      const x = (i + 0.5) * CELL;
      const z = (j + 0.5) * CELL;
      const wet = wetness(x, z);
      const o = j * (w * 4 + 1) + 1 + i * 4;
      for (let k = 0; k < 3; k++) raw[o + k] = Math.round(LIGHT[k] + (DEEP[k] - LIGHT[k]) * wet);
      raw[o + 3] = Math.round(255 * (z >= WATER_TABLE ? 0.7 : 0.62 * wet ** 0.9));
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
