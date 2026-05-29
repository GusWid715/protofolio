import { useRef, useState } from 'react'
import { motion, useScroll, useTransform, AnimatePresence, useInView } from 'framer-motion'
import { modalOverlay, modalContent, staggerContainer, slideInLeft } from '@/animations/variants'
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
            <motion.div variants={slideInLeft} className="absolute top-12 left-12 z-10 flex flex-col pointer-events-none">
              <SlashLabel text="// SECTION 04" />
              <h2 className="font-anton text-[72px] leading-[0.9] text-[#f6fbff] tracking-[2px] mb-2">
                PROJECTS
              </h2>
            </motion.div>

            {/* Horizontal track */}
            <div
              className="absolute top-0 left-0 w-full h-full flex flex-row flex-nowrap items-center overflow-x-auto snap-x snap-mandatory scroll-smooth"
              style={{
                paddingTop: '100px',
                paddingLeft: '12vw',
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
                style={{
                  height: '55vh',
                  background: 'linear-gradient(180deg, rgba(15,28,105,0.96) 0%, rgba(8,16,68,0.97) 100%)',
                  clipPath: 'polygon(0 0, 100% 0, calc(100% - 18px) 100%, 0 100%)',
                  boxShadow: 'inset 0 0 0 1px rgba(133,244,255,0.16), 16px 16px 0 rgba(0,6,30,0.55)',
                  padding: '0',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                {/* TOP BAR */}
                <div style={{
                  display: "flex", alignItems: "center", gap: 14, minHeight: 64, padding: "0 18px",
                  background: "linear-gradient(90deg, #8ef5ff 0%, #d3fdff 100%)",
                  clipPath: "polygon(0 0, 100% 0, calc(100% - 16px) 100%, 0 100%)",
                  color: "#08153f", boxShadow: "10px 0 0 rgba(255,94,136,0.88)",
                }}>
                  <div style={{ fontFamily: "'Anton', sans-serif", fontSize: 32, lineHeight: 1 }}>0{i+1}</div>
                  <div style={{ fontFamily: "'Anton', sans-serif", fontSize: 32, lineHeight: 0.92, letterSpacing: 1 }}>{project.title.toUpperCase()}</div>
                </div>

                {/* CONTENT */}
                <div className="flex-1 p-8 flex flex-col justify-between">
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
                            clipPath: 'polygon(0 0, 100% 0, calc(100% - 8px) 100%, 0 100%)',
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
                style={{
                  background: 'linear-gradient(180deg, rgba(15,28,105,0.96) 0%, rgba(8,16,68,0.97) 100%)',
                  clipPath: 'polygon(0 0, 100% 0, calc(100% - 18px) 100%, 0 100%)',
                  boxShadow: 'inset 0 0 0 1px rgba(133,244,255,0.16), 16px 16px 0 rgba(0,6,30,0.55)',
                  padding: '0',
                }}
              >
                {/* TOP BAR */}
                <div style={{
                  display: "flex", alignItems: "center", gap: 14, minHeight: 72, padding: "0 18px",
                  background: "linear-gradient(90deg, #8ef5ff 0%, #d3fdff 100%)",
                  clipPath: "polygon(0 0, 100% 0, calc(100% - 16px) 100%, 0 100%)",
                  color: "#08153f", boxShadow: "10px 0 0 rgba(255,94,136,0.88)",
                }}>
                  <div style={{ fontFamily: "'Anton', sans-serif", fontSize: 36, lineHeight: 0.92, letterSpacing: 1 }}>{selected.title.toUpperCase()}</div>
                </div>

                {/* CONTENT */}
                <div className="p-8">
                  <p className="font-bebas text-[24px] tracking-[1px] text-[#94f4ff] mb-2">
                    // PROJECT DETAIL
                  </p>
                  <p className="font-montserrat font-medium text-[16px] text-[#f2fcff] leading-relaxed mb-6">
                    {selected.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-8">
                    {selected.techStack.map(t => (
                      <span key={t} className="font-bebas text-[18px] px-3 py-1 text-[#06133b]"
                        style={{ background: '#8df6ff', clipPath: 'polygon(0 0, 100% 0, calc(100% - 8px) 100%, 0 100%)' }}>
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
                        clipPath: 'polygon(0 0, 100% 0, calc(100% - 10px) 100%, 0 100%)',
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
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
