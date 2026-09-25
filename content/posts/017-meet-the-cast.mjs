// Intro: the recurring cast. Pin it.
export default (k) => {
  const { svg, cap, person, slot, room, salon, salonChair, outdoor, van, gymBg, study, park, sparkle, MAYA, JONAH, DEV, ROSA, PRIYA, LIME } = k;
  return {
    title: 'Meet the regulars',
    series: 'intro',
    claims: [],
    caption: `Meet the regulars you will see around here.

Maya cuts hair. Jonah details cars in your driveway. Dev trains people before most people are awake. Rosa tutors math and never runs out of pencils. Priya photographs families and chases golden hour. Each of them sells their time, and Slot, the booking page, keeps the calendar.

Swipe to say hi. Who is most like you?

#schedulign #smallbusinessowner #selfemployed #solopreneur #bookingpage`,
    slides: [
      svg(salon() + salonChair(250, 318) + person({ x: 130, y: 392, s: 1.05, ...MAYA, arms: 'hold', hold: 'scissors', face: 'grin' })
        + cap('Maya. Stylist.\nBooked by 10am.'), 'Maya the stylist in her salon'),
      svg(outdoor('day') + `<rect y="380" width="400" height="120" fill="#a9adbd"/><rect y="352" width="400" height="28" fill="#6fa06a"/>`
        + van(30, 450) + sparkle(150, 330, 8, LIME) + person({ x: 300, y: 462, s: 1, ...JONAH, arms: 'wave', face: 'grin' })
        + cap('Jonah. Mobile detailer.\nLives in that van.', 474), 'Jonah the detailer waving next to his van'),
      svg(gymBg('day') + person({ x: 180, y: 394, s: 1.05, ...DEV, arms: 'flex', face: 'grin' })
        + cap('Dev. Trainer.\nUp at 5am on purpose.'), 'Dev the trainer flexing in the gym'),
      svg(study(true) + person({ x: 250, y: 394, s: 1.05, ...ROSA, arms: 'hold', hold: 'book', face: 'grin' })
        + cap('Rosa. Tutor.\nNever out of pencils.'), 'Rosa the tutor holding a book'),
      svg(park() + person({ x: 200, y: 440, s: 1.05, ...PRIYA, arms: 'shoot', hold: 'camera' })
        + cap('Priya. Photographer.\nChases golden hour.', 478), 'Priya the photographer taking a picture in a park'),
      svg(room({ lamps: [], day: true, floorY: 420, win: { x: 40, y: 90, w: 110, h: 120, sky: 'day' } })
        + slot(250, 404, 3, { wave: true })
        + cap('And Slot.\nThe booking page.', 474), 'Slot, the booking page'),
    ],
  };
};
