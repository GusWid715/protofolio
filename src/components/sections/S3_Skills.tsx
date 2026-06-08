import { useRef, useState, useEffect } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { skillDetailTransition, staggerContainer, slideInLeft, fadeStagger } from '@/animations/variants'
import { GhostText } from '@/components/shared'

/* ─── Data ──────────────────────────────────────────────────────────────────── */

const SKILLS = [
  { id: 'I',   title: 'PYTHON',     subtitle: 'BACKEND / AUTOMATION',   rank: 8, max: 10, desc: 'Extensive experience in writing scripts for data scraping, automation, and backend logic.' },
  { id: 'II',  title: 'TYPESCRIPT', subtitle: 'FRONTEND ARCHITECTURE', rank: 8, max: 10, desc: 'Skilled in building type-safe, scalable frontend applications with React and modern TypeScript patterns.' },
  { id: 'III', title: 'AWS CLOUD',  subtitle: 'INFRASTRUCTURE',        rank: 6, max: 10, desc: 'Proficient in deploying and managing cloud infrastructure using AWS services like EC2, S3, and Lambda.' },
  { id: 'IV',  title: 'UI DESIGN',  subtitle: 'VISUAL SYSTEMS',        rank: 9, max: 10, desc: 'Building modern, interactive user interfaces with attention to detail, motion design, and visual hierarchy.' },
]

const N = SKILLS.length

/* ─── Style constants ───────────────────────────────────────────────────────── */

const CYAN     = '#54fafe'
const DEEP_NAVY = '#001A66'
const BLUE_SHADOW = 'rgba(0,64,255,0.5)'

/* ─── Component ─────────────────────────────────────────────────────────────── */

