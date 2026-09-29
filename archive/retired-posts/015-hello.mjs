// Intro: hello. Goes out first; pin it.
// Claims: help/for-your-clients (no client accounts), the event editor's sections (help/availability, locations, durations-and-pricing,
// booking-form-and-waivers, notifications-and-emails, cancellations-and-refunds).
export default (k) => {
  const { svg, cap, T, person, slot, room, livingDay, card, chip, btn, check, phoneSlide, titleCard, MAYA, JONAH, DEV, ROSA, PRIYA, CLIENT1, MUTED, CTA } = k;
  const row = (y, label) => `<rect x="10" y="${y}" width="172" height="32" rx="10" fill="#fff" stroke="#e1e4ee" stroke-width="1.5"/>` + T(22, y + 21, label, { size: 12, w: 600 }) + check(166, y + 16, 7);
  return {
    title: 'Hello: meet your booking page',
    series: 'intro',
    claims: ['for-your-clients', 'getting-started'],
    caption: `Hi. Meet Schedulign: the booking page that runs your business.

It is for people who sell their time: stylists, trainers, tutors, photographers, detailers, consultants, and anyone else whose work comes in sessions. Clients pick a time, answer your questions and book from one link, without making an account. You set the rules per event: hours, place, price, forms, reminders and cancellations.

This account follows a few of those people at work, shows how the features help, and now and then opens the hood. Stick around.

${CTA}

#schedulign #bookingpage #smallbusinessowner #selfemployed #solopreneur`,
    slides: [
      svg(room({ lamps: [], day: true, floorY: 420, win: { x: 250, y: 90, w: 110, h: 120, sky: 'day' } })
        + slot(170, 404, 3.2, { wave: true })
        + cap('Hi. I’m your\nbooking page.', 474), 'Slot, the booking page, waving hello'),
      svg(room({ lamps: [], day: true, floorY: 420, win: { x: 145, y: 80, w: 110, h: 110, sky: 'day' } })
        + person({ x: 44, y: 440, s: .86, ...MAYA, arms: 'hold', hold: 'scissors', face: 'grin' })
        + person({ x: 122, y: 440, s: .86, ...JONAH, arms: 'hold', hold: 'sponge' })
        + person({ x: 200, y: 440, s: .86, ...DEV, arms: 'hold', hold: 'bottle', face: 'grin' })
        + person({ x: 278, y: 440, s: .86, ...ROSA, arms: 'hold', hold: 'book' })
        + person({ x: 356, y: 440, s: .86, ...PRIYA, arms: 'shoot', hold: 'camera' })
        + cap('For people who\nsell their time.', 476), 'A stylist, a detailer, a trainer, a tutor and a photographer standing in a row'),
      svg(livingDay()
        + person({ x: 118, y: 344, s: .9, pose: 'sit', ...CLIENT1, arms: 'phone', face: 'grin' })
        + card(150, 62, 196, 142) + T(166, 90, 'Thursday', { size: 15, w: 700 }) + T(166, 108, 'Pick a time', { size: 11, c: MUTED })
        + chip(166, 120, '3:30', false) + chip(222, 120, '4:15', true) + chip(278, 120, '4:45', false) + btn(166, 160, 162, 'Book 4:15')
        + slot(232, 334, .9, { wave: true })
        + cap('Clients pick a time.\nNo account needed.'), 'A client booking a time from the sofa'),
      phoneSlide(room({ lamps: [], day: true, floorY: 420 }) + '<g data-floor="420"></g>',
        T(14, 44, 'Your event', { size: 10.5, c: MUTED }) + T(14, 68, 'Cut and style', { size: 19, w: 700 })
        + row(82, 'Availability') + row(120, 'Location') + row(158, 'Pricing') + row(196, 'Booking form') + row(234, 'Notifications')
        + T(14, 290, '…and cancellations, per event.', { size: 10.5, c: MUTED })
        + btn(10, 300, 172, 'Save'),
        'Your rules,\nset per event.', 'An event’s settings: availability, location, pricing, booking form, notifications'),
      svg(titleCard(['Your booking page,', 'free during', 'early access.'], { sub: 'Link in bio · schedulign.com' }), 'Your booking page, free during early access'),
    ],
  };
};
