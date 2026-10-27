import { createContext, useContext, useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'

// true setelah loading screen selesai; animasi pembuka halaman menunggu sinyal ini.
export const IntroContext = createContext(true)
export const useIntroDone = () => useContext(IntroContext)

const ease = [0.24, 0.43, 0.15, 0.97]
const word = 'PERADA'.split('')

// Hanya tampil sekali saat situs pertama dibuka (bukan saat pindah halaman).
// Urutan: huruf muncul satu per satu di latar ivory → latar menjadi espresso → huruf hilang → layar memudar.
export default function Preloader({ onDone }) {
  const reduce = useReducedMotion()
  const [phase, setPhase] = useState('in') // in → dark → out → done

  useEffect(() => {
    if (reduce) {
      setPhase('done')
      return
    }
    document.body.style.overflow = 'hidden'
    const timers = [setTimeout(() => setPhase('dark'), 1300), setTimeout(() => setPhase('out'), 1900), setTimeout(() => setPhase('done'), 2500)]
    return () => {
      timers.forEach(clearTimeout)
      document.body.style.overflow = ''
    }
  }, [reduce])

  useEffect(() => {
    if (phase !== 'done') return
    document.body.style.overflow = ''
    onDone()
  }, [phase, onDone])

  const dark = phase !== 'in'
  const hide = phase === 'out'
  return (
    <AnimatePresence>
      {phase !== 'done' && (
        <motion.div
          aria-hidden="true"
          className="fixed inset-0 z-[60] flex items-center justify-center"
          initial={{ backgroundColor: '#f7e6c9' }}
          animate={{ backgroundColor: dark ? '#2a1a0e' : '#f7e6c9' }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease }}
        >
          <div className={`flex flex-col items-center transition-colors duration-500 ${dark ? 'text-ivory' : 'text-espresso'}`}>
            <p className="flex font-display text-lg font-light tracking-[0.55em] sm:text-xl">
              {word.map((ch, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 6 }}
                  animate={hide ? { opacity: 0, y: -6 } : { opacity: 1, y: 0 }}
                  // muncul berurutan, hilang dengan urutan acak seperti huruf yang "luruh"
                  transition={{ duration: 0.4, delay: hide ? [3, 0, 4, 1, 5, 2][i] * 0.06 : 0.15 + i * 0.12, ease }}
                >
                  {ch}
                </motion.span>
              ))}
            </p>
            <motion.p
              className={`mt-2 text-[10px] font-medium tracking-[0.7em] ${dark ? 'text-amber' : 'text-terracotta-deep'}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: hide ? 0 : 1 }}
              transition={{ duration: 0.5, delay: hide ? 0 : 0.9 }}
            >
              BATIK
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
