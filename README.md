# 🎭 P3R Portfolio — Ida Bagus Gede Widiastana Bawaskara

> Portfolio website bertema **Persona 3 Reload** — dibangun dengan React + TypeScript + Vite + Tailwind CSS + Framer Motion.

[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=flat-square&logo=vite)](https://vitejs.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-06B6D4?style=flat-square&logo=tailwindcss)](https://tailwindcss.com)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-FF0055?style=flat-square&logo=framer)](https://www.framer.com/motion)

---

## ✨ Fitur

- 🌑 **Dark Hour Aesthetic** — desain bertema P3R dengan cyan glow, CRT scanlines, dan vertical stripes
- 🎭 **Sticky Character** — karakter animasi fixed yang berganti di setiap section sesuai scroll
- ⌨️ **Keyboard Navigation** — navigasi antar section dengan `↑` `↓` atau `j` `k`
- 📜 **Scroll Hijacking** — Skills (400vh) & Projects (300vh horizontal scroll)
- 🃏 **Tarot Card Contact** — animasi kartu arcana untuk social links
- 💎 **Glassmorphism UI** — komponen glass card dengan backdrop blur

## 📁 Struktur

```
src/
├── animations/variants.ts      ← Framer Motion variants
├── hooks/useKeyboardNav.ts     ← Keyboard navigation
├── components/
│   ├── GlobalOverlays.tsx      ← Scanlines, background, stripes
│   ├── StickyCharacter.tsx     ← Fixed character overlay
│   ├── KeyboardHint.tsx        ← UI hint pojok kanan bawah
│   ├── shared.tsx              ← SlashLabel, GhostText, P3Divider, GlassCard
│   └── sections/
│       ├── S1_Welcome.tsx
│       ├── S2_About.tsx
│       ├── S3_Skills.tsx
│       ├── S4_Projects.tsx
│       └── S5_Contact.tsx
└── App.tsx                     ← Root assembly
```

## 🚀 Menjalankan Lokal

```bash
npm install
npm run dev
```

Buka `http://localhost:5173`

## 🛠️ Tech Stack

| Tech | Versi |
|---|---|
| React | 18 |
| TypeScript | 5 |
| Vite | 8 |
| Tailwind CSS | 3 |
| Framer Motion | 12 |

---

© 2026 GusWid — Powered by Dark Hour
