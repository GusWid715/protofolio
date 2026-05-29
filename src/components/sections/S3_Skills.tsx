import { useRef, useState } from 'react'
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion'
import { skillDetailTransition } from '@/animations/variants'
import { GhostText } from '@/components/shared'

const SKILLS = [
  { id: 'I',   title: 'Python Programming', subtitle: 'Backend / Automation', rank: 7, max: 10, desc: 'Extensive experience in writing scripts for data scraping, automation, and backend logic.' },
  { id: 'II',  title: 'Data Analysis',      subtitle: 'Data Science',         rank: 7, max: 10, desc: 'Skilled in exploratory data analysis, data cleaning, and processing unstructured public data.' },
  { id: 'III', title: 'Machine Learning',   subtitle: 'AI / Models',          rank: 6, max: 10, desc: 'Proficient in implementing clustering algorithms like KMeans and PCA for data classification.' },
  { id: 'IV',  title: 'Web Development',    subtitle: 'Frontend / Fullstack', rank: 6, max: 10, desc: 'Building modern, interactive user interfaces using React.js, Tailwind CSS, and Framer Motion.' },
]

const N = SKILLS.length // 4

export function S3_Skills() {
  const [activeIdx, setActiveIdx] = useState(0)

  // Tall scroll track — gives us N scroll "pages" worth of distance
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  // Advance skill index as the user scrolls through each 1/N band
  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const idx = Math.min(N - 1, Math.floor(v * N))
    setActiveIdx(idx)
  })

  return (
    <div
      ref={containerRef}
      id="s3-skills"
      style={{ height: `${N * 100}vh` }}
    >
      {/* ── Sticky panel — pinned to the top while user scrolls through the track ── */}
      <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center relative">
        <GhostText text="ARCANA" className="bottom-[-2vh] left-[-1vw]" />

        <div className="relative z-10 w-full max-w-7xl px-8 grid grid-cols-2 gap-12 items-center">

          {/* ── LEFT — Skill list ─────────────────────────── */}
          <div className="flex flex-col gap-3">
            <div className="font-anton text-[72px] leading-[0.9] text-[#f6fbff] tracking-[2px] mb-2 ml-3">
              SKILLS
            </div>

            {SKILLS.map((skill, index) => {
              const isActive = index === activeIdx
              return (
                <div
                  key={skill.title}
                  className="relative cursor-pointer"
                  onMouseEnter={() => setActiveIdx(index)}
                  style={{
                    transform: isActive ? 'translateX(6px)' : 'translateX(0)',
                    transition: 'transform 0.22s ease',
                  }}
                >
                  <div
                    style={{
                      position: 'relative',
                      height: 112,
                      background: isActive ? '#ffffff' : '#10185f',
                      clipPath: 'polygon(0 0, 97% 0, 100% 100%, 3% 100%)',
                      boxShadow: isActive ? '10px 8px 0 #d63232' : '0 8px 0 rgba(5,13,59,0.85)',
                      transition: 'background 0.22s ease, box-shadow 0.22s ease',
                      overflow: 'visible',
                    }}
                  >
                    {/* BADGE */}
                    <div
                      style={{
                        position: 'absolute', top: 10, left: -10, width: 56, height: 70,
                        background: isActive ? '#000' : '#0b113d',
                        border: `3px solid ${isActive ? '#000' : '#9cf7ff'}`,
                        clipPath: 'polygon(14% 0, 100% 0, 84% 100%, 0 100%)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        transform: 'rotate(-8deg)', boxShadow: '0 4px 0 rgba(0,0,0,0.28)', zIndex: 2,
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "'Bebas Neue', sans-serif", fontSize: 36,
                          color: '#d2fdff', letterSpacing: 1, transform: 'rotate(8deg)', display: 'block',
                        }}
                      >
                        {skill.id}
                      </span>
                    </div>

                    {/* INNER CONTENT */}
                    <div
                      style={{
                        position: 'absolute', inset: 0, padding: '14px 22px 14px 62px',
                        display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', zIndex: 1,
                      }}
                    >
                      <div
                        style={{
                          fontFamily: "'Anton', sans-serif", fontSize: 48, lineHeight: 0.9, letterSpacing: 1,
                          color: isActive ? '#000' : '#a5f6ff', transition: 'color 0.22s ease',
                          whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '70%',
                        }}
                      >
                        {skill.title}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 2, flexShrink: 0 }}>
                        <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 24, letterSpacing: 2, color: isActive ? '#000' : '#9ffbff', transition: 'color 0.22s ease' }}>
                          RANK
                        </div>
                        <div style={{ fontFamily: "'Anton', sans-serif", fontSize: 56, lineHeight: 0.82, color: isActive ? '#000' : '#9ffbff', transition: 'color 0.22s ease' }}>
                          {skill.rank}
                        </div>
                      </div>
                    </div>

                    {/* SUBTITLE */}
                    <div
                      style={{
                        position: 'absolute', left: 64, right: 14, bottom: 12, height: 34,
                        background: isActive ? '#000' : '#85f4ff',
                        clipPath: 'polygon(0 0, 100% 0, calc(100% - 10px) 100%, 0 100%)',
                        display: 'flex', alignItems: 'center', padding: '0 18px', zIndex: 1,
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "'Bebas Neue', sans-serif", fontSize: 24,
                          lineHeight: 1, letterSpacing: 1, color: isActive ? '#fff' : '#041238',
                        }}
                      >
                        {skill.subtitle}
                      </span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* ── RIGHT — Active skill detail ───────────────── */}
          <div className="flex flex-col justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIdx}
                variants={skillDetailTransition}
                initial="initial"
                animate="animate"
                exit="exit"
                style={{
                  width: '100%',
                  minHeight: '450px',
                  padding: '22px 24px 24px 24px',
                  background: 'linear-gradient(180deg, rgba(15,28,105,0.96) 0%, rgba(8,16,68,0.97) 100%)',
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
                  <div style={{ fontFamily: "'Anton', sans-serif", fontSize: 46, lineHeight: 1 }}>
                    0{activeIdx + 1}
                  </div>
                  <div style={{ fontFamily: "'Anton', sans-serif", fontSize: 42, lineHeight: 0.92, letterSpacing: 1 }}>
                    SKILL DETAIL
                  </div>
                  <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 42, letterSpacing: 2 }}>
                    {SKILLS[activeIdx].rank}/{SKILLS[activeIdx].max}
                  </div>
                </div>

                {/* DESC BOX */}
                <div
                  style={{
                    marginTop: 22, padding: 18,
                    background: 'rgba(5,13,57,0.97)',
                    clipPath: 'polygon(0 0, 100% 0, calc(100% - 16px) 100%, 0 100%)',
                  }}
                >
                  <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 30, letterSpacing: 2, color: '#91f5ff', marginBottom: 14 }}>
                    DESCRIPTION
                  </div>
                  <div style={{ fontFamily: "'Anton', sans-serif", fontSize: 24, lineHeight: 1.3, color: '#edfaff', marginBottom: 8 }}>
                    {SKILLS[activeIdx].desc}
                  </div>
                </div>

                {/* RANK METER */}
                <div className="flex gap-[4px] mt-6" style={{ padding: '0 18px' }}>
                  {Array.from({ length: SKILLS[activeIdx].max }).map((_, i) => (
                    <div
                      key={i}
                      className="h-[14px] flex-1"
                      style={{
                        background: i < SKILLS[activeIdx].rank ? '#8ef5ff' : 'rgba(142, 245, 255, 0.1)',
                        clipPath: 'polygon(0 0, 100% 0, calc(100% - 4px) 100%, 0 100%)',
                      }}
                    />
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </div>
  )
}
