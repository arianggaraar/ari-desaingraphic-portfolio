# Ari Anggara — Break The Mold Visual CV

Portfolio-CV eksperimental berbasis Next.js, Tailwind CSS, Framer Motion, dan GSAP.

## Jalankan

```bash
npm install
npm run dev
```

Buka `http://localhost:3000`.

## Update v5 Premium Pass

- Album section sekarang punya dua mode: **Grid Full** dan **Cinema Slide**.
- Semua artwork album ditampilkan dengan `object-contain` agar tidak terpotong.
- Modal album punya tools **Accent Color** dan **Image Tone** untuk simulasi arahan warna.
- Artwork nomor 08 sudah diganti menjadi **SmartHub QYEN Launch Promo**.
- Navbar avatar dan identity card memakai crop khusus agar foto lebih rapi dan tidak terasa patah.
- Resume Kit `/api/download-kit` berisi paket lebih lengkap:
  - Creative Dossier PDF
  - Editorial Resume DOC
  - Office Resume HTML
  - Portfolio Specification TXT
  - Project Catalogue CSV
  - 12 Album Artworks WebP

## Struktur penting

```txt
app/page.jsx
app/api/download-kit/route.js
components/QRCodeNeo.jsx
public/albums/album-01.webp ... album-12.webp
public/ari-avatar-square.png
public/ari-portrait-card.png
```


## v8 Optimization Notes
- Identity Card now uses the uploaded transparent cutout portrait for a more integrated UI look.
- Navbar avatar indicator dot removed.
- Resume download CTA refined for better text alignment.
- Profile card visual treatment updated to feel less template-like and more fused with the website system.


## v11 Preview Scale Fix
- Album modal preview tetap memakai komposisi v10/v255.
- Artwork di dalam frame preview diperkecil proporsional agar tampil lebih utuh dan tidak terasa terlalu besar.
- Frame preview diberi padding lebih lega sehingga artwork tidak menempel atau terkesan terpotong.


## Config Driven Version
Pengaturan utama sekarang ada di `lib/portfolio.config.js` dan data album ada di `lib/albums.data.js`.

Baca `README_CUSTOMIZATION.md` untuk panduan lengkap mengubah modal, navbar, warna, animasi, background, identity card, dan album.
