import { motion, useInView, type Variants } from 'framer-motion'
import { useRef } from 'react'

const STATS = [
  { label: 'ACADEMICS', level: 'Above Average', value: 3, max: 5 },
  { label: 'CHARM',     level: 'Unpolished',    value: 2, max: 5 },
  { label: 'COURAGE',   level: 'Tough',         value: 4, max: 5 },
]

const DATA = [
  { id: 'NAMA',   value: 'Ida Bagus Gede Widiastana B.' },
  { id: 'PERAN',  value: 'Data Science & Web Dev' },
  { id: 'LOKASI', value: 'Indonesia' },
  { id: 'STATUS', value: 'ACTIVE' },
  { id: 'TECH',   value: 'Python, ML, PHP, Laravel' },
]

const panelVariants: Variants = {
  hidden:  { x: '-100vw', skewX: 15 },
  visible: {
    x: 0,
    skewX: 0,
    transition: {
      type: 'spring',
      stiffness: 40,
      damping: 15,
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

const rowVariants: Variants = {
  hidden:  { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 50 } },
}

const charVariants: Variants = {
  hidden:  { opacity: 0, x: 80 },
  visible: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 40, damping: 14, delay: 0.2 } },
}

export function S2_About() {
  const ref    = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-20%' })

  return (
    <section
      ref={ref}
      id="s2-about"
      className="relative h-screen flex items-center overflow-hidden px-4 md:px-16 gap-8"
    >

      {/* Background Decor */}
      <span className="absolute left-[-10vw] top-[10%] font-bebas text-[30vw] leading-none text-p3r-light/[0.03] select-none pointer-events-none -skew-y-6">
        ABOUT ME
      </span>

      {/* ── LEFT: Panels ───────────────────────── */}
      <motion.div
        className="relative z-10 flex flex-col items-start gap-6 w-[48%] shrink-0"
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={panelVariants}
      >
        {/* Header Text */}
        <h2 className="font-anton text-6xl md:text-8xl text-[#f6fbff] -skew-x-12">
          ABOUT ME
        </h2>

        {/* --- TOP BOX (STATS) --- */}
        <div
          className="w-full bg-[#112a4a] rounded-lg border border-[#20406d] overflow-hidden"
          style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.2)' }}
        >
          <div className="p-6 flex flex-col gap-5">
            {STATS.map(stat => (
              <div key={stat.label} className="flex flex-col">
                <span className="font-bebas text-[#54fafe] tracking-[2px] mb-1">
                  {stat.label}
                </span>
                <div className="flex gap-[4px] h-[10px] w-48 mb-1">
                  {Array.from({ length: stat.max }).map((_, i) => (
                    <div
                      key={i}
                      className={`flex-1 ${i < stat.value ? 'bg-[#f4bc20]' : 'bg-[#54fafe]/20'}`}
                    />
                  ))}
                </div>
                <span className="font-montserrat font-medium text-[#f6fbff] text-[15px] mt-1">
                  {stat.level}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* --- BOTTOM BOX (PERSONAL DATA) --- */}
        <div
          className="w-full bg-[#112a4a] rounded-lg border border-[#20406d] overflow-hidden"
          style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.2)' }}
        >
          <div className="p-6">
            <div className="font-bebas text-[#54fafe] tracking-widest text-xl mb-3">
              // PERSONAL DATA
            </div>
            <div className="w-full h-px bg-[#54fafe]/20 mb-4" />
            <div className="flex flex-col">
              {DATA.map((item, index) => (
                <div key={item.id} className="flex flex-col">
                  <motion.div
                    variants={rowVariants}
                    className="flex items-center py-[14px]"
                  >
                    <span className="text-[#54fafe] text-[10px] mr-2">▶</span>
                    <span className="font-bebas text-[#54fafe] tracking-[2px] w-[80px] shrink-0">
                      {item.id}
                    </span>
                    <span className="text-[#f6fbff]/80 mx-3 text-sm">:</span>
                    <span className="font-montserrat text-[#f6fbff] text-[15px] font-medium">
                      {item.value}
                    </span>
                  </motion.div>
                  {index !== DATA.length - 1 && (
                    <div className="w-full h-px bg-[#54fafe]/10" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

      </motion.div>

      {/* ── RIGHT: Character ───────────────────── */}
      <motion.div
        className="relative z-10 flex-1 flex items-end justify-center h-full"
        variants={charVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        <img
          src="/images/char_about.png"
          alt="Character"
          className="h-[90%] w-auto object-contain object-bottom select-none"
          style={{ filter: 'drop-shadow(-6px 0 30px rgba(84,250,254,0.15))' }}
          draggable={false}
        />
      </motion.div>

    </section>
  )
}
