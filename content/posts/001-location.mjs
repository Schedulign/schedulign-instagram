// Spotlight: where the session happens. Jonah, mobile detailer.
// Claims: help/locations (Client provides the location; Client picks from my list; One location).
export default (k) => {
  const { svg, cap, T, person, slot, room, outdoor, house, van, car, sparkle, bubble, card, check, btn, radio, field, phoneSlide, plant, JONAH, CLIENT2, LIME, MUTED, CTA } = k;
  return {
    title: 'Location: every house is the blue one',
    pillar: 'spotlight',
    claims: ['locations'],
    caption: `Every house is the blue one when you are standing on the street at dusk.

Work at the client's place? Let them type the address when they book. Working from your own places? Let them pick from your list, or keep the exact place off your page until they book. You set it per event.

${CTA}

#schedulign #mobiledetailing #autodetailing #mobilebusiness #bookingpage`,
    slides: [
      svg(outdoor('dusk') + house(0, 330, 120, 110, '#4f6aa8') + house(140, 330, 120, 134, '#5874b3') + house(282, 330, 118, 104, '#4a63a0')
        + `<rect y="330" width="400" height="18" fill="#3a4062"/><rect y="348" width="400" height="152" fill="#262b45"/><path d="M0,430 h400" stroke="#e9d27a" stroke-width="4" stroke-dasharray="26 22" opacity=".6"/>`
        + van(208, 452) + person({ x: 118, y: 458, s: .92, ...JONAH, arms: 'phone', face: 'surprised' })
        + bubble(386, 26, 'which house is yours?', { me: true }) + bubble(14, 74, 'the blue one :)')
        + cap('Every house is\nthe blue one.'), 'Jonah the detailer on a street where every house is blue'),
      phoneSlide(room({ lamps: [], day: true, floorY: 420 }) + '<g data-floor="420"></g>',
        T(14, 44, 'Driveway detail · 90 min', { size: 10.5, c: MUTED }) + T(14, 68, 'Location', { size: 19, w: 700 })
        + `<rect x="10" y="80" width="172" height="56" rx="12" fill="#f5f9e3" stroke="${LIME}" stroke-width="2"/>` + radio(28, 108, true)
        + T(44, 104, 'Client provides', { size: 12.5, w: 700 }) + T(44, 121, 'They type where to meet', { size: 10, c: MUTED })
        + `<rect x="10" y="144" width="172" height="44" rx="12" fill="#fff" stroke="#e1e4ee" stroke-width="1.5"/>` + radio(28, 166, false) + T(44, 170, 'Client picks from my list', { size: 11.5, w: 600 })
        + `<rect x="10" y="196" width="172" height="44" rx="12" fill="#fff" stroke="#e1e4ee" stroke-width="1.5"/>` + radio(28, 218, false) + T(44, 222, 'One location', { size: 11.5, w: 600 })
        + T(14, 262, 'Or share the place only', { size: 10.5, c: MUTED }) + T(14, 277, 'after they book.', { size: 10.5, c: MUTED })
        + btn(10, 296, 172, 'Save'),
        'You choose, per event.', 'The location choices for an event'),
      svg(room({ lamps: [140], day: true, win: { x: 268, y: 150, w: 100, h: 110, sky: 'day' } }) + plant(372, 392)
        + person({ x: 132, y: 392, s: 1, ...CLIENT2, arms: 'phone' })
        + card(186, 62, 196, 76) + field(202, 86, 164, 'Location', '42 Alder Lane') + check(348, 111)
        + slot(292, 392, .9)
        + cap('They type the address\nwhen they book.'), 'A client typing their address while booking'),
      svg(outdoor('day') + `<rect y="352" width="400" height="148" fill="#6fa06a"/><path d="M150,352 L400,352 L400,500 L60,500Z" fill="#a9adbd"/>`
        + house(186, 352, 214, 150, '#6b86c4', { num: '42', day: true })
        + person({ x: 293, y: 352, s: .62, ...CLIENT2, arms: 'wave', face: 'grin' })
        + car(6, 440) + sparkle(60, 360, 9) + sparkle(210, 350, 7) + sparkle(250, 410, 6, LIME)
        + person({ x: 334, y: 456, s: .92, flip: true, ...JONAH, arms: 'work', hold: 'sponge', face: 'grin' })
        + cap('Right driveway.\nFirst try.', 476), 'Jonah polishing a car in the right driveway'),
    ],
  };
};
