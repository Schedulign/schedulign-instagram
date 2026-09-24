// Spotlight: bookings by request. Rosa, tutor.
// Claims: help/availability (Bookings by request only), help/requests-and-approvals (Approve / Decline, nothing booked or charged until approved).
export default (k) => {
  const { svg, cap, T, person, study, table, notice, card, toggle, bars, btn, heldItem, phoneSlide, room, ROSA, STUDENT, LIME, NAVY, MUTED, CTA } = k;
  return {
    title: 'Requests: say yes before it is booked',
    pillar: 'spotlight',
    claims: ['availability', 'requests-and-approvals'],
    caption: `Your last Friday spot, taken by someone you have never met.

Turn on bookings by request and every booking waits for your answer. Nothing is booked or charged until you approve, and you can decline with a note if it is not a fit.

${CTA}

#schedulign #tutor #tutoringbusiness #privatetutor #bookingpage`,
    slides: [
      svg(study(true) + table(150, 330, 220) + `<rect x="176" y="306" width="46" height="24" rx="2" fill="#7fb7e6"/><rect x="180" y="296" width="40" height="10" rx="2" fill="#f2c14e"/>`
        + person({ x: 290, y: 394, s: 1, ...ROSA, arms: 'phone', face: 'surprised' })
        + notice(150, 64, 232, 'New booking', 'Friday · 6:00pm · first time', 'dot')
        + cap('Your last Friday spot,\ntaken by a stranger.'), 'Rosa the tutor surprised by an unexpected booking'),
      phoneSlide(room({ lamps: [], day: true, floorY: 420 }) + '<g data-floor="420"></g>',
        T(14, 44, 'Algebra help · 60 min', { size: 10.5, c: MUTED }) + T(14, 68, 'Availability', { size: 19, w: 700 })
        + `<rect x="10" y="80" width="172" height="80" rx="12" fill="#f5f9e3" stroke="${LIME}" stroke-width="2"/>`
        + T(22, 104, 'Bookings by', { size: 12.5, w: 700 }) + T(22, 120, 'request only', { size: 12.5, w: 700 }) + toggle(132, 95, true)
        + T(22, 143, 'You approve each one', { size: 10.5, c: MUTED })
        + bars(14, 184, 3, 164) + btn(10, 296, 172, 'Save'),
        'Turn on requests.', 'The Bookings by request only switch, turned on'),
      svg(study(true)
        + person({ x: 200, y: 370, s: 1, pose: 'sit', ...ROSA, arms: 'phone', face: 'smile' }) + table(80, 338, 260)
        + card(150, 44, 232, 196) + `<rect x="166" y="60" width="64" height="22" rx="11" fill="#eef0f5"/>` + T(198, 75, 'Request', { size: 10.5, w: 700, c: '#4a4f70', a: 'middle' })
        + T(166, 108, 'Jordan P.', { size: 16, w: 700 }) + T(166, 127, 'Thursday · 5:00pm · 60 min', { size: 11.5, c: MUTED })
        + T(166, 150, '“Algebra 2, test on Friday”', { size: 11.5, c: '#3a3f5e' })
        + `<rect x="166" y="172" width="96" height="36" rx="11" fill="${LIME}"/>` + T(214, 195, 'Approve', { size: 13, w: 700, c: NAVY, a: 'middle' })
        + `<rect x="270" y="172" width="96" height="36" rx="11" fill="#fff" stroke="#c3c7d6" stroke-width="1.5"/>` + T(318, 195, 'Decline', { size: 13, w: 600, c: '#4a4f70', a: 'middle' })
        + cap('You say yes\nbefore it’s confirmed.'), 'A booking request with Approve and Decline'),
      svg(study(true)
        + person({ x: 128, y: 372, s: .95, pose: 'sit', ...ROSA, arms: 'lift', face: 'grin' })
        + person({ x: 286, y: 372, s: .9, pose: 'sit', flip: true, ...STUDENT, arms: 'lift', face: 'grin' })
        + table(60, 338, 300) + `<path d="M170,338 l40,-10 l40,10 l-40,4z" fill="#f6f3ea"/><path d="M210,328 v14" stroke="#c9c2ae" stroke-width="2"/>` + heldItem('mug', 120, 336) + `<rect x="270" y="318" width="36" height="20" rx="2" fill="#d9695f"/>`
        + cap('The right students,\nat the right times.'), 'Rosa tutoring a student at a table'),
    ],
  };
};
