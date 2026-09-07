// Screenshot helper. Uses the system Chrome (Playwright's bundled Chromium
// download is blocked here). Two modes:
//   node scripts/shoot.mjs self       → screenshots of the local preview build
//   node scripts/shoot.mjs covers     → screenshots of live project sites into
//                                        src/content/work/_assets/<slug>/cover.png
import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const mode = process.argv[2] ?? 'self';

const launch = () => chromium.launch({ channel: 'chrome' });

async function dismissOverlays(page) {
  const labels = [
    'Accept All', 'Accept all', 'Accept', 'I agree', 'Got it', 'Allow all',
    'Reject All', 'Close', 'No thanks',
  ];
  for (const label of labels) {
    const btn = page.getByRole('button', { name: label, exact: false }).first();
    if (await btn.isVisible().catch(() => false)) {
      await btn.click().catch(() => {});
      await page.waitForTimeout(400);
    }
  }
  // generic modal close buttons
  await page.locator('[aria-label="Close" i], button:has-text("×")').first().click().catch(() => {});
  await page.keyboard.press('Escape').catch(() => {});
  await page.waitForTimeout(400);
}

async function shot(page, url, file, { width = 1440, height = 900, full = false } = {}) {
  await page.setViewportSize({ width, height });
  await page.goto(url, { waitUntil: 'networkidle', timeout: 45000 }).catch(() => {});
  await page.waitForTimeout(1000);
  await dismissOverlays(page);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(800);
  await page.screenshot({ path: file, fullPage: full });
  console.log('→', file);
}

if (mode === 'self') {
  const base = process.env.BASE_URL ?? 'http://localhost:4321';
  const out = join(root, 'screenshots');
  await mkdir(out, { recursive: true });
  const browser = await launch();
  const page = await browser.newPage();
  for (const [name, path, opts] of [
    ['home-desktop', '/', { full: true }],
    ['home-mobile', '/', { width: 390, height: 844, full: true }],
    ['work-europe-auto-direct', '/work/europe-auto-direct', { full: true }],
    ['work-european-living', '/work/european-living', { full: true }],
  ]) {
    await shot(page, base + path, join(out, `${name}.png`), opts);
  }
  await browser.close();
}

if (mode === 'covers') {
  // slug → live URL
  const targets = {
    'european-living': 'https://www.european-living.live',
    // add 'ucg-social-scheduler': '<url>' once known
  };
  const browser = await launch();
  const page = await browser.newPage();
  for (const [slug, url] of Object.entries(targets)) {
    const dir = join(root, 'src/content/work/_assets', slug);
    await mkdir(dir, { recursive: true });
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(url, { waitUntil: 'networkidle', timeout: 45000 }).catch(() => {});
    await page.waitForTimeout(1000);
    await dismissOverlays(page);
    if (slug === 'european-living') {
      await page.getByText('USAG Stuttgart', { exact: false }).first().click().catch(() => {});
      await page.waitForTimeout(300);
      await page.getByRole('button', { name: 'Continue', exact: false }).first().click().catch(() => {});
      await page.waitForTimeout(1200);
      await dismissOverlays(page);
    }
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(800);
    await page.screenshot({ path: join(dir, 'cover.png') });
    console.log('→', join(dir, 'cover.png'));
  }
  await browser.close();
}
