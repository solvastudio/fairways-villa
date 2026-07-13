import sharp from 'sharp';
import fs from 'fs';

async function compress() {
  try {
    const input1 = 'src/assets/hero-bg.webp';
    const before1 = fs.statSync(input1).size;
    const inputBuffer1 = fs.readFileSync(input1);
    const buffer1 = await sharp(inputBuffer1).webp({ quality: 65, effort: 6 }).toBuffer();
    fs.writeFileSync(input1, buffer1);
    const after1 = fs.statSync(input1).size;
    console.log(`Compressed src/assets/hero-bg.webp from ${before1} to ${after1} bytes`);

    const input2 = 'public/assets/villa/hero-bg.webp';
    const before2 = fs.statSync(input2).size;
    const inputBuffer2 = fs.readFileSync(input2);
    const buffer2 = await sharp(inputBuffer2).webp({ quality: 65, effort: 6 }).toBuffer();
    fs.writeFileSync(input2, buffer2);
    const after2 = fs.statSync(input2).size;
    console.log(`Compressed public/assets/villa/hero-bg.webp from ${before2} to ${after2} bytes`);
  } catch (err) {
    console.error(err);
  }
}
compress();
