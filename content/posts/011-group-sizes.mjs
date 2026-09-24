// Spotlight: a price for every group size. Rosa, tutor.
// Claims: help/durations-and-pricing (smallest and largest group size; one price per group size and length; clients choose the size and name the others).
export default (k) => {
  const { svg, cap, T, person, slot, study, room, table, bubble, card, chip, btn, heldItem, phoneSlide, ROSA, STUDENT, KID, CLIENT1, LIME, NAVY, MUTED, CTA } = k;
  const cell = (x, y, v, on) => `<rect x="${x}" y="${y}" width="58" height="30" rx="8" fill="${on ? '#f5f9e3' : '#fff'}" stroke="${on ? LIME : '#dfe2ec'}" stroke-width="1.5"/>` + T(x + 29, y + 20, v, { size: 12.5, w: 700, a: 'middle' });
  return {
    title: 'Group sizes: one student or three',
    pillar: 'spotlight',
    claims: ['durations-and-pricing'],
    caption: `"Can two friends come too? Same price?"

Set the smallest and largest group you take, then give every group size and length its own price. Clients pick the size when they book and name everyone coming. A blank cell is simply not offered.

${CTA}

#schedulign #tutor #tutoringbusiness #privatetutor #bookingpage`,
    slides: [
      svg(study(true) + person({ x: 110, y: 394, s: 1, ...ROSA, arms: 'hips', face: 'surprised' })
        + person({ x: 240, y: 398, s: .7, ...STUDENT, arms: 'wave', face: 'grin' }) + person({ x: 290, y: 400, s: .66, ...KID, face: 'grin' }) + person({ x: 340, y: 398, s: .7, ...CLIENT1, face: 'grin' })
        + bubble(160, 60, 'can 2 friends come too?', { size: 14 })
        + cap('“Can two friends\ncome too?”'), 'Rosa surprised by three students at her door'),
      phoneSlide(room({ lamps: [], day: true, floorY: 420 }) + '<g data-floor="420"></g>',
        T(14, 44, 'Algebra help', { size: 10.5, c: MUTED }) + T(14, 68, 'Pricing', { size: 19, w: 700 })
        + T(14, 94, 'Group size 1 to 3', { size: 11, c: MUTED })
        + T(100, 118, '60 min', { size: 10.5, w: 700, c: MUTED }) + T(162, 118, '90 min', { size: 10.5, w: 700, c: MUTED, a: 'end' })
        + [['1 person', '$60', '$85'], ['2 people', '$90', '$125'], ['3 people', '$110', '$150']].map(([g, a, b], i) => T(14, 146 + i * 40, g, { size: 11.5, w: 600 }) + cell(70, 126 + i * 40, a, i === 2) + cell(132, 126 + i * 40, b, false)).join('')
        + btn(10, 296, 172, 'Save'),
        'Price every group size.', 'A pricing grid with a price per group size and length'),
      svg(room({ lamps: [200], day: true, win: { x: 40, y: 120, w: 100, h: 110, sky: 'day' } })
        + person({ x: 110, y: 392, s: 1, ...CLIENT1, arms: 'phone' })
        + card(170, 60, 212, 170) + T(186, 88, 'How many people?', { size: 14, w: 700 })
        + chip(186, 102, '1', false) + chip(244, 102, '2', false) + chip(302, 102, '3', true)
        + `<rect x="186" y="146" width="180" height="34" rx="9" fill="#f6f7fb"/>` + T(198, 168, '3 people · 60 min · $110', { size: 12, w: 600 })
        + btn(186, 188, 180, 'Continue')
        + slot(300, 392, .9)
        + cap('They pick the size\nwhen they book.'), 'A parent choosing three people on the booking page'),
      svg(study(true)
        + person({ x: 80, y: 372, s: .9, pose: 'sit', ...ROSA, arms: 'lift', face: 'grin' })
        + person({ x: 330, y: 374, s: .8, pose: 'sit', flip: true, ...STUDENT, arms: 'lift', face: 'grin' })
        + person({ x: 250, y: 374, s: .72, pose: 'sit', flip: true, ...KID, face: 'grin' })
        + person({ x: 170, y: 374, s: .76, pose: 'sit', ...CLIENT1, top: '#8e7cc3', face: 'grin' })
        + table(40, 340, 330) + `<path d="M180,340 l40,-10 l40,10 l-40,4z" fill="#f6f3ea"/>` + heldItem('mug', 100, 338)
        + cap('Three students.\nPriced right.'), 'Rosa tutoring three students at one table'),
    ],
  };
};
