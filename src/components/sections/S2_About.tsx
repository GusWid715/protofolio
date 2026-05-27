import { motion, useInView, type Variants } from 'framer-motion'
import { useRef } from 'react'
import { GhostText } from '@/components/shared'

const STATS = [
  { id: 'I', label: 'ACADEMICS', level: 'Above Average', value: 3, max: 5 },
  { id: 'II', label: 'CHARM', level: 'Unpolished', value: 2, max: 5 },
  { id: 'III', label: 'COURAGE', level: 'Tough', value: 4, max: 5 },
]

const DATA = [
  { id: 'NAMA', value: 'Ida Bagus Gede Widiastana B.' },
  { id: 'PERAN', value: 'Data Science & Web Dev' },
  { id: 'LOKASI', value: 'Indonesia' },
  { id: 'STATUS', value: 'ACTIVE' },
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
      <GhostText text="STATUS" className="bottom-[-2vh] left-[-1vw]" />

      {/* ── LEFT — Panels (vertically centered) ─── */}
      <div className="relative z-10 flex flex-col justify-center gap-4 px-8 md:px-14 w-[48%] shrink-0">

        {/* ── SOCIAL STATS BOX ──────────────────── */}
        <motion.div
          variants={slideIn}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          style={{
            background: 'linear-gradient(180deg, rgba(15,28,105,0.96) 0%, rgba(8,16,68,0.97) 100%)',
            clipPath: 'polygon(0 0, 100% 0, calc(100% - 18px) 100%, 0 100%)',
            boxShadow: 'inset 0 0 0 1px rgba(133,244,255,0.16), 8px 8px 0 rgba(0,6,30,0.55)',
          }}
        >
          {/* Header bar */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 14,
            padding: '10px 18px',
            background: 'linear-gradient(90deg, #8ef5ff 0%, #d3fdff 100%)',
            clipPath: 'polygon(0 0, 100% 0, calc(100% - 12px) 100%, 0 100%)',
            color: '#08153f',
            boxShadow: '8px 0 0 rgba(255,94,136,0.88)',
          }}>
            <div style={{ fontFamily: "'Anton', sans-serif", fontSize: 26, lineHeight: 1, letterSpacing: 1 }}>
              SOCIAL STATS
            </div>
          </div>

          {/* Stat rows */}
          <motion.div
            className="flex flex-col gap-3 px-4 py-4"
            variants={stagger}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            {STATS.map(stat => (
              <motion.div key={stat.label} variants={rowIn} className="flex items-center gap-3">
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
                  <span style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 600, fontSize: 14, color: '#f6fbff' }}>
                    {stat.level}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* ── PERSONAL DATA BOX ─────────────────── */}
        <motion.div
          variants={slideIn}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          style={{
            background: 'linear-gradient(180deg, rgba(15,28,105,0.96) 0%, rgba(8,16,68,0.97) 100%)',
            clipPath: 'polygon(0 0, 100% 0, calc(100% - 18px) 100%, 0 100%)',
            boxShadow: 'inset 0 0 0 1px rgba(133,244,255,0.16), 8px 8px 0 rgba(0,6,30,0.55)',
          }}
        >
          {/* Header bar */}
          <div style={{
            display: 'flex', alignItems: 'center',
            padding: '10px 18px',
            background: 'linear-gradient(90deg, #8ef5ff 0%, #d3fdff 100%)',
            clipPath: 'polygon(0 0, 100% 0, calc(100% - 12px) 100%, 0 100%)',
            color: '#08153f',
            boxShadow: '8px 0 0 rgba(255,94,136,0.88)',
          }}>
            <div style={{ fontFamily: "'Anton', sans-serif", fontSize: 26, lineHeight: 1, letterSpacing: 1 }}>
              PERSONAL DATA
            </div>
          </div>

          {/* Data rows */}
          <motion.div
            className="flex flex-col px-4 py-3"
            variants={stagger}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            {DATA.map((item, index) => (
              <motion.div key={item.id} variants={rowIn} className="flex flex-col">
                <div className="flex items-center py-[8px] gap-3">
                  <span style={{ color: '#54fafe', fontSize: 8 }}>▶</span>
                  <span style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: 12, letterSpacing: 3, color: '#8ef5ff',
                    width: 64, flexShrink: 0,
                  }}>
                    {item.id}
                  </span>
                  <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: 11 }}>:</span>
                  <span style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 600, fontSize: 14, color: '#f6fbff' }}>
                    {item.value}
                  </span>
                </div>
                {index !== DATA.length - 1 && (
                  <div style={{ height: 1, background: 'rgba(133,244,255,0.1)' }} />
                )}
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

      </div>

      {/* ── RIGHT — Title above character area ──── */}
      <div className="relative z-10 flex-1 flex flex-col justify-start pt-[10vh] px-6 pointer-events-none">
        <motion.div
          variants={titleIn}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {/* Accent line */}
          <div style={{
            width: 48, height: 3, marginBottom: 8,
            background: 'linear-gradient(90deg, #8ef5ff, transparent)',
          }} />
          <div style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 11, letterSpacing: 5, color: '#8ef5ff', opacity: 0.7,
            marginBottom: 4,
          }}>
          </div>
          <h2 style={{
            fontFamily: "'Anton', sans-serif",
            fontSize: 'clamp(92px, 12vw, 96px)',
            lineHeight: 0.9,
            color: '#f6fbff',
            letterSpacing: 2,
          }}>
            ABOUT ME
          </h2>
        </motion.div>
      </div>

    </section>
  )
}
