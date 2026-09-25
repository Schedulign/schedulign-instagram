/**
 * Loads the post modules in content/posts, in file-name order. Each module
 * exports a function that takes the drawing kit (art/engine.mjs plus the
 * shared call to action) and returns { title, series (or pillar), claims,
 * caption, slides, badge?, hold? }. A post's id is its file name without the
 * extension. The file number only orders posts within their series; the
 * posting order across series comes from lib/series.mjs.
 *
 * The series badge ("Under the hood", "Jonah's first month", ...) is drawn
 * onto the first slide here, so every consumer sees the same slides.
 */
import { readdir } from 'node:fs/promises';
import { pathToFileURL, fileURLToPath } from 'node:url';
import path from 'node:path';
import * as engine from '../art/engine.mjs';
import { SERIES, seriesOf } from './series.mjs';

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
export const REPO_RAW = 'https://raw.githubusercontent.com/Schedulign/schedulign-instagram/main';
export const CTA = 'Early access is open and every plan is $0 while it runs. Link in bio: schedulign.com';

export async function loadPosts() {
  const dir = path.join(ROOT, 'content', 'posts');
  const files = (await readdir(dir)).filter((f) => /^\d{3}-.+\.mjs$/.test(f)).sort();
  const kit = { ...engine, CTA };
  const posts = [];
  for (const f of files) {
    const mod = await import(pathToFileURL(path.join(dir, f)).href);
    const p = { id: f.replace(/\.mjs$/, ''), file: `content/posts/${f}`, ...mod.default(kit) };
    p.series = seriesOf(p);
    const label = p.badge ?? SERIES[p.series]?.label;
    if (label && p.slides?.length) p.slides = [p.slides[0].replace(/<\/svg>\s*$/, engine.badge(label) + '</svg>'), ...p.slides.slice(1)];
    posts.push(p);
  }
  return posts;
}
