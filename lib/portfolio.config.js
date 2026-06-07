// lib/portfolio.config.js
// Semua pengaturan utama website ada di sini.
// Ubah angka/nilai di file ini agar tidak perlu bongkar class Tailwind panjang di app/page.jsx.

export const PROFILE = {
  name: "Ari Anggara",
  subtitle: "Visual CV / Commercial Album",
  headline: "Graphic Designer / Commercial Visual Artist",
  age: "24 Tahun",
  birthday: "Cirebon, 18 September 2001",
  address: "Talun, Cempaka, Jl. Raden Cempah 1, Cirebon 45171",
  gps: "-6.7431002, 108.5114999",

  wa: "087847386701",
  facebook: "Ari Anggara",
  tiktok: "@arianggaraar",
  github: "arianggaraar@gmail.com",
  email: "arianggaraar@gmail.com",

  profileImage: "/ari-profile.png",
  avatarImage: "/ari-avatar-square.png",
  portraitImage: "/ari-portrait-transparent.png",
  resumeKit: "/api/download-kit",
};

export const STACKS = [
  "Figma",
  "Adobe Photoshop",
  "Adobe Illustrator",
  "Adobe Premiere",
  "Canva",
];

export const GLITCH_WORDS = [
  "VISUAL",
  "CAMPAIGN",
  "POSTER",
  "BENTO",
  "BRUTAL",
  "NEON",
  "CV",
  "AD KIT",
  "LAYOUT",
  "ARI",
  "ANGGARA",
];

export const IMAGE_FILTERS = {
  original: "none",
  mono: "grayscale(1) contrast(1.04)",
  cool: "hue-rotate(180deg) saturate(1.05)",
  warm: "hue-rotate(-18deg) saturate(1.08) brightness(1.02)",
};

export const THEME_TUNE = {
  dark: {
    bg: "#111111",
    fg: "#F4ECD8",
    panel: "#171411",
    accent: "#fbc512ff",
    muted: "#2A2A2A",
  },

  light: {
    bg: "#F4ECD8",
    fg: "#171411",
    panel: "#EFE2C6",
    accent: "#3b9f73ff",
    muted: "#DDCFB3",
  },
};

export const NAVBAR_TUNE = {
  // Tinggi navbar saat posisi normal.
  heightNormal: 84,

  // Tinggi navbar saat halaman discroll.
  heightSmall: 66,

  // Menu navbar. Kalau tambah section, tambahkan id section di sini.
  menu: [
    { id: "hero", label: "Manifesto" },
    { id: "albums", label: "Albums" },
    { id: "command", label: "Command" },
  ],

  buttonClass:
    "border px-4 py-2 font-mono text-xs uppercase tracking-[0.18em] transition",

  activeClass:
    "border-[var(--accent)] bg-[var(--panel)] text-[var(--accent)]",

  inactiveClass:
    "border-current hover:bg-[var(--fg)] hover:text-[var(--bg)]",
};

export const SECTION_TUNE = {
  // Padding section utama.
  topPaddingDesktop: "104px",
  topPaddingCompact: "88px",

  hero: {
    titleSize: "clamp(5.6rem, 9.2vw, 10.8rem)",
  },

  albums: {
    titleSize: "clamp(4.8rem, 5.2vw, 7rem)",
    gridColumns: "grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6",
    cardMinHeight: "160px",
  },

  command: {
    gridLayout: "lg:grid-cols-[0.95fr_1.05fr]",
    titleSize: "clamp(4.1rem, 7.8vw, 8rem)",
  },
};

