# Panduan Implementasi Hero Section - Fairways Villa
**Target Implementator:** Junior Frontend Developer / AI Agent
**Tech Stack:** React 19, Vite, TypeScript, Tailwind CSS v4, TanStack Router, Shadcn UI

Dokumen ini berisi panduan *step-by-step* yang **sangat detail dan wajib diikuti** untuk mengonversi desain Figma (Node: `394:110`) menjadi website yang fungsional, responsif, dan *maintainable*. Desain dari Figma berbasis desktop (layar besar), sehingga Anda wajib menggunakan nalar desain **Mobile-First** saat menulis kode Tailwind.

---

## 🛑 Aturan Dasar (WAJIB DIBACA)
1. **DRY (Don't Repeat Yourself):** Jangan ada kode yang berulang. Ekstraksi UI menjadi komponen terpisah.
2. **Mobile-First:** Selalu tulis class utility untuk mobile terlebih dahulu (default class), lalu tambahkan *breakpoint* (`md:`, `lg:`, `xl:`) untuk layar yang lebih besar. Jangan pernah *hardcode* nilai *fixed width* besar dari figma secara mentah (misal: `w-[1622px]`).
3. **No Code Smell:** Kode harus bersih, terstruktur, variabel jelas, dan fungsi dipisah jika UI terlalu kompleks.
4. **Visual Parity (1:1):** Hasil akhir pada layar desktop harus identik dengan referensi visual Figma, namun menggunakan standar *spacing/sizing* CSS modern yang fleksibel.

---

## 🛠️ Fase 1: Figma MCP Workflow (Ekstraksi Konteks Desain)

Langkah ini wajib dilakukan menggunakan tools terotomasi.

1. **Jalankan API/Tool `get_design_context`**: 
   - Gunakan URL: `https://www.figma.com/design/I4I98jEJuKrW0kCuDXD8Tk/PORTOFOLIO-FINALLLLLLL`
   - Gunakan Node ID: `394:110` (Hero Section).
   - Analisis struktur keluaran React + Tailwind dari Figma.
   - *Catatan:* Jika respons sangat besar atau terpotong, jalankan `get_metadata` terlebih dahulu untuk melihat struktur keseluruhan, kemudian tembak hanya node yang difokuskan.
2. **Jalankan API/Tool `get_screenshot`**: 
   - Gunakan Node ID: `394:110`.
   - Pastikan screenshot berhasil di-generate sebagai acuan validasi Visual Parity di akhir pengerjaan.
3. **Manajemen & Kompresi Aset**:
   - Ambil URL gambar yang didapatkan dari output `get_design_context` (contohnya gambar background villa, logo vector, dropdown arrow vector).
   - **WAJIB:** Unduh gambar background dan lakukan proses **kompresi maksimal tanpa mengurangi kualitas** (Gunakan format `.webp` atau `.avif`). Gambar besar tidak boleh memperlambat *load* website.
   - Untuk aset berupa Vector/Icon, unduh sebagai format `.svg`. Disarankan mengonversinya menjadi komponen React (React SVG) agar warna mudah disesuaikan menggunakan utility color Tailwind.
   - Simpan semua aset terstruktur di dalam folder `/public` atau `/src/assets/`.

---

## 🎨 Fase 2: Ekstraksi Desain & Setup Token Sistem (Tailwind v4)

Berdasarkan output dari referensi Figma, integrasikan *design tokens* berikut ke dalam file tema CSS (misal `index.css` atau setup Tailwind bawaan project):

### 1. Typography (Sistem Font)
- **Logo Utama:** `Cormorant Garamond` (Medium, tracking besar) & `Montserrat` (Medium)
- **Menu Navigasi:** `Haas Grot Disp Trial` (Atau cari alternatif sans-serif yang mirip dan tersedia komersil jika font trial tak dapat digunakan).
- **Tombol CTA (RESERVE):** `Plus Jakarta Sans` (SemiBold)

*Implementasikan font ini dalam utility Tailwind, contoh: `font-cormorant`, `font-montserrat`, dll.*

### 2. Color Palette (Warna Utama)
- **Primary / CTA Button:** `#c97a4a`
- **Text Dark:** `#03071e`
- **Background Light:** `#fdfffc`

---

## 🧩 Fase 3: Pembuatan Reusable Components

Pisahkan setiap elemen logika ke dalam komponen (di folder `/src/components/`):

### 1. Komponen `Button`
Buat komponen Button reusable yang bisa menerima berbagai props (variant, size).
- **Untuk CTA Reserve:** Gunakan background `#c97a4a`, text color `#fdfffc`, uppercase teks, letter-spacing besar (`tracking-[1.6px]`), dan padding proporsional (`px-10 py-5`).

### 2. Komponen `Logo`
- Pisahkan kumpulan elemen teks "fairways" (font Cormorant Garamond), "villa" (font Montserrat), dan ornamen bintang (vector SVG) ke dalam satu file `Logo.tsx`.
- Susun menggunakan flexbox column (`flex flex-col items-center`) sesuai desain asli.
- Komponen ini harus responsif (skalabilitas ukuran pada layar mobile).

### 3. Komponen `Header` (Navbar)
- Header mencakup: Menu Navigasi Kiri (Gallery, Amenities, Location), Komponen Logo di Tengah, dan Language Switcher ("EN") + Komponen Button di Kanan.
- **Desktop Layout:** Semua sejajar mendatar menggunakan `flex justify-between items-center`.
- **Mobile Layout:** Sembunyikan navigasi kiri dan kanan, letakkan ke dalam sebuah *Hamburger Menu* atau *Drawer*. Hanya tampilkan Logo di tengah dan ikon Hamburger di sudut.

---

## 💻 Fase 4: Struktur & Implementasi Hero Section (Mobile-First)

Implementasikan section Hero di file utama (misal `Hero.tsx`).
⚠️ **PERINGATAN KRITIS:** Kode *raw* dari figma menggunakan absolute positioning secara mentah (`left-[calc(4.17%-19px)]`, `w-[1622px]`). **JANGAN CO-PAS KODE TERSEBUT MENTAH-MENTAH!**

Terapkan konversi Mobile-First yang benar:

1. **Background & Wrapper Container**:
   - Buat section pembungkus menggunakan `<section className="relative w-full min-h-screen">`.
   - Gunakan gambar background yang sudah dikompresi: `<img src="..." className="absolute inset-0 w-full h-full object-cover -z-10" alt="Fairways Villa Background" />`.

2. **Posisi & Sistem Layout Header**:
   - Render `Header` di atas Hero: `<header className="absolute top-0 w-full z-10 px-4 py-4 md:px-8 lg:px-12 lg:pt-[47px]">`.
   - Gunakan max-width standar alih-alih fix 1622px, misalnya `max-w-7xl mx-auto flex items-center justify-between` agar responsif secara alami di layar ultra-wide.

3. **Glow Effect Area**:
   - Di Figma terdapat sebuah background glow berukuran besar (`bg-[rgba(242,200,107,0.16)] blur-[50px]`).
   - Jadikan div terpisah: `<div className="absolute top-[30%] -left-10 w-[80%] md:w-[1868px] h-[324px] bg-[#f2c86b29] blur-[50px] pointer-events-none -z-1" aria-hidden="true" />`.

4. **Ilustrasi Logika Penulisan Kelas**:
   ```tsx
   // ❌ SANGAT BURUK (Copas Buta dari Figma):
   <div className="absolute left-[calc(4.17%-19px)] top-[47px] w-[1622px] flex justify-between">
   
   // ✅ SANGAT BAIK (Pendekatan Clean & Mobile-First):
   <header className="absolute top-0 left-0 w-full z-20 px-6 py-5 lg:py-12">
      <div className="max-w-[1600px] mx-auto flex items-center justify-between">
         {/* Hamburger untuk mobile ditaruh di sini */}
         <NavLinks className="hidden lg:flex" /> 
         <Logo />
         <LangAndCTA className="hidden lg:flex" />
      </div>
   </header>
   ```

---

## 🔍 Fase 5: Pengujian & Validasi Akhir

Sebelum melakukan komit atau menyerahkan tugas, Implementator wajib melakukan proses berikut:

1. **Validasi Desain (Visual Parity)**:
   - Bandingkan website yang berjalan di browser lokal dengan gambar screenshot dari `get_screenshot`.
   - Pastikan *tracking* (spasi antar huruf), *font-family*, *uppercase*, dan padding proporsional terlihat sama seperti referensi desktop.
2. **Validasi Responsivitas (Mobile Check)**:
   - Tarik ukuran jendela browser perlahan ke ukuran 375px (Mobile). Pastikan struktur tidak hancur, teks menyesuaikan (ukuran mengecil), background tidak gepeng, dan navigasi pindah ke bentuk yang sesuai (contoh: menu tersembunyi).
3. **Validasi Kinerja (Performa Gambar)**:
   - Periksa di Network tab browser (DevTools), ukuran foto background yang di-load maksimal berada di kisaran rasional (~100-300KB).
4. **Validasi Kode**:
   - Memastikan tidak ada class Tailwind duplikat yang panjang dan tidak diperlukan (ekstrak menjadi custom class `@utility` jika berulang kali).
