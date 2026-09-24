# Schedulign on Instagram

Rules for what gets posted. The weekly job (ROUTINE.md) follows this file, and so should anyone who writes a post by hand.

## Who it is for

People who sell their time: trainers, stylists, tutors, consultants, therapists, photographers, mobile pros like detailers, and small teams of them. The feed shows them doing their work, and shows the booking page taking a chore off their hands.

## The look: "Lamplight"

Friendly cartoon scenes drawn in code (`art/engine.mjs`). The reference is the Instagram account buildwithorin.

- **One short line per slide**, big and white with a dark outline, readable in the grid. The long explanation goes in the caption.
- **A small story across the slides**, usually with a time stamp: the problem, the fix, the client's side, how it ends.
- **Scenes happen when the story does.** Daylight for daytime (salons, driveways, gyms, parks, after-school tutoring). Lamplight only for early mornings and late nights.
- **Lime means the booking page is at work**: a lime button, a lime check, or **Slot**, the lime calendar character. Lime is never used for anything else.
- **Phone screens use the product's real labels**, checked against the help center. They are simplified, never invented.

## The cast

| Character | Profession | Look |
|---|---|---|
| Maya | Stylist | Bun, coral top, navy apron, scissors |
| Jonah | Mobile detailer | Teal cap with a water drop, yellow shirt, the SHINE van |
| Dev | Trainer | Athletic, orange tank top, yellow headband, beard, towel, white sneakers |
| Rosa | Tutor | Long auburn hair, glasses, periwinkle sweater, books |
| Priya | Photographer | Dark ponytail, navy top, camera |
| Slot | The booking page | Lime calendar tile with a navy top, binder rings, a smile |

Clients are drawn from the `CLIENT1` to `CLIENT4`, `KID` and `STUDENT` presets in the engine. Keep each person's look the same from post to post. A new cast member needs a preset in the engine first.

## What gets posted

| Format | Share | Shape |
|---|---|---|
| **Feature spotlight** | About 4 of every 7 | A real problem, the feature that fixes it, what the client sees, the happy ending. Sam's favourite. |
| **DM to book** (before / after) | About 1 in 7 | The messy way booking happens today, then the same moment with a link. |
| **The business of your time** (tips) | About 1 in 7 | Useful advice first, often with a number slide; the feature appears as how you would do it. |
| Free slot | About 1 in 7 | Another spotlight, or the best-performing format so far. |

Spotlights still to make (not yet in the queue): the booking widget on your own site, tips, the follow-up email with a book-again link, hiding an event from the page and sharing a direct link, access codes for private events, blocking a client, date-specific hours, booking notice and how far ahead clients can book, pay online or pay at the session per event, lengths without prices. Team features wait until the solo product is the focus of the feed. Before writing any of them, check the feature against its help article (below).

## Truth rules (enforced by `lib/lint.mjs`)

- **Every claim names its help article** in `claims`, and the article must be live at `https://www.schedulign.com/help/<slug>`. Read the article before writing the post. If the help center does not say the product does it, the post does not say so either.
- Never "coach" or "coaching". The product never says "we", "our" or "us". No exclamation marks.
- No promises about the future: no launch date, no feature that is "coming", no price except Pro at $20 a month and $10 per member seat, and "every plan is $0 during early access".
- Held back until they are ready: Google Calendar sync and Google Meet (the Google app is not verified yet), online card payments (confirm a real host can connect Stripe first), SMS (it does not exist).

## Voice

Second person, plain and warm. Short sentences. A little wry, never snarky about clients. Examples illustrate and never define: say "for example" rather than implying the product can only do one thing.

## Captions

- First line: the hook, unique across the whole queue (the publisher uses it to spot duplicates).
- Then two to four short paragraphs: the feature in plain words.
- Then the call to action (`${CTA}` in the post file) on spotlights and before/afters. Tips end with "Save this for…" instead.
- Five hashtags: `#schedulign`, two or three for the profession, and `#bookingpage` or a tip tag.

## Cadence

One post a day at about 11:30am Pacific. The weekly job keeps at least ten days of posts in the queue, so each new post waits a week or more before it goes out. That is the review window.

## Measuring (once there is an account)

Weekly, from Instagram Insights: profile visits and link taps (the numbers that matter before launch), saves and shares per post (which format is useful), and reach from non-followers. After four weeks, keep the two formats with the most saves and shares per post and cut the weakest one. Schedulign does not track where sign-ups come from, so quote no conversion rate.
