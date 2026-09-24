// Spotlight: day waitlists and held times. Maya, stylist.
// Claims: help/openings-alerts-and-waitlists (Join the waitlist on a full day; the first in line has a freed time held for two hours with a claim link; per-event switch).
export default (k) => {
  const { svg, cap, T, person, slot, living, livingDay, salon, salonChair, clock, card, btn, week, MAYA, CLIENT1, LIME, NAVY, MUTED, CTA } = k;
  return {
    title: 'Waitlists: a freed time, held for them',
    pillar: 'spotlight',
    claims: ['openings-alerts-and-waitlists'],
    caption: `"Anything open Thursday?" is a question your booking page can answer.

Turn on openings and waitlist alerts and a full day offers "Join the waitlist". When a time frees up, the first person in line has it held for two hours, with a link to claim it. If they pass, it goes to the next.

${CTA}

#schedulign #hairstylist #salonowner #behindthechair #bookingpage`,
    slides: [
      svg(living()
        + person({ x: 118, y: 344, s: .9, pose: 'sit', ...CLIENT1, arms: 'phone', face: 'sad' })
        + card(160, 62, 222, 120) + T(176, 88, 'Cuts with Maya', { size: 14, w: 700 }) + week(176, 104, 'Thu') + T(176, 166, 'Thursday is full', { size: 11, c: MUTED })
        + cap('“Anything open\nThursday?”'), 'A client sees Thursday is full'),
      svg(living()
        + person({ x: 118, y: 344, s: .9, pose: 'sit', ...CLIENT1, arms: 'phone' })
        + card(160, 60, 222, 140) + T(176, 88, 'Thursday is full', { size: 15, w: 700 }) + T(176, 108, 'Hear first if a time frees up.', { size: 11, c: MUTED })
        + `<rect x="176" y="130" width="190" height="40" rx="11" fill="${LIME}"/>` + T(271, 155, 'Join the waitlist', { size: 13, w: 700, c: NAVY, a: 'middle' })
        + slot(232, 334, .9, { point: true })
        + cap('They join the waitlist\nfor that day.'), 'A client joining the waitlist for a full day'),
      svg(livingDay()
        + person({ x: 118, y: 344, s: .9, pose: 'sit', ...CLIENT1, arms: 'phone', face: 'grin' })
        + card(160, 50, 222, 172) + T(176, 78, 'A time opened up', { size: 15, w: 700 }) + T(176, 97, 'Cuts with Maya', { size: 11, c: MUTED })
        + `<rect x="176" y="108" width="190" height="52" rx="10" fill="#f5f9e3"/>` + T(190, 130, 'Thursday · 4:15pm', { size: 13, w: 700 }) + T(190, 148, 'Held for you for 2 hours', { size: 11, c: '#4a4f70' })
        + btn(176, 172, 190, 'Claim it')
        + slot(232, 334, .9, { wave: true })
        + cap('Someone cancels.\nIt’s held for them.'), 'An email saying a time opened up and is held for two hours'),
      svg(salon() + clock(200, 86, 20, 4, 15)
        + salonChair(180, 318) + person({ x: 176, y: 318, s: .92, pose: 'sit', ...CLIENT1, top: '#aab0c6', face: 'grin' })
        + person({ x: 84, y: 392, s: 1.02, ...MAYA, arms: 'cut', hold: 'scissors', face: 'grin' })
        + cap('Thursday, 4:15:\nin the chair.'), 'The client in Maya’s chair at 4:15 on Thursday'),
    ],
  };
};
