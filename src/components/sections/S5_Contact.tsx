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
      style={{ background: 'transparent' }}
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
          className="font-anton text-[72px] leading-[0.9] text-[#f6fbff] tracking-[2px]"
        >
          ESTABLISH SOCIAL LINK
        </h2>
        <p className="font-orbitron text-[11px] tracking-[5px] text-[#8ef5ff]/70 uppercase mt-3">
          Choose your Arcana
        </p>
      </motion.div>

      {/* Tarot Cards */}
      <motion.div
        className="flex flex-row justify-center items-end gap-12"
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
              width: '240px',
              height: '360px',
              background: 'linear-gradient(180deg, rgba(15,28,105,0.96) 0%, rgba(8,16,68,0.97) 100%)',
              clipPath: 'polygon(0 0, 100% 0, calc(100% - 18px) 100%, 0 100%)',
              boxShadow: 'inset 0 0 0 1px rgba(133,244,255,0.16), 16px 16px 0 rgba(0,6,30,0.55)',
              padding: '0',
              cursor: 'pointer',
            }}
          >
            {/* TOP BAR */}
            <div style={{
              display: "flex", alignItems: "center", justifyContent: "center", gap: 14, minHeight: 64, padding: "0 18px", width: "100%",
              background: "linear-gradient(90deg, #8ef5ff 0%, #d3fdff 100%)",
              clipPath: "polygon(0 0, 100% 0, calc(100% - 16px) 100%, 0 100%)",
              color: "#08153f", boxShadow: "10px 0 0 rgba(255,94,136,0.88)",
            }}>
              <div style={{ fontFamily: "'Anton', sans-serif", fontSize: 28, lineHeight: 0.92, letterSpacing: 1 }}>{card.label.toUpperCase()}</div>
            </div>

            {/* Icon besar di tengah */}
            <div
              className="font-bebas text-[84px] leading-none mt-4 flex-1 flex items-center justify-center"
              style={{ color: '#8df6ff' }}
            >
              {card.icon}
            </div>

            {/* Label / Subtitle */}
            <div className="flex flex-col items-center gap-1 w-full mb-6 px-4">
              <span className="font-bebas text-[18px] text-[#06133b] px-4 py-1 w-full text-center"
                    style={{ background: '#8df6ff', clipPath: 'polygon(0 0, 100% 0, calc(100% - 8px) 100%, 0 100%)' }}>
                {card.sub}
              </span>
            </div>

          </motion.a>
        ))}
      </motion.div>

      {/* Bottom bar */}
      <div
        className="absolute bottom-0 left-0 right-0 py-4 px-12 flex justify-between items-center"
        style={{ borderTop: '1px solid rgba(133, 244, 255, 0.16)' }}
      >
        <span className="font-orbitron text-[9px] tracking-[4px] text-[#f6fbff]/30 uppercase">
          © 2026 GusWid — All Rights Reserved
        </span>
        <span className="font-orbitron text-[9px] tracking-[4px] text-[#8ef5ff]/70 uppercase">
          Powered by Dark Hour
        </span>
      </div>
    </section>
  )
}
