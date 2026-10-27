import Breadcrumb from './Breadcrumb.jsx'
import Motif from './Motif.jsx'
import Ornament from './Ornament.jsx'

export default function PageHeader({ title, description, breadcrumb, eyebrow }) {
  return (
    <header className="relative overflow-hidden border-b border-line bg-ivory-deep/60">
      <Motif
        motif="kawung"
        colors={{ ground: 'transparent', ink: '#d4621a', accent: '#f4ae52' }}
        scale={0.5}
        className="absolute inset-0 h-full w-full opacity-[0.07]"
      />
      <div className="container-page relative pt-30 pb-12 sm:pt-34 sm:pb-16">
        <Breadcrumb items={breadcrumb} />
        {eyebrow && <p className="eyebrow mt-8">{eyebrow}</p>}
        <h1 className="mt-3 max-w-3xl text-4xl font-light leading-tight sm:text-5xl lg:text-6xl">{title}</h1>
        <Ornament className="mt-5 text-terracotta" />
        {description && <p className="mt-5 max-w-2xl text-base leading-relaxed text-espresso-soft sm:text-lg">{description}</p>}
      </div>
    </header>
  )
}
