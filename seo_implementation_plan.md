# 🚀 Panduan Implementasi SEO Optimal - Fairways Villa

Dokumen ini adalah panduan **sangat detail dan langkah-demi-langkah** untuk mengimplementasikan *Search Engine Optimization (SEO)* pada website Fairways Villa. Website ini dibangun menggunakan React (TanStack Router) dengan fitur multi-bahasa (Inggris, Turki, Rusia). 

Panduan ini dirancang agar dapat langsung dikerjakan (Copy-Paste / Implementasi langsung) oleh Junior Developer atau Model AI.

---

## 🎯 Target SEO
1. Website muncul di halaman pertama Google untuk pencarian seperti *"Villa rent in Belek"*, *"Fairways Villa Antalya"*, *"Аренда виллы в Белеке"*.
2. Google memahami bahwa website ini memiliki 3 bahasa (EN, TR, RU) sehingga pengunjung dari Rusia akan diarahkan ke versi Rusia, dll.
3. Menampilkan *Rich Snippets* (kotak informasi detail/bintang ulasan) di hasil pencarian Google menggunakan JSON-LD.

---

## 🛠️ Langkah 1: Konfigurasi Title & Meta Description Dinamis

Mesin pencari membutuhkan `<title>` dan `<meta name="description">` yang berubah sesuai halaman dan bahasa yang sedang aktif.

### Instruksi Implementasi:
1. Buka file terjemahan bahasa (contoh: `src/locales/en/translation.json`).
2. Tambahkan objek khusus SEO di semua file bahasa (`en`, `tr`, `ru`):
   ```json
   "seo": {
     "homeTitle": "Fairways Villa Belek | Luxury Holiday Rental in Antalya",
     "homeDescription": "Experience ultimate luxury at Fairways Villa Belek, Antalya. Private pool, golf course views, and premium amenities. Book your dream vacation today!",
     "villaTitle": "Our Villa | Fairways Villa Belek",
     "villaDescription": "Explore the luxurious rooms, premium facilities, and beautiful surroundings of Fairways Villa Belek."
   }
   ```
   *(Pastikan menerjemahkan nilai di atas ke dalam file `tr` dan `ru` dengan kata kunci lokal yang relevan).*
3. Pada TanStack Router / Komponen Root (misal di `src/routes/__root.tsx` atau `src/components/Header.tsx`), gunakan manipulasi DOM atau library Helmet untuk memperbarui title & meta secara dinamis saat bahasa berubah:
   ```tsx
   // Contoh implementasi di dalam komponen utama (misal menggunakan useEffect di __root.tsx)
   import { useEffect } from 'react';
   import { useTranslation } from 'react-i18next';

   export function SEOMeta({ page = 'home' }) {
     const { t, i18n } = useTranslation();

     useEffect(() => {
       // Set Title
       document.title = t(`seo.${page}Title`);
       
       // Set Meta Description
       let metaDescription = document.querySelector('meta[name="description"]');
       if (!metaDescription) {
         metaDescription = document.createElement('meta');
         metaDescription.setAttribute('name', 'description');
         document.head.appendChild(metaDescription);
       }
       metaDescription.setAttribute('content', t(`seo.${page}Description`));
       
       // Set HTML lang attribute untuk SEO
       document.documentElement.lang = i18n.language;
     }, [t, i18n.language, page]);

     return null;
   }
   ```
4. Panggil komponen `<SEOMeta page="home" />` di `src/routes/index.tsx` dan `<SEOMeta page="villa" />` di `src/routes/villa.tsx`.

---

## 🛠️ Langkah 2: Implementasi Hreflang (Wajib untuk Multi-Bahasa)

Karena website ini memiliki 3 bahasa, kita WAJIB memberi tahu Google versi bahasa mana yang harus ditampilkan ke pengguna di negara tertentu. Ini dilakukan menggunakan tag `<link rel="alternate" hreflang="...">`.

