# 🎭 PERSONA 3 RELOAD — PORTFOLIO MASTER PROMPT
**Stack: React + TypeScript + Vite + Tailwind CSS + Framer Motion**
**IDE: Antigravity**

---

## ⚠️ BACA INI SEBELUM EKSEKUSI

Prompt ini adalah **satu kesatuan instruksi** yang harus dieksekusi secara berurutan.
Setiap section memiliki **dependensi** terhadap komponen global yang dibuat di awal.
Jangan skip bagian manapun.

---

## 📁 STRUKTUR FILE YANG AKAN DIBUAT

```
src/
├── index.css                    ← CSS variables, fonts, global styles
├── App.tsx                      ← Root: global overlays + section assembly
├── animations/
│   └── variants.ts              ← Semua Framer Motion variants
├── hooks/
│   ├── useKeyboardNav.ts        ← Keyboard navigation hook
│   └── useSectionProgress.ts   ← Scroll progress per section
├── components/
│   ├── GlobalOverlays.tsx       ← Scanlines, stripes, bg gradient
│   ├── StickyCharacter.tsx      ← Karakter global fixed overlay
│   ├── KeyboardHint.tsx         ← UI hint ↑↓ pojok kanan bawah
│   └── sections/
│       ├── S1_Welcome.tsx
│       ├── S2_About.tsx
│       ├── S3_Skills.tsx
│       ├── S4_Projects.tsx
│       └── S5_Contact.tsx
public/
├── images/
│   ├── char_welcome.png         ← placeholder
│   ├── char_about.png           ← placeholder
│   ├── char_skills.png          ← placeholder
│   ├── char_projects.png        ← placeholder
│   └── char_footer.png          ← placeholder
└── audio/
    └── (opsional — kosongkan dulu)
```

---

## 🎨 STEP 1 — DESIGN TOKENS & GLOBAL STYLES

### `src/index.css`

```css
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Orbitron:wght@400;700;900&family=Rajdhani:wght@500;600;700&display=swap');

:root {
  /* ── BACKGROUNDS ─────────────────────────── */
  --bg-base:        #030810;
  --bg-layer:       #060d1f;
  --bg-card:        rgba(6, 13, 31, 0.82);

  /* ── CYAN — signature P3 Reload ──────────── */
  --cyan:           #00BFFF;
  --cyan-hover:     #33CFFF;
  --cyan-dim:       rgba(0, 191, 255, 0.45);
  --cyan-ghost:     rgba(0, 191, 255, 0.06);
  --cyan-glow-sm:   0 0 10px rgba(0,191,255,0.7), 0 0 25px rgba(0,191,255,0.35);
  --cyan-glow-lg:   0 0 20px rgba(0,191,255,1),   0 0 60px rgba(0,191,255,0.5), 0 0 100px rgba(0,191,255,0.2);

  /* ── TEXT ────────────────────────────────── */
  --text-primary:   #FFFFFF;
  --text-dim:       rgba(255, 255, 255, 0.65);
  --text-ghost:     rgba(255, 255, 255, 0.025);

  /* ── STRIPES ─────────────────────────────── */
  --stripe-thick:   4px;
  --stripe-thin:    1px;
  --stripe-color:   #00BFFF;
  --stripe-dim:     rgba(0, 191, 255, 0.15);

  /* ── BORDERS ─────────────────────────────── */
  --border-subtle:  rgba(0, 191, 255, 0.2);
  --border-active:  rgba(0, 191, 255, 0.55);

  /* ── SCANLINE ────────────────────────────── */
  --scanline:       rgba(0, 0, 0, 0.055);
}

* { box-sizing: border-box; margin: 0; padding: 0; }

html {
  scroll-behavior: smooth;
  background: var(--bg-base);
  color: var(--text-primary);
}

body {
  font-family: 'Rajdhani', sans-serif;
  font-weight: 600;
  overflow-x: hidden;
}

/* Utility */
.font-bebas    { font-family: 'Bebas Neue', sans-serif; }
.font-orbitron { font-family: 'Orbitron', monospace; }
.font-rajdhani { font-family: 'Rajdhani', sans-serif; }
```

### `tailwind.config.ts` — extend section:

```ts
theme: {
  extend: {
    colors: {
      'p3-black':  '#030810',
      'p3-navy':   '#060d1f',
      'p3-cyan':   '#00BFFF',
      'p3-cyan-h': '#33CFFF',
      'p3-dim':    'rgba(0,191,255,0.45)',
    },
    fontFamily: {
      bebas:    ['Bebas Neue', 'sans-serif'],
      orbitron: ['Orbitron', 'monospace'],
      rajdhani: ['Rajdhani', 'sans-serif'],
    },
    boxShadow: {
      'cyan-sm': '0 0 10px rgba(0,191,255,0.7), 0 0 25px rgba(0,191,255,0.35)',
      'cyan-lg': '0 0 20px rgba(0,191,255,1), 0 0 60px rgba(0,191,255,0.5)',
    },
  }
}
```

---

## 🌐 STEP 2 — GLOBAL OVERLAYS

