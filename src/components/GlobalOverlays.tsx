export function GlobalOverlays() {
  return (
    <>
      {/* 1. Animated background — pengganti video */}
      <div
        className="fixed inset-0 -z-10 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 60% 70% at 78% 50%, rgba(0,50,110,0.45) 0%, transparent 65%),
            radial-gradient(ellipse 45% 55% at 18% 50%, rgba(0,25,75,0.35) 0%, transparent 60%),
            #030810
          `
        }}
      />

      {/* 2. Scanline CRT overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-[9999]"
        style={{
          backgroundImage: `repeating-linear-gradient(
            0deg,
            transparent, transparent 3px,
            rgba(0,0,0,0.055) 3px, rgba(0,0,0,0.055) 4px
          )`
        }}
      />

      {/* 3. Vertical stripes — kanan layar */}
      <div
        className="fixed top-0 right-0 bottom-0 w-[4px] z-50 pointer-events-none"
        style={{
          background: 'var(--stripe-color)',
          boxShadow: '0 0 14px #00BFFF, 0 0 30px rgba(0,191,255,0.4)',
        }}
      />
      <div
        className="fixed top-0 right-[9px] bottom-0 w-[1px] z-50 pointer-events-none"
        style={{ background: 'var(--stripe-dim)' }}
      />
    </>
  )
}
