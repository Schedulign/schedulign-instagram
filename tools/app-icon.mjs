/**
 * A 1024 x 1024 app icon (the Slot tile on the light wall blue) for app
 * stores and developer consoles such as Meta's App settings → Basic.
 * Writes brand/out/app-icon-1024.png.
 */
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright';
import { ROOT } from '../lib/posts.mjs';

const tile = 'data:image/svg+xml;base64,' + readFileSync(path.join(ROOT, 'brand', 'slot-tile.svg')).toString('base64');
let browser;
for (const channel of ['chromium', 'chrome', 'msedge']) { try { browser = await chromium.launch({ channel }); break; } catch {} }
const page = await browser.newPage({ viewport: { width: 1024, height: 1024 } });
await page.setContent(`<body style="margin:0"><div style="width:1024px;height:1024px;background:#dfe5f3;display:flex;align-items:center;justify-content:center"><img src="${tile}" style="width:680px;height:680px"></div></body>`);
await page.locator('body > div').screenshot({ path: path.join(ROOT, 'brand', 'out', 'app-icon-1024.png'), type: 'png' });
await browser.close();
console.log('brand/out/app-icon-1024.png');
