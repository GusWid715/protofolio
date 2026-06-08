export function GlobalOverlays() {
  return (
    <>
      {/* 1. Animated background — pengganti video */}
      <div
        className="fixed inset-0 -z-10 pointer-events-none"
        style={{
          background: '#0f34bb'
        }}
      />

      {/* 2. Scanline CRT overlay (dihilangkan) */}

      {/* 3. Vertical stripes — kanan layar */}
      <div
        className="fixed top-0 right-0 bottom-0 w-[4px] z-50 pointer-events-none"
        style={{
          background: '#54fafe',
          boxShadow: 'none',
        }}
      />
      <div
        className="fixed top-0 right-[9px] bottom-0 w-[1px] z-50 pointer-events-none"
        style={{ background: 'rgba(84, 250, 254, 0.15)' }}
      />
    </>
  )
}
