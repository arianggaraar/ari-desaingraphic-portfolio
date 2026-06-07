# Ari Anggara Portfolio — Config Driven Guide

Project ini sudah dibuat lebih mudah diatur melalui file config:

```txt
lib/portfolio.config.js
lib/albums.data.js
```

## 1. Ubah Warna Light/Dark

Buka:

```txt
lib/portfolio.config.js
```

Cari:

```js
export const THEME_TUNE = {
  dark: {
    bg: "#111111",
    fg: "#F4ECD8",
    panel: "#171411",
    accent: "#B9FF00",
    muted: "#2A2A2A",
  },

  light: {
    bg: "#F4ECD8",
    fg: "#171411",
    panel: "#EFE2C6",
    accent: "#FF5A1F",
    muted: "#DDCFB3",
  },
};
```

Yang paling sering diubah:

```js
accent
bg
panel
```

---

## 2. Atur Navbar

Cari:

```js
export const NAVBAR_TUNE = {
  heightNormal: 84,
  heightSmall: 66,
  menu: [
    { id: "hero", label: "Manifesto" },
    { id: "albums", label: "Albums" },
    { id: "command", label: "Command" },
  ],
};
```

Kalau ingin tambah menu baru, tambahkan:

```js
{ id: "services", label: "Services" }
```

Pastikan di `page.jsx` ada section dengan id yang sama:

```jsx
<section id="services">
```

---

## 3. Atur Background Particle

Cari:

```js
export const BACKGROUND_TUNE = {
  enabled: true,
  opacity: 0.55,
  minParticles: 44,
  maxParticles: 88,
  particleDensity: 20,
  lineDistance: 146,
  mouseRadius: 180,
  mouseForce: 2.2,
};
```

Lebih ramai:

```js
particleDensity: 14,
maxParticles: 120,
```

Lebih minimal:

```js
particleDensity: 28,
maxParticles: 60,
opacity: 0.35,
```

Matikan background:

```js
enabled: false,
```

---

## 4. Atur Animasi

Cari:

```js
export const ANIMATION_TUNE = {
  preloader: {
    enabled: true,
    duration: 1500,
    wordSpeed: 75,
  },

  reveal: {
    y: 70,
    duration: 0.9,
    stagger: 0.08,
  },
};
```

Preloader lebih cepat:

```js
duration: 900,
wordSpeed: 50,
```

Reveal lebih smooth:

```js
duration: 1.2,
stagger: 0.12,
```

---

## 5. Atur Modal Preview Album

Cari:

```js
export const MODAL_TUNE = {
  modalTopOffset: "92px",
  modalBottomOffset: "18px",
  modalMaxWidth: "1120px",
  modalViewportWidth: "94vw",
  modalMaxHeight: "calc(100vh - 92px - 18px)",

  leftColumn: "1.14fr",
  rightColumn: "0.86fr",

  previewMinHeight: "430px",
  previewPadding: "38px",
  imageMaxWidth: "86%",
  imageMaxHeight: "86%",
};
```

Kalau modal tertutup navbar:

```js
modalTopOffset: "100px",
modalMaxHeight: "calc(100vh - 100px - 18px)",
```

Kalau gambar preview terlalu besar:

```js
imageMaxWidth: "80%",
imageMaxHeight: "80%",
previewPadding: "44px",
```

Kalau gambar preview terlalu kecil:

```js
imageMaxWidth: "92%",
imageMaxHeight: "92%",
previewPadding: "28px",
```

Kalau ingin kolom gambar lebih lebar:

```js
leftColumn: "1.25fr",
rightColumn: "0.75fr",
```

Kalau ingin kolom teks lebih lebar:

```js
leftColumn: "1fr",
rightColumn: "1fr",
```

---

## 6. Atur Border / Garis Modal

Cari:

```js
previewBorderWidth: "1px",
previewBorderColor: "rgba(244, 236, 216, 0.22)",
textColumnBorderWidth: "1px",
textColumnBorderColor: "rgba(244, 236, 216, 0.65)",
textDividerColor: "rgba(244, 236, 216, 0.65)",
```

Garis lebih tipis / soft:

```js
textColumnBorderColor: "rgba(244, 236, 216, 0.28)",
textDividerColor: "rgba(244, 236, 216, 0.28)",
```

Garis lebih tegas:

```js
textColumnBorderWidth: "2px",
textColumnBorderColor: "rgba(244, 236, 216, 0.85)",
```

---

## 7. Atur Identity Card

Cari:

```js
export const IDENTITY_CARD_TUNE = {
  imageColumn: "0.36fr",
  textColumn: "0.64fr",
  portraitHeight: "98%",
  nameSize: "clamp(2.1rem, 3.5vw, 4.25rem)",
  descSize: "clamp(0.86rem, 0.98vw, 1.08rem)",
};
```

Kalau foto masih terpotong:

```js
portraitHeight: "88%",
```

Kalau foto terlalu kecil:

```js
portraitHeight: "104%",
```

Kalau nama terlalu besar:

```js
nameSize: "clamp(1.8rem, 3vw, 3.7rem)",
```

---

## 8. Tambah Album Baru

Buka:

```txt
lib/albums.data.js
```

Tambahkan object baru:

```js
{
  id: 13,
  category: "Produk",
  title: "QYEN Smart Sensor Campaign",
  desc: "Visual promosi sensor smart home untuk campaign digital.",
  code: "QS-13",
  palette: ["#B9FF00", "#111111", "#F4ECD8"],
  image: "/albums/album-13.webp",
}
```

Lalu masukkan gambar ke:

```txt
public/albums/album-13.webp
```

Jika kategori baru, tambahkan ke:

```js
export const CATEGORIES = [
  "Semua",
  "Produk",
  "Diskon",
  "Undangan",
  "Hari Spesial",
  "Perusahaan",
  "Politik",
  "Kategori Baru",
];
```

---

## 9. Jalankan Project

```bash
npm install
npm run dev
```

Buka:

```txt
http://localhost:3000
```
