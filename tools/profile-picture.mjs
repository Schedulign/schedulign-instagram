/**
 * Draws the account's profile picture, Slot on the daylight wall blue, to tools/profile.jpg
 * (1080 x 1080; Instagram crops it to a circle).
 */
import path from 'node:path';
import { chromium } from 'playwright';
import { slot } from '../art/engine.mjs';
import { ROOT } from '../lib/posts.mjs';

const svg = `<svg width="1080" height="1080" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><rect width="200" height="200" fill="#b9c5df"/>${slot(100, 162, 2.3)}</svg>`;
let browser;
for (const channel of ['chromium', 'chrome', 'msedge']) { try { browser = await chromium.launch({ channel }); break; } catch {} }
const page = await browser.newPage({ viewport: { width: 1080, height: 1080 } });
await page.setContent(`<body style="margin:0">${svg}</body>`);
await page.locator('svg').screenshot({ path: path.join(ROOT, 'tools', 'profile.jpg'), type: 'jpeg', quality: 92 });
await browser.close();
console.log('tools/profile.jpg');
