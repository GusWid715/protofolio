import { motion, useInView, type Variants } from 'framer-motion'
import { useRef } from 'react'

const STATS = [
  { label: 'ACADEMICS', level: 'Above Average', value: 3, max: 5 },
  { label: 'CHARM', level: 'Unpolished', value: 2, max: 5 },
  { label: 'COURAGE', level: 'Tough', value: 4, max: 5 },
]

const DATA = [
  { id: 'NAMA', value: 'Ida Bagus Gede Widiastana B.' },
  { id: 'PERAN', value: 'Data Science & Web Dev' },
  { id: 'LOKASI', value: 'Indonesia' },
  { id: 'STATUS', value: 'ACTIVE' },
  { id: 'TECH', value: 'Python, ML, PHP, Laravel' },
]

const panelVariants: Variants = {
  hidden: { x: '-100vw', skewX: 15 },
  visible: { 
    x: 0, 
    skewX: 0,
    transition: { 
      type: 'spring', 
      stiffness: 40, 
      damping: 15,
      staggerChildren: 0.1,
      delayChildren: 0.2
    } 
  }
}

const rowVariants: Variants = {
  hidden: { opacity: 0, x: -50 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { type: 'spring', stiffness: 50 }
  }
}

export function S2_About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-20%' })

  return (
    <section ref={ref} id="s2-about" className="relative min-h-screen flex items-center justify-end px-4 md:px-20 overflow-hidden">
      
      {/* Background Decor */}
      <span className="absolute left-[-10vw] top-[10%] font-bebas text-[30vw] leading-none text-p3r-light/[0.03] select-none pointer-events-none -skew-y-6">
        ABOUT ME
      </span>

      <motion.div
        className="relative z-10 w-[55%] flex flex-col items-start"
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={panelVariants}
      >
        {/* Header Text */}
        <h2 className="font-anton text-6xl md:text-8xl text-[#f6fbff] mb-8 -skew-x-12">
          ABOUT ME
        </h2>

        <div className="flex flex-col gap-6 w-full max-w-lg">
          
          {/* --- TOP BOX (STATS) --- */}
          <div 
            className="w-full bg-[#112a4a] rounded-lg border border-[#20406d] overflow-hidden"
            style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.2)' }}
          >
            <div className="p-6 flex flex-col gap-5">
              {STATS.map(stat => (
                <div key={stat.label} className="flex flex-col">
                  {/* Stat Label */}
                  <span className="font-bebas text-[#54fafe] tracking-[2px] mb-1">
                    {stat.label}
                  </span>
                  
                  {/* Segmented Bar */}
                  <div className="flex gap-[4px] h-[10px] w-48 mb-1">
                    {Array.from({ length: stat.max }).map((_, i) => (
                      <div 
                        key={i} 
                        className={`flex-1 ${i < stat.value ? 'bg-[#f4bc20]' : 'bg-[#54fafe]/20'}`} 
                      />
                    ))}
                  </div>
                  
                  {/* Stat Level Text */}
                  <span className="font-montserrat font-medium text-[#f6fbff] text-[15px] mt-1">
                    {stat.level}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* --- BOTTOM BOX (PERSONAL DATA) --- */}
          <div 
            className="w-full bg-[#112a4a] rounded-lg border border-[#20406d] overflow-hidden"
            style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.2)' }}
          >
            <div className="p-6">
              {/* Header Text */}
              <div className="font-bebas text-[#54fafe] tracking-widest text-xl mb-3">
                // PERSONAL DATA
              </div>
              
              {/* Thin Separator */}
              <div className="w-full h-px bg-[#54fafe]/20 mb-4" />

              {/* Content Wrapper */}
              <div className="flex flex-col">
                {DATA.map((item, index) => (
                  <div key={item.id} className="flex flex-col">
                    <motion.div 
                      variants={rowVariants}
                      className="flex items-center py-[14px]"
                    >
                      {/* Cyan Arrow */}
                      <span className="text-[#54fafe] text-[10px] mr-2">▶</span>
                      
                      {/* Label */}
                      <span className="font-bebas text-[#54fafe] tracking-[2px] w-[80px] shrink-0">
                        {item.id}
                      </span>
                      
                      {/* Separator Colon */}
                      <span className="text-[#f6fbff]/80 mx-3 text-sm">:</span>
                      
                      {/* Value */}
                      <span className="font-montserrat text-[#f6fbff] text-[15px] font-medium">
                        {item.value}
                      </span>
                    </motion.div>
                    
                    {/* Row Line Separator */}
                    {index !== DATA.length - 1 && (
                      <div className="w-full h-px bg-[#54fafe]/10" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
          
        </div>

      </motion.div>
    </section>
  )
}
