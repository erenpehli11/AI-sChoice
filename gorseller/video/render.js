const path = require('path');
const fs = require('fs');
const { chromium } = require('playwright');
const DIR = __dirname;
const FPS = 30, DUR = 6.6;
(async () => {
  const frames = path.join(DIR, 'frames');
  fs.rmSync(frames, { recursive: true, force: true }); fs.mkdirSync(frames);
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 540, height: 960 }, deviceScaleFactor: 2 });
  await page.goto('file://' + path.join(DIR, 'sahne1.html'));
  await page.waitForTimeout(400);
  const n = Math.round(FPS * DUR);
  for (let i = 0; i < n; i++) {
    await page.evaluate((t) => window.render(t), i / FPS);
    await page.screenshot({ path: path.join(frames, `f${String(i).padStart(4, '0')}.png`) });
  }
  await browser.close();
  console.log('frames', n);
})();
