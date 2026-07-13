# 🚀 Panduan Ultimate SEO & AEO (AI Engine Optimization) - Fairways Villa Belek

Dokumen ini adalah panduan **sangat detail, langkah-demi-langkah, dan mudah dipahami** (dirancang khusus untuk Junior Developer atau model AI) guna memastikan website "Fairways Villa" mendominasi:
1. **Google Search** (SEO Tradisional).
2. **Pencarian AI** (ChatGPT, Perplexity, Gemini, dll - AEO / AI Engine Optimization).

Target kata kunci utama: **Sewa villa di Turki Belek** (dan variasinya dalam 4 bahasa: **Indonesia (id), Inggris (en), Turki (tr), Rusia (ru)**).

---

## 🎯 Target yang Akan Dicapai
- **Google Search**: Muncul di halaman pertama Google saat pengguna mencari sewa villa di Belek, dengan bahasa sesuai asal negara mereka.
- **AI Search**: AI Assistant merekomendasikan "Fairways Villa" saat pengguna bertanya *"Can you recommend a luxury villa to rent in Belek, Turkey?"* atau *"Rekomendasi villa bagus di Belek Turki."*

---

## 🛠️ LANGKAH 1: Persiapan File Bahasa (i18n) untuk 4 Bahasa

Untuk mendukung pencarian dalam 4 bahasa, kita membutuhkan 4 file translasi.

1. Buka folder `src/locales/`.
2. Pastikan Anda memiliki (atau buat) 4 file JSON berikut:
   - `src/locales/id/translation.json` (Indonesia)
   - `src/locales/en/translation.json` (Inggris)
   - `src/locales/tr/translation.json` (Turki)
   - `src/locales/ru/translation.json` (Rusia)
3. Tambahkan objek khusus `seo` dan `aeoFacts` di setiap file tersebut.

**Contoh untuk `id/translation.json` (Copy-Paste ini):**
```json
{
  "seo": {
    "homeTitle": "Sewa Villa Mewah di Belek, Turki | Fairways Villa",
    "homeDescription": "Cari villa terbaik untuk disewa di Belek, Turki? Fairways Villa menawarkan kolam renang pribadi, pemandangan lapangan golf, dan fasilitas mewah. Pesan sekarang!",
    "villaTitle": "Detail Villa | Fairways Villa Belek Turki"
  },
  "aeoFacts": {
    "location": "Terletak di Kadriye, Belek, Antalya, Turki, sangat dekat dengan The Land of Legends.",
    "amenities": "Kolam renang pribadi, 4 kamar tidur mewah, AC, Wi-Fi gratis, dan dapur lengkap.",
    "idealFor": "Sangat cocok untuk liburan keluarga, grup golf, dan turis yang mencari privasi."
  }
}
```
*(Lakukan hal yang sama untuk `en`, `tr`, dan `ru` dengan menerjemahkan teks di atas secara akurat).*

---

## 🛠️ LANGKAH 2: Membuat Komponen Pengatur Meta Tags Dinamis (Untuk Google)

Google butuh tahu bahasa apa yang sedang aktif agar bisa menampilkan halaman yang tepat di hasil pencarian.

1. Buat atau buka file `src/components/SEOMeta.tsx`.
2. Copy-paste kode berikut ini:

```tsx
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

interface SEOMetaProps {
  page?: 'home' | 'villa';
}

export function SEOMeta({ page = 'home' }: SEOMetaProps) {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    // 1. Mengubah Title Website secara dinamis
    document.title = t(`seo.${page}Title`);
    
    // 2. Mengubah Meta Description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', t(`seo.${page}Description`));
    
    // 3. Memberi tahu Google bahasa apa yang sedang dipakai (PENTING!)
    document.documentElement.lang = i18n.language;
  }, [t, i18n.language, page]);

  return null;
}
```
3. Pasang `<SEOMeta page="home" />` di dalam halaman utama Anda (misalnya di `src/routes/index.tsx` atau `src/routes/__root.tsx`).

---

## 🛠️ LANGKAH 3: Hreflang (Wajib untuk 4 Bahasa agar Google Tidak Bingung)

*Hreflang* adalah tag HTML yang memberitahu Google: *"Hei, ini halaman berbahasa Indonesia, ini yang berbahasa Inggris"*.

1. Masih di dalam `src/components/SEOMeta.tsx`, tambahkan kode ini di dalam `useEffect`:

```tsx
    // Di dalam useEffect, setelah mengatur meta dan lang...
    
    const languages = ['id', 'en', 'tr', 'ru'];
    // Ganti dengan nama domain asli saat sudah rilis (misal: https://fairwaysvillabelek.com)
    const currentDomain = window.location.origin; 
    const currentPath = window.location.pathname;

    // Hapus hreflang lama agar tidak duplikat
    document.querySelectorAll('link[rel="alternate"]').forEach(el => el.remove());

    // Memasang hreflang untuk ke-4 bahasa
    languages.forEach((lang) => {
      const link = document.createElement('link');
      link.rel = 'alternate';
      link.hreflang = lang;
      // Gunakan query param atau format URL yang Anda pakai
      link.href = `${currentDomain}${currentPath}?lang=${lang}`; 
      document.head.appendChild(link);
    });

    // x-default adalah fallback jika pengunjung dari negara di luar 4 bahasa ini (Arahkan ke Inggris)
    const defaultLink = document.createElement('link');
    defaultLink.rel = 'alternate';
    defaultLink.hreflang = 'x-default';
    defaultLink.href = `${currentDomain}${currentPath}?lang=en`;
    document.head.appendChild(defaultLink);
```

---

