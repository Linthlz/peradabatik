import { PackageSearch } from 'lucide-react'
import ProductCard from './ProductCard.jsx'
import Reveal from './Reveal.jsx'
import { useLang } from '../context/LangContext.jsx'

export default function ProductGrid({ products, columns = 'sm:grid-cols-2 lg:grid-cols-3', emptyAction }) {
  const { t } = useLang()
  if (!products.length)
    return (
      <div className="flex flex-col items-center border border-dashed border-line px-6 py-16 text-center">
        <PackageSearch className="h-10 w-10 text-terracotta" aria-hidden="true" />
        <p className="mt-4 font-display text-2xl">{t('Belum ada produk yang cocok', 'No matching products yet')}</p>
        <p className="mt-2 text-sm text-espresso-soft">{t('Coba ubah kata kunci atau kurangi filter.', 'Try another keyword or fewer filters.')}</p>
        {emptyAction && <div className="mt-6">{emptyAction}</div>}
      </div>
    )
  return (
    <ul className={`grid grid-cols-1 gap-x-6 gap-y-12 ${columns}`}>
      {products.map((p, i) => (
        <Reveal as="li" key={p.slug} delay={(i % 4) * 0.06}>
          <ProductCard product={p} />
        </Reveal>
      ))}
    </ul>
  )
}
