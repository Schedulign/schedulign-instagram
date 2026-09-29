/**
 * Loads the post modules in content/posts, in file-name order. Each module
 * exports a function that takes the drawing kit (art/engine.mjs plus the
 * shared call to action) and returns { title, series ('hello' or 'story'),
 * claims, caption, slides, hold? }. A post's id is its file name without the
 * extension; the file number is the posting order (lib/series.mjs).
 *
 * A story's feature badge ("Waivers", "Reminders", ...) is drawn onto the
 * first slide here, so every consumer sees the same slides.
 */
import { readdir } from 'node:fs/promises';
import { pathToFileURL, fileURLToPath } from 'node:url';
import path from 'node:path';
import * as engine from '../art/engine.mjs';
import { badgeOf } from './series.mjs';

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
export const REPO_RAW = 'https://raw.githubusercontent.com/Schedulign/schedulign-instagram/main';
// Value first, price later (Sam, Sep 28 2026): the call to action names the
// takeaway (the page takes the admin off you), not the price.
export const CTA = 'Hand the admin to your booking page. Link in bio: schedulign.com';

export async function loadPosts() {
  const dir = path.join(ROOT, 'content', 'posts');
  const files = (await readdir(dir)).filter((f) => /^\d{3}-.+\.mjs$/.test(f)).sort();
  const kit = { ...engine, CTA };
  const posts = [];
  for (const f of files) {
    const mod = await import(pathToFileURL(path.join(dir, f)).href);
    engine.resetIds();
    const p = { id: f.replace(/\.mjs$/, ''), file: `content/posts/${f}`, ...mod.default(kit) };
    const label = badgeOf(p);
    if (label) p.badge = label;
    if (label && p.slides?.length) p.slides = [p.slides[0].replace(/<\/svg>\s*$/, engine.badge(label) + '</svg>'), ...p.slides.slice(1)];
    posts.push(p);
  }
  return posts;
}
