import { MessageCircle } from 'lucide-react'
import { waLink } from '../lib/utils.js'
import { useLang } from '../context/LangContext.jsx'

// Nonaktif dengan penjelasan bila nomor bisnis belum diatur di data/business.js.
export default function WhatsAppButton({ text, label, className = 'btn-outline' }) {
  const { t } = useLang()
  label ??= t('Hubungi via WhatsApp', 'Contact via WhatsApp')
  const href = waLink(text)
  if (!href)
    return (
      <div>
        <button type="button" disabled className={`${className} w-full`}>
          <MessageCircle className="h-4 w-4" aria-hidden="true" /> {label}
        </button>
        <p className="mt-2 text-xs text-espresso-soft">{t('Pemesanan via WhatsApp aktif setelah nomor bisnis resmi diatur.', 'WhatsApp ordering will be available once the official business number is set.')}</p>
      </div>
    )
  return (
    <a href={href} target="_blank" rel="noreferrer" className={`${className} w-full`}>
      <MessageCircle className="h-4 w-4" aria-hidden="true" /> {label}
    </a>
  )
}
