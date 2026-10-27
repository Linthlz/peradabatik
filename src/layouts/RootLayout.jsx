import { ScrollRestoration, useLocation, useOutlet } from 'react-router-dom'
import { useCallback, useState } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import BackToTop from '../components/BackToTop.jsx'
import Ornament from '../components/Ornament.jsx'
import Preloader, { IntroContext } from '../components/Preloader.jsx'
import PageTransition from '../components/PageTransition.jsx'
import { useLang } from '../context/LangContext.jsx'

export function PageLoader() {
  const { t } = useLang()
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 pt-18" role="status">
      <Ornament className="animate-pulse text-terracotta motion-reduce:animate-none" />
      <span className="text-xs uppercase tracking-[0.2em] text-espresso-soft">{t('Memuat halaman…', 'Loading page…')}</span>
    </div>
  )
}

// Garis progres baca tipis di atas layar.
function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 40, restDelta: 0.001 })
  return <motion.div style={{ scaleX }} className="fixed inset-x-0 top-0 z-50 h-0.5 origin-left bg-terracotta" aria-hidden="true" />
}

export default function RootLayout() {
  const outlet = useOutlet()
  const { t } = useLang()
  const { pathname } = useLocation()
  const [introDone, setIntroDone] = useState(false)
  const finishIntro = useCallback(() => setIntroDone(true), [])
  return (
    <IntroContext.Provider value={introDone}>
      <Preloader onDone={finishIntro} />
      <PageTransition />
      <a href="#konten" className="sr-only z-50 bg-espresso px-4 py-2 text-ivory focus:not-sr-only focus:fixed focus:top-2 focus:left-2">
        {t('Lewati ke konten', 'Skip to content')}
      </a>
      <Navbar />
      <ScrollProgress />
      {/* -mt-18: bagian atas tiap halaman berada di belakang navbar transparan (halaman memberi pt ekstra 4.5rem) */}
      <main id="konten" className="-mt-18 overflow-x-clip">
        {/* transisi masuk per halaman; tanpa animasi keluar agar scroll restoration tidak melompat */}
        <motion.div key={pathname} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}>
          {outlet}
        </motion.div>
      </main>
      <Footer />
      <BackToTop />
      <ScrollRestoration />
    </IntroContext.Provider>
  )
}
