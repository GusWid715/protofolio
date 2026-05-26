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
      <main>
        <S1_Welcome />
        <S2_About />
        <S3_Skills />
        <S4_Projects />
        <S5_Contact />
      </main>
    </>
  )
}
