import { getMotif } from '../data/motifs.js'

export const priceRanges = [
  { id: 'lt500', label: 'Di bawah Rp 500 rb', en: 'Under IDR 500k', test: (p) => p < 500000 },
  { id: '500-1000', label: 'Rp 500 rb – 1 jt', en: 'IDR 500k – 1M', test: (p) => p >= 500000 && p <= 1000000 },
  { id: 'gt1000', label: 'Di atas Rp 1 jt', en: 'Over IDR 1M', test: (p) => p > 1000000 },
]

export const sorts = [
  { id: 'terbaru', label: 'Produk terbaru', en: 'Newest' },
  { id: 'termurah', label: 'Harga terendah', en: 'Price: low to high' },
  { id: 'termahal', label: 'Harga tertinggi', en: 'Price: high to low' },
]

const compare = {
  terbaru: (a, b) => b.addedAt.localeCompare(a.addedAt),
  termurah: (a, b) => a.price - b.price,
  termahal: (a, b) => b.price - a.price,
}

// values: { q, jenis, motif, warna, harga, urut } — string kosong = tidak difilter.
export function filterProducts(list, values) {
  const q = (values.q || '').trim().toLowerCase()
  const range = priceRanges.find((r) => r.id === values.harga)
  return list
    .filter(
      (p) =>
        (!q || `${p.name} ${p.en?.name ?? ''} ${getMotif(p.motif)?.name} ${p.color}`.toLowerCase().includes(q)) &&
        (!values.jenis || p.type === values.jenis) &&
        (!values.motif || p.motif === values.motif) &&
        (!values.warna || p.color === values.warna) &&
        (!range || range.test(p.price))
    )
    .sort(compare[values.urut] || compare.terbaru)
}
