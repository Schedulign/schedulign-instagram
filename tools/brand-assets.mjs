/**
 * Builds the Schedulign logo files from one source of truth.
 *
 * The wordmark is outlined from Bricolage Grotesque ExtraBold (800) with
 * opentype.js, so the SVGs need no font. Slot stands on the stem of the
 * dotless i, placed from the glyph's own bounding box, so the i-dot sits
 * exactly on the letter at any size.
 *
 *   node tools/brand-assets.mjs            SVGs into brand/, PNGs and icons into brand/out/
 *
 * brand/out/ is then copied into the product (public/ and src/app/).
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import path from 'node:path';
import opentype from 'opentype.js';
import { chromium } from 'playwright';
import { ROOT } from '../lib/posts.mjs';

const NAVY = '#303159', LIME = '#b9d32c', INK = '#1f2238';
const FONTS = path.join(ROOT, 'node_modules', '@fontsource', 'bricolage-grotesque', 'files');
const load = (f) => { const b = readFileSync(path.join(FONTS, f)); return opentype.parse(b.buffer.slice(b.byteOffset, b.byteOffset + b.byteLength)); };
// The Latin subset carries every glyph the wordmark needs, the dotless i included.
const latin = load('bricolage-grotesque-latin-800-normal.woff');

const SIZE = 100;            // wordmark font size in SVG units
const TRACK = -0.02 * SIZE;  // letter-spacing −0.02em
const r = (n) => Math.round(n * 100) / 100;

/** Outlines a run of text; `swap` maps an index to a glyph from another font. Returns path data and each glyph's box. */
function outline(text, swap = {}) {
  let x = 0, d = '';
  const boxes = [];
  const chars = [...text];
  chars.forEach((ch, i) => {
    const font = swap[i] || latin;
    const glyph = font.charToGlyph(ch);
    const scale = SIZE / font.unitsPerEm;
    const p = glyph.getPath(x, 0, SIZE);
    d += p.toPathData(2);
    const bb = p.getBoundingBox();
    boxes.push({ ch, x1: bb.x1, x2: bb.x2, y1: bb.y1, y2: bb.y2 });
    let adv = glyph.advanceWidth * scale + TRACK;
    const next = chars[i + 1];
    if (next && font === latin && !swap[i + 1]) adv += font.getKerningValue(glyph, font.charToGlyph(next)) * scale;
    x += adv;
  });
  const all = boxes.reduce((a, b) => ({ x1: Math.min(a.x1, b.x1), x2: Math.max(a.x2, b.x2), y1: Math.min(a.y1, b.y1), y2: Math.max(a.y2, b.y2) }), { x1: Infinity, x2: -Infinity, y1: Infinity, y2: -Infinity });
  return { d, boxes, box: all };
}

/* ---------- Slot ---------- */
// The tile (app icon), the favicon reduction and the booked face come straight from brand/*.svg.
const inner = (f) => readFileSync(path.join(ROOT, 'brand', f), 'utf8').replace(/<svg[^>]*>/, '').replace(/<\/svg>\s*$/, '');

// The standing figure, in a box from (-36,-62) to (36,8): feet rest on y=7.
function figure({ mood = 'smile', arms = 'wave', topColor = NAVY } = {}) {
  const armL = arms === 'up' ? 'M-22,-26 Q-34,-36 -32,-52' : 'M-22,-26 Q-31,-19 -30,-10';
  const face = mood === 'booked'
    ? `<path d="M-12,-28 Q-8,-30.5 -4,-28" stroke="${INK}" stroke-width="2.2" fill="none" stroke-linecap="round"/><path d="M4,-28 Q8,-30.5 12,-28" stroke="${INK}" stroke-width="2.2" fill="none" stroke-linecap="round"/><path d="M-5,-18 L-1,-14 L6,-21" stroke="${NAVY}" stroke-width="2.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`
    : `<circle cx="-8" cy="-27" r="3.2" fill="${INK}"/><circle cx="8" cy="-27" r="3.2" fill="${INK}"/><circle cx="-7" cy="-28" r="1" fill="#fff"/><circle cx="9" cy="-28" r="1" fill="#fff"/><path d="M-6,-18 Q0,-12 6,-18" stroke="${INK}" stroke-width="2.4" fill="none" stroke-linecap="round"/>`;
  return `<path d="${armL}" stroke="${LIME}" stroke-width="6" fill="none" stroke-linecap="round"/>`
    + `<path d="M22,-26 Q34,-36 32,-52" stroke="${LIME}" stroke-width="6" fill="none" stroke-linecap="round"/>`
    + `<rect x="-24" y="-50" width="48" height="44" rx="12" fill="${LIME}"/>`
    + `<path d="M-24,-38 L-24,-40 Q-24,-50 -14,-50 L14,-50 Q24,-50 24,-40 L24,-38 Z" fill="${topColor}"/>`
    + `<rect x="-15" y="-58" width="6" height="13" rx="3" fill="${LIME}" stroke="${NAVY}" stroke-width="1.8"/><rect x="9" y="-58" width="6" height="13" rx="3" fill="${LIME}" stroke="${NAVY}" stroke-width="1.8"/>`
    + face
    + `<path d="M-6,-6 v8 M6,-6 v8" stroke="${LIME}" stroke-width="5" stroke-linecap="round"/><ellipse cx="-7" cy="4" rx="6" ry="3.2" fill="${NAVY}"/><ellipse cx="7" cy="4" rx="6" ry="3.2" fill="${NAVY}"/>`;
}

