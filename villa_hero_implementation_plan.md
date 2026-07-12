# Implementasi Hero Section - Fairways Villa (Node 394:148)

Berdasarkan desain Figma (Node: `394:148`), dokumen ini adalah panduan teknis *step-by-step* untuk mengimplementasikan Hero Section secara responsif, maintainable, dan sesuai dengan prinsip *Mobile-First*.

> [!IMPORTANT]
> **Target Implementator:** Junior Frontend Developer / AI Agent
> **Tujuan Utama:** Konversi desain *desktop-only* dari Figma menjadi UI yang *fully responsive* (Mobile-First), komponen *reusable*, dan kode yang bersih (DRY & No Code Smell).

## Ringkasan Tugas

- **Desain Referensi:** Hero Section untuk "Fairways Villa" dengan background gambar full-screen, overlay gelap, judul besar, 3 informasi fasilitas (Harga, Kamar Tidur, Kamar Mandi), dan tombol CTA "VIEW DETAIL".
- **Tech Stack:** React, Tailwind CSS (sesuai standar project saat ini).

---

## Langkah 1: Ekstraksi Konteks Desain (Figma MCP Workflow)

**Wajib dijalankan pertama kali oleh Implementator (JANGAN DILEWATI):**
1. Jalankan tools `get_design_context` untuk node `394:148`.
2. Jika hasil output (React+Tailwind) terlalu besar/terpotong, jalankan `get_metadata` terlebih dahulu untuk melihat peta *node*, lalu re-fetch node yang diperlukan.
3. Jalankan tools `get_screenshot` untuk node `394:148` sebagai referensi validasi akhir (*Visual Parity*).
4. Jangan mulai mengoding sebelum mendapatkan konteks dan screenshot.

---

## Langkah 2: Manajemen & Optimasi Aset (PENTING)

1. **Background Image:**
   - Unduh gambar background villa dari URL yang diberikan oleh *output* `get_design_context`.
   - **WAJIB:** Lakukan proses **kompresi gambar** tanpa mengurangi kualitas secara drastis. Konversi format gambar menjadi `.webp` atau `.avif`. Gambar *hero* yang besar dilarang keras membebani *load time* website (target ukuran < 300KB).
   - Simpan di folder statis yang sesuai (misal: `/public/images/` atau `/src/assets/images/`).
2. **Ikon / Vektor:**
   - Unduh ketiga ikon fasilitas (Ikon Uang/Harga, Ikon Kamar Tidur, Ikon Kamar Mandi) sebagai format `.svg`.
   - Direkomendasikan untuk membungkus `.svg` menjadi komponen React (`<svg>`) murni agar warna (fill/stroke) mudah dimanipulasi dengan utility Tailwind seperti `text-white fill-current`.

---

## Langkah 3: Konvensi Setup Tema (Tailwind)

Jangan gunakan *utility class* asal-asalan. Sesuaikan dengan standar *design system* project.

- **Sistem Font:**
  - Teks Judul "FAIRWAYS VILLA": `Cormorant Garamond` (Medium). Set utilitas `font-cormorant`.
  - Teks Informasi & Tombol: `Plus Jakarta Sans` (Medium & SemiBold). Set utilitas `font-jakarta`.
- **Warna Spesifik:**
  - Overlay Gelap Background: Gunakan standard Tailwind `bg-black/70` atau warna spesifik `rgba(0,0,0,0.72)`.
  - Warna Teks & Border: Putih solid (`#FFFFFF` atau `#FDFFFC`).

---

## Langkah 4: Pembuatan Komponen Reusable (DRY Principle)

> [!WARNING]
> Jangan melakukan hardcode untuk elemen yang berulang. Pisahkan logika UI menjadi komponen-komponen independen agar mudah di-*maintain*.

### 1. Komponen `VillaFeatureItem`
Buat komponen kecil untuk merender ikon dan teks informasi fasilitas.

```tsx
// src/components/VillaFeatureItem.tsx
import React from 'react';

interface VillaFeatureItemProps {
  icon: React.ReactNode;
  text: React.ReactNode;
}

export function VillaFeatureItem({ icon, text }: VillaFeatureItemProps) {
  return (
    <div className="flex flex-row items-center gap-4 md:gap-6">
      <div className="w-6 h-6 md:w-[30px] md:h-[30px] shrink-0 flex items-center justify-center">
        {icon}
      </div>
      <div className="text-white text-base md:text-[20px] font-medium font-jakarta tracking-[1px] capitalize">
        {text}
      </div>
    </div>
  );
}
```

