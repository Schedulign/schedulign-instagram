// Episode: Jonah's first month, the first booking. Standalone.
// Claims: help/for-your-clients (your page at schedulign.com/your-page; clients book without an account).
export default (k) => {
  const { svg, cap, T, person, outdoor, house, van, car, sparkle, kitchen, card, notice, heldItem, JONAH, CLIENT2, LIME, NAVY, MUTED, CTA } = k;
  return {
    title: 'Jonah’s first month: the first booking',
    series: 'episode',
    badge: 'Jonah’s first month',
    claims: ['for-your-clients'],
    caption: `New van, new business, zero clients.

Jonah put his booking link in his bio and went to bed. The first booking came in over breakfast: a day, a time and an address, without a single message back and forth.

Jonah's first month, one moment at a time.

${CTA}

#schedulign #mobiledetailing #newbusiness #smallbusinessjourney #bookingpage`,
    slides: [
      svg(outdoor('day') + `<rect y="352" width="400" height="148" fill="#a9adbd"/><rect y="340" width="400" height="14" fill="#6fa06a"/>`
        + van(40, 452) + sparkle(120, 318, 9, LIME) + sparkle(200, 340, 6)
        + person({ x: 316, y: 462, s: 1, ...JONAH, arms: 'hold', hold: 'sponge', face: 'grin' })
        + cap('Brand-new van.\nZero clients.', 474), 'Jonah proudly standing next to his new van'),
      svg(kitchen(false) + person({ x: 110, y: 392, s: 1, ...JONAH, arms: 'phone' })
        + card(168, 60, 214, 150) + T(184, 88, 'SHINE Mobile Detail', { size: 15, w: 700 }) + T(184, 106, 'Driveway details · Saturdays', { size: 11, c: MUTED })
        + `<rect x="184" y="120" width="182" height="30" rx="9" fill="#f6f7fb" stroke="#dfe2ec"/>` + T(196, 140, 'schedulign.com/shine', { size: 12, w: 600 })
        + `<rect x="184" y="158" width="182" height="36" rx="11" fill="${LIME}"/>` + T(275, 181, 'Book a detail', { size: 13, w: 700, c: NAVY, a: 'middle' })
        + cap('Link in bio.\nFingers crossed.'), 'Jonah at night putting his booking link in his bio'),
      svg(kitchen(true) + person({ x: 110, y: 392, s: 1, ...JONAH, arms: 'phone', face: 'surprised' }) + heldItem('mug', 330, 290)
        + notice(150, 60, 232, 'New booking', 'Saturday · 9:00am · Driveway')
        + cap('7:10am. Someone\nbooked Saturday.'), 'Jonah at breakfast seeing his first booking'),
      svg(outdoor('day') + `<rect y="352" width="400" height="148" fill="#6fa06a"/><path d="M150,352 L400,352 L400,500 L60,500Z" fill="#a9adbd"/>`
        + house(186, 352, 214, 150, '#e3b776', { num: '9', day: true })
        + person({ x: 293, y: 352, s: .62, ...CLIENT2, arms: 'wave', face: 'grin' })
        + car(6, 440) + sparkle(60, 360, 9) + sparkle(210, 350, 7) + sparkle(250, 410, 6, LIME)
        + person({ x: 334, y: 456, s: .92, flip: true, ...JONAH, arms: 'work', hold: 'sponge', face: 'grin' })
        + cap('Saturday, 9am.\nClient number one.', 476), 'Jonah detailing his first client’s car'),
    ],
  };
};
