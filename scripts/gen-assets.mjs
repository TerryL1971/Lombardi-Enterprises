// Generates public/favicon.ico and public/og-default.png from inline SVG.
// Run once (or after a brand change): node scripts/gen-assets.mjs
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const pub = join(dirname(fileURLToPath(import.meta.url)), '..', 'public');

const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="14" fill="#17181c"/>
  <text x="32" y="34" font-family="Georgia, serif" font-size="30" font-weight="700" fill="#fbfaf7" text-anchor="middle" dominant-baseline="central">LE</text>
</svg>`;

const ogSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#1b1c22"/>
      <stop offset="1" stop-color="#121216"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <circle cx="1050" cy="90" r="320" fill="#c05a36" opacity="0.16"/>
  <circle cx="120" cy="600" r="260" fill="#c05a36" opacity="0.10"/>
  <g transform="translate(90,90)">
    <rect width="64" height="64" rx="14" fill="#fbfaf7"/>
    <text x="32" y="35" font-family="Georgia, serif" font-size="30" font-weight="700" fill="#17181c" text-anchor="middle" dominant-baseline="central">LE</text>
    <text x="86" y="42" font-family="Georgia, serif" font-size="30" fill="#fbfaf7">Lombardi Enterprises</text>
  </g>
  <text x="90" y="330" font-family="Georgia, serif" font-size="66" fill="#fbfaf7">Websites and apps for businesses</text>
  <text x="90" y="410" font-family="Georgia, serif" font-size="66" fill="#e07a54">that serve people far from home.</text>
  <text x="90" y="520" font-family="Arial, sans-serif" font-size="26" fill="#928e83">Terry Lombardi — developer &amp; 20-year business operator — Germany</text>
</svg>`;

await sharp(Buffer.from(faviconSvg)).resize(64, 64).png().toFile(join(pub, 'favicon-64.png'));
await sharp(Buffer.from(faviconSvg)).resize(32, 32).png().toFile(join(pub, 'favicon.ico'));
await sharp(Buffer.from(ogSvg)).png().toFile(join(pub, 'og-default.png'));

console.log('Wrote favicon.ico, favicon-64.png, og-default.png');
