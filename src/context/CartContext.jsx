import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { getProduct } from '../data/products.js'

const CartContext = createContext(null)
const KEY = 'perada-cart'

function load() {
  try {
    const items = JSON.parse(localStorage.getItem(KEY)) || []
    // buang produk yang sudah tidak ada di katalog
    return items.filter((i) => getProduct(i.slug))
  } catch {
    return []
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(load)

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(items))
    } catch {
      /* penyimpanan diblokir: keranjang tetap jalan selama sesi */
    }
  }, [items])

  const value = useMemo(() => {
    const lines = items.map((i) => ({ ...i, product: getProduct(i.slug) }))
    const same = (i, slug, size) => i.slug === slug && i.size === size
    return {
      lines,
      count: items.reduce((n, i) => n + i.qty, 0),
      subtotal: lines.reduce((n, l) => n + l.qty * l.product.price, 0),
      add: (slug, size, qty = 1) =>
        setItems((prev) => {
          const stock = getProduct(slug).stock
          const hit = prev.find((i) => same(i, slug, size))
          if (hit) return prev.map((i) => (i === hit ? { ...i, qty: Math.min(stock, i.qty + qty) } : i))
          return [...prev, { slug, size, qty: Math.min(stock, qty) }]
        }),
      setQty: (slug, size, qty) =>
        setItems((prev) =>
          prev.map((i) => (same(i, slug, size) ? { ...i, qty: Math.max(1, Math.min(getProduct(slug).stock, qty)) } : i))
        ),
      remove: (slug, size) => setItems((prev) => prev.filter((i) => !same(i, slug, size))),
      clear: () => setItems([]),
    }
  }, [items])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export const useCart = () => useContext(CartContext)
