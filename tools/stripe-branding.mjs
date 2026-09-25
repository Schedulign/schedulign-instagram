/**
 * The two images Stripe's Branding settings take, from the brand files:
 *   brand/out/stripe-icon.png  512 x 512, the Slot tile on the light wall blue (Stripe crops icons round/square)
 *   brand/out/stripe-logo.png  the i-dot lockup on white, 1200 wide (Stripe shows logos on white)
 * Both PNG and well under Stripe's 512 KB limit.
 */
import { readFileSync, statSync } from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright';
import { ROOT } from '../lib/posts.mjs';

const b64 = (f) => 'data:image/svg+xml;base64,' + readFileSync(path.join(ROOT, 'brand', f)).toString('base64');
let browser;
for (const channel of ['chromium', 'chrome', 'msedge']) { try { browser = await chromium.launch({ channel }); break; } catch {} }
const page = await browser.newPage();
async function shot(w, h, bg, html, file) {
  await page.setViewportSize({ width: w, height: h });
  await page.setContent(`<body style="margin:0"><div style="width:${w}px;height:${h}px;background:${bg};display:flex;align-items:center;justify-content:center">${html}</div></body>`);
  await page.locator('body > div').screenshot({ path: path.join(ROOT, 'brand', 'out', file), type: 'png' });
  console.log(file, Math.round(statSync(path.join(ROOT, 'brand', 'out', file)).size / 1024) + ' KB');
}
await shot(512, 512, '#dfe5f3', `<img src="${b64('slot-tile.svg')}" style="width:340px;height:340px">`, 'stripe-icon.png');
await shot(1200, 360, '#ffffff', `<img src="${b64('lockup-idot.svg')}" style="height:250px">`, 'stripe-logo.png');
await browser.close();
