import { Link } from 'react-router-dom'
import { ArrowRight, MapPin } from 'lucide-react'
import Motif from '../components/Motif.jsx'
import Ornament from '../components/Ornament.jsx'
import PageHeader from '../components/PageHeader.jsx'
import Reveal from '../components/Reveal.jsx'
import CTASection from '../components/CTASection.jsx'
import { motifs } from '../data/motifs.js'
import { products } from '../data/products.js'
import { useMeta } from '../lib/useMeta.js'
import { useLang } from '../context/LangContext.jsx'

function MotifExhibit({ motif: m, index }) {
  const related = products.filter((p) => p.motif === m.id)
  const { t, loc } = useLang()
  const flip = index % 2 === 1
  return (
    <Reveal as="article" className="grid scroll-mt-28 items-center gap-8 md:grid-cols-12 md:gap-12" id={m.id}>
      <figure className={`md:col-span-5 ${flip ? 'md:order-2 md:col-start-8' : ''}`}>
        <div className="border border-line bg-ivory p-3">
          <div className="aspect-square overflow-hidden">
            <Motif motif={m.id} colors={m.palette} scale={1.8} className="h-full w-full" title={t(`Detail motif ${m.name}`, `${m.name} motif detail`)} />
          </div>
        </div>
        <figcaption className="mt-3 text-xs uppercase tracking-[0.18em] text-espresso-soft">
          No. {String(index + 1).padStart(2, '0')} — {loc(m, 'summary')}
        </figcaption>
      </figure>
      <div className={`md:col-span-6 ${flip ? 'md:order-1' : 'md:col-start-7'}`}>
        <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-terracotta-deep">
          <MapPin className="h-3.5 w-3.5" aria-hidden="true" /> {loc(m, 'origin')}
        </p>
        <h2 className="mt-3 text-4xl font-light sm:text-5xl">{m.name}</h2>
        <Ornament className="mt-4 text-amber" />
        <p className="mt-5 leading-relaxed text-espresso-soft">{loc(m, 'meaning')}</p>
        {related.length > 0 && (
          <div className="mt-6">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-espresso-soft">{t('Di koleksi kami', 'In our collection')}</p>
            <ul className="mt-2 flex flex-wrap gap-2">
              {related.map((p) => (
                <li key={p.slug}>
                  <Link to={`/koleksi/${p.slug}`} className="inline-flex min-h-10 items-center border border-line px-3 text-sm hover:border-terracotta hover:text-terracotta-deep">
                    {loc(p, 'name')}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
        <Link to={`/koleksi?motif=${m.id}`} className="link-underline mt-6">
          {t(`Lihat koleksi motif ${m.name}`, `View ${m.name} pieces`)} <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </Reveal>
  )
}

export default function Philosophy() {
  const { t } = useLang()
  useMeta(
    t('Filosofi Batik', 'Batik Philosophy'),
    t(
      'Mengenal makna dan asal-usul motif batik Nusantara: parang, kawung, truntum, mega mendung, jlamprang, sekar jagad, dan buketan.',
      'The meaning and origins of Indonesian batik motifs: parang, kawung, truntum, mega mendung, jlamprang, sekar jagad, and buketan.'
    )
  )
  return (
    <>
      <PageHeader
        breadcrumb={[{ label: t('Filosofi Batik', 'Batik Philosophy') }]}
        eyebrow={t('Warisan Nusantara', 'Indonesian Heritage')}
        title={t('Filosofi dan makna di balik motif', 'The philosophy and meaning behind the motifs')}
        description={t(
          'Batik adalah bahasa visual yang tumbuh berbeda di setiap daerah. Inilah sebagian motif yang hadir dalam koleksi kami, beserta tafsiran yang umum dikenal.',
          'Batik is a visual language that grew differently in every region. Here are some of the motifs in our collection, with their commonly known interpretations.'
        )}
      />

      <section className="container-page grid gap-10 py-16 sm:py-20 md:grid-cols-2">
        <Reveal>
          <p className="font-display text-3xl leading-snug sm:text-4xl">
            “{t(
              'Motif batik tidak lahir dari satu tradisi. Ia tumbuh dari keraton, pesisir, dan pertemuan budaya.',
              'Batik motifs were not born from a single tradition. They grew from royal courts, coastal towns, and cultural encounters.'
            )}”
          </p>
        </Reveal>
        <Reveal className="space-y-4 leading-relaxed text-espresso-soft" delay={0.1}>
          <p>
            {t(
              'Batik keraton di Yogyakarta dan Surakarta dikenal dengan warna soga, nila, dan putih serta aturan pemakaian tertentu. Batik pesisiran seperti Pekalongan dan Cirebon tumbuh lebih bebas, menyerap pengaruh Tiongkok, India, Arab, dan Eropa.',
              'Court batik from Yogyakarta and Surakarta is known for soga brown, indigo, and white, along with rules on who may wear what. Coastal batik from places like Pekalongan and Cirebon grew more freely, absorbing Chinese, Indian, Arab, and European influences.'
            )}
          </p>
          <p>
            {t(
              'Karena itu, makna sebuah motif bisa berbeda antardaerah dan antarsumber. Penjelasan di halaman ini merangkum tafsiran yang umum dikutip, bukan satu-satunya kebenaran.',
              'That is why a motif’s meaning can differ between regions and sources. This page summarises commonly cited interpretations, not a single truth.'
            )}
          </p>
        </Reveal>
      </section>

      <nav aria-label={t('Daftar motif', 'Motif list')} className="container-page">
        <ul className="flex flex-wrap gap-2 border-y border-line py-5">
          {motifs.map((m) => (
            <li key={m.id}>
              <a href={`#${m.id}`} className="inline-flex min-h-10 items-center px-3 text-sm font-medium hover:text-terracotta-deep">{m.name}</a>
            </li>
          ))}
        </ul>
      </nav>

      <section className="container-page space-y-24 py-16 sm:space-y-32 sm:py-24">
        {motifs.map((m, i) => (
          <MotifExhibit key={m.id} motif={m} index={i} />
        ))}
      </section>

      <aside className="container-page pb-20">
        <p className="border-l-2 border-amber bg-ivory-deep/60 p-5 text-sm leading-relaxed text-espresso-soft">
          <strong className="text-espresso">{t('Catatan:', 'Note:')}</strong>{' '}
          {t(
            'Ringkasan makna disusun dari tafsiran yang lazim dalam literatur dan tradisi lisan batik. Bila Anda memiliki sumber atau cerita dari daerah asal motif, kami senang mendengarnya melalui halaman',
            'These summaries draw on interpretations common in batik literature and oral tradition. If you have a source or story from a motif’s home region, we would love to hear it via our'
          )}{' '}
          <Link to="/kontak" className="font-semibold text-terracotta-deep underline">{t('Kontak', 'Contact')}</Link>
          {t('.', ' page.')}
        </p>
      </aside>

      <CTASection title={t('Kenakan motif yang bermakna bagi Anda', 'Wear a motif that means something to you')} />
    </>
  )
}
