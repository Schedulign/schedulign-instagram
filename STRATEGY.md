# Schedulign on Instagram

Rules for what gets posted. The weekly job (ROUTINE.md) follows this file, and so should anyone who writes a post by hand.

## The brand brief (Sam's answers, Sep 28 2026)

The full description, from eight rounds of Sam's answers, is **brand/BRAND-BOOK.md**: the company, the customer, pains and fears, positioning, messaging, voice with examples, Slot, the visual identity, the truth rules and channels. It wins over everything here. This section is its short form.

| | |
|---|---|
| **Who first** | Solo pros, led by **fitness and wellness**: personal trainers, massage therapists, therapists and other wellness pros who work by appointment (appointments, not classes: classes are out of scope). Everyone else stays welcome, and other professions keep appearing, but most posts speak to them. |
| **The one takeaway** | **It takes the admin off me.** No back-and-forth, no chasing payments or waivers; the page handles it. |
| **Voice** | Warm, friendly and playful. The humor is about the **situation** (DM chaos, 11pm texting, the paper-waiver pile), never at a client's expense. |
| **Tagline** | "The booking page that runs your business." |
| **Lead features** | **Waivers signed at booking** and **getting paid**. |
| **The doubt to answer** | "My clients just text me, DMs work fine." Answer it with the hidden cost of the back-and-forth, never by mocking the habit. |
| **Words** | Clients book **sessions**. Never name another product. |
| **Price** | Value first. Posts lead with the problem solved; free comes up lightly or not at all. |
| **Slot** | The only named character. Slot says hello ("Hi, I'm Slot…") and appears whenever the booking page does the work; the freelancers lead the stories, unnamed. |
| **Off-limits** | Health or results claims (Schedulign books the time; it promises no outcome), and body or weight themes (no before/after bodies, no weight-loss jokes). |
| **Goal** | Sign-ups. Every post points to the link in bio; measure link taps and new accounts. |
| **Cadence** | Five posts a week, weekdays. TikTok is the next channel. |

**Faces for this focus.** The trainer (`DEV` preset) carries most fitness stories. Add a massage therapist as a new preset in the engine and give them the next few stories. Priority topics: waivers, no-shows and cancellation policies, reminders, getting paid, Google Calendar sync, early-morning regulars.

## Who it is for

People who sell their time: trainers, stylists, tutors, consultants, therapists, photographers, mobile pros like detailers, and small teams of them. The feed shows them doing their work, and shows the booking page taking a chore off their hands.

## Positioning: how Schedulign is different

**The line:** booking a time is the easy part; Schedulign handles the time and everything around it. Most of the audience sells a haircut, a driveway detail, a training block, an hour of algebra, a family shoot: a booking with a place, a price, sometimes a group, often paperwork, and a calendar they need full. Meetings are welcome too (Sam, Sep 25 2026: "people will use it for meetings"): never say or imply "not for meetings". A meeting is one example among many.

**Four pillars.** Every post proves at least one. Each proof point is shipped and in the help center.

| Pillar | What it means for them | Proof points |
|---|---|---|
| **More than a time slot** | The details around a booking are built in, not bolted on: the place, the price, the paperwork. | Location choices incl. the client's own address and the exact place kept off the page until they book; access details; a price for every group size and length; peak and discount hours; waivers signed while booking. |
| **Money is part of it** | Getting paid is part of the booking, on every plan. | Card at booking through their own Stripe, or the offline ways they already take (and Mark paid); per event; tips; a payment link after an approved request. The Free plan has everything in Pro (up to 5 bookings a week), and card payments carry only Stripe's fee, with nothing added by Schedulign (help/plans-and-billing). |
| **A fuller calendar** | Cancellations and quiet hours get filled, regulars come first. | Day waitlists with a two-hour hold, openings alerts, unlisted-time requests, requests-only events, client perks, discount hours, reminders. |
| **Simple and yours** | Easy for clients, controlled by you, no clutter. | No client accounts; clients change bookings from their link inside your windows; confirmation as a calendar invite; rules per event; blocking per event; a help center and a Report a problem link on every page. |

**How to say it**
- Start from their pain, in their words: the DM thread, the no-show, the Venmo chase, the lost waiver, the wrong driveway, the empty chair after a cancellation. Then the feature. Then the relief.
- Speak their work: chair, driveway, session, client, regular, fully booked Saturday. A meeting is a fine example next to the others; never "attendees", "leads" or "workflow". Never "coach".
- **Never name another product**, and never claim what another product can or cannot do. Prove Schedulign's side only; the audience draws the comparison. ("Booking a time is the easy part" names no one and excludes no one.)
- Match what meeting tools do well, so it never looks missing: one simple link, no back-and-forth, time zones handled, calendar invites, reminders, a widget and QR code, discount codes.
- Lead with simple and human. Never lead with AI, and never promise anything the help center does not support.

## The look: "Lamplight"

Friendly cartoon scenes drawn in code (`art/engine.mjs`). The reference is the Instagram account buildwithorin.

- **One short line per slide**, big and white with a dark outline, readable in the grid. The long explanation goes in the caption.
- **A before and an after across the slides**, usually with a time stamp: the problem, the fix, the client's side, how it ends.
- **Scenes happen when the story does.** Daylight for daytime (salons, driveways, gyms, parks, after-school tutoring). Lamplight only for early mornings and late nights.
- **Lime means the booking page is at work**: a lime button, a lime check, or **Slot**, the lime calendar character. Lime is never used for anything else.
- **Phone screens use the product's real labels**, checked against the help center. They are simplified, never invented.

## The faces: same people, never named

Sam, Sep 28 2026: the feed restarted without a cast. The same drawn people come back from post to post, so the feed feels familiar, but **nobody is named or introduced**: not on a slide, not in a caption, not in alt text. They are "a trainer", "a stylist", "your client". Lint refuses the old cast names.

