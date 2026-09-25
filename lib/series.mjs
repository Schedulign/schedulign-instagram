/**
 * The series that run side by side in the feed, and the weekly pattern that
 * interleaves them. A post names its series (`series:` in its file); older
 * posts map from their `pillar`.
 *
 * Episodes are standalone: each one is a complete moment in a recurring
 * character's work, never "Part 2 of 5", so any episode can be held,
 * skipped or reordered without leaving a story hanging.
 */
export const SERIES = {
  intro: { name: 'Intro', label: 'Meet Schedulign', claims: false, about: 'What Schedulign is, who it is for, how a booking works, the cast. Goes out first and comes back now and then.' },
  spotlight: { name: 'Spotlights', label: 'Feature spotlight', claims: true, about: 'A problem, the feature that fixes it, what the client sees, the happy ending.' },
  hood: { name: 'Under the hood', label: 'Under the hood', claims: true, about: 'How something actually works, step by step, drawn as a diagram.' },
  episode: { name: 'Episodes', label: null, claims: false, about: 'A standalone moment from a recurring character’s work. The post sets its own badge, e.g. "Jonah’s first month".' },
  everyday: { name: 'Before/after and tips', label: null, claims: false, about: 'Before/after posts and tips: relatable or saveable.' },
};

const FROM_PILLAR = { spotlight: 'spotlight', tip: 'everyday', 'before-after': 'everyday' };
export const seriesOf = (p) => p.series || FROM_PILLAR[p.pillar];

// One week, Monday to Sunday. Every intro post goes out before the pattern starts.
export const WEEK = ['spotlight', 'hood', 'episode', 'spotlight', 'everyday', 'episode', 'spotlight'];
// When a slot's series has nothing left, the next series in this list fills it.
const FALLBACK = ['spotlight', 'everyday', 'hood', 'episode', 'intro'];

/**
 * The posting order. Published posts keep their place in the order they went
 * out. The rest go intro first, then by the weekly pattern, continuing from
 * where the pattern left off. Held posts wait at the end.
 */
export function orderQueue(posts, state = {}) {
  const done = posts.filter((p) => state[p.id]?.status === 'published').sort((a, b) => (state[a.id].at || '').localeCompare(state[b.id].at || ''));
  const waiting = posts.filter((p) => state[p.id]?.status !== 'published');
  const held = waiting.filter((p) => p.hold);
  const lanes = {};
  for (const p of waiting.filter((x) => !x.hold)) (lanes[seriesOf(p)] ||= []).push(p);
  const order = [...(lanes.intro || [])];
  lanes.intro = [];
  let slot = done.filter((p) => seriesOf(p) !== 'intro').length;
  const left = () => Object.values(lanes).some((l) => l.length);
  while (left()) {
    const want = WEEK[slot % WEEK.length];
    const lane = lanes[want]?.length ? want : FALLBACK.find((s) => lanes[s]?.length);
    order.push(lanes[lane].shift());
    slot++;
  }
  return [...done, ...order, ...held];
}
