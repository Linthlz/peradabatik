import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Check, Minus, Plus, ShoppingBag } from 'lucide-react'
import Breadcrumb from '../components/Breadcrumb.jsx'
import ProductVisual from '../components/ProductVisual.jsx'
import ProductGrid from '../components/ProductGrid.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import Ornament from '../components/Ornament.jsx'
import Motif from '../components/Motif.jsx'
import WhatsAppButton from '../components/WhatsAppButton.jsx'
import NotFound from './NotFound.jsx'
import { getProduct, products, term, typeLabel } from '../data/products.js'
import { getMotif } from '../data/motifs.js'
import { useCart } from '../context/CartContext.jsx'
import { formatRupiah } from '../lib/utils.js'
import { useMeta } from '../lib/useMeta.js'
import { useLang } from '../context/LangContext.jsx'


function Purchase({ product: p }) {
  const { add, lines } = useCart()
  const { t, loc } = useLang()
  const [size, setSize] = useState(p.sizes.length === 1 ? p.sizes[0] : '')
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)
  const [sizeError, setSizeError] = useState(false)
  const soldOut = p.stock === 0
  const inCart = lines.find((l) => l.slug === p.slug && l.size === size)?.qty || 0
  const maxQty = Math.max(0, p.stock - inCart)

  const onAdd = () => {
    if (p.sizes.length && !size) return setSizeError(true)
    add(p.slug, size, qty)
    setAdded(true)
    setQty(1)
  }

  return (
    <div className="mt-8 space-y-6">
      {p.sizes.length > 0 && (
        <fieldset>
          <legend className="text-xs font-semibold uppercase tracking-[0.16em] text-espresso-soft">{t('Ukuran', 'Size')}</legend>
          <div className="mt-3 flex flex-wrap gap-2">
            {p.sizes.map((s) => (
              <label key={s} className="cursor-pointer">
                <input
                  type="radio"
                  name="size"
                  value={s}
                  checked={size === s}
                  onChange={() => {
                    setSize(s)
                    setSizeError(false)
                    setAdded(false)
                  }}
                  className="peer sr-only"
                  disabled={soldOut}
                />
                <span className="flex h-11 min-w-12 items-center justify-center border border-line px-4 text-sm transition-colors peer-checked:border-espresso peer-checked:bg-espresso peer-checked:text-ivory peer-focus-visible:outline-2 peer-focus-visible:outline-terracotta peer-disabled:opacity-50 hover:border-espresso">
                  {s}
                </span>
              </label>
            ))}
          </div>
          {sizeError && <p className="mt-2 text-sm text-terracotta-dark" role="alert">{t('Pilih ukuran terlebih dahulu.', 'Please choose a size first.')}</p>}
        </fieldset>
      )}

      <p className="text-sm">
        {soldOut ? (
          <span className="font-semibold text-terracotta-dark">{t('Stok habis', 'Sold out')}</span>
        ) : (
          <>
            <span className="font-semibold text-[#3f6b3a]">{t('Tersedia', 'Available')}</span>
            <span className="text-espresso-soft"> · {t(`sisa ${p.stock} pcs`, `${p.stock} left`)}</span>
          </>
        )}
      </p>

      {!soldOut && (
        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="flex h-12 items-center border border-line" role="group" aria-label={t('Jumlah', 'Quantity')}>
            <button type="button" className="flex h-full w-12 items-center justify-center disabled:opacity-40" onClick={() => setQty((q) => q - 1)} disabled={qty <= 1} aria-label={t('Kurangi jumlah', 'Decrease quantity')}>
              <Minus className="h-4 w-4" aria-hidden="true" />
            </button>
            <span className="w-10 text-center tabular-nums" aria-live="polite">{qty}</span>
            <button type="button" className="flex h-full w-12 items-center justify-center disabled:opacity-40" onClick={() => setQty((q) => q + 1)} disabled={qty >= maxQty} aria-label={t('Tambah jumlah', 'Increase quantity')}>
              <Plus className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
          <button type="button" onClick={onAdd} disabled={maxQty === 0} className="btn-primary flex-1">
            <ShoppingBag className="h-4 w-4" aria-hidden="true" />
            {maxQty === 0 ? t('Seluruh stok ada di keranjang', 'All stock is in your cart') : t('Tambah ke Keranjang', 'Add to Cart')}
          </button>
        </div>
      )}

      <div aria-live="polite">
        {added && (
          <p className="flex flex-wrap items-center gap-x-3 gap-y-1 border border-line bg-ivory-deep/60 p-4 text-sm">
            <Check className="h-4 w-4 text-[#3f6b3a]" aria-hidden="true" /> {t('Ditambahkan ke keranjang.', 'Added to cart.')}
            <Link to="/keranjang" className="font-semibold text-terracotta-deep underline">{t('Lihat keranjang', 'View cart')}</Link>
          </p>
        )}
      </div>

      <WhatsAppButton
        text={t(
          `Halo Perada Batik, saya ingin bertanya tentang ${p.name}${size ? ` ukuran ${size}` : ''} (${formatRupiah(p.price)}).`,
          `Hello Perada Batik, I'd like to ask about ${loc(p, 'name')}${size ? ` in size ${size}` : ''} (${formatRupiah(p.price)}).`
        )}
        label={soldOut ? t('Tanyakan Ketersediaan', 'Ask About Availability') : t('Tanya Penjual via WhatsApp', 'Ask the Seller on WhatsApp')}
      />
    </div>
  )
}

