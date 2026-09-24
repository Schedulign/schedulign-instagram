// Spotlight: peak pricing and discounts by day and hour. Dev, trainer.
// Claims: help/durations-and-pricing (Peak pricing windows: name, % or $, positive or negative, days, hours;
// peak times shaded amber and discounts lime with the adjusted price and a legend).
export default (k) => {
  const { svg, cap, T, person, slot, room, gymBg, clock, card, priceRow, phoneSlide, btn, DEV, CLIENT3, CLIENT1, CLIENT2, LIME, MUTED, CTA } = k;
  const rule = (y, name, amount, days, hours, tone) => `<rect x="10" y="${y}" width="172" height="62" rx="12" fill="${tone === 'peak' ? '#fdf3dc' : '#f5f9e3'}" stroke="${tone === 'peak' ? '#f2c14e' : LIME}" stroke-width="2"/>`
    + T(22, y + 22, name, { size: 12.5, w: 700 }) + T(170, y + 22, amount, { size: 12.5, w: 700, a: 'end' }) + T(22, y + 42, days, { size: 10.5, c: MUTED }) + T(22, y + 55, hours, { size: 10.5, c: MUTED });
  return {
    title: 'Peak pricing: Saturday is not Tuesday',
    pillar: 'spotlight',
    claims: ['durations-and-pricing'],
    caption: `Your Saturday morning is not worth the same as your Tuesday afternoon.

Peak pricing adds windows that change the price by day and hour: a percentage or a dollar amount, up for your busiest times or down to fill the quiet ones. Clients see the adjusted price before they choose, with the window named.

${CTA}

#schedulign #personaltrainer #fitnessbusiness #pricingstrategy #bookingpage`,
    slides: [
      svg(gymBg('day') + clock(200, 110, 20, 9, 0)
        + person({ x: 300, y: 394, s: .82, ...CLIENT1, face: 'tired' }) + person({ x: 350, y: 398, s: .82, ...CLIENT2, face: 'sad' }) + person({ x: 250, y: 396, s: .82, ...CLIENT3 })
        + person({ x: 120, y: 394, s: 1.02, ...DEV, arms: 'hips', face: 'surprised' })
        + cap('Saturday 9am.\nEveryone wants it.'), 'A crowd of clients waiting for Dev on Saturday morning'),
      phoneSlide(room({ lamps: [], day: true, floorY: 420 }) + '<g data-floor="420"></g>',
        T(14, 44, 'Strength session · 60 min · $60', { size: 10.5, c: MUTED }) + T(14, 68, 'Peak pricing', { size: 19, w: 700 })
        + rule(82, 'Weekend mornings', '+20%', 'Sat, Sun', '8:00am to 12:00pm', 'peak')
        + rule(154, 'Quiet afternoons', '−10%', 'Tue, Wed', '1:00pm to 4:00pm', 'deal')
        + btn(10, 296, 172, 'Save'),
        'Price the busy hours.\nFill the quiet ones.', 'Two peak pricing windows: weekend mornings up 20 percent, quiet afternoons down 10 percent'),
      svg(room({ lamps: [200], day: true, win: { x: 40, y: 120, w: 100, h: 110, sky: 'day' } })
        + person({ x: 110, y: 392, s: 1, ...CLIENT3, arms: 'phone' })
        + card(170, 44, 212, 212) + T(186, 72, 'Tuesday', { size: 15, w: 700 })
        + priceRow(186, 84, 180, '11:00am', '$60') + priceRow(186, 120, 180, '2:00pm', '$54', 'deal') + priceRow(186, 156, 180, '3:00pm', '$54', 'deal')
        + `<rect x="186" y="200" width="12" height="12" rx="3" fill="#eef6cc" stroke="${LIME}"/>` + T(204, 210, 'Quiet afternoons −10%', { size: 11, c: '#4a4f70' })
        + slot(300, 392, .9, { point: true })
        + cap('Clients see it\nbefore they choose.'), 'A booking page with discounted afternoon times shaded lime'),
      svg(gymBg('day') + clock(200, 110, 20, 2, 0)
        + person({ x: 120, y: 394, s: 1.02, ...DEV, arms: 'cheer', face: 'grin' })
        + person({ x: 250, y: 394, s: .95, ...CLIENT3, arms: 'lift', hold: 'kettlebell', face: 'grin' })
        + cap('Tuesday 2pm.\nNot so quiet now.'), 'Dev training a client on a Tuesday afternoon'),
    ],
  };
};
