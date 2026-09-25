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

## What gets posted: series that run side by side

Every post belongs to a series (`series:` in its file; `lib/series.mjs`). The series run at the same time, so the feed mixes them, and none of them ties the others down.

| Series | Badge on slide 1 | What it is |
|---|---|---|
| **Intro** (`intro`) | Meet Schedulign | What Schedulign is, how a booking works, the cast. Always goes out before everything else waiting; the first three are pinned on the profile. Add a fresh intro now and then for new followers. |
| **Spotlights** (`spotlight`) | Feature spotlight | A real problem, the feature that fixes it, what the client sees, the happy ending. The backbone of the feed and Sam's favourite. |
| **Under the hood** (`hood`) | Under the hood | How something actually works, step by step, drawn as a diagram (`titleCard`, `diagramBg`, `flowCard`, `timeChip`). Every step comes from the help center. |
| **Episodes** (`episode`) | The run's name, e.g. "Jonah's first month" | A standalone moment from a recurring character's work that quietly uses a feature. No numbers anywhere, on the slides or in the caption: no "Part 2", "Episode 3", "Day 1" or "2/5", so nobody feels they have to go back and catch up (lint rejects them). Any episode can be held, skipped or reordered without leaving a story hanging. A run is a handful of episodes; then start a new run with another character. |
| **Before/after and tips** (`everyday`) | none | The messy way booking happens today vs a link, and saveable advice with a number slide. |

The posting order comes from a weekly pattern, not the file numbers: Mon spotlight, Tue under the hood, Wed episode, Thu spotlight, Fri before/after or tip, Sat episode, Sun spotlight. When a series has nothing waiting, the next one fills its day (spotlight, then everyday, under the hood, episode). File numbers only order posts within a series.

Episode runs to come, after "Jonah's first month": Maya going out on her own, Rosa's exam season, Priya's busiest fall, Dev's 6am regulars.

Under-the-hood ideas: what each email a client gets says and when, what happens to a booking when it is rescheduled, how a request moves from asked to approved (or expired), how peak windows change a price, how client perks unlock with an email.

### Themes to keep hitting (from a look at Calendly's feed, Sep 24 2026)

Calendly's feed is mostly static text graphics and talking-head reels. The themes are worth covering; the flat, story-driven art is where Schedulign does them better.

- **Getting paid.** Calendly leads with invoicing: "getting paid should feel like the finish line". Schedulign's version: card payments at booking through the host's own Stripe account, or offline methods they already take, chosen per event; tips at checkout or afterwards; a payment link after an approved request; automatic or manual refunds. Held until Sam confirms a real host has connected Stripe and taken a card (then drop the hold line in the truth rules).
- **Reward regulars, fill slow weeks.** Calendly pushes coupon codes. Schedulign has client perks (done), discount windows in peak pricing (a negative percentage for quiet hours), and discount codes through Stripe at checkout (with payments).
- **Where clients already are.** Your link in your Instagram bio (very on-theme for this account), a QR code for the van, the salon mirror or a flyer, the booking widget on your own website.
- **Protect your time.** "More space for what matters": days off and date-specific hours, buffers, evenings with no "are you free" texts, a real holiday while the page keeps booking the weeks after.
- **Seasons and moments.** Tie posts to the calendar a week or two ahead: back to school and exam season (Rosa), holiday party season (Maya), wedding and fall mini-session season (Priya), New Year gym rush (Dev), first snow and pollen season (Jonah).
- **Talk with people.** End about one caption in four with a question that invites a comment ("How do clients book you today: DMs, texts or a link?"). Keep it light and specific; never bait.
- **A person behind it.** Calendly's best-performing posts feature a real person (a customer story, a "How I Work" guest). Real customer stories wait for a real host who agrees to it (Sam's call, with their words, never invented numbers). Until then the cast carries it.

What to avoid, also from Calendly's comments: several people pushing back on AI features they did not ask for, and support questions left unanswered under posts. Lead with simple and human, never with AI, and never claim what the product does not do. Comments asking for help get pointed to schedulign.com/help or admin@schedulign.com (Sam or whoever runs the account replies; the automation never does).

Spotlights still to make (not yet in the queue): your link in your Instagram bio, a QR code on the van or the mirror, the booking widget on your own site, tips, the follow-up email with a book-again link, hiding an event from the page and sharing a direct link, access codes for private events, blocking a client, date-specific hours, booking notice and how far ahead clients can book, pay online or pay at the session per event, lengths without prices. Team features wait until the solo product is the focus of the feed. Before writing any of them, check the feature against its help article (below).

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