// Sitting on a ledge: legs dangle over the front from y=0 (the seat) down to about y=14.
function sitting() {
  return `<path d="M-22,-26 Q-34,-18 -26,-4" stroke="${LIME}" stroke-width="6" fill="none" stroke-linecap="round"/><circle cx="-26" cy="-3" r="4" fill="${LIME}"/>`
    + `<path d="M22,-26 Q34,-36 32,-52" stroke="${LIME}" stroke-width="6" fill="none" stroke-linecap="round"/>`
    + `<rect x="-24" y="-50" width="48" height="44" rx="12" fill="${LIME}"/>`
    + `<path d="M-24,-38 L-24,-40 Q-24,-50 -14,-50 L14,-50 Q24,-50 24,-40 L24,-38 Z" fill="${NAVY}"/>`
    + `<rect x="-15" y="-58" width="6" height="13" rx="3" fill="${LIME}" stroke="${NAVY}" stroke-width="1.8"/><rect x="9" y="-58" width="6" height="13" rx="3" fill="${LIME}" stroke="${NAVY}" stroke-width="1.8"/>`
    + `<circle cx="-8" cy="-27" r="3.2" fill="${INK}"/><circle cx="8" cy="-27" r="3.2" fill="${INK}"/><circle cx="-7" cy="-28" r="1" fill="#fff"/><circle cx="9" cy="-28" r="1" fill="#fff"/><path d="M-6,-18 Q0,-12 6,-18" stroke="${INK}" stroke-width="2.4" fill="none" stroke-linecap="round"/>`
    + `<path d="M-9,-7 q-2,9 1,15 M9,-7 q3,8 -1,15" stroke="${LIME}" stroke-width="5" fill="none" stroke-linecap="round"/><ellipse cx="-8" cy="9" rx="6" ry="3.2" fill="${NAVY}"/><ellipse cx="8" cy="9" rx="6" ry="3.2" fill="${NAVY}"/>`;
}

/* ---------- lockups ---------- */
const PAD = 4;
const svgDoc = (x1, y1, x2, y2, body, label) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${r(x1 - PAD)} ${r(y1 - PAD)} ${r(x2 - x1 + 2 * PAD)} ${r(y2 - y1 + 2 * PAD)}" role="img" aria-label="${label}">${body}</svg>\n`;

function idot({ mood = 'smile', arms = 'wave', color = NAVY, topColor = NAVY } = {}) {
  const w = outline('schedulıgn');
  const stem = w.boxes[7];
  // Nudged a little right so his waving arm clears the l beside the i.
  const cx = (stem.x1 + stem.x2) / 2 + 0.02 * SIZE;
  // Slot is 0.54em wide; his feet rest a hair above the stem's top.
  const k = (0.54 * SIZE) / 72;
  const feetY = stem.y1 - 0.035 * SIZE;
  const fig = `<g transform="translate(${r(cx)},${r(feetY - 7 * k)}) scale(${r(k * 1000) / 1000})">${figure({ mood, arms, topColor })}</g>`;
  const top = feetY - 7 * k - 62 * k;
  return svgDoc(Math.min(w.box.x1, cx - 36 * k), top, w.box.x2, w.box.y2, `<path d="${w.d}" fill="${color}"/>${fig}`, mood === 'booked' ? 'Schedulign, booked' : 'Schedulign');
}

function perch() {
  const w = outline('schedulign');
  const h = w.boxes[2];
  // Seated on the h's tall left stem (about 0.15em wide), not over its arch.
  const cx = h.x1 + 0.075 * SIZE;
  const k = (0.62 * SIZE) / 72;
  const seatY = h.y1 + 0.01 * SIZE;
  const fig = `<g transform="translate(${r(cx)},${r(seatY)}) scale(${r(k * 1000) / 1000})">${sitting()}</g>`;
  // The legs hang in front of the h, so the figure is drawn after the letters.
  return svgDoc(w.box.x1, seatY - 62 * k, w.box.x2, w.box.y2, `<path d="${w.d}" fill="${NAVY}"/>${fig}`, 'Schedulign');
}

function tileLockup(color = NAVY, top = NAVY) {
  const w = outline('schedulign');
  const cap = w.box.y2 - w.box.y1;
  const t = cap * 1.02;                       // the tile a little taller than the letters
  const ty = w.box.y2 - t, tx = w.box.x1 - t - 0.16 * SIZE;
  const tile = inner('slot-tile.svg').replace(`fill="${NAVY}"/>`, `fill="${top}"/>`);
  return svgDoc(tx, ty, w.box.x2, w.box.y2, `<g transform="translate(${r(tx)},${r(ty)}) scale(${r(t / 100 * 1000) / 1000})">${tile}</g><path d="${w.d}" fill="${color}"/>`, 'Schedulign');
}

