import { useEffect, useRef } from 'react'
import { NavLink } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import Logo, { navLinks } from './Logo.jsx'
import Motif from './Motif.jsx'
import { useLang } from '../context/LangContext.jsx'
import LangSwitch from './LangSwitch.jsx'

export default function MobileNavigation({ open, onClose }) {
  const closeRef = useRef(null)
  const { t } = useLang()

  useEffect(() => {
    if (!open) return
    closeRef.current?.focus()
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <motion.div
            className="absolute inset-0 bg-espresso/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            id="mobile-nav"
            role="dialog"
            aria-modal="true"
            aria-label={t('Menu navigasi', 'Navigation menu')}
            className="absolute inset-y-0 right-0 flex w-[min(22rem,88vw)] flex-col overflow-y-auto bg-ivory"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center justify-between border-b border-line px-5 py-4">
              <Logo />
              <button ref={closeRef} type="button" onClick={onClose} className="flex h-11 w-11 items-center justify-center" aria-label={t('Tutup menu', 'Close menu')}>
                <X className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <nav aria-label={t('Navigasi mobile', 'Mobile navigation')} className="flex-1 px-5 py-6">
              <ul className="space-y-1">
                {navLinks.map((l) => (
                  <li key={l.to}>
                    <NavLink
                      to={l.to}
                      end={l.to === '/'}
                      onClick={onClose}
                      className={({ isActive }) =>
                        `flex items-center gap-3 border-l-2 py-3 pl-4 font-display text-2xl transition-colors ${
                          isActive ? 'border-amber text-terracotta-deep' : 'border-transparent hover:text-terracotta-deep'
                        }`
                      }
                    >
                      {t(l.label, l.en)}
                    </NavLink>
                  </li>
                ))}
              </ul>
              <LangSwitch className="mt-8 pl-4 text-base" />
            </nav>
            <div className="relative h-24 shrink-0" aria-hidden="true">
              <Motif motif="parang" colors={{ ground: '#2a1a0e', ink: '#f4ae52', accent: '#d4621a' }} scale={0.5} className="h-full w-full" />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
