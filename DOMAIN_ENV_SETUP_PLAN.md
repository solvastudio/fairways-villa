# Rencana Implementasi: Environment Variable untuk Domain (Robots.txt & Sitemap)

Dokumen ini berisi panduan **sangat detail dan langkah-demi-langkah** untuk mengatur environment variable domain agar URL di dalam `robots.txt` dan `sitemap.xml` dapat berubah secara otomatis sesuai dengan environment (lokal atau Netlify/Production).

Panduan ini dirancang untuk mudah dipahami dan dieksekusi oleh Junior Developer atau AI assistant.

---

## Konsep Dasar
File `robots.txt` dan `sitemap.xml` di dalam folder `public/` adalah file statis (tidak bisa membaca `.env` secara langsung di browser).
Solusinya: Kita akan membuat **template** untuk kedua file tersebut, lalu membuat **script otomatis** yang akan mengganti teks placeholder dengan domain asli sebelum proses *build* atau *dev* berjalan.

---

## Langkah 1: Siapkan Template SEO

Karena `public/robots.txt` dan `public/sitemap.xml` nantinya akan di-generate (dibuat) secara otomatis oleh script kita, kita harus membuat file master atau templatenya terlebih dahulu.

1. Buat folder baru di luar folder `src` (sejajar dengan `package.json`), beri nama `seo-templates`.
2. Buat file `seo-templates/robots.txt` dan isi dengan kode berikut:
   ```txt
   User-agent: *
   Allow: /

   Sitemap: {{SITE_URL}}/sitemap.xml
   ```
3. Buat file `seo-templates/sitemap.xml` dan isi dengan struktur dasar sitemap, misalnya:
   ```xml
   <?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <url>
       <loc>{{SITE_URL}}/</loc>
       <lastmod>2024-01-01</lastmod>
       <changefreq>monthly</changefreq>
       <priority>1.0</priority>
     </url>
     <!-- Tambahkan URL halaman lainnya di sini menggunakan format {{SITE_URL}}/nama-halaman -->
   </urlset>
   ```
*(Perhatikan teks `{{SITE_URL}}`, ini adalah kata kunci yang nanti akan kita timpa).*

---

## Langkah 2: Buat Script Pembuat Otomatis (Generator)

Kita butuh sebuah script Node.js sederhana untuk membaca template di atas, mengganti `{{SITE_URL}}`, dan meletakkannya di folder `public/`.

1. Buat folder baru bernama `scripts` di letak yang sama dengan `package.json`.
2. Buat file `scripts/generate-seo.js`.
3. Masukkan kode berikut ke dalam file `scripts/generate-seo.js`:

   ```javascript
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
   }

   // 2. Generate sitemap.xml
   const sitemapTemplatePath = path.join(templatesDir, 'sitemap.xml');
   const sitemapOutputPath = path.join(publicDir, 'sitemap.xml');
   if (fs.existsSync(sitemapTemplatePath)) {
     const sitemapContent = fs.readFileSync(sitemapTemplatePath, 'utf-8');
     const newSitemapContent = sitemapContent.replace(/{{SITE_URL}}/g, SITE_URL);
     fs.writeFileSync(sitemapOutputPath, newSitemapContent);
     console.log('✅ Berhasil membuat public/sitemap.xml');
   }
   ```

---

## Langkah 3: Update `package.json`

Agar script di atas selalu berjalan secara otomatis sebelum menjalankan lokal dev atau proses build produksi, kita perlu mengedit file `package.json`.

1. Buka file `package.json`.
2. Cari bagian `"scripts"`.
3. Tambahkan script `generate-seo` dan ubah event `dev` serta `build` agar memanggil script tersebut dengan `predev` dan `prebuild`.

Contoh perubahan di `"scripts"`:

```json
  "scripts": {
    "generate-seo": "node scripts/generate-seo.js",
    "predev": "npm run generate-seo",
    "dev": "vite dev --port 3000",
    "generate-routes": "tsr generate",
    "prebuild": "npm run generate-seo",
    "build": "vite build",
    "preview": "vite preview"
  }
```
*(Catatan: NPM akan otomatis menjalankan perintah `predev` sesaat sebelum perintah `dev`, begitu juga dengan `prebuild` ke `build`).*

---

## Langkah 4: Setup `.gitignore`

Karena file `public/robots.txt` dan `public/sitemap.xml` akan otomatis terbuat (ter-generate), kita tidak boleh memasukannya ke Github agar tidak terjadi *conflict*. Yang masuk ke github hanyalah folder `seo-templates/`.

1. Buka file `.gitignore`.
2. Tambahkan dua baris ini di bagian paling bawah:
   ```txt
   # Generated SEO files
   public/robots.txt
   public/sitemap.xml
   ```
*(Penting: Hapus file `public/robots.txt` dan `public/sitemap.xml` secara manual dari dalam source code-mu dan lakukan `git rm` jika sebelumnya sudah pernah tersimpan di git).*

---

## Langkah 5: Atur Environment Variable (.env)

Sekarang aplikasi sudah siap menerima domain dinamis. Mari kita atur di sisi environment.

### 5A. Pengaturan untuk Local Development
1. Buat file bernama `.env` di folder paling luar (sejajar dengan `package.json`).
2. Masukkan baris berikut:
   ```env
   VITE_SITE_URL=http://localhost:3000
   ```
*(Note: file `.env` biasanya sudah ada di `.gitignore`, jadi tidak akan ter-push ke GitHub).*

### 5B. Pengaturan di Netlify (Production)
Agar saat deploy Netlify menggunakan URL asli (contoh: https://fairwaysvillabelek.com), kita harus mendaftarkannya di Netlify.

1. Buka Dashboard Netlify (https://app.netlify.com).
2. Masuk ke situs project kamu.
3. Masuk ke **Site configuration** > **Environment variables**.
4. Klik **Add a variable** -> **Add a single variable**.
5. Isi formulirnya:
   - **Key**: `VITE_SITE_URL`
   - **Value**: `https://fairwaysvillabelek.com` (Ganti dengan domain aslimu, TANPA garis miring `/` di akhir).
6. Simpan (Save).

---

## Cara Verifikasi (Testing)

Untuk membuktikan semua langkah sudah benar di lokal:
1. Matikan server lokal di terminal (`Ctrl + C`).
2. Hapus (Delete) file `public/robots.txt` dan `public/sitemap.xml` secara manual.
3. Jalankan `npm run dev` kembali di terminal.
4. Kamu akan melihat log: `[SEO Generator] Menggunakan Domain: http://localhost:3000`.
5. Cek folder `public/`, seharusnya file `robots.txt` dan `sitemap.xml` muncul otomatis dengan URL `http://localhost:3000` di dalamnya.
6. Proses selesai! Saat di-push ke Github dan di-build oleh Netlify, sistem akan otomatis merubahnya menjadi https://fairwaysvillabelek.com sesuai environment variable yang kita setup di Netlify.
