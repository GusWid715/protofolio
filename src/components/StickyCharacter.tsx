import { useScroll, motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

const PHASES = [
  // [scrollStart, scrollEnd, imgSrc, position config]
  { start: 0,    end: 0.15, img: '/images/char_welcome.png',  bottom: '0%', right: 'auto', left: '50%', transform: 'translateX(-50%)', scale: 1.0,  height: '80vh' },
  { start: 0.15, end: 0.35, img: '/images/char_about.png',    bottom: '0',  right: '2%',   left: 'auto', transform: 'none',           scale: 0.82, height: '85vh' },
  { start: 0.35, end: 0.55, img: '/images/char_skills.png',   bottom: '0',  right: 'auto', left: '2%',  transform: 'none',             scale: 0.82, height: '85vh' },
  { start: 0.55, end: 0.78, img: '/images/char_projects.png', bottom: '0',  right: '3%',   left: 'auto', transform: 'none',           scale: 0.80, height: '85vh' },
  { start: 0.78, end: 1.0,  img: '/images/char_footer.png',   bottom: '0',  right: 'auto', left: '50%', transform: 'translateX(-50%)', scale: 1.1,  height: '80vh' },
]

export function StickyCharacter() {
  const { scrollYProgress } = useScroll()
  const [activePhase, setActivePhase] = useState(0)

  useEffect(() => {
    return scrollYProgress.on('change', (v) => {
      const idx = PHASES.findIndex(p => v >= p.start && v < p.end)
      const resolved = idx === -1 ? PHASES.length - 1 : idx
      if (resolved !== activePhase) {
        setActivePhase(resolved)
      }
    })
  }, [scrollYProgress, activePhase])

  const phase = PHASES[activePhase]

  return (
    <div
      className="fixed inset-0 pointer-events-none z-40"
      style={{ overflow: 'hidden' }}
    >
      <AnimatePresence mode="sync">
        <motion.img
          key={phase.img}
          src={phase.img}
          alt="character"
          initial={{ opacity: 0, scale: phase.scale * 0.95 }}
          animate={{
            opacity: 1,
            scale: phase.scale,
            filter: [
              'drop-shadow(0 0 10px rgba(0,191,255,0.4))',
              'drop-shadow(0 0 24px rgba(0,191,255,0.9))',
              'drop-shadow(0 0 10px rgba(0,191,255,0.4))',
            ]
          }}
          exit={{ opacity: 0, scale: phase.scale * 0.95 }}
          transition={{
            opacity: { duration: 0.6, ease: 'easeInOut' },
            scale:   { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
            filter:  { duration: 3.5, repeat: Infinity, ease: 'easeInOut' },
          }}
          style={{
            position: 'absolute',
            bottom:  phase.bottom,
            right:   phase.right,
            left:    phase.left,
            transform: phase.transform,
            height: phase.height,
            width: 'auto',
            objectFit: 'contain',
          }}
        />
      </AnimatePresence>
    </div>
  )
}
