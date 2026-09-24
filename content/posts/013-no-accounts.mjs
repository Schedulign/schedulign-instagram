// Before / after: the account wall. A client of Priya's.
// Claims: help/for-your-clients (clients book without an account).
export default (k) => {
  const { svg, cap, T, person, slot, living, park, card, field, btn, bars, PRIYA, CLIENT4, KID, LIME, NAVY, MUTED, CTA } = k;
  return {
    title: 'No client accounts: just book',
    pillar: 'before-after',
    claims: ['for-your-clients'],
    caption: `"Create an account to continue" is where a lot of bookings go to die.

Your clients never make an account. They pick a time, fill in your form and book. Changes happen from the link in their confirmation email.

${CTA}

#schedulign #photographybusiness #smallbusinessowner #bookingpage #onlinebooking`,
    slides: [
      svg(living()
        + person({ x: 118, y: 344, s: .9, pose: 'sit', ...CLIENT4, arms: 'phone', face: 'sad' })
        + card(160, 54, 222, 186) + T(176, 82, 'Create an account', { size: 15, w: 700 }) + T(176, 100, 'to continue', { size: 11, c: MUTED })
        + field(176, 116, 190, 'Password', '••••••••') + T(176, 186, 'Must have 12 characters, a', { size: 10, c: '#c0504d' }) + T(176, 200, 'symbol, a number and a', { size: 10, c: '#c0504d' }) + T(176, 214, 'capital letter', { size: 10, c: '#c0504d' })
        + cap('“Create an account\nto book.”'), 'A client stuck on a create-an-account screen'),
      svg(living()
        + person({ x: 118, y: 344, s: .9, pose: 'sit', ...CLIENT4, arms: 'phone', face: 'tired' })
        + card(160, 70, 222, 110) + T(176, 98, 'Reset your password', { size: 15, w: 700 }) + bars(176, 112, 3, 180) + T(176, 160, 'Check your email.', { size: 11, c: MUTED })
        + cap('11pm. Password reset.\nGave up.'), 'The client giving up on a password reset'),
      svg(living()
        + person({ x: 118, y: 344, s: .9, pose: 'sit', ...CLIENT4, arms: 'phone', face: 'grin' })
        + card(160, 44, 222, 200) + T(176, 70, 'Your details', { size: 15, w: 700 })
        + field(176, 84, 190, 'Name', 'Dana Wells') + field(176, 140, 190, 'Email', 'dana@mail.com')
        + `<rect x="176" y="196" width="190" height="36" rx="11" fill="${LIME}"/>` + T(271, 219, 'Book', { size: 13, w: 700, c: NAVY, a: 'middle' })
        + slot(232, 334, .9, { wave: true })
        + cap('No account.\nJust book.'), 'The same client booking with only a name and email'),
      svg(park() + person({ x: 90, y: 440, s: .98, ...PRIYA, arms: 'shoot', hold: 'camera' })
        + person({ x: 260, y: 430, s: .95, flip: true, ...CLIENT4, arms: 'wave', face: 'grin' }) + person({ x: 318, y: 440, s: .6, flip: true, ...KID, arms: 'cheer', face: 'grin' })
        + cap('Booked. Nothing\nto remember.', 476), 'Priya photographing the client who booked'),
    ],
  };
};