const OUT = path.join(ROOT, 'brand');
const files = {
  'lockup-idot.svg': idot(),
  'lockup-idot-white.svg': idot({ color: '#ffffff', topColor: '#ffffff' }),
  'lockup-idot-booked.svg': idot({ mood: 'booked', arms: 'up' }),
  'lockup-perch.svg': perch(),
  'lockup-tile.svg': tileLockup(),
  'lockup-tile-white.svg': tileLockup('#ffffff', '#ffffff'),
  'wordmark.svg': (() => { const w = outline('schedulign'); return svgDoc(w.box.x1, w.box.y1, w.box.x2, w.box.y2, `<path d="${w.d}" fill="${NAVY}"/>`, 'Schedulign'); })(),
};
for (const [f, s] of Object.entries(files)) writeFileSync(path.join(OUT, f), s);

/* ---------- rasters and icons for the product ---------- */
const out = path.join(OUT, 'out');
mkdirSync(out, { recursive: true });
let browser;
for (const channel of ['chromium', 'chrome', 'msedge']) { try { browser = await chromium.launch({ channel }); break; } catch {} }
const page = await browser.newPage();
async function shot(html, w, h, file, transparent = false) {
  await page.setViewportSize({ width: w, height: h });
  await page.setContent(`<body style="margin:0">${html}</body>`);
  const buf = await page.locator('body > *').first().screenshot({ omitBackground: transparent, type: 'png' });
  if (file) writeFileSync(path.join(out, file), buf);
  return buf;
}
const box = (w, h, bg, content) => `<div style="width:${w}px;height:${h}px;background:${bg};display:flex;flex-direction:column;align-items:center;justify-content:center;gap:${Math.round(h * 0.05)}px">${content}</div>`;
const img = (svg, style) => `<img style="${style}" src="data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}">`;

const tileSvg = readFileSync(path.join(OUT, 'slot-tile.svg'), 'utf8');
const favSvg = readFileSync(path.join(OUT, 'slot-favicon.svg'), 'utf8');

await shot(box(512, 512, 'transparent', img(tileSvg, 'width:512px;height:512px')), 512, 512, 'logo-icon.png', true);
await shot(box(180, 180, '#dfe5f3', img(tileSvg, 'width:132px;height:132px')), 180, 180, 'apple-icon.png');
await shot(box(1200, 1200, '#ffffff', img(tileSvg, 'width:520px;height:520px') + img(files['wordmark.svg'], 'width:760px')), 1200, 1200, 'logo-full.png');
await shot(box(1200, 630, '#ffffff', img(files['lockup-idot.svg'], 'width:760px') + `<div style="font:500 34px system-ui,sans-serif;color:#5d6183">The booking page that runs your business</div>`), 1200, 630, 'logo-card.png');

// favicon.ico: PNG-in-ICO at 16, 32 and 48 px.
const sizes = [16, 32, 48];
const pngs = [];
for (const s of sizes) pngs.push(await shot(box(s, s, 'transparent', img(favSvg, `width:${s}px;height:${s}px`)), s, s, null, true));
const head = Buffer.alloc(6 + 16 * sizes.length);
head.writeUInt16LE(0, 0); head.writeUInt16LE(1, 2); head.writeUInt16LE(sizes.length, 4);
let offset = head.length;
sizes.forEach((s, i) => {
  const e = 6 + 16 * i;
  head.writeUInt8(s, e); head.writeUInt8(s, e + 1); head.writeUInt8(0, e + 2); head.writeUInt8(0, e + 3);
  head.writeUInt16LE(1, e + 4); head.writeUInt16LE(32, e + 6);
  head.writeUInt32LE(pngs[i].length, e + 8); head.writeUInt32LE(offset, e + 12);
  offset += pngs[i].length;
});
writeFileSync(path.join(out, 'favicon.ico'), Buffer.concat([head, ...pngs]));
writeFileSync(path.join(out, 'icon.svg'), favSvg);

// A proof sheet of every lockup at size, to check the placement by eye.
await shot(box(1400, 1100, '#ffffff',
  img(files['lockup-idot.svg'], 'height:150px') + img(files['lockup-idot-booked.svg'], 'height:150px') + img(files['lockup-perch.svg'], 'height:170px')
  + `<div style="display:flex;gap:40px;align-items:center">${img(files['lockup-tile.svg'], 'height:60px')}${img(files['lockup-idot.svg'], 'height:44px')}${img(files['lockup-tile.svg'], 'height:24px')}</div>`
  + `<div style="background:${NAVY};padding:20px 28px;border-radius:14px;display:flex;gap:40px;align-items:center">${img(files['lockup-idot-white.svg'], 'height:60px')}${img(files['lockup-tile-white.svg'], 'height:40px')}</div>`), 1400, 1100, 'proof.png');
await browser.close();
console.log('brand/*.svg and brand/out/ written');
