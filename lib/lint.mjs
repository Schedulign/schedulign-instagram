/**
 * The copy and truth rules every post must pass before it is rendered.
 *
 * - Never "coach" or "coaching" (the audience is anyone who sells their time).
 * - The product never says "we", "our" or "us".
 * - No exclamation marks.
 * - Every claim names a help article that is live at schedulign.com/help/<slug>,
 *   so nothing is advertised that the product does not do.
 * - Stories stand alone: the drawn faces are never named, and no post counts
 *   itself ("Part 2", "Episode 3", "Day 1", "2/5").
 * - Instagram limits: caption under 2,200 characters, 30 hashtags, 10 slides.
 */
import { SERIES } from './series.mjs';

const HELP = 'https://www.schedulign.com/help/';

// The drawn faces were once a named cast (Sam, Sep 28 2026: same faces, never named).
const CAST = /\b(Maya|Jonah|Dev|Rosa|Priya)\b/;

const textOf = (svg) => svg.replace(/<[^>]+>/g, ' ').replace(/&[a-z]+;/g, ' ').replace(/\s+/g, ' ');

export async function lint(posts, { online = true } = {}) {
  const problems = [];
  const say = (p, msg) => problems.push(`${p.id}: ${msg}`);
  const headlines = new Map();
  const slugs = new Set(posts.flatMap((p) => p.claims || []));
  const live = new Map();
  if (online) {
    await Promise.all([...slugs].map(async (s) => {
      try { live.set(s, (await fetch(HELP + s, { method: 'HEAD' })).status); } catch { live.set(s, 'unreachable'); }
    }));
  }
  for (const p of posts) {
    for (const f of ['title', 'series', 'caption', 'slides']) if (!p[f]) say(p, `missing ${f}`);
    if (!p.slides?.length || p.slides.length > 10) say(p, `needs 1 to 10 slides, has ${p.slides?.length}`);
    const words = [p.caption, ...(p.slides || []).map(textOf)].join('\n');
    if (/\bcoach(es|ing|ed)?\b/i.test(words)) say(p, 'says "coach"');
    if (/\b(we|we're|we've|our|ours|us)\b/i.test(words)) say(p, `says "${words.match(/\b(we|we're|we've|our|ours|us)\b/i)[0]}" (the product never says we)`);
    if (/!/.test(p.caption) || (p.slides || []).some((s) => /!/.test(textOf(s)))) say(p, 'has an exclamation mark');
    if (p.caption.length > 2200) say(p, `caption is ${p.caption.length} characters (max 2,200)`);
    const tags = p.caption.match(/#\w+/g) || [];
    if (tags.length > 30) say(p, `${tags.length} hashtags (max 30)`);
    if (!tags.includes('#schedulign')) say(p, 'missing #schedulign');
    const head = p.caption.split('\n')[0];
    if (headlines.has(head)) say(p, `first caption line repeats ${headlines.get(head)}; the publisher uses it to spot duplicates`);
    headlines.set(head, p.id);
    if (!SERIES[p.series]) say(p, `unknown series "${p.series}" (see lib/series.mjs)`);
    else if (SERIES[p.series].claims && !p.claims?.length) say(p, `a story must name the help article behind its claims`);
    if (p.series === 'story' && !/^[^:]+: /.test(p.title || '')) say(p, 'a story title starts with its feature and a colon, e.g. "Waivers: …" (the badge on slide 1)');
    const cast = [p.title, words].join('\n').match(CAST) || p.slides?.map((s) => s.match(/aria-label="[^"]*"/)?.[0] || '').join(' ').match(CAST);
    if (cast) say(p, `names "${cast[0]}"; the faces are never named`);
    // Nothing counts itself, so nobody feels they have to go back and catch up.
    const count = words.match(/\b(part|episode|ep|chapter)\.?\s*#?\d+\b|\bpart \d+ of \d+\b/i);
    if (count) say(p, `posts stand alone ("${count[0].trim()}")`);
    for (const s of p.claims || []) if (online && live.get(s) !== 200) say(p, `claim "${s}" is not a live help article (${live.get(s)})`);
    for (const [i, s] of (p.slides || []).entries()) if (/undefined|NaN/.test(s)) say(p, `slide ${i + 1} has undefined or NaN in its drawing`);
  }
  return problems;
}
