import { createCanvas, loadImage, registerFont } from 'canvas';
import sharp from 'sharp';

export async function generatePreviewImage(options = {}) {
  const {
    title = 'BlueskyStats.fyi',
    subtitle = 'Track your Bluesky analytics',
    width = 1200,
    height = 630,
    backgroundColor = '#1d4ed8', // Blue-600
    textColor = '#ffffff'
  } = options;

  // Create canvas
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  // Set background
  ctx.fillStyle = backgroundColor;
  ctx.fillRect(0, 0, width, height);

  // Add gradient overlay
  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, 'rgba(0,0,0,0)');
  gradient.addColorStop(1, 'rgba(0,0,0,0.4)');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  // Configure text
  ctx.fillStyle = textColor;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  // Draw title
  ctx.font = 'bold 72px Arial';
  ctx.fillText(title, width / 2, height / 2 - 50);

  // Draw subtitle
  ctx.font = '36px Arial';
  ctx.fillText(subtitle, width / 2, height / 2 + 50);

  // Convert to Buffer
  const buffer = canvas.toBuffer('image/png');

  // Optimize with Sharp
  const optimizedImage = await sharp(buffer)
    .jpeg({
      quality: 90,
      progressive: true
    })
    .toBuffer();

  return optimizedImage;
}