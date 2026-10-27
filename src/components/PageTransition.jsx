import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useReducedMotion } from 'framer-motion'
import { routePath } from '../lib/asset.js'

const FADE_MS = 250

// Perpindahan halaman yang halus: konten halaman lama memudar singkat, lalu halaman baru masuk
// (fade-in-nya ada di RootLayout). Lompatan scroll ke atas terjadi saat konten sedang tak terlihat.
// Back/forward browser dan perubahan query di halaman yang sama tidak ditahan.
export default function PageTransition() {
  const navigate = useNavigate()
  const reduce = useReducedMotion()
  const busy = useRef(false)

  useEffect(() => {
    if (reduce) return
    const onClick = (e) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
      const a = e.target.closest('a[href]')
      if (!a || a.target === '_blank' || a.hasAttribute('download')) return
      const url = new URL(a.href, window.location.href)
      if (url.origin !== window.location.origin || url.pathname === window.location.pathname) return
      // fase capture di document berjalan sebelum handler <Link>, yang lalu melewati navigasinya sendiri
      e.preventDefault()
      if (busy.current) return
      busy.current = true
      const main = document.getElementById('konten')
      main.style.transition = `opacity ${FADE_MS}ms ease`
      main.style.opacity = '0'
      setTimeout(() => {
        navigate(routePath(url.pathname) + url.search + url.hash)
        main.style.transition = ''
        main.style.opacity = ''
        busy.current = false
      }, FADE_MS)
    }
    document.addEventListener('click', onClick, true)
    return () => document.removeEventListener('click', onClick, true)
  }, [reduce, navigate])

  return null
}