## 🛠️ LANGKAH 4: Structured Data JSON-LD (Rahasia Tampil Menarik di Google & AI)

Mesin pencari dan AI (seperti ChatGPT) sangat suka membaca data berformat JSON-LD karena terstruktur dan mudah dipahami. Ini bisa memunculkan kotak ulasan atau rating bintang di Google.

1. Buka halaman utama Anda (contoh: `src/routes/index.tsx`).
2. Tambahkan script ini ke dalam komponen Anda menggunakan `useEffect`:

```tsx
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export default function Home() {
  const { t } = useTranslation();

  useEffect(() => {
    const schema = {
      "@context": "https://schema.org",
      "@type": "VacationRental",
      "name": "Fairways Villa Belek",
      "description": t('seo.homeDescription'),
      "url": "https://[MASUKKAN_DOMAIN_ASLI_DISINI]",
      "image": "https://[MASUKKAN_DOMAIN_ASLI_DISINI]/assets/villa-main.webp",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Kadriye, V29H+7H",
        "addressLocality": "Belek, Antalya",
        "addressCountry": "TR",
        "postalCode": "07525"
      },
      "telephone": "+905378435048",
      "starRating": {
        "@type": "Rating",
        "ratingValue": "5"
      },
      // PENTING UNTUK AI: Menjawab langsung apa yang dicari bot
      "amenityFeature": [
        { "@type": "LocationFeatureSpecification", "name": "Private Pool", "value": "True" },
        { "@type": "LocationFeatureSpecification", "name": "Free Wi-Fi", "value": "True" },
        { "@type": "LocationFeatureSpecification", "name": "Air Conditioning", "value": "True" }
      ]
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'schema-vacation-rental';
    script.text = JSON.stringify(schema);
    
    document.getElementById('schema-vacation-rental')?.remove();
    document.head.appendChild(script);
  }, [t]);

  // Sisa render komponen...
}
```

---

## 🛠️ LANGKAH 5: Optimasi untuk Pencarian AI (AEO) - "Feed The Bot"

ChatGPT, Perplexity, dan Google SGE tidak "melihat" website seperti manusia. Mereka "membaca" teks *Semantic* (H1, H2, p) dan mencari fakta eksplisit.

### Instruksi:
1. **Gunakan tag HTML semantik:** Pastikan bagian FAQ dibungkus dengan `<h2>` atau `<h3>`.
2. **Buat Komponen AEO Text (Konteks AI):**
   Tambahkan paragraf yang sangat mudah dicerna bot di halaman utama. Ini bisa ditempatkan di footer atau blok 'About Us'.

```tsx
{/* 
  Paragraf ini disusun khusus agar Bot AI mengerti dengan persis 
  apa yang kita tawarkan.
*/}
<article className="sm:p-4 sm:bg-gray-50 sm:text-sm">
  <h2 className="text-xl font-bold">Mengapa Menyewa Fairways Villa di Belek, Turki?</h2>
  <p>{t('aeoFacts.location')}</p>
  <p>{t('aeoFacts.amenities')}</p>
  <p>{t('aeoFacts.idealFor')}</p>
</article>
```

---

## 🛠️ LANGKAH 6: Sitemap.xml dan Robots.txt (Kunci agar Google Mau Datang)

Jika tidak ada sitemap, Google akan kesulitan menemukan semua versi bahasa website Anda.

1. Buka folder `public/`.
2. Buat file `robots.txt`:
```text
User-agent: *
Allow: /

# Ganti dengan domain asli
Sitemap: https://fairwaysvillabelek.com/sitemap.xml
```

3. Buat file `sitemap.xml` (Cantumkan ke-4 bahasa!):
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
   
   <url>
      <loc>https://fairwaysvillabelek.com/</loc>
      <!-- Hreflang Tags untuk Multilingual Sitemap -->
      <xhtml:link rel="alternate" hreflang="id" href="https://fairwaysvillabelek.com/?lang=id"/>
      <xhtml:link rel="alternate" hreflang="en" href="https://fairwaysvillabelek.com/?lang=en"/>
      <xhtml:link rel="alternate" hreflang="tr" href="https://fairwaysvillabelek.com/?lang=tr"/>
      <xhtml:link rel="alternate" hreflang="ru" href="https://fairwaysvillabelek.com/?lang=ru"/>
      <xhtml:link rel="alternate" hreflang="x-default" href="https://fairwaysvillabelek.com/?lang=en"/>
      <priority>1.0</priority>
   </url>
   
</urlset>
```

---

## ✅ CHECKLIST UNTUK JUNIOR DEVELOPER / AI MODEL
Sebelum menandai pekerjaan ini selesai, pastikan Anda telah mencentang semua hal berikut:
- [ ] 4 File JSON (`id`, `en`, `tr`, `ru`) memiliki objek `seo` dan `aeoFacts`.
- [ ] Komponen `<SEOMeta />` sudah dibuat dan dipasang di komponen Root/Utama.
- [ ] Saat mengganti bahasa dari UI, *Title Tab Browser* ikut berubah otomatis sesuai bahasa.
- [ ] Mengecek `<head>` di browser *DevTools*, pastikan ada 4 tag `<link rel="alternate" hreflang="..."/>` untuk `id, en, tr, ru`.
- [ ] Mengecek `<head>`, pastikan ada tag `<script type="application/ld+json">` yang berisi tipe "VacationRental".
- [ ] Ada tag Semantic (seperti `<article>`, `<h2>`) yang menjelaskan secara deskriptif mengenai villa (AEO optimization).
- [ ] File `sitemap.xml` dan `robots.txt` sudah dibuat di dalam folder `public/`.
