// Tip: what a no-show costs, and writing the policy first. Dev, trainer.
// Claims: help/cancellations-and-refunds (per-event online changes; written policy shown as a link clients accept).
export default (k) => {
  const { svg, cap, T, person, room, gymBg, table, heldItem, tipCard, slot, chip, phoneSlide, DEV, CLIENT3, LIME, NAVY, MUTED, CTA } = k;
  return {
    title: 'Tip: what a no-show really costs',
    pillar: 'tip',
    claims: ['cancellations-and-refunds'],
    caption: `A no-show costs more than one session.

Two a month at $60 is $1,440 a year. Work out your own number, then write your cancellation policy before the next one, not after.

Each event has its own cancellation settings: whether clients can cancel or reschedule online, and until when. Your written policy shows as a link clients accept before they book.

Save this for the next time someone ghosts your 6am.

#schedulign #personaltrainer #fitnessbusiness #smallbusinesstips #selfemployed`,
    slides: [
      svg(gymBg('dawn') + person({ x: 196, y: 394, s: 1.02, ...DEV, arms: 'hold', hold: 'clipboard', face: 'tired' })
        + cap('6:00am.\nNobody came.'), 'Dev alone in the gym at 6am'),
      svg(tipCard(['2 no-shows a month', '× $60 a session'], '$1,440', 'a year, gone', 'Example numbers. Run yours.')
        + slot(200, 432, 1.2, { mood: 'surprised' }), 'Two no-shows a month at $60 is $1,440 a year'),
      svg(room({ lamps: [200], wall: '#2b3154', win: { x: 282, y: 92, w: 96, h: 118, sky: 'night' } })
        + person({ x: 200, y: 360, s: 1, pose: 'sit', ...DEV, towel: null, top: '#3d4a7a', tank: false, sleeves: 'long', arms: 'lift' })
        + table(70, 328, 260) + `<path d="M152,330 L162,282 L238,282 L248,330Z" fill="#c9ccd9"/><circle cx="200" cy="306" r="5" fill="${LIME}"/>`
        + heldItem('mug', 292, 326) + `<rect x="96" y="318" width="34" height="10" rx="2" fill="#f3efe6" transform="rotate(-6 113 323)"/>`
        + cap('Write the policy\nbefore you need it.'), 'Dev at the kitchen table at night, writing a cancellation policy'),
      phoneSlide(room({ lamps: [], day: true, floorY: 420 }) + '<g data-floor="420"></g>',
        T(14, 50, 'Strength session', { size: 17, w: 700 }) + T(14, 68, '60 min · $60', { size: 11, c: MUTED })
        + T(14, 96, 'Thursday', { size: 12, w: 700 }) + chip(10, 106, '6:00', false) + chip(68, 106, '7:00', true) + chip(126, 106, '8:00', false)
        + `<rect x="10" y="148" width="172" height="50" rx="10" fill="#f4f6fb"/>` + T(20, 168, 'Cancel online up to 1 day', { size: 11, c: '#3a3f5e' }) + T(20, 184, 'before the start.', { size: 11, c: '#3a3f5e' })
        + T(14, 222, 'Cancellation, No-Show', { size: 11.5, w: 700, c: '#3f6cf0' }) + T(14, 238, '& Refund Policy', { size: 11.5, w: 700, c: '#3f6cf0' })
        + `<path d="M14,242 h96" stroke="#3f6cf0" stroke-width="1.2"/>`
        + `<rect x="10" y="296" width="172" height="38" rx="12" fill="${LIME}"/>` + T(96, 320, 'Book 7:00am', { size: 13, w: 700, c: NAVY, a: 'middle' }),
        'Clients see it\nbefore they book.', 'The booking page with the online-change rules and the policy link'),
      svg(gymBg('day') + person({ x: 108, y: 394, s: 1.02, ...DEV, arms: 'hips', face: 'grin' })
        + person({ x: 240, y: 394, s: .95, ...CLIENT3, arms: 'lift', hold: 'kettlebell', face: 'grin' })
        + cap('6:00am.\nBoth here.'), 'Dev and a client training at 6am'),
    ],
  };
};
