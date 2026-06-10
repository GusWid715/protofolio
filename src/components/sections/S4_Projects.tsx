import { useRef, useState, useEffect } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { modalOverlay, modalContent } from '@/animations/variants'
import { GhostText } from '@/components/shared'

interface Project {
  title: string
  url: string
  description: string
  techStack: string[]
  image: string
  bgColor: string
}

const PROJECTS: Project[] = [
  {
    title: 'RS Sanjiwani',
    url: 'https://github.com/GusWid715/rs_sanjiwani',
    description: 'Sistem informasi rumah sakit berbasis web untuk manajemen data pasien dan jadwal dokter.',
    techStack: ['PHP', 'Laravel', 'MySQL', 'Bootstrap'],
    image: '/images/char_welcome.webp',
    bgColor: '#5ba2eb', // Blue
  },
  {
    title: 'Virtual Gift Box',
    url: 'https://github.com/GusWid715/vritual-gift-box',
    description: 'Aplikasi web interaktif untuk mengirim hadiah virtual dengan animasi pembukaan kotak hadiah.',
    techStack: ['HTML', 'CSS', 'JavaScript', 'Canvas API'],
    image: '/images/char_about.webp',
    bgColor: '#ff7eb6', // Pink
  },
  {
    title: 'Chatbot Assistant Coach',
    url: 'https://github.com/GusWid715/Chatbot-AssistantCoach',
    description: 'Chatbot berbasis NLP untuk membantu coaching dan konsultasi berbasis teks secara otomatis.',
    techStack: ['Python', 'NLP', 'Flask', 'React'],
    image: '/images/char_skills.webp',
    bgColor: '#f1c45b', // Yellow
  },
  {
    title: 'ADUIN Capstone',
    url: 'https://github.com/GusWid715/ADUIN-Capstone-Project-Dataset',
    description: 'Dataset dan pipeline analisis data untuk proyek capstone machine learning berbasis data publik.',
    techStack: ['Python', 'Pandas', 'Scikit-learn', 'Jupyter'],
    image: '/images/char_projects.png',
    bgColor: '#5bf18b', // Green
  },
]

