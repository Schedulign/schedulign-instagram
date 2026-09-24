# Schedulign on Instagram: pre-launch strategy

Written Sep 23 2026. The queue is `posts.json` (28 posts, one a day). The publisher is the LuxyBasement one, unchanged (see README.md).

## 1. Positioning and audience

**One line:** Schedulign is the booking page that runs your business. Clients book, pay and change bookings from one link, with no account, under rules you set per event.

**Who it is for:** people who sell their time. That means trainers, stylists, tutors, consultants, therapists, photographers, mobile pros like detailers, and small teams of them (studios, salons, tutoring groups).

**Why Instagram:** this audience already runs its business there, through "DM to book" in the bio, a waitlist in a group chat, and payments across several apps. The page speaks to that problem directly and offers one fix: a link that books.

**Voice:**
- Write in the second person, plainly, with no exclamation marks and no superlatives.
- "We" appears nowhere in the queue. Founder posts are in Sam's first person singular.
- "Coach" appears only as one profession in a list. The queue avoids the word entirely.
- **Every claim is a shipped feature.** Each post has a `claims` field naming the PARITY row or help article behind it. When the product changes, check those claims before the post runs (havn-marketing-truth).

## 2. Content pillars

| Pillar | What it is | Share of feed |
|---|---|---|
| **Show the product** | Real screens of the booking flow as swipeable carousels | 1 a week |
| **Feature spotlight** | One control, what it does, and the choice it gives | 1 a week |
| **Tips for people who sell their time** | Useful advice first, with the feature as the how | 1 a week |
| **Before / after** | A messy DM or email routine vs the booking page | 1 a week |
| **Profession use case** | One profession and the setting that fits it (detailers, tutors, photographers, consultants) | 1 a week |
| **Founder / building in public** | Sam's voice: why the product exists, how it is built, asking for feedback | 1 a week |
| **Early access / countdown** | The offer: every plan $0 during early access, the three plans, the demo page, live in minutes | 1 a week |

The weekday rhythm is fixed so the queue is easy to extend: **Mon** spotlight, **Tue** tip, **Wed** before/after, **Thu** product, **Fri** founder, **Sat** use case, **Sun** early access. Week 1 opens with the introduction in the Monday slot. Switch the workflow on on a Monday so the days line up.

## 3. Cadence

- **Pre-launch:** one feed post a day, automated, around 11:30 Pacific. Add stories by hand when there is something to show: a work-in-progress screen, a repost of the day's post, a poll ("How do clients book you today? DMs / a form / a booking page"). Aim for two to four stories a week, and skip them when there is nothing to show.
- **Not LuxyBasement's pace.** Five an hour works for a catalogue of one-of-one items. A new account posting like that looks like spam, both to people and to Instagram's systems, and 28 posts would be gone in six hours.
- **Launch week:** keep the daily post. Add one hand-posted Reel (a 15–30 second screen recording of a client booking on a phone) and a story every day. The automated publisher posts only images and carousels. Reels and stories need a small addition to `publish.mjs` (`media_type=REELS` / `STORIES` with a `video_url`), which can wait until a launch Reel exists.
- **After launch:** four or five feed posts a week once the pillars start repeating themselves. Consistency matters more than volume.

## 4. The four-week calendar

Every post below is in `posts.json`, in order. **V** marks a post with a `verify_before_publish` note.

