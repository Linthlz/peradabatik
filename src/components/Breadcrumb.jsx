import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'

// items: [{ label, to? }] — item terakhir adalah halaman aktif.
export default function Breadcrumb({ items, className = '', light = false }) {
  const all = [{ label: 'Home', to: '/' }, ...items]
  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className={`flex flex-wrap items-center gap-1.5 text-xs uppercase tracking-[0.16em] ${light ? 'text-ivory/70' : 'text-espresso-soft'}`}>
        {all.map((it, i) => (
          <li key={it.label} className="flex items-center gap-1.5">
            {i > 0 && <ChevronRight className="h-3 w-3" aria-hidden="true" />}
            {it.to && i < all.length - 1 ? (
              <Link to={it.to} className={`tap-area ${light ? 'hover:text-amber' : 'hover:text-terracotta-deep'}`}>{it.label}</Link>
            ) : (
              <span aria-current="page" className={light ? 'text-ivory' : 'text-espresso'}>{it.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
