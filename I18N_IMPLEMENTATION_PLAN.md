# Panduan Implementasi Internationalization (i18n) - English, Turkish, Russian

## 🎯 Objektif Utama
Panduan ini dirancang khusus untuk memandu proses penambahan fitur multi-bahasa (Bahasa Inggris `en`, Turki `tr`, dan Rusia `ru`) pada proyek website Fairways Villa. Tujuan utamanya adalah memastikan **TIDAK ADA *raw string*** (teks statis yang diketik langsung) di dalam seluruh komponen React. Semuanya harus diganti dengan sistem translasi yang dinamis, menerapkan arsitektur *Clean Code*, DRY (Don't Repeat Yourself), dan komponen yang *reusable*.

---

## 🛠️ Langkah 1: Persiapan dan Instalasi Dependensi
Jalankan perintah ini di dalam terminal pada *root* direktori proyek untuk menginstal *library* standar industri untuk i18n di ekosistem React.

```bash
npm install i18next react-i18next i18next-browser-languagedetector
```
* **`i18next`**: Inti dari sistem translasi.
* **`react-i18next`**: Binding (pengikat) agar i18next bekerja secara reaktif dengan komponen React.
* **`i18next-browser-languagedetector`**: Plugin untuk otomatis mendeteksi bahasa bawaan browser pengguna.

---

## 🏗️ Langkah 2: Pembuatan Struktur File Translasi (Best Practices)
**DILARANG** menyatukan semua bahasa di dalam satu file. Pisahkan teks berdasarkan bahasa, dan gunakan pola bersarang (*nested object*) agar rapi dan tidak ada duplikasi.

Buat folder `src/locales/` dan buat file JSON untuk setiap bahasa:
- `src/locales/en/translation.json` (Bahasa Inggris)
- `src/locales/tr/translation.json` (Bahasa Turki)
- `src/locales/ru/translation.json` (Bahasa Rusia)

### Contoh Pola Struktur File JSON (Nested Hierarchy):
**`src/locales/en/translation.json`:**
```json
{
  "navigation": {
    "about": "ABOUT",
    "accommodation": "ACCOMMODATION",
    "contactUs": "CONTACT US",
    "gallery": "GALLERY",
    "location": "LOCATION"
  },
  "hero": {
    "title": "Welcome to Fairways Villa",
    "subtitle": "Your luxury escape in Belek"
  },
  "footer": {
    "address": "Kadriye mahallesi 134.sokak no 7a Villa, 07525 Belek, Turkey",
    "rights": "SOLVA STUDIO ALL RIGHTS RESERVED"
  }
}
```
*(Wajib menerjemahkan nilai teks di atas ke dalam bahasa Turki dan Rusia pada file JSON yang sesuai, tetapi **pertahankan format *key* sebelah kirinya agar tetap sama persis**)*.

---

## ⚙️ Langkah 3: Konfigurasi i18n
Buat satu file konfigurasi khusus untuk mengatur bagaimana sistem i18n akan berjalan.

Buat file baru di **`src/i18n.ts`** dan isi dengan kode berikut:
```typescript
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Impor semua file JSON translasi
import translationEN from './locales/en/translation.json';
import translationTR from './locales/tr/translation.json';
import translationRU from './locales/ru/translation.json';

const resources = {
  en: { translation: translationEN },
  tr: { translation: translationTR },
  ru: { translation: translationRU }
};

i18n
  .use(LanguageDetector) // Mendeteksi bahasa dari browser secara otomatis
  .use(initReactI18next) // Menyambungkan ke React
  .init({
    resources,
    fallbackLng: 'en', // Jika sistem gagal, kembali ke Bahasa Inggris (Default)
    debug: false,      // Set true jika butuh melihat log error di console browser
    interpolation: {
      escapeValue: false, // React sudah otomatis mencegah serangan XSS
    }
  });

export default i18n;
```

**SANGAT PENTING:** Buka file *entry point* (biasanya `src/routes/__root.tsx` atau `src/main.tsx`) dan lakukan import file konfigurasi ini di baris paling atas agar i18n aktif saat website dimuat:
```typescript
import '../i18n'; // Sesuaikan path jika perlu
```

---

## 🌐 Langkah 4: Pembuatan Komponen Reusable (Language Switcher)
Buat satu komponen tombol pemilih bahasa yang bisa dipanggil (*reusable*) di mana saja, seperti Navbar atau Footer.

Buat file **`src/components/LanguageSwitcher.tsx`**:
```tsx
import React from 'react';
import { useTranslation } from 'react-i18next';

export const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  // Fungsi helper untuk styling tombol aktif
  const getBtnClass = (lng: string) => 
    `uppercase text-sm cursor-pointer hover:opacity-70 transition-opacity ${
      i18n.resolvedLanguage === lng ? 'font-bold text-blue-600' : 'font-normal text-gray-800'
    }`;

  return (
    <div className="flex gap-3 items-center">
      <button onClick={() => changeLanguage('en')} className={getBtnClass('en')}>EN</button>
      <span className="text-gray-400 select-none">|</span>
      <button onClick={() => changeLanguage('tr')} className={getBtnClass('tr')}>TR</button>
      <span className="text-gray-400 select-none">|</span>
      <button onClick={() => changeLanguage('ru')} className={getBtnClass('ru')}>RU</button>
    </div>
  );
};
```

---

## 💻 Langkah 5: Migrasi Komponen (Menghapus Raw Strings / Code Smell)
Langkah ini harus diulangi pada **SETIAP** file komponen di dalam folder `src/components/` dan `src/routes/`. Dilarang keras ada *raw string* yang tertinggal.

1. **Impor Hook `useTranslation`** di bagian atas file.
2. **Panggil fungsi `t`** di dalam komponen utama.
3. **Ganti *hardcoded text*** dengan pemanggilan `t('key.lokasi')`.

### Contoh Migrasi Komponen Footer
**SEBELUM (Terdapat Code Smell / Raw String):**
```tsx
export default function LocationFooter() {
  return (
    <footer>
      <p>Kadriye mahallesi 134.sokak no 7a Villa, 07525 Belek, Turkey</p>
      <span>SOLVA STUDIO ALL RIGHTS RESERVED</span>
    </footer>
  );
}
```

**SESUDAH (Best Practice, DRY, Clean Code):**
```tsx
import { useTranslation } from 'react-i18next'; // 1. Impor hook

export default function LocationFooter() {
  const { t } = useTranslation(); // 2. Inisialisasi

  return (
    <footer>
      {/* 3. Panggil kunci translasi yang cocok di JSON */}
      <p>{t('footer.address')}</p>
      <span>{t('footer.rights')}</span>
    </footer>
  );
}
```

---

## 🚨 Aturan Tambahan (Strict Rules)
- **TIDAK ADA PENGECUALIAN:** Semua komponen seperti Judul, Sub-judul, Label Tombol, Teks Alamat, dan Navigasi Tautan wajib diganti.
- **ARRAY TRANSLATION:** Jika ada teks berupa daftar poin (*bullet points*), simpan sebagai Array di dalam JSON. Saat memanggilnya di komponen React, gunakan opsi `returnObjects`:
  ```tsx
  const facilities = t('villa.facilitiesList', { returnObjects: true }) as string[];
  // Lalu mapping dengan: facilities.map(...)
  ```
- **KONSISTENSI KEY:** Gunakan format `camelCase` (seperti `contactUs`, bukan `ContactUs` atau `contact_us`) pada *keys* di dalam file JSON.
