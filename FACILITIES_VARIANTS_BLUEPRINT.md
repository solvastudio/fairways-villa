# 📘 Blueprint Implementasi: Varian Tab Fasilitas (Figma to Code)

Dokumen ini merupakan kelanjutan dari blueprint utama, difokuskan pada implementasi varian state (pill tab yang berbeda) pada bagian **Facilities** di halaman Detail Villa. Dokumen ini sangat esensial bagi Junior Developer agar mengerti cara membangun arsitektur komponen yang **DRY (Don't Repeat Yourself)** dan tidak melakukan *hardcode* untuk setiap tab.

**Link Desain Figma (Varian Tab):**
- [Living & Entertainment (385-400)](https://www.figma.com/design/I4I98jEJuKrW0kCuDXD8Tk/PORTOFOLIO-FINALLLLLLL?node-id=385-400&m=dev)
- [Outdoor Living (385-506)](https://www.figma.com/design/I4I98jEJuKrW0kCuDXD8Tk/PORTOFOLIO-FINALLLLLLL?node-id=385-506&m=dev)
- [Wellness & Activities (385-570)](https://www.figma.com/design/I4I98jEJuKrW0kCuDXD8Tk/PORTOFOLIO-FINALLLLLLL?node-id=385-570&m=dev)
- [Services & Transport (385-632)](https://www.figma.com/design/I4I98jEJuKrW0kCuDXD8Tk/PORTOFOLIO-FINALLLLLLL?node-id=385-632&m=dev)
- [Safety & General (385-698)](https://www.figma.com/design/I4I98jEJuKrW0kCuDXD8Tk/PORTOFOLIO-FINALLLLLLL?node-id=385-698&m=dev)

---

## 🏗️ 1. Arsitektur Data (Data Layer) - Pendekatan DRY

Figma memiliki 5-6 desain *frame* yang berbeda untuk setiap kategori yang diklik. **Jangan pernah** membuat 6 komponen React yang berbeda (`<FacilitiesComfort />`, `<FacilitiesWellness />`, dll). Itu adalah *Code Smell*.

### Solusi: Data-Driven Rendering
Buat sebuah file data statis (contoh: `src/data/villaDetails.tsx`) yang menampung seluruh struktur fasilitas.

```typescript
export interface FacilitySubcategory {
  id: string; // contoh: "bathroom"
  items: string[]; // contoh: ["towelsToiletries", "hairdryerSlippers"]
}

export interface FacilityCategoryData {
  id: string; // contoh: "wellnessActivities"
  titleKey: string; // Kunci i18n untuk Pill (misal: "villaDetail.wellnessActivities")
  subcategories: FacilitySubcategory[];
}

export const facilityCategoriesData: FacilityCategoryData[] = [
  // Masukkan 6 objek kategori di sini sesuai dengan grup dari desain Figma
];
```

---

## 🎨 2. Implementasi UI & Logika Render (Component Layer)

Di dalam komponen `VillaOverview.tsx`, Anda hanya perlu memanajemen satu *state* untuk mengetahui tab mana yang aktif.

```tsx
const [activeFacilityTab, setActiveFacilityTab] = useState<string>("inVillaComfort");
```

### A. Render Pills (Tab Kategori)
Gunakan fungsi `.map()` pada `facilityCategoriesData` untuk melakukan render semua tombol Pill.
- **State Inactive:** Background putih (`bg-white`), teks gelap (`text-text-dark`), border tipis (`border-primary/40`).
- **State Active:** Background aksen (`bg-primary`), teks putih (`text-white`), border tebal (`border-primary`).

### B. Render Konten Dinamis (Layout Kolom)
Tantangan dari desain Figma ini adalah jumlah subkategori (kolom) bisa berbeda tiap tab (ada yang 4 kolom, ada yang 2 kolom). Jangan panik, gunakan logika array sederhana:

1. Ambil data kategori yang sedang aktif:
   ```tsx
   const activeCategoryData = facilityCategoriesData.find(cat => cat.id === activeFacilityTab);
   const subcategories = activeCategoryData?.subcategories || [];
   ```

2. Pisahkan kolom utama dan kolom "General" (jika lebih dari 3):
   ```tsx
   const mainSubcategories = subcategories.length === 4 ? subcategories.slice(0, 3) : subcategories;
   const bottomSubcategory = subcategories.length === 4 ? subcategories[3] : null;
   ```

3. Render kolom dengan *divider* (garis pembatas vertikal) hanya di Desktop:
   ```tsx
   <div className="flex flex-col lg:flex-row gap-12 justify-center items-stretch w-full">
     {mainSubcategories.map((sub, idx) => (
       <React.Fragment key={sub.id}>
         {/* Render garis vertikal pembatas jika bukan item pertama */}
         {idx > 0 && <div className="hidden lg:block w-[1px] bg-[#c97a4a]/20 mx-[34px]" />}
         
         {/* Render List */}
         <div className="flex-1 w-full">
           <h4 className="text-[24px] uppercase">{t(sub.title)}</h4>
           <ul>...</ul>
         </div>
       </React.Fragment>
     ))}
   </div>
   ```

---

## 📱 3. Penyesuaian Responsif (Mobile-First)

Desain Figma yang diberikan adalah untuk Desktop (`1920px` atau `1440px`). Untuk mengadaptasinya ke *Mobile*:

1. **Stacking Kolom:** Pastikan pembungkus kolom menggunakan `flex-col lg:flex-row`. Ini akan membuat daftar menumpuk ke bawah di HP, dan berjajar ke samping di Desktop.
2. **Sembunyikan Garis Pembatas:** Gunakan `hidden lg:block` pada garis vertikal pembatas agar tidak muncul di HP.
3. **Pills Wrapping:** Bungkus deretan Pill dengan `flex-wrap` agar di HP tombol-tombol tersebut turun ke baris baru dan tidak terpotong (overflow).

---

## 🌍 4. Internasionalisasi (i18n)

Sebagai standar proyek, **jangan pernah menulis teks mentah (hardcode)** di dalam komponen.
Tambahkan semua teks kategori dan nama fasilitas ke dalam file translasi JSON Anda (`en/translation.json`, `tr/translation.json`, `ru/translation.json`).

Contoh di `translation.json`:
```json
"facilitiesSubcategories": {
  "pool": "Pool & Wellness",
  "activities": "Activities",
  "safety": "Safety & Security"
}
```
Lalu panggil di komponen menggunakan hook: `t('villaDetail.facilitiesSubcategories.pool')`.

---
**Status:** Dokumen ini siap dijadikan panduan oleh Junior Developer untuk segera mengeksekusi konversi UI tab dan layout secara dinamis.
