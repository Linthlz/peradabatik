import { Link } from 'react-router-dom'
import Ornament from '../components/Ornament.jsx'
import { useMeta } from '../lib/useMeta.js'
import { useLang } from '../context/LangContext.jsx'

export default function NotFound({ title, text }) {
  const { t } = useLang()
  title ??= t('Halaman tidak ditemukan', 'Page not found')
  text ??= t('Halaman yang Anda cari mungkin sudah dipindahkan atau tidak tersedia.', 'The page you are looking for may have moved or is no longer available.')
  useMeta(title)
  return (
    <section className="container-page flex min-h-[60vh] flex-col items-center justify-center pt-38 pb-20 text-center">
      <p className="eyebrow">404</p>
      <h1 className="mt-3 text-4xl font-light sm:text-5xl">{title}</h1>
      <Ornament className="mt-5 text-terracotta" />
      <p className="mt-5 max-w-md text-espresso-soft">{text}</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link to="/" className="btn-primary">{t('Kembali ke Home', 'Back to Home')}</Link>
        <Link to="/koleksi" className="btn-outline">{t('Lihat Koleksi', 'View Collection')}</Link>
      </div>
    </section>
  )
}
