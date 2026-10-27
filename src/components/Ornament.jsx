// Pemisah dekoratif: garis tipis dengan kawung kecil di tengah.
export default function Ornament({ className = 'text-amber' }) {
  return (
    <svg viewBox="0 0 160 16" className={`h-4 w-40 ${className}`} aria-hidden="true">
      <path d="M0 8 H62 M98 8 H160" stroke="currentColor" strokeWidth="1" />
      <g fill="currentColor" transform="translate(80 8)">
        {[45, -45, 135, -135].map((r) => (
          <ellipse key={r} rx="5" ry="2.4" transform={`rotate(${r}) translate(5 0)`} />
        ))}
      </g>
      <circle cx="68" cy="8" r="1.5" fill="currentColor" />
      <circle cx="92" cy="8" r="1.5" fill="currentColor" />
    </svg>
  )
}
