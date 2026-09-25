/**
 * Lints every post, draws its slides to 1080 x 1350 JPEGs in images/<id>/,
 * and writes the publisher's queue (posts.json) and the review page (UPNEXT.md).
 *
 *   node render.mjs            lint, render changed slides, write the queue
 *   node render.mjs --offline  skip the live help-article check
 *   node render.mjs --only 004 render just the posts whose id starts with 004
 *
 * Slides are only re-drawn when their SVG changed (render-cache.json), so a
 * run after a small edit is quick and the image history stays clean.
 */
import { mkdir, readFile, writeFile, rm } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { createHash } from 'node:crypto';
import path from 'node:path';
import { chromium } from 'playwright';
import { loadPosts, ROOT, REPO_RAW } from './lib/posts.mjs';
import { lint } from './lib/lint.mjs';
import { writeUpNext } from './lib/upnext.mjs';
import { orderQueue } from './lib/series.mjs';

const args = process.argv.slice(2);
const offline = args.includes('--offline');
const only = args.includes('--only') ? args[args.indexOf('--only') + 1] : null;

const PAGE = (svg) => `<!doctype html><html><head><meta charset="utf-8">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Figtree:wght@400;500;600;700&family=Fredoka:wght@500;600&display=swap">
<style>
html,body{margin:0;background:#2f3659}
svg{display:block}
.cap{font-family:Fredoka,Figtree,sans-serif;font-weight:600;fill:#fff;stroke:rgba(18,20,40,.55);stroke-width:7px;paint-order:stroke;stroke-linejoin:round}
.ui{font-family:Figtree,system-ui,sans-serif}
.fr{font-family:Fredoka,Figtree,sans-serif;font-weight:600}
</style></head><body>${svg.replace('<svg ', '<svg width="1080" height="1350" ')}</body></html>`;

const posts = await loadPosts();
const problems = await lint(posts, { online: !offline });
if (problems.length) {
  console.error('Fix these before rendering:\n  ' + problems.join('\n  '));
  process.exit(1);
}

const cachePath = path.join(ROOT, 'render-cache.json');
const cache = existsSync(cachePath) ? JSON.parse(await readFile(cachePath, 'utf8')) : {};
// Playwright's own Chromium (installed in CI by `npx playwright install chromium`),
// else an installed Chrome or Edge, so a local run needs no browser download.
async function launch() {
  for (const channel of ['chromium', 'chrome', 'msedge']) {
    try { return await chromium.launch({ channel }); } catch {}
  }
  throw new Error('No browser to draw with. Run: npx playwright install chromium');
}
const browser = await launch();
const page = await browser.newPage({ viewport: { width: 1080, height: 1350 }, deviceScaleFactor: 1 });
let drawn = 0;
for (const p of posts) {
  if (only && !p.id.startsWith(only)) continue;
  const dir = path.join(ROOT, 'images', p.id);
  await mkdir(dir, { recursive: true });
  for (const [i, svg] of p.slides.entries()) {
    const file = `images/${p.id}/${i + 1}.jpg`;
    const hash = createHash('sha1').update(svg).digest('hex');
    if (cache[file] === hash && existsSync(path.join(ROOT, file))) continue;
    await page.setContent(PAGE(svg), { waitUntil: 'networkidle' });
    await page.evaluate(async () => {
      await Promise.all(['600 30px Fredoka', '500 12px Figtree', '700 12px Figtree', '600 12px Figtree'].map((f) => document.fonts.load(f)));
      await document.fonts.ready;
    });
    await page.locator('svg').screenshot({ path: path.join(ROOT, file), type: 'jpeg', quality: 90 });
    cache[file] = hash;
    drawn++;
  }
  // Drop images left over from slides that were removed.
  for (let i = p.slides.length + 1; existsSync(path.join(dir, `${i}.jpg`)); i++) {
    await rm(path.join(dir, `${i}.jpg`));
    delete cache[`images/${p.id}/${i}.jpg`];
  }
}
await browser.close();
await writeFile(cachePath, JSON.stringify(cache, null, 1) + '\n');

// The publisher's queue, in posting order (lib/series.mjs interleaves the
// series). The publisher reads id, title, caption, media and hold.
const statePath = path.join(ROOT, 'published.json');
const state = existsSync(statePath) ? JSON.parse(await readFile(statePath, 'utf8')) : {};
const queue = orderQueue(posts, state).map((p) => ({
  id: p.id,
  title: p.title,
  series: p.series,
  ...(p.badge ? { badge: p.badge } : {}),
  ...(p.hold ? { hold: true } : {}),
  caption: p.caption,
  media: p.slides.map((_, i) => `${REPO_RAW}/images/${p.id}/${i + 1}.jpg`),
}));
await writeFile(path.join(ROOT, 'posts.json'), JSON.stringify(queue, null, 1) + '\n');
await writeUpNext();
console.log(`${posts.length} posts in the queue; ${drawn} slide${drawn === 1 ? '' : 's'} drawn.`);
