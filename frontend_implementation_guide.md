# Panduan Implementasi Frontend: Figma to Code (Villa Detail)

## 📌 Pendahuluan
Dokumen ini adalah blueprint dan panduan langkah-demi-langkah (SOP) untuk mengonversi desain Figma menjadi kode website yang **fully functional**, **responsive (Mobile-First)**, dan memiliki kualitas **Production-Ready**. Panduan ini ditujukan untuk Junior Developer atau AI Coding Agent agar dapat menghasilkan kode yang bersih, DRY (Don't Repeat Yourself), reusable, dan mudah di-maintain (No Code Smells).

**Target Halaman**: Villa Detail  
**Link Desain Figma**: [PORTOFOLIO-FINALLLLLLL (Node: 376-1191)](https://www.figma.com/design/I4I98jEJuKrW0kCuDXD8Tk/PORTOFOLIO-FINALLLLLLL?node-id=376-1191&m=dev)

---

## 📐 Prinsip Utama (Core Principles)

1. **Mobile-First Approach**: Desain Figma yang diberikan adalah untuk layar besar (Desktop). **JANGAN asal-asalan saat mengimplementasikannya di mobile.** Mulailah styling layout dari layar terkecil (mobile), lalu gunakan media queries (seperti `sm:`, `md:`, `lg:` pada Tailwind atau CSS murni) untuk melebarkan dan menyesuaikan layout ke layar besar seperti yang ada di desain.
2. **Kualitas Kode (No Code Smells)**: 
   - Terapkan prinsip **DRY**. Hindari kode atau styling yang berulang.
   - Buat komponen sekecil mungkin yang memiliki satu tanggung jawab (Single Responsibility Principle).
   - Pastikan kode terstruktur, mudah dibaca, dan mudah di-maintain.
3. **Reusable Components**: Semua elemen UI yang sering muncul (Button, Card, Input, Typography, Icon Wrappers) HARUS dibuat menjadi komponen terpisah yang dapat digunakan ulang, BUKAN disalin-tempel kodenya.
4. **Konsistensi Design System**: Gunakan token warna, tipografi, dan spacing yang sudah disepakati di dalam sistem project, BUKAN sekadar menyalin hex color/pixel secara hardcode dari Figma.

---

## 🛠️ Aturan Integrasi Figma MCP (Wajib Dipatuhi!)

Setiap perubahan yang didasarkan pada desain Figma HARUS mengikuti alur ini tanpa terkecuali:

### 1. Alur Persiapan (Preparation Flow)
1. **Ambil Konteks Desain**: Jalankan fungsi `get_design_context` untuk mengambil representasi terstruktur dari node(s) Figma yang spesifik.
2. **Penanganan Data Besar**: Jika respons dari `get_design_context` terlalu besar atau terpotong (truncated), jalankan `get_metadata` untuk mendapatkan peta node level tinggi, lalu ambil ulang HANYA node yang dibutuhkan menggunakan `get_design_context`.
3. **Ambil Referensi Visual**: Jalankan fungsi `get_screenshot` untuk mendapatkan referensi visual yang akurat dari varian node yang akan di implementasikan.
4. **Gatekeeper Implementasi**: **JANGAN** memulai implementasi kode atau mengunduh aset SEBELUM Anda memiliki hasil lengkap dari `get_design_context` dan `get_screenshot`.

### 2. Aturan Penulisan Kode (Implementation Rules)
- **Bukan Gaya Kode Akhir**: Anggap output dari Figma MCP (biasanya React + Tailwind) HANYA sebagai representasi dari desain dan interaksi, BUKAN kode final. Anda harus menerjemahkannya ke dalam konvensi, gaya, dan framework dari project ini.
- **Konversi Utility**: Ganti utility classes bawaan Tailwind dari Figma dengan token/design-system utilities milik project jika ada.
- **Gunakan Ulang Komponen**: Selalu gunakan komponen yang sudah ada di repo (seperti tombol, input, container). Jangan membuat fungsionalitas duplikat.
- **Konsistensi Desain Repo**: Selalu patuhi sistem warna, skala tipografi, dan token spacing yang ada di repo.
- **Hargai Arsitektur yang Ada**: Ikuti pola routing, state management, dan data-fetching yang sudah diadopsi di repository ini.
- **Visual Parity 1:1**: Berusahalah semaksimal mungkin untuk mencapai kemiripan visual 1:1 dengan desain Figma. Jika terjadi konflik antara output Figma dan token design-system, utamakan token design-system, lalu sesuaikan spacing/ukuran seminimal mungkin agar visual tetap serasi.

### 3. Alur Validasi (Validation Flow)
- **Cek Visual & Perilaku**: Validasi final UI yang telah dikerjakan terhadap screenshot Figma. Pastikan tampilan (look) dan interaksi (behavior) sudah 1:1 sebelum menandai tugas selesai.

---

## 🖼️ Manajemen Aset & Optimasi Gambar

Performa website adalah prioritas. Ikuti aturan berikut untuk semua aset media:

1. **Unduh Tepat Sasaran**: Unduh HANYA aset media yang diperlukan untuk halaman ini ke dalam direktori statis project.
2. **Format Gambar Modern**: Konversikan gambar standar ke format modern yang lebih ringan (seperti **WebP** atau **AVIF**). Gunakan **SVG** untuk logo dan ikon berbasis vektor.
3. **Kompresi Gambar Maksimal (Lossless/High Quality)**: Implementasikan proses kompresi untuk setiap gambar tanpa mengurangi kualitas visual secara kasat mata. Website tidak boleh berat/lambat saat load gambar.
4. **Responsive & Lazy Loading**: 
   - Gunakan komponen image yang sudah dioptimasi (seperti `next/image` di Next.js) atau terapkan atribut `srcset` agar browser hanya memuat ukuran gambar yang sesuai dengan resolusi device.
   - Terapkan `loading="lazy"` pada gambar yang posisinya berada di luar layar awal (below the fold).

---

## 📝 Langkah-Langkah Eksekusi (Step-by-Step Action Plan)

### Fase 1: Setup & Analisis (Per Komponen/Seksi)
1. Buka referensi desain untuk halaman **Villa Detail**.
2. Jalankan `get_design_context` pada node yang menaungi seksi yang akan dikerjakan.
3. Jalankan `get_screenshot` sebagai patokan visual.
4. Lakukan dekonstruksi desain: Petakan komponen mana yang merupakan *Reusable Component* (sudah ada atau perlu dibuat) dan mana yang hanya spesifik untuk halaman ini.
5. **Perencanaan Mobile-First**: Karena desainnya spesifik desktop, analisis bagaimana bentuk seksi ini di layar handphone. Biasanya, layout grid horizontal akan berubah menjadi flex-col/tumpukan vertikal dengan lebar 100%.

### Fase 2: Pemrosesan Aset
1. Identifikasi dan unduh semua aset gambar/ikon dari desain.
2. Lakukan kompresi (via script/tools) dan ubah ke format WebP/AVIF.
3. Tempatkan di direktori proyek yang benar sesuai struktur folder.

### Fase 3: Pembuatan Komponen Dasar (Foundation)
1. Jika ada komponen UI dasar yang baru (seperti Card khusus, badge harga, galeri kecil), buatlah di folder komponen (`components/UI` atau sejenisnya).
2. Susun HTML/JSX secara semantik.
3. Terapkan styling dasar menggunakan warna dan tipografi global project.

### Fase 4: Styling Tahap 1 - Mobile Layout (Wajib Di Awal!)
1. Buka file halaman utama (`VillaDetail`).
2. Masukkan komponen-komponen yang telah disiapkan.
3. Lakukan styling HANYA untuk ukuran mobile (ukuran layar terkecil, tanpa prefix breakpoint seperti `md:` atau `lg:`).
4. Pastikan font terbaca jelas di layar kecil, padding cukup untuk tap area, dan tidak ada overflow horizontal.

### Fase 5: Styling Tahap 2 - Penyesuaian Desktop (Responsive Adaptation)
1. Tambahkan breakpoint class (contoh Tailwind: `md:`, `lg:`, `xl:`) pada elemen pembungkus (container/grid/flex).
2. Sesuaikan layout dari tumpukan vertikal (mobile) menjadi tata letak yang lebar sesuai screenshot desain dari Figma.
3. Sesuaikan ukuran font, gap, dan padding untuk menyesuaikan proporsi layar besar.

### Fase 6: Validasi 1:1 dan Code Review Internal
1. Jalankan server lokal (misalnya, `npm run dev`).
2. Letakkan jendela browser secara bersampingan (side-by-side) dengan hasil `get_screenshot` dari Figma.
3. Lakukan pengujian di viewport Mobile, Tablet, dan Desktop. Pastikan tidak ada "loncatan" layout yang aneh.
4. Periksa kembali kode: Apakah ada styling inline yang buruk? Apakah ada pengulangan yang bisa dibuat menjadi class/komponen? (Bersihkan code smell sebelum commit).
