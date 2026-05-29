/**
 * GlobalCharacterOverlay
 * ─────────────────────────────────────────────────────────────────────────────
 * Fixed layer (z-50, pointer-events-none) — 5 stacked images that crossfade
 * based on scroll progress.  Each image is individually positioned so we
 * never rely on a zero-width wrapper container.
 *
 * Scroll anchors  →  section:
 *   0.00  Welcome   (center screen)
 *   0.25  About Me  (bottom-right)
 *   0.50  Projects  (bottom-right, nudged left)
 *   0.75  Skills    (bottom-left)
 *   1.00  Footer    (center screen)
 */

import { useScroll, useTransform, useSpring, motion } from 'framer-motion'

// ─── Phase data ───────────────────────────────────────────────────────────────

const PHASES = [
  {
    src:     '/images/char_welcome.png',
    // Position mirrors the old StickyCharacter approach (CSS left/right/bottom)
    bottom:  '0px',
    left:    '50%',
    right:   'auto',
    // Framer Motion x applied as transform (% relative to *image* width → works!)
    x:       '-50%',
    height:  '82vh',
    scale:   1.0,
  },
  {
    src:     '/images/char_about.png',
    bottom:  '0px',
    left:    'auto',
    right:   '0px',
    x:       '0%',
    height:  '88vh',
    scale:   0.85,
  },
  {
    src:     '/images/char_projects.png',
    bottom:  '0px',
    left:    'auto',
    right:   '3vw',
    x:       '0%',
    height:  '85vh',
    scale:   0.85,
  },
  {
    src:     '/images/char_skills.png',
    bottom:  '0px',
    left:    '0px',
    right:   'auto',
    x:       '0%',
    height:  '85vh',
    scale:   0.90,
  },
  {
    src:     '/images/char_footer.png',
    bottom:  '0px',
    left:    '50%',
    right:   'auto',
    x:       '-50%',
    height:  '82vh',
    scale:   1.1,
  },
] as const

// Scroll progress anchors (one per phase)
const KEYS = [0, 0.25, 0.5, 0.75, 1] as const

// Spring config — smooth glide
const SPRING = { stiffness: 60, damping: 20, mass: 1.2 } as const

// ─── Crossfade opacity per phase ──────────────────────────────────────────────
//
// Each image is fully visible at its anchor and fades over ±FADE on each side.
// Fade width = 10% of total scroll range.

const FADE = 0.10

function buildOpacityRange(i: number): [number[], number[]] {
  const k = KEYS[i]
  const n = KEYS.length

  if (i === 0) {
    // Phase 0: opaque from 0, fade out towards phase 1
    return [
      [0,           KEYS[1] - FADE, KEYS[1]],
      [1,           1,              0],
    ]
  }
  if (i === n - 1) {
    // Last phase: fade in from previous, stay opaque to 1
    return [
      [KEYS[n - 2], KEYS[n - 2] + FADE, 1],
      [0,           1,                  1],
    ]
  }
  // Middle phases: bell curve around anchor
  return [
    [k - FADE, k, k + FADE],
    [0,        1, 0],
  ]
}

// ─── Component ────────────────────────────────────────────────────────────────

export function GlobalCharacterOverlay() {
  const { scrollYProgress } = useScroll()

  // Scale springs — one per phase (springed individually isn't ideal for crossfade;
  // instead we animate a single shared scale value between phase anchors)
  const rawScale = useTransform(
    scrollYProgress,
    [...KEYS],
    PHASES.map(p => p.scale),
  )
  const springScale = useSpring(rawScale, SPRING)

  // ── Opacity motion values (5 explicit calls — Rules of Hooks) ──────────────
  const [ir0, or0] = buildOpacityRange(0)
  const [ir1, or1] = buildOpacityRange(1)
  const [ir2, or2] = buildOpacityRange(2)
  const [ir3, or3] = buildOpacityRange(3)
  const [ir4, or4] = buildOpacityRange(4)

  const op0 = useTransform(scrollYProgress, ir0, or0)
  const op1 = useTransform(scrollYProgress, ir1, or1)
  const op2 = useTransform(scrollYProgress, ir2, or2)
  const op3 = useTransform(scrollYProgress, ir3, or3)
  const op4 = useTransform(scrollYProgress, ir4, or4)

  const opacities = [op0, op1, op2, op3, op4]

  return (
    <div
      className="fixed inset-0 pointer-events-none z-[2]"
      aria-hidden="true"
    >
      {PHASES.map((phase, i) => (
        <motion.img
          key={phase.src}
          src={phase.src}
          alt={`character phase ${i + 1}`}
          draggable={false}
          style={{
            // ── Layout (same approach as old StickyCharacter) ─────────────
            position: 'absolute',
            bottom:   phase.bottom,
            left:     phase.left,
            right:    phase.right,
            height:   phase.height,
            width:    'auto',
            objectFit: 'contain',
            // ── Framer Motion transforms ──────────────────────────────────
            x:        phase.x,      // % works relative to image's own width ✓
            scale:    springScale,  // shared spring-smoothed scale
            transformOrigin: 'bottom center',
            // ── Crossfade ─────────────────────────────────────────────────
            opacity: opacities[i],
            // ── No interaction ────────────────────────────────────────────
            userSelect:    'none',
            pointerEvents: 'none',
          }}
        />
      ))}
    </div>
  )
}
