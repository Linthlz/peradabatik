import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import PageHeader from '../components/PageHeader.jsx'
import ProductFilter from '../components/ProductFilter.jsx'
import ProductGrid from '../components/ProductGrid.jsx'
import { products } from '../data/products.js'
import { filterProducts } from '../lib/catalog.js'
import { useMeta } from '../lib/useMeta.js'
import { useLang } from '../context/LangContext.jsx'

const KEYS = ['q', 'jenis', 'motif', 'warna', 'harga', 'urut']
const PAGE = 9

function Results({ list, onReset }) {
  const [limit, setLimit] = useState(PAGE)
  const { t } = useLang()
  return (
    <>
      <ProductGrid
        products={list.slice(0, limit)}
        emptyAction={<button type="button" onClick={onReset} className="btn-outline">{t('Tampilkan Semua Produk', 'Show All Products')}</button>}
      />
      {list.length > limit && (
        <div className="mt-14 flex flex-col items-center gap-3">
          <p className="text-sm text-espresso-soft">{limit} {t('dari', 'of')} {list.length} {t('produk', 'products')}</p>
          <button type="button" onClick={() => setLimit((n) => n + PAGE)} className="btn-outline">{t('Muat Lebih Banyak', 'Load More')}</button>
        </div>
      )}
    </>
  )
}

export default function Collection() {
  const { t } = useLang()
  useMeta(
    t('Koleksi Batik', 'Batik Collection'),
    t(
      'Jelajahi koleksi kain panjang, kemeja, dress, outer, dan selendang batik Perada dengan motif tradisional Nusantara.',
      "Explore Perada's batik long cloths, shirts, dresses, outerwear, and shawls in traditional Indonesian motifs."
    )
  )
  const [params, setParams] = useSearchParams()
  const values = Object.fromEntries(KEYS.map((k) => [k, params.get(k) || (k === 'urut' ? 'terbaru' : '')]))
  const list = filterProducts(products, values)

  const onChange = (key, value) => {
    const next = new URLSearchParams(params)
    value ? next.set(key, value) : next.delete(key)
    // ketikan pencarian tidak perlu memenuhi riwayat browser
    setParams(next, { replace: key === 'q', preventScrollReset: true })
  }

  return (
    <>
      <PageHeader
        breadcrumb={[{ label: t('Koleksi', 'Collection') }]}
        eyebrow={t('Katalog', 'Catalogue')}
        title={t('Koleksi Perada Batik', 'The Perada Batik Collection')}
        description={t(
          'Kain panjang, kemeja, dress, outer, dan selendang dengan motif klasik Nusantara — dari parang dan kawung hingga mega mendung dan buketan pesisiran.',
          'Long cloths, shirts, dresses, outerwear, and shawls in classic Indonesian motifs — from parang and kawung to mega mendung and coastal buketan.'
        )}
      />
      <section className="container-page py-10 sm:py-14">
        <ProductFilter values={values} onChange={onChange} onReset={() => setParams({})} resultCount={list.length} />
        <div className="mt-12">
          <Results key={params.toString()} list={list} onReset={() => setParams({})} />
        </div>
      </section>
    </>
  )
}
