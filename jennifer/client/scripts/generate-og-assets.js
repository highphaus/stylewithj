const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

async function generateSocialAssets() {
  const publicDir = path.join(__dirname, '..', 'public');
  const logoPath = path.join(publicDir, 'logo', 'style with j.png');

  console.log('Generating social share assets using tab favicon logo only...');

  // 1. Trim logo to its exact bounding box
  const trimmedLogo = await sharp(logoPath).trim().toBuffer();
  const trimmedMeta = await sharp(trimmedLogo).metadata();
  console.log(`Trimmed logo size: ${trimmedMeta.width}x${trimmedMeta.height}`);

  // 2. Generate 512x512 Square Share Icon (on clean #FAF9F6 alabaster background)
  // Perfectly sized for WhatsApp chat bubble preview thumbnails
  const targetHeight512 = 340;
  const scale512 = targetHeight512 / trimmedMeta.height;
  const targetWidth512 = Math.round(trimmedMeta.width * scale512);

  const resized512 = await sharp(trimmedLogo)
    .resize(targetWidth512, targetHeight512, { fit: 'contain' })
    .toBuffer();

  const top512 = Math.round((512 - targetHeight512) / 2);
  const left512 = Math.round((512 - targetWidth512) / 2);

  const square512 = await sharp({
    create: {
      width: 512,
      height: 512,
      channels: 4,
      background: { r: 250, g: 249, b: 246, alpha: 1 } // #FAF9F6 signature luxury alabaster
    }
  })
    .composite([{ input: resized512, top: top512, left: left512 }])
    .png()
    .toBuffer();

  fs.writeFileSync(path.join(publicDir, 'share-icon.png'), square512);
  fs.writeFileSync(path.join(publicDir, 'icon-512.png'), square512);
  console.log('✓ Created 512x512 share-icon.png & icon-512.png (tab logo on luxury ivory)');

  // 3. Generate 1200x630 OpenGraph Banner with ONLY the Tab Favicon Logo (NO hero photo)
  // Brand Canvas: #FAF9F6 with subtle gold frame and editorial brand typography
  const targetHeight1200 = 240;
  const scale1200 = targetHeight1200 / trimmedMeta.height;
  const targetWidth1200 = Math.round(trimmedMeta.width * scale1200);

  const resized1200 = await sharp(trimmedLogo)
    .resize(targetWidth1200, targetHeight1200, { fit: 'contain' })
    .toBuffer();

  const logoTop1200 = 95;
  const logoLeft1200 = Math.round((1200 - targetWidth1200) / 2);

  const svgText = Buffer.from(`
    <svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
      <!-- Luxury Gold / Dark subtle frame -->
      <rect x="36" y="36" width="1128" height="558" fill="none" stroke="#D4AF37" stroke-opacity="0.4" stroke-width="1" />
      <rect x="44" y="44" width="1112" height="542" fill="none" stroke="#1A1A1A" stroke-opacity="0.08" stroke-width="1" />

      <!-- Subtitle & Brand Taglines -->
      <text x="600" y="405" text-anchor="middle" font-family="'Times New Roman', Times, Georgia, serif" font-size="24" letter-spacing="6" fill="#1A1A1A" font-weight="400">
        PERSONAL STYLIST &amp; WARDROBE CONSULTANT
      </text>

      <line x1="480" y1="435" x2="720" y2="435" stroke="#D4AF37" stroke-width="1.5" stroke-opacity="0.6" />

      <text x="600" y="475" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="16" letter-spacing="3" fill="#666666" font-weight="300">
        EXECUTIVE WORKWEAR  ·  WARDROBE AUDITS  ·  BRIDAL TROUSSEAU
      </text>

      <text x="600" y="525" text-anchor="middle" font-family="'Courier New', Courier, monospace" font-size="12" letter-spacing="4" fill="#888888" font-weight="bold">
        BANGALORE &amp; VIRTUALLY WORLDWIDE  ·  STYLEWITHJ.IN
      </text>
    </svg>
  `);

  const ogComposite = await sharp({
    create: {
      width: 1200,
      height: 630,
      channels: 4,
      background: { r: 250, g: 249, b: 246, alpha: 1 }
    }
  })
    .composite([
      { input: resized1200, top: logoTop1200, left: logoLeft1200 },
      { input: svgText, top: 0, left: 0 }
    ]);

  // Save 1200x630 og-image.jpg
  await ogComposite
    .clone()
    .jpeg({ quality: 92 })
    .toFile(path.join(publicDir, 'og-image.jpg'));
  console.log('✓ Created 1200x630 og-image.jpg (tab favicon logo only, no hero photo)');

  // Save 1200x630 og-image.png
  await ogComposite
    .clone()
    .png()
    .toFile(path.join(publicDir, 'og-image.png'));
  console.log('✓ Created 1200x630 og-image.png (tab favicon logo only, no hero photo)');

  console.log('Social share assets successfully updated!');
}

generateSocialAssets().catch(err => {
  console.error('Error generating assets:', err);
  process.exit(1);
});
