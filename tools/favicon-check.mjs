/**
 * Renders brand/slot-favicon.svg at its real sizes (16, 24, 32 px), then
 * shows them enlarged 8x with hard pixels, to judge what survives at
 * favicon size. Writes tools/favicon-check.png.
 */
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright';
import { ROOT } from '../lib/posts.mjs';

const svg = readFileSync(path.join(ROOT, 'brand', 'slot-favicon.svg'), 'utf8');
let browser;
for (const channel of ['chromium', 'chrome', 'msedge']) { try { browser = await chromium.launch({ channel }); break; } catch {} }
const page = await browser.newPage({ viewport: { width: 900, height: 320 } });
const sizes = [16, 24, 32];
const shots = [];
for (const s of sizes) {
  await page.setContent(`<body style="margin:0;background:#e3e6ef">${svg.replace('<svg ', `<svg width="${s}" height="${s}" `)}</body>`);
  shots.push((await page.locator('svg').screenshot({ omitBackground: false })).toString('base64'));
}
await page.setViewportSize({ width: 900, height: 320 });
await page.setContent(`<body style="margin:0;padding:24px;background:#e3e6ef;display:flex;gap:40px;align-items:flex-end;font:14px sans-serif">${
  shots.map((b, i) => `<div style="text-align:center"><img src="data:image/png;base64,${b}" style="width:${sizes[i] * 8}px;image-rendering:pixelated;display:block"><div>${sizes[i]}px</div></div>`).join('')
}</body>`);
await page.screenshot({ path: path.join(ROOT, 'tools', 'favicon-check.png') });
await browser.close();
console.log('tools/favicon-check.png');
