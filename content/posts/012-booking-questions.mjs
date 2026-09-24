// Spotlight: your own questions on the booking form. Priya, photographer.
// Claims: help/booking-form-and-waivers (your own questions: text, checkboxes, choices, phone; answers under Form answers in Bookings).
export default (k) => {
  const { svg, cap, T, person, slot, park, dog, bubble, card, field, radio, btn, phoneSlide, room, PRIYA, CLIENT4, KID, LIME, NAVY, MUTED, CTA } = k;
  const q = (y, text, type) => `<rect x="10" y="${y}" width="172" height="40" rx="10" fill="#fff" stroke="#e1e4ee" stroke-width="1.5"/>` + T(20, y + 25, text, { size: 10.5, w: 600 }) + `<rect x="${176 - type.length * 6 - 12}" y="${y + 11}" width="${type.length * 6 + 8}" height="18" rx="9" fill="#eef0f5"/>` + T(172 - 4, y + 24, type, { size: 9.5, w: 600, c: '#4a4f70', a: 'end' });
  return {
    title: 'Booking questions: ask before the shoot',
    pillar: 'spotlight',
    claims: ['booking-form-and-waivers'],
    caption: `Surprise: the dog is in the family photos.

Add your own questions to the booking form: short answers, checkboxes, a list to pick from, a phone number. Clients answer them when they book, and the answers are on the booking before the session.

${CTA}

#schedulign #photographybusiness #familyphotographer #photographer #bookingpage`,
    slides: [
      svg(park() + person({ x: 90, y: 440, s: .98, ...PRIYA, arms: 'hips', face: 'surprised' })
        + person({ x: 280, y: 430, s: .95, flip: true, ...CLIENT4, arms: 'wave', face: 'grin' }) + dog(196, 438, 1.1, true)
        + bubble(150, 60, 'surprise, Max came :)', { size: 15 })
        + cap('Surprise: the dog is\nin the family photos.', 476), 'Priya surprised when a family arrives with their dog'),
      phoneSlide(room({ lamps: [], day: true, floorY: 420 }) + '<g data-floor="420"></g>',
        T(14, 44, 'Family session · 45 min', { size: 10.5, c: MUTED }) + T(14, 68, 'Booking form', { size: 19, w: 700 })
        + q(82, 'Who is coming?', 'Text') + q(130, 'Bringing a pet?', 'Checkbox') + q(178, 'Outfit colors', 'Pick one')
        + `<rect x="10" y="226" width="172" height="36" rx="10" fill="#fff" stroke="${LIME}" stroke-width="1.5" stroke-dasharray="4 3"/>` + T(96, 249, '+ Add a question', { size: 11.5, w: 700, c: '#4a4f70', a: 'middle' })
        + btn(10, 296, 172, 'Save'),
        'Ask what you need\nto know.', 'A booking form with the photographer’s own questions'),
      svg(room({ lamps: [200], day: true, win: { x: 40, y: 120, w: 100, h: 110, sky: 'day' } })
        + person({ x: 110, y: 392, s: 1, ...CLIENT4, arms: 'phone' })
        + card(170, 60, 212, 176) + T(186, 86, 'Bringing a pet?', { size: 13, w: 700 })
        + `<rect x="186" y="96" width="180" height="32" rx="9" fill="#f5f9e3" stroke="${LIME}" stroke-width="1.5"/>` + radio(202, 112, true) + T(216, 116, 'Yes', { size: 12.5, w: 600 })
        + field(186, 150, 180, 'Who is coming?', '2 adults, 1 kid, Max') + slot(300, 392, .9)
        + cap('They answer\nwhen they book.'), 'A client answering the booking questions'),
      svg(park() + person({ x: 80, y: 440, s: .98, ...PRIYA, arms: 'shoot', hold: 'camera' })
        + person({ x: 250, y: 430, s: .95, flip: true, ...CLIENT4, arms: 'cheer', face: 'grin' }) + person({ x: 310, y: 440, s: .6, flip: true, ...KID, arms: 'cheer', face: 'grin' }) + dog(176, 440, 1, true)
        + cap('Treats packed.\nBest shot of the day.', 476), 'Priya photographing the family and their dog'),
    ],
  };
};
