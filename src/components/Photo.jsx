import { photos } from '../data/photos.js'
import { useLang } from '../context/LangContext.jsx'
import { asset } from '../lib/asset.js'

// Foto dari data/photos.js. Wadahnya yang menentukan rasio; gambar mengisi penuh (object-cover).
export default function Photo({ id, className = '', position = 'center', eager = false }) {
  const p = photos[id]
  const { loc } = useLang()
  return (
    <img
      src={asset(p.src)}
      alt={loc(p, 'alt')}
      width={p.w}
      height={p.h}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      style={{ objectPosition: position }}
      className={`h-full w-full object-cover ${className}`}
    />
  )
}
