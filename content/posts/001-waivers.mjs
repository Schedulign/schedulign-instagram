// Story: waivers signed while booking. A trainer.
// Claims: help/booking-form-and-waivers (typed e-signature; name, date and version kept; Contacts shows signatures; Apply to all events).
export default (k) => {
  const { svg, cap, T, person, room, gymBg, paper, card, bars, check, btn, phoneSlide, DEV, CLIENT3, LIME, NAVY, MUTED, INK, CTA } = k;
  return {
    title: 'Waivers: signed before they book',
    series: 'story',
    claims: ['booking-form-and-waivers'],
    caption: `The signed waiver is in the pile somewhere. Probably.

Attach a waiver to the event and clients sign it with a typed e-signature while they book. The signed name, the date and the document version stay with the booking, and Contacts shows who has signed.

${CTA}

#schedulign #personaltrainer #fitnessbusiness #gymowner #bookingpage`,
    slides: [
      svg(gymBg('dawn') + `<rect x="236" y="330" width="60" height="22" rx="3" fill="#f6f3ea"/><rect x="240" y="322" width="56" height="10" rx="2" fill="#ebe6d8"/>`
        + paper(60, 120, -20) + paper(300, 250, 25) + paper(110, 300, 12) + paper(350, 300, -35) + paper(210, 40, 8)
        + person({ x: 190, y: 394, s: 1.02, ...DEV, arms: 'hold', hold: 'clipboard', face: 'surprised' })
        + cap('The signed waiver?\nIt’s in here somewhere.'), 'The trainer surrounded by loose paper waivers'),
      phoneSlide(room({ lamps: [], day: true, floorY: 420 }) + '<g data-floor="420"></g>',
        T(14, 44, 'Strength session', { size: 10.5, c: MUTED }) + T(14, 68, 'Booking form', { size: 19, w: 700 })
        + T(14, 100, 'Waiver', { size: 11, w: 600, c: '#4a4f70' })
        + `<rect x="10" y="108" width="172" height="50" rx="12" fill="#f5f9e3" stroke="${LIME}" stroke-width="2"/>` + T(22, 130, 'Liability waiver', { size: 12.5, w: 700 }) + T(22, 147, 'Typed e-signature', { size: 10, c: MUTED }) + check(164, 133)
        + `<rect x="10" y="168" width="172" height="36" rx="12" fill="#fff" stroke="#e1e4ee" stroke-width="1.5"/>` + T(22, 191, 'No waiver', { size: 12, c: MUTED })
        + bars(14, 222, 3, 164) + btn(10, 296, 172, 'Save'),
        'Attach it to the event.', 'The event’s Booking form section with the liability waiver attached'),
      svg(gymBg('day')
        + person({ x: 112, y: 394, s: 1, ...CLIENT3, arms: 'phone' })
        + card(170, 48, 212, 212) + T(186, 76, 'Liability waiver', { size: 15, w: 700 }) + bars(186, 90, 4, 180)
        + T(186, 146, 'Type your full name', { size: 11, c: MUTED }) + `<rect x="186" y="154" width="180" height="36" rx="9" fill="#f6f7fb" stroke="#dfe2ec"/>`
        + `<text x="198" y="179" font-size="18" fill="${INK}" font-style="italic" font-family="Georgia,serif">Alex Kim</text>`
        + `<rect x="186" y="204" width="180" height="36" rx="11" fill="${LIME}"/>` + T(276, 227, 'Sign', { size: 13, w: 700, c: NAVY, a: 'middle' })
        + cap('They sign it\nwhile they book.'), 'A client typing their name to sign the waiver while booking'),
      svg(gymBg('day')
        + person({ x: 136, y: 394, s: 1.02, ...DEV, arms: 'flex', face: 'grin' })
        + card(210, 60, 176, 128) + T(224, 86, 'Contacts', { size: 14, w: 700 })
        + check(234, 114, 8) + T(250, 112, 'Alex Kim', { size: 12, w: 700 }) + T(250, 127, 'Signed · version 2', { size: 10.5, c: MUTED })
        + check(234, 160, 8) + T(250, 158, 'Sam Ortiz', { size: 12, w: 700 }) + T(250, 173, 'Signed · version 2', { size: 10.5, c: MUTED })
        + cap('Name, date and version,\nall on file.'), 'The trainer flexing, with signed waivers listed in Contacts'),
    ],
  };
};
