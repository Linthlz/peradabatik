import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { ArrowUpRight, Menu, Search, ShoppingBag, X } from 'lucide-react'
import { useCart } from '../context/CartContext.jsx'
import { useLang } from '../context/LangContext.jsx'
import LangSwitch from './LangSwitch.jsx'
import MobileNavigation from './MobileNavigation.jsx'
import Logo, { navLinks } from './Logo.jsx'

// Halaman yang bagian atasnya gelap: navbar transparan memakai teks terang.
const darkTopPages = ['/', '/tentang-kami']

// Garis bawah meluncur masuk dari kiri saat kursor mendekat, keluar ke kanan saat menjauh.
const linkClass = (light) => ({ isActive }) =>
  `relative py-2 text-[15px] tracking-wide transition-colors after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:bg-amber after:transition-transform after:duration-500 after:ease-[cubic-bezier(0.24,0.43,0.15,0.97)] ${
    light ? 'hover:text-amber' : 'hover:text-terracotta-deep'
  } ${
    isActive
      ? `${light ? 'text-ivory' : 'text-espresso'} after:scale-x-100`
      : `${light ? 'text-ivory/85' : 'text-espresso/80'} after:origin-right after:scale-x-0 hover:after:origin-left hover:after:scale-x-100`
  }`

function SearchPanel({ onClose }) {
  const navigate = useNavigate()
  const { t } = useLang()
  const ref = useRef(null)
  useEffect(() => {
    ref.current?.focus()
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])
  const submit = (e) => {
    e.preventDefault()
    const q = new FormData(e.currentTarget).get('q').trim()
    navigate(q ? `/koleksi?q=${encodeURIComponent(q)}` : '/koleksi')
    onClose()
  }
  return (
    <div className="border-t border-line bg-ivory">
      <form role="search" onSubmit={submit} className="container-page flex items-center gap-3 py-4">
        <Search className="h-5 w-5 shrink-0 text-espresso-soft" aria-hidden="true" />
        <label htmlFor="site-search" className="sr-only">{t('Cari produk', 'Search products')}</label>
        <input
          ref={ref}
          id="site-search"
          name="q"
          type="search"
          placeholder={t('Cari nama produk atau motif, mis. parang', 'Search a product or motif, e.g. parang')}
          className="min-w-0 flex-1 bg-transparent py-2 font-display text-xl placeholder:text-espresso-soft/60 focus:outline-none"
        />
        <button type="submit" className="btn-primary px-4">{t('Cari', 'Search')}</button>
        <button type="button" onClick={onClose} className="p-2" aria-label={t('Tutup pencarian', 'Close search')}>
          <X className="h-5 w-5" aria-hidden="true" />
        </button>
      </form>
    </div>
  )
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const { count } = useCart()
  const { t } = useLang()
  const { pathname } = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    setMenuOpen(false)
    setSearchOpen(false)
  }, [pathname])

  // Scroll ke bawah menyembunyikan navbar, scroll ke atas memunculkannya lagi.
  useEffect(() => {
    let last = window.scrollY
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 40)
      if (Math.abs(y - last) > 6) setHidden(y > last && y > 160)
      last = y
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Navbar transparan mengikuti latar halaman sampai di-scroll; warna teks menyesuaikan latar gelap/terang.
  const atTop = !scrolled && !searchOpen
  const light = atTop && darkTopPages.includes(pathname)
  const iconClass = `flex h-11 w-11 items-center justify-center transition-colors ${light ? 'hover:text-amber' : 'hover:text-terracotta-deep'}`

  return (
    <>
      <header
        className={`sticky top-0 z-40 border-b transition-[translate,background-color,color,border-color] duration-700 ease-[cubic-bezier(0.24,0.43,0.15,0.97)] ${
          !atTop ? 'border-line bg-ivory/95 text-espresso backdrop-blur' : light ? 'border-ivory/15 bg-transparent text-ivory' : 'border-espresso/10 bg-transparent text-espresso'
        } ${hidden && !searchOpen ? '-translate-y-full' : ''}`}
      >
        <div className="container-page flex h-18 items-center justify-between gap-4">
          <Logo light={light} />

          <nav aria-label={t('Navigasi utama', 'Main navigation')} className="hidden lg:block">
            <ul className="flex items-center gap-7">
              {navLinks
                .filter((l) => l.to !== '/kontak')
                .map((l) => (
                  <li key={l.to}>
                    <NavLink to={l.to} end={l.to === '/'} className={linkClass(light)}>{t(l.label, l.en)}</NavLink>
                  </li>
                ))}
            </ul>
          </nav>

          <div className="flex items-center gap-1">
            <button type="button" onClick={() => setSearchOpen((v) => !v)} className={iconClass} aria-label={t('Cari produk', 'Search products')} aria-expanded={searchOpen}>
              <Search className="h-[18px] w-[18px]" aria-hidden="true" />
            </button>
            <Link to="/keranjang" className={`relative ${iconClass}`} aria-label={t(`Keranjang, ${count} barang`, `Cart, ${count} items`)}>
              <ShoppingBag className="h-[18px] w-[18px]" aria-hidden="true" />
              {count > 0 && (
                <span className="absolute top-1.5 right-1 flex h-4.5 min-w-4.5 items-center justify-center rounded-full bg-terracotta-deep px-1 text-[10px] font-semibold text-ivory">
                  {count}
                </span>
              )}
            </Link>
            <LangSwitch className="ml-1 hidden sm:flex" />
            <NavLink
              to="/kontak"
              className={`ml-3 hidden items-center gap-2 border px-4 py-2 text-sm tracking-wide transition-colors lg:inline-flex ${
                light ? 'border-ivory/60 hover:bg-ivory hover:text-espresso' : 'border-espresso/70 hover:bg-espresso hover:text-ivory'
              }`}
            >
              {t('Hubungi Kami', 'Contact Us')} <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </NavLink>
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              className={`${iconClass} lg:hidden`}
              aria-label={t('Buka menu', 'Open menu')}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
            >
              <Menu className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
        </div>
        {searchOpen && <SearchPanel onClose={() => setSearchOpen(false)} />}
      </header>
      {/* di luar header: header ber-translate menjadi containing block bagi elemen fixed */}
      <MobileNavigation open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  )
}
