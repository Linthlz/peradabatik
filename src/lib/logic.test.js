import test from 'node:test'
import assert from 'node:assert/strict'
import { filterProducts } from './catalog.js'
import { validateContact } from './utils.js'
import { products } from '../data/products.js'
import { getMotif } from '../data/motifs.js'

test('filterProducts: filter dan urutan', () => {
  const base = { q: '', jenis: '', motif: '', warna: '', harga: '', urut: 'termurah' }
  const all = filterProducts(products, base)
  assert.equal(all.length, products.length)
  assert.ok(all.every((p, i) => i === 0 || all[i - 1].price <= p.price))

  assert.ok(filterProducts(products, { ...base, jenis: 'kemeja' }).every((p) => p.type === 'kemeja'))
  assert.ok(filterProducts(products, { ...base, harga: 'lt500' }).every((p) => p.price < 500000))
  // pencarian juga mencocokkan nama motif, bukan hanya nama produk
  assert.ok(filterProducts(products, { ...base, q: 'mega mendung' }).every((p) => p.motif === 'mega'))
  assert.equal(filterProducts(products, { ...base, q: 'tidak-ada' }).length, 0)
})

test('validateContact', () => {
  assert.deepEqual(validateContact({ name: 'Sari', email: 'sari@contoh.id', subject: 'Ukuran', message: 'Apakah tersedia ukuran L?' }), {})
  const e = validateContact({ name: ' ', email: 'bukan-email', subject: '', message: 'pendek' })
  assert.deepEqual(Object.keys(e).sort(), ['email', 'message', 'name', 'subject'])
})

test('data: slug unik dan motif terdaftar', () => {
  assert.equal(new Set(products.map((x) => x.slug)).size, products.length)
  for (const p of products) assert.ok(getMotif(p.motif) && p.colors, p.slug)
})

test('foto: semua file yang dirujuk ada di public/', async () => {
  const { existsSync, readFileSync } = await import('node:fs')
  const { photos } = await import('../data/photos.js')
  const srcs = [...Object.values(photos).map((p) => p.src), ...products.flatMap((p) => p.images)]
  for (const src of srcs) assert.ok(existsSync(new URL(`../../public${src}`, import.meta.url)), src)
  // id foto yang dipakai di Home harus terdaftar
  const home = readFileSync(new URL('../pages/Home.jsx', import.meta.url), 'utf8')
  const ids = home.match(/['"](?:model|manekin|potret|grup|runway|penari|kemeja|rak|tangan|pembatik|kain)-[a-z-]+['"]/g)
  assert.ok(ids.length > 20)
  for (const q of ids) assert.ok(photos[q.slice(1, -1)], q)
})

test('bahasa: setiap produk, motif, dan foto punya terjemahan English', async () => {
  const { photos } = await import('../data/photos.js')
  const { motifs } = await import('../data/motifs.js')
  for (const p of products) assert.ok(p.en?.name && p.en?.description, p.slug)
  for (const m of motifs) assert.ok(m.en?.meaning && m.en?.origin && m.en?.summary, m.id)
  for (const p of Object.values(photos)) assert.ok(p.en?.alt, p.id)
  assert.equal(validateContact({}, 'en').name, 'Name must be at least 2 characters.')
})
