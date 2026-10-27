import { useEffect, useState } from 'react'
import { ArrowUp } from 'lucide-react'
import { useLang } from '../context/LangContext.jsx'

export default function BackToTop() {
  const [show, setShow] = useState(false)
  const { t } = useLang()
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 700)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  if (!show) return null
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' })}
      className="fixed right-4 bottom-4 z-30 flex h-12 w-12 items-center justify-center bg-espresso text-ivory shadow-lg transition-colors hover:bg-terracotta-deep sm:right-6 sm:bottom-6"
      aria-label={t('Kembali ke atas', 'Back to top')}
    >
      <ArrowUp className="h-5 w-5" aria-hidden="true" />
    </button>
  )
}
