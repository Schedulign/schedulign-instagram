// Episode: Jonah's first month, the rainy Tuesday. Standalone.
// Claims: help/for-your-clients (clients reschedule from their booking link while the event's online windows are open;
// the calendar entry moves), help/cancellations-and-refunds (Clients can reschedule online, up to a window),
// help/notifications-and-emails (New time email after a reschedule).
export default (k) => {
  const { svg, cap, T, person, outdoor, rainy, rain, van, car, sparkle, livingDay, kitchen, card, emailCard, slot, JONAH, CLIENT2, LIME, NAVY, MUTED, CTA } = k;
  return {
    title: 'Jonah’s first month: the rainy Tuesday',
    series: 'episode',
    badge: 'Jonah’s first month',
    claims: ['for-your-clients', 'cancellations-and-refunds', 'notifications-and-emails'],
    caption: `Rain moved four bookings, and Jonah did not make four phone calls.

When an event lets clients reschedule online, they move the booking themselves from the link in their confirmation, up to the window you set. They get a New time email and their calendar entry moves with it.

Jonah's first month, one moment at a time.

${CTA}

#schedulign #mobiledetailing #autodetailing #mobilebusiness #bookingpage`,
    slides: [
      svg(rainy() + `<rect y="380" width="400" height="120" fill="#7b8196"/><ellipse cx="120" cy="470" rx="60" ry="8" fill="#9aa3bd"/><ellipse cx="320" cy="430" rx="40" ry="6" fill="#9aa3bd"/>`
        + van(20, 452) + person({ x: 300, y: 462, s: 1, ...JONAH, arms: 'phone', face: 'sad' }) + rain()
        + cap('Tuesday: rain.\nFour details booked.', 474), 'Jonah standing in the rain next to his van'),
      svg(livingDay() + person({ x: 118, y: 344, s: .9, pose: 'sit', ...CLIENT2, arms: 'phone' })
        + card(160, 56, 222, 176) + T(176, 82, 'Driveway detail', { size: 11, w: 700, c: MUTED }) + T(176, 104, 'Tuesday · 10:00am', { size: 15, w: 700 })
        + `<rect x="176" y="118" width="92" height="36" rx="11" fill="${LIME}"/>` + T(222, 141, 'Reschedule', { size: 12.5, w: 700, c: NAVY, a: 'middle' })
        + `<rect x="274" y="118" width="92" height="36" rx="11" fill="#fff" stroke="#c3c7d6" stroke-width="1.5"/>` + T(320, 141, 'Cancel', { size: 12.5, w: 600, c: '#4a4f70', a: 'middle' })
        + T(176, 180, 'Reschedule online up to', { size: 11, c: MUTED }) + T(176, 196, '2 hours before the start.', { size: 11, c: MUTED })
        + slot(232, 334, .9, { point: true })
        + cap('They move it from\ntheir booking link.'), 'A client rescheduling from their booking link'),
      svg(kitchen(true) + person({ x: 110, y: 392, s: 1, ...CLIENT2, arms: 'phone', face: 'grin' })
        + emailCard(168, 48, 216, 'SHINE via Schedulign', 'New time: Thursday 10am', ['Driveway detail with Jonah', 'Your calendar moved too.'])
        + cap('Their calendar entry\nmoves with it.'), 'A New time email and the calendar entry moving'),
      svg(outdoor('day') + `<rect y="352" width="400" height="148" fill="#6fa06a"/><path d="M150,352 L400,352 L400,500 L60,500Z" fill="#a9adbd"/>`
        + car(6, 440) + sparkle(60, 360, 9) + sparkle(210, 350, 7) + sparkle(250, 410, 6, LIME)
        + person({ x: 334, y: 456, s: .92, flip: true, ...JONAH, arms: 'work', hold: 'sponge', face: 'grin' })
        + cap('Thursday: sun.\nSame four clients.', 476), 'Jonah detailing a car on a sunny Thursday'),
    ],
  };
};
