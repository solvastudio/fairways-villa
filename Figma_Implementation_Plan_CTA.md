# Panduan Implementasi Desain Figma (CTA Section) - Mobile First & Responsive

Dokumen ini berisi langkah-langkah **sangat detail dan terstruktur** untuk mengimplementasikan desain Figma (Node: 395-337, Section: CTA) menjadi kode React (atau kerangka kerja frontend serupa) dengan Tailwind CSS. Panduan ini dirancang agar mudah diikuti oleh Junior Developer atau AI Assistant.

---

## 📌 Prinsip Utama (Harus Diikuti!)
1. **Mobile First Design**: Semua class dasar Tailwind adalah untuk tampilan *mobile*. Gunakan prefix `md:`, `lg:`, `xl:` hanya untuk layar yang lebih besar. Jangan gunakan *fixed width/height* berukuran besar seperti `w-[1274px]` atau `pt-[703px]`.
2. **DRY & Reusable Components**: Pisahkan elemen yang berulang seperti Tombol (Button) menjadi komponen terpisah.
3. **No Code Smell**: Kode harus bersih, menggunakan semantic HTML (seperti `<section>`, `<article>`), dan mengikuti standar aksesibilitas (aria-label, alt text).
4. **Optimasi Aset**: Semua gambar wajib dikompres (WebP/AVIF) untuk menjaga kecepatan memuat (load speed) website tanpa mengorbankan kualitas visual.
5. **Design System & Tokens**: Gunakan variabel warna dari konfigurasi Tailwind proyek, jangan melakukan hardcode warna Hex kecuali jika warna tersebut unik dan belum didaftarkan di `tailwind.config.js`.

---

## 🛠 Langkah 1: Manajemen & Optimasi Aset
Sebelum menulis kode, siapkan semua aset gambar yang dibutuhkan dari Figma.

1. **Download Aset**:
   - Gambar Background: Unduh dari tautan sumber yang ada di Figma (Tampilan kamar tidur villa).
   - Ikon/SVG: Unduh ikon *bullet/ellipse* (warna cokelat).
2. **Kompresi Gambar**:
   - Buka website seperti [Squoosh.app](https://squoosh.app/) atau [TinyPNG](https://tinypng.com/).
   - Masukkan gambar *background* tadi.
   - Konversi dan kompres formatnya menjadi **WebP** dengan kualitas ~80-85%. (Pastikan ukuran file di bawah 300KB).
3. **Simpan di Direktori Proyek**:
   - Pindahkan gambar yang sudah dikompres ke dalam folder `public/assets/` atau `src/assets/`.
   - Contoh penamaan: `cta-background.webp` dan `bullet-icon.svg`.

---

## 🎨 Langkah 2: Konfigurasi Tema (tailwind.config.js)
Pastikan warna dan font utama sudah dikonfigurasi di `tailwind.config.js` agar selaras dengan desain. Jika belum ada, tambahkan konfigurasi berikut:

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#c97a4a', // Warna aksen oranye/cokelat untuk teks & tombol
      },
      fontFamily: {
        jakarta: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
    },
  },
}
```

---

## 🧩 Langkah 3: Membuat Reusable Component (Button)
Pada desain, terdapat tombol "RESERVE". Tombol dengan gaya seperti ini sangat mungkin digunakan di bagian lain pada website. 

Buat file komponen baru, misal `Button.jsx` atau `Button.tsx`.

```jsx
// src/components/ui/Button.jsx
import React from 'react';

export const Button = ({ children, onClick, className = '' }) => {
  return (
    <button
      onClick={onClick}
      className={`
        bg-primary border border-primary text-white 
        font-jakarta font-semibold text-[16px] tracking-[1.6px] uppercase
        px-8 py-4 rounded-[1px]
        hover:bg-transparent hover:text-primary transition-colors duration-300
        flex items-center justify-center
        ${className}
      `}
    >
      {children}
    </button>
  );
};
```
*Catatan: Menambahkan efek `hover:bg-transparent` sebagai best practice interaktivitas (micro-interaction).*

---

## 💻 Langkah 4: Implementasi Komponen Utama (CTA Section)
Buat file `CtaSection.jsx`. Komponen ini akan menyatukan gambar latar belakang dengan teks.

**Perhatikan struktur HTML & Flexbox untuk responsive:**
- Hindari `pt-[703px]`. Gunakan `min-h-[500px] md:min-h-screen` dipadukan dengan `flex flex-col justify-end` agar konten selalu terdorong ke bawah menyesuaikan layar.
- Ubah ukuran font (Typography) agar responsif: Kecil di mobile, besar di desktop.

```jsx
// src/components/sections/CtaSection.jsx
import React from 'react';
import { Button } from '../ui/Button'; // Sesuaikan path

