/**
 * GlobalCharacterOverlay
 * ─────────────────────────────────────────────────────────────────────────────
 * A `position:fixed` layer that floats above the entire page (pointer-events:none).
 * Renders 5 stacked <motion.img /> elements that crossfade based on scroll progress,
 * while the shared container glides between positions using spring physics.
 *
 * Scroll phases (scrollYProgress → section):
 *   0.00  → Welcome   (center screen)
 *   0.25  → About Me  (bottom-right)
 *   0.50  → Projects  (bottom-right, nudged left)
 *   0.75  → Skills    (bottom-left)
 *   1.00  → Footer    (center screen)
 */

import {
  useScroll,
  useTransform,
  useSpring,
  motion,
} from 'framer-motion'

// ─── Assets ───────────────────────────────────────────────────────────────────

const IMAGES = [
  '/images/char_welcome.png',   // Phase 1 – Welcome
  '/images/char_about.png',     // Phase 2 – About Me
  '/images/char_projects.png',  // Phase 3 – Projects
  '/images/char_skills.png',    // Phase 4 – Skills
  '/images/char_footer.png',    // Phase 5 – Footer
]

// ─── Phase Keyframes ──────────────────────────────────────────────────────────

/** scrollYProgress anchors for each of the 5 phases */
const KEYS   = [0, 0.25, 0.5, 0.75, 1] as const

/** Left edge position in vw.
 *  Center  → 50vw (image centred via translateX -50%)
 *  Right   → 100vw (image right-anchored via translateX -100%)
 *  Left    → 0vw
 */
const X_VW   = [50, 100, 100,  0, 50]

/** Bottom offset from viewport bottom in vh */
const Y_VH   = [10,  12,  12,  8,  8]

/** Character image height in vh */
const H_VH   = [80,  88,  85, 85, 80]

/** Scale of the container */
const SCALES = [1.0, 0.85, 0.85, 0.90, 1.1]

/**
 * translateX correction as a percentage of the image width.
 * -50%  → centre-aligned with the left anchor
 * -100% → right-aligned (image flush to right edge of viewport)
 * -88%  → slightly nudged left from the right edge
 *   0%  → left-aligned
 */
const TX_PCT = [-50, -100, -88, 0, -50]

// ─── Spring Config ────────────────────────────────────────────────────────────

const POSITION_SPRING = { stiffness: 55, damping: 18, mass: 1.3 } as const
const SCALE_SPRING    = { stiffness: 75, damping: 22, mass: 1.0 } as const

// ─── Crossfade opacity helpers ────────────────────────────────────────────────

/**
 * For a given phase index i, returns [inputRange, outputRange] arrays that
 * produce a bell-shaped opacity:  0 → 1 → 0  centred on KEYS[i].
 * FADE controls the half-width of the transition band.
 */
function phaseOpacityRanges(i: number): [number[], number[]] {
  const FADE = 0.10
  const k = KEYS[i]
  const n = KEYS.length

  if (i === 0) {
    // Start: fully visible from 0 → fade out towards next
    return [
      [0,             KEYS[1] - FADE,  KEYS[1]],
      [1,             1,               0],
    ]
  }
  if (i === n - 1) {
    // End: fade in from previous → fully visible until 1
    return [
      [KEYS[n - 2],  KEYS[n - 2] + FADE,  1],
      [0,             1,                   1],
    ]
  }
  // Middle phases: fade in, hold, fade out
  return [
    [k - FADE,  k,  k + FADE],
    [0,         1,  0],
  ]
}

// ─── Component ────────────────────────────────────────────────────────────────

export function GlobalCharacterOverlay() {
  const { scrollYProgress } = useScroll()

  // ── Raw scroll-linked values ────────────────────────────────────────────────
  const rawX     = useTransform(scrollYProgress, [...KEYS], X_VW)
  const rawY     = useTransform(scrollYProgress, [...KEYS], Y_VH)
  const rawH     = useTransform(scrollYProgress, [...KEYS], H_VH)
  const rawScale = useTransform(scrollYProgress, [...KEYS], SCALES)
  const rawTX    = useTransform(scrollYProgress, [...KEYS], TX_PCT)

  // ── Spring-smoothed output (gliding / dampened movement) ───────────────────
  const sx    = useSpring(rawX,     POSITION_SPRING)
  const sy    = useSpring(rawY,     POSITION_SPRING)
  const sh    = useSpring(rawH,     POSITION_SPRING)
  const ss    = useSpring(rawScale, SCALE_SPRING)
  const stx   = useSpring(rawTX,   POSITION_SPRING)

  // ── Derived CSS string MotionValues ─────────────────────────────────────────
  const cssLeft       = useTransform(sx,  v => `${v}vw`)
  const cssBottom     = useTransform(sy,  v => `${v}vh`)
  const cssHeight     = useTransform(sh,  v => `${v}vh`)
  const cssTranslateX = useTransform(stx, v => `${v}%`)

  // ── Per-phase crossfade opacities (5 separate hook calls – no map!) ─────────
  const [ir0, or0] = phaseOpacityRanges(0)
  const [ir1, or1] = phaseOpacityRanges(1)
  const [ir2, or2] = phaseOpacityRanges(2)
  const [ir3, or3] = phaseOpacityRanges(3)
  const [ir4, or4] = phaseOpacityRanges(4)

  const op0 = useTransform(scrollYProgress, ir0, or0, { clamp: true })
  const op1 = useTransform(scrollYProgress, ir1, or1, { clamp: true })
  const op2 = useTransform(scrollYProgress, ir2, or2, { clamp: true })
  const op3 = useTransform(scrollYProgress, ir3, or3, { clamp: true })
  const op4 = useTransform(scrollYProgress, ir4, or4, { clamp: true })

  const opacities = [op0, op1, op2, op3, op4]

  return (
    <div
      className="fixed inset-0 z-50 pointer-events-none overflow-hidden"
      aria-hidden="true"
    >
      {/*
        Single shared container.
        Position is animated via spring-smoothed `bottom` and `left`.
        `translateX` corrects the horizontal anchor (centre/right/left).
        `scale` is applied here so it doesn't fight with translateX correction.
        `transformOrigin: bottom center` ensures scaling stays grounded.
      */}
      <motion.div
        style={{
          position: 'absolute',
          bottom: cssBottom,
          left: cssLeft,
          translateX: cssTranslateX,
          scale: ss,
          transformOrigin: 'bottom center',
          height: cssHeight,
          width: 'auto',
        }}
      >
        {/*
          5 stacked images. Each shares the container dimensions.
          Only their opacity is animated — producing smooth crossfades
          as the user scrolls between sections.
        */}
        {IMAGES.map((src, i) => (
          <motion.img
            key={src}
            src={src}
            alt={`character phase ${i + 1}`}
            draggable={false}
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              height: '100%',
              width: 'auto',
              objectFit: 'contain',
              opacity: opacities[i],
              userSelect: 'none',
              pointerEvents: 'none',
            }}
          />
        ))}
      </motion.div>
    </div>
  )
}
