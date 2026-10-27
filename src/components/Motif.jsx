import { useId } from 'react'

// Motif batik yang digambar sebagai pola SVG berulang.
// Setiap motif menerima tiga warna: ground (latar), ink (garis malam), accent (isen / prada).
// Ubin berukuran tetap dalam piksel (dikali `scale`), jadi pola tidak ikut membesar pada elemen yang lebar.

function Tile({ motif, c }) {
  switch (motif) {
    case 'kawung':
      return (
        <>
          {[
            [10, 10, 45], [30, 10, -45], [10, 30, -45], [30, 30, 45],
          ].map(([x, y, r], i) => (
            <g key={i} transform={`translate(${x} ${y}) rotate(${r})`}>
              <ellipse rx="9.5" ry="5.2" fill={c.ink} />
              <ellipse rx="6" ry="2.4" fill={c.ground} />
              <circle r="1.2" fill={c.accent} />
            </g>
          ))}
          <circle cx="20" cy="20" r="2.2" fill={c.accent} />
          <circle cx="0" cy="0" r="2.2" fill={c.accent} />
          <circle cx="40" cy="0" r="2.2" fill={c.accent} />
          <circle cx="0" cy="40" r="2.2" fill={c.accent} />
          <circle cx="40" cy="40" r="2.2" fill={c.accent} />
        </>
      )
    case 'parang':
      return (
        <>
          <path d="M0 14 C 8 2, 22 26, 30 14 L30 22 C 22 34, 8 10, 0 22 Z" fill={c.ink} />
          <path d="M0 18 C 8 6, 22 30, 30 18" stroke={c.ground} strokeWidth="1.2" fill="none" />
          <path d="M15 4 l3 3 -3 3 -3 -3z" fill={c.accent} />
          <circle cx="7" cy="27" r="1.1" fill={c.accent} />
          <circle cx="23" cy="9" r="1.1" fill={c.accent} />
        </>
      )
    case 'jlamprang': {
      const star = (cx, cy, R, r) => {
        const pts = []
        for (let i = 0; i < 16; i++) {
          const a = (Math.PI / 8) * i - Math.PI / 2
          const rad = i % 2 ? r : R
          pts.push(`${(cx + rad * Math.cos(a)).toFixed(2)},${(cy + rad * Math.sin(a)).toFixed(2)}`)
        }
        return pts.join(' ')
      }
      return (
        <>
          <polygon points={star(20, 20, 17, 11)} fill={c.ink} />
          <polygon points={star(20, 20, 11, 7)} fill={c.ground} />
          <circle cx="20" cy="20" r="5" fill={c.accent} />
          <circle cx="20" cy="20" r="2" fill={c.ground} />
          {[[0, 0], [40, 0], [0, 40], [40, 40]].map(([x, y], i) => (
            <path key={i} d={`M${x} ${y - 4} l4 4 -4 4 -4 -4z`} fill={c.accent} />
          ))}
        </>
      )
    }
    case 'buketan':
      return (
        <>
          <path d="M14 34 C 18 26, 26 24, 34 20" stroke={c.ink} strokeWidth="1.4" fill="none" />
          <path d="M22 27 c -6 -1, -9 -6, -8 -10 c 5 1, 8 5, 8 10z" fill={c.accent} />
          <path d="M28 23 c 3 5, 9 7, 13 5 c -2 -5, -7 -7, -13 -5z" fill={c.accent} />
          <g transform="translate(14 36)">
            {[0, 60, 120, 180, 240, 300].map((r) => (
              <ellipse key={r} rx="3.4" ry="7" cy="-6" transform={`rotate(${r})`} fill={c.ink} />
            ))}
            <circle r="3.6" fill={c.accent} />
            <circle r="1.4" fill={c.ground} />
          </g>
          <g transform="translate(46 14)">
            {[0, 72, 144, 216, 288].map((r) => (
              <ellipse key={r} rx="2.6" ry="5" cy="-4.5" transform={`rotate(${r})`} fill={c.ink} />
            ))}
            <circle r="2.4" fill={c.accent} />
          </g>
          {[[50, 44], [6, 8], [36, 52], [56, 30]].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="1.1" fill={c.ink} />
          ))}
        </>
      )
    case 'mega': {
      const cloud = (x, y) =>
        [18, 13.5, 9, 4.5].map((r, i) => (
          <path
            key={r}
            d={`M${x - r} ${y} A ${r} ${r} 0 0 1 ${x + r} ${y} Z`}
            fill={i % 2 ? c.ground : i === 0 ? c.ink : c.accent}
          />
        ))
      return (
        <>
          {cloud(30, 40)}
          {cloud(0, 20)}
          {cloud(60, 20)}
          {cloud(30, 0)}
        </>
      )
    }
    case 'truntum': {
      const flower = (x, y, s = 1) => (
        <g transform={`translate(${x} ${y}) scale(${s})`}>
          {[0, 45, 90, 135].map((r) => (
            <line key={r} x1="-5" x2="5" transform={`rotate(${r})`} stroke={c.ink} strokeWidth="1.2" strokeLinecap="round" />
          ))}
          <circle r="2" fill={c.accent} />
        </g>
      )
      return (
        <>
          {flower(15, 15)}
          {flower(0, 0, 0.7)}
          {flower(30, 0, 0.7)}
          {flower(0, 30, 0.7)}
          {flower(30, 30, 0.7)}
        </>
      )
    }
    case 'sekar':
    default:
      return (
        <>
          <path d="M2 4 Q 14 0 24 6 Q 26 18 18 24 Q 6 26 2 16 Z" fill={c.ink} />
          <path d="M28 4 Q 46 2 48 12 Q 46 24 32 22 Q 26 14 28 4 Z" fill={c.accent} />
          <path d="M4 30 Q 16 28 22 34 Q 22 46 12 48 Q 2 46 4 30 Z" fill={c.accent} />
          <path d="M28 28 Q 42 26 48 34 Q 48 46 36 48 Q 26 44 28 28 Z" fill={c.ink} />
          {[[12, 12], [38, 12], [13, 39], [38, 38]].map(([x, y], i) => (
            <g key={i}>
              <circle cx={x} cy={y} r="3" fill={c.ground} />
              <circle cx={x} cy={y} r="1" fill={i % 2 ? c.ink : c.accent} />
            </g>
          ))}
        </>
      )
  }
}

