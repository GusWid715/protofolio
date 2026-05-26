import './index.css'
import { GlobalOverlays } from '@/components/GlobalOverlays'
import { StickyCharacter } from '@/components/StickyCharacter'
import { KeyboardHint } from '@/components/KeyboardHint'
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
      <StickyCharacter />
      <KeyboardHint />

      {/* ── Page Content ─────────────────────── */}
      <main className="w-full">
        <div className="snap-start shrink-0">
          <S1_Welcome />
        </div>
        <div className="snap-start shrink-0">
          <S2_About />
        </div>
        <div className="snap-start shrink-0">
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
