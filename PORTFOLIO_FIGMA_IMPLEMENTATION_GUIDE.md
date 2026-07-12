# Portfolio Figma Implementation Guide & Standard Operating Procedure (SOP)

**Dokumen ini adalah panduan komprehensif (SOP) untuk mengimplementasikan design Figma menjadi website yang *fully functional*, responsif, dan siap untuk *production*. Panduan ini dirancang secara sangat detail dan langkah-demi-langkah agar dapat dengan mudah diikuti oleh Junior Developer maupun AI Coding Agent.**

**Link Design Figma:** [Portofolio Final](https://www.figma.com/design/I4I98jEJuKrW0kCuDXD8Tk/PORTOFOLIO-FINALLLLLLL?node-id=395-391&m=dev)

---

## 1. Prinsip Utama: Mobile-First Design & Desktop Scaling
Meskipun design Figma yang diberikan berbasis layar besar (Desktop), **kita WAJIB menggunakan pendekatan Mobile-First.**
1. **Jangan asal-asalan melakukan styling langsung dengan ukuran desktop.**
2. **Mobile First:** Mulailah styling dengan ukuran layar *mobile* (contoh: di bawah `md` pada Tailwind, atau di bawah 768px). Gunakan logika struktur grid dan flexbox yang menumpuk (stacking) secara vertikal terlebih dahulu.
3. **Scaling up ke Tablet & Desktop:** Gunakan media query (contoh: `md:`, `lg:`, `xl:`) secara progresif untuk merubah *layout* ke desain desktop yang ada di Figma.
4. **Responsivitas Mulus:** Pastikan perpindahan ukuran font, margin, dan padding bersifat cair (fluid) atau menggunakan *step* yang jelas berdasarkan *design system* agar tidak terlihat rusak pada ukuran layar menengah.

---

## 2. Aturan Integrasi Figma MCP (Figma MCP Integration Rules)
Setiap perubahan atau pembuatan komponen baru yang berasal dari Figma **WAJIB** mengikuti langkah-langkah *Figma MCP* di bawah ini tanpa terkecuali:

### A. Alur Wajib (Required Flow - Jangan Dilewati)
1. **Jalankan `get_design_context`**: Lakukan ini pertama kali untuk mengambil representasi terstruktur dari *node* Figma secara spesifik.
2. **Penanganan Respon Besar**: Jika respon dari API terlalu besar atau terpotong (*truncated*), jalankan `get_metadata` untuk melihat struktur *high-level node map*, kemudian ulangi menjalankan `get_design_context` hanya untuk *node* yang diperlukan.
3. **Jalankan `get_screenshot`**: Dapatkan referensi visual dari varian *node* yang akan diimplementasi.
4. **Validasi & Download Asset**: Hanya setelah Anda mendapatkan *design context* dan *screenshot*, Anda boleh mengunduh (download) *assets* yang diperlukan lalu memulai implementasi.
5. **Translasi ke Standar Proyek**: Hasil dari MCP (biasanya React + Tailwind mentah) harus diterjemahkan ke dalam standar *framework*, konvensi, dan sistem styling proyek ini. Gunakan kembali (reuse) *color tokens*, *components*, dan tipografi proyek yang sudah ada.
6. **Validasi Akhir**: Pastikan hasil akhir di *browser* memiliki kesamaan tampilan (look) dan perilaku (behavior) 1:1 dengan Figma sebelum dianggap selesai.

### B. Aturan Implementasi Kode
- **Anggap output Figma MCP (React+Tailwind) sebagai pedoman**, BUKAN sebagai kode final. Kode akhir harus rapi, terstruktur, dan mengikuti pedoman *clean code*.
- **Gantikan Tailwind utilities generik** dengan *utilities/tokens* dari *design system* proyek saat memungkinkan (contoh: gunakan variabel warna utama dibanding *hardcoded hex color* pada class).
- **Gunakan Komponen yang Ada (*Reuse*)**: Jangan menduplikasi fungsi. Gunakan *button*, *input*, *typography wrapper*, dan *icon wrappers* yang sudah tersedia di repositori.
- **Konsistensi Desain**: Selalu gunakan skala tipografi, sistem warna, dan token jarak (*spacing*) yang konsisten.
- **Hormati Arsitektur Proyek**: Ikuti pola *routing*, *state management*, dan *data fetching* yang sudah diadopsi oleh repositori (jangan membuat pola baru secara sewenang-wenang).
- **Paritas Visual 1:1**: Usahakan tingkat kemiripan tertinggi dengan visual Figma. Jika ada konflik, prioritaskan *design-system tokens* lalu sesuaikan *spacing* minimal agar sesuai dengan visual.

---

## 3. Standar Kualitas Kode (Clean Code, DRY, No Smell Code)
- **DRY (Don't Repeat Yourself)**: Ekstrak logika berulang menjadi *custom hooks* atau *helper functions*. Ekstrak UI yang berulang menjadi komponen terpisah.
- **Single Responsibility Principle**: Pastikan satu komponen hanya melakukan satu hal. Pisahkan komponen UI (*presentational*) dengan komponen logika (*container/smart*).
- **Mudah di Maintain**: Berikan komentar pada logika kompleks (jika ada). Susun *props interface* yang jelas pada setiap komponen (menggunakan TypeScript).
- **No Smell Code**: Hindari struktur if/else yang terlalu bersarang (nested), *prop drilling* yang berlebihan, dan ukuran fungsi/komponen yang terlalu panjang (>200 baris, pecah jadi komponen lebih kecil).

---

## 4. Manajemen Asset & Image Compression
Website tidak boleh terasa berat saat dimuat (load). Oleh karena itu:
1. **Download Semua Asset**: Simpan *images* dan *icons* penting ke dalam folder `/public` atau `src/assets`.
2. **Kompresi Tanpa Kurangi Kualitas**: Lakukan proses kompresi untuk seluruh *image* (misal: convert ke `.webp`, atau optimasi PNG/JPEG) menggunakan tools kompresi yang tersedia, dengan menjaga kualitas tetap prima.
3. **Gunakan Atribut Loading**: Implementasikan `loading="lazy"` pada gambar yang berada di luar viewport (below the fold) dan pertimbangkan untuk menggunakan komponen gambar teroptimasi sesuai *framework* (seperti next/image jika di Next.js, atau teknik lazy loading di React/Vite).

---

## 5. Langkah-Langkah Eksekusi (Step-by-Step Implementation Guide)
Ikuti panduan langkah demi langkah ini secara berurutan saat mengembangkan fitur atau halaman baru berdasarkan Figma:

### Tahap 1: Setup & Persiapan Data (Via MCP)
1. Buka link Figma yang diberikan dan identifikasi *node-id* komponen/halaman yang akan dibuat.
2. Gunakan *tools* `get_design_context` untuk *node* tersebut. Jika error karena batas ukuran, gunakan `get_metadata` terlebih dahulu.
3. Gunakan *tools* `get_screenshot` untuk melihat bagaimana elemen tersebut harus terlihat.
4. Download SVG icons atau Image dari Figma. Lakukan optimasi gambar (.webp) dan masukkan ke dalam direktori *assets* lokal proyek.

### Tahap 2: Perancangan Komponen & Struktur Mobile-First
1. Pelajari komponen berdasarkan referensi screenshot dan kode dari `get_design_context`.
2. Identifikasi bagian mana yang bisa dipecah menjadi komponen *reusable* (contoh: *Card*, *Section Title*, *Button Group*).
3. Buat file `.tsx` baru untuk halaman atau komponen tersebut.
4. **Tulis struktur HTML (JSX) menggunakan pola *Mobile-First*.**
   - Atur elemen menggunakan `<div className="flex flex-col gap-4">` (Stacking vertikal) pada mobile.
   - Pikirkan: "Bagaimana urutan elemen ini saat dilihat di layar Handphone yang kecil?"

### Tahap 3: Styling Berdasarkan Design System & Desktop Scaling
1. Terapkan kelas-kelas standar dari *design system* (font, color, padding).
2. Tambahkan kelas-kelas responsif untuk layar besar.
   - Contoh: Pada mobile kita menumpuk secara vertikal (`flex-col`), namun pada layar *desktop* kita ubah ke horizontal (`md:flex-row`).
   - Terapkan lebar maksimum atau *grid* jika desain desktop menuntut pembagian kolom (`grid-cols-1 md:grid-cols-2 lg:grid-cols-3`).
3. Sesuaikan ukuran text dengan token typography (contoh: `text-base md:text-xl lg:text-3xl`).

### Tahap 4: Integrasi Fungsionalitas & State
1. Jika desain membutuhkan interaksi fungsional (*dropdown*, *slider/carousel*, *tabs*, validasi *form*), implementasikan logika React/JavaScript.
2. Gunakan *state* dan *hooks* yang sesuai. Hindari kompleksitas berlebih.
3. Perhatikan performa (jangan sampai re-render tidak perlu).

### Tahap 5: Review dan QA Akhir (Validasi 1:1)
1. Jalankan server lokal (`npm run dev`) dan cek tampilan secara riil di browser.
2. Buka DevTools (F12) dan aktifkan *Mobile Device Toolbar*. Uji responsivitas dari lebar layar 320px (Mobile Kecil) hingga 1920px (Layar Lebar Desktop).
3. Bandingkan tampilan Desktop di browser lokal secara teliti (side-by-side) dengan *screenshot* Figma.
4. Periksa apakah ada animasi mikro atau *hover states* yang kurang; tambahkan sesuai standar kualitas "Premium & Rich Aesthetics".
5. Pastikan semua gambar sudah terkompresi dan website termuat dengan cepat.

---

**Catatan Eksekutor (Kepada AI / Junior Dev):**
Laksanakan semua panduan ini dengan disiplin ketat. Kegagalan dalam menerapkan *mobile-first*, kegagalan mengikuti alur MCP Figma, atau memberikan kode dengan struktur yang berantakan (*smell code*) tidak dapat diterima. Keutamaan proyek ini ada pada arsitektur kode yang bersih (maintainable) dan kualitas visual yang memukau.
