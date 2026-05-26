import { motion } from 'framer-motion'
import { staggerContainer, tarotCard } from '@/animations/variants'
import { SlashLabel } from '@/components/shared'

const CARDS = [
  {
    label: 'GitHub',
    icon: '{ }',
    url: 'https://github.com/GusWid715',
    sub: '@GusWid715',
  },
  {
    label: 'LinkedIn',
    icon: 'in',
    url: 'https://linkedin.com/in/gede-widiastana',
    sub: 'Connect',
  },
  {
    label: 'Email',
    icon: '@',
    url: 'mailto:gede.widiastana@example.com',
    sub: 'Send Message',
  },
]

export function S5_Contact() {
  return (
    <section
      id="s5-contact"
      className="relative h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ background: 'linear-gradient(to top, #000408 0%, var(--bg-base) 100%)' }}
    >
      {/* Header */}
      <motion.div
        className="text-center mb-16 -skew-x-3"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <SlashLabel text="// SECTION 05" />
        <h2
          className="font-bebas text-[clamp(40px,6vw,96px)] tracking-[6px] text-white leading-none"
          style={{ textShadow: '0 0 30px rgba(0,191,255,0.4)' }}
        >
          ESTABLISH SOCIAL LINK
        </h2>
        <p className="font-orbitron text-[11px] tracking-[5px] text-p3-dim uppercase mt-3">
          Choose your Arcana
        </p>
      </motion.div>

      {/* Tarot Cards */}
      <motion.div
        className="flex flex-row justify-center items-end gap-8"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {CARDS.map((card, i) => (
          <motion.a
            key={card.label}
            href={card.url}
            target="_blank"
            rel="noopener noreferrer"
            variants={tarotCard}
            whileHover={{
              y: -20,
              scale: 1.05,
              transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
            }}
            className="flex flex-col items-center justify-between no-underline"
            style={{
              width: '220px',
              height: '340px',
              background: 'var(--bg-card)',
              border: '1px solid var(--border-subtle)',
              borderTop: '3px solid var(--cyan)',
              borderRadius: '2px',
              padding: '2rem 1.5rem',
              backdropFilter: 'blur(14px)',
              cursor: 'pointer',
            }}
          >
            {/* Icon besar di tengah */}
            <div
              className="font-bebas text-[64px] leading-none mt-4"
              style={{
                color: 'var(--cyan)',
                textShadow: '0 0 20px rgba(0,191,255,0.7)',
              }}
            >
              {card.icon}
            </div>

            {/* Label */}
            <div className="flex flex-col items-center gap-1">
              <span className="font-bebas text-[28px] tracking-[4px] text-white uppercase">
                {card.label}
              </span>
              <span className="font-orbitron text-[10px] tracking-[3px] text-p3-dim uppercase">
                {card.sub}
              </span>
            </div>

            {/* Roman numeral (urutan arcana) */}
            <span className="font-orbitron text-[11px] tracking-[4px] text-white/20">
              {['I', 'II', 'III'][i]}
            </span>
          </motion.a>
        ))}
      </motion.div>

      {/* Bottom bar */}
      <div
        className="absolute bottom-0 left-0 right-0 py-4 px-12 flex justify-between items-center"
        style={{ borderTop: '1px solid rgba(0,191,255,0.1)' }}
      >
        <span className="font-orbitron text-[9px] tracking-[4px] text-white/20 uppercase">
          © 2026 GusWid — All Rights Reserved
        </span>
        <span className="font-orbitron text-[9px] tracking-[4px] text-p3-dim uppercase">
          Powered by Dark Hour
        </span>
      </div>
    </section>
  )
}
