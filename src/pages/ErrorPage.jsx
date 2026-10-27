import { isRouteErrorResponse, Link, useRouteError } from 'react-router-dom'
import NotFound from './NotFound.jsx'
import { useLang } from '../context/LangContext.jsx'

export default function ErrorPage() {
  const error = useRouteError()
  const { t } = useLang()
  if (isRouteErrorResponse(error) && error.status === 404) return <NotFound />
  // Gagal memuat chunk halaman (mis. setelah deploy baru) juga berakhir di sini.
  return (
    <section className="flex min-h-[60vh] flex-col items-center justify-center px-4 pt-38 pb-20 text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#b04e16]">{t('Terjadi kesalahan', 'Something went wrong')}</p>
      <h1 className="mt-3 font-display text-4xl font-light">{t('Halaman gagal dimuat', 'The page failed to load')}</h1>
      <p className="mt-4 max-w-md text-[#5a4636]">{t('Silakan muat ulang halaman. Jika masalah berlanjut, coba beberapa saat lagi.', 'Please reload the page. If the problem persists, try again in a moment.')}</p>
      <div className="mt-8 flex gap-3">
        <button type="button" onClick={() => window.location.reload()} className="btn-primary">{t('Muat Ulang', 'Reload')}</button>
        <Link to="/" className="btn-outline">{t('Ke Home', 'Go Home')}</Link>
      </div>
    </section>
  )
}
