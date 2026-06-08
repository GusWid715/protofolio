import { useRef, useState, useEffect } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { GhostText } from '@/components/shared'

/* ─── Data (original) ───────────────────────────────────────────────────────── */

const SKILLS = [
  { id: 'I',   title: 'Python Programming', subtitle: 'Backend / Automation', rank: 7, max: 10, desc: 'Extensive experience in writing scripts for data scraping, automation, and backend logic.' },
  { id: 'II',  title: 'Data Analysis',      subtitle: 'Data Science',         rank: 7, max: 10, desc: 'Skilled in exploratory data analysis, data cleaning, and processing unstructured public data.' },
  { id: 'III', title: 'Machine Learning',   subtitle: 'AI / Models',          rank: 6, max: 10, desc: 'Proficient in implementing clustering algorithms like KMeans and PCA for data classification.' },
  { id: 'IV',  title: 'Web Development',    subtitle: 'Frontend / Fullstack', rank: 6, max: 10, desc: 'Building modern, interactive user interfaces using React.js, Tailwind CSS, and Framer Motion.' },
]

const N = SKILLS.length

/* ─── Colors (original palette) ─────────────────────────────────────────────── */

const CYAN        = '#8ef5ff'
const CYAN_DARK   = '#54fafe'
const NAVY        = '#10185f'
const NAVY_DEEP   = '#0b113d'
const BLUE_SHADOW = 'rgba(0,64,255,0.5)'
const SKEW        = -12

/* ─── Shared panel styles ───────────────────────────────────────────────────── */

const panelBg   = 'linear-gradient(180deg, rgba(15,28,105,0.96) 0%, rgba(8,16,68,0.97) 100%)'

/**
 * S3_Skills
 *
 * UI box: skewed parallelogram dari referensi HTML
 * Warna: palette original (navy, cyan, gradient biru)
 * Layout: title seperti S2, panel kanan sejajar card pertama
 * Animasi: stagger CSS dari referensi Resume.tsx
 */
export function S3_Skills() {
  const [activeIdx, setActiveIdx] = useState(0)
  const [mounted, setMounted]     = useState(false)

  const activeIdxRef = useRef(0)
  const cooldownRef  = useRef(false)
  const sectionRef   = useRef<HTMLElement>(null)

  const inViewRef = useRef<HTMLDivElement>(null)
  const inView    = useInView(inViewRef, { once: true, margin: '-10%' })

  // Trigger mount animation when section enters view
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

      const going  = e.deltaY > 0 ? 1 : -1
      const current = activeIdxRef.current
      const next    = current + going

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

          {/* Title — same style & position as S2 About Me */}
          <div
            className="font-anton leading-[0.9] text-[#f6fbff] tracking-[2px] ml-3 mb-2"
            style={{
              fontSize: 'clamp(44px, 5.5vw, 72px)',
              opacity: mounted ? 1 : 0,
              transform: mounted ? 'translateX(0)' : 'translateX(-24px)',
              transition: 'opacity 0.35s ease, transform 0.35s ease',
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
                  transform: mounted ? 'translateX(0)' : 'translateX(-48px)',
                  transition: `opacity 0.4s ease ${index * 55}ms, transform 0.4s cubic-bezier(0.22,1,0.36,1) ${index * 55}ms`,
                }}
              >
                {/* Skewed card container */}
                <div
                  style={{
                    position: 'relative',
                    transform: `skewX(${SKEW}deg)`,
                    background: isActive ? '#ffffff' : NAVY,
                    padding: '18px 24px 18px 58px',
                    borderLeft: `5px solid ${isActive ? CYAN_DARK : 'transparent'}`,
                    boxShadow: isActive
                      ? `4px 4px 0px 0px ${BLUE_SHADOW}, inset 0 0 0 1px rgba(133,244,255,0.1)`
                      : `4px 4px 0px 0px ${BLUE_SHADOW}`,
                    transition: 'all 0.25s ease',
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.borderLeftColor = CYAN_DARK
                      e.currentTarget.style.background = 'rgba(84,250,254,0.12)'
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.borderLeftColor = 'transparent'
                      e.currentTarget.style.background = NAVY
                    }
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
              transition: 'opacity 0.4s ease 0.35s',
            }}
          >
            <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 13, letterSpacing: 3, color: CYAN }}>
              // SCROLL TO NAVIGATE
            </span>
            <div style={{ width: 80, height: 1, borderBottom: `1px dashed ${CYAN}`, opacity: 0.5 }} />
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════════════
            RIGHT — Detail panel (top-aligned with first card, original colors)
        ══════════════════════════════════════════════════════════════════ */}
        <div className="flex flex-col" style={{ marginTop: 'calc(clamp(44px, 5.5vw, 72px) + 20px)' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIdx}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              style={{
                width: '100%',
                minHeight: '450px',
                padding: '22px 24px 24px 24px',
                background: panelBg,
                clipPath: 'polygon(0 0, 100% 0, calc(100% - 18px) 100%, 0 100%)',
                boxShadow: 'inset 0 0 0 1px rgba(133,244,255,0.16), 16px 16px 0 rgba(0,6,30,0.55)',
              }}
            >
              {/* TOP BAR */}
              <div
                style={{
                  display: 'grid', gridTemplateColumns: '70px 1fr auto',
                  alignItems: 'center', gap: 14, minHeight: 92, padding: '0 18px',
                  background: 'linear-gradient(90deg, #8ef5ff 0%, #d3fdff 100%)',
                  clipPath: 'polygon(0 0, 100% 0, calc(100% - 16px) 100%, 0 100%)',
                  color: '#08153f', boxShadow: '10px 0 0 rgba(255,94,136,0.88)',
                }}
              >
                <div style={{ fontFamily: "'Anton', sans-serif", fontSize: 46, lineHeight: 1 }}>0{activeIdx + 1}</div>
                <div style={{ fontFamily: "'Anton', sans-serif", fontSize: 42, lineHeight: 0.92, letterSpacing: 1 }}>SKILL DETAIL</div>
                <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 42, letterSpacing: 2 }}>{active.rank}/{active.max}</div>
              </div>

              {/* DESC BOX */}
              <div style={{ marginTop: 22, padding: 18, background: 'rgba(5,13,57,0.97)', clipPath: 'polygon(0 0, 100% 0, calc(100% - 16px) 100%, 0 100%)' }}>
                <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 30, letterSpacing: 2, color: '#91f5ff', marginBottom: 14 }}>DESCRIPTION</div>
                <div style={{ fontFamily: "'Anton', sans-serif", fontSize: 24, lineHeight: 1.3, color: '#edfaff', marginBottom: 8 }}>
                  {active.desc}
                </div>
              </div>

              {/* RANK METER */}
              <div className="flex gap-[4px] mt-6" style={{ padding: '0 18px' }}>
                {Array.from({ length: active.max }).map((_, i) => (
                  <div
                    key={i}
                    className="h-[14px] flex-1"
                    style={{
                      background: i < active.rank ? CYAN : 'rgba(142, 245, 255, 0.1)',
                      clipPath: 'polygon(0 0, 100% 0, calc(100% - 4px) 100%, 0 100%)',
                    }}
                  />
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  )
}
