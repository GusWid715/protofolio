import { useRef, useState, useEffect } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'

import { GhostText } from '@/components/shared'

/* ─── Data (original) ───────────────────────────────────────────────────────── */

const SKILLS = [
  { id: 'I', title: 'Python Programming', subtitle: 'Backend / Automation', rank: 7, max: 10, desc: 'Extensive experience in writing scripts for data scraping, automation, and backend logic.' },
  { id: 'II', title: 'Data Analysis', subtitle: 'Data Science', rank: 7, max: 10, desc: 'Skilled in exploratory data analysis, data cleaning, and processing unstructured public data.' },
  { id: 'III', title: 'Machine Learning', subtitle: 'AI / Models', rank: 6, max: 10, desc: 'Proficient in implementing clustering algorithms like KMeans and PCA for data classification.' },
  { id: 'IV', title: 'Web Development', subtitle: 'Frontend / Fullstack', rank: 6, max: 10, desc: 'Building modern, interactive user interfaces using React.js, Tailwind CSS, and Framer Motion.' },
]

const N = SKILLS.length

/* ─── Colors (original palette) ─────────────────────────────────────────────── */

const CYAN = '#8ef5ff'
const CYAN_DARK = '#54fafe'
const NAVY = '#10185f'
const NAVY_DEEP = '#0b113d'
const RED_SHADOW = 'rgba(255, 0, 0, 0.5)'
const SKEW = -12

/* ─── Shared panel styles ───────────────────────────────────────────────────── */



/**
 * S3_Skills
 *
 * UI box: skewed parallelogram dari referensi HTML
 * Warna: palette original (navy, cyan, gradient biru)
 * Layout: title seperti S2, panel kanan sejajar card pertama
 * Animasi: Framer Motion variants (staggerContainer & slideInLeft)
 */