### Instruksi Implementasi:
1. Buat fungsi di dalam `SEOMeta` atau komponen khusus untuk menginjeksi tag `hreflang` ke dalam `<head>`:
   ```tsx
   useEffect(() => {
     const languages = ['en', 'tr', 'ru'];
     const currentUrl = window.location.origin + window.location.pathname;

     // Hapus hreflang lama agar tidak duplikat saat ganti halaman
     document.querySelectorAll('link[rel="alternate"]').forEach(el => el.remove());

     languages.forEach((lang) => {
       const link = document.createElement('link');
       link.rel = 'alternate';
       link.hreflang = lang;
       // Karena state bahasa menggunakan cookie/localStorage,
       // tambahkan query parameter agar URL dapat memuat bahasa secara independen oleh Google.
       link.href = `${currentUrl}?lang=${lang}`; 
       document.head.appendChild(link);
     });

     // X-default untuk default language (Inggris)
     const defaultLink = document.createElement('link');
     defaultLink.rel = 'alternate';
     defaultLink.hreflang = 'x-default';
     defaultLink.href = `${currentUrl}?lang=en`;
     document.head.appendChild(defaultLink);
   }, [window.location.pathname]);
   ```

---

## 🛠️ Langkah 3: Structured Data (JSON-LD)

JSON-LD adalah kode rahasia yang dibaca oleh Google untuk memunculkan "Rich Snippets" (contoh: Rating Bintang, Harga, Lokasi yang menonjol di pencarian Google).

### Instruksi Implementasi:
1. Kita akan menggunakan skema **"VacationRental"**.
2. Di dalam komponen halaman beranda (`src/routes/index.tsx`), tambahkan script JSON-LD berikut ke dalam `<head>`:
   ```tsx
   useEffect(() => {
     const schema = {
       "@context": "https://schema.org",
       "@type": "VacationRental",
       "name": "Fairways Villa Belek",
       "description": t('seo.homeDescription'),
       "image": "https://[NAMA_DOMAIN_ASLI]/assets/villa/hero-bg.webp",
       "address": {
         "@type": "PostalAddress",
         "streetAddress": "Kadriye, V29H+7H",
         "addressLocality": "Serik/Antalya",
         "addressCountry": "TR",
         "postalCode": "07525"
       },
       "telephone": "+905378435048",
       "starRating": {
         "@type": "Rating",
         "ratingValue": "5"
       }
     };

     const script = document.createElement('script');
     script.type = 'application/ld+json';
     script.id = 'schema-vacation-rental';
     script.text = JSON.stringify(schema);
     
     // Hapus schema lama jika ada lalu tambahkan yang baru
     document.getElementById('schema-vacation-rental')?.remove();
     document.head.appendChild(script);
   }, [t]);
   ```

---

## 🛠️ Langkah 4: Optimasi Gambar & Aksesibilitas (Alt Text)

Google Image Search adalah sumber traffic yang besar. Google tidak dapat melihat visual, sehingga mereka membaca atribut `alt` pada gambar.

### Instruksi Implementasi:
1. Buka setiap komponen yang menggunakan gambar (`<img>` atau `<img />`).
2. Jangan pernah menggunakan atribut `alt` yang kosong (`alt=""`) atau generik (`alt="image"`).
3. Gunakan i18n untuk mendeskripsikan gambar.
   * **SALAH**: `<img src="/assets/gallery-1.webp" alt="gallery" />`
   * **BENAR**: `<img src="/assets/gallery-1.webp" alt={t('gallery.imageAlt1')} />`
4. Di file terjemahan (`en/translation.json`), tambahkan deskripsi:
   ```json
   "gallery": {
     "imageAlt1": "Private swimming pool at Fairways Villa Belek at sunset",
     "imageAlt2": "Modern luxury living room interior in Antalya villa"
   }
   ```
*(Catatan: Pastikan semua aset gambar telah dikompres menggunakan format `.webp` untuk menunjang skor performa LCP di Core Web Vitals).*

---

## 🛠️ Langkah 5: Semantic HTML & Hierarchy Heading (H1, H2, H3)

Struktur HTML yang rapi membantu bot Google memahami hirarki pentingnya konten.

