import { useEffect } from 'react'
import { business } from '../data/business.js'
import { useLang } from '../context/LangContext.jsx'

// Judul tab dan meta description per halaman, mengikuti bahasa aktif.
export function useMeta(title, description) {
  const { loc } = useLang()
  const tagline = loc(business, 'tagline')
  const fallback = loc(business, 'description')
  useEffect(() => {
    document.title = title ? `${title} — ${business.name}` : `${business.name} — ${tagline}`
    document.querySelector('meta[name="description"]')?.setAttribute('content', description || fallback)
  }, [title, description, tagline, fallback])
}
