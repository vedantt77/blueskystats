import { generatePreviewImage } from '../src/utils/imageGenerator.js';
import fs from 'fs/promises';
import path from 'path';

async function main() {
  try {
    const image = await generatePreviewImage({
      title: 'BlueskyStats.fyi',
      subtitle: 'Track your Bluesky analytics'
    });

    // Ensure the public directory exists
    await fs.mkdir('public', { recursive: true });

    // Save the image
    await fs.writeFile('public/preview.jpg', image);
    console.log('Preview image generated successfully!');
  } catch (error) {
    console.error('Error generating preview image:', error);
    process.exit(1);
  }
}

main();