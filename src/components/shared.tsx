import type { ReactNode } from 'react'

// SlashLabel — label section header berbentuk slash
export function SlashLabel({ text }: { text: string }) {
  return (
    <div className="inline-block mb-4"
      style={{ clipPath: 'polygon(0 0, calc(100% - 14px) 0, 100% 50%, calc(100% - 14px) 100%, 0 100%)' }}>
      <span className="block px-4 pr-7 py-[5px] bg-p3-cyan font-orbitron font-black
        text-[10px] tracking-[5px] uppercase text-p3-black">
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
      text-white/[0.025] whitespace-nowrap z-0 ${className}`}>
      {text}
    </span>
  )
}

// P3Divider — divider horizontal khas Persona
export function P3Divider() {
  return (
    <div className="flex items-center gap-3 my-4">
      <div className="flex-1 h-px bg-gradient-to-r from-p3-cyan to-transparent" />
      <span className="font-orbitron text-[9px] tracking-[5px] text-p3-dim uppercase">● ●</span>
      <div className="flex-1 h-px bg-gradient-to-l from-p3-cyan to-transparent" />
    </div>
  )
}

// GlassCard — container glassmorphism
export function GlassCard({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`relative overflow-hidden ${className}`}
      style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border-subtle)',
        borderLeft: '3px solid var(--cyan)',
        backdropFilter: 'blur(14px)',
        borderRadius: '2px',
        boxShadow: '0 8px 32px rgba(0,0,0,0.55), inset 0 0 30px rgba(0,191,255,0.03)',
      }}>
      {/* Corner accent */}
      <div className="absolute top-0 right-0 w-0 h-0 pointer-events-none"
        style={{
          borderStyle: 'solid',
          borderWidth: '0 32px 32px 0',
          borderColor: 'transparent #00BFFF transparent transparent',
          opacity: 0.5,
        }} />
      {children}
    </div>
  )
}
