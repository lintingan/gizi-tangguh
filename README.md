# GiziTangguh Play — WebGIS Edukasi Ketahanan Pangan & Logistik Bencana

**GiziTangguh Play** adalah prototipe aplikasi WebGIS interaktif berbasis React, TypeScript, dan MapLibre GL JS yang mengintegrasikan pemetaan sebaran titik sumber pangan darurat, visualisasi poligon area kerawanan bencana simulasi, serta mini-game edukasi pengambilan keputusan alokasi logistik pangan bergizi (**Pangan Siaga**).

> **PERINGATAN RESMI:**  
> **DATA SIMULASI — BUKAN DATA RESMI.**  
> Seluruh koordinat, angka kapasitas tonase, estimasi kebutuhan posko, poligon area risiko, dan skor yang ditampilkan dalam aplikasi ini merupakan parameter fiktif untuk tujuan edukasi dan percontohan WebGIS. Aplikasi ini tidak mewakili dan belum diverifikasi oleh BNPB, Bapanas, Kemenkes, atau instansi pemerintah terkait.

---

## 1. Struktur Folder

```text
├── index.html                           # Entry HTML & metadata SEO
├── metadata.json                        # Metadata konfigurasi AI Studio
├── package.json                         # Dependensi dan skrip proyek
├── tsconfig.json                        # Konfigurasi TypeScript bundler
├── vite.config.ts                       # Konfigurasi build Vite
├── public/
│   └── data/
│       ├── sumber-pangan.geojson        # Dataset GeoJSON titik sumber pangan
│       └── area-risiko.geojson          # Dataset GeoJSON poligon risiko simulasi
└── src/
    ├── main.tsx                         # Entry point React 19
    ├── App.tsx                          # Konfigurasi React Router rute halaman
    ├── index.css                        # Tailwind CSS v4 & styling MapLibre
    ├── config/
    │   └── appConfig.ts                 # Konfigurasi wilayah, bencana, status
    ├── data/
    │   └── foodSourcesData.ts           # Single Source of Truth dataset demo
    ├── components/
    │   ├── common/
    │   │   └── SimulationBanner.tsx     # Banner penanda status simulasi
    │   ├── layout/
    │   │   ├── Navbar.tsx               # Header navigasi & responsif ponsel
    │   │   ├── Sidebar.tsx              # Sidebar navigasi desktop & ponsel
    │   │   └── AppLayout.tsx            # Shell pembungkus halaman utama
    │   └── map/
    │       ├── MapContainer.tsx         # Komponen peta interaktif MapLibre GL JS
    │       ├── MapLayerControls.tsx     # Kontrol sakelar layer & filter
    │       ├── MapLegend.tsx            # Legenda simbologi WebGIS
    │       └── FoodDetailModal.tsx      # Panel detail saat marker diklik
    ├── features/
    │   └── pangan-siaga/
    │       ├── types.ts                 # Definisi tipe TypeScript game
    │       ├── rules.ts                 # Definisi skenario & aturan validasi
    │       ├── scoring.ts               # Algoritma perhitungan skor simulasi
    │       └── engine.ts                # State machine & logika distribusi
    ├── pages/
    │   ├── DashboardPage.tsx            # Halaman / (Dashboard & metriks)
    │   ├── MapPage.tsx                  # Halaman /peta (Layar WebGIS penuh)
    │   ├── PanganSiagaPage.tsx          # Halaman /pangan-siaga (Game interaktif)
    │   ├── PiringPetualangPage.tsx      # Halaman /piring-petualang (Segera hadir)
    │   └── DataMetodologiPage.tsx       # Halaman /data-metodologi (Dokumentasi data)
    └── tests/
        └── pangan-siaga.test.ts         # Unit testing engine game (Vitest)
```

---

## 2. Dependensi Utama

