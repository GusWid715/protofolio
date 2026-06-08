import { useRef, useState, useEffect } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { skillDetailTransition, staggerContainer, slideInLeft, fadeStagger } from '@/animations/variants'
import { GhostText, SlashLabel } from '@/components/shared'

const SKILLS = [
  { id: 'I',   title: 'Python Programming', subtitle: 'Backend / Automation', rank: 7, max: 10, desc: 'Extensive experience in writing scripts for data scraping, automation, and backend logic.' },
  { id: 'II',  title: 'Data Analysis',      subtitle: 'Data Science',         rank: 7, max: 10, desc: 'Skilled in exploratory data analysis, data cleaning, and processing unstructured public data.' },
  { id: 'III', title: 'Machine Learning',   subtitle: 'AI / Models',          rank: 6, max: 10, desc: 'Proficient in implementing clustering algorithms like KMeans and PCA for data classification.' },
  { id: 'IV',  title: 'Web Development',    subtitle: 'Frontend / Fullstack', rank: 6, max: 10, desc: 'Building modern, interactive user interfaces using React.js, Tailwind CSS, and Framer Motion.' },
]

const N = SKILLS.length

/* ─── Style constants ─────────────────────────────────────────────────── */

const CYAN       = '#54fafe'
const DEEP_NAVY  = '#001A66'
const BLUE_SHADOW = 'rgba(0,64,255,0.5)'
const SKEW       = -12

/**
 * S3_Skills
 *
 * Layout asli dipertahankan (grid-cols-2, items-center, h-screen snap).
 * Hanya UI box (skill cards + detail panel) yang menggunakan
 * gaya skewed-parallelogram sesuai referensi HTML.
 */
export function S3_Skills() {
  const [activeIdx, setActiveIdx] = useState(0)

  const activeIdxRef = useRef(0)
  const cooldownRef  = useRef(false)
  const sectionRef   = useRef<HTMLElement>(null)

  const inViewRef = useRef<HTMLDivElement>(null)
  const inView    = useInView(inViewRef, { once: true, margin: '-10%' })

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

      <div ref={inViewRef} className="relative z-10 w-full px-8 md:px-14 grid grid-cols-2 gap-8 items-center">

        {/* ── LEFT — Skill list ─────────────────────────── */}
        <motion.div
          className="flex flex-col gap-3"
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {/* Title — original style */}
          <motion.div variants={slideInLeft}>
            <SlashLabel text="// SECTION 03" />
            <div className="font-anton text-[clamp(44px,5.5vw,72px)] leading-[0.9] text-[#f6fbff] tracking-[2px] mb-2 ml-1">
              SKILLS
            </div>
          </motion.div>

          {/* Skill cards — new skewed style */}
          {SKILLS.map((skill, index) => {
            const isActive = index === activeIdx
            return (
              <motion.div
                key={skill.title}
                variants={slideInLeft}
                className="cursor-pointer"
                onMouseEnter={() => {
                  activeIdxRef.current = index
                  setActiveIdx(index)
                }}
              >
                <div
                  style={{
                    position: 'relative',
                    transform: `skewX(${SKEW}deg)`,
                    background: isActive ? '#ffffff' : `${DEEP_NAVY}cc`,
                    padding: '16px 22px 16px 56px',
                    borderLeft: `5px solid ${isActive ? CYAN : 'transparent'}`,
                    boxShadow: `4px 4px 0px 0px ${BLUE_SHADOW}`,
                    transition: 'all 0.25s ease',
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.borderLeftColor = CYAN
                      e.currentTarget.style.background = 'rgba(84,250,254,0.12)'
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
                      left: 12,
                      top: '50%',
                      transform: `translateY(-50%) skewX(${-SKEW}deg)`,
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
                      transform: `skewX(${-SKEW}deg)`,
                    }}
                  >
                    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minWidth: 0 }}>
                      <span
                        style={{
                          fontFamily: "'Anton', sans-serif",
                          fontSize: 'clamp(20px, 2vw, 30px)',
                          lineHeight: 1,
                          letterSpacing: '0.05em',
                          color: isActive ? '#000' : '#fff',
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
                          fontFamily: "'Orbitron', monospace",
                          fontSize: 'clamp(8px, 0.65vw, 11px)',
                          fontWeight: 700,
                          letterSpacing: '0.15em',
                          color: isActive ? 'rgba(0,0,0,0.55)' : 'rgba(84,250,254,0.45)',
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
                          fontFamily: "'Orbitron', monospace",
                          fontSize: 'clamp(8px, 0.6vw, 10px)',
                          fontWeight: 700,
                          letterSpacing: '0.15em',
                          color: isActive ? 'rgba(0,0,0,0.45)' : 'rgba(84,250,254,0.35)',
                          transition: 'color 0.25s ease',
                        }}
                      >
                        RANK
                      </span>
                      <span
                        style={{
                          fontFamily: "'Anton', sans-serif",
                          fontSize: 'clamp(28px, 2.5vw, 42px)',
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
          <div className="flex items-center gap-3 mt-1 ml-4">
            <span
              style={{
                fontFamily: "'Orbitron', monospace",
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: '0.2em',
                color: CYAN,
                opacity: 0.55,
              }}
            >
              // SCROLL TO NAVIGATE
            </span>
            <div
              style={{
                width: 80,
                height: 1,
                borderBottom: `1px dashed ${CYAN}`,
                opacity: 0.3,
              }}
            />
          </div>
        </motion.div>

        {/* ── RIGHT — Active skill detail ───────────────── */}
        <motion.div
          className="flex flex-col justify-center"
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
                minHeight: 420,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
              }}
            >
              {/* Skewed detail panel */}
              <div
                style={{
                  transform: `skewX(${SKEW}deg)`,
                  boxShadow: `4px 4px 0px 0px ${BLUE_SHADOW}`,
                  borderLeft: `5px solid ${CYAN}`,
                  overflow: 'hidden',
                }}
              >
                {/* ── Header (white bar) ── */}
                <div
                  style={{
                    background: '#fff',
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
                        fontSize: 'clamp(22px, 2vw, 32px)',
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
                        fontSize: 'clamp(28px, 2.5vw, 40px)',
                        color: '#000',
                        lineHeight: 1,
                      }}
                    >
                      {active.rank}
                    </span>
                    <span
                      style={{
                        fontFamily: "'Anton', sans-serif",
                        fontSize: 'clamp(28px, 2.5vw, 40px)',
                        color: 'rgba(0,0,0,0.45)',
                        lineHeight: 1,
                      }}
                    >
                      /{active.max}
                    </span>
                  </div>
                </div>

                {/* ── Body (navy) ── */}
                <div
                  style={{
                    background: `${DEEP_NAVY}cc`,
                    padding: '24px 28px 28px 28px',
                  }}
                >
                  <div style={{ transform: `skewX(${-SKEW}deg)` }}>
                    <span
                      style={{
                        fontFamily: "'Orbitron', monospace",
                        fontSize: 11,
                        fontWeight: 700,
                        letterSpacing: '0.15em',
                        color: CYAN,
                        opacity: 0.65,
                        display: 'block',
                        marginBottom: 12,
                      }}
                    >
                      DESCRIPTION
                    </span>

                    <p
                      style={{
                        fontFamily: "'Rajdhani', sans-serif",
                        fontWeight: 500,
                        fontSize: 'clamp(16px, 1.3vw, 20px)',
                        lineHeight: 1.55,
                        color: '#fff',
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
                            width: 20,
                            height: 10,
                            background: i < active.rank ? CYAN : 'rgba(84,250,254,0.12)',
                            transition: 'background 0.3s ease',
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  )
}
