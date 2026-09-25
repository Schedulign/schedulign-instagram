/**
 * Draws the account's profile picture: the Slot tile (brand/slot-tile.svg),
 * the logo chosen on Sep 25 2026, centred on the daylight wall blue, to
 * tools/profile.jpg (1080 x 1080; Instagram crops it to a circle).
 */
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright';
import { ROOT } from '../lib/posts.mjs';

const tile = readFileSync(path.join(ROOT, 'brand', 'slot-tile.svg'), 'utf8')
  .replace(/<svg[^>]*>/, '').replace(/<\/svg>\s*$/, '');
const svg = `<svg width="1080" height="1080" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><rect width="100" height="100" fill="#dfe5f3"/><g transform="translate(19,18) scale(.62)">${tile}</g></svg>`;
let browser;
for (const channel of ['chromium', 'chrome', 'msedge']) { try { browser = await chromium.launch({ channel }); break; } catch {} }
const page = await browser.newPage({ viewport: { width: 1080, height: 1080 } });
await page.setContent(`<body style="margin:0">${svg}</body>`);
await page.locator('svg').screenshot({ path: path.join(ROOT, 'tools', 'profile.jpg'), type: 'jpeg', quality: 92 });
await browser.close();
console.log('tools/profile.jpg');
