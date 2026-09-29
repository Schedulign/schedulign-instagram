/**
 * What a post is, and the posting order (Sam, Sep 28 2026: the feed restarts
 * as standalone stories).
 *
 * Every story stands alone: one feature, told as a before and an after. The
 * same drawn faces come back, but nobody is named or introduced, and no post
 * leans on another, so any story can be held, skipped or reordered.
 */
export const SERIES = {
  hello: { name: 'Hello', claims: false, about: 'A short hello from Slot. Goes out first; pin it.' },
  story: { name: 'Stories', claims: true, about: 'One feature as a before and an after: the problem, the feature, the client’s side, how it ends.' },
};

export const seriesOf = (p) => p.series;

// The badge on slide 1 names the feature: the title up to its colon
// ("Waivers: signed before they arrive" → "Waivers"). A hello has none.
export const badgeOf = (p) => p.badge ?? (p.series === 'story' ? p.title?.split(':')[0].trim() : null);

/**
 * The posting order. Published posts keep their place in the order they went
 * out. Then any hello, then the stories in file order. Held posts wait at the end.
 */
export function orderQueue(posts, state = {}) {
  const done = posts.filter((p) => state[p.id]?.status === 'published').sort((a, b) => (state[a.id].at || '').localeCompare(state[b.id].at || ''));
  const waiting = posts.filter((p) => state[p.id]?.status !== 'published' && !p.hold);
  const held = posts.filter((p) => state[p.id]?.status !== 'published' && p.hold);
  const first = (p) => (p.series === 'hello' ? 0 : 1);
  return [...done, ...waiting.sort((a, b) => first(a) - first(b) || a.id.localeCompare(b.id)), ...held];
}
