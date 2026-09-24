// Spotlight: gate codes and parking, collected at booking. Jonah, mobile detailer.
// Claims: help/locations (Client provides the location: the client types where to meet and any access details;
// you can add a note about what you need; the exact place and notes ride every confirmation).
export default (k) => {
  const { svg, cap, T, person, slot, room, outdoor, house, fence, van, car, sparkle, bubble, card, field, radio, btn, notice, phoneSlide, plant, JONAH, CLIENT2, LIME, MUTED, CTA } = k;
  const street = (open) => outdoor('day') + house(150, 340, 230, 150, '#e3b776', { day: true }) + `<rect y="340" width="400" height="160" fill="#a9adbd"/><rect y="340" width="400" height="10" fill="#8f93a6"/>` + fence(0, 350, 400, { gateAt: 70, open });
  return {
    title: 'Access details: the gate code comes with the booking',
    pillar: 'spotlight',
    claims: ['locations'],
    caption: `Gate code? Garage? Side door? At 7am, you should not have to text to find out.

When clients give the location, they type where to meet and any access details as they book, and you can add a note saying what you need. The address and the details come with the booking.

${CTA}

#schedulign #mobiledetailing #autodetailing #mobilebusiness #bookingpage`,
    slides: [
      svg(street(false) + van(220, 470) + person({ x: 150, y: 470, s: .95, ...JONAH, arms: 'phone', face: 'surprised' })
        + bubble(386, 30, 'what’s the gate code?', { me: true }) + bubble(14, 78, 'which gate lol')
        + cap('7:02am. Locked out\nof the driveway.'), 'Jonah locked outside a gate early in the morning'),
      phoneSlide(room({ lamps: [], day: true, floorY: 420 }) + '<g data-floor="420"></g>',
        T(14, 44, 'Driveway detail · 90 min', { size: 10.5, c: MUTED }) + T(14, 68, 'Location', { size: 19, w: 700 })
        + `<rect x="10" y="80" width="172" height="56" rx="12" fill="#f5f9e3" stroke="${LIME}" stroke-width="2"/>` + radio(28, 108, true)
        + T(44, 104, 'Client provides', { size: 12.5, w: 700 }) + T(44, 121, 'Where to meet + access', { size: 10, c: MUTED })
        + T(14, 162, 'Your note to them', { size: 11, w: 600, c: '#4a4f70' })
        + `<rect x="10" y="170" width="172" height="62" rx="9" fill="#f6f7fb" stroke="#dfe2ec"/>` + T(20, 192, 'Gate code, where to park,', { size: 11.5 }) + T(20, 209, 'and a water tap nearby.', { size: 11.5 })
        + btn(10, 296, 172, 'Save'),
        'Ask for what you need.', 'The location setting with a note asking for a gate code'),
      svg(room({ lamps: [150], day: true, win: { x: 268, y: 150, w: 100, h: 110, sky: 'day' } }) + plant(372, 392)
        + person({ x: 120, y: 392, s: 1, ...CLIENT2, arms: 'phone' })
        + card(176, 50, 206, 142) + field(192, 74, 174, 'Location', '42 Alder Lane') + field(192, 132, 174, 'Access details', 'Gate 4412 · by garage', { size: 12 })
        + slot(292, 392, .9)
        + cap('They add it\nwhen they book.'), 'A client adding a gate code while booking'),
      svg(street(true) + car(40, 470) + sparkle(90, 390, 8) + sparkle(250, 382, 6, LIME)
        + person({ x: 340, y: 476, s: .92, flip: true, ...JONAH, arms: 'work', hold: 'sponge', face: 'grin' })
        + notice(150, 40, 232, 'Tomorrow · 7:00am', 'Gate 4412 · park by the garage')
        + cap('In the booking.\nNo texts at 7am.', 470), 'Jonah detailing a car inside the open gate'),
    ],
  };
};
