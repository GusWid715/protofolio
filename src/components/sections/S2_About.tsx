import { motion, useInView, type Variants } from 'framer-motion'
import { useRef } from 'react'

const STATS = [
  { id: 'I', label: 'ACADEMICS', level: 'Above Average', value: 3, max: 5 },
  { id: 'II', label: 'CHARM', level: 'Unpolished', value: 2, max: 5 },
  { id: 'III', label: 'COURAGE', level: 'Tough', value: 4, max: 5 },
]

const DATA = [
  { id: 'NAMA', value: 'Ida Bagus Gede Widiastana Bawaskara' },
  { id: 'PERAN', value: 'Mahasiswa' },
  { id: 'LOKASI', value: 'Bali, Indonesia' },
  { id: 'STATUS', value: 'Active' },
  { id: 'TECH', value: 'Python, ML, PHP, Laravel' },
]

const slideIn: Variants = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 45, damping: 14 } },
}

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.2 } },
}

const rowIn: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 60 } },
}

const titleIn: Variants = {
  hidden: { opacity: 0, y: -30 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 40, damping: 14, delay: 0.1 } },
}

export function S2_About() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-15%' })

  return (
    <section
      ref={ref}
      id="s2-about"
      className="relative h-screen flex overflow-hidden"
    >
      {/* ── Giant title watermark — behind character (z-0 < StickyCharacter z-1) ── */}
      <motion.div
        variants={titleIn}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        className="absolute pointer-events-none select-none"
        style={{
          bottom: '-2vh',
          right: '-1vw',
          zIndex: 0,
          fontFamily: "'Anton', sans-serif",
          fontSize: 'clamp(120px, 18vw, 240px)',
          lineHeight: 0.85,
          letterSpacing: 2,
          color: 'rgba(246,251,255,0.055)',
          textAlign: 'right',
          whiteSpace: 'nowrap',
        }}
      >
        ABOUT ME
      </motion.div>

      {/* ── LEFT — Panels (vertically centered) ─── */}
      <div className="relative z-10 flex flex-col justify-center gap-4 px-8 md:px-14 w-[48%] shrink-0">

        {/* ── Section title — selaras gaya S3 SKILLS ── */}
        <motion.div
          variants={slideIn}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="font-anton leading-[0.9] text-[#f6fbff] tracking-[2px] ml-3"
          style={{ fontSize: 'clamp(44px, 5.5vw, 72px)' }}
        >
          ABOUT ME
        </motion.div>

        {/* ── SOCIAL STATS BOX ──────────────────── */}
        <motion.div
          variants={slideIn}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          style={{
            transform: 'skewX(-12deg)',
            borderLeft: '5px solid #54fafe',
            boxShadow: '4px 4px 0px 0px rgba(255, 0, 0, 0.5)',
            overflow: 'hidden',
          }}
        >
          {/* Header bar */}
          <div style={{
            background: '#ffffff',
            padding: '16px 24px',
            display: 'flex',
            alignItems: 'center',
            gap: 14,
          }}>
            <div style={{ fontFamily: "'Anton', sans-serif", fontSize: 26, lineHeight: 1, letterSpacing: 1, color: '#000', transform: 'skewX(12deg)' }}>
              SOCIAL STATS
            </div>
          </div>

          {/* Stat rows */}
          <div style={{ background: '#10185f', padding: '24px 28px' }}>
            <motion.div
              className="flex flex-col gap-3"
              variants={stagger}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
            >
              {STATS.map(stat => (
                <motion.div key={stat.label} variants={rowIn}>
                  <div style={{ transform: 'skewX(12deg)' }}>
                    <div className="flex items-center gap-3">
                      {/* Badge */}
                      <div style={{
                        width: 36, height: 44, flexShrink: 0,
                        background: '#0b113d',
                        border: '2px solid #9cf7ff',
                        clipPath: 'polygon(14% 0, 100% 0, 84% 100%, 0 100%)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}>
                        <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 18, color: '#d2fdff' }}>
                          {stat.id}
                        </span>
                      </div>

                      <div className="flex flex-col gap-[3px] flex-1">
                        <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 12, color: '#8ef5ff', letterSpacing: 3 }}>
                          {stat.label}
                        </span>
                        <div className="flex gap-[3px] h-[7px]" style={{ width: '75%' }}>
                          {Array.from({ length: stat.max }).map((_, i) => (
                            <div key={i} className="flex-1" style={{
                              background: i < stat.value ? '#f4bc20' : 'rgba(84,250,254,0.15)',
                              clipPath: 'polygon(0 0, 100% 0, calc(100% - 3px) 100%, 0 100%)',
                            }} />
                          ))}
                        </div>
                        <span style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 600, fontSize: 16, color: '#f6fbff', textAlign: 'left' }}>
                          {stat.level}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* ── PERSONAL DATA BOX ─────────────────── */}
        <motion.div
          variants={slideIn}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          style={{
            transform: 'skewX(-12deg)',
            borderLeft: '5px solid #54fafe',
            boxShadow: '4px 4px 0px 0px rgba(255, 0, 0, 0.5)',
            overflow: 'hidden',
          }}
        >
          {/* Header bar */}
          <div style={{
            background: '#ffffff',
            padding: '16px 24px',
            display: 'flex',
            alignItems: 'center',
          }}>
            <div style={{ fontFamily: "'Anton', sans-serif", fontSize: 26, lineHeight: 1, letterSpacing: 1, color: '#000', transform: 'skewX(12deg)' }}>
              PERSONAL DATA
            </div>
          </div>

          {/* Data rows */}
          <div style={{ background: '#10185f', padding: '24px 28px' }}>
            <motion.div
              className="flex flex-col"
              variants={stagger}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
            >
              {DATA.map((item, index) => (
                <motion.div key={item.id} variants={rowIn} className="flex flex-col">
                  <div style={{ transform: 'skewX(12deg)' }}>
                    <div className="flex items-center py-[8px] gap-3">
                      <span style={{ color: '#54fafe', fontSize: 8 }}>▶</span>
                      <span style={{
                        fontFamily: "'Bebas Neue', sans-serif",
                        fontSize: 12, letterSpacing: 3, color: '#8ef5ff',
                        width: 80, flexShrink: 0,
                      }}>
                        {item.id}
                      </span>
                      <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: 11 }}>:</span>
                      <span style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 600, fontSize: 16, color: '#f6fbff', textAlign: 'left' }}>
                        {item.value}
                      </span>
                    </div>
                  </div>
                  {index !== DATA.length - 1 && (
                    <div style={{ height: 1, background: 'rgba(133,244,255,0.1)' }} />
                  )}
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>

      </div>

    </section>
  )
}
