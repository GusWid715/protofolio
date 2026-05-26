import type { ReactNode } from 'react'

// SlashLabel — label section header berbentuk slash
export function SlashLabel({ text }: { text: string }) {
  return (
    <div className="inline-block mb-4"
      style={{ clipPath: 'polygon(0 0, calc(100% - 14px) 0, 100% 50%, calc(100% - 14px) 100%, 0 100%)' }}>
      <span className="block px-4 pr-7 py-[5px] bg-[#8ef5ff] font-orbitron font-black
        text-[10px] tracking-[5px] uppercase text-[#08153f]">
        {text}
      </span>
    </div>
  )
}

// GhostText — teks raksasa dekoratif di background
export function GhostText({ text, className = '' }: { text: string; className?: string }) {
  return (
    <span className={`absolute select-none pointer-events-none font-bebas
      text-[clamp(100px,18vw,260px)] leading-none tracking-[-6px]
      text-[#f6fbff]/[0.025] whitespace-nowrap z-0 ${className}`}>
      {text}
    </span>
  )
}

// P3Divider — divider horizontal khas Persona
export function P3Divider() {
  return (
    <div className="flex items-center gap-3 my-4">
      <div className="flex-1 h-px bg-gradient-to-r from-[#8ef5ff] to-transparent" />
      <span className="font-orbitron text-[9px] tracking-[5px] text-[#8ef5ff]/70 uppercase">● ●</span>
      <div className="flex-1 h-px bg-gradient-to-l from-[#8ef5ff] to-transparent" />
    </div>
  )
}

// GlassCard — container glassmorphism (Diubah menjadi solid box seperti referensi)
export function GlassCard({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`relative overflow-hidden ${className}`}
      style={{
        background: 'linear-gradient(180deg, rgba(15,28,105,0.96) 0%, rgba(8,16,68,0.97) 100%)',
        clipPath: 'polygon(0 0, 100% 0, calc(100% - 18px) 100%, 0 100%)',
        boxShadow: 'inset 0 0 0 1px rgba(133,244,255,0.16), 16px 16px 0 rgba(0,6,30,0.55)',
        padding: '24px',
      }}>
      {children}
    </div>
  )
}
