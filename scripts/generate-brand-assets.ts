import sharp from 'sharp';
import { readFileSync, mkdirSync, writeFileSync, existsSync } from 'fs';
import { join } from 'path';

const PUBLIC = join(process.cwd(), 'public');
const UPLOAD = join(process.cwd(), 'upload');
mkdirSync(PUBLIC, { recursive: true });

// Find the uploaded logo
const uploadedLogoPath = join(UPLOAD, '1782238467771-removebg-preview.png');
if (!existsSync(uploadedLogoPath)) {
  console.error('Uploaded logo not found at:', uploadedLogoPath);
  process.exit(1);
}

const logoPng = readFileSync(uploadedLogoPath);
console.log('✓ Loaded uploaded logo:', uploadedLogoPath);

// Helper: composite logo on dark background
async function makeIcon(size: number, outName: string, pad = 0.15) {
  const padPx = Math.round(size * pad);
  const logoSize = size - padPx * 2;
  await sharp({
    create: {
      width: size,
      height: size,
      channels: 4,
      background: { r: 9, g: 10, b: 15, alpha: 1 },
    }
  })
    .composite([
      {
        input: await sharp(logoPng)
          .resize(logoSize, logoSize, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
          .toBuffer(),
        gravity: 'center',
      }
    ])
    .png()
    .toFile(join(PUBLIC, outName));
  console.log(`✓ ${outName}`);
}

// 1. Favicon 32x32 (PNG)
await makeIcon(32, 'favicon-32.png', 0.1);

// 2. Favicon 16x16 (PNG)
await makeIcon(16, 'favicon-16.png', 0.1);

// 3. Apple Touch Icon 180x180 (PNG, no transparency)
await makeIcon(180, 'apple-touch-icon.png', 0.12);

// 4. Android Chrome 192x192
await makeIcon(192, 'android-chrome-192.png', 0.15);

// 5. Android Chrome 512x512
await makeIcon(512, 'android-chrome-512.png', 0.15);

// 6. OG Image 1200x630 — dark background with logo on the left
const logoForOg = await sharp(logoPng)
  .resize(280, 280, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .toBuffer();

// Build the OG image entirely in SVG, then rasterize
const ogSvg = `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="bg" cx="50%" cy="50%" r="60%">
      <stop offset="0%" stop-color="#1E90FF" stop-opacity="0.18"/>
      <stop offset="100%" stop-color="#090a0f" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="#090a0f"/>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <text x="430" y="280" font-family="Arial, sans-serif" font-size="86" font-weight="800" fill="#ffffff" letter-spacing="2">REVIVE</text>
  <text x="430" y="350" font-family="Arial, sans-serif" font-size="36" font-weight="700" fill="#8d939b" letter-spacing="8">AUTO WORKS</text>
  <text x="430" y="430" font-family="Arial, sans-serif" font-size="30" font-weight="600" fill="#1E90FF" letter-spacing="4">DRIVEN BY EXCELLENCE</text>
  <text x="430" y="485" font-family="Arial, sans-serif" font-size="22" font-weight="500" fill="#8d939b">Expert Care. Lasting Performance.</text>
</svg>`;

await sharp(Buffer.from(ogSvg))
  .composite([
    {
      input: logoForOg,
      gravity: 'west',
      blend: 'over',
    }
  ])
  .png()
  .toFile(join(PUBLIC, 'og-image.png'));
console.log('✓ og-image.png');

// 7. Web manifest
const manifest = {
  name: "Revive Auto Works",
  short_name: "Revive",
  description: "Expert Automotive Repairs & Vehicle Servicing. Driven by Excellence.",
  start_url: "/",
  display: "standalone",
  background_color: "#090a0f",
  theme_color: "#090a0f",
  icons: [
    { src: "/favicon-32.png", sizes: "32x32", type: "image/png" },
    { src: "/android-chrome-192.png", sizes: "192x192", type: "image/png" },
    { src: "/android-chrome-512.png", sizes: "512x512", type: "image/png" },
    { src: "/logo.svg", sizes: "any", type: "image/svg+xml", purpose: "any" }
  ]
};

writeFileSync(join(PUBLIC, 'site.webmanifest'), JSON.stringify(manifest, null, 2));
console.log('✓ site.webmanifest');

// 8. Also save the original PNG as a high-quality brand asset
await sharp(logoPng)
  .resize(512, 512, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .png()
  .toFile(join(PUBLIC, 'logo-512.png'));
console.log('✓ logo-512.png (transparent)');

console.log('\n✓ All brand assets regenerated using the uploaded logo.');
