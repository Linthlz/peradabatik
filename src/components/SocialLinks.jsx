import { Link } from 'react-router-dom'
import { Facebook, Instagram } from 'lucide-react'
import { business } from '../data/business.js'
import { waLink } from '../lib/utils.js'
import { useLang } from '../context/LangContext.jsx'

function WhatsAppIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12.04 2a9.9 9.9 0 0 0-8.5 14.98L2 22l5.17-1.5A9.92 9.92 0 1 0 12.04 2Zm0 18.13a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.07.89.9-2.99-.2-.31a8.22 8.22 0 1 1 6.85 3.74Zm4.5-6.15c-.25-.12-1.46-.72-1.69-.8-.23-.08-.39-.12-.55.12-.17.25-.64.8-.78.97-.14.16-.29.18-.54.06a6.73 6.73 0 0 1-3.36-2.94c-.25-.44.25-.41.72-1.35.08-.16.04-.3-.02-.42-.06-.12-.55-1.33-.76-1.82-.2-.48-.4-.41-.55-.42h-.47a.9.9 0 0 0-.65.3 2.74 2.74 0 0 0-.86 2.04 4.77 4.77 0 0 0 1 2.53 10.9 10.9 0 0 0 4.17 3.68c1.55.67 2.16.73 2.94.61.47-.07 1.46-.6 1.66-1.17.2-.58.2-1.07.15-1.17-.06-.11-.22-.17-.47-.29Z" />
    </svg>
  )
}

const icons = { Instagram, Facebook }

// Ikon Instagram, Facebook, dan WhatsApp. Tautan sosial diambil dari data/business.js;
// selama nomor WhatsApp belum diatur, ikon WhatsApp mengarah ke halaman Kontak.
export default function SocialLinks({ className = '', itemClass = '' }) {
  const { t } = useLang()
  const wa = waLink(t('Halo Perada Batik, saya ingin bertanya.', 'Hello Perada Batik, I have a question.'))
  const iconCls = 'h-[18px] w-[18px]'
  return (
    <ul className={`flex items-center ${className}`}>
      {business.social
        .filter((s) => s.url && icons[s.label])
        .map((s) => {
          const Icon = icons[s.label]
          return (
            <li key={s.label}>
              <a href={s.url} target="_blank" rel="noreferrer" className={itemClass} aria-label={`${s.label} Perada Batik`}>
                <Icon className={iconCls} aria-hidden="true" />
              </a>
            </li>
          )
        })}
      <li>
        {wa ? (
          <a href={wa} target="_blank" rel="noreferrer" className={itemClass} aria-label={t('Chat WhatsApp Perada Batik', 'Chat with Perada Batik on WhatsApp')}>
            <WhatsAppIcon className={iconCls} />
          </a>
        ) : (
          <Link to="/kontak" className={itemClass} aria-label={t('Kontak WhatsApp Perada Batik', 'Perada Batik WhatsApp contact')}>
            <WhatsAppIcon className={iconCls} />
          </Link>
        )}
      </li>
    </ul>
  )
}