export function S3_Skills() {
  const [activeIdx, setActiveIdx] = useState(0)
  const activeIdxRef = useRef(0)
  const cooldownRef  = useRef(false)
  const sectionRef   = useRef<HTMLElement>(null)

  const inViewRef = useRef<HTMLDivElement>(null)
  const inView    = useInView(inViewRef, { once: true, margin: '-10%' })

  /* ── Scroll-to-navigate wheel handler ──────────────────────────────────── */
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
      className="relative h-screen flex items-center justify-center overflow-hidden"
    >
      <GhostText text="ARCANA" className="bottom-[-2vh] left-[-1vw]" />

      <div ref={inViewRef} className="relative z-10 w-full h-full flex flex-col px-8 md:px-14 pt-[8vh]">

        {/* ── Title ──────────────────────────────────────────── */}
        <motion.div
          variants={slideInLeft}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="mb-6"
        >
          <h2
            className="font-anton text-white italic drop-shadow-[3px_3px_0px_#0040ff]"
            style={{
              fontSize: 'clamp(52px, 6.5vw, 88px)',
              lineHeight: 0.95,
              letterSpacing: '0.02em',
              transform: 'skewX(-12deg)',
            }}
          >
            SKILLS
          </h2>
        </motion.div>

        {/* ── Content Grid ───────────────────────────────────── */}
        <div className="flex gap-8 flex-1 min-h-0 pb-[10vh]">

          {/* ── LEFT — Skill cards ─────────────────────────── */}
          <motion.div
            className="flex flex-col gap-3 w-[42%] shrink-0 justify-center"
            variants={staggerContainer}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            {SKILLS.map((skill, index) => {
              const isActive = index === activeIdx
              return (
                <motion.div
                  key={skill.title}
                  variants={slideInLeft}
                  className="cursor-pointer"
                  onClick={() => { activeIdxRef.current = index; setActiveIdx(index) }}
                  onMouseEnter={() => { activeIdxRef.current = index; setActiveIdx(index) }}
                >
                  {/* Skewed card */}
                  <div
                    style={{
                      position: 'relative',
                      transform: 'skewX(-12deg)',
                      background: isActive ? '#ffffff' : `${DEEP_NAVY}cc`,
                      padding: '14px 20px 14px 52px',
                      borderLeft: `5px solid ${isActive ? CYAN : 'transparent'}`,
                      boxShadow: `4px 4px 0px 0px ${BLUE_SHADOW}`,
                      transition: 'all 0.25s ease',
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.borderLeftColor = CYAN
                        e.currentTarget.style.background = 'rgba(84,250,254,0.15)'
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.borderLeftColor = 'transparent'
                        e.currentTarget.style.background = `${DEEP_NAVY}cc`
                      }
                    }}
                  >
                    {/* Roman numeral badge */}
                    <div
                      style={{
                        position: 'absolute',
                        left: 10,
                        top: '50%',
                        transform: 'translateY(-50%) skewX(12deg)',
                        background: CYAN,
                        color: '#000',
                        padding: '2px 8px',
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
                        transform: 'skewX(12deg)',
                      }}
                    >
                      {/* Name + subtitle */}
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span
                          style={{
                            fontFamily: "'Anton', sans-serif",
                            fontSize: 'clamp(20px, 2vw, 28px)',
                            lineHeight: 1,
                            letterSpacing: '0.05em',
                            color: isActive ? '#000' : '#fff',
                            transition: 'color 0.25s ease',
                          }}
                        >
                          {skill.title}
                        </span>
                        <span
                          style={{
                            fontFamily: "'Orbitron', monospace",
                            fontSize: 'clamp(8px, 0.7vw, 11px)',
                            fontWeight: 700,
                            letterSpacing: '0.15em',
                            color: isActive ? 'rgba(0,0,0,0.6)' : 'rgba(84,250,254,0.5)',
                            marginTop: 3,
                            transition: 'color 0.25s ease',
                          }}
                        >
                          {skill.subtitle}
                        </span>
                      </div>

                      {/* Rank */}
                      <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, flexShrink: 0 }}>
                        <span
                          style={{
                            fontFamily: "'Orbitron', monospace",
                            fontSize: 'clamp(8px, 0.6vw, 10px)',
                            fontWeight: 700,
                            letterSpacing: '0.15em',
                            color: isActive ? 'rgba(0,0,0,0.5)' : 'rgba(84,250,254,0.4)',
                            transition: 'color 0.25s ease',
                          }}
                        >
                          RANK
                        </span>
                        <span
                          style={{
                            fontFamily: "'Anton', sans-serif",
                            fontSize: 'clamp(28px, 2.5vw, 40px)',
                            lineHeight: 1,
                            color: isActive ? '#000' : '#fff',
                            transition: 'color 0.25s ease',
                          }}
                        >
                          {skill.rank}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}

            {/* Scroll hint */}
            <motion.div variants={slideInLeft} className="flex items-center gap-3 mt-4 ml-2">
              <span
                style={{
                  fontFamily: "'Orbitron', monospace",
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: '0.2em',
                  color: CYAN,
                  opacity: 0.6,
                }}
              >
                // SCROLL TO NAVIGATE
              </span>
              <div
                style={{
                  width: 80,
                  height: 1,
                  borderBottom: `1px dashed ${CYAN}`,
                  opacity: 0.35,
                }}
              />
            </motion.div>
          </motion.div>

          {/* ── RIGHT — Skill detail panel ──────────────────── */}
          <motion.div
            className="flex-1 flex items-end justify-center pb-4"
            variants={fadeStagger}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIdx}
                variants={skillDetailTransition}
                initial="initial"
                animate="animate"
                exit="exit"
                style={{
                  width: '100%',
                  maxWidth: 560,
                  transform: 'skewX(-12deg)',
                  boxShadow: `4px 4px 0px 0px ${BLUE_SHADOW}`,
                  borderLeft: `5px solid ${CYAN}`,
                  overflow: 'hidden',
                }}
              >
                {/* ── Header (white bar) ──────────────────── */}
                <div
                  style={{
                    background: '#fff',
                    padding: '14px 22px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, transform: 'skewX(12deg)' }}>
                    {/* Badge */}
                    <span
                      style={{
                        background: '#000',
                        color: '#fff',
                        padding: '3px 10px',
                        fontFamily: "'Anton', sans-serif",
                        fontSize: 20,
                        lineHeight: 1.2,
                        letterSpacing: '0.05em',
                      }}
                    >
                      {active.id}
                    </span>
                    <span
                      style={{
                        fontFamily: "'Anton', sans-serif",
                        fontSize: 'clamp(18px, 1.8vw, 26px)',
                        letterSpacing: '0.08em',
                        fontStyle: 'italic',
                        color: '#000',
                      }}
                    >
                      SKILL DETAIL
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 2, transform: 'skewX(12deg)' }}>
                    <span
                      style={{
                        fontFamily: "'Anton', sans-serif",
                        fontSize: 'clamp(24px, 2.2vw, 34px)',
                        color: '#000',
                        lineHeight: 1,
                      }}
                    >
                      {active.rank}
                    </span>
                    <span
                      style={{
                        fontFamily: "'Anton', sans-serif",
                        fontSize: 'clamp(24px, 2.2vw, 34px)',
                        color: 'rgba(0,0,0,0.5)',
                        lineHeight: 1,
                      }}
                    >
                      /{active.max}
                    </span>
                  </div>
                </div>

                {/* ── Body (navy) ─────────────────────────── */}
                <div
                  style={{
                    background: `${DEEP_NAVY}cc`,
                    padding: '22px 26px 24px 26px',
                  }}
                >
                  <div style={{ transform: 'skewX(12deg)' }}>
                    {/* Description label */}
                    <span
                      style={{
                        fontFamily: "'Orbitron', monospace",
                        fontSize: 10,
                        fontWeight: 700,
                        letterSpacing: '0.15em',
                        color: CYAN,
                        opacity: 0.7,
                        display: 'block',
                        marginBottom: 10,
                      }}
                    >
                      DESCRIPTION
                    </span>

                    {/* Description text */}
                    <p
                      style={{
                        fontFamily: "'Rajdhani', sans-serif",
                        fontWeight: 500,
                        fontSize: 'clamp(15px, 1.3vw, 19px)',
                        lineHeight: 1.5,
                        color: '#fff',
                        marginBottom: 22,
                      }}
                    >
                      {active.desc}
                    </p>

                    {/* Progression bar */}
                    <div style={{ display: 'flex', gap: 5 }}>
                      {Array.from({ length: active.max }).map((_, i) => (
                        <div
                          key={i}
                          style={{
                            width: 18,
                            height: 8,
                            background: i < active.rank ? CYAN : 'rgba(84,250,254,0.15)',
                            transition: 'background 0.3s ease',
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