| Preset (engine) | Profession | Look |
|---|---|---|
| `DEV` | Trainer | Athletic, orange tank top, yellow headband, beard, towel, white sneakers |
| `MAYA` | Stylist | Bun, coral top, navy apron, scissors |
| `JONAH` | Mobile detailer | Teal cap with a water drop, yellow shirt, the SHINE van |
| `ROSA` | Tutor | Long auburn hair, glasses, periwinkle sweater, books |
| `PRIYA` | Photographer | Dark ponytail, navy top, camera |
| `slot()` | The booking page | Lime calendar tile with a navy top, binder rings, a smile. The only one with a name. |

Clients are drawn from the `CLIENT1` to `CLIENT4`, `KID` and `STUDENT` presets. Keep each person's look the same from post to post. A new profession needs a preset in the engine first. Preset names are code, never copy.

## What gets posted: standalone stories

Two kinds of post (`series:` in its file; `lib/series.mjs`):

| Kind | Badge on slide 1 | What it is |
|---|---|---|
| **Hello** (`hello`) | none | A short hello from Slot: who it is, what it takes off your plate. Goes out first and is pinned. A fresh one now and then for new followers. |
| **Story** (`story`) | The feature, from the title up to its colon ("Waivers: …" → WAIVERS) | **One feature as a before and an after.** Slide 1 is the before (the DM thread, the no-show, the lost waiver), then the feature as the host sets it, then what the client sees, then the after. Four or five slides. |

Every story stands alone. It never refers to another post, never continues a situation, and never counts itself ("Part 2", "Episode 3"), so any story can be held, skipped or reordered. The posting order is the file number; a hello always goes first.

### Themes to keep hitting

From a look at Calendly's feed (Sep 24 2026): Calendly's feed is mostly static text graphics and talking-head reels. The themes are worth covering; the flat, story-driven art is where Schedulign does them better.

- **Getting paid.** Calendly leads with invoicing: "getting paid should feel like the finish line". Schedulign's version: card payments at booking through the host's own Stripe account, or offline methods they already take, chosen per event; tips at checkout or afterwards; a payment link after an approved request; automatic or manual refunds. Cleared Sep 28 2026: a real host has taken a card.
- **Reward regulars, fill slow weeks.** Calendly pushes coupon codes. Schedulign has client perks (done), discount windows in peak pricing (a negative percentage for quiet hours), and discount codes through Stripe at checkout (with payments).
- **Where clients already are.** Your link in your Instagram bio (very on-theme for this account), a QR code for the van, the salon mirror or a flyer, the booking widget on your own website.
- **Protect your time.** "More space for what matters": days off and date-specific hours, buffers, evenings with no "are you free" texts, a real holiday while the page keeps booking the weeks after.
- **Seasons and moments.** Tie posts to the calendar a week or two ahead: back to school and exam season (tutoring), holiday party season (hair), wedding and fall mini-session season (photos), the New Year gym rush (training), first snow and pollen season (detailing).
- **Talk with people.** End about one caption in four with a question that invites a comment ("How do clients book you today: DMs, texts or a link?"). Keep it light and specific; never bait.
- **No real people, for now** (Sam, Sep 24 2026). Calendly's best posts feature real customers; this feed stays simple and animated, and the drawn faces carry it.

What to avoid, also from Calendly's comments: several people pushing back on AI features they did not ask for, and support questions left unanswered under posts. Lead with simple and human, never with AI, and never claim what the product does not do. Comments asking for help get pointed to schedulign.com/help or admin@schedulign.com (Sam or whoever runs the account replies; the automation never does).

Stories still to make (not yet in the queue): your link in your Instagram bio, a QR code on the van or the mirror, the booking widget on your own site, tips, the follow-up email with a book-again link, hiding an event from the page and sharing a direct link, access codes for private events, blocking a client, date-specific hours, booking notice and how far ahead clients can book, pay online or pay at the session per event, lengths without prices. Team features wait until the solo product is the focus of the feed. Before writing any of them, check the feature against its help article (below).

## Truth rules (enforced by `lib/lint.mjs`)

- **Every claim names its help article** in `claims`, and the article must be live at `https://www.schedulign.com/help/<slug>`. Read the article before writing the post. If the help center does not say the product does it, the post does not say so either.
- Never "coach" or "coaching". The product never says "we", "our" or "us". No exclamation marks.
- No promises about the future: no launch date, no feature that is "coming", no price except Pro at $20 a month and $10 per member seat, and "every plan is $0 during early access".
- Cleared Sep 28 2026: Google Calendar sync and Google Meet (Google verified the app) and online card payments (a real host has taken a card). Still never mentioned: SMS, packages, memberships, a client app (none exist). Classes are out of scope.

## Voice

Second person, plain and warm. Short sentences. A little wry, never snarky about clients. Examples illustrate and never define: say "for example" rather than implying the product can only do one thing.

## Captions

- First line: the hook, unique across the whole queue (the publisher uses it to spot duplicates).
- Then two to four short paragraphs: the feature in plain words.
- Then the call to action (`${CTA}` in the post file).
- Five hashtags: `#schedulign`, two or three for the profession, and `#bookingpage`.

## Cadence

Five posts a week, Monday to Friday, at about 11:20am Pacific. The weekly job keeps about two weeks of posts in the queue, so each new post waits a week or more before it goes out. That is the review window.

## Measuring (once there is an account)

Weekly, from Instagram Insights: profile visits and link taps (the numbers that matter before launch), saves and shares per post (which format is useful), and reach from non-followers. After four weeks, look at which features and professions get the most saves and shares per post, and make more of those. Schedulign does not track where sign-ups come from, so quote no conversion rate.
