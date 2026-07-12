# Panduan Lengkap Implementasi Desain Figma ke Website Responsif (Mobile-First)

**Tujuan:** Mengonversi desain Figma "VILLA detail HERO" (berbasis desktop) menjadi website fungsional dan responsif menggunakan pendekatan *Mobile-First*. Kode harus mengimplementasikan *best practices*, prinsip DRY (Don't Repeat Yourself), komponen yang *reusable*, mudah di-*maintain*, dan tanpa *code smell*.

**Link Desain:** [Figma - Portofolio Final](https://www.figma.com/design/I4I98jEJuKrW0kCuDXD8Tk/PORTOFOLIO-FINALLLLLLL?node-id=376-1066&m=dev) (Node ID: `376:1066`)

---

## 🚨 ATURAN WAJIB: Figma MCP Integration Rules

Aturan berikut mendefinisikan cara menerjemahkan input Figma menjadi kode untuk proyek ini dan **WAJIB** diikuti pada setiap perubahan yang didorong oleh Figma.

### Alur Wajib (Tidak Boleh Dilewati)
1. Jalankan `get_design_context` pertama kali untuk mengambil representasi terstruktur dari node yang spesifik (dalam hal ini `376:1066`).
2. Jika respons terlalu besar atau terpotong, jalankan `get_metadata` untuk mendapatkan peta node tingkat tinggi, kemudian lakukan fetch ulang hanya untuk node yang dibutuhkan dengan `get_design_context`.
3. Jalankan `get_screenshot` sebagai referensi visual dari varian node yang sedang diimplementasikan.
4. **HANYA SETELAH** Anda memiliki output dari `get_design_context` dan `get_screenshot`, Anda boleh mengunduh aset apa pun yang diperlukan dan memulai implementasi.
5. Terjemahkan output (biasanya React + Tailwind) ke dalam konvensi, gaya (styles), dan framework proyek ini. Gunakan kembali token warna, komponen, dan tipografi proyek sedapat mungkin.
6. Validasi UI yang dihasilkan dengan desain Figma untuk memastikan kesamaan 1:1 (tampilan dan perilaku) sebelum menandai tugas selesai.

### Aturan Implementasi
- Anggap output Figma MCP (React + Tailwind) hanya sebagai **representasi desain dan perilaku**, bukan gaya kode final.
- Ganti *utility classes* Tailwind dari Figma dengan utilitas/token desain sistem yang disukai dan sudah ada di proyek.
- Gunakan kembali komponen yang ada (contoh: tombol, input, tipografi, pembungkus ikon) daripada menduplikasi fungsionalitas.
- Gunakan sistem warna, skala tipografi, dan token spasi proyek secara konsisten.
- Hormati pola *routing*, *state management*, dan *data-fetch* yang sudah diadopsi di repositori.
- Berusahalah mencapai **kesamaan visual 1:1** dengan desain Figma. Jika terjadi konflik, utamakan token sistem desain proyek dan sesuaikan spasi atau ukuran seminimal mungkin agar cocok dengan visual.
- Validasi UI akhir terhadap screenshot Figma baik untuk tampilan maupun perilaku.

---

## 🛠️ LANGKAH-LANGKAH IMPLEMENTASI DETAIL

Langkah-langkah ini dirancang agar sangat detail, jelas, dan dapat dieksekusi dengan mudah oleh *Junior Developer* atau model AI.

### Langkah 1: Ekstraksi Desain & Aset
1. **Analisis Node:** Fokus pada Node `376:1066` ("VILLA detail HERO").
2. **Jalankan Command MCP:**
   - Gunakan alat MCP untuk memanggil `get_design_context` pada node tersebut untuk mendapatkan struktur.
   - Panggil `get_screenshot` untuk melihat pratinjau visual asli dari Figma.
3. **Unduh & Kompresi Aset Gambar:**
   - Unduh semua aset grafis (seperti Logo Vector, ikon Bahasa/Dropdown, gambar latar belakang/hero).
   - **WAJIB:** Lakukan proses kompresi pada aset gambar tanpa mengurangi kualitas visual (gunakan format modern seperti `.webp` atau `.avif` dengan fallback `.png`/`.jpg`). Ini krusial agar *load* website tidak berat.
   - Simpan aset di folder konfigurasi publik proyek (misal: `/public/assets`).

### Langkah 2: Analisis Pendekatan "Mobile-First"
Desain yang diberikan adalah layar besar (Desktop, lebar 1728px). Anda **DILARANG KERAS** langsung mengimplementasikan tata letak desktop ke layar kecil dan membiarkan desain terlihat asal-asalan. Gunakan pendekatan ini:
1. **Tata Letak Mobile (Layar < 768px - DEFAULT STYLE):**
   - Bangun tata letak secara vertikal (stacked). Elemen berdampingan (seperti navigasi `gallery`, `amenities`, `location` dan tombol `RESERVE`) harus dibungkus ke dalam *Hamburger Menu* atau disusun ulang secara vertikal agar rapi di layar kecil.
   - Sesuaikan ukuran font raksasa "villa detail" agar tidak hancur atau melampaui lebar layar (hindari *horizontal scroll*).
   - Kurangi padding/margin bawaan desktop (misal dari `57px` menjadi `16px` atau `20px`).
2. **Tata Letak Tablet (768px - 1024px - `md:` prefix):**
   - Mulai gelar elemen navigasi dan sesuaikan skala font secara proporsional.
3. **Tata Letak Desktop (Layar > 1024px - `lg:` / `xl:` prefix):**
   - Terapkan desain asli secara 1:1 sesuai spesifikasi ukuran dan tata letak absolut Figma.

### Langkah 3: Ekstraksi Token Sistem Desain
Berdasarkan output dari kode Figma:
- **Tipografi:** Identifikasi *font family*, *font size*, *font weight* (terutama untuk teks menu, logo, dan hero title). Daftarkan token ini dalam konfigurasi *styling* proyek (misal `tailwind.config.js` atau file `globals.css`).
- **Warna:** Identifikasi palet warna untuk teks, *background* elemen, dan tombol. Gunakan variabel proyek, bukan hardcode kode HEX di setiap baris.
- **Spacing:** Petakan jarak antar elemen (padding pembungkus utama, gap antar navigasi) ke dalam skala spacing standar framework (Tailwind spacing).

### Langkah 4: Pembuatan Komponen Reusable (Prinsip DRY & Maintainable)
Pecah node VILLA detail HERO (`376:1066`) ke dalam beberapa komponen modular yang spesifik. Jangan menumpuk seluruh *mark-up* di dalam satu komponen besar.
1. **`Navbar` (Header) Component:**
   - **`NavLinks`:** Komponen abstrak untuk me-*render* item navigasi secara dinamis (menggunakan *array map*).
   - **`BrandLogo`:** Komponen khusus menampilkan vektor logo "fairways villa".
   - **`LanguageSelector`:** Komponen dropdown untuk pemilihan bahasa.
   - **`Button`:** Gunakan atau buat komponen tombol *reusable* secara global, pakai sebagai tombol "RESERVE".
2. **`HeroTitle` Component:**
   - Komponen tipografi khusus untuk judul utama ("villa detail"), mendukung penyesuaian ukuran teks dinamis berdasarkan *viewport*.
3. **`HeroSection` Component (Main Wrapper):**
   - Berfungsi sebagai pembungkus untuk mengatur posisi `Navbar` dan `HeroTitle`, beserta *background* atau latar gambar (jika ada).

### Langkah 5: Kualitas Kode (No Code Smell)
- **Hindari *Bloated Utilities*:** Jangan *copy-paste* langsung kelas utilitas Tailwind sepanjang 10 baris. Bersihkan dan buang properti absolut Figma yang tidak masuk akal untuk sistem *layouting web* (seperti `absolute top-[12px] left-[45px]`). Gunakan *Flexbox* (`flex`) atau *Grid* (`grid`) untuk tata letak.
- **Semantik HTML yang Tepat:** Gunakan tag HTML5 yang bermakna (`<header>`, `<nav>`, `<main>`, `<section>`, `<ul>`, `<li>`, `<button>`). Jangan membuat seluruh elemen menggunakan tag `<div>`.
- **Aksesibilitas Dasar:** Selalu sediakan properti `alt` yang deskriptif pada elemen `<img />` atau ikon vektor, serta `aria-label` pada tombol dan link navigasi.

### Langkah 6: Validasi Akhir (Quality Assurance)
Sebelum menandai pekerjaan selesai, lakukan pengecekan berikut:
1. **Visual Parity Check (Desktop):** Bandingkan UI yang di-*render* secara langsung bersebelahan dengan output `get_screenshot`. Pastikan 1:1.
2. **Responsive Check (Mobile & Tablet):** Gunakan *DevTools* browser. Perkecil layar ke 320px dan pastikan komponen beradaptasi tanpa *clipping* atau teks tumpang tindih.
3. **Asset & Performance Check:** Buka tab *Network*, pastikan gambar yang di-load sudah terkompresi (format modern) dan berukuran sangat kecil (idealnya di bawah 100KB - 200KB per gambar hero).
4. **Clean Code Check:** Pastikan file bersih, terstruktur, tidak ada pengulangan *style* (DRY), dan tidak ada *console errors/warnings*.
