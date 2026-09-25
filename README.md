# Schedulign on Instagram

Posts drawn in code, rendered to JPEG and published to Instagram once a day, for free.

- **What goes out next:** [UPNEXT.md](UPNEXT.md), with every slide and caption.
- **The rules for what gets posted:** [STRATEGY.md](STRATEGY.md).
- **The weekly job that writes new posts:** [ROUTINE.md](ROUTINE.md).

## How it works

| Piece | What it does |
|---|---|
| `art/engine.mjs` | The drawing engine: rooms and outdoor scenes by day or lamplight, the cast, Slot, props and phone screens. Improve it and every later post gets better. |
| `content/posts/NNN-name.mjs` | One file per post: its series, slides, caption and the help articles behind its claims. The number orders posts within their series. |
| `lib/series.mjs` | The series that run side by side (intro, spotlights, under the hood, episodes, before/after and tips) and the weekly pattern that interleaves them into the posting order. |
| `render.mjs` | Lints every post (see `lib/lint.mjs`), draws the slides to 1080 × 1350 JPEGs in `images/`, and writes the queue (`posts.json`) and `UPNEXT.md`. |
| `.github/workflows/render.yml` | Runs `render.mjs` on every push that changes posts or the engine, and commits the images. |
| `publish.mjs` + `.github/workflows/publish.yml` | Posts the next post each day at about 11:30am Pacific through Instagram's own API, and records it in `published.json`. |
| Weekly job | A scheduled Claude session (ROUTINE.md) that tops the queue up to two weeks ahead and improves the art. |

Nothing here costs money. GitHub Actions is free for a public repo, Instagram's publishing API is free, and the images are served from this repo.

## Stopping or changing a post

- **Hold a post:** add `hold: true,` next to `title` in its file under `content/posts`. It is skipped until you remove the line.
- **Drop a post:** delete its file.
- **Edit a post:** edit its file. The render workflow redraws it.
- **Pause everything:** Actions → Publish to Instagram → ⋯ → Disable workflow.

## One-time setup (Sam)

None of this has been done yet. Until the token secret exists, the daily run does nothing.

1. **Create the account.** In the Instagram app, create **@schedulign** (or @schedulign.app if taken) with admin@schedulign.com.
2. **Make it professional.** Settings → Account type and tools → Switch to professional account → **Business**, category "Software". Bio: "Booking pages for people who sell their time. Free during early access." Link: `https://www.schedulign.com`. Profile picture: `tools/profile.jpg` (Slot; redraw with `node tools/profile-picture.mjs`).
3. **Meta app.** At developers.facebook.com/apps: **Create app** → **Manage messaging & content on Instagram** (Instagram API with Instagram Login). Name it "Schedulign Publisher".
4. **Connect the account.** Instagram → API setup with Instagram login → **Add account**, log in as @schedulign. If asked, add it as an Instagram tester under App roles and accept the invite in the Instagram app (Settings → Website permissions → Apps and websites → Tester invites).
5. **Token.** Click **Generate token** next to @schedulign. It lasts 60 days; set a reminder for day 50 to make a fresh one.
6. **Secret.** In this repo: Settings → Secrets and variables → Actions → New repository secret → `IG_ACCESS_TOKEN`. Paste the token there and nowhere else.
7. **Test.** Actions → Publish to Instagram → Run workflow → `check`. The log should show @schedulign, the quota, and the next post. Nothing is posted.
8. **Go.** The daily schedule starts posting on its own from the next day at about 11:30am Pacific. To post the first one right away, run the workflow with `publish`.

## Working on it locally

```
npm install
node render.mjs                 # lint, draw, rebuild the queue
node render.mjs --only 012      # just one post
node tools/contact-sheet.mjs    # every slide on sheets in tools/sheets, for review
```

A local run uses Playwright's Chromium if it is installed, and otherwise the installed Chrome or Edge.

`archive/` holds the September 23 plan (screenshot posts), kept for reference only.