export const BACKGROUND_TUNE = {
  enabled: true,

  // Opacity canvas background.
  opacity: 0.55,

  // Jumlah partikel minimum/maksimum.
  minParticles: 44,
  maxParticles: 88,

  // Semakin kecil nilainya, semakin banyak partikel.
  particleDensity: 20,

  // Jarak garis antar partikel.
  lineDistance: 146,

  // Radius interaksi mouse.
  mouseRadius: 180,

  // Kekuatan dorongan mouse.
  mouseForce: 2.2,

  // Warna partikel/garis mode gelap.
  darkDot: "rgba(255, 230, 88, 0.72)",
  darkLine: "rgba(185,255,0,0.12)",

  // Warna partikel/garis mode terang.
  lightDot: "rgba(23,20,17,0.58)",
  lightLine: "rgba(23,20,17,0.12)",
};

export const ANIMATION_TUNE = {
  preloader: {
    enabled: true,
    duration: 1500,
    wordSpeed: 75,
  },

  reveal: {
    y: 70,
    opacity: 0,
    duration: 0.9,
    stagger: 0.08,
    ease: "power4.out",
    start: "top 72%",
    end: "bottom 20%",
  },

  magnetic: {
    navbar: 0.16,
    button: 0.14,
    card: 0.13,
    albumCard: 0.018,
  },

  carousel: {
    speedBase: 18,
    speedPerItem: 4.8,
    wheelBoost: 2.7,
  },
};

export const MODAL_TUNE = {
  // ==============================
  // JARAK MODAL DARI NAVBAR FIXED
  // ==============================

  // Kalau garis atas modal ketutup navbar, naikkan angka ini.
  modalTopOffset: "92px",

  // Jarak bawah modal dari layar.
  modalBottomOffset: "18px",

  // ==============================
  // UKURAN MODAL UTAMA
  // ==============================

  modalMaxWidth: "1120px",
  modalViewportWidth: "94vw",

  // Tinggi dihitung dari sisa layar setelah dikurangi navbar.
  modalMaxHeight: "calc(100vh - 92px - 18px)",

  // ==============================
  // PEMBAGIAN KOLOM
  // ==============================

  // Area kiri / preview gambar.
  leftColumn: "1.14fr",

  // Area kanan / deskripsi project.
  rightColumn: "0.86fr",

  // ==============================
  // FRAME PREVIEW GAMBAR
  // ==============================

  previewMinHeight: "430px",
  previewPadding: "38px",
  imageMaxWidth: "86%",
  imageMaxHeight: "86%",

  previewBorderWidth: "1px",
  previewBorderColor: "rgba(244, 236, 216, 0.22)",
  previewFrameBg: "rgba(0, 0, 0, 0.28)",

  // ==============================
  // KOLOM TEKS / DETAIL PROJECT
  // ==============================

  textColumnPadding: "28px",
  textTitleSize: "clamp(2.8rem, 4vw, 4.8rem)",
  textDescSize: "clamp(1rem, 1.2vw, 1.32rem)",
  textGapTop: "22px",
  toolsGapTop: "30px",

  // ==============================
  // BORDER / EFFECT MODAL
  // ==============================

  modalBorderWidth: "1px",
  modalShadow: "14px 14px 0 var(--modalAccent)",

  // Garis pemisah antara gambar dan deskripsi.
  textColumnBorderWidth: "1px",
  textColumnBorderColor: "rgba(244, 236, 216, 0.65)",

  // Garis horizontal dalam kolom deskripsi.
  textDividerColor: "rgba(244, 236, 216, 0.65)",

  // ==============================
  // COLOR SWATCH
  // ==============================

  colorSwatchWidth: "78px",
  colorSwatchHeight: "54px",
};

export const IDENTITY_CARD_TUNE = {
  imageColumn: "0.36fr",
  textColumn: "0.64fr",

  // Kalau foto masih kepotong, kecilkan ke "92%" atau "88%".
  portraitHeight: "98%",

  portraitShadow: "0 16px 34px rgba(0,0,0,0.58)",
  accentBarWidth: "12px",

  nameSize: "clamp(2.1rem, 3.5vw, 4.25rem)",
  descSize: "clamp(0.86rem, 0.98vw, 1.08rem)",
};
