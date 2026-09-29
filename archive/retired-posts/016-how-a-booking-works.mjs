// Intro: a booking from start to finish. Pin it.
// Claims: help/for-your-clients (pick a day and time; the details step; the confirmation email is a calendar invitation
// that later changes update; the booking link cancels or reschedules inside the event's online windows),
// help/notifications-and-emails (sent as "{business} via Schedulign"; New time after a reschedule).
export default (k) => {
  const { svg, cap, T, person, slot, livingDay, kitchen, card, chip, btn, check, field, week, titleCard, emailCard, CLIENT1, LIME, NAVY, MUTED, CTA } = k;
  return {
    title: 'How a booking works, start to finish',
    series: 'intro',
    claims: ['for-your-clients', 'notifications-and-emails'],
    caption: `How a booking works on Schedulign, start to finish.

1. The client opens your link and picks a day and a time.
2. They answer your questions, sign your waiver if the event has one, and choose how to pay.
3. The confirmation email is a calendar invitation from your business, so the session lands in their calendar.
4. If plans change, they cancel or reschedule from their booking link, inside the windows you set for that event. The calendar entry updates itself.

No accounts, no back-and-forth.

${CTA}

#schedulign #bookingpage #onlinebooking #smallbusinesstips #selfemployed`,
    slides: [
      svg(titleCard(['How a booking', 'works, start', 'to finish'], { sub: 'Four steps. Swipe.' }), 'How a booking works, start to finish'),
      svg(livingDay() + person({ x: 118, y: 344, s: .9, pose: 'sit', ...CLIENT1, arms: 'phone' })
        + card(160, 50, 222, 170) + T(176, 76, 'Cut and style · 60 min', { size: 13, w: 700 }) + week(176, 88, 'Tue')
        + chip(176, 146, '3:30', false) + chip(232, 146, '4:15', true) + chip(288, 146, '4:45', false)
        + T(176, 204, 'Thursday · times in your time zone', { size: 10, c: MUTED })
        + cap('1. They pick a day\nand a time.'), 'A client picking a day and a time'),
      svg(livingDay() + person({ x: 118, y: 344, s: .9, pose: 'sit', ...CLIENT1, arms: 'phone' })
        + card(160, 36, 222, 214) + T(176, 62, 'Your details', { size: 15, w: 700 })
        + field(176, 76, 190, 'Name', 'Sam Rivera') + field(176, 128, 190, 'Anything Maya should know?', 'Trim, not a big change', { size: 12 })
        + check(186, 212, 8) + T(200, 216, 'Waiver signed', { size: 11.5, w: 600 })
        + slot(232, 334, .9, { point: true })
        + cap('2. They answer your\nquestions.'), 'A client filling in the details step'),
      svg(kitchen(true) + person({ x: 110, y: 392, s: 1, ...CLIENT1, arms: 'phone', face: 'grin' })
        + emailCard(168, 40, 216, 'Maya via Schedulign', 'Confirmed: Thursday 4:15pm', ['Cut and style with Maya', 'It’s in your calendar.'], 'Add to calendar')
        + cap('3. The confirmation is\na calendar invite.'), 'A confirmation email that adds the session to the client’s calendar'),
      svg(livingDay() + person({ x: 118, y: 344, s: .9, pose: 'sit', ...CLIENT1, arms: 'phone' })
        + card(160, 56, 222, 176) + T(176, 82, 'Your booking', { size: 11, w: 700, c: MUTED }) + T(176, 104, 'Thursday · 4:15pm', { size: 15, w: 700 })
        + `<rect x="176" y="118" width="92" height="36" rx="11" fill="${LIME}"/>` + T(222, 141, 'Reschedule', { size: 12.5, w: 700, c: NAVY, a: 'middle' })
        + `<rect x="274" y="118" width="92" height="36" rx="11" fill="#fff" stroke="#c3c7d6" stroke-width="1.5"/>` + T(320, 141, 'Cancel', { size: 12.5, w: 600, c: '#4a4f70', a: 'middle' })
        + T(176, 180, 'Cancel online up to 1 day', { size: 11, c: MUTED }) + T(176, 196, 'before the start.', { size: 11, c: MUTED })
        + slot(232, 334, .9)
        + cap('4. Changes happen from\ntheir booking link.'), 'The client’s booking link with Reschedule and Cancel'),
    ],
  };
};
