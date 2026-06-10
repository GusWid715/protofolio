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
    image: '/images/char_footer.png',
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
  const [animDuration, setAnimDuration] = useState(0.6)

  const getOffset = (idx: number) => {
    if (idx === 0) return 0;
    return 52.5 + (idx - 1) * 35;
  }

  const changeSlide = (next: number) => {
    const current = activeIdxRef.current
    if (next === current) return 0
    
    const dist = Math.abs(getOffset(next) - getOffset(current))
    // Calculate duration so that speed is constant (35vw per 0.6s = 58.33 vw/s)
    let duration = dist / 58.33
    // Cap duration to keep it feeling snappy
    if (duration > 1.2) duration = 1.2
    if (duration < 0.4) duration = 0.4

    setAnimDuration(duration)
    activeIdxRef.current = next
    setActiveIdx(next)
    return duration
  }

  useEffect(() => {
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
        
        const durationSec = changeSlide(next)
        setTimeout(() => { cooldownRef.current = false }, durationSec * 1000)
      }
    }
    window.addEventListener('wheel', onWheel, { passive: false })
    return () => window.removeEventListener('wheel', onWheel)
  }, [])

  const bgCurrent = activeIdx === 0 ? '#010eb3' : PROJECTS[activeIdx].bgColor

  return (
    <>
      <motion.section 
        ref={ref} 
        className="relative h-screen w-screen overflow-hidden" 
        id="s4-projects"
        animate={{ backgroundColor: bgCurrent }}
        transition={{ duration: animDuration, ease: "easeInOut" }}
      >
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <GhostText text="PROJECT" className="bottom-[-2vh] right-[-1vw] opacity-10 text-white" />
        </div>

        {/* Horizontal Track */}
        <motion.div 
          className="absolute top-0 left-0 h-full flex flex-row items-center"
          animate={{ x: `-${getOffset(activeIdx)}vw` }}
          transition={{ duration: animDuration, ease: [0.33, 1, 0.68, 1] }}
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
                className="font-anton leading-[0.9] text-[#f6fbff] tracking-[2px] ml-3 mb-2 drop-shadow-md"
                style={{ fontSize: 'clamp(60px, 11vw, 160px)' }}
              >
                PROJECTS
              </h1>
              <div className="mt-6 ml-3">
                <p className="text-[#f6fbff] font-rajdhani font-semibold leading-relaxed max-w-[90%] drop-shadow" style={{ fontSize: 'clamp(16px, 1.8vw, 28px)' }}>
                  An aggregation of projects vigilantly built to solve problems, will face the future.
                </p>
                <p className="text-[#f6fbff] font-rajdhani font-semibold leading-relaxed max-w-[90%] mt-4 drop-shadow" style={{ fontSize: 'clamp(16px, 1.8vw, 28px)' }}>
                  Time won't wait for you, technology won't stop for you.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Project Cards */}
          {PROJECTS.map((p, i) => {
            const isActive = activeIdx === i;
            return (
              <div 
                key={i} 
                className="shrink-0 relative cursor-pointer group flex items-center justify-center"
                style={{ width: '30vw', marginLeft: '2.5vw', marginRight: '2.5vw', height: '60vh' }}
                onClick={() => {
                  setSelected(p)
                  changeSlide(i)
                }}
              >
                <motion.div
                  animate={{
                    scale: isActive ? 1 : 0.85,
                    opacity: isActive ? 1 : 0.4,
                    y: isActive ? 0 : 30
                  }}
                  transition={{ duration: animDuration, ease: [0.33, 1, 0.68, 1] }}
                  className="w-full h-full"
                >
                  <div style={{
                    height: '100%',
                    borderLeft: `5px solid ${p.bgColor}`,
                    boxShadow: '10px 8px 0px 0px rgba(0, 0, 0, 0.4)',
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
                      <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
                        <div style={{ fontFamily: "'Anton', sans-serif", fontSize: 32, lineHeight: 1, color: '#000' }}>0{i+1}</div>
                        <div style={{ fontFamily: "'Anton', sans-serif", fontSize: 32, lineHeight: 0.92, letterSpacing: 1, color: '#000' }}>{p.title.toUpperCase()}</div>
                      </div>
                    </div>

                    {/* CONTENT */}
                    <div className="flex-1 p-8 flex flex-col justify-between" style={{ background: '#10185f' }}>
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <p className="font-bebas text-[22px] tracking-[1px] mb-2" style={{ color: p.bgColor }}>
                            -- PROJECT DESCRIPTION
                          </p>
                          <p className="font-montserrat text-[15px] font-medium text-[#f2fcff] leading-relaxed">
                            {p.description}
                          </p>
                        </div>
                        <div>
                          <div className="flex flex-wrap gap-2 mb-4 mt-6">
                            {p.techStack.map(tech => (
                              <span
                                key={tech}
                                className="font-bebas text-[18px] px-3 py-1 text-[#06133b]"
                                style={{
                                  background: p.bgColor,
                                }}
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                          <p className="font-orbitron text-[10px] tracking-[3px] text-white/50 uppercase">
                            ↵ Press to expand
                          </p>
                        </div>
                      </div>
                    </div>
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
