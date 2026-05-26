import { useRef, useState } from 'react'
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion'
import { skillDetailTransition } from '@/animations/variants'
import { SlashLabel, GhostText } from '@/components/shared'

const SKILLS = [
  { title: 'Python Programming',  rank: 7, max: 10, desc: 'Extensive experience in writing scripts for data scraping, automation, and backend logic.' },
  { title: 'Data Analysis (EDA)', rank: 7, max: 10, desc: 'Skilled in exploratory data analysis, data cleaning, and processing unstructured public data.' },
  { title: 'Machine Learning',    rank: 6, max: 10, desc: 'Proficient in implementing clustering algorithms like KMeans and PCA for data classification.' },
  { title: 'Web Development',     rank: 6, max: 10, desc: 'Building modern, interactive user interfaces using React.js, Tailwind CSS, and Framer Motion.' },
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
