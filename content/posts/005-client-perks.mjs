// Spotlight: client groups and perks. Priya, photographer.
// Claims: help/clients-groups-and-access (Early access; A shorter notice; Books instantly on a by-request event; Can pay offline; Member access).
export default (k) => {
  const { svg, cap, T, person, slot, living, park, card, check, box, btn, phoneSlide, room, PRIYA, CLIENT4, KID, LIME, NAVY, MUTED, CTA } = k;
  return {
    title: 'Client perks: regulars first',
    pillar: 'spotlight',
    claims: ['clients-groups-and-access'],
    caption: `Your regulars should not find out about mini sessions at the same time as everyone else.

Put them in a client group and give that group perks on any event: book further ahead than everyone else, book closer to the start, skip approval on a request-only event, or pay offline. They unlock them on your booking page with their email. No account needed.

${CTA}

#schedulign #photographybusiness #minisessions #photographer #bookingpage`,
    slides: [
      svg(living(90)
        + person({ x: 118, y: 344, s: .9, pose: 'sit', ...CLIENT4, arms: 'phone', face: 'sad' })
        + card(160, 58, 222, 144) + T(176, 84, 'Fall mini sessions', { size: 15, w: 700 }) + T(176, 102, 'with Priya', { size: 11, c: MUTED })
        + ['Sat 4', 'Sun 5', 'Sat 11', 'Sun 12'].map((t, i) => { const x = 176 + (i % 2) * 100, y = 114 + Math.floor(i / 2) * 38; return `<rect x="${x}" y="${y}" width="92" height="30" rx="9" fill="#f1f2f6"/>` + T(x + 46, y + 19.5, t, { size: 12, c: '#a3a7bd', a: 'middle' }) + `<path d="M${x + 18},${y + 15} h56" stroke="#a3a7bd" stroke-width="1.6"/>`; }).join('')
        + cap('Your regulars found out\nwith everyone else.'), 'A regular client sad that the mini sessions are fully booked'),
      phoneSlide(room({ lamps: [], day: true, floorY: 420 }) + '<g data-floor="420"></g>',
        T(14, 44, 'Mini session · 20 min', { size: 10.5, c: MUTED }) + T(14, 68, 'Client perks', { size: 19, w: 700 })
        + `<rect x="10" y="80" width="172" height="40" rx="12" fill="#f5f9e3" stroke="${LIME}" stroke-width="2"/>` + T(22, 105, 'Regulars', { size: 12.5, w: 700 }) + T(170, 105, '24 people', { size: 10.5, c: MUTED, a: 'end' })
        + box(14, 136, true) + T(38, 149, 'Early access', { size: 12, w: 600 }) + `<rect x="126" y="132" width="54" height="24" rx="8" fill="#eef0f5"/>` + T(153, 148, '3 days', { size: 11, w: 700, a: 'middle' })
        + box(14, 170, false) + T(38, 183, 'A shorter notice', { size: 12 })
        + box(14, 204, false) + T(38, 217, 'Books instantly', { size: 12 })
        + box(14, 238, false) + T(38, 251, 'Can pay offline', { size: 12 })
        + btn(10, 296, 172, 'Save'),
        'Give a group perks,\nper event.', 'Client perks for a group called Regulars: early access by 3 days'),
      svg(living(90)
        + person({ x: 118, y: 344, s: .9, pose: 'sit', ...CLIENT4, arms: 'phone', face: 'grin' })
        + card(160, 58, 222, 150) + T(176, 84, 'Member access', { size: 13, w: 700 })
        + `<rect x="176" y="96" width="190" height="34" rx="9" fill="#f6f7fb" stroke="#dfe2ec"/>` + T(188, 118, 'dana@mail.com', { size: 13 })
        + `<rect x="176" y="142" width="190" height="50" rx="11" fill="#f5f9e3"/>` + check(196, 167) + T(214, 162, 'Regulars', { size: 12, w: 700 }) + T(214, 179, 'Book 3 days early', { size: 11, c: '#4a4f70' })
        + slot(232, 334, .9, { wave: true })
        + cap('They unlock them\nwith their email.'), 'A regular unlocking early access with their email'),
      svg(park()
        + person({ x: 94, y: 430, s: .98, ...PRIYA, arms: 'shoot', hold: 'camera' })
        + person({ x: 268, y: 420, s: .95, flip: true, ...CLIENT4, arms: 'wave', face: 'grin' })
        + person({ x: 318, y: 436, s: .6, flip: true, ...KID, arms: 'cheer', face: 'grin' })
        + cap('Regulars first.\nEvery season.', 478), 'Priya photographing her regular client and their kid in a park'),
    ],
  };
};
