# Perada Batik — Website

Website butik batik multi-page: React 18 + Vite 5, Tailwind CSS 4, React Router 6, Framer Motion, Lucide React.

## Menjalankan

```bash
npm install
npm run dev       # http://localhost:5173
npm test          # tes logika filter, validasi formulir, dan integritas data
npm run build     # hasil produksi di dist/
npm run preview   # cek hasil build secara lokal
```

## Halaman

| Route | Halaman |
|---|---|
| `/` | Home |
| `/koleksi` | Katalog — filter jenis/motif/warna/harga, pencarian, urutan, "Muat Lebih Banyak" (semua tersimpan di URL) |
| `/koleksi/:slug` | Detail produk — galeri, ukuran, stok, keranjang, WhatsApp, cerita motif, produk serupa |
| `/tentang-kami` | Kisah, visi-misi, nilai, proses, komitmen |
| `/filosofi-batik` | Motif, asal daerah, makna, produk terkait |
| `/kontak` | Info kontak, formulir, peta |
| `/keranjang` | Keranjang (tersimpan di browser) dan pemesanan via WhatsApp |

## Sebelum online — wajib diisi

1. **`src/data/business.js`** — nomor WhatsApp, email, alamat, jam buka, media sosial, URL embed Google Maps.
   Kolom kosong disembunyikan; tombol WhatsApp nonaktif sampai nomor diisi.
2. **Formulir kontak** — salin `.env.example` menjadi `.env`, isi `VITE_CONTACT_ENDPOINT`
   (mis. Formspree). Tanpa endpoint, formulir memberi tahu pengunjung bahwa pesan *belum* terkirim.
3. **Konten Tentang Kami** (`src/pages/About.jsx`, bagian bertanda `GANTI`) — sesuaikan dengan cerita asli. Belum ada klaim tahun berdiri, sertifikasi, atau "100% handmade".
4. **Makna motif** (`src/data/motifs.js`) — ringkasan tafsiran umum; verifikasi dengan sumber Anda.
5. **Foto** — foto di `public/foto/` saat ini adalah foto **sementara** berlisensi bebas dari Wikimedia Commons
   (kreditnya tampil di footer, wajib untuk CC BY / CC BY-SA). Ganti dengan foto produk dan model milik
   Perada Batik: simpan di `public/foto/`, lalu sesuaikan `src/data/photos.js` (id, alt, ukuran; kosongkan
   `author` untuk foto milik sendiri). Produk memakai `images: ['/foto/a.webp', ...]`.
   Tanpa foto, website menggambar motif kain secara otomatis. Kompres foto (WebP, sisi terpanjang ±1200 px).

## Dua bahasa (Indonesia / English)

Bahasa Indonesia adalah bahasa utama; pengunjung bisa beralih ke English lewat tombol **ID / EN** di navbar
(pilihan diingat di browser). URL sama untuk kedua bahasa.

- Teks di komponen: `const { t } = useLang()` lalu `t('teks Indonesia', 'English text')`.
- Data (`products.js`, `motifs.js`, `photos.js`, `business.js`): teks Indonesia di kolom biasa, terjemahan di
  kolom `en`. Bila terjemahan kosong, teks Indonesia yang tampil. `npm test` memastikan tidak ada yang terlewat.

## Struktur

```
src/
  main.jsx               router (lazy per halaman), provider keranjang
  index.css              token warna & font, kelas tombol
  layouts/RootLayout.jsx navbar, footer, transisi halaman, scroll restoration
  pages/                 satu file per route + NotFound, ErrorPage
  components/            Navbar, MobileNavigation, Footer, Breadcrumb, PageHeader,
                         SectionHeading, ProductCard, ProductGrid, ProductFilter,
                         CTASection, ContactForm, BackToTop, Motif (generator pola SVG), dll.
  context/CartContext.jsx
  data/                  business.js, products.js, motifs.js, photos.js
  lib/                   catalog.js (filter/urut), utils.js (format, meta, validasi, WhatsApp)
```

## Deploy

**GitHub Pages** (aktif): `npm run deploy` — build dengan base `/peradabatik/`, menyalin `index.html` ke `404.html`
agar refresh di halaman dalam tetap jalan, lalu mengunggah `dist/` ke branch `gh-pages`.
Situs: https://linthlz.github.io/peradabatik/

Hosting di akar domain (Netlify / Vercel / domain sendiri): `npm run build` biasa; SPA fallback sudah disiapkan
lewat `public/_redirects` (Netlify) dan `vercel.json` (Vercel).

## Warna

Ivory `#FEF3E2`, Amber `#F4AE52`, Terracotta `#D4621A`, Espresso `#2A1A0E`.
Tombol utama memakai terracotta yang sedikit lebih gelap (`#B04E16`) karena teks ivory di atas `#D4621A`
hanya mencapai kontras 3,4:1 (di bawah standar WCAG AA 4,5:1). Ubah di `@theme` pada `src/index.css` bila perlu.
