// Under the hood: which times a client sees.
// Claims: help/availability ("A time is offered only when all of these agree": hours, date-specific hours, days off,
// buffers around existing bookings, booking limits, notice and window, every booking made through Schedulign).
export default (k) => {
  const { svg, cap, T, slot, card, titleCard, diagramBg, timeChip, CTA } = k;
  const TIMES = ['9:00am', '10:00am', '11:00am', '12:00pm', '1:00pm', '2:00pm', '3:00pm'];
  const day = (states, note = '') => diagramBg() + card(30, 40, 236, 290) + T(46, 66, 'Thursday · your hours', { size: 13, w: 700 })
    + TIMES.map((t, i) => timeChip(46, 80 + i * 34, t, states[i] || 'open', 204)).join('')
    + (note ? card(200, 344, 184, 54) + T(214, 366, note.split('\n')[0], { size: 11, w: 600 }) + T(214, 383, note.split('\n')[1] || '', { size: 11, c: '#6a6f8f' }) : '')
    + slot(330, note ? 330 : 380, 1.1, { point: true });
  return {
    title: 'Under the hood: which times clients see',
    series: 'hood',
    claims: ['availability'],
    caption: `Your booking page never guesses which times to show.

A time is offered only when everything agrees: the event's hours, any date-specific hours and days off, the bookings you already have and the buffers around them, your minimum notice, how far ahead clients can book, and any booking limits you set. A booking made through Schedulign blocks its time on every event you offer.

What is left is your page.

${CTA}

#schedulign #bookingpage #scheduling #smallbusinesstips #selfemployed`,
    slides: [
      svg(titleCard(['Which times do', 'clients see?'], { sub: 'How your page decides' }), 'Which times do clients see'),
      svg(day([]) + cap('Start with\nyour hours.'), 'Seven hourly start times from 9am to 3pm'),
      svg(day(['open', 'buffer', 'booked', 'buffer'], 'Buffer: 60 min\nbefore and after') + cap('Minus bookings and\nthe buffers around them.'), 'An 11am booking blocks the hours on either side'),
      svg(day(['gone', 'buffer', 'booked', 'buffer'], 'It’s 7:00am.\nMinimum notice: 3 hours') + cap('Minus anything inside\nyour notice.'), '9am is inside the three-hour notice'),
      svg(day(['gone', 'gone', 'gone', 'gone', 'left', 'left', 'left'], 'Also: days off, limits,\nhow far ahead') + cap('What’s left is\nyour page.'), 'Only 1pm, 2pm and 3pm remain'),
    ],
  };
};
