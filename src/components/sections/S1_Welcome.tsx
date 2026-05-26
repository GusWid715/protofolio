import { motion } from 'framer-motion'
import { staggerContainer, fadeSlideUp } from '@/animations/variants'
import { GhostText } from '@/components/shared'

export function S1_Welcome() {
  return (
    <section
      id="s1-welcome"
      className="relative h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      <GhostText text="DARK HOUR" className="bottom-[-2vh] left-[-1vw]" />

      <motion.div
        className="relative z-10 flex flex-col items-center gap-6 mb-[15vh]"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        {/* Judul */}
        <motion.h1
          variants={fadeSlideUp}
          className="font-bebas text-[clamp(56px,9vw,130px)] tracking-[4px] leading-none text-[#f6fbff] text-center"
        >
          HI!!! SELAMAT<br />DATANG
        </motion.h1>

        {/* Sub-teks */}
        <motion.p
          variants={fadeSlideUp}
          className="font-orbitron text-[11px] tracking-[6px] text-[#8ef5ff]/70 uppercase"
        >
          // SCROLL TO EXPLORE
        </motion.p>
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
