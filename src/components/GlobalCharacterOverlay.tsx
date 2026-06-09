/**
 * GlobalCharacterOverlay
 * ─────────────────────────────────────────────────────────────────────────────
 * Fixed layer (z-[2], pointer-events-none).
 *
 * Uses the proven AnimatePresence approach (same as the original StickyCharacter)
 * instead of stacked-image opacity MotionValues, which had bleeding issues in
 * Framer Motion v12.
 *
 * Phase → Section mapping (scroll thresholds = midpoints between KEYS):
 *   0   (0.00–0.125)  S1 Welcome   → char_welcome.png   center
 *   1   (0.125–0.375) S2 About Me  → char_about.png     right
 *   2   (0.375–0.625) S3 Skills    → char_skills.png    right-nudged
 *   3   (0.625–0.875) S4 Projects  → char_projects.png  left
 *   4   (0.875–1.00)  S5 Contact   → char_footer.png    center
 */

import { useScroll, motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

// ─── Phase definitions ────────────────────────────────────────────────────────

const PHASES = [
  {
    img:   '/images/char_welcome.webp',
    // Center screen — translate -50% relative to image own width
    bottom: '0', left: '50%', right: 'auto',
    x: '-50%',
    scale:  1.0,
    height: '82vh',
  },
  {
    img:   '/images/char_about.webp',
    // Bottom-right, bigger & nudged right
    bottom: '0', left: 'auto', right: '-30px',
    x: '0%',
    scale:  1.0,
    height: '92vh',
  },
  {
    img:   '/images/char_skills.webp',
    // Bottom-right, nudged slightly inward so it doesn't clip
    bottom: '0', left: 'auto', right: '3vw',
    x: '0%',
    scale:  1.0,
    height: '100vh',
  },
  {
    img:   '/images/char_projects.png',
    // Bottom-left
    bottom: '0', left: '0px', right: 'auto',
    x: '0%',
    scale:  0.90,
    height: '85vh',
  },
  {
    img:   '/images/char_footer.png',
    // Center screen
    bottom: '0', left: '50%', right: 'auto',
    x: '-50%',
    scale:  1.1,
    height: '82vh',
  },
] as const

// Threshold = midpoints between scroll anchors [0, 0.25, 0.5, 0.75, 1]
function resolvePhase(v: number): number {
  if (v < 0.125) return 0
  if (v < 0.375) return 1
  if (v < 0.625) return 2
  if (v < 0.875) return 3
  return 4
}

// ─── Component ────────────────────────────────────────────────────────────────

export function GlobalCharacterOverlay() {
  const { scrollYProgress } = useScroll()
  const [activeIdx, setActiveIdx] = useState(0)

  useEffect(() => {
    // Listen to scroll changes and update active phase
    const unsubscribe = scrollYProgress.on('change', (v) => {
      const next = resolvePhase(v)
      setActiveIdx(prev => prev !== next ? next : prev)
    })
    return unsubscribe
  }, [scrollYProgress])

  const phase = PHASES[activeIdx]

  return (
    <div
      className="fixed inset-0 pointer-events-none z-[2] overflow-hidden"
      aria-hidden="true"
    >
      <AnimatePresence mode="sync">
        <motion.img
          key={phase.img}
          src={phase.img}
          alt={`character section ${activeIdx + 1}`}
          draggable={false}
          // ── Enter ──────────────────────────────────────────────────────────
          initial={{
            opacity: 0,
            scale: phase.scale * 0.93,
            x: phase.x,
          }}
          animate={{
            opacity: 1,
            scale: phase.scale,
            x: phase.x,
          }}
          // ── Exit ───────────────────────────────────────────────────────────
          exit={{
            opacity: 0,
            scale: phase.scale * 0.93,
            x: phase.x,
          }}
          transition={{
            opacity: { duration: 0.55, ease: 'easeInOut' },
            scale:   { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
          }}
          style={{
            position: 'absolute',
            bottom:   phase.bottom,
            left:     phase.left,
            right:    phase.right,
            height:   phase.height,
            width:    'auto',
            objectFit: 'contain',
            transformOrigin: 'bottom center',
            userSelect:    'none',
            pointerEvents: 'none',
          }}
        />
      </AnimatePresence>
    </div>
  )
}
