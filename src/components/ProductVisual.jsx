import Motif from './Motif.jsx'
import { useLang } from '../context/LangContext.jsx'
import { asset } from '../lib/asset.js'

// Foto produk bila ada; selain itu gambar motif kain. `view` memilih foto ke-n / skala motif untuk galeri.
const scales = [1.1, 2.4, 0.6]

export default function ProductVisual({ product, view = 0, className = '', eager = false }) {
  const { t, loc } = useLang()
  const name = loc(product, 'name')
  const src = product.images[view]
  if (src)
    return (
      <img
        src={asset(src)}
        alt={t(`${name}, foto ${view + 1}`, `${name}, photo ${view + 1}`)}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        className={`h-full w-full object-cover ${className}`}
      />
    )
  return (
    <Motif
      motif={product.motif}
      colors={product.colors}
      scale={scales[view % scales.length]}
      title={t(`Motif ${product.motif} pada ${name}`, `${product.motif} motif on ${name}`)}
      className={`h-full w-full ${className}`}
    />
  )
}
