// Story: getting paid. A trainer. A lead feature of the brand book (Sep 28 2026).
// Pillar: getting paid is part of it. Claims: help/payments (Online when booking through your own Stripe; Offline with your
// listed methods and Mark paid; tipping at checkout 10/15/20%; Schedulign adds nothing to Stripe's fee; payment mode per event).
export default (k) => {
  const { svg, cap, T, person, slot, room, gymBg, table, heldItem, card, chip, btn, radio, check, notice, bubble, phoneSlide, DEV, CLIENT3, LIME, NAVY, MUTED, CTA } = k;
  const row = (y, label, sub, on) => `<rect x="10" y="${y}" width="172" height="${sub ? 52 : 40}" rx="12" fill="${on ? '#f5f9e3' : '#fff'}" stroke="${on ? LIME : '#e1e4ee'}" stroke-width="${on ? 2 : 1.5}"/>` + radio(28, y + (sub ? 26 : 20), on)
    + T(44, y + (sub ? 22 : 24), label, { size: 12.5, w: 700 }) + (sub ? T(44, y + 39, sub, { size: 10, c: MUTED }) : '');
  return {
    title: 'Getting paid: paid when they book',
    series: 'story',
    claims: ['payments'],
    caption: `"I'll send it tonight." Then it's Friday, and you're matching payments to sessions.

Set a session to be paid online and clients pay by card when they book, through your own Stripe account. Add tipping at checkout if you like. Rather keep cash or Venmo? List the ways you take money and mark each session paid offline. You choose for each kind of session.

Card payments carry only Stripe's fee. Schedulign adds nothing on top.

${CTA}

#schedulign #personaltrainer #fitnessbusiness #smallbusinesstips #bookingpage`,
    slides: [
      svg(gymBg('day') + person({ x: 120, y: 394, s: 1.02, ...DEV, arms: 'phone', face: 'smile' })
        + person({ x: 290, y: 394, s: .92, flip: true, ...CLIENT3, arms: 'wave', face: 'grin' })
        + bubble(386, 108, 'venmo for today?', { me: true }) + bubble(196, 154, 'sending it tonight :)')
        + cap('Great session.\nThe payment? Later.'), 'The trainer asks for payment after a session and the client promises to send it tonight'),
      svg(room({ lamps: [200], wall: '#2b3154', win: { x: 282, y: 92, w: 96, h: 118, sky: 'night' } })
        + person({ x: 200, y: 360, s: 1, pose: 'sit', ...DEV, towel: null, top: '#3d4a7a', tank: false, sleeves: 'long', arms: 'lift', face: 'tired' })
        + table(70, 328, 260) + `<path d="M152,330 L162,282 L238,282 L248,330Z" fill="#c9ccd9"/>`
        + heldItem('mug', 292, 326) + `<rect x="92" y="316" width="44" height="12" rx="2" fill="#f3efe6" transform="rotate(-6 114 322)"/><rect x="100" y="306" width="40" height="12" rx="2" fill="#f6f3ea" transform="rotate(8 120 312)"/>`
        + cap('Friday night: matching\npayments to sessions.'), 'The trainer at the kitchen table late on Friday, matching payments to sessions'),
      phoneSlide(room({ lamps: [], day: true, floorY: 420 }) + '<g data-floor="420"></g>',
        T(14, 44, 'Strength session · 60 min', { size: 10.5, c: MUTED }) + T(14, 68, 'Payment', { size: 19, w: 700 })
        + row(80, 'They choose', 'Card or your offline ways', false)
        + row(140, 'Online when booking', 'Card, through your Stripe', true)
        + row(200, 'Offline', '', false)
        + check(24, 266, 7) + T(38, 270, 'Stripe connected', { size: 11, w: 600, c: '#4a4f70' })
        + btn(10, 296, 172, 'Save'),
        'Paid when they book.', 'The event’s Payment section set to Online when booking, with Stripe connected'),
      svg(room({ lamps: [200], day: true, win: { x: 40, y: 120, w: 100, h: 110, sky: 'day' } })
        + person({ x: 110, y: 392, s: 1, ...CLIENT3, arms: 'phone' })
        + card(170, 44, 212, 200) + T(186, 70, 'Strength session', { size: 14, w: 700 }) + T(366, 70, '$60', { size: 14, w: 700, a: 'end' })
        + T(186, 98, 'Add a tip', { size: 11, w: 600, c: '#4a4f70' })
        + chip(186, 106, '10%', false, 52) + chip(245, 106, '15%', true, 52) + chip(304, 106, '20%', false, 52)
        + `<path d="M186,152 h180" stroke="#e7e9f1"/>` + T(186, 176, 'Total', { size: 13, w: 700 }) + T(366, 176, '$69', { size: 13, w: 700, a: 'end' })
        + `<rect x="186" y="192" width="180" height="38" rx="11" fill="${LIME}"/>` + T(276, 216, 'Pay $69', { size: 13, w: 700, c: NAVY, a: 'middle' })
        + slot(300, 392, .9, { point: true })
        + cap('Card at booking.\nA tip if they like.'), 'A client paying by card at booking with a 15 percent tip'),
      svg(gymBg('day') + person({ x: 150, y: 394, s: 1.02, ...DEV, arms: 'flex', face: 'grin' })
        + notice(150, 26, 236, 'Paid · $69', 'Strength session · Thu 7am')
        + cap('Paid before the\nsession even starts.'), 'The trainer celebrating a session that was paid at booking'),
    ],
  };
};
