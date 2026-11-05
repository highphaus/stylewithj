const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

async function generateAssets() {
  const publicDir = path.join(__dirname, '..', 'public');
  const appDir = path.join(__dirname, '..', 'app');

  const heroImagePath = path.join(publicDir, 'images', 'hero', 'hero image desktop.png');
  const whiteLogoPath = path.join(publicDir, 'logo', 'style with j-white.png');
  const darkLogoPath = path.join(publicDir, 'logo', 'style with j.png');

  console.log('Generating OpenGraph and Social Media Assets...');

  // 1. Prepare Logo for Overlay
  // Logo is 268 x 368
  const logoResized = await sharp(whiteLogoPath)
    .resize({ height: 130 })
    .toBuffer();

  const logoMeta = await sharp(logoResized).metadata();

  // 2. SVG Overlay with Editorial Typography
  const svgOverlay = Buffer.from(`
    <svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="scrim" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="#0D0D0D" stop-opacity="0.94" />
          <stop offset="42%" stop-color="#0D0D0D" stop-opacity="0.82" />
          <stop offset="70%" stop-color="#0D0D0D" stop-opacity="0.45" />
          <stop offset="100%" stop-color="#0D0D0D" stop-opacity="0.25" />
        </linearGradient>
        <linearGradient id="bottomFade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="60%" stop-color="#000000" stop-opacity="0" />
          <stop offset="100%" stop-color="#000000" stop-opacity="0.85" />
        </linearGradient>
      </defs>

      <!-- Dark luxury scrim on left half -->
      <rect x="0" y="0" width="1200" height="630" fill="url(#scrim)" />
      <rect x="0" y="0" width="1200" height="630" fill="url(#bottomFade)" />

      <!-- Gold accent border -->
      <rect x="32" y="32" width="1136" height="566" fill="none" stroke="#D4AF37" stroke-opacity="0.3" stroke-width="1" />

      <!-- Eyebrow text -->
      <text x="90" y="270" font-family="'Times New Roman', Times, Georgia, serif" font-size="14" letter-spacing="5" fill="#D4AF37" font-weight="600">
        HAUTE SARTORIAL &amp; PERSONAL STYLING
      </text>

      <!-- Main Heading -->
      <text x="90" y="340" font-family="'Times New Roman', Times, Georgia, serif" font-size="58" letter-spacing="1" fill="#FFFFFF" font-weight="300">
        Personal Stylist
      </text>
      <text x="90" y="398" font-family="'Times New Roman', Times, Georgia, serif" font-size="40" font-style="italic" fill="#FAF9F6" font-weight="300">
        &amp; Wardrobe Curation
      </text>

      <!-- Thin gold accent line -->
      <line x1="90" y1="425" x2="220" y2="425" stroke="#FFFFFF" stroke-opacity="0.4" stroke-width="1.5" />

      <!-- Subtitle Description -->
      <text x="90" y="465" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="18" fill="#E5E5E5" font-weight="300" letter-spacing="0.5">
        Executive Workwear  ·  Wardrobe Audits  ·  Bespoke Styling
      </text>

      <!-- Location and web address pill -->
      <rect x="90" y="500" width="360" height="38" rx="2" fill="#FFFFFF" fill-opacity="0.12" stroke="#FFFFFF" stroke-opacity="0.25" stroke-width="1" />
      <text x="110" y="524" font-family="'Courier New', Courier, monospace" font-size="13" fill="#FFFFFF" letter-spacing="2" font-weight="bold">
        BANGALORE &amp; VIRTUALLY WORLDWIDE
      </text>

      <text x="1120" y="565" text-anchor="end" font-family="'Courier New', Courier, monospace" font-size="13" fill="#FFFFFF" fill-opacity="0.75" letter-spacing="3">
        STYLEWITHJ.IN
      </text>
    </svg>
  `);

  // 3. Composite 1200x630 OpenGraph Banner
  const baseHero = await sharp(heroImagePath)
    .resize(1200, 630, { fit: 'cover', position: 'center' })
    .toBuffer();

  const ogComposite = await sharp(baseHero)
    .composite([
      { input: svgOverlay, top: 0, left: 0 },
      { input: logoResized, top: 85, left: 90 },
    ]);

  // Save og-image.jpg (JPEG 88 quality, approx ~130KB for rapid WhatsApp loading)
  const ogJpgPath = path.join(publicDir, 'og-image.jpg');
  await ogComposite
    .clone()
    .jpeg({ quality: 88, progressive: true })
    .toFile(ogJpgPath);
  console.log('✓ Created:', ogJpgPath);

  // Also save in app directory as opengraph-image.jpg & twitter-image.jpg
  const appOgPath = path.join(appDir, 'opengraph-image.jpg');
  const appTwPath = path.join(appDir, 'twitter-image.jpg');
  fs.copyFileSync(ogJpgPath, appOgPath);
  fs.copyFileSync(ogJpgPath, appTwPath);
  console.log('✓ Created:', appOgPath);
  console.log('✓ Created:', appTwPath);

  // Also create a PNG version
  const ogPngPath = path.join(publicDir, 'og-image.png');
  await ogComposite
    .clone()
    .png({ quality: 90, compressionLevel: 8 })
    .toFile(ogPngPath);
  console.log('✓ Created:', ogPngPath);

  // 4. Generate Square Icons (512x512, 192x192, 180x180)
  // Square luxury monogram icon: dark background #111111 with the white logo centered and subtle gold ring
  const squareSvgBg = Buffer.from(`
    <svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
      <rect width="512" height="512" fill="#111111" />
      <circle cx="256" cy="256" r="236" fill="none" stroke="#D4AF37" stroke-opacity="0.35" stroke-width="2" />
      <circle cx="256" cy="256" r="246" fill="none" stroke="#FFFFFF" stroke-opacity="0.1" stroke-width="1" />
      <text x="256" y="445" text-anchor="middle" font-family="'Times New Roman', Times, Georgia, serif" font-size="22" letter-spacing="8" fill="#D4AF37" font-weight="600">
        STYLE WITH J
      </text>
    </svg>
  `);

  const squareLogo = await sharp(whiteLogoPath)
    .resize({ height: 260 })
    .toBuffer();

  const squareIcon512 = await sharp(squareSvgBg)
    .composite([
      { input: squareLogo, top: 90, left: Math.round((512 - (await sharp(squareLogo).metadata()).width) / 2) }
    ]);

  const icon512Path = path.join(publicDir, 'icon-512.png');
  await squareIcon512.clone().png().toFile(icon512Path);
  console.log('✓ Created:', icon512Path);

  const icon192Path = path.join(publicDir, 'icon-192.png');
  await sharp(icon512Path).resize(192, 192).png().toFile(icon192Path);
  console.log('✓ Created:', icon192Path);

  const appleTouchPath = path.join(publicDir, 'apple-touch-icon.png');
  await sharp(icon512Path).resize(180, 180).png().toFile(appleTouchPath);
  console.log('✓ Created:', appleTouchPath);

  // Note: Icons are maintained directly from public/logo/style with j.png per user requirement.
  console.log('All social and WhatsApp assets generated successfully!');
}

generateAssets().catch(err => {
  console.error('Failed to generate assets:', err);
  process.exit(1);
});