| Day | Pillar | Headline |
|---|---|---|
| **Week 1: what it is** | | |
| 1 Mon | Early access | Meet Schedulign: the booking page that runs your business. |
| 2 Tue | Tip | Write your cancellation policy before the first no-show, not after. |
| 3 Wed | Before/after | Before: a dozen messages to book one session. After: one link. |
| 4 Thu | Product | How a client books you, start to finish. (5-slide carousel) |
| 5 Fri | Founder **V** | Why I am building Schedulign. |
| 6 Sat | Use case | Mobile detailer? Let the client tell you where the car is. |
| 7 Sun | Early access | Early access is open, and every plan is $0 while it runs. |
| **Week 2: what your clients get** | | |
| 8 | Spotlight | Your clients never make an account. Ever. |
| 9 | Tip | Back-to-back sessions look efficient until you are running late for all of them. |
| 10 | Before/after | "Anything open Thursday?" vs openings alerts and day waitlists |
| 11 | Product | What your client gets the moment they book. |
| 12 | Founder **V** | Most of your clients will book you from a phone. |
| 13 | Use case | Tutor? Price one-on-one and a group of three differently. |
| 14 | Early access **V** | See it before you sign up: the demo page. |
| **Week 3: your rules, your money** | | |
| 15 | Spotlight **V** | Paid online or offline. You choose, per event. |
| 16 | Tip | Your Saturday morning is not worth the same as your Tuesday afternoon. (peak pricing) |
| 17 | Before/after | Chasing a signed waiver vs signed at booking |
| 18 | Product | Ask what you actually need to know before the session. (booking form) |
| 19 | Founder **V** | Why the Free plan is the whole product, not a trial. |
| 20 | Use case | Photographer? Decide when the location is shared. |
| 21 | Early access | Three plans, one account, and you can switch anytime. |
| **Week 4: control, teams, the run-up** | | |
| 22 | Spotlight | Want to say yes before a booking is confirmed? You can. (requests) |
| 23 | Tip | Give your regulars first pick of your calendar. (priority access) |
| 24 | Before/after | "DM to book" vs a link in bio that books (widget, QR) |
| 25 | Product | Run a studio? One booking page for the whole team. |
| 26 | Founder **V** | What should Schedulign do next? Tell me. |
| 27 | Use case | Consultant? Keep some sessions off your public page. |
| 28 | Early access | Your booking page, live in minutes. |

**Countdown posts** name no launch date, because none is set. Once one is, edit days 21–28 to say "N days until paid plans launch; early-access accounts keep their plan free for a month after", and add the date. That sentence is already true (`EARLY_ACCESS_TERMS` in `src/lib/plans.ts`).

## 5. Hashtags

Each post uses five to seven tags: `#schedulign` plus one set chosen for that post's audience. No post uses thirty generic tags. The sets as the captions use them:

- **Solo business:** #bookingpage #smallbusinesstips #selfemployed #solopreneur #onlinebooking
- **Tool:** #bookingpage #onlinebooking #appointmentbooking #schedulingtool #smallbusinessowner
- **Profession sets:** trainers (#personaltrainer #fitnessbusiness #trainerlife), stylists (#hairstylist #salonowner #behindthechair), tutors (#tutor #tutoringbusiness #privatetutor), detailers (#mobiledetailing #autodetailing #mobilebusiness), photographers (#photographybusiness #photographer #portraitphotographer), consultants (#consultant #consultingbusiness #freelancelife), teams (#teammanagement #studioowner)
- **Founder:** #buildinpublic #startupfounder #saas #bootstrapped

After two weeks, check each post's Insights under "From hashtags". Drop any tag that never brings reach and try a nearby one.

## 6. Call to action

Every caption ends with the same offer in one of three wordings: **early access is open, every plan is $0 while it runs, link in bio: schedulign.com.** Instagram does not make links in captions clickable, so the bio does the work:

- Bio: "Booking pages for people who sell their time. Free during early access." plus the link `https://www.schedulign.com`
- Where there is a secondary action, point it at the demo page ("See the demo page" on the homepage) rather than a second link.

## 7. What to measure (weekly, 10 minutes)

From Instagram Insights, which requires a professional account:
1. **Profile visits and link taps.** Link taps are the number that matters before launch.
2. **Saves and shares per post.** These show which pillar is useful. Tips and before/afters should lead. If product posts lead, run more of them.
3. **Reach from non-followers,** which shows whether the hashtags and topics travel.
4. **Follower growth.** Secondary.

From the product: **new sign-ups per week** (HQ) in the same window. Schedulign does not track where visitors come from (UTM passthrough is a LATER row in PARITY), so the link-tap count plus the sign-up count is the honest read. Do not quote a conversion rate you cannot measure.

After four weeks, keep the two pillars with the most saves and shares per post, and cut or rework the weakest one.

## 8. Images

- **Format:** JPEG only. Instagram's publishing API refuses PNG, and LuxyBasement's `check` mode verifies `image/jpeg` for this reason. Use 1080×1350 (4:5 portrait). Every slide in a carousel shares the first slide's ratio.
- **Brand:**
  - Navy `#303159` backgrounds for tip and cover cards, with white Geist text.
  - Lime `#b9d32c` as a highlight only: an underline, a dot, a pill with navy text. Never white text on lime.
  - Page-gray `#f7f8f9` behind screenshots, with white cards, rounded corners and a soft shadow.
- **Screenshots show real product states only.** Build a dedicated screenshot account, for example "Northlight Studio" (the name the homepage replicas already use), with fictional clients.
  - Never use Bellevue Tennis or any real customer's page or data.
  - Do not use the public demo page as it stands: its organization is named **"Ridgeline Coaching"**, which puts "coaching" in a brand-authored asset. Rename that data or crop the name out.
- **Illustrated "before" slides** (DM threads, inboxes, a bio that says "DM to book") are drawn generically, with no real names or app chrome.
- Each post's `image_brief` says exactly what every slide shows. `images` lists the files to produce (`posts/NN-a.jpg`, `-b`, …).

**Hosting, since the API needs public URLs:**

| Option | How | Tradeoff |
|---|---|---|
| **A. Public repo, raw GitHub URLs** (recommended) | Commit the JPEGs under `posts/` in this repo, make the repo public. `media` already points at `raw.githubusercontent.com/samiftikhar-dev/schedulign-instagram/main/posts/…` | No infrastructure and no deploys. The queue, captions and briefs become public, which is harmless because the token stays a secret. Raw URLs are cached for about 5 minutes after a push, so commit images at least a few minutes before they post. |
| B. `schedulign.com/social/…` | Put the JPEGs in the product repo's `public/social/` and point `media` there | Your own domain and fully reliable, but every image batch becomes a product commit and deploy, and marketing files mix into the product repo. Use this if Instagram ever refuses raw GitHub URLs. |
| C. GitHub Pages on this repo | Serve `posts/` from Pages | Same public-repo tradeoff as A, plus a Pages build to wait for. No gain over A. |

## 9. What Sam must do by hand

These steps mirror LuxyBasement's README. None has been done.

1. **Create the account.** In the Instagram app, create **@schedulign** (check the handle is free; else @schedulign.app or @getschedulign). Use admin@schedulign.com, the Workspace address, not a personal one.
2. **Make it professional.** Settings → Account type and tools → Switch to professional account → **Business**, category "Software" or "App page". Add the bio and link from section 6, and the navy logo as the profile picture.
3. **Meta app.** At developers.facebook.com/apps, choose **Create app** → use case **Manage messaging & content on Instagram** (Instagram API with Instagram Login). Name it "Schedulign Publisher". Or reuse the LuxyBasement app, which can hold both accounts. A separate app keeps the two businesses apart.
4. **Connect the account.** Go to Instagram → API setup with Instagram login → **Add account** and log in as @schedulign. If asked, add it as an Instagram tester under App roles, then accept the invite in the app under Settings → Website permissions → Apps and websites → Tester invites.
5. **Token.** Click **Generate token** next to @schedulign. It is a long-lived token that lasts 60 days. Set a calendar reminder for day 50 to generate a fresh one.
6. **GitHub repo.** Create `samiftikhar-dev/schedulign-instagram` (public, for image option A) and push this folder plus the two files copied from LuxyBasement (README.md, "Next steps").
7. **Secret.** Go to Settings → Secrets and variables → Actions → `IG_ACCESS_TOKEN`. Paste the token there and nowhere else.
8. **Images.** Produce the JPEGs from `image_brief`, commit them under `posts/`, then run the workflow in `check` mode. The next post's images should show `200 image/jpeg`.
9. **Clear the V posts.** Approve or rewrite the five founder and demo posts and confirm the payments post (section 10), then delete each `verify_before_publish` field.
10. **Switch it on** on a Monday.

## 10. Held back on purpose

- **Google Calendar sync and Google Meet links** appear in no post. The Google app is unverified: a new host connecting sees Google's "unverified app" screen, and in Testing mode the connection expires every seven days (STATUS, Round 53). Add a spotlight once verification is through.
- **Online card payments (day 15)** assume Stripe Connect is live in production. Round 53 was still getting the live platform account ready. Confirm a real host can connect Stripe and take a card before day 15. If not, swap day 15 with a later post.
- **Nothing in the queue promises a future feature.** No SMS reminders, Outlook/iCloud, Zoom, coupons, client accounts, a launch date, or a price for anything beyond Pro at $20 a month and $10 per member seat.
