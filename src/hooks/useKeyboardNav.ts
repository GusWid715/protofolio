import { useEffect, useCallback, useRef } from 'react'

// Sections dan berapa banyak scroll-step per section.
// S3_Skills punya 4 skill pages (sticky-scroll, 400vh total).
const SECTIONS: { id: string; steps: number }[] = [
  { id: 's1-welcome',  steps: 1 },
  { id: 's2-about',    steps: 1 },
  { id: 's3-skills',   steps: 4 },
  { id: 's4-projects', steps: 1 },
  { id: 's5-contact',  steps: 1 },
]

// Total logical steps across all sections
const TOTAL_STEPS = SECTIONS.reduce((sum, s) => sum + s.steps, 0) // 8

/**
 * Given a logical step index (0–7), returns the section id and
 * the pixel offset within that section.
 */
function stepToPosition(step: number): { id: string; offsetVh: number } {
  let remaining = step
  for (const s of SECTIONS) {
    if (remaining < s.steps) {
      // offsetVh: how many 100vh pages into this section
      return { id: s.id, offsetVh: remaining * 100 }
    }
    remaining -= s.steps
  }
  // clamp to last section, last step
  const last = SECTIONS[SECTIONS.length - 1]
  return { id: last.id, offsetVh: (last.steps - 1) * 100 }
}

export function useKeyboardNav() {
  const currentStep = useRef(0)

  const scrollTo = useCallback((step: number) => {
    const clamped = Math.max(0, Math.min(TOTAL_STEPS - 1, step))
    currentStep.current = clamped

    const { id, offsetVh } = stepToPosition(clamped)
    const el = document.getElementById(id)
    if (!el) return

    const sectionTop = el.getBoundingClientRect().top + window.scrollY
    window.scrollTo({ top: sectionTop + offsetVh * window.innerHeight / 100, behavior: 'smooth' })
  }, [])

  const handleKey = useCallback((e: KeyboardEvent) => {
    if (e.key === 'ArrowDown' || e.key === 'j') { e.preventDefault(); scrollTo(currentStep.current + 1) }
    if (e.key === 'ArrowUp'   || e.key === 'k') { e.preventDefault(); scrollTo(currentStep.current - 1) }
  }, [scrollTo])

  useEffect(() => {
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [handleKey])
}