export default function ProductDetail() {
  const { slug } = useParams()
  const p = getProduct(slug)
  const { t, loc } = useLang()
  useMeta(p ? loc(p, 'name') : t('Produk tidak ditemukan', 'Product not found'), p && loc(p, 'description'))
  if (!p)
    return (
      <NotFound
        title={t('Produk tidak ditemukan', 'Product not found')}
        text={t('Produk ini mungkin sudah tidak tersedia di koleksi kami.', 'This product may no longer be available in our collection.')}
      />
    )
  // key: galeri, ukuran, dan jumlah kembali ke awal saat berpindah ke produk serupa
  return <Detail key={p.slug} p={p} />
}

function Detail({ p }) {
  const [view, setView] = useState(0)
  const { lang, t, loc } = useLang()
  const motif = getMotif(p.motif)
  const name = loc(p, 'name')
  const viewLabels = [t('Tampak utama', 'Main view'), t('Detail motif', 'Motif detail'), t('Tampak keseluruhan', 'Full view')]
  const views = p.images.length || 3
  const related = products
    .filter((o) => o.slug !== p.slug && (o.motif === p.motif || o.type === p.type))
    .sort((a, b) => (b.motif === p.motif) - (a.motif === p.motif))
    .slice(0, 4)

  const specs = [
    [t('Jenis', 'Type'), typeLabel(p.type, lang)],
    ['Motif', motif.name],
    [t('Warna', 'Colour'), term(p.color, lang)],
    [t('Bahan', 'Material'), loc(p, 'material')],
    [t('Ukuran / potongan', 'Size / cut'), loc(p, 'dimension')],
  ]

  return (
    <>
      <div className="container-page pt-26">
        <Breadcrumb items={[{ label: t('Koleksi', 'Collection'), to: '/koleksi' }, { label: name }]} />
      </div>

      <section className="container-page grid gap-10 py-10 lg:grid-cols-2 lg:gap-16">
        <div className="lg:sticky lg:top-24 lg:self-start">
          <div className="aspect-[4/5] overflow-hidden border border-line">
            <ProductVisual product={p} view={view} eager />
          </div>
          {views > 1 && (
            <ul className="mt-4 grid grid-cols-3 gap-3" aria-label={t('Pilih gambar', 'Choose image')}>
              {Array.from({ length: views }, (_, i) => (
                <li key={i}>
                  <button
                    type="button"
                    onClick={() => setView(i)}
                    aria-label={p.images[i] ? `${t('Foto', 'Photo')} ${i + 1}` : viewLabels[i]}
                    aria-pressed={view === i}
                    className={`block aspect-square w-full overflow-hidden border-2 transition-colors ${view === i ? 'border-terracotta' : 'border-transparent hover:border-line'}`}
                  >
                    <ProductVisual product={p} view={i} />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div>
          <p className="eyebrow">{typeLabel(p.type, lang)} · Motif {motif.name}</p>
          <h1 className="mt-3 text-4xl font-light leading-tight sm:text-5xl">{name}</h1>
          {p.label && <span className="mt-4 inline-block bg-amber px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.16em]">{term(p.label, lang)}</span>}
          <p className="mt-5 text-2xl font-medium">{formatRupiah(p.price)}</p>
          <Ornament className="mt-6 text-amber" />
          <p className="mt-6 leading-relaxed text-espresso-soft">{loc(p, 'description')}</p>

          <dl className="mt-8 divide-y divide-line border-y border-line text-sm">
            {specs.map(([k, v]) => (
              <div key={k} className="grid grid-cols-[9rem_1fr] gap-4 py-3">
                <dt className="text-espresso-soft">{k}</dt>
                <dd className="font-medium">{v}</dd>
              </div>
            ))}
          </dl>

          <Purchase product={p} />
        </div>
      </section>

      <section className="relative mt-10 overflow-hidden bg-espresso text-ivory">
        <div className="container-page grid items-center gap-10 py-16 md:grid-cols-12 sm:py-20">
          <div className="md:col-span-4">
            <div className="aspect-square overflow-hidden border border-amber/40">
              <Motif motif={motif.id} colors={motif.palette} scale={1.6} className="h-full w-full" />
            </div>
          </div>
          <div className="md:col-span-7 md:col-start-6">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-amber">{t('Cerita di Balik Motif', 'The Story Behind the Motif')}</p>
            <h2 className="mt-3 text-4xl font-light">{motif.name}</h2>
            <p className="mt-2 text-sm text-ivory/70">{t('Asal', 'Origin')}: {loc(motif, 'origin')}</p>
            <Ornament className="mt-5 text-amber" />
            <p className="mt-6 leading-relaxed text-ivory/85">{loc(motif, 'meaning')}</p>
            <Link to="/filosofi-batik" className="btn-outline-light mt-8">{t('Pelajari Filosofi Batik', 'Learn the Philosophy of Batik')}</Link>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="container-page py-20">
          <SectionHeading eyebrow={t('Rekomendasi', 'Recommended')} title={t('Produk serupa', 'Similar products')} />
          <div className="mt-10">
            <ProductGrid products={related} columns="sm:grid-cols-2 lg:grid-cols-4" />
          </div>
        </section>
      )}
    </>
  )
}