### `src/components/GlobalOverlays.tsx`

Komponen ini di-render **sekali** di root `App.tsx`, di luar semua section.
Berisi 3 elemen fixed yang tidak boleh diulang:

```tsx
export function GlobalOverlays() {
  return (
    <>
      {/* 1. Animated background — pengganti video */}
      <div
        className="fixed inset-0 -z-10 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 60% 70% at 78% 50%, rgba(0,50,110,0.45) 0%, transparent 65%),
            radial-gradient(ellipse 45% 55% at 18% 50%, rgba(0,25,75,0.35) 0%, transparent 60%),
            #030810
          `
        }}
      />

      {/* 2. Scanline CRT overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-[9999]"
        style={{
          backgroundImage: `repeating-linear-gradient(
            0deg,
            transparent, transparent 3px,
            rgba(0,0,0,0.055) 3px, rgba(0,0,0,0.055) 4px
          )`
        }}
      />

      {/* 3. Vertical stripes — kanan layar */}
      <div
        className="fixed top-0 right-0 bottom-0 w-[4px] z-50 pointer-events-none"
        style={{
          background: 'var(--stripe-color)',
          boxShadow: '0 0 14px #00BFFF, 0 0 30px rgba(0,191,255,0.4)',
        }}
      />
      <div
        className="fixed top-0 right-[9px] bottom-0 w-[1px] z-50 pointer-events-none"
        style={{ background: 'var(--stripe-dim)' }}
      />
    </>
  )
}
```

---

## 🎭 STEP 3 — STICKY CHARACTER OVERLAY (GLOBAL)

### `src/components/StickyCharacter.tsx`

Ini adalah **satu komponen fixed** yang mengelola SEMUA animasi karakter di seluruh halaman.
Render sekali di `App.tsx`. Ia membaca scroll progress global dan bereaksi.

```tsx
'use client'
import { useScroll, useTransform, motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

const PHASES = [
  // [scrollStart, scrollEnd, imgSrc, x%, y%, scale, opacity]
  { start: 0,    end: 0.15, img: '/images/char_welcome.png',  x: '50%',  y: '10%', scale: 1.0,  bottom: '0%', right: 'auto', left: '50%', transform: 'translateX(-50%)' },
  { start: 0.15, end: 0.35, img: '/images/char_about.png',    x: 'auto', y: 'auto', scale: 0.82, bottom: '0',  right: '2%',  left: 'auto', transform: 'none' },
  { start: 0.35, end: 0.55, img: '/images/char_skills.png',   x: 'auto', y: 'auto', scale: 0.82, bottom: '0',  right: 'auto', left: '2%',  transform: 'none' },
  { start: 0.55, end: 0.78, img: '/images/char_projects.png', x: 'auto', y: 'auto', scale: 0.80, bottom: '0',  right: '3%',  left: 'auto', transform: 'none' },
  { start: 0.78, end: 1.0,  img: '/images/char_footer.png',   x: '50%',  y: 'auto', scale: 1.1,  bottom: '0',  right: 'auto', left: '50%', transform: 'translateX(-50%)' },
]

export function StickyCharacter() {
  const { scrollYProgress } = useScroll()
  const [activePhase, setActivePhase] = useState(0)
  const [prevPhase, setPrevPhase] = useState(0)

  useEffect(() => {
    return scrollYProgress.on('change', (v) => {
      const idx = PHASES.findIndex(p => v >= p.start && v < p.end)
      const resolved = idx === -1 ? PHASES.length - 1 : idx
      if (resolved !== activePhase) {
        setPrevPhase(activePhase)
        setActivePhase(resolved)
      }
    })
  }, [scrollYProgress, activePhase])

  const phase = PHASES[activePhase]

  return (
    <div
      className="fixed inset-0 pointer-events-none z-50"
      style={{ overflow: 'hidden' }}
    >
      <AnimatePresence mode="crossfade">
        <motion.img
          key={phase.img}
          src={phase.img}
          alt="character"
          initial={{ opacity: 0, scale: phase.scale * 0.95 }}
          animate={{
            opacity: 1,
            scale: phase.scale,
            filter: [
              'drop-shadow(0 0 10px rgba(0,191,255,0.4))',
              'drop-shadow(0 0 24px rgba(0,191,255,0.9))',
              'drop-shadow(0 0 10px rgba(0,191,255,0.4))',
            ]
          }}
          exit={{ opacity: 0, scale: phase.scale * 0.95 }}
          transition={{
            opacity: { duration: 0.6, ease: 'easeInOut' },
            scale:   { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
            filter:  { duration: 3.5, repeat: Infinity, ease: 'easeInOut' },
          }}
          style={{
            position: 'absolute',
            bottom:  phase.bottom,
            right:   phase.right,
            left:    phase.left,
            transform: phase.transform,
            height: activePhase === 0 || activePhase === 4 ? '80vh' : '85vh',
            width: 'auto',
            objectFit: 'contain',
          }}
        />
      </AnimatePresence>
    </div>
  )
}
```

---

## ⌨️ STEP 4 — KEYBOARD NAVIGATION HOOK

### `src/hooks/useKeyboardNav.ts`

```ts
import { useEffect, useCallback, useRef } from 'react'

const SECTION_IDS = ['s1-welcome', 's2-about', 's3-skills', 's4-projects', 's5-contact']

export function useKeyboardNav() {
  const currentIdx = useRef(0)

  const scrollTo = useCallback((idx: number) => {
    const clamped = Math.max(0, Math.min(SECTION_IDS.length - 1, idx))
    currentIdx.current = clamped
    document.getElementById(SECTION_IDS[clamped])?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  const handleKey = useCallback((e: KeyboardEvent) => {
    if (e.key === 'ArrowDown' || e.key === 'j') { e.preventDefault(); scrollTo(currentIdx.current + 1) }
    if (e.key === 'ArrowUp'   || e.key === 'k') { e.preventDefault(); scrollTo(currentIdx.current - 1) }
  }, [scrollTo])

  useEffect(() => {
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [handleKey])
}
```

### `src/components/KeyboardHint.tsx`

```tsx
import { motion } from 'framer-motion'

export function KeyboardHint() {
  return (
    <motion.div
      className="fixed bottom-6 right-8 z-[100] flex flex-col items-end gap-2 pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.8, duration: 0.7 }}
    >
      {[{ key: '↑  ↓', label: 'NAVIGATE' }, { key: '↵', label: 'SELECT' }].map(({ key, label }) => (
        <div key={key} className="flex items-center gap-2 font-orbitron text-[10px] tracking-[3px] text-white/30">
          <span className="border border-white/20 px-[7px] py-[2px] text-[10px] text-white/40 rounded-[2px]">
            {key}
          </span>
          <span>{label}</span>
        </div>
      ))}
    </motion.div>
  )
}
```

---

## 🧩 STEP 5 — ANIMATIONS VARIANTS

### `src/animations/variants.ts`

```ts
import { Variants } from 'framer-motion'

export const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } }
}

export const slideInLeft: Variants = {
  hidden:   { opacity: 0, x: -60, filter: 'blur(6px)' },
  visible:  { opacity: 1, x: 0,   filter: 'blur(0px)',
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }
}

export const fadeSlideUp: Variants = {
  hidden:   { opacity: 0, y: 40 },
  visible:  { opacity: 1, y: 0,
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } }
}

export const fadeStagger: Variants = {
  hidden:   { opacity: 0, y: 16 },
  visible:  { opacity: 1, y: 0,
    transition: { duration: 0.45, ease: 'easeOut' } }
}

export const skillDetailTransition: Variants = {
  initial:  { opacity: 0, y: 20, filter: 'blur(4px)' },
  animate:  { opacity: 1, y: 0,  filter: 'blur(0px)',
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
  exit:     { opacity: 0, y: -20, filter: 'blur(4px)',
    transition: { duration: 0.25 } }
}

export const modalOverlay: Variants = {
  initial:  { opacity: 0 },
  animate:  { opacity: 1, transition: { duration: 0.3 } },
  exit:     { opacity: 0, transition: { duration: 0.25 } }
}

export const modalContent: Variants = {
  initial:  { opacity: 0, scale: 0.93, y: 20 },
  animate:  { opacity: 1, scale: 1,    y: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
  exit:     { opacity: 0, scale: 0.95, y: 10,
    transition: { duration: 0.25 } }
}

export const tarotCard: Variants = {
  hidden:   { opacity: 0, y: 80 },
  visible:  { opacity: 1, y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
}
```

---

## 🔧 SHARED UI COMPONENTS — REUSABLE

Buat komponen kecil ini untuk dipakai di berbagai section:

```tsx
// SlashLabel — label section header berbentuk slash
export function SlashLabel({ text }: { text: string }) {
  return (
    <div className="inline-block mb-4"
      style={{ clipPath: 'polygon(0 0, calc(100% - 14px) 0, 100% 50%, calc(100% - 14px) 100%, 0 100%)' }}>
      <span className="block px-4 pr-7 py-[5px] bg-p3-cyan font-orbitron font-black
        text-[10px] tracking-[5px] uppercase text-p3-black">
        {text}
      </span>
    </div>
  )
}

// GhostText — teks raksasa dekoratif di background
export function GhostText({ text, className = '' }: { text: string; className?: string }) {
  return (
    <span className={`absolute select-none pointer-events-none font-bebas
      text-[clamp(100px,18vw,260px)] leading-none tracking-[-6px]
      text-white/[0.025] whitespace-nowrap z-0 ${className}`}>
      {text}
    </span>
  )
}

// P3Divider — divider horizontal khas Persona
export function P3Divider() {
  return (
    <div className="flex items-center gap-3 my-4">
      <div className="flex-1 h-px bg-gradient-to-r from-p3-cyan to-transparent" />
      <span className="font-orbitron text-[9px] tracking-[5px] text-p3-dim uppercase">● ●</span>
      <div className="flex-1 h-px bg-gradient-to-l from-p3-cyan to-transparent" />
    </div>
  )
}

// GlassCard — container glassmorphism
export function GlassCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`relative overflow-hidden ${className}`}
      style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border-subtle)',
        borderLeft: '3px solid var(--cyan)',
        backdropFilter: 'blur(14px)',
        borderRadius: '2px',
        boxShadow: '0 8px 32px rgba(0,0,0,0.55), inset 0 0 30px rgba(0,191,255,0.03)',
      }}>
      {/* Corner accent */}
      <div className="absolute top-0 right-0 w-0 h-0 pointer-events-none"
        style={{
          borderStyle: 'solid',
          borderWidth: '0 32px 32px 0',
          borderColor: 'transparent #00BFFF transparent transparent',
          opacity: 0.5,
        }} />
      {children}
    </div>
  )
}
```

---

## 📄 STEP 6 — SECTION 1: WELCOME

### `src/components/sections/S1_Welcome.tsx`

```tsx
import { motion } from 'framer-motion'
import { staggerContainer, fadeSlideUp } from '@/animations/variants'
import { GhostText } from '@/components/shared'

