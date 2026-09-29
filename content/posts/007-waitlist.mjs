// Story: the waitlist for a time. A stylist.
// Claims: help/waitlist (a client waits for one exact time that can't be booked now, under "Join the waitlist for a time";
// confirms the place from the email; when that time opens the first person in line who can still book it gets it;
// offline and unpriced events are booked with the usual confirmation; a Waitlist switch per event, on for new events).
export default (k) => {
  const { svg, cap, T, person, slot, living, livingDay, salon, salonChair, clock, card, chip, btn, check, MAYA, CLIENT1, LIME, NAVY, MUTED, CTA } = k;
  return {
    title: 'Waitlist: the exact time they wanted',
    series: 'story',
    claims: ['waitlist'],
    caption: `"Anything at 4:15 Thursday?" Usually that means a text thread and a maybe.

With the waitlist on, a client who can't book the time they want can wait for that exact time. They confirm their place from their email. When the time opens, from a cancellation, a move or a change of hours, the first person in line who can still book it gets it.

No "first to reply" scramble, and nothing for you to chase.

${CTA}

#schedulign #hairstylist #salonowner #behindthechair #bookingpage`,
    slides: [
      svg(living()
        + person({ x: 118, y: 344, s: .9, pose: 'sit', ...CLIENT1, arms: 'phone', face: 'sad' })
        + card(160, 62, 222, 128) + T(176, 88, 'Cut and style', { size: 14, w: 700 }) + T(176, 106, 'Thursday', { size: 11, c: MUTED })
        + chip(176, 118, '11:00', false) + chip(236, 118, '1:30', false) + T(176, 176, 'No 4:15 today', { size: 11, c: MUTED })
        + cap('The one time\nthey can make? Taken.'), 'A client sees the time they want is not listed'),
      svg(living()
        + person({ x: 118, y: 344, s: .9, pose: 'sit', ...CLIENT1, arms: 'phone' })
        + card(160, 50, 222, 160) + T(176, 78, 'Join the waitlist', { size: 15, w: 700 }) + T(176, 96, 'for a time', { size: 11, c: MUTED })
        + chip(176, 110, '3:45', false) + chip(236, 110, '4:15', true) + chip(296, 110, '4:45', false)
        + `<rect x="176" y="156" width="190" height="40" rx="11" fill="${LIME}"/>` + T(271, 181, 'Join the waitlist', { size: 13, w: 700, c: NAVY, a: 'middle' })
        + slot(232, 334, .9, { point: true })
        + cap('They wait for\nthat exact time.'), 'A client joining the waitlist for 4:15 on Thursday'),
      svg(livingDay()
        + person({ x: 118, y: 344, s: .9, pose: 'sit', ...CLIENT1, arms: 'phone', face: 'grin' })
        + card(160, 60, 222, 130) + check(190, 92, 9) + T(208, 97, 'You’re booked', { size: 15, w: 700 })
        + T(176, 124, 'Cut and style', { size: 11, c: MUTED })
        + `<rect x="176" y="134" width="190" height="40" rx="10" fill="#f5f9e3"/>` + T(190, 159, 'Thursday · 4:15pm', { size: 13, w: 700 })
        + slot(232, 334, .9, { mood: 'booked' })
        + cap('Someone cancels.\nIt’s booked for them.'), 'The client’s confirmation: booked for Thursday at 4:15'),
      svg(salon() + clock(200, 86, 20, 4, 15)
        + salonChair(180, 318) + person({ x: 176, y: 318, s: .92, pose: 'sit', ...CLIENT1, top: '#aab0c6', face: 'grin' })
        + person({ x: 84, y: 392, s: 1.02, ...MAYA, arms: 'cut', hold: 'scissors', face: 'grin' })
        + cap('Thursday, 4:15:\nin the chair.'), 'The client in the stylist’s chair at 4:15 on Thursday'),
    ],
  };
};
