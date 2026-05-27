import { motion, useInView, type Variants } from 'framer-motion'
import { useRef } from 'react'
import { GhostText } from '@/components/shared'

const STATS = [
  { id: 'I',   label: 'ACADEMICS', level: 'Above Average', value: 3, max: 5 },
  { id: 'II',  label: 'CHARM',     level: 'Unpolished',    value: 2, max: 5 },
  { id: 'III', label: 'COURAGE',   level: 'Tough',         value: 4, max: 5 },
]

const DATA = [
  { id: 'NAMA',   value: 'Ida Bagus Gede Widiastana B.' },
  { id: 'PERAN',  value: 'Data Science & Web Dev' },
  { id: 'LOKASI', value: 'Indonesia' },
  { id: 'STATUS', value: 'ACTIVE' },
  { id: 'TECH',   value: 'Python, ML, PHP, Laravel' },
]

const slideIn: Variants = {
  hidden:   { opacity: 0, x: -60 },
  visible:  { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 45, damping: 14 } },
}

const staggerList: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.25 } },
}

const rowIn: Variants = {
  hidden:  { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 60 } },
}

export function S2_About() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-15%' })

  return (
    <section
      ref={ref}
      id="s2-about"
      className="relative h-screen flex items-center overflow-hidden"
    >
      <GhostText text="STATUS" className="bottom-[-2vh] left-[-1vw]" />

      {/* ── Left content column ─────────────────── */}
      <div className="relative z-10 flex flex-col justify-center gap-5 px-8 md:px-16 w-[52%] max-w-2xl">

        {/* Section title */}
        <motion.div
          variants={slideIn}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <div
            className="font-anton text-[72px] leading-[0.9] text-[#f6fbff] tracking-[2px] mb-2 ml-3"
          >
            ABOUT ME
          </div>
        </motion.div>

        {/* ── STATS BOX — selaras S3 ──────────────── */}
        <motion.div
          variants={slideIn}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          style={{
            background: 'linear-gradient(180deg, rgba(15,28,105,0.96) 0%, rgba(8,16,68,0.97) 100%)',
            clipPath: 'polygon(0 0, 100% 0, calc(100% - 18px) 100%, 0 100%)',
            boxShadow: 'inset 0 0 0 1px rgba(133,244,255,0.16), 8px 8px 0 rgba(0,6,30,0.55)',
            padding: '20px 24px',
          }}
        >
          {/* Header bar */}
          <div style={{
            display: 'grid', gridTemplateColumns: '1fr auto',
            alignItems: 'center', gap: 14, minHeight: 52,
            padding: '0 14px',
            background: 'linear-gradient(90deg, #8ef5ff 0%, #d3fdff 100%)',
            clipPath: 'polygon(0 0, 100% 0, calc(100% - 12px) 100%, 0 100%)',
            color: '#08153f',
            boxShadow: '8px 0 0 rgba(255,94,136,0.88)',
            marginBottom: 18,
          }}>
            <div style={{ fontFamily: "'Anton', sans-serif", fontSize: 28, lineHeight: 1, letterSpacing: 1 }}>
              SOCIAL STATS
            </div>
            <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 20, letterSpacing: 3 }}>
              STATUS
            </div>
          </div>

          {/* Stat rows */}
          <motion.div
            className="flex flex-col gap-4 px-2"
            variants={staggerList}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            {STATS.map(stat => (
              <motion.div key={stat.label} variants={rowIn} className="flex items-center gap-4">
                {/* Badge */}
                <div style={{
                  width: 42, height: 52, flexShrink: 0,
                  background: '#0b113d',
                  border: '2px solid #9cf7ff',
                  clipPath: 'polygon(14% 0, 100% 0, 84% 100%, 0 100%)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 22, color: '#d2fdff', letterSpacing: 1 }}>
                    {stat.id}
                  </span>
                </div>

                <div className="flex flex-col gap-[4px] flex-1">
                  <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 14, color: '#8ef5ff', letterSpacing: 3 }}>
                    {stat.label}
                  </span>
                  {/* Bar */}
                  <div className="flex gap-[3px] h-[8px]" style={{ width: '70%' }}>
                    {Array.from({ length: stat.max }).map((_, i) => (
                      <div
                        key={i}
                        className="flex-1"
                        style={{
                          background: i < stat.value ? '#f4bc20' : 'rgba(84,250,254,0.15)',
                          clipPath: 'polygon(0 0, 100% 0, calc(100% - 3px) 100%, 0 100%)',
                        }}
                      />
                    ))}
                  </div>
                  <span style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 600, fontSize: 15, color: '#f6fbff' }}>
                    {stat.level}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* ── PERSONAL DATA BOX — selaras S3 ─────── */}
        <motion.div
          variants={slideIn}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          style={{
            background: 'linear-gradient(180deg, rgba(15,28,105,0.96) 0%, rgba(8,16,68,0.97) 100%)',
            clipPath: 'polygon(0 0, 100% 0, calc(100% - 18px) 100%, 0 100%)',
            boxShadow: 'inset 0 0 0 1px rgba(133,244,255,0.16), 8px 8px 0 rgba(0,6,30,0.55)',
            padding: '18px 24px',
          }}
        >
          {/* Header bar */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 14, minHeight: 44,
            padding: '0 14px',
            background: 'linear-gradient(90deg, #8ef5ff 0%, #d3fdff 100%)',
            clipPath: 'polygon(0 0, 100% 0, calc(100% - 12px) 100%, 0 100%)',
            color: '#08153f',
            boxShadow: '8px 0 0 rgba(255,94,136,0.88)',
            marginBottom: 14,
          }}>
            <div style={{ fontFamily: "'Anton', sans-serif", fontSize: 26, lineHeight: 1, letterSpacing: 1 }}>
              PERSONAL DATA
            </div>
          </div>

          {/* Data rows */}
          <motion.div
            className="flex flex-col px-2"
            variants={staggerList}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            {DATA.map((item, index) => (
              <motion.div key={item.id} variants={rowIn} className="flex flex-col">
                <div className="flex items-center py-[10px] gap-3">
                  <span style={{ color: '#54fafe', fontSize: 9 }}>▶</span>
                  <span style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: 13, letterSpacing: 3, color: '#8ef5ff',
                    width: 72, flexShrink: 0,
                  }}>
                    {item.id}
                  </span>
                  <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: 12 }}>:</span>
                  <span style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 600, fontSize: 15, color: '#f6fbff' }}>
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
    </section>
  )
}
