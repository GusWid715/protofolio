import { useEffect, useCallback, useRef } from 'react'

const SECTION_IDS = ['s1-welcome', 's2-about', 's3-skills', 's4-projects', 's5-contact']

export function useKeyboardNav() {
  const currentIdx = useRef(0)

  const scrollTo = useCallback((idx: number) => {
    const clamped = Math.max(0, Math.min(SECTION_IDS.length - 1, idx))
    currentIdx.current = clamped
    document.getElementById(SECTION_IDS[clamped])?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  const handleKey = useCallback((e: KeyboardEvent) => {
    if (e.key === 'ArrowDown' || e.key === 'j') { e.preventDefault(); scrollTo(currentIdx.current + 1) }
    if (e.key === 'ArrowUp'   || e.key === 'k') { e.preventDefault(); scrollTo(currentIdx.current - 1) }
  }, [scrollTo])

  useEffect(() => {
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [handleKey])
}
