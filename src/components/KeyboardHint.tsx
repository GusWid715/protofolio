import { motion } from 'framer-motion'

export function KeyboardHint() {
  return (
    <motion.div
      className="fixed bottom-6 right-8 z-[100] flex flex-col items-end gap-2 pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.8, duration: 0.7 }}
    >
      {[{ key: '↑  ↓', label: 'NAVIGATE' }, { key: '↵', label: 'SELECT' }].map(({ key, label }) => (
        <div key={key} className="flex items-center gap-2 font-orbitron text-[10px] tracking-[3px] text-white/30">
          <span className="border border-white/20 px-[7px] py-[2px] text-[10px] text-white/40 rounded-[2px]">
            {key}
          </span>
          <span>{label}</span>
        </div>
      ))}
    </motion.div>
  )
}
