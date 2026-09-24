// Tip: add up the drive and the cleanup, then make it a buffer. Jonah, mobile detailer.
// Claims: help/availability (Limits & buffers: minutes kept free before or after each booking, per event).
export default (k) => {
  const { svg, cap, T, person, slot, room, outdoor, house, road, van, car, sparkle, bubble, tipCard, field, btn, phoneSlide, clock, heldItem, JONAH, CLIENT2, LIME, MUTED, CTA } = k;
  return {
    title: 'Tip: count the drive, then buffer it',
    pillar: 'tip',
    claims: ['availability'],
    caption: `Back-to-back bookings look great on the calendar until the first one runs over.

Add up what happens between sessions: the drive, the cleanup, the coffee. That is your buffer. Put it on the event as minutes before or after each booking, and those minutes stay free.

Save this for the next week you are late to everything.

#schedulign #mobiledetailing #mobilebusiness #smallbusinesstips #selfemployed`,
    slides: [
      svg(outdoor('day') + house(10, 330, 120, 110, '#e3b776', { day: true }) + house(270, 330, 120, 120, '#8fb3d9', { day: true }) + road(342)
        + van(40, 470) + car(200, 470)
        + bubble(386, 30, 'on my way, 20 min', { me: true }) + bubble(14, 78, 'you said 10:00?')
        + cap('Back-to-back looks great\nuntil one runs over.'), 'Jonah’s van stuck in traffic between bookings'),
      svg(tipCard(['30 min drive', '+ 15 min cleanup'], '45 min', 'is your buffer', 'Example numbers. Count yours.')
        + slot(200, 432, 1.2), 'Thirty minutes of driving plus fifteen of cleanup is a 45 minute buffer'),
      phoneSlide(room({ lamps: [], day: true, floorY: 420 }) + '<g data-floor="420"></g>',
        T(14, 44, 'Driveway detail · 90 min', { size: 10.5, c: MUTED }) + T(14, 68, 'Limits & buffers', { size: 19, w: 700 })
        + field(14, 90, 164, 'Buffer before', '15 min') + field(14, 154, 164, 'Buffer after', '30 min')
        + T(14, 232, 'Kept free around', { size: 10.5, c: MUTED }) + T(14, 247, 'every booking.', { size: 10.5, c: MUTED })
        + btn(10, 296, 172, 'Save'),
        'Put it on the event.', 'Buffer before and after fields on an event'),
      svg(outdoor('day') + `<rect y="352" width="400" height="148" fill="#6fa06a"/><path d="M150,352 L400,352 L400,500 L60,500Z" fill="#a9adbd"/>`
        + house(186, 352, 214, 150, '#8fb3d9', { num: '18', day: true })
        + person({ x: 293, y: 352, s: .62, ...CLIENT2, arms: 'wave', face: 'grin' })
        + van(10, 450) + person({ x: 236, y: 462, s: .95, ...JONAH, arms: 'hold', hold: 'mug', face: 'grin' })
        + clock(60, 80, 22, 10, 0)
        + cap('10:00 sharp.\nWith a coffee.', 474), 'Jonah arriving on time with a coffee'),
    ],
  };
};
