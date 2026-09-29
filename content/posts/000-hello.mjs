// Hello: Slot says hi. Goes out first; pin it. No character is introduced (Sam, Sep 28 2026).
// Claims: help/for-your-clients (one link, no client account), help/booking-form-and-waivers (signed while booking),
// help/payments (paid online when booking).
export default (k) => {
  const { svg, cap, T, slot, room, card, check, titleCard, LIME, MUTED, CTA } = k;
  const line = (y, label) => check(196, y - 4, 7) + T(210, y, label, { size: 12.5, w: 600 });
  return {
    title: 'Hello from Slot',
    series: 'hello',
    claims: ['for-your-clients', 'booking-form-and-waivers', 'payments'],
    caption: `Hi. I'm Slot, your booking page.

Clients pick a time from one link, sign your waiver and pay as they book. No account for them, no back-and-forth for you.

Every post here is one small fix for the admin that eats your evenings.

${CTA}

#schedulign #bookingpage #selfemployed #personaltrainer #smallbusinessowner`,
    slides: [
      svg(room({ lamps: [], day: true, floorY: 420, win: { x: 250, y: 90, w: 110, h: 120, sky: 'day' } })
        + slot(170, 404, 3.2, { wave: true })
        + cap('Hi. I’m Slot,\nyour booking page.', 474), 'Slot, the booking page, waving hello'),
      svg(room({ lamps: [], day: true, floorY: 420, win: { x: 40, y: 110, w: 100, h: 110, sky: 'day' } })
        + card(176, 60, 206, 156) + T(192, 88, 'New booking', { size: 15, w: 700 }) + T(192, 106, 'Thursday · 4:15pm', { size: 11, c: MUTED })
        + `<path d="M192,120 h174" stroke="#e7e9f1"/>`
        + line(146, 'Time picked') + line(172, 'Waiver signed') + line(198, 'Paid')
        + slot(110, 404, 2.2, { mood: 'booked' })
        + cap('Booked, signed\nand paid. While you work.', 474), 'Slot with a happy booked face next to a new booking that is signed and paid'),
      svg(titleCard(['The booking page', 'that runs your', 'business.'], { sub: 'Link in bio · schedulign.com' }), 'The booking page that runs your business. Link in bio'),
    ],
  };
};
