import { motion } from 'framer-motion'
import { staggerContainer, fadeSlideUp } from '@/animations/variants'
import { GhostText } from '@/components/shared'

export function S1_Welcome() {
  return (
    <section
      id="s1-welcome"
      className="relative h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      <GhostText text="WELCOME" className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

      <motion.div
        className="z-10 flex flex-col items-center gap-6"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        {/* Judul */}
        <motion.h1
          variants={fadeSlideUp}
          className="font-bebas tracking-[6px] leading-none text-[#f6fbff] text-center"
          style={{ fontSize: 'clamp(60px, 13vw, 200px)' }}
        >
          HI!!! SELAMAT DATANG
        </motion.h1>

      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ delay: 2, duration: 2, repeat: Infinity }}
      >
        <span className="font-orbitron text-[9px] tracking-[4px] text-p3r-light/30 uppercase">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-p3r-cyan-1 to-transparent" />
      </motion.div>
    </section>
  )
}