export function S1_Welcome() {
  return (
    <section
      id="s1-welcome"
      className="relative h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      <GhostText text="DARK HOUR" className="bottom-[-2vh] left-[-1vw]" />

      <motion.div
        className="relative z-10 flex flex-col items-center gap-6"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        {/* Judul */}
        <motion.h1
          variants={fadeSlideUp}
          className="font-bebas text-[clamp(56px,9vw,130px)] tracking-[4px] leading-none text-white text-center"
          style={{
            textShadow: `
              0 0 10px rgba(0,191,255,0.9),
              0 0 30px rgba(0,191,255,0.6),
              0 0 70px rgba(0,191,255,0.3),
              0 0 130px rgba(0,191,255,0.15)
            `
          }}
        >
          HI!!! SELAMAT DATANG
        </motion.h1>

        {/* Sub-teks opsional */}
        <motion.p
          variants={fadeSlideUp}
          className="font-orbitron text-[11px] tracking-[6px] text-p3-dim uppercase"
        >
          // SCROLL TO EXPLORE
        </motion.p>

        {/* Placeholder karakter — akan di-handle oleh StickyCharacter global */}
        {/* Tidak perlu img di sini. StickyCharacter sudah menangani phase 1 */}
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ delay: 2, duration: 2, repeat: Infinity }}
      >
        <span className="font-orbitron text-[9px] tracking-[4px] text-white/30 uppercase">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-p3-cyan to-transparent" />
      </motion.div>
    </section>
  )
}
```

---

## 📄 STEP 7 — SECTION 2: ABOUT / DATA DIRI

### `src/components/sections/S2_About.tsx`

```tsx
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { staggerContainer, slideInLeft, fadeStagger } from '@/animations/variants'
import { SlashLabel, GhostText, GlassCard, P3Divider } from '@/components/shared'