- **React 19 & React DOM**: Library UI deklaratif berbasis komponen.
- **TypeScript**: Pengecekan tipe statis ketat di seluruh modul.
- **Vite 8**: Bundler modern dan dev server berkecepatan tinggi.
- **Tailwind CSS v4**: Utility-first CSS styling dengan skema warna hijau, netral, dan putih.
- **React Router DOM v7**: Navigasi SPA client-side antar halaman tanpa reload.
- **MapLibre GL JS (`maplibre-gl`)**: Engine rendering peta vektor GPU berbasis WebGL open-source.
- **Lucide React**: Ikonografi antarmuka yang konsisten dan informatif.
- **Vitest**: Framework pengujian unit modern untuk menguji logika bisnis game.

---

## 3. Cara Menjalankan Aplikasi

Pastikan Node.js (v18+) dan npm telah terpasang.

1. **Memasang dependensi:**
   ```bash
   npm install
   ```

2. **Menjalankan server pengembangan (Dev Server):**
   ```bash
   npm run dev
   ```
   Akses aplikasi melalui browser pada `http://localhost:3000`.

3. **Menjalankan pengujian unit:**
   ```bash
   npm run test
   ```

4. **Memeriksa tipe TypeScript (Lint):**
   ```bash
   npm run lint
   ```

5. **Membangun versi produksi:**
   ```bash
   npm run build
   ```

---

## 4. Cara Mengganti Data Demo

Aplikasi menggunakan pendekatan *Single Source of Truth* untuk mencegah kontradiksi antara Dashboard, Peta, dan Halaman Metodologi:

1. Buka file `src/data/foodSourcesData.ts`.
2. Edit array `FOOD_SOURCES_DATA` untuk menambah, mengubah, atau menghapus titik sumber pangan:
   - `id`: Kode identitas simpul (contoh: `"FS-09"`).
   - `name`: Nama simpul pangan (selalu sertakan kata 'Simulasi').
   - `category`: Kategori pangan (`"Lumbung Karbohidrat"`, `"Depo Logistik Darurat"`, `"Sentra Protein & Sayur"`, atau `"Gudang Penyangga Regional"`).
   - `longitude`, `latitude`: Koordinat desimal derajat dalam urutan `[longitude, latitude]`.
   - `capacity`, `unit`: Kapasitas stok dalam ton/kg.
   - `dataStatus`: Wajib `"DATA SIMULASI — DEMO"`.
3. Perbarui juga poligon pada array `RISK_SIMULATION_AREAS` untuk mengubah bentuk area kerentanan simulasi.
4. Perubahan pada file ini secara otomatis memperbarui angka ringkasan dashboard, marker peta MapLibre, dan tabel data.

---

## 5. Konfigurasi Wilayah Penelitian

Konfigurasi parameter umum prototipe dapat diubah langsung pada `src/config/appConfig.ts`:

```typescript
export const APP_CONFIG = {
  appName: 'GiziTangguh Play',
  version: '1.0.0-mvp',
  researchArea: 'BELUM DITETAPKAN', // Ubah jika ada wilayah studi spesifik (misal: "Kabupaten Sleman")
  disasterType: 'SIMULASI, BELUM DITETAPKAN', // Contoh: "Gempa Tektonik Sesar Darat"
  datasetStatus: 'DATA DEMO',
  dataSource: 'DATA LOKAL SIMULASI',
  // ...
};
```

---

## 6. Sumber & Lisensi Peta Dasar

