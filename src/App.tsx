import './index.css'
import { GlobalOverlays } from '@/components/GlobalOverlays'
import { GlobalCharacterOverlay } from '@/components/GlobalCharacterOverlay'
import { useKeyboardNav } from '@/hooks/useKeyboardNav'

import { S1_Welcome }  from '@/components/sections/S1_Welcome'
import { S2_About }    from '@/components/sections/S2_About'
import { S3_Skills }   from '@/components/sections/S3_Skills'
import { S4_Projects } from '@/components/sections/S4_Projects'
import { S5_Contact }  from '@/components/sections/S5_Contact'

export default function App() {
  useKeyboardNav()

  return (
    <>
      {/* ── Global Fixed Layers ──────────────── */}
      <GlobalOverlays />
      <GlobalCharacterOverlay />

      {/* ── Page Content ─────────────────────── */}
      <main className="w-full">
        <div className="snap-start shrink-0">
          <S1_Welcome />
        </div>
        <div className="snap-start shrink-0">
          <S2_About />
        </div>
        {/* S3 wraps a 400vh tall sticky-scroll section — no shrink-0 */}
        <div className="snap-start">
          <S3_Skills />
        </div>
        <div className="snap-start shrink-0">
          <S4_Projects />
        </div>
        <div className="snap-start shrink-0">
          <S5_Contact />
        </div>
      </main>
    </>
  )
}
