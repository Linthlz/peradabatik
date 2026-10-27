import { Link } from 'react-router-dom'
import { ArrowLeft, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react'
import PageHeader from '../components/PageHeader.jsx'
import ProductVisual from '../components/ProductVisual.jsx'
import WhatsAppButton from '../components/WhatsAppButton.jsx'
import { useCart } from '../context/CartContext.jsx'
import { typeLabel } from '../data/products.js'
import { formatRupiah } from '../lib/utils.js'
import { useMeta } from '../lib/useMeta.js'
import { useLang } from '../context/LangContext.jsx'

export default function Cart() {
  const { lang, t, loc } = useLang()
  useMeta(t('Keranjang', 'Cart'), t('Ringkasan produk pilihan Anda di Perada Batik.', 'A summary of your chosen products at Perada Batik.'))
  const { lines, subtotal, count, setQty, remove } = useCart()
  const unavailable = lines.some((l) => l.product.stock === 0)

  const orderText = [
    t('Halo Perada Batik, saya ingin memesan:', "Hello Perada Batik, I'd like to order:"),
    ...lines.map(
      (l, i) =>
        `${i + 1}. ${loc(l.product, 'name')}${l.size ? ` (${t('ukuran', 'size')} ${l.size})` : ''} × ${l.qty} = ${formatRupiah(l.qty * l.product.price)}`
    ),
    `Subtotal: ${formatRupiah(subtotal)}`,
    t('Mohon info ketersediaan dan ongkos kirimnya. Terima kasih.', 'Please confirm availability and shipping cost. Thank you.'),
  ].join('\n')

  return (
    <>
      <PageHeader breadcrumb={[{ label: t('Keranjang', 'Cart') }]} title={t('Keranjang belanja', 'Shopping cart')} />

      <section className="container-page py-12 sm:py-16">
        {lines.length === 0 ? (
          <div className="flex flex-col items-center border border-dashed border-line px-6 py-20 text-center">
            <ShoppingBag className="h-10 w-10 text-terracotta" aria-hidden="true" />
            <p className="mt-4 font-display text-3xl">{t('Keranjang Anda masih kosong', 'Your cart is empty')}</p>
            <p className="mt-2 text-sm text-espresso-soft">{t('Temukan kain dan busana batik pilihan di koleksi kami.', 'Discover batik fabrics and garments in our collection.')}</p>
            <Link to="/koleksi" className="btn-primary mt-8">{t('Jelajahi Koleksi', 'Explore the Collection')}</Link>
          </div>
        ) : (
          <div className="grid gap-12 lg:grid-cols-12">
            <ul className="divide-y divide-line border-y border-line lg:col-span-8">
              {lines.map((l) => {
                const p = l.product
                return (
                  <li key={`${l.slug}-${l.size}`} className="flex gap-4 py-6 sm:gap-6">
                    <Link to={`/koleksi/${p.slug}`} className="block aspect-[4/5] w-24 shrink-0 overflow-hidden border border-line sm:w-32">
                      <ProductVisual product={p} />
                    </Link>
                    <div className="flex min-w-0 flex-1 flex-col">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-espresso-soft">{typeLabel(p.type, lang)}</p>
                          <Link to={`/koleksi/${p.slug}`} className="mt-1 block font-display text-xl font-normal leading-snug hover:text-terracotta-deep sm:text-2xl">
                            {loc(p, 'name')}
                          </Link>
                          {l.size && <p className="mt-1 text-sm text-espresso-soft">{t('Ukuran', 'Size')}: {l.size}</p>}
                          {p.stock === 0 && <p className="mt-1 text-sm font-semibold text-terracotta-dark">{t('Stok habis — hapus dari keranjang', 'Sold out — remove from cart')}</p>}
                        </div>
                        <button type="button" onClick={() => remove(l.slug, l.size)} className="flex h-10 w-10 shrink-0 items-center justify-center text-espresso-soft hover:text-terracotta-dark" aria-label={t(`Hapus ${p.name} dari keranjang`, `Remove ${loc(p, 'name')} from cart`)}>
                          <Trash2 className="h-4 w-4" aria-hidden="true" />
                        </button>
                      </div>
                      <div className="mt-auto flex flex-wrap items-end justify-between gap-3 pt-4">
                        <div className="flex h-10 items-center border border-line" role="group" aria-label={t(`Jumlah ${p.name}`, `Quantity of ${loc(p, 'name')}`)}>
                          <button type="button" className="flex h-full w-10 items-center justify-center disabled:opacity-40" onClick={() => setQty(l.slug, l.size, l.qty - 1)} disabled={l.qty <= 1} aria-label={t('Kurangi jumlah', 'Decrease quantity')}>
                            <Minus className="h-3.5 w-3.5" aria-hidden="true" />
                          </button>
                          <span className="w-8 text-center text-sm tabular-nums">{l.qty}</span>
                          <button type="button" className="flex h-full w-10 items-center justify-center disabled:opacity-40" onClick={() => setQty(l.slug, l.size, l.qty + 1)} disabled={l.qty >= p.stock} aria-label={t('Tambah jumlah', 'Increase quantity')}>
                            <Plus className="h-3.5 w-3.5" aria-hidden="true" />
                          </button>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-espresso-soft">{formatRupiah(p.price)} / pcs</p>
                          <p className="font-medium">{formatRupiah(p.price * l.qty)}</p>
                        </div>
                      </div>
                    </div>
                  </li>
                )
              })}
            </ul>

            <aside className="lg:col-span-4">
              <div className="border border-line bg-ivory-deep/50 p-6 sm:p-8 lg:sticky lg:top-24">
                <h2 className="text-2xl font-normal">{t('Ringkasan pesanan', 'Order summary')}</h2>
                <dl className="mt-6 space-y-3 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-espresso-soft">{t('Jumlah barang', 'Items')}</dt>
                    <dd>{count}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-espresso-soft">{t('Ongkos kirim', 'Shipping')}</dt>
                    <dd className="text-espresso-soft">{t('Dikonfirmasi penjual', 'Confirmed by seller')}</dd>
                  </div>
                  <div className="flex justify-between border-t border-line pt-4 text-base">
                    <dt className="font-semibold">Subtotal</dt>
                    <dd className="font-semibold">{formatRupiah(subtotal)}</dd>
                  </div>
                </dl>
                <p className="mt-5 text-xs leading-relaxed text-espresso-soft">
                  {t(
                    'Pembayaran online belum tersedia. Pesanan dikirim ke penjual melalui WhatsApp untuk dikonfirmasi ketersediaan, ongkos kirim, dan cara pembayarannya.',
                    'Online payment is not available yet. Your order is sent to the seller via WhatsApp to confirm availability, shipping cost, and payment method.'
                  )}
                </p>
                <div className="mt-6 space-y-3">
                  {unavailable ? (
                    <p className="text-sm font-semibold text-terracotta-dark">{t('Hapus produk yang stoknya habis untuk melanjutkan.', 'Remove sold-out products to continue.')}</p>
                  ) : (
                    <WhatsAppButton text={orderText} label={t('Pesan via WhatsApp', 'Order via WhatsApp')} className="btn-primary" />
                  )}
                  <Link to="/koleksi" className="btn-outline w-full">
                    <ArrowLeft className="h-4 w-4" aria-hidden="true" /> {t('Lanjut Belanja', 'Continue Shopping')}
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        )}
      </section>
    </>
  )
}
