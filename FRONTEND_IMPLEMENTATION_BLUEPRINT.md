# 📘 Blueprint Implementasi Frontend: Figma to Code (Mobile-First & Responsive)

Dokumen ini adalah panduan langkah demi langkah yang sangat detail untuk menerjemahkan desain Figma menjadi website yang fully functional dan responsif. Panduan ini dirancang khusus agar mudah dipahami dan diikuti oleh Junior Developer atau model AI asisten coding.

**Link Desain Figma:** [Portofolio Final](https://www.figma.com/design/I4I98jEJuKrW0kCuDXD8Tk/PORTOFOLIO-FINALLLLLLL?node-id=369-322&m=dev)

---

## 🎯 Prinsip Utama Development (WAJIB DIBACA)

1. **Mobile First Design:** Selalu mulai styling dari layar terkecil (mobile). Setelah itu, tambahkan *media query* (atau utility classes Tailwind seperti `md:`, `lg:`, `xl:`) secara bertahap untuk menyesuaikan layout di layar yang lebih besar (tablet hingga desktop/layar besar).
2. **DRY (Don't Repeat Yourself) & Reusable Components:** Jangan ada kode atau styling yang diulang-ulang. Jika ada elemen visual yang sama (seperti Button, Card, Input), jadikan itu sebagai satu komponen terpisah yang bisa dipanggil berulang kali.
3. **No Code Smell & Mudah di-Maintain:** Tulis kode yang rapi, berikan penamaan variabel/class yang deskriptif, dan hindari *inline styling*. Semua style harus terpusat pada *design system* atau token yang disepakati.
4. **Presisi Layar Besar (Desktop):** Walaupun desain yang diberikan berbasis layar besar, jangan pernah melakukan *hardcode* ukuran pixel (px) secara sembarangan untuk layar besar. Gunakan persentase (`%`), `rem`, `vw/vh`, atau max-width wrapper (misal `max-w-7xl mx-auto`) agar tampilan tidak berantakan di layar yang sangat lebar (ultrawide).

---

## 🛠️ Aturan Integrasi Figma MCP (Wajib Diikuti Secara Ketat)

Setiap kali Anda (atau AI) akan mengimplementasikan bagian manapun dari desain Figma, **wajib** mengikuti urutan berikut tanpa terkecuali:

### 1. Alur Kerja Wajib (Required Flow)
1. **Jalankan `get_design_context`:** Pertama, ambil representasi terstruktur dari node(s) Figma yang spesifik.
2. **Gunakan `get_metadata` (Jika Perlu):** Jika respons `get_design_context` terlalu besar atau terpotong, jalankan `get_metadata` untuk mendapatkan peta node tingkat tinggi, lalu panggil ulang `get_design_context` HANYA untuk node yang dibutuhkan.
3. **Jalankan `get_screenshot`:** Ambil referensi visual dari varian node yang sedang diimplementasikan. Anda HARUS melihat gambar aslinya.
4. **Download Asset & Mulai Coding:** HANYA setelah Anda mendapatkan data dari `get_design_context` DAN gambar dari `get_screenshot`, Anda boleh mendownload aset yang dibutuhkan dan mulai menulis kode.
5. **Terjemahkan ke Konvensi Proyek:** Output dari Figma (biasanya React + Tailwind) hanyalah *referensi*. Anda harus menyesuaikannya dengan gaya, token warna, dan kerangka kerja proyek ini. **Gunakan kembali token warna, komponen, dan tipografi proyek yang sudah ada!**
6. **Validasi 1:1:** Sebelum menandai tugas selesai, pastikan hasil kodingan Anda secara visual dan fungsional identik 1:1 dengan desain Figma.

### 2. Aturan Implementasi (Implementation Rules)
- Anggap kode output Figma MCP (React + Tailwind) sebagai representasi tata letak dan perilaku, **bukan** sebagai gaya kode akhir.
- **Ganti** kelas utilitas Tailwind mentah dengan token utilitas/design-system khusus proyek (jika ada).
- **Gunakan kembali (Reuse)** komponen yang sudah ada (misalnya: tombol, input, tipografi, pembungkus ikon) daripada membuat ulang dari nol.
- Gunakan sistem warna, skala tipografi, dan token spasi/jarak dari proyek secara konsisten.
- Jangan merusak atau mengubah routing, manajemen state, dan pola pengambilan data (data-fetching) yang sudah ada di repositori.
- **Berusaha keras untuk mencapai kesamaan visual 1:1.** Jika terjadi konflik antara desain dan sistem token, prioritaskan token design-system proyek dan sesuaikan spasi/ukuran secara minimal.
- Selalu validasi UI akhir Anda dengan screenshot Figma secara visual maupun interaksinya.

---

## 📦 Manajemen Aset & Optimasi Gambar

Performa adalah kunci. Halaman web tidak boleh berat saat dimuat.

1. **Download Semua Aset:** Ekstrak semua gambar, ikon, dan vektor (SVG) dari Figma.
2. **Gunakan Format yang Tepat:**
   - Ikon & Logo: Gunakan **SVG**.
   - Gambar Fotografi/Kompleks: Gunakan **WebP** atau **AVIF** (hindari PNG/JPG ukuran besar kecuali terpaksa/fallback).
3. **Kompresi Tanpa Mengurangi Kualitas (Lossless/High-Quality Lossy):**
   - Wajib memproses setiap gambar melalui *compressor* (seperti TinyPNG, Squoosh.app, atau sistem image optimizer bawaan framework seperti `next/image`).
   - Tujuannya adalah memangkas ukuran aset sekecil mungkin tanpa visual yang pecah (maksimal dianjurkan < 300KB - 500KB per gambar hero, dan < 50KB untuk thumbnail).
4. **Lazy Loading:** Implementasikan atribut `loading="lazy"` pada gambar yang berada di bawah lipatan layar (below the fold) agar website cepat dibuka di detik pertama.

---

## 🚀 Langkah-Langkah Implementasi Detail (Step-by-Step)

Ikuti urutan ini dari Tahap 1 hingga Tahap 6 secara disiplin. Jangan melompati tahap manapun.

### TAHAP 1: Analisis Desain & Tokenisasi
1. Buka Figma dan identifikasi **Sistem Warna** (Primary, Secondary, Background, Text, Error, dll). Daftarkan variabel ini ke konfigurasi Tailwind/CSS (`tailwind.config.ts` atau `:root`).
2. Identifikasi **Sistem Tipografi** (Font family, ukuran font H1-H6, paragraph, line-height). Pastikan menggunakan ukuran relatif (`rem`/`em`).
3. Identifikasi **Sistem Spasi (Spacing)** (Margin, Padding) untuk menjaga konsistensi proporsi.

### TAHAP 2: Pembuatan Reusable Components (Komponen Dasar)
*Perhatian: Jangan sentuh codingan layout halaman utama sebelum komponen dasar ini selesai dibangun.*
1. Pastikan Anda berada di direktori khusus komponen (misal `/components/ui`).
2. Bangun komponen atomik dengan mengacu pada hasil `get_design_context` Figma:
   - `Button` (dengan support props varian: *primary, secondary, outline, sizes*).
   - `Input` (untuk form input lengkap dengan state *error, focus, disabled*).
   - `Card` (sebagai wrapper atau penampung dengan standar shadow, border radius, dan background color).
3. Uji setiap komponen agar sifatnya modular dan benar-benar patuh pada prinsip **DRY**.

### TAHAP 3: Layouting dengan Pendekatan Mobile-First
1. Buat struktur halaman (misal `app/page.tsx` atau direktori relevan).
2. Tentukan satu Section untuk dikerjakan (contoh: Hero Section).
3. **Koding Layout Khusus Layar Kecil (Mobile, Lebar < 768px):**
   - Susun elemen mengalir dari atas ke bawah (umumnya `flex-col` atau blok biasa).
   - Pastikan teks besar dikecilkan proporsional dan tidak terpotong.
   - Pastikan jarak (padding/margin) cukup agar mudah disentuh dengan jari (touch-friendly).
   - *Jangan memikirkan tampilan desktop pada tahap ini.*

### TAHAP 4: Penyesuaian Responsif ke Layar Gede (Tablet, Laptop, Desktop)
1. Setelah tampilan mobile berfungsi sempurna, perlahan lebarkan layar browser (atau gunakan Responsive Design Mode di DevTools).
2. Gunakan *breakpoint* Tailwind: `md:` (>= 768px), `lg:` (>= 1024px), dan `xl:` (>= 1280px).
3. Sesuaikan arah layout (misal yang tadinya kolom/`flex-col` menjadi baris/`flex-row`).
4. **Aturan Khusus Implementasi Layar Gede:**
   - Desain Anda dikirimkan dengan *base* layar gede, JANGAN gunakan hardcode `px` lebar (seperti `w-[1440px]`), ini adalah BAD PRACTICE.
   - **Gunakan Container:** Bungkus section konten Anda dengan sebuah container penahan lebar maksimal. Contoh: `<div className="max-w-7xl mx-auto w-full px-4 lg:px-8">`. Ini memastikan desain yang indah di Figma tidak akan meluber tanpa batas di monitor super lebar (ultrawide 2K/4K).
   - Sesuaikan ulang ukuran tipografi yang sebelumnya dikecilkan untuk mobile agar kembali besar dan megah sesuai desain asli Figma (`text-3xl md:text-5xl xl:text-6xl`).

### TAHAP 5: Pemasangan Aset Optimal
1. Ganti semua kotak kosong (placeholder) dengan aset yang telah diunduh dari Figma.
2. Pastikan file yang digunakan sudah melewati proses kompresi (Tahap Manajemen Aset).
3. Untuk ikon (SVG), usahakan di-load secara *inline* atau dijadikan komponen (`<IconName />`) agar warnanya bisa dimanipulasi dengan `className="text-current"`.

### TAHAP 6: Validasi 1:1, QA, dan Code Review
1. Jalankan `get_screenshot` dari Figma MCP untuk area desain yang baru saja diselesaikan.
2. Lakukan perbandingan *side-by-side* antara browser lokal Anda dan screenshot Figma:
   - Margin dan padding: Identik?
   - Ketebalan font & warna: Identik?
   - Interaksi hover/focus: Berfungsi?
3. **Pengecekan Code Smell:**
   - Adakah *hardcoded* value (misal `text-[#123456]`) yang lolos padahal ada di token warna (`text-primary`)? Segera ubah.
   - Adakah 5 blok kode yang persis sama tapi tidak dijadikan *map loop* atau tidak diekstrak menjadi komponen? Segera Refactor.
4. Jika semua sempurna, beri status "Selesai" untuk modul tersebut dan lanjutkan ke section selanjutnya.

---
*Instruksi Ekstra untuk Model AI:*
Saat Anda membaca blueprint ini untuk mengerjakan tiket tugas, bertindaklah dengan sangat teliti. Jangan mencoba menebak desain; wajib hukumnya meminta `get_design_context` dan `get_screenshot` dari plugin Figma MCP sebelum menulis satu baris CSS/Tailwind pun. Taati setiap instruksi di atas secara kaku demi kualitas grade-A.