### 2. Komponen `OutlineButton`
Ekstraksi tombol "VIEW DETAIL" ke dalam komponen tersendiri untuk digunakan ulang (contoh penamaan: `OutlineButton.tsx` atau varian di dalam komponen Button utama).

```tsx
// src/components/OutlineButton.tsx
import React from 'react';

interface OutlineButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export function OutlineButton({ children, className, ...props }: OutlineButtonProps) {
  return (
    <button 
      {...props}
      className={`border border-[#fdfffc] flex items-center justify-center px-6 py-3 md:px-[40px] md:py-[20px] rounded-[1px] hover:bg-white hover:text-black transition-colors duration-300 ${className}`}
    >
      <span className="font-jakarta font-semibold text-sm md:text-[16px] text-current tracking-[1.6px] uppercase">
        {children}
      </span>
    </button>
  );
}
```

---

## Langkah 5: Implementasi Hero Section (Mobile-First)

Implementasikan section Hero (misal di file `VillaHero.tsx`). 

> [!CAUTION]
> Output *raw* dari `get_design_context` sering menggunakan *absolute positioning* kaku (seperti `px-[480px]`, `w-[768px]`, `h-[308px]`). **DILARANG KERAS** menyalin kode *fixed sizing* tersebut secara mentah. Konversikan menjadi kode yang *Mobile-First*.

**Panduan Layouting Responsif:**

1. **Wrapper & Background (Full Screen):**
   - Bungkus seluruh section dengan: `<section className="relative flex flex-col items-center justify-center min-h-[100svh] w-full py-20 px-4 md:px-8">`.
   - Tempatkan `<img />` (background kompresi) secara absolut: `<img src="..." className="absolute inset-0 w-full h-full object-cover -z-20" alt="Villa Background" />`.
   - Buat layer overlay gelap: `<div className="absolute inset-0 bg-black/70 -z-10" />`.

2. **Konten Utama (Typography Responsif):**
   - Teks Judul (Figma: 96px). Skalakan dari mobile ke desktop: `text-5xl md:text-7xl lg:text-[96px]`.
   - *Styling* judul: `text-white font-cormorant font-medium uppercase leading-tight text-center`.

3. **Layout Informasi Fasilitas (Flex-Wrap):**
   - Di Figma jarak antar fasilitas (`gap`) adalah `91px` mendatar. Jika dipaksa di *mobile*, elemen akan menabrak.
   - Gunakan pendekatan *flex* responsif: `<div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-[40px] lg:gap-[91px] mt-8 mb-12 w-full">`.
   - *Render* 3 buah komponen `VillaFeatureItem` di dalam *container* tersebut.
   - Pembedaan khusus untuk teks harga: pisahkan ukuran teks harga dan string "/night" jika diperlukan agar *pixel-perfect* sesuai desain Figma.

4. **Tombol CTA:**
   - Gunakan `<OutlineButton>VIEW DETAIL</OutlineButton>`.

---

## Verification Plan

### 1. Validasi Desain & Resolusi (Visual Parity)
- Buka website di *local browser*. Bandingkan ukuran elemen, jarak margin/padding pada resolusi desktop dengan referensi tangkapan layar (`get_screenshot`). Pastikan *feel* lebarnya sama persis tanpa terlihat kaku.

### 2. Validasi Responsivitas (Mobile Check)
- Gunakan fitur simulasi perangkat seluler di browser *DevTools* (misal: iPhone SE resolusi 375px). 
- Pastikan teks membesar/mengecil secara dinamis, informasi harga/kamar mem-bungkus (`wrap`/tumpuk bawah) dengan rapi, dan tidak ada halaman yang bergeser ke kanan akibat elemen meluber (overflow horizontal).

### 3. Validasi Performa (Optimasi Gambar)
- Pada *tab Network* di browser *DevTools*, muat ulang halaman dengan penonaktifan *cache*. Pastikan gambar background yang diload ukurannya kecil (format wepb/avif) dan dimuat dengan cepat.
