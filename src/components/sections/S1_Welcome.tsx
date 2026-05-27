import { motion } from 'framer-motion'
import { staggerContainer, fadeSlideUp } from '@/animations/variants'

export function S1_Welcome() {
  return (
    <section
      id="s1-welcome"
      className="relative h-screen flex flex-col overflow-hidden"
    >
      {/* ── WELCOME ghost text — full section size ── */}
      {/* Ukuran font bisa diubah di fontSize di bawah ini */}
      <span
        className="absolute bottom-0 left-1/2 select-none pointer-events-none font-bebas leading-none"
        style={{
          fontSize: 'clamp(100px, 24vw, 800px)',
          color: 'rgba(246,251,255,0.04)',
          letterSpacing: '0px',
          whiteSpace: 'nowrap',
          zIndex: 0,
          transform: 'translateX(-50%) translateY(20%)',
        }}
      >
        WELCOME
      </span>

      {/* ── Judul atas — di belakang karakter (z-0 < StickyCharacter z-[1]) ── */}
      {/* Edit teks "HI!!! SELAMAT DATANG" di bawah ini */}
      {/* Edit ukuran font di fontSize: clamp(...) di bawah ini */}
      <motion.div
        className="absolute top-[8vh] left-0 right-0 flex justify-center px-8"
        style={{ zIndex: 0 }}
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          variants={fadeSlideUp}
          className="font-bebas leading-none text-[#f6fbff] text-center"
          style={{ fontSize: 'clamp(60px, 13vw, 200px)', letterSpacing: '6px' }}
        >
          HI!!! SELAMAT DATANG
        </motion.h1>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ zIndex: 10 }}
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