- **Penyedia Gaya Peta**: [OpenFreeMap](https://openfreemap.org/)
- **URL Gaya Vektor**: `https://tiles.openfreemap.org/styles/liberty`
- **Konfigurasi Awal**:
  - Titik pusat Indonesia: `[117, -2]` (Longitude, Latitude).
  - Zoom awal: `4`.
  - Rentang zoom yang didukung: `3` hingga `16`.
- **Atribusi & Hak Cipta**:
  - Data peta dunia: © [OpenStreetMap contributors](https://www.openstreetmap.org/copyright) berlisensi ODbL.
  - Vektor tiles & hosting: © OpenFreeMap.

---

## 7. Keterbatasan Prototipe

1. **Data Fiktif**: Seluruh angka kapasitas, lokasi geografis depo, dan poligon risiko adalah model sintetik untuk demonstrasi arsitektur WebGIS.
2. **Tidak Terkoneksi Database Real-Time**: Pada tahap MVP ini, penyimpanan data bersifat lokal client-side tanpa backend database eksternal untuk menjamin kemudahan pengujian mandiri tanpa ketergantungan API key.
3. **Peta Offline**: Memerlukan koneksi internet saat memuat tile OpenFreeMap pertama kali. Jika jaringan terputus, sistem menyediakan mekanisme penanganan error dan tombol *Coba Muat Ulang Peta*.
4. **Bukan Rekomendasi Medis/Gizi Klinis**: Skor game adalah evaluasi alokasi kuota logistik darurat, bukan kalkulasi kecukupan gizi individu atau Angka Kecukupan Gizi (AKG).

---

## 8. Hasil Pengujian Aktual

Pengujian otomatis dijalankan menggunakan **Vitest** pada `src/tests/pangan-siaga.test.ts`.

| ID Uji | Kasus Uji | Ekspektasi | Hasil Aktual |
|---|---|---|---|
| **TEST-01** | Alokasi valid (A: 250kg, B: 200kg, C: 200kg, Total: 650kg) | Diterima, valid, parsedValues tepat | **LULUS (Passed)** |
| **TEST-02** | Total alokasi melebihi stok (300 + 250 + 250 = 800 > 650kg) | Ditolak dengan pesan error batas stok | **LULUS (Passed)** |
| **TEST-03** | Input angka negatif (misal: -50kg) | Ditolak dengan pesan nilai negatif dilarang | **LULUS (Passed)** |
| **TEST-04** | Input teks non-angka (misal: "seratus") | Ditolak dengan pesan wajib angka valid | **LULUS (Passed)** |
| **TEST-05** | Alokasi melebihi kebutuhan kelompok (A input 350kg > 300kg) | Ditolak dengan pesan melampaui kebutuhan kelompok | **LULUS (Passed)** |
| **TEST-06** | Alokasi bernilai 0 kg | Diterima sebagai keputusan tidak mendistribusikan | **LULUS (Passed)** |
| **TEST-07** | Formula skor rata-rata % (A: 80%, B: 80%, C: 60%) | Skor tepat: round(220 / 3) = 73 | **LULUS (Passed)** |
| **TEST-08** | Keputusan tidak valid tidak merubah stok/skor | Transaksi ditolak, outcome tetap null | **LULUS (Passed)** |
| **TEST-09** | Tombol Mulai Ulang (Reset) | Membersihkan seluruh input dan mengembalikan kondisi awal | **LULUS (Passed)** |
| **BUILD-01** | `tsc --noEmit` (TypeScript Linting) | Bebas dari error tipe (0 errors) | **LULUS (Passed)** |
| **BUILD-02** | `vite build` (Applet Compilation) | Berhasil dikompilasi ke chunk produksi | **LULUS (Passed)** |

---

## 9. Fitur yang Belum Dikembangkan (Roadmap Tahap Selanjutnya)

- **Mini-Game Piring Petualang**: Modul racikan gizi harian (*Isi Piringku*) berbasis bahan pangan lokal pasca-bencana (halaman saat ini berstatus *Segera hadir*).
- **Backend & Database Spasial**: Integrasi PostGIS / Cloud SQL untuk sinkronisasi data antar instansi resmi di kemudian hari jika disetujui.
- **Routing & Jaringan Jalan Evakuasi**: Analisis rute tercepat dari depo logistik menuju posko pengungsian menggunakan algoritma optimasi rute.
- **Autentikasi Multi-Peran**: Hak akses terpisah untuk Koordinator Posko, Pengelola Gudang, dan Administrator.
