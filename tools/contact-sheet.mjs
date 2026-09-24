/**
 * Draws every rendered slide onto contact sheets (one row per post) so the
 * whole queue can be reviewed at a glance: tools/sheets/sheet-1.jpg, ...
 *
 *   node tools/contact-sheet.mjs            all posts, 7 per sheet
 *   node tools/contact-sheet.mjs 008 009    only posts whose ids start with these
 */
import { readdir, mkdir } from 'node:fs/promises';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright';
import { ROOT } from '../lib/posts.mjs';

const filters = process.argv.slice(2);
const ids = (await readdir(path.join(ROOT, 'images'))).sort().filter((id) => !filters.length || filters.some((f) => id.startsWith(f)));
const out = path.join(ROOT, 'tools', 'sheets');
await mkdir(out, { recursive: true });

let browser;
for (const channel of ['chromium', 'chrome', 'msedge']) { try { browser = await chromium.launch({ channel }); break; } catch {} }
const page = await browser.newPage({ viewport: { width: 1400, height: 900 } });
for (let s = 0; s * 7 < ids.length; s++) {
  const rows = ids.slice(s * 7, s * 7 + 7).map((id) => {
    const imgs = [];
    // Inline as data URIs: a page set with setContent may not load file:// images.
    for (let i = 1; existsSync(path.join(ROOT, 'images', id, `${i}.jpg`)); i++) imgs.push('data:image/jpeg;base64,' + readFileSync(path.join(ROOT, 'images', id, `${i}.jpg`)).toString('base64'));
    return `<div class="row"><b>${id}</b>${imgs.map((u) => `<img src="${u}">`).join('')}</div>`;
  }).join('');
  await page.setContent(`<style>body{margin:0;background:#222;font:14px sans-serif;color:#fff}.row{display:flex;gap:6px;align-items:center;padding:6px}.row b{width:120px}img{width:200px}</style>${rows}`);
  await page.waitForLoadState('networkidle');
  await page.screenshot({ path: path.join(out, `sheet-${s + 1}.jpg`), fullPage: true, type: 'jpeg', quality: 80 });
}
await browser.close();
console.log(`Contact sheets in tools/sheets for ${ids.length} posts.`);
