const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const publicDir = path.join(__dirname, '../public');

async function convertImages() {
  try {
    const files = fs.readdirSync(publicDir);
    
    for (const file of files) {
      const filePath = path.join(publicDir, file);
      const ext = path.extname(file).toLowerCase();
      
      if (['.png', '.jpg', '.jpeg'].includes(ext)) {
        const outputPath = path.join(publicDir, `${path.basename(file, ext)}.webp`);
        
        console.log(`Converting ${file} to WebP...`);
        
        try {
          await sharp(filePath)
            .webp({ quality: 80 })
            .toFile(outputPath);
          
          console.log(`✓ Successfully converted ${file} to ${path.basename(outputPath)}`);
        } catch (err) {
          console.error(`✗ Error converting ${file}:`, err.message);
        }
      }
    }
    
    console.log('\nImage conversion complete!');
  } catch (err) {
    console.error('Error:', err);
  }
}

convertImages();
