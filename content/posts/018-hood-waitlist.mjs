// Under the hood: what happens when a booked time frees up.
// Claims: help/openings-alerts-and-waitlists (the first on the day's waitlist has the freed time held for two hours with a claim link;
// an unclaimed hold passes to the next in line; automatic alerts reach everyone whose window includes the time;
// when the host cancels, nothing is sent automatically and the row offers Send new openings notification).
export default (k) => {
  const { svg, cap, person, slot, titleCard, diagramBg, flowCard, arrowDown, CLIENT1, CLIENT2, MAYA, CTA } = k;
  return {
    title: 'Under the hood: when someone cancels',
    series: 'hood',
    claims: ['openings-alerts-and-waitlists'],
    caption: `What actually happens when a booked time frees up.

1. The first person on that day's waitlist has the time held for two hours, with a link to claim it. While it is held, nobody else can book it.
2. If they do not claim it, the hold passes to the next person in line.
3. If alerts are automatic for the event, everyone waiting for a time in that window gets an email as soon as it opens.
4. If you cancel a booking yourself, nothing goes out automatically. The time is held for the first in line, and you choose when to send a new openings notification.

Openings and waitlist alerts are switched on per event.

${CTA}

#schedulign #bookingpage #waitlist #smallbusinesstips #selfemployed`,
    slides: [
      svg(titleCard(['What happens when', 'someone cancels?'], { sub: 'The waitlist, step by step', mood: 'surprised', wave: false }), 'What happens when someone cancels'),
      svg(diagramBg() + flowCard(40, 60, 320, 'Thursday 4:15 frees up', 'A client cancels online.', { tone: 'event' }) + arrowDown(200, 136, 172)
        + flowCard(40, 176, 320, 'Held for the first in line', 'Two hours, with a link to claim it.', { tone: 'page' })
        + person({ x: 110, y: 400, s: .72, ...CLIENT1, arms: 'phone', face: 'grin' }) + slot(300, 398, 1.1, { point: true })
        + cap('1. It’s held for the\nfirst person waiting.'), 'A freed time held for the first person on the waitlist'),
      svg(diagramBg() + flowCard(40, 60, 320, 'Not claimed in two hours?', 'The first person passed or missed it.', { tone: 'event' }) + arrowDown(200, 136, 172)
        + flowCard(40, 176, 320, 'It passes to the next person', 'Same hold, same claim link.', { tone: 'page' })
        + person({ x: 110, y: 400, s: .72, ...CLIENT2, arms: 'phone', face: 'grin' }) + slot(300, 398, 1.1, { point: true })
        + cap('2. Unclaimed? It moves\nto the next in line.'), 'An unclaimed hold passing to the next person'),
      svg(diagramBg() + flowCard(40, 60, 320, 'Alerts set to automatic', 'Chosen per event.', { tone: 'you' }) + arrowDown(200, 136, 172)
        + flowCard(40, 176, 320, 'Everyone watching hears', 'Anyone waiting for a time in that\nwindow gets an email right away.', { tone: 'page' })
        + slot(200, 410, 1.3, { wave: true })
        + cap('3. Everyone watching\nthat time hears.'), 'Openings alerts emailing everyone waiting for that window'),
      svg(diagramBg() + flowCard(40, 60, 320, 'You canceled it yourself?', 'Nothing goes out automatically.', { tone: 'you' }) + arrowDown(200, 136, 172)
        + flowCard(40, 176, 320, 'You choose when to tell them', 'The time is held for the first in line.\nSend new openings notification when ready.', { tone: 'page' })
        + person({ x: 110, y: 404, s: .72, ...MAYA, arms: 'phone' }) + slot(300, 398, 1.1)
        + cap('4. If you cancel,\nyou decide who hears.'), 'When the host cancels, the host decides when to notify'),
    ],
  };
};
