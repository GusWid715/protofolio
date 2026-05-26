import type { Variants } from 'framer-motion'

export const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } }
}

export const slideInLeft: Variants = {
  hidden:   { opacity: 0, x: -60, filter: 'blur(6px)' },
  visible:  { opacity: 1, x: 0,   filter: 'blur(0px)',
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }
}

export const fadeSlideUp: Variants = {
  hidden:   { opacity: 0, y: 40 },
  visible:  { opacity: 1, y: 0,
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } }
}

export const fadeStagger: Variants = {
  hidden:   { opacity: 0, y: 16 },
  visible:  { opacity: 1, y: 0,
    transition: { duration: 0.45, ease: 'easeOut' } }
}

export const skillDetailTransition: Variants = {
  initial:  { opacity: 0, y: 20, filter: 'blur(4px)' },
  animate:  { opacity: 1, y: 0,  filter: 'blur(0px)',
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
  exit:     { opacity: 0, y: -20, filter: 'blur(4px)',
    transition: { duration: 0.25 } }
}

export const modalOverlay: Variants = {
  initial:  { opacity: 0 },
  animate:  { opacity: 1, transition: { duration: 0.3 } },
  exit:     { opacity: 0, transition: { duration: 0.25 } }
}

export const modalContent: Variants = {
  initial:  { opacity: 0, scale: 0.93, y: 20 },
  animate:  { opacity: 1, scale: 1,    y: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
  exit:     { opacity: 0, scale: 0.95, y: 10,
    transition: { duration: 0.25 } }
}

export const tarotCard: Variants = {
  hidden:   { opacity: 0, y: 80 },
  visible:  { opacity: 1, y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
}
