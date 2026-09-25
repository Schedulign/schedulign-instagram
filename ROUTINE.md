# The weekly job

A scheduled Claude session runs this every Monday morning. It keeps the queue about two weeks deep, adds new posts, and improves the art over time. Nothing it writes is posted for at least a week, so Sam can review everything in UPNEXT.md first.

## Steps

1. **Read** STRATEGY.md (the rules), `art/engine.mjs` (what can be drawn), two or three recent files in `content/posts` (the house style), and `published.json` (what has gone out).
2. **Count the runway.** Posts in `posts.json` that are not published and not on hold. If there are 10 or more, skip to step 6.
3. **Pick the next posts** until the runway is 14, keeping every series stocked (UPNEXT.md lists what is waiting per series): at least 3 spotlights, 2 under-the-hood posts, 2 episodes and 1 before/after or tip waiting at all times. The weekly pattern in `lib/series.mjs` decides the order, so just keep the series full. Episodes stand alone and carry their run's `badge`; when a run has had about five episodes, start the next run from the list in STRATEGY.md. No feature covered in the last six weeks, and never the same character three posts in a row. Take ideas from the lists in STRATEGY.md first.
4. **Check the facts.** For each post, open its help article at `https://www.schedulign.com/help/<slug>` and read it. Use the product's labels exactly as the article gives them. If the article does not clearly say the product does something, drop the idea.
5. **Write each post** as `content/posts/NNN-short-name.mjs`, numbered after the last file, with its `series` (and a `badge` for an episode). Copy the shape of an existing post in the same series: four or five slides, one short caption line per slide (two lines at most, about 22 characters a line), the story beats from STRATEGY.md, and a caption with the hook, the feature, the call to action and five hashtags. Add new drawing pieces to `art/engine.mjs` when a scene needs them (a prop, a background, a pose). Keep new pieces in the same flat style.
6. **Render and look.** Run `npm ci`, `npx playwright install chromium`, then `node render.mjs`. It must pass lint. Then run `node tools/contact-sheet.mjs <ids>` for the new posts and **look at every sheet image**. Fix anything that reads badly: text over a face, a person hidden behind furniture, legs lost against a dark floor, a caption over the one thing the joke needs, cards spilling off the canvas. Render again until they read well.
7. **Improve one thing.** Spend a little time making the art better in general: a clearer pose, a nicer background, a detail on a character. Re-render and check that older posts still read well.
8. **Commit and push** to main: the new post files, any engine changes, and the rendered `images`, `posts.json`, `UPNEXT.md` and `render-cache.json`. Use one commit per post, plus one for engine improvements. The render workflow re-checks everything on push.
9. **Report** in the final message: the new posts with their first caption lines, the art improvement, and anything Sam should look at (a feature the help center was unclear about, an idea that was dropped and why).

## Never

- Post to Instagram, touch `published.json`, or run `publish.mjs`. The daily workflow does the posting.
- Remove or renumber a post that is already published.
- Change `hold: true` on a post that Sam held.
- Put anything in a post that the help center does not support.