const STATS = [
  { label: 'ACADEMICS', level: 'Above Average', rank: 3 },
  { label: 'CHARM',     level: 'Unpolished',    rank: 2 },
  { label: 'COURAGE',   level: 'Tough',          rank: 4 },
]

const PERSONAL = [
  { key: 'NAMA',    value: 'Ida Bagus Gede Widiastana Bawaskara' },
  { key: 'PERAN',   value: 'Data Science & Web Development' },
  { key: 'LOKASI',  value: 'Indonesia' },
  { key: 'STATUS',  value: 'ACTIVE' },
  { key: 'TECH',    value: 'Python, ML, PHP, Laravel, HTML/CSS' },
]

export function S2_About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-120px' })

  return (
    <section
      id="s2-about"
      className="relative h-screen flex items-center overflow-hidden"
    >
      <GhostText text="PERSONA" className="bottom-[-2vh] right-[-1vw]" />

      {/* LEFT COLUMN — konten teks (45% lebar) */}
      <motion.div
        ref={ref}
        className="relative z-10 w-[45%] pl-12 flex flex-col gap-6"
        variants={staggerContainer}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        <motion.div variants={slideInLeft}>
          <SlashLabel text="// SECTION 02" />
          <h2 className="font-bebas text-[clamp(40px,5vw,72px)] tracking-[3px] text-white leading-none">
            DATA DIRI
          </h2>
        </motion.div>

        {/* STATS PANEL */}
        <motion.div variants={slideInLeft}>
          <GlassCard className="p-5">
            <p className="font-orbitron text-[10px] tracking-[5px] text-p3-dim uppercase mb-4">
              ── Social Stats ──
            </p>
            <div className="flex flex-col gap-3">
              {STATS.map(({ label, level, rank }) => (
                <div key={label} className="flex flex-col gap-1">
                  <div className="flex justify-between items-baseline">
                    <span className="font-orbitron text-[11px] font-bold tracking-[3px] text-white uppercase">
                      {label}
                    </span>
                    <span className="font-rajdhani text-[12px] text-p3-dim">{level}</span>
                  </div>
                  {/* Progress bar — 5 segmen */}
                  <div className="flex gap-[3px]">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <motion.div
                        key={i}
                        className="h-[6px] flex-1"
                        style={{
                          background: i < rank ? 'var(--cyan)' : 'rgba(0,191,255,0.12)',
                          boxShadow: i < rank ? '0 0 6px rgba(0,191,255,0.6)' : 'none',
                        }}
                        initial={{ scaleX: 0 }}
                        animate={isInView ? { scaleX: 1 } : {}}
                        transition={{ delay: 0.4 + i * 0.05, duration: 0.3 }}
                        style={{ transformOrigin: 'left' }}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </motion.div>

        {/* PERSONAL DATA PANEL */}
        <motion.div variants={fadeStagger}>
          <div
            className="p-5"
            style={{
              background: 'var(--bg-card)',
              border: '1px solid rgba(255,255,255,0.35)',
              borderRadius: '2px',
            }}
          >
            <p className="font-orbitron text-[10px] tracking-[5px] text-p3-dim uppercase mb-3">
              // PERSONAL DATA
            </p>
            <P3Divider />
            <div className="flex flex-col gap-2">
              {PERSONAL.map(({ key, value }) => (
                <div key={key} className="flex gap-3 items-start">
                  <span className="font-orbitron text-[10px] tracking-[2px] text-p3-cyan w-16 shrink-0 pt-[2px]">
                    ▶ {key}
                  </span>
                  <span className="text-[1px] text-white/30">:</span>
                  <span className="font-rajdhani text-[14px] text-white/85 leading-snug">
                    {value}
                  </span>
                </div>
              ))}
            </div>
            <P3Divider />
          </div>
        </motion.div>
      </motion.div>

      {/* RIGHT COLUMN — karakter di-handle oleh StickyCharacter global (phase 2) */}
      {/* Tidak perlu img di sini */}
    </section>
  )
}
```

---

## 📄 STEP 8 — SECTION 3: SKILLS

### `src/components/sections/S3_Skills.tsx`

```tsx
import { useRef, useState } from 'react'
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion'
import { skillDetailTransition } from '@/animations/variants'
import { SlashLabel, GhostText } from '@/components/shared'

const SKILLS = [
  { title: 'Python Programming',    rank: 7, max: 10, desc: 'Extensive experience in writing scripts for data scraping, automation, and backend logic.' },
  { title: 'Data Analysis (EDA)',   rank: 7, max: 10, desc: 'Skilled in exploratory data analysis, data cleaning, and processing unstructured public data.' },
  { title: 'Machine Learning',      rank: 6, max: 10, desc: 'Proficient in implementing clustering algorithms like KMeans and PCA for data classification.' },
  { title: 'Web Development',       rank: 6, max: 10, desc: 'Building modern, interactive user interfaces using React.js, Tailwind CSS, and Framer Motion.' },
]

export function S3_Skills() {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: wrapperRef })
  const [activeIdx, setActiveIdx] = useState(0)

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const idx = Math.min(Math.floor(v * SKILLS.length), SKILLS.length - 1)
    setActiveIdx(idx)
  })

  return (
    // Wrapper: tinggi 400vh untuk scroll hijacking
    <div ref={wrapperRef} className="relative h-[400vh]" id="s3-skills">
      <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center">
        <GhostText text="ARCANA" className="bottom-[-2vh] left-[-1vw]" />

        <div className="relative z-10 w-full max-w-6xl px-12 grid grid-cols-2 gap-16 items-center">

          {/* KIRI — List skill */}
          <div className="flex flex-col gap-2">
            <SlashLabel text="// SECTION 03" />
            <h2 className="font-bebas text-[clamp(36px,4.5vw,64px)] tracking-[3px] text-white mb-6 leading-none">
              SKILLS
            </h2>
            {SKILLS.map((skill, i) => (
              <motion.div
                key={skill.title}
                className="flex items-center gap-4 cursor-default py-2 px-3"
                animate={{
                  opacity: i === activeIdx ? 1 : 0.35,
                  x: i === activeIdx ? 8 : 0,
                  scale: i === activeIdx ? 1.02 : 1,
                }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                style={{
                  borderLeft: i === activeIdx ? '3px solid var(--cyan)' : '3px solid transparent',
                }}
              >
                <span
                  className="font-bebas text-[clamp(22px,2.5vw,36px)] tracking-[2px] leading-none"
                  style={{ color: i === activeIdx ? 'var(--cyan)' : 'var(--text-dim)' }}
                >
                  {skill.title}
                </span>
              </motion.div>
            ))}
          </div>

          {/* KANAN — Detail skill aktif */}
          <div className="flex flex-col justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIdx}
                variants={skillDetailTransition}
                initial="initial"
                animate="animate"
                exit="exit"
                className="flex flex-col gap-5"
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-subtle)',
                  borderLeft: '3px solid var(--cyan)',
                  borderRadius: '2px',
                  padding: '2rem',
                  backdropFilter: 'blur(14px)',
                }}
              >
                {/* Rank indicator */}
                <div>
                  <p className="font-orbitron text-[10px] tracking-[5px] text-p3-dim uppercase mb-2">
                    Proficiency Rank
                  </p>
                  <div className="flex gap-[4px]">
                    {Array.from({ length: SKILLS[activeIdx].max }).map((_, i) => (
                      <div
                        key={i}
                        className="h-[8px] flex-1"
                        style={{
                          background: i < SKILLS[activeIdx].rank ? 'var(--cyan)' : 'rgba(0,191,255,0.1)',
                          boxShadow: i < SKILLS[activeIdx].rank ? '0 0 8px rgba(0,191,255,0.7)' : 'none',
                        }}
                      />
                    ))}
                  </div>
                  <p className="font-orbitron text-[11px] tracking-[2px] text-p3-cyan mt-1">
                    {SKILLS[activeIdx].rank} / {SKILLS[activeIdx].max}
                  </p>
                </div>

                {/* Deskripsi */}
                <div>
                  <p className="font-orbitron text-[10px] tracking-[4px] text-p3-dim uppercase mb-2">
                    Description
                  </p>
                  <p className="font-rajdhani text-[16px] text-white/80 leading-relaxed">
                    {SKILLS[activeIdx].desc}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </div>
  )
}
```

---

## 📄 STEP 9 — SECTION 4: PROJECTS

### `src/components/sections/S4_Projects.tsx`

```tsx
import { useRef, useState } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { modalOverlay, modalContent } from '@/animations/variants'
import { SlashLabel, GhostText } from '@/components/shared'

