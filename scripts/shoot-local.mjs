// Best-effort: boot each concept project's own dev server, screenshot its
// homepage, move on. Projects that need env/secrets to render will just
// produce a blank/error shot — those keep the gradient fallback instead.
//   node scripts/shoot-local.mjs
import { chromium } from 'playwright';
import { spawn } from 'node:child_process';
import { mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const portfolio = join(root, '..');

// slug → [project dir, dev port, ready-path]
const projects = [
  ['settled', 'Settled Landing Page', 4331, '/'],
  ['europe-auto-direct', 'Europe-Auto-Direct', 4332, '/'],
  ['fieldstone', 'Fieldstone', 4333, '/'],
  ['lombardi-photography', 'Lombardi-Photography', 4334, '/'],
  ['milhaus', 'Milhaus', 4335, '/'],
];

const wait = (ms) => new Promise((r) => setTimeout(r, ms));

async function serverUp(url, tries = 40) {
  for (let i = 0; i < tries; i++) {
    try {
      const res = await fetch(url);
      if (res.ok || res.status < 500) return true;
    } catch {}
    await wait(1000);
  }
  return false;
}

const browser = await chromium.launch({ channel: 'chrome' });

for (const [slug, dir, port, path] of projects) {
  const cwd = join(portfolio, dir);
  console.log(`\n=== ${slug} (${dir}) on :${port} ===`);
  const isAstro = ['settled', 'europe-auto-direct'].includes(slug);
  const args = isAstro
    ? ['run', 'dev', '--', '--port', String(port)]
    : ['run', 'dev', '--', '-p', String(port)];
  const proc = spawn('npm', args, { cwd, stdio: 'ignore', detached: true });

  try {
    const url = `http://localhost:${port}${path}`;
    const ok = await serverUp(`http://localhost:${port}`);
    if (!ok) {
      console.log('  server never came up — skipping');
      continue;
    }
    await wait(2500);
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await page.goto(url, { waitUntil: 'networkidle', timeout: 40000 }).catch(() => {});
    await page.waitForTimeout(2000);
    for (const label of ['Accept', 'Accept All', 'Got it', 'I agree', 'Close']) {
      const b = page.getByRole('button', { name: label, exact: false }).first();
      if (await b.isVisible().catch(() => false)) await b.click().catch(() => {});
    }
    await page.evaluate(() => window.scrollTo(0, 0)).catch(() => {});
    await page.waitForTimeout(600);
    const outDir = join(root, 'src/content/work/_assets', slug);
    await mkdir(outDir, { recursive: true });
    await page.screenshot({ path: join(outDir, 'cover.png') });
    console.log('  → cover.png');
    await page.close();
  } catch (e) {
    console.log('  error:', e.message);
  } finally {
    try {
      process.kill(-proc.pid);
    } catch {}
    await wait(1500);
  }
}

await browser.close();
console.log('\nReview each cover.png — delete any that are blank/broken so the card falls back to a gradient.');
