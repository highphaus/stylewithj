const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

function createIco(images) {
  const count = images.length;
  let offset = 6 + 16 * count;
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // 1 = ICO
  header.writeUInt16LE(count, 4); // number of images

  const entries = [];
  for (const img of images) {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(img.width >= 256 ? 0 : img.width, 0);
    entry.writeUInt8(img.height >= 256 ? 0 : img.height, 1);
    entry.writeUInt8(0, 2); // color count
    entry.writeUInt8(0, 3); // reserved
    entry.writeUInt16LE(1, 4); // color planes
    entry.writeUInt16LE(32, 6); // bits per pixel
    entry.writeUInt32LE(img.buffer.length, 8); // image size
    entry.writeUInt32LE(offset, 12); // image offset
    entries.push(entry);
    offset += img.buffer.length;
  }

  return Buffer.concat([header, ...entries, ...images.map(img => img.buffer)]);
}

async function generateFavicons() {
  const clientDir = path.join(__dirname, '..');
  const publicDir = path.join(clientDir, 'public');
  const appDir = path.join(clientDir, 'app');

  const darkLogoPath = path.join(publicDir, 'logo', 'style with j.png');
  const whiteLogoPath = path.join(publicDir, 'logo', 'style with j-white.png');

  console.log('--- Generating Brand Favicon Assets ---');

  // 1. Trim source logos
  const trimmedDarkBuf = await sharp(darkLogoPath).trim().toBuffer();
  const trimmedWhiteBuf = await sharp(whiteLogoPath).trim().toBuffer();
  const darkMeta = await sharp(trimmedDarkBuf).metadata();
  const whiteMeta = await sharp(trimmedWhiteBuf).metadata();

  console.log(`Trimmed Dark Logo: ${darkMeta.width}x${darkMeta.height}`);
  console.log(`Trimmed White Logo: ${whiteMeta.width}x${whiteMeta.height}`);

  // Helper to place trimmed logo centered in a square canvas of `size`
  // with a subtle contrast halo for readability on dark tabs
  async function renderCenteredLogo(size, isDarkLogo = true, includeHalo = true) {
    const targetHeight = Math.round(size * 0.88);
    const scale = targetHeight / (isDarkLogo ? darkMeta.height : whiteMeta.height);
    const targetWidth = Math.round((isDarkLogo ? darkMeta.width : whiteMeta.width) * scale);

    const resizedLogo = await sharp(isDarkLogo ? trimmedDarkBuf : trimmedWhiteBuf)
      .resize(targetWidth, targetHeight, { fit: 'contain' })
      .toBuffer();

    const top = Math.round((size - targetHeight) / 2);
    const left = Math.round((size - targetWidth) / 2);

    const compositeList = [];

    // If it's a dark logo, add a subtle soft-white halo so it's clearly readable on dark browser tabs
    if (isDarkLogo && includeHalo) {
      // Create a soft translucent white silhouette as background halo
      const haloResized = await sharp(resizedLogo)
        .blur(Math.max(1, Math.round(size * 0.04)))
        .modulate({ brightness: 2 })
        .toBuffer();

      // Soft light backing with ~40% opacity
      const haloBase = await sharp({
        create: {
          width: targetWidth,
          height: targetHeight,
          channels: 4,
          background: { r: 255, g: 255, b: 255, alpha: 0.35 }
        }
      }).png().toBuffer();

      const compositeHalo = await sharp(haloBase)
        .composite([{ input: resizedLogo, blend: 'in' }])
        .blur(Math.max(1, Math.round(size * 0.03)))
        .toBuffer();

      compositeList.push({ input: compositeHalo, top, left });
    }

    compositeList.push({ input: resizedLogo, top, left });

    return sharp({
      create: {
        width: size,
        height: size,
        channels: 4,
        background: { r: 0, g: 0, b: 0, alpha: 0 }
      }
    })
      .composite(compositeList)
      .png();
  }

  // 2. Generate standard PNG favicons (16x16, 32x32, 48x48, 64x64, 192x192, 512x512)
  const sizes = [16, 32, 48, 64, 128, 192, 512];
  const pngBuffers = {};

  for (const s of sizes) {
    const buf = await (await renderCenteredLogo(s, true, true)).toBuffer();
    pngBuffers[s] = buf;
  }

  // Save specific standalone PNG favicons
  fs.writeFileSync(path.join(publicDir, 'favicon-16x16.png'), pngBuffers[16]);
  fs.writeFileSync(path.join(publicDir, 'favicon-32x32.png'), pngBuffers[32]);
  fs.writeFileSync(path.join(publicDir, 'favicon-48x48.png'), pngBuffers[48]);
  fs.writeFileSync(path.join(publicDir, 'favicon.png'), pngBuffers[32]);
  fs.writeFileSync(path.join(publicDir, 'icon-192.png'), pngBuffers[192]);
  fs.writeFileSync(path.join(publicDir, 'icon-512.png'), pngBuffers[512]);

  // App router icon.png
  fs.writeFileSync(path.join(appDir, 'icon.png'), pngBuffers[512]);

  console.log('✓ Generated PNG favicons (16, 32, 48, 64, 192, 512)');

  // 3. Generate multi-resolution favicon.ico (16, 32, 48)
  const icoBuffer = createIco([
    { width: 16, height: 16, buffer: pngBuffers[16] },
    { width: 32, height: 32, buffer: pngBuffers[32] },
    { width: 48, height: 48, buffer: pngBuffers[48] },
  ]);

  fs.writeFileSync(path.join(publicDir, 'favicon.ico'), icoBuffer);
  fs.writeFileSync(path.join(appDir, 'favicon.ico'), icoBuffer);
  console.log('✓ Generated multi-size favicon.ico (both public/ and app/)');

  // 4. Generate Apple Touch Icon (180x180)
  // Apple touch icon doesn't support transparency, so we use a luxury dark backdrop #111111 with the white floral logo
  const appleTouchSize = 180;
  const appleLogoH = 140;
  const appleLogoW = Math.round(whiteMeta.width * (appleLogoH / whiteMeta.height));
  const appleResizedLogo = await sharp(trimmedWhiteBuf)
    .resize(appleLogoW, appleLogoH, { fit: 'contain' })
    .toBuffer();

  const appleTouchIcon = await sharp({
    create: {
      width: appleTouchSize,
      height: appleTouchSize,
      channels: 4,
      background: { r: 17, g: 17, b: 17, alpha: 1 } // #111111
    }
  })
    .composite([
      {
        input: appleResizedLogo,
        top: Math.round((appleTouchSize - appleLogoH) / 2),
        left: Math.round((appleTouchSize - appleLogoW) / 2)
      }
    ])
    .png()
    .toBuffer();

  fs.writeFileSync(path.join(publicDir, 'apple-touch-icon.png'), appleTouchIcon);
  fs.writeFileSync(path.join(appDir, 'apple-icon.png'), appleTouchIcon);
  console.log('✓ Generated apple-touch-icon.png (both public/ and app/)');

  // 5. Generate Adaptive SVG Favicon (favicon.svg)
  // Automatically switches between dark logo and white logo based on browser color-scheme!
  const darkLogoBase64 = (await (await renderCenteredLogo(256, true, false)).toBuffer()).toString('base64');
  const whiteLogoBase64 = (await (await renderCenteredLogo(256, false, false)).toBuffer()).toString('base64');

  const svgFavicon = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="256" height="256" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
  <style>
    .light-theme { display: block; }
    .dark-theme { display: none; }
    @media (prefers-color-scheme: dark) {
      .light-theme { display: none; }
      .dark-theme { display: block; }
    }
  </style>
  <image class="light-theme" width="256" height="256" href="data:image/png;base64,${darkLogoBase64}" />
  <image class="dark-theme" width="256" height="256" href="data:image/png;base64,${whiteLogoBase64}" />
</svg>`;

  fs.writeFileSync(path.join(publicDir, 'favicon.svg'), svgFavicon, 'utf8');
  console.log('✓ Generated adaptive favicon.svg (dark/light theme responsive)');

  console.log('All favicon and brand logo icons updated successfully!');
}

generateFavicons().catch(err => {
  console.error('Error generating favicons:', err);
  process.exit(1);
});

