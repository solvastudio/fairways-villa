# Panduan Implementasi Figma ke Kode (Figma to Code Implementation Guide)

## 🎯 Objektif Utama
Panduan ini dirancang khusus untuk Junior Developer atau AI Model untuk menerjemahkan desain Figma menjadi website yang **Full Functional, Responsive, dan High Performance**. 

**Desain Referensi:** [Portofolio Final - Node 395-430](https://www.figma.com/design/I4I98jEJuKrW0kCuDXD8Tk/PORTOFOLIO-FINALLLLLLL?node-id=395-430&m=dev)

---

## 🏗️ Prinsip Dasar (Core Principles)

1. **Mobile-First Approach (SANGAT PENTING):** 
   Meskipun desain referensi berbasis layar besar (desktop), implementasi kode **HARUS SELALU** dimulai dari tampilan mobile (smartphone). 
   - **Aturan Main:** Buat layout menumpuk (stacking column) secara logis pada layar kecil sebagai default (tanpa `@media` query). 
   - **Scaling Up:** Gunakan media query (misal: `md:`, `lg:` pada Tailwind atau `@media (min-width: 768px)`) untuk melebarkan dan menyusun ulang layout (menjadi row/grid) ke ukuran tablet dan desktop sesuai dengan desain asli Figma. **Jangan asal-asalan mengecilkan skala elemen desktop untuk ditaruh di mobile!**
2. **DRY (Don't Repeat Yourself):** Jangan ada pengulangan kode. Jika ada elemen yang mirip (seperti tombol, kartu portofolio, title section), buatkan abstraksinya.
3. **Reusable Components:** Pecah UI menjadi komponen-komponen kecil, independen, dan dapat digunakan kembali (contoh: `Button.jsx`, `SectionHeader.jsx`, `ProjectCard.jsx`).
4. **No Code Smell:** Jaga agar kode tetap bersih. Penamaan variabel, kelas, dan komponen harus deskriptif. Hindari *inline-styling* yang kotor dan file komponen yang terlalu membengkak panjangnya.
5. **Maintainability:** Gunakan CSS Variables atau Design Tokens (contoh di `tailwind.config.js`) secara konsisten. Jangan hardcode warna (seperti `text-[#FF5500]`) berulang-ulang, buatkan variabelnya (seperti `text-primary`).

---

## 🎨 Figma MCP Integration Rules
Aturan ini mendefinisikan cara berinteraksi dengan alat (tool) Figma MCP untuk proyek ini. Aturan ini **HARUS DIIKUTI** untuk setiap perubahan/implementasi berbasis Figma.

### Required Flow (Langkah Wajib - Jangan Dilewati!)
1. **Fetch Node:** Jalankan `get_design_context` terlebih dahulu untuk mengambil representasi terstruktur dari spesifik node(s) Figma.
2. **Handle Large Data:** Jika responsnya terlalu besar atau terpotong (truncated), jalankan `get_metadata` untuk mendapatkan peta node tingkat tinggi (high-level node map). Setelah itu, fetch ulang *hanya* node spesifik yang dibutuhkan dengan `get_design_context`.
3. **Visual Reference:** Jalankan `get_screenshot` untuk mendapatkan referensi visual aktual dari varian node yang sedang diimplementasikan.
4. **Prasyarat Eksekusi:** **HANYA** setelah kamu memiliki hasil dari `get_design_context` DAN `get_screenshot`, kamu boleh mengunduh aset yang dibutuhkan dan memulai penulisan kode implementasi.
5. **Konversi Format:** Terjemahkan output mentah dari MCP (biasanya berupa React + Tailwind yang kotor) ke dalam konvensi, gaya arsitektur, dan framework proyek ini. Gunakan kembali token warna, komponen, dan tipografi proyek yang sudah ada.
6. **Validasi Akhir:** Validasi hasil kode (UI di browser lokal) dengan desain Figma (screenshot) untuk memastikan tampilan (1:1 look) dan perilakunya sama persis sebelum menandai task selesai.

### Implementation Rules
- Anggap output dari Figma MCP (React + Tailwind) HANYA sebagai **representasi layout, desain, dan perilaku**, BUKAN sebagai gaya kode final yang bisa di-copy-paste mentah-mentah.
- Gantikan *Tailwind utility classes* yang bersifat arbitrer dari Figma dengan utilities / *design-system tokens* pilihan dari repository proyek (contoh: ganti `w-[314px]` dengan pendekatan flex/grid responsif yang lebih adaptif).
- Gunakan kembali komponen proyek yang sudah ada (misalnya: tombol, input, tipografi, pembungkus ikon) daripada menduplikasi fungsionalitas baru yang tujuannya sama.
- Patuhi sistem warna, skala tipografi, dan token *spacing* (spasi/margin/padding) yang sudah ada secara konsisten.
- Hormati arsitektur *routing*, manajemen *state*, dan pola *data-fetching* yang sudah ada di repository (jangan membuat pola baru tanpa izin).
- Berusahalah untuk mencapai **1:1 visual parity** (kemiripan 100%) dengan desain Figma. Saat ada konflik struktur, utamakan penggunaan token sistem desain dan modifikasi ukuran atau spasi seminimal mungkin agar tetap terlihat mirip dengan visual asli.
- Validasi UI yang dihasilkan secara lokal, bandingkan berdampingan dengan *screenshot* Figma untuk tampilan dan fungsionalitas perilakunya (contoh: *hover states*, transisi).

---

## 🖼️ Manajemen Aset & Kompresi (High Performance Strategy)
Untuk memastikan beban muat (load time) website sangat ringan, proses aset harus dilakukan secara ketat:

1. **Unduh Aset Secara Terstruktur:** 
   - Ekstrak seluruh gambar/aset dari Figma.
   - Ikon (icons) dan Logo HARUS dalam format `.svg`.
   - Gambar kompleks (foto, background) diekstrak dalam resolusi tinggi terlebih dahulu (misalnya `2x`).
2. **Proses Kompresi Tanpa Kehilangan Kualitas (Lossless/High-Quality Lossy):**
   - **JANGAN PERNAH** memasukkan `.png` atau `.jpg` berukuran besar langsung ke dalam project.
   - Konversi semua file gambar foto menjadi format `.webp` atau `.avif`.
   - Gunakan tool kompresi (contoh: Squoosh, TinyPNG, atau script optimasi lokal berbasis `sharp` pada Node.js) dengan kualitas kompresi di kisaran 75-85%. Pastikan gambar tetap tajam namun ukurannya (size KB) menurun drastis.
3. **Pemuatan Aset (Loading Strategy):**
   - Pastikan dimensi aktual gambar (`width` & `height`) diset eksplisit pada elemen HTML/komponen.
   - Gunakan `loading="lazy"` untuk semua gambar yang tidak berada di *above the fold* (bagian atas website yang pertama terlihat).
   - Gunakan Image Component bawaan framework (seperti `<Image />` dari Next.js) jika proyek ini menggunakannya.

---

## 📝 Langkah-Langkah Eksekusi (Step-by-Step Action Plan)
Langkah ini sangat detail dan harus diikuti berurutan oleh Developer / AI.

### Tahap 1: Setup Global & Design System
1. **Analisis Figma:** Buka tautan Figma. Catat warna utama, sekunder, gaya font (Font Family & Sizes), dan ukuran border-radius.
2. **Registrasi Token:** Masukkan data warna dan font tersebut ke dalam file konfigurasi (*styling config* seperti `tailwind.config.ts` atau file CSS variables). Jangan mulai *styling component* sebelum *config* ini selesai!
3. **Struktur Folder:** Pastikan direktori `/components`, `/assets/images`, dan `/assets/icons` sudah rapi.

### Tahap 2: Ekstraksi Data (MCP Workflow per Component/Section)
1. Pilih **satu bagian** spesifik dari desain desktop (misal: "Hero Section").
2. Eksekusi `get_design_context` untuk mendapatkan layout dasar.
3. Eksekusi `get_screenshot` untuk validasi mata.
4. Unduh semua *image* dan *icon* untuk bagian tersebut. Kompres menjadi `.webp` atau `.svg`, simpan di `/assets`.

### Tahap 3: Implementasi "Mobile First" (Mulai Koding)
1. **Buat Komponen Atomic:** Buat komponen terkecil terlebih dahulu (contoh: `<PrimaryButton>`, `<TitleText>`).
2. **Koding Layout Mobile (HP):** 
   - Mulai implementasi CSS/Tailwind untuk layar berukuran kecil (HP - `< 640px`).
   - Ubah layout desktop (misal menyamping/row) menjadi menumpuk/vertikal (flex-col).
   - Perkecil ukuran font (`text-2xl` bukan `text-5xl`), kurangi nilai padding/margin (`p-4` bukan `p-20`).
3. **Terapkan Media Query (Tablet ke Desktop):**
   - Setelah tampilan Mobile rapi, tambahkan class breakpoint (`md:`, `lg:`, `xl:`).
   - Lebarkan layout (ubah `flex-col` menjadi `flex-row` atau gunakan Grid).
   - Sesuaikan spacing dan typography sehingga persis dengan referensi layar besar pada desain awal Figma.

### Tahap 4: Refactoring (DRY & No Code Smell)
1. Evaluasi kode yang baru dibuat. Adakah *class Tailwind* yang berulang hingga 5-10 kali? Jika ada, buatkan komponen *wrapper* atau `@apply` pada CSS (bila diizinkan).
2. Periksa hierarki HTML. Gunakan *Semantic Tag* (`<section>`, `<nav>`, `<main>`, `<article>`, `<header>`) bukan div soup (tumpukan `<div>` tiada akhir).

### Tahap 5: Quality Assurance (QA) & Final Validasi
1. Bandingkan tampilan `localhost:3000` dengan hasil eksekusi `get_screenshot` secara detail.
2. Periksa elemen di layar desktop dan mobile secara riil (gunakan *Responsive Design Mode* pada DevTools).
3. Jalankan lighthouse untuk memastikan *performance* tetap terjaga (gambar terkompresi, DOM tidak berlebihan).
4. Selesaikan *Task*!