interface Project {
  title: string
  url: string
  description: string
  techStack: string[]
}

const PROJECTS: Project[] = [
  {
    title: 'RS Sanjiwani',
    url: 'https://github.com/GusWid715/rs_sanjiwani',
    description: 'Sistem informasi rumah sakit berbasis web untuk manajemen data pasien dan jadwal dokter.',
    techStack: ['PHP', 'Laravel', 'MySQL', 'Bootstrap'],
  },
  {
    title: 'Virtual Gift Box',
    url: 'https://github.com/GusWid715/vritual-gift-box',
    description: 'Aplikasi web interaktif untuk mengirim hadiah virtual dengan animasi pembukaan kotak hadiah.',
    techStack: ['HTML', 'CSS', 'JavaScript', 'Canvas API'],
  },
  {
    title: 'Chatbot Assistant Coach',
    url: 'https://github.com/GusWid715/Chatbot-AssistantCoach',
    description: 'Chatbot berbasis NLP untuk membantu coaching dan konsultasi berbasis teks secara otomatis.',
    techStack: ['Python', 'NLP', 'Flask', 'React'],
  },
  {
    title: 'ADUIN Capstone',
    url: 'https://github.com/GusWid715/ADUIN-Capstone-Project-Dataset',
    description: 'Dataset dan pipeline analisis data untuk proyek capstone machine learning berbasis data publik.',
    techStack: ['Python', 'Pandas', 'Scikit-learn', 'Jupyter'],
  },
]

