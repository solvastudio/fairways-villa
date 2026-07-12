# Panduan Implementasi Frontend: Portofolio Fairways Villa

**Dokumen ini adalah panduan wajib (SOP) untuk Junior Developer atau AI Agent dalam mengeksekusi konversi desain Figma menjadi kode website yang sepenuhnya fungsional dan responsif.**

**Harap baca setiap langkah dengan sangat teliti sebelum menulis satu baris kode pun.**

---

## 1. Prinsip Utama (Core Principles)
Setiap implementasi kode dalam proyek ini **wajib** mematuhi prinsip-printip berikut:
1. **Mobile-First Design**: Mulai styling untuk layar HP (mobile) terlebih dahulu sebagai basis. Gunakan *media queries* atau utility class (misal `md:`, `lg:` di Tailwind) HANYA untuk scaling up ke layar tablet dan desktop.
2. **Perhatian Ekstra pada Layar Besar (Desktop)**: Desain Figma yang diberikan berbasis layar besar. **JANGAN** asal-asalan mengimplementasikan desain desktop langsung ke mobile. Lakukan penyesuaian tata letak (stacking vertikal, pengurangan ukuran font/padding) secara logis untuk tampilan mobile, lalu transisikan menjadi desain asli saat layar membesar.
3. **DRY (Don't Repeat Yourself) & Reusable Components**: Jika sebuah elemen (seperti tombol, kartu, atau heading) muncul lebih dari satu kali, pisahkan menjadi komponen yang dapat digunakan ulang (reusable component).
4. **Clean Code & No Code Smell**: Pastikan kode mudah dibaca, rapi, variabel dinamai dengan jelas, dan bebas dari warning atau error.
5. **Mudah di-Maintain**: Gunakan sistem token (variabel warna, spasi, typography) dari proyek (design system) yang sudah ada, jangan hardcode nilai HEX atau pixel secara langsung jika tokennya sudah tersedia.

---

## 2. Aturan Integrasi Figma MCP (WAJIB DIIKUTI)
Ini adalah aturan mutlak saat mengambil desain dari Figma. Jangan pernah melompati langkah ini:

### A. Alur Kerja (Required Flow)
1. **Ambil Konteks Desain**: Jalankan fungsi `get_design_context` pertama kali untuk mengambil representasi terstruktur dari node Figma yang dituju.
2. **Penanganan Data Besar**: Jika respons dari `get_design_context` terpotong (truncated) atau terlalu besar, jalankan `get_metadata` untuk mendapatkan peta node (node map) tingkat tinggi. Setelah itu, ambil ulang HANYA node spesifik yang benar-benar dibutuhkan menggunakan `get_design_context`.
3. **Referensi Visual**: Wajib menjalankan `get_screenshot` untuk mendapatkan referensi visual murni (gambar) dari varian node yang sedang diimplementasikan.
4. **Tahan Diri**: **JANGAN** memulai implementasi atau mengunduh aset sebelum kamu mendapatkan *design context* DAN *screenshot* secara utuh.
5. **Konversi ke Standar Proyek**: Terjemahkan output dari Figma (biasanya berupa React + Tailwind) ke dalam standar konvensi, gaya, dan framework dari proyek ini. Gunakan ulang color tokens, components, dan typography yang sudah ada di repo.
6. **Validasi Akhir**: Periksa dan validasi hasil kode dengan desain Figma (screenshot) untuk memastikan kemiripan tampilan (1:1 look) dan perilakunya (behavior) sebelum menandai tugas selesai.

### B. Aturan Implementasi
* **Bukan Kode Final**: Anggap output dari Figma MCP (React + Tailwind) hanya sebagai referensi desain dan perilaku, BUKAN sebagai kode final.
* **Ganti dengan Token Proyek**: Ganti utility classes Tailwind mentah (misal `text-[#123456]`) dengan utilitas/token design system proyek yang sudah disepakati (misal `text-primary-900`).
* **Gunakan Komponen yang Ada**: Wajib menggunakan kembali komponen yang sudah ada di proyek (seperti tombol, input, tipografi, pembungkus ikon) daripada membuat ulang dari nol.
* **Konsistensi**: Gunakan sistem warna, skala tipografi, dan token jarak (spacing) proyek secara konsisten.
* **Hargai Arsitektur Proyek**: Ikuti pola *routing*, *state management*, dan pengambilan data (*data-fetching*) yang sudah ada di dalam repo.
* **Kemiripan 1:1**: Usahakan kemiripan visual 1:1 dengan desain Figma. Jika terjadi konflik antara token dan desain, utamakan penggunaan token design system dan sesuaikan ukuran atau jarak secara minimal agar sesuai dengan visual asli.
* **Validasi Ulang**: Cek hasil akhir UI di browser terhadap screenshot Figma, baik secara tampilan maupun perilaku (interaksi, hover, dll).

---

## 3. Manajemen Aset & Optimasi
Semua aset gambar harus ditangani dengan standar performa tinggi agar website tidak berat (fast load):
1. **Download**: Unduh semua gambar, ikon, dan vektor dari Figma ke dalam direktori proyek (misal: `public/assets/images`).
2. **Kompresi Tanpa Penurunan Kualitas (Lossless Compression)**: 
   - Wajib mengompres gambar menggunakan alat kompresi (seperti Squoosh, Sharp, TinyPNG, atau plugin Vite/Next.js jika tersedia).
   - Pastikan kualitas gambar secara kasat mata tidak berkurang.
3. **Format Modern**: 
   - Konversi gambar `PNG` atau `JPEG` yang berat menjadi format `WebP` atau `AVIF` untuk ukuran file yang jauh lebih kecil.
   - Gunakan format `SVG` untuk logo dan ikon agar tetap tajam di semua ukuran tanpa memperbesar beban file.

---

## 4. Referensi Penting
* **Desain Figma Utama**: [Figma Portfolio Fairways Villa](https://www.figma.com/design/I4I98jEJuKrW0kCuDXD8Tk/PORTOFOLIO-FINALLLLLLL?node-id=395-348&m=dev)
* **Konten FAQ & Pertanyaan (Booking.com)**: [Travelers are asking - Fairways Villa](https://www.booking.com/hotel/tr/fairways-villa.html?utm_source=chatgpt.com&chal_t=1783786556697&force_referer=)
  * *(Gunakan link di atas untuk menyusun konten akurat pada bagian FAQ atau Info Properti berdasarkan pertanyaan nyata dari pengunjung).*

---

## 5. Langkah-Langkah Eksekusi (Step-by-Step)
Ikuti urutan pengerjaan ini dengan disiplin:

### Langkah 1: Setup Lingkungan & Analisis
- Baca panduan ini sampai habis.
- Buka link Figma yang tertera di atas.
- Lakukan inspeksi desain secara menyeluruh, catat komponen apa saja yang berulang (contoh: *Hero, Card, FAQ accordion, Footer*).

### Langkah 2: Ekstraksi Desain & Aset (Per Komponen)
Pilih satu komponen/bagian untuk dikerjakan (contoh: Hero Section):
- Jalankan `get_design_context` untuk Hero Section.
- Jalankan `get_screenshot` untuk Hero Section.
- Download aset gambar yang ada di Hero Section. Kompres ke `.webp`/`.svg` dan masukkan ke folder aset proyek.

### Langkah 3: Eksekusi Kode Komponen (Mobile-First)
- Buat struktur HTML/JSX.
- Mulai berikan styling (`className` tailwind/css) dengan ukuran, jarak, dan tata letak untuk **layar Mobile**. (Ingat, desain Figma adalah Desktop, jadi pecah layout menyamping menjadi ke bawah / *stack* untuk mobile).
- Pastikan font terbaca dengan jelas di mobile (jangan kekecilan/kebesaran).
- Integrasikan konten FAQ nyata (dari link Booking.com) jika mengerjakan seksi FAQ.

### Langkah 4: Scaling Up (Responsive ke Layar Besar)
- Lebarkan viewport browser (atau gunakan inspector) ke ukuran tablet (`md:`) dan kemudian desktop (`lg:` / `xl:`).
- Tambahkan styling breakpoint (contoh: `md:flex-row`, `lg:gap-8`) agar tampilan secara perlahan menyesuaikan dan pada akhirnya **identik (1:1)** dengan desain asli Figma di layar besar.
- Utamakan penggunaan design token (misal warna tema primer dari `tailwind.config` / `components.json`) dibanding warna acak.

### Langkah 5: Refactoring & Clean Code (DRY)
- Periksa kembali kode yang baru ditulis. Apakah ada duplikasi?
- Jika ada struktur yang mirip dengan elemen lain, pisahkan menjadi reusable component (misal `<Button />`, `<SectionHeading />`).
- Pastikan tidak ada *code smell* (variabel tak terpakai, fungsi redundan, dll).

### Langkah 6: Validasi Akhir
- Bandingkan secara berdampingan (side-by-side) hasil render kodemu di browser dengan screenshot asli Figma.
- Periksa: Hover effect, jarak (margin/padding), proporsi gambar, ketebalan font (font-weight).
- Lanjutkan ke komponen/bagian berikutnya dengan mengulangi Langkah 2 hingga 6 sampai seluruh halaman website selesai.

---
*Dokumen ini dibuat untuk menjamin standar kualitas tertinggi dalam pengembangan UI Fairways Villa.*
