import { Link } from 'react-router-dom'

export const navLinks = [
  { to: '/', label: 'Home', en: 'Home' },
  { to: '/koleksi', label: 'Koleksi', en: 'Collection' },
  { to: '/tentang-kami', label: 'Tentang Kami', en: 'About Us' },
  { to: '/filosofi-batik', label: 'Filosofi Batik', en: 'Batik Philosophy' },
  { to: '/kontak', label: 'Kontak', en: 'Contact' },
]

export default function Logo({ light = false }) {
  return (
    <Link to="/" className={`flex flex-col leading-none ${light ? 'text-ivory' : 'text-espresso'}`} aria-label="Perada Batik — Home">
      <span className="font-display text-xl font-light tracking-[0.42em] sm:text-[1.35rem]">PERADA</span>
      <span className={`mt-1.5 text-[9px] font-medium tracking-[0.62em] ${light ? 'text-amber' : 'text-terracotta-deep'}`}>BATIK</span>
    </Link>
  )
}
