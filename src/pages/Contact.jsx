import { Clock, Mail, MapPin, MessageCircle, Share2 } from 'lucide-react'
import PageHeader from '../components/PageHeader.jsx'
import ContactForm from '../components/ContactForm.jsx'
import Reveal from '../components/Reveal.jsx'
import { business } from '../data/business.js'
import { waLink } from '../lib/utils.js'
import { useMeta } from '../lib/useMeta.js'
import { useLang } from '../context/LangContext.jsx'

export default function Contact() {
  const { t } = useLang()
  useMeta(
    t('Kontak', 'Contact'),
    t('Hubungi Perada Batik untuk pertanyaan produk, pemesanan, atau kerja sama.', 'Contact Perada Batik about products, orders, or partnerships.')
  )
  const socials = business.social.filter((s) => s.url)
  const wa = waLink(t('Halo Perada Batik, saya ingin bertanya.', 'Hello Perada Batik, I have a question.'))
  const items = [
    wa && { icon: MessageCircle, label: 'WhatsApp', value: business.whatsappDisplay || t('Chat sekarang', 'Chat now'), href: wa },
    business.email && { icon: Mail, label: 'Email', value: business.email, href: `mailto:${business.email}` },
    business.address && { icon: MapPin, label: t('Alamat', 'Address'), value: business.address },
    business.hours && { icon: Clock, label: t('Jam operasional', 'Opening hours'), value: business.hours },
  ].filter(Boolean)

  return (
    <>
      <PageHeader
        breadcrumb={[{ label: t('Kontak', 'Contact') }]}
        eyebrow={t('Hubungi Kami', 'Get in Touch')}
        title={t('Dengan senang hati kami membantu', "We'd be glad to help")}
        description={t(
          'Punya pertanyaan tentang motif, ukuran, atau pemesanan? Sampaikan kepada kami melalui kontak di bawah ini.',
          'Have a question about motifs, sizes, or orders? Reach us through the contacts below.'
        )}
      />

      <section className="container-page grid gap-14 py-16 sm:py-20 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <h2 className="text-3xl font-normal">{t('Informasi kontak', 'Contact information')}</h2>
          {items.length > 0 ? (
            <ul className="mt-8 space-y-6">
              {items.map(({ icon: Icon, label, value, href }) => (
                <li key={label} className="flex gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center border border-terracotta/40 text-terracotta-deep">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-espresso-soft">{label}</p>
                    {href ? (
                      <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noreferrer" className="mt-1 block break-all font-medium hover:text-terracotta-deep">
                        {value}
                      </a>
                    ) : (
                      <p className="mt-1 font-medium">{value}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-6 leading-relaxed text-espresso-soft">
              {t(
                'Informasi kontak resmi sedang kami siapkan. Sementara itu, silakan tinggalkan pesan melalui formulir.',
                'Our official contact details are being prepared. In the meantime, please leave a message using the form.'
              )}
            </p>
          )}

          {socials.length > 0 && (
            <div className="mt-10">
              <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-espresso-soft">
                <Share2 className="h-4 w-4" aria-hidden="true" /> {t('Media sosial', 'Social media')}
              </p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {socials.map((s) => (
                  <li key={s.label}>
                    <a href={s.url} target="_blank" rel="noreferrer" className="btn-outline min-h-10 px-4 py-2">{s.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {import.meta.env.DEV && items.length < 4 && (
            <p className="mt-8 border border-dashed border-terracotta p-4 text-xs text-espresso-soft">
              Catatan pengembang (tidak tampil di produksi): isi WhatsApp, email, alamat, jam operasional, media sosial,
              dan URL peta di <code>src/data/business.js</code>.
            </p>
          )}
        </Reveal>

        <Reveal className="border border-line bg-ivory-deep/40 p-6 sm:p-10 lg:col-span-7" delay={0.1}>
          <h2 className="text-3xl font-normal">{t('Kirim pesan', 'Send a message')}</h2>
          <p className="mt-2 mb-8 text-sm text-espresso-soft">{t('Kolom bertanda * wajib diisi.', 'Fields marked * are required.')}</p>
          <ContactForm />
        </Reveal>
      </section>

      {business.mapEmbedUrl && (
        <section className="container-page pb-20">
          <iframe
            title={t(`Peta lokasi ${business.name}`, `${business.name} location map`)}
            src={business.mapEmbedUrl}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-[24rem] w-full border border-line"
          />
        </section>
      )}
    </>
  )
}
