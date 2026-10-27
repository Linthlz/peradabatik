import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import Motif from './Motif.jsx'
import { useLang } from '../context/LangContext.jsx'

export default function CTASection({ title, text, to = '/koleksi', label }) {
  const { t } = useLang()
  title ??= t('Temukan kain yang bercerita untuk Anda', 'Find a cloth that tells your story')
  text ??= t('Jelajahi koleksi Perada Batik dan pilih motif yang paling dekat dengan kisah Anda.', 'Explore the Perada Batik collection and choose the motif closest to your own story.')
  label ??= t('Jelajahi Koleksi', 'Explore the Collection')
  return (
    <section className="relative overflow-hidden bg-espresso text-ivory">
      <Motif
        motif="parang"
        colors={{ ground: 'transparent', ink: '#f4ae52', accent: '#d4621a' }}
        scale={0.6}
        className="absolute inset-0 h-full w-full opacity-[0.08]"
      />
      <div className="container-page relative flex flex-col items-start gap-6 py-16 sm:py-20 md:flex-row md:items-center md:justify-between">
        <div className="max-w-xl">
          <h2 className="text-3xl font-light leading-tight sm:text-4xl">{title}</h2>
          <p className="mt-3 text-ivory/80">{text}</p>
        </div>
        <Link to={to} className="btn-primary shrink-0">
          {label} <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </section>
  )
}
