# Schedulign Instagram publisher

This folder posts Schedulign's pre-launch content to Instagram, one post a day. It reuses the working LuxyBasement pipeline (`C:\Users\samif\luxybasement-instagram`) without changing how it works: GitHub Actions runs `publish.mjs`, which posts through Instagram's own API (Instagram API with Instagram Login). The queue is `posts.json`, a log in `published.json` records what went out, and the only credential is the `IG_ACCESS_TOKEN` repository secret.

Nothing here has been posted. No account, app, token or repo exists yet.

## What is here

| File | Status |
|---|---|
| `STRATEGY.md` | Read this first: positioning, pillars, cadence, the four-week calendar, hashtags, what to measure, and Sam's manual steps. |
| `posts.json` | 28 posts, one per day, in posting order. |
| `README.md` | This file. |
| `publish.mjs` | **Not yet here.** Copy it unchanged from LuxyBasement. |
| `.github/workflows/publish.yml` | **Not yet here.** Copy it from LuxyBasement and change the schedule (below). |
| `published.json` | **Not yet here.** Create it containing `{}`. |
| `posts/*.jpg` | **Not yet here.** Produce these from each post's `image_brief`. |

## How `posts.json` maps to the publisher

`publish.mjs` reads four fields, and they carry the same names as in LuxyBasement:

- `id`: the key in `published.json` (`schedulign-01` … `schedulign-28`).
- `title`: used in logs.
- `caption`: the full caption. Its **first line** is how the script recognizes a post already on the account, so every headline is unique.
- `media`: public image URLs. One URL makes a single post; two or more make a carousel. These currently point at `https://raw.githubusercontent.com/samiftikhar-dev/schedulign-instagram/main/posts/NN-x.jpg`, which will not exist until the images are committed.

The extra fields are ignored by the script and are there for the people producing and approving the posts:

- `images`: the files to produce (`posts/01-a.jpg`, …), matching `media` one for one.
- `image_brief`: what each slide shows.
- `pillar`: the content pillar.
- `claims`: the shipped feature behind each claim, with a PARITY row or help article.
- `verify_before_publish`: a note Sam clears before the post runs (six posts: 5, 12, 14, 15, 19 and 26).

Images must be **JPEG** (1080×1350). Instagram's API refuses PNG, which is why LuxyBasement's `check` mode tests for `image/jpeg`. STRATEGY.md section 8 covers where to host them.

## Next steps

1. **Account, Meta app and token.** Follow STRATEGY.md section 9, steps 1–5. These are the same clicks as LuxyBasement's README "One-time setup", done as @schedulign.
2. **Repo.** Create `samiftikhar-dev/schedulign-instagram` as a **public** repo, because the raw image URLs need that. Copy the publisher files across:
   ```
   cp ../luxybasement-instagram/publish.mjs .
   mkdir -p .github/workflows && cp ../luxybasement-instagram/.github/workflows/publish.yml .github/workflows/
   echo {} > published.json
   ```
3. **Daily schedule.** Edit `.github/workflows/publish.yml` in two places:
   ```yaml
   on:
     schedule:
       # Once a day, about 11:30 Pacific (18:30 UTC in summer time; 10:30 in winter).
       - cron: '30 18 * * *'
       # A backup in case GitHub drops the first run. The gap guard below makes it a no-op when the first one posted.
       - cron: '30 20 * * *'
   ```
   Then, in the `Post` step's `env:`, add:
   ```yaml
          # Never two posts within 20 hours on the schedule; a manual "publish" posts at once.
          MIN_GAP_MINUTES: ${{ github.event_name == 'schedule' && '1200' || '0' }}
   ```
   The `burst` and `drip` modes can stay (they are harmless) or be removed from the `options` list.
4. **Optional one-line guard.** This makes `publish.mjs` skip posts that still carry a `verify_before_publish` note, so an unapproved post can never go out. In the `next` lookup, add `!p.verify_before_publish &&`:
   ```js
   const next = posts.find((p) => !p.verify_before_publish && (!state[p.id] || (state[p.id].status === 'failed' && state[p.id].attempts < MAX_ATTEMPTS)));
   ```
   Without it, reorder or delete those posts by hand before they come up.
5. **Images.** Produce `posts/NN-x.jpg` from each `image_brief`, with screenshots from a fictional screenshot account (STRATEGY.md section 8), and commit them.
6. **Secret.** Add `IG_ACCESS_TOKEN` under Settings → Secrets and variables → Actions. **Do not add it before the images exist.** A post whose images 404 fails twice and is skipped for good.
7. **Test.** Go to Actions → Publish to Instagram → Run workflow → `check`. The log should show @schedulign, the quota, and `200 image/jpeg` for each of Day 1's images. Nothing is posted.
8. **Go.** Enable the workflow on a Monday. Day to day it runs like LuxyBasement's (pause, publish now, reconcile, token renewal every 60 days); see that README's "Day to day".

## Adding posts later

Append entries with the same fields. Give each a new `id` and a unique first caption line, check every claim against `PARITY.md` and `content/help` in the product repo (havn-marketing-truth), and commit its images before its turn comes.
