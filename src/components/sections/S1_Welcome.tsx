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
        className="relative z-10 flex flex-col items-center gap-6"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        {/* Eyebrow label */}
        <motion.div variants={fadeSlideUp}>
          <div
            className="inline-block mb-2"
            style={{ clipPath: 'polygon(0 0, calc(100% - 14px) 0, 100% 50%, calc(100% - 14px) 100%, 0 100%)' }}
          >
            <span className="block px-4 pr-7 py-[5px] bg-p3r-cyan-1 font-orbitron font-black text-[10px] tracking-[5px] uppercase text-p3r-dark-grey">
              // PORTFOLIO 2026
            </span>
          </div>
        </motion.div>

        {/* Judul */}
        <motion.h1
          variants={fadeSlideUp}
          className="font-bebas text-[clamp(56px,9vw,130px)] tracking-[4px] leading-none text-p3r-light text-center"
        >
          HI!!! SELAMAT<br />DATANG
        </motion.h1>

        {/* Sub-teks */}
        <motion.p
          variants={fadeSlideUp}
          className="font-orbitron text-[11px] tracking-[6px] text-p3r-cyan-1/70 uppercase"
        >
          // SCROLL TO EXPLORE
        </motion.p>

        {/* Name tag */}
        <motion.div
          variants={fadeSlideUp}
          className="flex flex-col items-center gap-1 mt-2"
        >
          <span className="font-rajdhani text-[16px] text-p3r-light/80 tracking-[2px]">
            Ida Bagus Gede Widiastana Bawaskara
          </span>
          <span className="font-orbitron text-[10px] tracking-[4px] text-p3r-cyan-1/70 uppercase">
            Data Science & Web Development
          </span>
        </motion.div>
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
