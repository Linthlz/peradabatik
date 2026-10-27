import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Clock, Mail, MapPin, MessageCircle } from 'lucide-react'
import { business } from '../data/business.js'
import Logo, { navLinks } from './Logo.jsx'
import SocialLinks from './SocialLinks.jsx'
import Photo from './Photo.jsx'
import { photos } from '../data/photos.js'
import { useLang } from '../context/LangContext.jsx'

const credited = Object.values(photos).filter((p) => p.author)

export default function Footer() {
  const { t, loc } = useLang()
  const contacts = [
    business.whatsapp && business.whatsappDisplay && { icon: MessageCircle, text: business.whatsappDisplay, href: `https://wa.me/${business.whatsapp}` },
    business.email && { icon: Mail, text: business.email, href: `mailto:${business.email}` },
    business.address && { icon: MapPin, text: business.address },
    business.hours && { icon: Clock, text: business.hours },
  ].filter(Boolean)

  return (
    <footer className="border-t border-line bg-ivory text-espresso">
      {/* jarak atas lebar agar isi footer tidak tertutup navbar yang muncul saat scroll ke atas */}
      <div className="container-page grid gap-12 pt-24 pb-10 sm:pt-28 lg:pt-32 md:grid-cols-12">
        <div className="md:col-span-5">
          <Logo />
          <p className="mt-6 max-w-sm leading-relaxed text-espresso-soft">{loc(business, 'description')}</p>
          <SocialLinks className="mt-6 -ml-2.5" itemClass="flex h-11 w-11 items-center justify-center text-espresso-soft transition-colors hover:text-terracotta-deep" />
        </div>

        <div className="md:col-span-3">
          <h2 className="text-xs font-medium uppercase tracking-[0.22em] text-espresso-soft">{t('Navigasi', 'Navigation')}</h2>
          <ul className="mt-3">
            {navLinks.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="inline-flex min-h-11 items-center text-espresso/85 transition-colors hover:text-terracotta-deep">{t(l.label, l.en)}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-4">
          <h2 className="text-xs font-medium uppercase tracking-[0.22em] text-espresso-soft">{t('Hubungi Kami', 'Get in Touch')}</h2>
          {contacts.length ? (
            <ul className="mt-5 space-y-3">
              {contacts.map(({ icon: Icon, text, href }) => (
                <li key={text} className="flex gap-3 text-espresso/85">
                  <Icon className="mt-1 h-4 w-4 shrink-0 text-terracotta" aria-hidden="true" />
                  {href ? <a href={href} className="break-all hover:text-terracotta-deep">{text}</a> : <span>{text}</span>}
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-5 text-espresso/85">
              {t('Kunjungi halaman', 'Visit our')}{' '}
              <Link to="/kontak" className="underline underline-offset-4 hover:text-terracotta-deep">{t('Kontak', 'Contact')}</Link>{' '}
              {t('untuk informasi terbaru.', 'page for the latest information.')}
            </p>
          )}
        </div>
      </div>

      <div className="container-page flex flex-col gap-4 pb-10 text-sm text-espresso-soft sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p>© {new Date().getFullYear()} {business.name}. {t('Hak cipta dilindungi.', 'All rights reserved.')}</p>
          {credited.length > 0 && (
            <details className="mt-2 text-xs">
              <summary className="cursor-pointer py-3 hover:text-terracotta-deep">{t('Kredit foto', 'Photo credits')} ({credited.length})</summary>
              <ul className="mt-3 grid gap-x-6 gap-y-1 sm:grid-cols-2 lg:grid-cols-3">
                {credited.map((p) => (
                  <li key={p.id}>
                    <a href={p.source} target="_blank" rel="noreferrer" className="hover:text-terracotta-deep">{loc(p, 'alt')}</a> — {p.author},{' '}
                    {p.licenseUrl ? <a href={p.licenseUrl} target="_blank" rel="noreferrer" className="underline hover:text-terracotta-deep">{p.license}</a> : p.license}
                  </li>
                ))}
              </ul>
            </details>
          )}
        </div>
        <div className="flex shrink-0 flex-wrap items-center gap-x-6">
          <Link to="/kontak" className="inline-flex min-h-11 items-center hover:text-terracotta-deep">{t('Hubungi Kami', 'Contact Us')}</Link>
          <Link to="/koleksi" className="group inline-flex min-h-11 items-center gap-1.5 text-espresso hover:text-terracotta-deep">
            {t('Lihat Koleksi', 'View Collection')} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        </div>
      </div>

      {/* Foto penutup memanjang ke bawah; bagian atasnya memudar menyatu dengan latar footer. */}
      <div
        className="relative h-[14rem] overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,#000_45%)] sm:h-[18rem] lg:h-[20rem]"
        aria-hidden="true"
      >
        <motion.div
          className="h-full w-full"
          initial={{ scale: 1.12 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <Photo id="kain-parang" position="50% 60%" className="[filter:sepia(0.2)_saturate(0.9)_contrast(1.05)]" />
        </motion.div>
      </div>
    </footer>
  )
}
