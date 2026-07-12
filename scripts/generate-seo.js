import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Mengatur path direktori
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Jika VITE_SITE_URL tidak ada di .env, gunakan localhost sebagai default
// Di Netlify (production), proses build akan mengambil dari environment variable Netlify.
const SITE_URL = process.env.VITE_SITE_URL || 'http://localhost:3000';

const templatesDir = path.join(__dirname, '../seo-templates');
const publicDir = path.join(__dirname, '../public');

console.log(`[SEO Generator] Menggunakan Domain: ${SITE_URL}`);

// Pastikan folder public ada
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// 1. Generate robots.txt
const robotsTemplatePath = path.join(templatesDir, 'robots.txt');
const robotsOutputPath = path.join(publicDir, 'robots.txt');
if (fs.existsSync(robotsTemplatePath)) {
  const robotsContent = fs.readFileSync(robotsTemplatePath, 'utf-8');
  const newRobotsContent = robotsContent.replace(/{{SITE_URL}}/g, SITE_URL);
  fs.writeFileSync(robotsOutputPath, newRobotsContent);
  console.log('✅ Berhasil membuat public/robots.txt');
} else {
  console.error(`❌ Template robots.txt tidak ditemukan di: ${robotsTemplatePath}`);
}

// 2. Generate sitemap.xml
const sitemapTemplatePath = path.join(templatesDir, 'sitemap.xml');
const sitemapOutputPath = path.join(publicDir, 'sitemap.xml');
if (fs.existsSync(sitemapTemplatePath)) {
  const sitemapContent = fs.readFileSync(sitemapTemplatePath, 'utf-8');
  const newSitemapContent = sitemapContent.replace(/{{SITE_URL}}/g, SITE_URL);
  fs.writeFileSync(sitemapOutputPath, newSitemapContent);
  console.log('✅ Berhasil membuat public/sitemap.xml');
} else {
  console.error(`❌ Template sitemap.xml tidak ditemukan di: ${sitemapTemplatePath}`);
}
