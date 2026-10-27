import Ornament from './Ornament.jsx'

export default function SectionHeading({ eyebrow, title, description, align = 'left', light = false, children }) {
  const center = align === 'center'
  return (
    <div className={`flex flex-col gap-4 ${center ? 'items-center text-center' : 'sm:flex-row sm:items-end sm:justify-between'}`}>
      <div className={center ? 'mx-auto max-w-2xl' : 'max-w-2xl'}>
        {eyebrow && <p className={`eyebrow ${light ? 'text-amber' : ''}`}>{eyebrow}</p>}
        <h2 className={`mt-3 text-3xl font-light leading-tight sm:text-4xl lg:text-5xl ${light ? 'text-ivory' : ''}`}>{title}</h2>
        <Ornament className={`mt-4 text-amber ${center ? 'mx-auto' : ''}`} />
        {description && <p className={`mt-4 leading-relaxed ${light ? 'text-ivory/80' : 'text-espresso-soft'}`}>{description}</p>}
      </div>
      {children}
    </div>
  )
}