export function S3_Skills() {
  const [activeIdx, setActiveIdx] = useState(0)
  const [mounted, setMounted] = useState(false)

  const activeIdxRef = useRef(0)
  const cooldownRef = useRef(false)
  const sectionRef = useRef<HTMLElement>(null)

  const inViewRef = useRef<HTMLDivElement>(null)
  // amount: 0.3 memastikan animasi baru terpicu saat section terlihat 30% di layar
  const inView = useInView(inViewRef, { once: true, amount: 0.3 })

  // Trigger mounted state persis seperti referensi Resume.tsx saat inView
  useEffect(() => {
    if (inView && !mounted) {
      const t = setTimeout(() => setMounted(true), 80)
      return () => clearTimeout(t)
    }
  }, [inView, mounted])

  /* ── Scroll-to-navigate ────────────────────────────────────────────────── */
  useEffect(() => {
    const COOLDOWN_MS = 500
    const onWheel = (e: WheelEvent) => {
      const el = sectionRef.current
      if (!el) return
      const { top } = el.getBoundingClientRect()
      if (Math.abs(top) > window.innerHeight * 0.15) return

      const going = e.deltaY > 0 ? 1 : -1
      const current = activeIdxRef.current
      const next = current + going

      if (next >= 0 && next < N) {
        e.preventDefault()
        if (cooldownRef.current) return
        cooldownRef.current = true
        setTimeout(() => { cooldownRef.current = false }, COOLDOWN_MS)
        activeIdxRef.current = next
        setActiveIdx(next)
      }
    }
    window.addEventListener('wheel', onWheel, { passive: false })
    return () => window.removeEventListener('wheel', onWheel)
  }, [])

  const active = SKILLS[activeIdx]

  return (
    <section
      ref={sectionRef}
      id="s3-skills"
      className="relative h-screen flex overflow-hidden"
    >
      <GhostText text="ARCANA" className="bottom-[-2vh] left-[-1vw]" />

      <div ref={inViewRef} className="relative z-10 w-full px-8 md:px-14 grid grid-cols-2 gap-8 items-start pt-[12vh]">

        {/* ══════════════════════════════════════════════════════════════════
            LEFT — Title + Skill cards (skewed style)
        ══════════════════════════════════════════════════════════════════ */}
        <div className="flex flex-col gap-3">
          {/* Title — matches S2 About Me position */}
          <div
            className="font-anton leading-[0.9] text-[#f6fbff] tracking-[2px] ml-3 mb-2"
            style={{
              fontSize: 'clamp(44px, 5.5vw, 72px)',
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateX(0)" : "translateX(-24px)",
              transition: "opacity 0.35s ease, transform 0.35s ease",
            }}
          >
            SKILLS
          </div>

          {/* ── Skewed skill cards ──────────────────────────────────────── */}
          {SKILLS.map((skill, index) => {
            const isActive = index === activeIdx
            return (
              <div
                key={skill.title}
                className="cursor-pointer"
                onMouseEnter={() => {
                  activeIdxRef.current = index
                  setActiveIdx(index)
                }}
                style={{
                  opacity: mounted ? 1 : 0,
                  transform: mounted ? "translateX(0)" : "translateX(-48px)",
                  transition: `opacity 0.4s ease ${index * 55}ms, transform 0.4s cubic-bezier(0.22,1,0.36,1) ${index * 55}ms`,
                }}
              >
                {/* Skewed card container */}
                <div
                  style={{
                    position: 'relative',
                    transform: isActive ? `translateX(6px) skewX(${SKEW}deg)` : `translateX(0) skewX(${SKEW}deg)`,
                    background: isActive ? '#ffffff' : NAVY,
                    padding: '18px 24px 18px 58px',
                    borderLeft: `5px solid ${isActive ? CYAN_DARK : 'transparent'}`,
                    boxShadow: isActive
                      ? `10px 8px 0px 0px ${RED_SHADOW}, inset 0 0 0 1px rgba(133,244,255,0.1)`
                      : `0px 8px 0px 0px rgba(5,13,59,0.85)`,
                    transition: 'transform 0.22s ease, background 0.22s ease, box-shadow 0.22s ease, border-color 0.22s ease',
                  }}
                >
                  {/* Roman numeral badge */}
                  <div
                    style={{
                      position: 'absolute',
                      left: 14,
                      top: '50%',
                      transform: `translateY(-50%) skewX(${-SKEW}deg)`,
                      background: CYAN,
                      color: NAVY_DEEP,
                      padding: '3px 9px',
                      fontFamily: "'Anton', sans-serif",
                      fontSize: 18,
                      lineHeight: 1.2,
                      letterSpacing: '0.05em',
                    }}
                  >
                    {skill.id}
                  </div>

                  {/* Inner content (counter-skew) */}
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-end',
                      transform: `skewX(${-SKEW}deg)`,
                    }}
                  >
                    {/* Name + subtitle */}
                    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minWidth: 0 }}>
                      <span
                        style={{
                          fontFamily: "'Anton', sans-serif",
                          fontSize: 'clamp(22px, 2.2vw, 32px)',
                          lineHeight: 1,
                          letterSpacing: '0.05em',
                          color: isActive ? '#000' : '#a5f6ff',
                          transition: 'color 0.25s ease',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}
                      >
                        {skill.title}
                      </span>
                      <span
                        style={{
                          fontFamily: "'Bebas Neue', sans-serif",
                          fontSize: 'clamp(10px, 0.8vw, 14px)',
                          fontWeight: 400,
                          letterSpacing: '0.12em',
                          color: isActive ? 'rgba(0,0,0,0.5)' : 'rgba(133,244,255,0.45)',
                          marginTop: 4,
                          transition: 'color 0.25s ease',
                          textTransform: 'uppercase',
                        }}
                      >
                        {skill.subtitle}
                      </span>
                    </div>

                    {/* Rank */}
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, flexShrink: 0 }}>
                      <span
                        style={{
                          fontFamily: "'Bebas Neue', sans-serif",
                          fontSize: 'clamp(10px, 0.7vw, 14px)',
                          letterSpacing: '0.15em',
                          color: isActive ? 'rgba(0,0,0,0.4)' : 'rgba(159,251,255,0.5)',
                          transition: 'color 0.25s ease',
                        }}
                      >
                        RANK
                      </span>
                      <span
                        style={{
                          fontFamily: "'Anton', sans-serif",
                          fontSize: 'clamp(30px, 2.8vw, 44px)',
                          lineHeight: 1,
                          color: isActive ? '#000' : '#9ffbff',
                          transition: 'color 0.25s ease',
                        }}
                      >
                        {skill.rank}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}

          {/* Scroll hint */}
          <div
            className="flex items-center gap-2 mt-1 ml-4"
            style={{
              opacity: mounted ? 0.4 : 0,
              transition: "opacity 0.4s ease 0.35s",
            }}
          >
            <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 13, letterSpacing: 3, color: CYAN }}>
              // SCROLL TO NAVIGATE
            </span>
            <div style={{ width: 80, height: 1, borderBottom: `1px dashed ${CYAN}`, opacity: 0.5 }} />
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════════════
            RIGHT — Skewed detail panel (top-aligned with first card)
        ══════════════════════════════════════════════════════════════════ */}
        <div className="flex flex-col" style={{ marginTop: 'calc(clamp(44px, 5.5vw, 72px) + 20px)' }}>
          <AnimatePresence mode="wait">
            {inView && (
              <motion.div
                key={activeIdx}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 30 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                style={{ width: '100%' }}
              >
                {/* Skewed container */}
                <div
                  style={{
                    transform: `skewX(${SKEW}deg)`,
                    borderLeft: `5px solid ${CYAN_DARK}`,
                    boxShadow: `4px 4px 0px 0px ${RED_SHADOW}`,
                    overflow: 'hidden',
                  }}
                >
                  {/* ── White header ── */}
                  <div
                    style={{
                      background: '#ffffff',
                      padding: '16px 24px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 14, transform: `skewX(${-SKEW}deg)` }}>
                      <span
                        style={{
                          background: '#000',
                          color: '#fff',
                          padding: '4px 12px',
                          fontFamily: "'Anton', sans-serif",
                          fontSize: 22,
                          lineHeight: 1.2,
                          letterSpacing: '0.05em',
                        }}
                      >
                        {active.id}
                      </span>
                      <span
                        style={{
                          fontFamily: "'Anton', sans-serif",
                          fontSize: 'clamp(20px, 1.8vw, 28px)',
                          letterSpacing: '0.08em',
                          fontStyle: 'italic',
                          color: '#000',
                        }}
                      >
                        SKILL DETAIL
                      </span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: 2, transform: `skewX(${-SKEW}deg)` }}>
                      <span
                        style={{
                          fontFamily: "'Anton', sans-serif",
                          fontSize: 'clamp(26px, 2.2vw, 36px)',
                          color: '#000',
                          lineHeight: 1,
                        }}
                      >
                        {active.rank}
                      </span>
                      <span
                        style={{
                          fontFamily: "'Anton', sans-serif",
                          fontSize: 'clamp(26px, 2.2vw, 36px)',
                          color: 'rgba(0,0,0,0.4)',
                          lineHeight: 1,
                        }}
                      >
                        /{active.max}
                      </span>
                    </div>
                  </div>

                  {/* ── Navy body ── */}
                  <div
                    style={{
                      background: NAVY,
                      padding: '24px 28px 28px 28px',
                    }}
                  >
                    <div style={{ transform: `skewX(${-SKEW}deg)` }}>
                      {/* Description label */}
                      <span
                        style={{
                          fontFamily: "'Bebas Neue', sans-serif",
                          fontSize: 13,
                          letterSpacing: '0.15em',
                          color: CYAN,
                          opacity: 0.65,
                          display: 'block',
                          marginBottom: 12,
                        }}
                      >
                        DESCRIPTION
                      </span>

                      {/* Description text */}
                      <p
                        style={{
                          fontFamily: "'Rajdhani', sans-serif",
                          fontWeight: 500,
                          fontSize: 'clamp(16px, 1.3vw, 20px)',
                          lineHeight: 1.55,
                          color: '#f6fbff',
                          marginBottom: 24,
                        }}
                      >
                        {active.desc}
                      </p>

                      {/* Progression bar */}
                      <div style={{ display: 'flex', gap: 6 }}>
                        {Array.from({ length: active.max }).map((_, i) => (
                          <div
                            key={i}
                            style={{
                              width: 22,
                              height: 10,
                              background: i < active.rank ? CYAN : 'rgba(142,245,255,0.1)',
                              transition: 'background 0.3s ease',
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  )
}
