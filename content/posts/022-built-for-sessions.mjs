// Intro: built for sessions, not meetings. The positioning in one scroll; pin it.
// Pillars: made for sessions (all four shown). Claims: help/locations (client provides / place kept off the page until booking),
// help/durations-and-pricing (a price per group size and length; peak windows), help/booking-form-and-waivers (typed e-signature
// while booking), help/openings-alerts-and-waitlists (freed time held for the first in line), help/plans-and-billing (Free has everything in Pro).
export default (k) => {
  const { svg, cap, T, person, slot, card, titleCard, diagramBg, flowCard, outdoor, house, car, sparkle, gymBg, priceRow, salon, salonChair, bars, check, JONAH, CLIENT2, CLIENT3, DEV, MAYA, CLIENT1, LIME, NAVY, MUTED, INK, CTA } = k;
  const need = (x, title, items, tone) => card(x, 64, 170, 64 + items.length * 34) + T(x + 16, 94, title, { size: 14, w: 700 })
    + items.map((t, i) => `<rect x="${x + 14}" y="${110 + i * 34}" width="142" height="26" rx="8" fill="${tone === 'session' ? '#f5f9e3' : '#f1f2f6'}" stroke="${tone === 'session' ? LIME : '#dfe2ec'}" stroke-width="1.5"/>` + T(x + 26, 127.5 + i * 34, t, { size: 12, w: 600, c: tone === 'session' ? INK : '#8a8fa8' })).join('');
  return {
    title: 'Built for sessions, not meetings',
    series: 'intro',
    claims: ['locations', 'durations-and-pricing', 'booking-form-and-waivers', 'openings-alerts-and-waitlists', 'plans-and-billing'],
    caption: `Meeting tools handle the work around meetings. Schedulign runs the business around your sessions.

A meeting needs a time and a link. A session needs more: a place, sometimes one that stays private until someone books. A price that changes with the group or the hour. A waiver. Getting paid. And a calendar that does not stay empty when someone cancels.

That is what Schedulign is built for, and every plan has all of it.

${CTA}

#schedulign #bookingpage #smallbusinessowner #selfemployed #solopreneur`,
    slides: [
      svg(titleCard(['Built for sessions,', 'not meetings.'], { sub: 'Here’s the difference' }), 'Built for sessions, not meetings'),
      svg(diagramBg() + need(22, 'A meeting needs', ['A time', 'A video link'], 'meeting') + need(208, 'A session needs', ['A time', 'A place', 'A price', 'A waiver', 'Getting paid', 'A full calendar'], 'session')
        + slot(110, 400, 1.2, { point: true })
        + cap('A meeting needs a time.\nA session needs more.'), 'A meeting needs a time and a link; a session needs a place, a price, a waiver, payment and a full calendar'),
      svg(outdoor('day') + `<rect y="352" width="400" height="148" fill="#6fa06a"/><path d="M150,352 L400,352 L400,500 L60,500Z" fill="#a9adbd"/>`
        + house(186, 352, 214, 150, '#8fb3d9', { num: '42', day: true }) + person({ x: 293, y: 352, s: .62, ...CLIENT2, arms: 'wave', face: 'grin' })
        + car(6, 440) + sparkle(60, 360, 9) + sparkle(250, 410, 6, LIME)
        + person({ x: 334, y: 456, s: .92, flip: true, ...JONAH, arms: 'work', hold: 'sponge', face: 'grin' })
        + card(16, 50, 220, 70) + T(32, 76, 'Location', { size: 11, w: 700, c: MUTED }) + T(32, 98, 'Their address, typed at booking', { size: 12.5, w: 600 })
        + cap('The place,\non your terms.', 476), 'Jonah at a client’s house, with the address the client gave at booking'),
      svg(gymBg('day') + person({ x: 110, y: 394, s: 1.02, ...DEV, arms: 'hips', face: 'grin' })
        + card(190, 56, 194, 150) + T(206, 82, 'Strength session', { size: 13, w: 700 })
        + priceRow(206, 94, 162, '1 person', '$60') + priceRow(206, 128, 162, '3 people', '$110') + priceRow(206, 162, 162, 'Sat 9am', '$72', 'peak')
        + cap('A price for every\ngroup and hour.'), 'Dev with prices for one person, three people and a Saturday peak'),
      svg(gymBg('day') + person({ x: 112, y: 394, s: 1, ...CLIENT3, arms: 'phone' })
        + card(176, 60, 206, 160) + T(192, 86, 'Liability waiver', { size: 14, w: 700 }) + bars(192, 98, 3, 170)
        + `<rect x="192" y="134" width="174" height="34" rx="9" fill="#f6f7fb" stroke="#dfe2ec"/><text x="204" y="157" font-size="17" fill="${INK}" font-style="italic" font-family="Georgia,serif">Alex Kim</text>`
        + check(204, 196, 8) + T(218, 200, 'Signed while booking', { size: 11.5, w: 600 })
        + cap('The waiver, signed\nwhile they book.'), 'A client signing a waiver during booking'),
      svg(salon() + salonChair(180, 318) + person({ x: 176, y: 318, s: .92, pose: 'sit', ...CLIENT1, top: '#aab0c6', face: 'grin' })
        + person({ x: 84, y: 392, s: 1.02, ...MAYA, arms: 'cut', hold: 'scissors', face: 'grin' })
        + card(214, 150, 172, 70) + T(228, 176, 'Canceled time', { size: 11, w: 700, c: MUTED }) + T(228, 198, 'Held for the waitlist', { size: 12.5, w: 600 })
        + cap('Canceled times go to\nthe waitlist first.'), 'Maya’s chair filled from the waitlist after a cancellation'),
      svg(titleCard(['Your booking page,', 'free during', 'early access.'], { sub: 'Link in bio · schedulign.com' }), 'Your booking page, free during early access'),
    ],
  };
};
