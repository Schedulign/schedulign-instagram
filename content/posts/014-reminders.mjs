// Spotlight: reminder emails before the session. Maya, stylist.
// Claims: help/notifications-and-emails (a reminder before the session at the hours set on the event; the button says Reschedule or cancel).
export default (k) => {
  const { svg, cap, T, person, slot, salon, salonChair, kitchen, clock, phoneFlat, bubble, card, toggle, field, btn, phoneSlide, room, heldItem, MAYA, CLIENT1, LIME, NAVY, MUTED, CTA } = k;
  return {
    title: 'Reminders: the day before, by email',
    pillar: 'spotlight',
    claims: ['notifications-and-emails'],
    caption: `"Wait, was that today?" costs you an hour and a client.

Turn on reminders for the event and choose how many hours before the session they go out. Clients get an email with the time, the place and a button to reschedule or cancel if something came up.

${CTA}

#schedulign #hairstylist #salonowner #behindthechair #bookingpage`,
    slides: [
      svg(salon() + clock(200, 86, 20, 10, 20) + phoneFlat(302, 304, true) + bubble(206, 236, 'omg was that today??')
        + salonChair(186, 318) + person({ x: 90, y: 392, s: 1.02, ...MAYA, arms: 'hips', face: 'tired' })
        + cap('10:20am. Empty chair.'), 'Maya next to an empty chair as a client realises they forgot'),
      phoneSlide(room({ lamps: [], day: true, floorY: 420 }) + '<g data-floor="420"></g>',
        T(14, 44, 'Cut and style · 60 min', { size: 10.5, c: MUTED }) + T(14, 68, 'Notifications', { size: 19, w: 700 })
        + `<rect x="10" y="80" width="172" height="104" rx="12" fill="#f5f9e3" stroke="${LIME}" stroke-width="2"/>` + T(22, 106, 'Reminder', { size: 13, w: 700 }) + toggle(132, 92, true)
        + field(22, 124, 148, 'Hours before', '24')
        + `<rect x="10" y="194" width="172" height="44" rx="12" fill="#fff" stroke="#e1e4ee" stroke-width="1.5"/>` + T(22, 221, 'Follow-up email', { size: 12, w: 600 }) + toggle(132, 205, false)
        + btn(10, 296, 172, 'Save'),
        'Turn on reminders.', 'The reminder switch set to 24 hours before'),
      svg(kitchen(true) + person({ x: 110, y: 392, s: 1, ...CLIENT1, arms: 'phone' }) + heldItem('mug', 330, 290)
        + card(170, 44, 212, 176) + T(186, 70, 'Reminder', { size: 11, w: 700, c: MUTED }) + T(186, 92, 'Cut and style', { size: 15, w: 700 }) + T(186, 111, 'Tomorrow · 10:00am', { size: 12, c: '#3a3f5e' })
        + T(186, 130, 'with Maya', { size: 12, c: '#3a3f5e' }) + btn(186, 172, 180, 'Reschedule or cancel', 'line')
        + slot(290, 392, .9, { wave: true })
        + cap('The day before,\nthey get an email.'), 'A client reading a reminder email at breakfast'),
      svg(salon() + clock(200, 86, 20, 10, 0)
        + salonChair(180, 318) + person({ x: 176, y: 318, s: .92, pose: 'sit', ...CLIENT1, top: '#aab0c6', face: 'grin' })
        + person({ x: 84, y: 392, s: 1.02, ...MAYA, arms: 'cut', hold: 'scissors', face: 'grin' })
        + cap('10:00am.\nRight on time.'), 'The client in Maya’s chair at 10am'),
    ],
  };
};
