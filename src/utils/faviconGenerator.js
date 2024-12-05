import { createCanvas } from 'canvas';
import sharp from 'sharp';

export async function generateFavicon(options = {}) {
  const {
    backgroundColor = '#1d4ed8', // Blue-600
    textColor = '#ffffff',
    text = 'B'
  } = options;

  // Create different sizes for various devices
  const sizes = [16, 32, 48, 64, 128, 256];
  const favicons = {};

  for (const size of sizes) {
    const canvas = createCanvas(size, size);
    const ctx = canvas.getContext('2d');

    // Draw background
    ctx.fillStyle = backgroundColor;
    ctx.beginPath();
    ctx.arc(size/2, size/2, size/2, 0, Math.PI * 2);
    ctx.fill();

    // Draw text
    ctx.fillStyle = textColor;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = `bold ${size * 0.6}px Arial`;
    ctx.fillText(text, size/2, size/2 + size * 0.05);

    // Convert to buffer
    const buffer = canvas.toBuffer('image/png');
    
    // Optimize with Sharp
    favicons[size] = await sharp(buffer)
      .png({ quality: 100 })
      .toBuffer();
  }

  return favicons;
}