export const CtaSection = () => {
  return (
    <section className="relative flex flex-col justify-end w-full min-h-[600px] lg:min-h-[850px] px-6 py-16 lg:px-[227px] lg:pb-[90px] overflow-hidden">
      
      {/* 1. Background Image & Overlay */}
      <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden="true">
        {/* Fallback warna hitam saat gambar sedang di-load */}
        <div className="absolute inset-0 bg-black" />
        
        {/* Gambar Latar */}
        <img 
          src="/assets/cta-background.webp" 
          alt="Villa Bedroom Retreat" 
          className="absolute inset-0 object-cover w-full h-full max-w-none"
          loading="lazy"
        />
        
        {/* Overlay Gelap agar teks terbaca jelas (Contrast) */}
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* 2. Main Content Container */}
      <div className="relative z-10 flex flex-col items-center mx-auto w-full max-w-[1274px] gap-8 md:gap-[50px]">
        
        {/* Heading Group */}
        <div className="flex flex-col items-center gap-4 md:gap-[20px] w-full max-w-[732px]">
          
          {/* Subheading dengan Ikon */}
          <div className="flex items-center justify-center gap-[10px]">
            <img 
              src="/assets/bullet-icon.svg" 
              alt="" 
              className="w-[10px] h-[10px] shrink-0" 
              aria-hidden="true" 
            />
            <h3 className="font-jakarta font-medium text-primary text-sm md:text-[16px] tracking-[0.8px] uppercase">
              Reserve Your Stay
            </h3>
          </div>

          {/* Main Heading (Responsive text size) */}
          <h2 className="font-jakarta font-medium text-3xl md:text-4xl lg:text-[48px] text-white text-center uppercase leading-tight md:leading-normal">
            Your Private Retreat Awaits
          </h2>
        </div>

        {/* Paragraph (Responsive width & text size) */}
        <p className="font-jakarta font-normal text-base md:text-[20px] text-white text-center tracking-wide md:tracking-[1px] max-w-3xl leading-relaxed capitalize">
          Reserve your stay with confidence in a fully equipped villa, perfectly located near top attractions—designed for a seamless and memorable escape.
        </p>

        {/* Call To Action Button */}
        <Button onClick={() => console.log('Navigate to Reservation')}>
          Reserve
        </Button>

      </div>
    </section>
  );
};
```

---

## 🔍 Langkah 5: Final Review & Validasi (Quality Control)

Setelah kode ditulis, lakukan pengecekan berikut:
1. **Lakukan Resize Layar Browser**: 
   - Tarik layar dari ukuran handphone (320px) hingga monitor lebar (1920px). Pastikan teks tidak keluar layar (overflow) dan jaraknya konsisten.
2. **Cek Kualitas Gambar**:
   - Buka `Network Tab` di Inspect Element (F12). Pastikan `cta-background.webp` berhasil dimuat dengan ukuran kecil (< 300KB) namun kualitas tetap tajam.
3. **Cek Parity dengan Figma**:
   - Bandingkan secara visual komponen di desktop (layar besar) dengan gambar desain aslinya. Jarak padding bawah `lg:pb-[90px]` dan ukuran font harus identik secara proporsi 1:1.
4. **Semantik & Aksesibilitas (a11y)**:
   - Pastikan teks utama menggunakan tag `<h2>` (atau `<h1>` tergantung hirarki halaman).
   - Pastikan overlay `pointer-events-none` dan `aria-hidden="true"` berfungsi agar screen reader tidak kebingungan.
