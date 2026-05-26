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
  { key: 'NAMA',   value: 'Ida Bagus Gede Widiastana Bawaskara' },
  { key: 'PERAN',  value: 'Data Science & Web Development' },
  { key: 'LOKASI', value: 'Indonesia' },
  { key: 'STATUS', value: 'ACTIVE' },
  { key: 'TECH',   value: 'Python, ML, PHP, Laravel, HTML/CSS' },
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
                          transformOrigin: 'left',
                        }}
                        initial={{ scaleX: 0 }}
                        animate={isInView ? { scaleX: 1 } : {}}
                        transition={{ delay: 0.4 + i * 0.05, duration: 0.3 }}
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
                  <span className="text-[11px] text-white/30">:</span>
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
    </section>
  )
}