export function S4_Projects() {
  const [selected, setSelected] = useState<Project | null>(null)
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10%' })

  const [activeIdx, setActiveIdx] = useState(0)
  const activeIdxRef = useRef(0)
  const cooldownRef = useRef(false)

  useEffect(() => {
    const COOLDOWN_MS = 600
    const onWheel = (e: WheelEvent) => {
      const el = ref.current
      if (!el) return
      const { top } = el.getBoundingClientRect()
      if (Math.abs(top) > window.innerHeight * 0.15) return

      const going = e.deltaY > 0 ? 1 : -1
      const current = activeIdxRef.current
      const next = current + going

      if (next >= 0 && next < PROJECTS.length) {
        e.preventDefault()
        if (cooldownRef.current) return
        cooldownRef.current = true
        setTimeout(() => { cooldownRef.current = false }, COOLDOWN_MS)
        activeIdxRef.current = next
        setActiveIdx(next)
      }
    }
    window.addEventListener('wheel', onWheel, { passive: false })
    return () => window.removeEventListener('wheel', onWheel)
  }, [])

  const bgCurrent = PROJECTS[activeIdx].bgColor

  const getOffset = (idx: number) => {
    if (idx === 0) return 0;
    return 52.5 + (idx - 1) * 35;
  }

  return (
    <>
      <motion.section 
        ref={ref} 
        className="relative h-screen w-screen overflow-hidden" 
        id="s4-projects"
        animate={{ backgroundColor: bgCurrent }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <GhostText text="PROJECT" className="bottom-[-2vh] right-[-1vw] opacity-10 text-white" />
        </div>

        {/* Horizontal Track */}
        <motion.div 
          className="absolute top-0 left-0 h-full flex flex-row items-center"
          animate={{ x: `-${getOffset(activeIdx)}vw` }}
          transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
          style={{ width: `${52.5 + PROJECTS.length * 35}vw` }}
        >
          {/* Item 0: Title Block */}
          <div style={{ width: '45vw', marginLeft: '5vw', marginRight: '0vw' }} className="shrink-0 flex flex-col justify-center px-4">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h1 
                className="text-white drop-shadow-md" 
                style={{ 
                  fontFamily: "'Times New Roman', Times, serif", 
                  fontSize: '11vw', 
                  lineHeight: '1',
                  letterSpacing: '0.02em' 
                }}
              >
                PROJECT.
              </h1>
              <div className="mt-6">
                <p className="text-white font-montserrat leading-relaxed max-w-[90%] drop-shadow" style={{ fontSize: 'clamp(14px, 1.4vw, 24px)' }}>
                  An aggregation of projects vigilantly built to solve problems, will face the future.
                </p>
                <p className="text-white font-montserrat leading-relaxed max-w-[90%] mt-4 drop-shadow" style={{ fontSize: 'clamp(14px, 1.4vw, 24px)' }}>
                  Time won't wait for you, technology won't stop for you.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Project Images */}
          {PROJECTS.map((p, i) => {
            const isActive = activeIdx === i;
            return (
              <div 
                key={i} 
                className="shrink-0 relative cursor-pointer group flex items-center justify-center"
                style={{ width: '30vw', marginLeft: '2.5vw', marginRight: '2.5vw', height: '80vh' }}
                onClick={() => {
                  setSelected(p)
                  setActiveIdx(i)
                  activeIdxRef.current = i
                }}
              >
                <motion.div
                  animate={{
                    scale: isActive ? 1 : 0.85,
                    opacity: isActive ? 1 : 0.4,
                    y: isActive ? 0 : 30
                  }}
                  transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
                  className="w-full h-full flex flex-col items-center justify-end relative"
                >
                  <img src={p.image} alt={p.title} className="w-full h-full object-contain drop-shadow-2xl" />
                  
                  {/* Name Label */}
                  <div className="absolute bottom-[5%] text-center w-full">
                    <span 
                      className="text-[#333] font-rajdhani font-bold bg-white/90 px-6 py-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm"
                      style={{ fontSize: 'clamp(14px, 1.5vw, 28px)', boxShadow: '0 4px 15px rgba(0,0,0,0.2)' }}
                    >
                      {p.title} &rarr;
                    </span>
                  </div>
                </motion.div>
              </div>
            )
          })}
        </motion.div>
      </motion.section>

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
                  borderLeft: `5px solid ${selected.bgColor}`,
                  boxShadow: `16px 16px 0px 0px ${selected.bgColor}80`,
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
                      <div style={{ fontFamily: "'Anton', sans-serif", fontSize: 36, lineHeight: 0.92, letterSpacing: 1, color: '#000' }}>
                        {selected.title.toUpperCase()}
                      </div>
                    </div>
                  </div>

                  {/* CONTENT */}
                  <div className="p-8" style={{ background: '#1a1a1a' }}>
                    <div style={{ transform: 'skewX(12deg)' }}>
                      <p className="font-bebas text-[24px] tracking-[1px] mb-2" style={{ color: selected.bgColor }}>
                        // PROJECT DETAIL
                      </p>
                      <p className="font-montserrat font-medium text-[16px] text-[#f2fcff] leading-relaxed mb-6">
                        {selected.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-8">
                        {selected.techStack.map(t => (
                          <span key={t} className="font-bebas text-[18px] px-3 py-1 text-[#000]"
                            style={{ background: selected.bgColor }}>
                            {t}
                          </span>
                        ))}
                      </div>
                      <div className="flex gap-4">
                        <a
                          href={selected.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-anton text-[20px] px-6 py-2 transition-transform hover:scale-105"
                          style={{
                            background: selected.bgColor,
                            color: '#000',
                          }}
                        >
                          VIEW ON GITHUB
                        </a>
                        <button
                          onClick={() => setSelected(null)}
                          className="font-anton text-[20px] px-6 py-2 text-[#f2fcff]/60 border border-[#f2fcff]/20 hover:bg-white/10"
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
