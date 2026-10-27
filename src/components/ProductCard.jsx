import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import ProductVisual from './ProductVisual.jsx'
import { getMotif } from '../data/motifs.js'
import { term, typeLabel } from '../data/products.js'
import { useLang } from '../context/LangContext.jsx'
import { formatRupiah } from '../lib/utils.js'

export default function ProductCard({ product: p }) {
  const { lang, t, loc } = useLang()
  const soldOut = p.stock === 0
  return (
    <Link to={`/koleksi/${p.slug}`} className="group block h-full">
      <article className="flex h-full flex-col">
        <div className="relative aspect-[4/5] overflow-hidden border border-line bg-ivory-deep">
          <ProductVisual
            product={p}
            className="transition-transform duration-700 ease-out group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
          />
          <div className="absolute top-3 left-3 flex flex-col items-start gap-2">
            {p.label && <span className="bg-amber px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-espresso">{term(p.label, lang)}</span>}
            {soldOut && <span className="bg-espresso px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-ivory">{t('Stok Habis', 'Sold Out')}</span>}
          </div>
        </div>
        <div className="flex flex-1 flex-col pt-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-espresso-soft">
            {typeLabel(p.type, lang)} · {t('Motif', 'Motif')} {getMotif(p.motif)?.name}
          </p>
          <h3 className="mt-1.5 text-2xl font-normal leading-snug transition-colors group-hover:text-terracotta-deep">{loc(p, 'name')}</h3>
          <div className="mt-2 flex items-baseline justify-between gap-3">
            <p className="font-medium">{formatRupiah(p.price)}</p>
            <p className={`text-xs ${soldOut ? 'text-espresso-soft' : 'text-[#3f6b3a]'}`}>{soldOut ? t('Tidak tersedia', 'Unavailable') : t('Tersedia', 'Available')}</p>
          </div>
          <span className="mt-4 inline-flex items-center gap-2 self-start border-b border-terracotta pb-1 text-sm font-semibold text-terracotta-deep">
            {t('Lihat Detail', 'View Details')} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </span>
        </div>
      </article>
    </Link>
  )
}
