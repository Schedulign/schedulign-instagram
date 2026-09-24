// Before / after: the fourteen-message booking. Maya, stylist.
export default (k) => {
  const { svg, cap, T, person, slot, living, salon, bedroom, phoneFlat, salonChair, bubble, clock, card, chip, btn, notice, MAYA, CLIENT1, MUTED, CTA } = k;
  const pj = { ...MAYA, apron: null, top: '#7f8bd6', pants: '#5f6fc6', sleeves: 'long' };
  return {
    title: 'DM to book: the fourteen-message haircut',
    pillar: 'before-after',
    claims: ['for-your-clients'],
    caption: `Booking one haircut should not take fourteen messages and an empty chair on Thursday.

With a booking page, clients pick an open time, answer your questions and get a confirmation by email. You get your evenings back.

${CTA}

#schedulign #hairstylist #salonowner #behindthechair #bookingpage`,
    slides: [
      svg(salon() + phoneFlat(302, 304, true) + bubble(206, 236, 'u free thurs?')
        + salonChair(180, 318) + person({ x: 176, y: 318, s: .92, pose: 'sit', ...CLIENT1, top: '#aab0c6' })
        + person({ x: 84, y: 392, s: 1.02, ...MAYA, arms: 'cut', hold: 'scissors' })
        + cap('2:10pm: “u free thurs?”'), 'Maya the stylist cutting hair while her phone buzzes'),
      svg(bedroom()
        + person({ x: 128, y: 334, s: .9, pose: 'sit', ...pj, arms: 'phone', face: 'tired' })
        + `<path d="M116,342 Q160,314 214,322 Q268,316 314,330 L314,372 L116,372Z" fill="#5f6fc6"/>`
        + bubble(186, 62, 'what about 4:15?') + bubble(386, 108, '4:45 works?', { me: true }) + bubble(186, 154, 'wait which thursday')
        + cap('11:48pm: still booking.'), 'Maya in bed late at night, still texting a client about times'),
      svg(salon() + clock(200, 86, 20, 4, 45) + phoneFlat(302, 304, false) + bubble(372, 240, 'still coming?', { me: true }) + T(372, 284, 'Delivered', { size: 11, c: '#5d6183', a: 'end' })
        + salonChair(186, 318) + person({ x: 90, y: 392, s: 1.02, ...MAYA, arms: 'hips', face: 'tired' })
        + cap('Thursday, 4:45: nobody.'), 'An empty salon chair at 4:45'),
      svg(living()
        + person({ x: 118, y: 344, s: .9, pose: 'sit', ...CLIENT1, arms: 'phone', face: 'grin' })
        + slot(232, 334, .9, { wave: true })
        + card(150, 62, 196, 142) + T(166, 90, 'Thursday', { size: 15, w: 700 }) + T(166, 108, 'Pick a time', { size: 11, c: MUTED })
        + chip(166, 120, '3:30', false) + chip(222, 120, '4:15', true) + chip(278, 120, '4:45', false) + btn(166, 160, 162, 'Book 4:15')
        + cap('Now: one link.\nThey pick the time.'), 'A client picking a time on the booking page'),
      svg(bedroom()
        + `<g transform="translate(266,334) rotate(-90)">${person({ x: 0, y: 0, s: .84, ...pj, face: 'sleep' })}</g>`
        + `<path d="M132,318 Q210,296 314,314 L314,372 L132,372Z" fill="#5f6fc6"/>`
        + `<text x="118" y="286" class="fr" font-size="16" fill="#c9cde0">z</text><text x="130" y="268" class="fr" font-size="21" fill="#c9cde0">z</text><text x="146" y="246" class="fr" font-size="27" fill="#c9cde0">Z</text>`
        + notice(186, 84, 196, 'New booking', 'Thursday · 4:15pm') + slot(262, 200, .8)
        + cap('11:48pm: asleep.\nStill booked.'), 'Maya asleep while a booking arrives'),
    ],
  };
};