export function S4_Projects() {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: wrapperRef })
  const [selected, setSelected] = useState<Project | null>(null)

  // Map scroll 0→1 ke translateX 0% → -75% (1 card per 25% scroll)
  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-75%'])

  return (
    <>
      <div ref={wrapperRef} className="relative h-[300vh]" id="s4-projects">
        <div className="sticky top-0 h-screen overflow-hidden">
          <GhostText text="JOURNEY" className="bottom-[-2vh] right-[-1vw]" />

          {/* Header */}
          <div className="absolute top-12 left-12 z-10">
            <SlashLabel text="// SECTION 04" />
            <h2 className="font-bebas text-[clamp(36px,4.5vw,64px)] tracking-[3px] text-white leading-none">
              PROJECTS
            </h2>
          </div>

          {/* Horizontal track */}
          <motion.div
            className="absolute top-0 left-0 h-full flex flex-row flex-nowrap items-center"
            style={{
              x,
              width: `${PROJECTS.length * 100}vw`,
              paddingTop: '100px',
              paddingLeft: '12vw',
              gap: '4vw',
            }}
          >
            {PROJECTS.map((project) => (
              <motion.div
                key={project.title}
                className="shrink-0 w-[28vw] cursor-pointer"
                whileHover={{ scale: 1.03, y: -6 }}
                transition={{ duration: 0.3 }}
                onClick={() => setSelected(project)}
                style={{
                  height: '55vh',
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-subtle)',
                  borderLeft: '3px solid var(--cyan)',
                  borderRadius: '2px',
                  backdropFilter: 'blur(14px)',
                  padding: '2rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: 'inset 0 0 30px rgba(0,191,255,0.03)',
                }}
              >
                <div>
                  <p className="font-orbitron text-[10px] tracking-[5px] text-p3-dim uppercase mb-3">
                    ── Project
                  </p>
                  <h3 className="font-bebas text-[clamp(28px,2.8vw,48px)] tracking-[2px] text-white leading-tight mb-4">
                    {project.title}
                  </h3>
                  <p className="font-rajdhani text-[14px] text-white/65 leading-relaxed">
                    {project.description}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map(tech => (
                    <span
                      key={tech}
                      className="font-orbitron text-[9px] tracking-[3px] uppercase px-3 py-1"
                      style={{
                        border: '1px solid var(--border-subtle)',
                        color: 'var(--cyan)',
                        background: 'var(--cyan-ghost)',
                        borderRadius: '1px',
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <p className="font-orbitron text-[10px] tracking-[3px] text-p3-dim uppercase mt-2">
                  ↵ Press to expand
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* MODAL */}
      <AnimatePresence>
        {selected && (
          <>
            <motion.div
              className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-sm"
              variants={modalOverlay}
              initial="initial" animate="animate" exit="exit"
              onClick={() => setSelected(null)}
            />
            <motion.div
              className="fixed inset-0 z-[201] flex items-center justify-center pointer-events-none"
            >
              <motion.div
                className="pointer-events-auto w-[90vw] max-w-2xl"
                variants={modalContent}
                initial="initial" animate="animate" exit="exit"
                style={{
                  background: 'var(--bg-layer)',
                  border: '1px solid var(--border-active)',
                  borderLeft: '4px solid var(--cyan)',
                  borderRadius: '2px',
                  padding: '2.5rem',
                  boxShadow: '0 0 40px rgba(0,191,255,0.2)',
                }}
              >
                <p className="font-orbitron text-[10px] tracking-[5px] text-p3-dim uppercase mb-2">
                  // PROJECT DETAIL
                </p>
                <h3 className="font-bebas text-[clamp(36px,4vw,64px)] tracking-[3px] text-white mb-4 leading-none">
                  {selected.title}
                </h3>
                <p className="font-rajdhani text-[16px] text-white/80 leading-relaxed mb-6">
                  {selected.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-8">
                  {selected.techStack.map(t => (
                    <span key={t} className="font-orbitron text-[10px] tracking-[3px] uppercase px-3 py-1"
                      style={{ border: '1px solid var(--border-subtle)', color: 'var(--cyan)', borderRadius: '1px' }}>
                      {t}
                    </span>
                  ))}
                </div>
                <div className="flex gap-4">
                  <a
                    href={selected.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-orbitron text-[11px] font-black tracking-[4px] uppercase px-6 py-3"
                    style={{
                      background: 'var(--cyan)',
                      color: '#030810',
                      borderRadius: '1px',
                      clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 50%, calc(100% - 10px) 100%, 0 100%)',
                    }}
                  >
                    → View on GitHub
                  </a>
                  <button
                    onClick={() => setSelected(null)}
                    className="font-orbitron text-[11px] tracking-[4px] uppercase px-6 py-3 text-white/50 border border-white/20"
                    style={{ borderRadius: '1px' }}
                  >
                    ✕ Close
                  </button>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
```

---

## 📄 STEP 10 — SECTION 5: CONTACT / FOOTER

### `src/components/sections/S5_Contact.tsx`

```tsx
import { motion, AnimatePresence } from 'framer-motion'
import { staggerContainer, tarotCard } from '@/animations/variants'
import { SlashLabel } from '@/components/shared'

const CARDS = [
  {
    label: 'GitHub',
    icon: '{ }',
    url: 'https://github.com/GusWid715',
    sub: '@GusWid715',
  },
  {
    label: 'LinkedIn',
    icon: 'in',
    url: 'https://linkedin.com/',
    sub: 'Connect',
  },
  {
    label: 'Email',
    icon: '@',
    url: 'mailto:youremail@example.com',
    sub: 'Send Message',
  },
]

export function S5_Contact() {
  return (
    <section
      id="s5-contact"
      className="relative h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ background: 'linear-gradient(to top, #000408 0%, var(--bg-base) 100%)' }}
    >
      {/* Header */}
      <motion.div
        className="text-center mb-16 -skew-x-3"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <SlashLabel text="// SECTION 05" />
        <h2
          className="font-bebas text-[clamp(40px,6vw,96px)] tracking-[6px] text-white leading-none"
          style={{ textShadow: '0 0 30px rgba(0,191,255,0.4)' }}
        >
          ESTABLISH SOCIAL LINK
        </h2>
        <p className="font-orbitron text-[11px] tracking-[5px] text-p3-dim uppercase mt-3">
          Choose your Arcana
        </p>
      </motion.div>

      {/* Tarot Cards */}
      <motion.div
        className="flex flex-row justify-center items-end gap-8"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {CARDS.map((card, i) => (
          <motion.a
            key={card.label}
            href={card.url}
            target="_blank"
            rel="noopener noreferrer"
            variants={tarotCard}
            whileHover={{
              y: -20,
              scale: 1.05,
              transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
            }}
            className="flex flex-col items-center justify-between no-underline"
            style={{
              width: '220px',
              height: '340px',
              background: 'var(--bg-card)',
              border: '1px solid var(--border-subtle)',
              borderTop: '3px solid var(--cyan)',
              borderRadius: '2px',
              padding: '2rem 1.5rem',
              backdropFilter: 'blur(14px)',
              cursor: 'pointer',
            }}
          >
            {/* Icon besar di tengah */}
            <div
              className="font-bebas text-[64px] leading-none mt-4"
              style={{
                color: 'var(--cyan)',
                textShadow: '0 0 20px rgba(0,191,255,0.7)',
              }}
            >
              {card.icon}
            </div>

            {/* Label */}
            <div className="flex flex-col items-center gap-1">
              <span className="font-bebas text-[28px] tracking-[4px] text-white uppercase">
                {card.label}
              </span>
              <span className="font-orbitron text-[10px] tracking-[3px] text-p3-dim uppercase">
                {card.sub}
              </span>
            </div>

            {/* Roman numeral (urutan arcana) */}
            <span className="font-orbitron text-[11px] tracking-[4px] text-white/20">
              {['I', 'II', 'III'][i]}
            </span>
          </motion.a>
        ))}
      </motion.div>

      {/* Bottom bar */}
      <div
        className="absolute bottom-0 left-0 right-0 py-4 px-12 flex justify-between items-center"
        style={{ borderTop: '1px solid rgba(0,191,255,0.1)' }}
      >
        <span className="font-orbitron text-[9px] tracking-[4px] text-white/20 uppercase">
          © 2026 GusWid — All Rights Reserved
        </span>
        <span className="font-orbitron text-[9px] tracking-[4px] text-p3-dim uppercase">
          Powered by Dark Hour
        </span>
      </div>
    </section>
  )
}
```

---

## 🔧 STEP 11 — APP.TSX (ASSEMBLY)

### `src/App.tsx`

```tsx
import { GlobalOverlays } from '@/components/GlobalOverlays'
import { StickyCharacter } from '@/components/StickyCharacter'
import { KeyboardHint } from '@/components/KeyboardHint'
import { useKeyboardNav } from '@/hooks/useKeyboardNav'

import { S1_Welcome }  from '@/components/sections/S1_Welcome'
import { S2_About }    from '@/components/sections/S2_About'
import { S3_Skills }   from '@/components/sections/S3_Skills'
import { S4_Projects } from '@/components/sections/S4_Projects'
import { S5_Contact }  from '@/components/sections/S5_Contact'

export default function App() {
  useKeyboardNav()

  return (
    <>
      {/* ── Global Fixed Layers ──────────────── */}
      <GlobalOverlays />
      <StickyCharacter />
      <KeyboardHint />

      {/* ── Page Content ─────────────────────── */}
      <main>
        <S1_Welcome />
        <S2_About />
        <S3_Skills />
        <S4_Projects />
        <S5_Contact />
      </main>
    </>
  )
}
```

---

## ✅ CHECKLIST EKSEKUSI (URUTAN WAJIB)

```
[ ] 1.  Setup project: npx create vite@latest . --template react-ts
[ ] 2.  Install deps: npm install framer-motion
[ ] 3.  Setup Tailwind CSS v3 (ikuti docs resmi untuk Vite)
[ ] 4.  Salin CSS variables & fonts ke src/index.css
[ ] 5.  Update tailwind.config.ts dengan extend colors & fonts
[ ] 6.  Tambahkan path alias "@" di vite.config.ts & tsconfig.json
[ ] 7.  Buat src/animations/variants.ts
[ ] 8.  Buat src/hooks/useKeyboardNav.ts
[ ] 9.  Buat src/components/GlobalOverlays.tsx
[ ] 10. Buat src/components/StickyCharacter.tsx
[ ] 11. Buat src/components/KeyboardHint.tsx
[ ] 12. Buat shared components (SlashLabel, GhostText, P3Divider, GlassCard)
[ ] 13. Buat S1_Welcome.tsx → test scroll indicator
[ ] 14. Buat S2_About.tsx   → test stats bar & card
[ ] 15. Buat S3_Skills.tsx  → test scroll hijacking 400vh
[ ] 16. Buat S4_Projects.tsx → test horizontal scroll + modal
[ ] 17. Buat S5_Contact.tsx → test tarot card hover
[ ] 18. Assembly di App.tsx
[ ] 19. Ganti semua placeholder image path dengan gambar asli
[ ] 20. Update URL email & LinkedIn di S5_Contact
[ ] 21. Test keyboard navigation (ArrowUp / ArrowDown)
[ ] 22. Test StickyCharacter phase transitions di setiap section
[ ] 23. Final: pastikan tidak ada console error TypeScript
```

---

## ⛔ PANTANGAN

```
✗ Jangan gunakan border-radius > 4px — P3R pakai sudut tajam
✗ Jangan gunakan warna purple/ungu — bukan P3R, itu P5
✗ Jangan render img karakter di dalam section — semua karakter via StickyCharacter
✗ Jangan pakai font Inter/Roboto/Arial/system-ui
✗ Jangan pakai background solid polos — gunakan layered radial gradient
✗ Jangan duplikasi GlobalOverlays/StickyCharacter lebih dari sekali di App
✗ Jangan ganti logika h-[400vh] / h-[300vh] — itu sumber scroll hijacking
```
