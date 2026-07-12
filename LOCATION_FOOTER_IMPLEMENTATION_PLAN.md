# Panduan Implementasi Location & Footer Section (Node 395:452)

Panduan ini dirancang untuk Junior Developer atau AI Agent untuk menerjemahkan desain Figma bagian **Location & Footer** (Node `395:452`) menjadi kode React yang responsif (Mobile-First), performa tinggi, dan mudah dipelihara.

**Desain Referensi:** [Location & Footer - Node 395:452](https://www.figma.com/design/I4I98jEJuKrW0kCuDXD8Tk/PORTOFOLIO-FINALLLLLLL?node-id=395-452&m=dev)

---

## 🏗️ Prinsip Desain Responsif & Clean Code

1. **Mobile-First Approach:** 
   - Desain Figma didesain untuk layar desktop lebar (`w-[1622px]`). **Dilarang** menyalin ukuran lebar dan tinggi absolut ini ke dalam kode.
   - Di layar mobile, elemen peta harus memenuhi lebar layar dengan tinggi yang disesuaikan (misal `h-[300px]`), dan teks kontak/alamat harus ditumpuk vertikal (`flex-col`).
   - Tautan menu navigasi footer yang berjumlah 7 buah harus disusun menjadi grid/wrap (misal `grid grid-cols-2 sm:grid-cols-3 md:flex md:flex-row`) agar tidak meluber keluar layar HP.
2. **Optimasi Aset & Gambar (WAJIB):**
   - Gambar peta (`image 1`) harus diunduh, dikonversi ke format `.webp`, dan dikompres (gunakan Sharp/Squoosh dengan kualitas ~80%). Jangan pernah memuat gambar PNG asli yang besar ke repositori.
   - Ikon telepon, lokasi, dan logo vector harus diimplementasikan menggunakan format `.svg` murni agar tajam dan ukurannya sangat kecil.
3. **DRY (Don't Repeat Yourself) & Design Tokens:**
   - Gunakan kembali token warna (`text-text-dark`, `text-primary`) dan font (`font-sans`, `font-cormorant`, `font-montserrat`) yang sudah terdaftar di `src/styles.css`.
   - Hindari *inline-styling* (`style={{ ... }}`) kecuali untuk dinamis properti yang tidak bisa dicakup Tailwind.

---

## 🎨 Figma MCP Integration Rules (Wajib Diikuti)

### Required Flow:
1. Jalankan `get_design_context` untuk node `395:452` (sudah diekstrak oleh Senior Dev).
2. Jalankan `get_screenshot` untuk melihat tampilan visual aktualnya (sudah divalidasi oleh Senior Dev).
3. Unduh semua aset gambar/ikon ke folder proyek.
4. Terjemahkan visual tersebut ke struktur HTML semantik (menggunakan tag `<section>`, `<footer>`, `<address>`, `<nav>`, dll.).
5. Lakukan verifikasi 1:1 visual parity di layar desktop maupun mobile sebelum merilis kode.

---

## 🖼️ Manajemen Aset Proyek

Unduh dan tempatkan aset berikut pada direktori proyek:
1. **Peta Lokasi (`image 1`):** Simpan di `public/assets/footer/map-location.webp` (setelah dikompres).
2. **Ikon Kontak (Telepon & Pin):** Simpan di `public/assets/footer/icon-phone.svg` dan `public/assets/footer/icon-marker.svg`. (Atau gunakan komponen ikon SVG inline).
3. **Logo Vector (Vector):** Simpan di `public/assets/footer/logo-footer.svg`.
4. **Garis Pembatas (Line 8):** Jangan gunakan gambar SVG untuk garis pembatas horizontal, gunakan tag `<hr className="border-t border-text-dark/10 w-full" />` untuk menyederhanakan kode.

---

## 📝 Langkah-Langkah Implementasi Detail (Step-by-Step)

### Langkah 1: Buat Komponen Baru `LocationFooter.tsx`
Buat file komponen di [src/components/LocationFooter.tsx](file:///d:/Solva%20Studio/fairways_villa/src/components/LocationFooter.tsx).

#### Struktur Kode & Kelas Tailwind:
```tsx
import React from "react";

export default function LocationFooter() {
  return (
    <footer id="location" className="w-full bg-bg-light text-[#1b2a41] py-16 md:py-24 px-6 md:px-12 lg:px-[50px] flex flex-col items-center">
      <div className="w-full max-w-[1622px] flex flex-col gap-16 md:gap-24 lg:gap-[136px]">
        
        {/* TAHAP 1: PETA DAN INFO LOKASI / KONTAK */}
        <div className="flex flex-col gap-6 md:gap-10 w-full">
          {/* Peta Lokasi */}
          <div className="w-full h-[250px] sm:h-[350px] md:h-[500px] lg:h-[708px] overflow-hidden rounded-[6px] shadow-sm relative">
            <img 
              src="/assets/footer/map-location.webp" 
              alt="Villa Location Map in Uluwatu" 
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>

          {/* Kontak & Detail Alamat */}
          <div className="flex flex-col sm:flex-row justify-end gap-8 md:gap-[111px] w-full text-left">
            {/* Kolom Kontak */}
            <div className="flex flex-col gap-3 md:gap-[20px] w-full sm:w-[220px]">
              <h4 className="font-sans font-light tracking-[3.2px] text-xs md:text-sm uppercase text-[#1b2a41]/70">
                Contact Us
              </h4>
              <div className="flex gap-2.5 items-center">
                <img src="/assets/footer/icon-phone.svg" alt="" className="w-5 h-5 shrink-0" aria-hidden="true" />
                <a href="tel:+905378435048" className="font-sans font-light text-base md:text-[20px] tracking-[1px] text-[#1b2a41] hover:text-primary transition-colors">
                  +90 537 843 5048
                </a>
              </div>
            </div>

            {/* Kolom Alamat */}
            <div className="flex flex-col gap-3 md:gap-[20px] w-full sm:w-[408px]">
              <h4 className="font-sans font-light tracking-[3.2px] text-xs md:text-sm uppercase text-[#1b2a41]/70">
                Location
              </h4>
              <div className="flex gap-2.5 items-start">
                <img src="/assets/footer/icon-marker.svg" alt="" className="w-5 h-5 mt-1 shrink-0" aria-hidden="true" />
                <address className="not-italic font-sans font-light text-base md:text-[20px] tracking-[1px] leading-relaxed text-[#1b2a41]">
                  Kadriye mahallesi 134.sokak no 7a Villa, 07525 Belek, Turkey
                </address>
              </div>
            </div>
          </div>
        </div>

        {/* TAHAP 2: BRANDING LOGO, MENU DAN COPYRIGHT */}
        <div className="flex flex-col gap-12 md:gap-[100px] items-center w-full">
          
          {/* Logo Footer */}
          <div className="flex flex-col gap-3.5 items-center text-center">
            <img src="/assets/footer/logo-footer.svg" alt="Fairways Villa Logo" className="w-[50px] h-[50px]" />
            <div className="flex flex-col uppercase items-center text-text-dark">
              <span className="font-cormorant font-medium text-3xl md:text-[36px] tracking-[3.6px]">
                fairways
              </span>
              <span className="font-montserrat font-medium text-xs md:text-[14px] tracking-[2.8px] mt-1">
                villa
              </span>
            </div>
          </div>

          {/* Menu Navigasi Footer */}
          <nav className="w-full flex justify-center">
            <ul className="flex flex-wrap justify-center items-center gap-x-8 md:gap-x-12 lg:gap-x-[80px] gap-y-4 font-sans font-light text-sm md:text-lg lg:text-[20px] uppercase text-[#1b2a41]">
              <li>
                <a href="#about-us" className="hover:text-primary transition-colors duration-200">about</a>
              </li>
              <li>
                <a href="#villa" className="hover:text-primary transition-colors duration-200">accommodation</a>
              </li>
              <li>
                <a href="#location" className="hover:text-primary transition-colors duration-200">contact us</a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-primary transition-colors duration-200">gallery</a>
              </li>
              <li>
                <a href="#services" className="hover:text-primary transition-colors duration-200">celebrations</a>
              </li>
              <li>
                <a href="#neighbourhood" className="hover:text-primary transition-colors duration-200">experiences</a>
              </li>
              <li>
                <a href="#location" className="hover:text-primary transition-colors duration-200">location</a>
              </li>
            </ul>
          </nav>

          {/* Copyright & Divider */}
          <div className="w-full flex flex-col gap-6 md:gap-[25px]">
            <hr className="border-t border-[#1b2a41]/10 w-full" />
            <p className="font-sans font-normal text-xs md:text-sm tracking-widest text-[#1b2a41]/40 uppercase text-center md:text-left">
              solva studio ALL RIGHTS RESERVED
            </p>
          </div>
        </div>

      </div>
    </footer>
  );
}
```

### Langkah 2: Daftarkan Komponen di Halaman Utama
Buka file [src/routes/index.tsx](file:///d:/Solva%20Studio/fairways_villa/src/routes/index.tsx).
1. Import `LocationFooter` di bagian atas:
   `import LocationFooter from "../components/LocationFooter";`
2. Tambahkan komponen di bagian paling bawah dari elemen `<main>` (setelah `<CTA />`):
   ```tsx
   <main className="w-full px-6 md:px-12 lg:px-[50px] overflow-x-hidden">
     {/* komponen lainnya */}
     <CTA />
     <LocationFooter />
   </main>
   ```

---

## 🧪 Rencana Pengujian & QA

1. **Pengujian Responsif (Mobile Test):**
   - Pastikan peta tidak meluber keluar dari layar HP (< 640px).
   - Pastikan teks alamat membungkus (*wrap*) dengan rapi dan navigasi footer berderet tanpa merusak tata letak halaman.
2. **Lighthouse Audit:**
   - Skor *Performance* harus tetap hijau (> 90) karena peta gambar (`map-location.webp`) telah dikompresi dengan Sharp dan menggunakan atribut `loading="lazy"`.