const SIZE = {
  kawung: [40, 40],
  parang: [30, 30],
  jlamprang: [40, 40],
  buketan: [60, 60],
  mega: [60, 40],
  truntum: [30, 30],
  sekar: [50, 50],
}

export default function Motif({ motif, colors, scale = 1, className, title }) {
  const id = useId().replace(/:/g, '')
  const [w, h] = SIZE[motif] || [40, 40]
  const rotate = motif === 'parang' ? ' rotate(-45)' : ''
  return (
    <svg className={className} {...(title ? { role: 'img', 'aria-label': title } : { 'aria-hidden': true })}>
      <defs>
        <pattern
          id={`p-${id}`}
          width={w}
          height={h}
          patternUnits="userSpaceOnUse"
          patternTransform={`scale(${scale})${rotate}`}
        >
          <rect width={w} height={h} fill={colors.ground} />
          <Tile motif={motif} c={colors} />
        </pattern>
        <filter id={`grain-${id}`}>
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
          <feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.22 0" />
          <feComposite in2="SourceGraphic" operator="in" />
        </filter>
      </defs>
      <rect width="100%" height="100%" fill={`url(#p-${id})`} />
      {/* serat kain */}
      <rect width="100%" height="100%" fill={colors.ground} filter={`url(#grain-${id})`} opacity="0.6" />
    </svg>
  )
}
