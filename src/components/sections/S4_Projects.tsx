import { useRef, useState } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { modalOverlay, modalContent, staggerContainer, slideInLeft } from '@/animations/variants'
import { GhostText } from '@/components/shared'

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
  const [selected, setSelected] = useState<Project | null>(null)
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10%' })

  return (
    <>
      <section ref={ref} className="relative h-screen" id="s4-projects">
        <div className="absolute inset-0 overflow-hidden">
          <GhostText text="JOURNEY" className="bottom-[-2vh] right-[-1vw]" />

          {/* Animated Wrapper */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="absolute inset-0"
          >
            {/* Header */}
            <div className="absolute top-0 left-0 w-full px-8 md:px-14 pt-[12vh] pointer-events-none z-10">
              <motion.div variants={slideInLeft}>
                <h2 
                  className="font-anton leading-[0.9] text-[#f6fbff] tracking-[2px] ml-3 mb-2"
                  style={{ fontSize: 'clamp(44px, 5.5vw, 72px)' }}
                >
                  PROJECTS
                </h2>
              </motion.div>
            </div>

            {/* Horizontal track */}
            <div
              className="absolute top-0 left-0 w-full h-full flex flex-row flex-nowrap items-center overflow-x-auto snap-x snap-mandatory scroll-smooth"
              style={{
                paddingTop: '100px',
                paddingLeft: '42vw',
                paddingRight: '12vw',
                gap: '4vw',
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
              }}
            >
            {PROJECTS.map((project, i) => (
              <motion.div
                key={project.title}
                variants={slideInLeft}
                className="shrink-0 w-[28vw] cursor-pointer snap-center"
                whileHover={{ scale: 1.03, y: -6 }}
                onClick={() => setSelected(project)}
                style={{ height: '55vh' }}
              >
                <div style={{
                  height: '100%',
                  transform: 'skewX(-12deg)',
                  borderLeft: '5px solid #54fafe',
                  boxShadow: '10px 8px 0px 0px rgba(255, 0, 0, 0.5)',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                }}>
                  {/* TOP BAR */}
                  <div style={{
                    background: '#ffffff',
                    padding: '16px 24px',
                    display: 'flex',
                    alignItems: 'center',
                    minHeight: 64,
                  }}>
                    <div style={{ transform: 'skewX(12deg)', display: 'flex', gap: 14, alignItems: 'center' }}>
                      <div style={{ fontFamily: "'Anton', sans-serif", fontSize: 32, lineHeight: 1, color: '#000' }}>0{i+1}</div>
                      <div style={{ fontFamily: "'Anton', sans-serif", fontSize: 32, lineHeight: 0.92, letterSpacing: 1, color: '#000' }}>{project.title.toUpperCase()}</div>
                    </div>
                  </div>

                  {/* CONTENT */}
                  <div className="flex-1 p-8 flex flex-col justify-between" style={{ background: '#10185f' }}>
                    <div className="flex-1 flex flex-col justify-between" style={{ transform: 'skewX(12deg)' }}>
                      <div>
                        <p className="font-bebas text-[22px] tracking-[1px] text-[#94f4ff] mb-2">
                          -- PROJECT DESCRIPTION
                        </p>
                        <p className="font-montserrat text-[15px] font-medium text-[#f2fcff] leading-relaxed">
                          {project.description}
                        </p>
                      </div>
                      <div>
                        <div className="flex flex-wrap gap-2 mb-4 mt-6">
                          {project.techStack.map(tech => (
                            <span
                              key={tech}
                              className="font-bebas text-[18px] px-3 py-1 text-[#06133b]"
                              style={{
                                background: '#8df6ff',
                              }}
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                        <p className="font-orbitron text-[10px] tracking-[3px] text-[#8ef5ff]/70 uppercase">
                          ↵ Press to expand
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
            </div>
          </motion.div>
        </div>
      </section>

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
              >
                <div style={{
                  transform: 'skewX(-12deg)',
                  borderLeft: '5px solid #54fafe',
                  boxShadow: '16px 16px 0px 0px rgba(255, 0, 0, 0.5)',
                  overflow: 'hidden',
                }}>
                  {/* TOP BAR */}
                  <div style={{
                    background: '#ffffff',
                    padding: '16px 24px',
                    display: 'flex',
                    alignItems: 'center',
                    minHeight: 72,
                  }}>
                    <div style={{ transform: 'skewX(12deg)', display: 'flex', alignItems: 'center' }}>
                      <div style={{ fontFamily: "'Anton', sans-serif", fontSize: 36, lineHeight: 0.92, letterSpacing: 1, color: '#000' }}>{selected.title.toUpperCase()}</div>
                    </div>
                  </div>

                  {/* CONTENT */}
                  <div className="p-8" style={{ background: '#10185f' }}>
                    <div style={{ transform: 'skewX(12deg)' }}>
                      <p className="font-bebas text-[24px] tracking-[1px] text-[#94f4ff] mb-2">
                        // PROJECT DETAIL
                      </p>
                      <p className="font-montserrat font-medium text-[16px] text-[#f2fcff] leading-relaxed mb-6">
                        {selected.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-8">
                        {selected.techStack.map(t => (
                          <span key={t} className="font-bebas text-[18px] px-3 py-1"
                            style={{ background: '#8df6ff', color: '#06133b' }}>
                            {t}
                          </span>
                        ))}
                      </div>
                      <div className="flex gap-4">
                        <a
                          href={selected.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-anton text-[20px] px-6 py-2"
                          style={{
                            background: '#8ef5ff',
                            color: '#08153f',
                          }}
                        >
                          VIEW ON GITHUB
                        </a>
                        <button
                          onClick={() => setSelected(null)}
                          className="font-anton text-[20px] px-6 py-2 text-[#f2fcff]/60 border border-[#f2fcff]/20"
                        >
                          CLOSE
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
