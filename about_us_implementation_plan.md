# Panduan Implementasi About Us Section - Fairways Villa

**Target Implementator:** Junior Frontend Developer / AI Agent
**Tech Stack:** React 19, Vite, TypeScript, Tailwind CSS v4, TanStack Router, Shadcn UI

Dokumen ini berisi panduan *step-by-step* yang **sangat detail dan wajib diikuti** untuk mengonversi desain Figma (Node: `394:133` - About Us) menjadi website yang fungsional, responsif, dan *maintainable*. Desain dari Figma berbasis desktop (layar besar), sehingga Anda wajib menggunakan pendekatan **Mobile-First** saat menulis kode Tailwind.

---

## 🛑 Aturan Dasar (WAJIB DIBACA)
1. **DRY (Don't Repeat Yourself):** Jangan ada kode yang berulang. Ekstraksi UI menjadi komponen terpisah jika diperlukan.
2. **Mobile-First:** Selalu tulis class utility untuk mobile terlebih dahulu (default class), lalu tambahkan *breakpoint* (`md:`, `lg:`, `xl:`) untuk layar yang lebih besar. Jangan pernah *hardcode* padding raksasa (`py-[380px]`) atau *fixed width* besar dari figma secara mentah.
3. **No Code Smell:** Kode harus bersih, terstruktur, variabel jelas.
4. **Visual Parity (1:1):** Hasil akhir pada layar desktop harus identik dengan referensi visual Figma, namun menggunakan standar *spacing/sizing* CSS modern yang fleksibel.

---

## 🛠️ Fase 1: Setup Aset & Persiapan

Semua aset SVG yang dibutuhkan untuk *section* ini telah diunduh dan dikompresi (menggunakan SVGO) ke dalam folder `/public/assets/about-us/`.
Aset yang tersedia:
- `/assets/about-us/ellipse.svg` (Dot warna oranye/coklat di sebelah teks "ABOUT US")
- `/assets/about-us/line.svg` (Garis horizontal pemisah di bawah paragraf)
- `/assets/about-us/location-pin.svg` (Ikon pin lokasi)

Pastikan untuk memanggil aset-aset ini menggunakan tag `<img>` dengan *path* relatif ke `/public`, misalnya `<img src="/assets/about-us/ellipse.svg" alt="" />`.

---

## 🎨 Fase 2: Ekstraksi Desain & Setup Token Sistem (Tailwind)

Berdasarkan referensi desain, ini adalah nilai warna dan font yang digunakan. Pastikan token ini sudah ada di file `index.css` atau konfigurasi Tailwind bawaan project.

### 1. Typography (Sistem Font)
- **Primary Serif:** `Cormorant Garamond` (Digunakan untuk teks miring/italic besar seperti kata "Your", "An", "of").
- **Primary Sans-Serif:** `Plus Jakarta Sans` (Digunakan untuk sebagian besar teks heading dan paragraf deskripsi).

### 2. Color Palette (Warna Utama)
- **Accent Color:** `#b87355` (Warna coklat kemerahan untuk label "ABOUT US").
- **Text Dark:** `#03071e` (Warna teks dominan untuk heading dan paragraf).
- **Background Light:** `#fdfffc` (Warna background section utama).

---

## 💻 Fase 3: Struktur & Implementasi Code (Mobile-First)

Buat file komponen baru untuk bagian ini, misalnya `src/components/AboutUs.tsx` atau tuliskan di file *page* bersangkutan. 
⚠️ **PERINGATAN KRITIS:** Kode *raw* dari figma menggunakan layout kaku (`px-[126px] py-[380px]` dan `w-[889px]`). **JANGAN CO-PAS KODE TERSEBUT MENTAH-MENTAH!** 

Ikuti panduan struktur komponen ini secara berurutan:

### 1. Wrapper Section Utama
Buat `<section>` terluar dengan penyesuaian padding mobile-first.
```tsx
<section className="bg-[#fdfffc] w-full px-6 py-20 lg:px-24 lg:py-48 flex justify-center">
  <div className="max-w-[1440px] w-full flex flex-col lg:flex-row gap-12 lg:gap-36 items-start">
    {/* Kolom Kiri dan Kolom Kanan akan berada di sini */}
  </div>
</section>
```
*Penjelasan: Kita membatasi lebar maksimal konten menjadi 1440px agar terpusat di layar ultrawide, dan mengubah arah layout dari kolom (mobile) menjadi baris (desktop `lg:flex-row`).*

### 2. Kolom Kiri (Label & Heading)
Kolom ini berisi label kecil dan teks besar yang tipografinya bercampur-campur.
```tsx
{/* Kolom Kiri */}
<div className="flex flex-col items-start w-full lg:w-3/5">
  {/* Label "ABOUT US" */}
  <div className="flex items-center gap-2.5 mb-6 lg:mb-10">
    <img src="/assets/about-us/ellipse.svg" className="w-2.5 h-2.5" alt="" aria-hidden="true" />
    <span className="font-['Plus_Jakarta_Sans'] font-medium text-[#b87355] text-sm lg:text-base tracking-[0.8px] uppercase">
      About Us
    </span>
  </div>

  {/* Typography Heading Campuran */}
  <h2 className="text-[#03071e] leading-[1.2] lg:leading-[1.1]">
    {/* Baris 1 */}
    <span className="font-['Plus_Jakarta_Sans'] font-medium text-4xl lg:text-[64px]">Finding </span>
    <span className="font-['Cormorant_Garamond'] font-medium italic lowercase text-5xl lg:text-[96px]">your </span>
    <span className="font-['Plus_Jakarta_Sans'] font-medium text-4xl lg:text-[64px]">Rightful Path, </span>
    <br className="hidden lg:block" />
    
    {/* Baris 2 */}
    <span className="font-['Cormorant_Garamond'] font-medium italic lowercase text-5xl lg:text-[96px]">an </span>
    <span className="font-['Plus_Jakarta_Sans'] font-medium text-4xl lg:text-[64px]">elegant stroke </span>
    <span className="font-['Cormorant_Garamond'] font-medium italic lowercase text-5xl lg:text-[96px]">of </span>
    <br className="hidden lg:block" />
    
    {/* Baris 3 */}
    <span className="font-['Plus_Jakarta_Sans'] font-medium text-4xl lg:text-[64px]">harmony</span>
  </h2>
</div>
```
*Catatan Penting: Ukuran font disesuaikan untuk mobile (`text-4xl` & `text-5xl`) dan kembali ke ukuran aslinya untuk layar besar (`lg:text-[64px]` & `lg:text-[96px]`).*

### 3. Kolom Kanan (Deskripsi, Garis, & Lokasi)
Kolom ini berisi teks deskripsi villa, garis pemisah, dan informasi lokasi dengan pin.
```tsx
{/* Kolom Kanan */}
<div className="flex flex-col gap-8 lg:gap-10 w-full lg:w-2/5 lg:pt-16">
  {/* Paragraf Deskripsi */}
  <p className="font-['Plus_Jakarta_Sans'] font-normal text-[#03071e] text-base lg:text-[20px] tracking-[1px] leading-relaxed">
    Inspired by the pristine path of a fairway, Fairways Villa is a refined sanctuary where chaos fades and clarity begins. Crafted with meticulous precision amidst natural serenity, we offer more than a luxurious stay—it is a transition into absolute peace. Step in, restore your balance, and let us welcome you to your beautiful journey home.
  </p>

  {/* Garis Pemisah (Divider) */}
  <div className="w-full">
    <img src="/assets/about-us/line.svg" className="w-full h-auto object-cover" alt="" aria-hidden="true" />
  </div>

  {/* Alamat & Pin Lokasi */}
  <div className="flex items-start lg:items-center gap-4 lg:gap-6">
    <img src="/assets/about-us/location-pin.svg" className="w-[25px] h-[30px] lg:w-[30px] lg:h-[36px] flex-shrink-0" alt="Location Pin" />
    <address className="not-italic font-['Plus_Jakarta_Sans'] font-light text-[#03071e] text-sm lg:text-[20px] tracking-[1px] leading-relaxed">
      Kadriye mahallesi 134.sokak no 7a Villa, 07525 Belek, Turkey
    </address>
  </div>
</div>
```
*Catatan Penting: Gunakan flex-shrink-0 pada ikon pin agar ikon tidak gepeng saat teks alamat memanjang menjadi beberapa baris di layar sempit.*

---

## 🔍 Fase 4: Pengujian & Validasi Akhir (QA Checklist)

Sebelum melakukan komit, lakukan pengecekan berikut secara berurutan:

1. **Mobile Check (Wajib):** Perkecil ukuran jendela browser ke lebar handphone (misalnya iPhone SE / 375px). 
   - Pastikan susunan berubah menjadi atas-bawah (kolom kiri di atas, kolom kanan di bawah).
   - Pastikan teks heading besar tidak *overflow* atau membuat halaman bisa di-scroll ke samping (horizontal scroll).
2. **Desktop Visual Parity Check:** Perbesar layar browser dan sandingkan dengan Figma. 
   - Perhatikan *tracking* (jarak antar huruf) pada paragraf.
   - Pastikan perpaduan font serif italic (`Cormorant Garamond`) dan sans-serif (`Plus Jakarta Sans`) pada judul tersusun selaras.
3. **Asset Size Check:** Buka *Network Tab* pada *Developer Tools* browser, pastikan aset `.svg` termuat dengan sangat ringan (berada dalam hitungan kilobyte) berkat kompresi yang telah diterapkan.
