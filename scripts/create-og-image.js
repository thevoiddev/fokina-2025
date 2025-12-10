const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const publicDir = path.join(__dirname, '../public');

async function createOGImage() {
  try {
    // Create a simple OG image with text
    const width = 1200;
    const height = 630;
    
    // Create SVG for the OG image
    const svg = `
      <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#9AABB8;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#7A8B98;stop-opacity:1" />
          </linearGradient>
        </defs>
        <rect width="${width}" height="${height}" fill="url(#grad)"/>
        <circle cx="150" cy="150" r="100" fill="#C4E538" opacity="0.3"/>
        <circle cx="${width - 150}" cy="${height - 150}" r="120" fill="#C4E538" opacity="0.2"/>
        <text x="${width / 2}" y="200" font-size="72" font-weight="bold" text-anchor="middle" fill="white" font-family="Arial, sans-serif">
          FOKINA
        </text>
        <text x="${width / 2}" y="300" font-size="48" text-anchor="middle" fill="white" font-family="Arial, sans-serif" opacity="0.9">
          Трекер воды для здоровья
        </text>
        <text x="${width / 2}" y="380" font-size="32" text-anchor="middle" fill="white" font-family="Arial, sans-serif" opacity="0.8">
          Отслеживай потребление воды каждый день
        </text>
        <rect x="100" y="${height - 100}" width="${width - 200}" height="80" fill="white" opacity="0.1" rx="10"/>
        <text x="${width / 2}" y="${height - 50}" font-size="24" text-anchor="middle" fill="white" font-family="Arial, sans-serif">
          fokina.app
        </text>
      </svg>
    `;
    
    const outputPath = path.join(publicDir, 'og-image.webp');
    
    console.log('Creating OG image...');
    
    await sharp(Buffer.from(svg))
      .webp({ quality: 90 })
      .toFile(outputPath);
    
    console.log(`✓ Successfully created og-image.webp`);
  } catch (err) {
    console.error('Error creating OG image:', err);
  }
}

createOGImage();
