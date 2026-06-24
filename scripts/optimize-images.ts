import sharp from 'sharp';
import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { join } from 'path';
import { Readable } from 'stream';
import { pipeline } from 'stream/promises';

const PUBLIC = join(process.cwd(), 'public');
const IMAGES_DIR = join(PUBLIC, 'images');
mkdirSync(IMAGES_DIR, { recursive: true });

const images = [
  {
    name: 'hero',
    url: 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?q=80&w=2069&auto=format&fit=crop',
    widths: [640, 1280, 1920, 2560],
    aspect: null, // preserve
  },
  {
    name: 'engine-detail',
    url: 'https://images.unsplash.com/photo-1625047509248-ec889cbff17f?q=80&w=2000&auto=format&fit=crop',
    widths: [640, 1024, 1536, 2048],
    aspect: null,
  },
];

async function fetchBuffer(url: string): Promise<Buffer> {
  const res = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (compatible; ReviveAutoWorks/1.0)',
      'Accept': 'image/*,*/*',
    },
  });
  if (!res.ok) throw new Error(`Failed ${res.status}: ${url}`);
  const ab = await res.arrayBuffer();
  return Buffer.from(ab);
}

for (const img of images) {
  console.log(`\nProcessing: ${img.name}`);
  const raw = await fetchBuffer(img.url);
  console.log(`  Downloaded: ${(raw.length / 1024).toFixed(1)} KB`);

  for (const w of img.widths) {
    const outPath = join(IMAGES_DIR, `${img.name}-${w}.webp`);
    await sharp(raw)
      .rotate()
      .resize({ width: w, withoutEnlargement: true })
      .webp({ quality: 80, effort: 6 })
      .toFile(outPath);
    const { size } = await import('fs/promises').then(m => m.stat(outPath));
    console.log(`  ✓ ${w}w → ${(size / 1024).toFixed(1)} KB`);
  }

  // Also keep a fallback JPEG for old browsers
  const jpgPath = join(IMAGES_DIR, `${img.name}-fallback.jpg`);
  await sharp(raw)
    .rotate()
    .resize({ width: 1920, withoutEnlargement: true })
    .jpeg({ quality: 80, progressive: true, mozjpeg: true })
    .toFile(jpgPath);
  const { size: jpgSize } = await import('fs/promises').then(m => m.stat(jpgPath));
  console.log(`  ✓ fallback.jpg → ${(jpgSize / 1024).toFixed(1)} KB`);
}

console.log('\n✓ All images optimized to WebP.');
