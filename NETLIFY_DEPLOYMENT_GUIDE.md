# Panduan Lengkap Deployment Projek ke Netlify (Vite + TanStack Start)

Dokumen ini berisi panduan **langkah-demi-langkah yang sangat detail** untuk mendeploy projek ini ke Netlify. Panduan ini dirancang agar sangat mudah dipahami dan diimplementasikan oleh junior developer maupun AI assistant.

Projek ini menggunakan **React**, **Vite**, dan **TanStack Start**, serta sudah memiliki plugin Netlify (`@netlify/vite-plugin-tanstack-start`) di dalam konfigurasinya.

---

## 📋 Tahap 1: Persiapan Repository (Di Lokal)

Sebelum mendeploy ke Netlify, kita perlu memastikan konfigurasi di lokal sudah benar dan siap.

### 1. Pastikan Konfigurasi Vite Sudah Benar
Buka file `vite.config.ts`. Pastikan plugin netlify sudah terpasang dan dipanggil di dalam array `plugins`. (Saat ini **sudah ada**, namun pastikan tidak terhapus).
```typescript
// vite.config.ts
import { defineConfig } from 'vite'
import netlify from '@netlify/vite-plugin-tanstack-start'
// import plugin lainnya...

export default defineConfig({
  plugins: [
    // plugin lainnya...
    netlify() // <- Ini sangat penting untuk deploy ke Netlify
  ],
})
```

### 2. Buat File `netlify.toml` (Opsional tapi Sangat Disarankan)
Untuk mencegah kesalahan konfigurasi otomatis oleh Netlify, buatlah sebuah file baru bernama `netlify.toml` di **root (folder paling luar)** projek ini.
Isi file tersebut dengan kode berikut:

```toml
[build]
  command = "npm run build"
  publish = "dist" # Sesuaikan jika output folder berbeda (misal: "dist/client")

[build.environment]
  NODE_VERSION = "20" # Pastikan menggunakan Node.js versi 18 atau 20 ke atas
```
*Catatan: Plugin `@netlify/vite-plugin-tanstack-start` umumnya akan secara otomatis mengatur routing SSR dan API functions, sehingga Anda tidak perlu menulis rewrite rules manual untuk SPA.*

### 3. Commit dan Push Perubahan
Setelah memastikan semua konfigurasi benar:
1. Buka terminal.
2. Jalankan perintah berikut untuk menyimpan perubahan ke Git:
   ```bash
   git add .
   git commit -m "chore: setup netlify deployment config"
   git push origin main
   ```
*(Catatan: Ganti `main` dengan nama branch utama Anda jika berbeda, misalnya `master`).*

---

## 🚀 Tahap 2: Proses Deployment di Dashboard Netlify

Langkah ini dilakukan di website Netlify (https://app.netlify.com).

### 1. Login ke Netlify
1. Buka browser dan pergi ke [Netlify](https://app.netlify.com).
2. Login menggunakan akun GitHub, GitLab, atau email Anda.

### 2. Tambahkan Site Baru
1. Di halaman utama (Team Overview), klik tombol **"Add new site"**.
2. Pilih **"Import an existing project"**.
3. Pilih Git provider tempat repository Anda berada (misalnya **GitHub**).
4. Berikan otorisasi ke Netlify jika diminta.
5. Cari dan pilih repository projek ini (`fairways_villa` / `bali-beauty`).

### 3. Konfigurasi Build Settings
Netlify biasanya akan mendeteksi framework secara otomatis. Namun, pastikan (atau ubah) isian berikut agar persis seperti ini:

- **Base directory**: *(Kosongkan saja)*
- **Build command**: `npm run build`
- **Publish directory**: `dist` (atau biarkan default bawaan deteksi Netlify jika menggunakan plugin Tanstack Start)

### 4. Konfigurasi Environment Variables (Jika Ada)
Jika aplikasi Anda membutuhkan API Keys atau rahasia lainnya (biasanya ada di file `.env` lokal):
1. Klik tombol **"Add environment variables"** (di bawah pengaturan Build).
2. Pilih **"New variable"**.
3. Masukkan **Key** dan **Value** persis seperti yang ada di file `.env` lokal Anda.
4. Lakukan ini untuk semua variabel yang dibutuhkan (jangan masukkan variabel lokal seperti `localhost`).

### 5. Mulai Deploy
1. Klik tombol **"Deploy site"**.
2. Anda akan diarahkan ke halaman "Site overview". Di sini Anda bisa melihat tulisan "Site deploy in progress".
3. Tunggu 1-3 menit. Jika berhasil, warnanya akan berubah menjadi hijau dan tertulis **"Published"**.

---

## 🛠️ Tahap 3: Verifikasi & Troubleshooting (Pencarian Masalah)

Setelah Netlify memberikan link website (contoh: `https://nama-site-acak.netlify.app`), buka link tersebut.

### Jika Website Berhasil Terbuka:
Selamat! Deployment Anda berhasil. Anda bisa mengubah nama domain acak tersebut di menu:
**Site configuration -> Domain management -> Options -> Edit site name**.

### Jika Terjadi Error / Layar Putih (Blank):
Jika Anda mendapati error, ikuti langkah pengecekan ini:

1. **Cek Build Logs di Netlify:**
   - Pergi ke tab **Deploys**.
   - Klik pada deploy yang berlabel `Failed` atau yang terakhir.
   - Baca log (teks berwarna hitam) untuk melihat apa yang menyebabkan error. Biasanya karena ada package yang belum terinstall atau error TypeScript/ESLint.

2. **Cek Error 404 pada Halaman (Page Not Found):**
   - Jika halaman utama muncul tapi ketika di-refresh di halaman lain muncul 404, cek apakah plugin `netlify()` di `vite.config.ts` benar-benar sudah terpanggil.
   - Netlify plugin untuk TanStack Start bertugas membuat Edge Functions yang menangani Server-Side Routing.

3. **Cek Error di Console Browser:**
   - Buka website Anda.
   - Klik Kanan -> **Inspect** -> tab **Console**.
   - Lihat apakah ada pesan error berwarna merah. Jika ada yang terkait dengan "Environment Variable undefined", berarti Anda lupa memasukkan `.env` di tahap 2.4.

---

## 📝 Ringkasan Tugas untuk Junior Dev / AI
1. Cek `vite.config.ts` untuk memastikan `netlify()` plugin terpasang.
2. Buat `netlify.toml`.
3. Push ke GitHub.
4. Import repo di Netlify Dashboard.
5. Set Build Command: `npm run build` dan Publish Dir: `dist`.
6. Tambahkan `.env` variables di Netlify.
7. Deploy dan test jalannya website.
