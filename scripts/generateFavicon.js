import { generateFavicon } from '../src/utils/faviconGenerator.js';
import fs from 'fs/promises';
import path from 'path';

async function main() {
  try {
    const favicons = await generateFavicon({
      text: 'B',
      backgroundColor: '#1d4ed8',
      textColor: '#ffffff'
    });

    // Ensure the public directory exists
    await fs.mkdir('public', { recursive: true });

    // Save all favicon sizes
    for (const [size, buffer] of Object.entries(favicons)) {
      await fs.writeFile(`public/favicon-${size}.png`, buffer);
    }

    // Create favicon.ico (16x16 and 32x32 combined)
    await sharp(favicons[32])
      .toFile('public/favicon.ico');

    console.log('Favicons generated successfully!');
  } catch (error) {
    console.error('Error generating favicons:', error);
    process.exit(1);
  }
}

main();