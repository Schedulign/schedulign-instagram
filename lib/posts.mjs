/**
 * Loads the post modules in content/posts, in file-name order. Each module
 * exports a function that takes the drawing kit (art/engine.mjs plus the
 * shared call to action) and returns { title, pillar, claims, caption,
 * slides, hold? }. A post's id is its file name without the extension.
 */
import { readdir } from 'node:fs/promises';
import { pathToFileURL, fileURLToPath } from 'node:url';
import path from 'node:path';
import * as engine from '../art/engine.mjs';

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
    posts.push({ id: f.replace(/\.mjs$/, ''), file: `content/posts/${f}`, ...mod.default(kit) });
  }
  return posts;
}
