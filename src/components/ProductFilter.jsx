import { Search, X } from 'lucide-react'
import { productTypes, productColors, term } from '../data/products.js'
import { useLang } from '../context/LangContext.jsx'
import { motifs } from '../data/motifs.js'
import { priceRanges, sorts } from '../lib/catalog.js'

// [key, label, label semua] dalam ID / EN; opsi dibuat sesuai bahasa aktif
const selects = (lang) => {
  const en = lang === 'en'
  return [
    { key: 'jenis', label: en ? 'Product type' : 'Jenis produk', all: en ? 'All types' : 'Semua jenis', options: productTypes.map((x) => [x.id, en ? x.en : x.label]) },
    { key: 'motif', label: 'Motif', all: en ? 'All motifs' : 'Semua motif', options: motifs.map((m) => [m.id, m.name]) },
    { key: 'warna', label: en ? 'Colour' : 'Warna', all: en ? 'All colours' : 'Semua warna', options: productColors.map((c) => [c, term(c, lang)]) },
    { key: 'harga', label: en ? 'Price range' : 'Rentang harga', all: en ? 'All prices' : 'Semua harga', options: priceRanges.map((r) => [r.id, en ? r.en : r.label]) },
  ]
}

// Komponen terkontrol: nilai dan perubahan dikelola halaman (disimpan di URL query).
export default function ProductFilter({ values, onChange, onReset, resultCount }) {
  const { lang, t } = useLang()
  const fields = selects(lang)
  const active = fields.some((s) => values[s.key]) || values.q
  return (
    <div className="border-y border-line py-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-6">
        <div className="sm:col-span-2 lg:col-span-2">
          <label htmlFor="f-q" className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.16em] text-espresso-soft">{t('Cari', 'Search')}</label>
          <div className="relative">
            <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-espresso-soft" aria-hidden="true" />
            <input
              id="f-q"
              type="search"
              value={values.q}
              onChange={(e) => onChange('q', e.target.value)}
              placeholder={t('Nama produk atau motif', 'Product name or motif')}
              className="input pl-9"
            />
          </div>
        </div>
        {fields.map((s) => (
          <div key={s.key}>
            <label htmlFor={`f-${s.key}`} className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.16em] text-espresso-soft">{s.label}</label>
            <select id={`f-${s.key}`} value={values[s.key]} onChange={(e) => onChange(s.key, e.target.value)} className="input">
              <option value="">{s.all}</option>
              {s.options.map(([v, l]) => (
                <option key={v} value={v}>{l}</option>
              ))}
            </select>
          </div>
        ))}
      </div>
      <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
        <p className="text-sm text-espresso-soft" aria-live="polite">
          {t('Menampilkan', 'Showing')} <strong className="text-espresso">{resultCount}</strong> {t('produk', resultCount === 1 ? 'product' : 'products')}
        </p>
        <div className="flex flex-wrap items-center gap-4">
          {active && (
            <button type="button" onClick={onReset} className="inline-flex items-center gap-1 text-sm font-semibold text-terracotta-deep hover:text-espresso">
              <X className="h-4 w-4" aria-hidden="true" /> {t('Hapus filter', 'Clear filters')}
            </button>
          )}
          <label className="flex items-center gap-2 text-sm">
            <span className="text-espresso-soft">{t('Urutkan', 'Sort by')}</span>
            <select value={values.urut} onChange={(e) => onChange('urut', e.target.value)} className="input w-auto min-h-11 py-2">
              {sorts.map((s) => (
                <option key={s.id} value={s.id}>{t(s.label, s.en)}</option>
              ))}
            </select>
          </label>
        </div>
      </div>
    </div>
  )
}