### Instruksi Implementasi:
1. **Aturan H1**: Dalam 1 halaman (`index.tsx` atau `villa.tsx`), **HANYA BOLEH ADA SATU TAG `<h1>`**.
   - Buka file `src/components/Hero.tsx`. Pastikan judul utama (misal: "FAIRWAYS VILLA BELEK") menggunakan tag `<h1>`.
2. **Aturan H2 & H3**: Judul bagian di bawahnya (misal "Fasilitas", "Galeri", "Testimoni") WAJIB menggunakan tag `<h2>`. Sub-bagian menggunakan `<h3>`.
3. Buka file komponen dan periksa:
   - Jika saat ini ada elemen seperti `<p className="text-4xl font-bold">Galeri Kami</p>`, **UBAH MENJADI** `<h2 className="text-4xl font-bold">Galeri Kami</h2>`.
4. Pastikan blok konten dibungkus tag pembungkus semantik:
   - Header aplikasi menggunakan `<header>`.
   - Isi konten utama menggunakan `<main>`.
   - Tiap blok fitur (Gallery, Fasilitas, About) dibungkus menggunakan `<section>`.
   - Bagian bawah menggunakan `<footer>`.

---

## 🛠️ Langkah 6: Pembuatan `sitemap.xml` dan `robots.txt`

Sitemap adalah peta jalan bagi bot Google untuk menemukan halaman kita, sedangkan robots.txt memberi izin Google untuk merayapi website.

### Instruksi Implementasi:
1. Di dalam folder `public/`, buat file baru bernama `robots.txt` dan isi dengan:
   ```text
   User-agent: *
   Allow: /

   Sitemap: https://[NAMA_DOMAIN_ASLI]/sitemap.xml
   ```
2. Di dalam folder `public/`, buat file baru bernama `sitemap.xml` dan sesuaikan strukturnya:
   ```xml
   <?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
           xmlns:xhtml="http://www.w3.org/1999/xhtml">
      <!-- Homepage -->
      <url>
         <loc>https://[NAMA_DOMAIN_ASLI]/</loc>
         <xhtml:link rel="alternate" hreflang="en" href="https://[NAMA_DOMAIN_ASLI]/?lang=en"/>
         <xhtml:link rel="alternate" hreflang="tr" href="https://[NAMA_DOMAIN_ASLI]/?lang=tr"/>
         <xhtml:link rel="alternate" hreflang="ru" href="https://[NAMA_DOMAIN_ASLI]/?lang=ru"/>
         <xhtml:link rel="alternate" hreflang="x-default" href="https://[NAMA_DOMAIN_ASLI]/?lang=en"/>
         <priority>1.0</priority>
      </url>
      <!-- Halaman Villa Detail -->
      <url>
         <loc>https://[NAMA_DOMAIN_ASLI]/villa</loc>
         <xhtml:link rel="alternate" hreflang="en" href="https://[NAMA_DOMAIN_ASLI]/villa?lang=en"/>
         <xhtml:link rel="alternate" hreflang="tr" href="https://[NAMA_DOMAIN_ASLI]/villa?lang=tr"/>
         <xhtml:link rel="alternate" hreflang="ru" href="https://[NAMA_DOMAIN_ASLI]/villa?lang=ru"/>
         <xhtml:link rel="alternate" hreflang="x-default" href="https://[NAMA_DOMAIN_ASLI]/villa?lang=en"/>
         <priority>0.8</priority>
      </url>
   </urlset>
   ```

---

## ✅ Checklist Penyerahan (Quality Assurance)
Sebelum melakukan push atau submit PR, periksa kembali:
- [ ] Tag `<title>` dan `<meta description>` berubah secara dinamis setiap ganti rute / ganti bahasa.
- [ ] Atribut `lang` di `<html lang="...">` berubah sesuai bahasa (`en`, `tr`, `ru`).
- [ ] Tidak ada duplikasi elemen `<h1>` di satu rute.
- [ ] Atribut `alt` pada semua aset gambar memiliki deskripsi teks i18n (`t(...)`), bukan kosongan.
- [ ] Link Canonical & Hreflang sudah tertanam dengan akurat di tag `<head>`.
- [ ] File `sitemap.xml` & `robots.txt` sudah dibuat dalam folder `public/`.
