import { useRef, useState } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { modalOverlay, modalContent } from '@/animations/variants'
import { SlashLabel, GhostText } from '@/components/shared'

interface Project {
  title: string
  url: string
  description: string
  techStack: string[]
}

const PROJECTS: Project[] = [
  {
    title: 'RS Sanjiwani',
    url: 'https://github.com/GusWid715/rs_sanjiwani',
    description: 'Sistem informasi rumah sakit berbasis web untuk manajemen data pasien dan jadwal dokter.',
    techStack: ['PHP', 'Laravel', 'MySQL', 'Bootstrap'],
  },
  {
    title: 'Virtual Gift Box',
    url: 'https://github.com/GusWid715/vritual-gift-box',
    description: 'Aplikasi web interaktif untuk mengirim hadiah virtual dengan animasi pembukaan kotak hadiah.',
    techStack: ['HTML', 'CSS', 'JavaScript', 'Canvas API'],
  },
  {
    title: 'Chatbot Assistant Coach',
    url: 'https://github.com/GusWid715/Chatbot-AssistantCoach',
    description: 'Chatbot berbasis NLP untuk membantu coaching dan konsultasi berbasis teks secara otomatis.',
    techStack: ['Python', 'NLP', 'Flask', 'React'],
  },
  {
    title: 'ADUIN Capstone',
    url: 'https://github.com/GusWid715/ADUIN-Capstone-Project-Dataset',
    description: 'Dataset dan pipeline analisis data untuk proyek capstone machine learning berbasis data publik.',
    techStack: ['Python', 'Pandas', 'Scikit-learn', 'Jupyter'],
  },
]

export function S4_Projects() {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: wrapperRef })
  const [selected, setSelected] = useState<Project | null>(null)

  // Map scroll 0→1 ke translateX 0% → -75% (1 card per 25% scroll)
  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-75%'])

  return (
    <>
      <div ref={wrapperRef} className="relative h-[300vh]" id="s4-projects">
        <div className="sticky top-0 h-screen overflow-hidden">
          <GhostText text="JOURNEY" className="bottom-[-2vh] right-[-1vw]" />

          {/* Header */}
          <div className="absolute top-12 left-12 z-10">
            <SlashLabel text="// SECTION 04" />
            <h2 className="font-bebas text-[clamp(36px,4.5vw,64px)] tracking-[3px] text-white leading-none">
              PROJECTS
            </h2>
          </div>

          {/* Horizontal track */}
          <motion.div
            className="absolute top-0 left-0 h-full flex flex-row flex-nowrap items-center"
            style={{
              x,
              width: `${PROJECTS.length * 100}vw`,
              paddingTop: '100px',
              paddingLeft: '12vw',
              gap: '4vw',
            }}
          >
            {PROJECTS.map((project) => (
              <motion.div
                key={project.title}
                className="shrink-0 w-[28vw] cursor-pointer"
                whileHover={{ scale: 1.03, y: -6 }}
                transition={{ duration: 0.3 }}
                onClick={() => setSelected(project)}
                style={{
                  height: '55vh',
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-subtle)',
                  borderLeft: '3px solid var(--cyan)',
                  borderRadius: '2px',
                  backdropFilter: 'blur(14px)',
                  padding: '2rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: 'inset 0 0 30px rgba(0,191,255,0.03)',
                }}
              >
                <div>
                  <p className="font-orbitron text-[10px] tracking-[5px] text-p3-dim uppercase mb-3">
                    ── Project
                  </p>
                  <h3 className="font-bebas text-[clamp(28px,2.8vw,48px)] tracking-[2px] text-white leading-tight mb-4">
                    {project.title}
                  </h3>
                  <p className="font-rajdhani text-[14px] text-white/65 leading-relaxed">
                    {project.description}
                  </p>
                </div>
                <div>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {project.techStack.map(tech => (
                      <span
                        key={tech}
                        className="font-orbitron text-[9px] tracking-[3px] uppercase px-3 py-1"
                        style={{
                          border: '1px solid var(--border-subtle)',
                          color: 'var(--cyan)',
                          background: 'var(--cyan-ghost)',
                          borderRadius: '1px',
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <p className="font-orbitron text-[10px] tracking-[3px] text-p3-dim uppercase">
                    ↵ Press to expand
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* MODAL */}
      <AnimatePresence>
        {selected && (
          <>
            <motion.div
              className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-sm"
              variants={modalOverlay}
              initial="initial" animate="animate" exit="exit"
              onClick={() => setSelected(null)}
            />
            <motion.div
              className="fixed inset-0 z-[201] flex items-center justify-center pointer-events-none"
            >
              <motion.div
                className="pointer-events-auto w-[90vw] max-w-2xl"
                variants={modalContent}
                initial="initial" animate="animate" exit="exit"
                style={{
                  background: 'var(--bg-layer)',
                  border: '1px solid var(--border-active)',
                  borderLeft: '4px solid var(--cyan)',
                  borderRadius: '2px',
                  padding: '2.5rem',
                  boxShadow: '0 0 40px rgba(0,191,255,0.2)',
                }}
              >
                <p className="font-orbitron text-[10px] tracking-[5px] text-p3-dim uppercase mb-2">
                  // PROJECT DETAIL
                </p>
                <h3 className="font-bebas text-[clamp(36px,4vw,64px)] tracking-[3px] text-white mb-4 leading-none">
                  {selected.title}
                </h3>
                <p className="font-rajdhani text-[16px] text-white/80 leading-relaxed mb-6">
                  {selected.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-8">
                  {selected.techStack.map(t => (
                    <span key={t} className="font-orbitron text-[10px] tracking-[3px] uppercase px-3 py-1"
                      style={{ border: '1px solid var(--border-subtle)', color: 'var(--cyan)', borderRadius: '1px' }}>
                      {t}
                    </span>
                  ))}
                </div>
                <div className="flex gap-4">
                  <a
                    href={selected.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-orbitron text-[11px] font-black tracking-[4px] uppercase px-6 py-3"
                    style={{
                      background: 'var(--cyan)',
                      color: '#030810',
                      borderRadius: '1px',
                      clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 50%, calc(100% - 10px) 100%, 0 100%)',
                    }}
                  >
                    → View on GitHub
                  </a>
                  <button
                    onClick={() => setSelected(null)}
                    className="font-orbitron text-[11px] tracking-[4px] uppercase px-6 py-3 text-white/50 border border-white/20"
                    style={{ borderRadius: '1px' }}
                  >
                    ✕ Close
                  </button>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
