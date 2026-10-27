import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, ArrowUpRight, Instagram } from 'lucide-react'
import Ornament from '../components/Ornament.jsx'
import Photo from '../components/Photo.jsx'
import Reveal from '../components/Reveal.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import ProductGrid from '../components/ProductGrid.jsx'
import { products } from '../data/products.js'
import { photos } from '../data/photos.js'
import { business } from '../data/business.js'
import { useMeta } from '../lib/useMeta.js'
import { useIntroDone } from '../components/Preloader.jsx'
import { useLang } from '../context/LangContext.jsx'

const ease = [0.22, 1, 0.36, 1]

// Gambar yang "dibuka" dari bawah saat masuk layar. Pembungkus luar yang diamati, bukan elemen ber-clip-path:
// Chrome menganggap elemen yang ter-clip penuh tidak terlihat, sehingga whileInView tidak pernah terpicu.
const reveal = { hidden: { clipPath: 'inset(100% 0% 0% 0%)' }, show: { clipPath: 'inset(0% 0% 0% 0%)' } }

function ImageReveal({ children, className = '', delay = 0 }) {
  return (
    <motion.div className={className} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }}>
      <motion.div variants={reveal} transition={{ duration: 1.1, delay, ease }} className="relative h-full w-full overflow-hidden">
        {children}
      </motion.div>
    </motion.div>
  )
}

// Parallax ringan: elemen bergeser `amount` px selama melintasi layar. Mati bila pengguna meminta reduced motion.
function useParallax(ref, amount) {
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  return useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [amount, -amount])
}

// Foto hero bergantian: [id foto, titik fokus]. Subjek berada di kanan / berupa tekstur agar tidak tertutup teks.
const slides = [
  ['tangan-canting', '65% 50%'],
  ['kain-parang', '50% 50%'],
  ['kain-mega-mendung', '50% 40%'],
]
const SLIDE_MS = 6500

function Hero() {
  const reduce = useReducedMotion()
  const ready = useIntroDone()
  const [active, setActive] = useState(0)
  const { lang, t, loc } = useLang()
  // [kata, indeks kata yang diberi aksen]
  const [words, accent] = lang === 'en' ? [['Indonesian', 'Heritage,', 'Timeless', 'Elegance.'], 2] : [['Warisan', 'Nusantara,', 'Keanggunan', 'Sepanjang', 'Masa.'], 2]

  useEffect(() => {
    if (reduce || !ready) return
    const t = setTimeout(() => setActive((n) => (n + 1) % slides.length), SLIDE_MS)
    return () => clearTimeout(t)
  }, [active, reduce, ready])

  const [id, position] = slides[active]
  return (
    <section className="relative flex min-h-svh items-center overflow-hidden bg-espresso text-ivory">
      <AnimatePresence initial={false}>
        <motion.div key={id} className="absolute inset-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1.6, ease: 'easeInOut' }}>
          <motion.div className="h-full w-full" initial={{ scale: 1.14 }} animate={{ scale: 1.02 }} transition={{ duration: SLIDE_MS / 1000 + 2, ease: 'linear' }}>
            <Photo id={id} position={position} eager={active === 0} />
          </motion.div>
        </motion.div>
      </AnimatePresence>
      <div className="absolute inset-0 bg-gradient-to-t from-espresso/85 via-espresso/50 to-espresso/40 lg:bg-gradient-to-r lg:from-espresso/90 lg:via-espresso/50 lg:to-espresso/5" aria-hidden="true" />
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-espresso/70 to-transparent" aria-hidden="true" />

      <div className="container-page relative pt-28 pb-32 sm:pt-32">
        <motion.p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber" initial={{ opacity: 0, x: -12 }} animate={ready ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7, ease }}>
          {t('Koleksi Batik Nusantara', 'Indonesian Batik Collection')}
        </motion.p>
        <h1 className="mt-6 max-w-3xl text-5xl font-light leading-[1.02] sm:text-7xl xl:text-8xl">
          {words.map((w, i) => (
            <span key={lang + w} className="mr-[0.22em] inline-block overflow-hidden pb-1 align-bottom">
              <motion.span
                className={`inline-block ${i === accent ? 'font-medium text-amber italic' : ''}`}
                initial={{ y: '110%' }}
                animate={ready ? { y: 0 } : {}}
                transition={{ duration: 0.9, delay: 0.2 + i * 0.09, ease }}
              >
                {w}
              </motion.span>
            </span>
          ))}
        </h1>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={ready ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.75, ease }}>
          <p className="mt-7 max-w-lg text-lg leading-relaxed text-ivory/85">
            {t(
              'Merayakan keindahan batik Indonesia melalui motif penuh makna, detail istimewa, dan keanggunan yang melampaui zaman.',
              'Celebrating the beauty of Indonesian batik through meaningful motifs, exquisite detail, and timeless elegance.'
            )}
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link to="/koleksi" className="btn-primary group">
              {t('Jelajahi Koleksi', 'Explore the Collection')} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Link>
            <Link to="/tentang-kami" className="btn-outline-light">{t('Kisah Perada', 'Our Story')}</Link>
          </div>
        </motion.div>
      </div>

      {/* indikator foto: klik untuk berpindah; garis terisi selama foto tampil */}
      <div className="absolute bottom-8 left-0 right-0">
        <div className="container-page">
          <ul className="flex gap-3" aria-label={t('Pilih foto latar', 'Choose background photo')}>
            {slides.map(([sid], i) => (
              <li key={sid}>
                <button type="button" onClick={() => setActive(i)} aria-label={`${t('Foto', 'Photo')} ${i + 1}: ${loc(photos[sid], 'alt')}`} aria-pressed={active === i} className="group flex h-11 items-center">
                  <span className="block h-0.5 w-10 overflow-hidden bg-ivory/30 sm:w-14">
                    {active === i && (
                      <motion.span
                        className="block h-full origin-left bg-amber"
                        initial={{ scaleX: reduce ? 1 : 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: SLIDE_MS / 1000, ease: 'linear' }}
                      />
                    )}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

function Tile({ to, photo, label, sub, className = '', position, delay }) {
  return (
    <ImageReveal className={className} delay={delay}>
      <Link to={to} className="group relative block h-full w-full overflow-hidden">
        <Photo id={photo} position={position} className="transition-transform duration-[1.4s] ease-out group-hover:scale-110 motion-reduce:group-hover:scale-100" />
        <div className="absolute inset-0 bg-gradient-to-t from-espresso/80 via-espresso/10 to-transparent transition-opacity duration-500 group-hover:from-espresso/90" />
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6 text-ivory sm:p-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-amber">{sub}</p>
            <p className="mt-2 font-display text-4xl font-light sm:text-5xl">{label}</p>
          </div>
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-ivory/50 transition-all duration-500 group-hover:rotate-45 group-hover:border-amber group-hover:bg-amber group-hover:text-espresso">
            <ArrowUpRight className="h-5 w-5" aria-hidden="true" />
          </span>
        </div>
      </Link>
    </ImageReveal>
  )
}

function EntryTiles() {
  const { t } = useLang()
  return (
    <section className="container-page py-20 sm:py-28">
      <div className="grid gap-4 sm:gap-6 md:grid-cols-2 md:grid-rows-[repeat(2,20rem)] lg:grid-rows-[repeat(2,25rem)]">
        <Tile to="/koleksi" photo="model-batik-2" label={t('Koleksi', 'Collection')} sub={t('Kain & busana', 'Fabrics & garments')} position="50% 25%" className="aspect-[4/5] md:row-span-2 md:aspect-auto" />
        <Tile to="/filosofi-batik" photo="kain-mega-mendung" label={t('Filosofi', 'Philosophy')} sub={t('Makna di balik motif', 'Meaning behind the motifs')} className="aspect-[16/10] md:aspect-auto" delay={0.12} />
        <Tile to="/tentang-kami" photo="pembatik-canting" label={t('Kisah Perada', 'Our Story')} sub={t('Tentang kami', 'About us')} className="aspect-[16/10] md:aspect-auto" delay={0.24} />
      </div>
    </section>
  )
}

function BrandIntro() {
  const ref = useRef(null)
  const y = useParallax(ref, 50)
  const { t } = useLang()
  return (
    <section ref={ref} className="border-y border-line bg-ivory-deep/50 py-20 sm:py-28">
      <div className="container-page grid items-center gap-14 lg:grid-cols-12">
        <div className="relative mb-10 lg:col-span-6 lg:mb-0">
          <ImageReveal className="aspect-[4/5] w-[72%]">
            <Photo id="potret-kain-sunda" position="50% 35%" />
          </ImageReveal>
          <motion.div style={{ y }} className="absolute right-0 bottom-[-8%] w-[52%]">
            <ImageReveal className="aspect-[4/3] border-[6px] border-ivory shadow-xl shadow-espresso/15" delay={0.2}>
              <Photo id="kain-sarung-lasem" />
            </ImageReveal>
          </motion.div>
        </div>
        <Reveal className="lg:col-span-5 lg:col-start-8" delay={0.1}>
          <p className="eyebrow">{t('Mengenal Perada', 'Meet Perada')}</p>
          <h2 className="mt-4 text-4xl font-light leading-tight sm:text-5xl">
            {t('Setiap helai kain adalah cerita yang layak dijaga.', 'Every piece of cloth is a story worth keeping.')}
          </h2>
          <Ornament className="mt-5 text-amber" />
          <p className="mt-6 leading-relaxed text-espresso-soft">
            {t(
              'Perada Batik menghadirkan kain dan busana batik bermotif tradisional Nusantara. Kami memilih motif yang sarat makna dan memadukannya dengan potongan yang relevan untuk keseharian maupun momen istimewa.',
              'Perada Batik offers batik fabrics and garments in traditional Indonesian motifs. We choose motifs rich in meaning and pair them with cuts suited to everyday life and special moments alike.'
            )}
          </p>
          <p className="mt-4 leading-relaxed text-espresso-soft">
            {t('Nama', 'The name')} <em>perada</em>{' '}
            {t(
              'diambil dari prada — lapisan keemasan pada kain — sebagai pengingat bahwa keindahan sejati hadir dari detail yang dirawat dengan sungguh-sungguh.',
              'comes from prada — the gilded layer on cloth — a reminder that true beauty lies in details cared for with devotion.'
            )}
          </p>
          <Link to="/tentang-kami" className="link-underline mt-8">
            {t('Mengenal Perada Batik', 'Get to Know Perada Batik')} <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </Reveal>
      </div>
    </section>
  )
}

function ShopTheLook() {
  const { t } = useLang()
  return (
    <section className="container-page py-20 sm:py-28">
      <SectionHeading
        eyebrow="Shop the Look"
        title={t('Pilihan dari Perada', "Perada's Picks")}
        description={t('Kain dan busana yang kami pilih untuk musim ini.', "Fabrics and garments we've chosen for this season.")}
      >
        <Link to="/koleksi" className="link-underline shrink-0">
          {t('Lihat Semua Koleksi', 'View the Full Collection')} <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </SectionHeading>
      <div className="mt-12">
        <ProductGrid products={products.filter((p) => p.featured).slice(0, 4)} columns="sm:grid-cols-2 lg:grid-cols-4" />
      </div>
    </section>
  )
}

// Bento lookbook: [id foto, kelas span (mobile 2 kolom / md 12 kolom), posisi fokus]
const lookbook = [
  ['manekin-kebaya-none', 'row-span-2 md:col-span-4 md:row-span-2', '50% 40%'],
  ['grup-kebaya-batik', 'col-span-2 md:col-span-5 md:row-span-1', '50% 45%'],
  ['model-batik-1', 'row-span-2 md:col-span-3 md:row-span-2', '50% 30%'],
  ['runway-solo', 'col-span-2 md:col-span-5 md:row-span-1', '50% 50%'],
  ['potret-pedagang', 'row-span-2 md:col-span-3 md:row-span-1', '50% 6%'],
  ['penari-batik', 'col-span-2 md:col-span-5 md:row-span-1', '50% 40%'],
  ['manekin-kebaya-encim', 'md:col-span-2', '50% 30%'],
  ['manekin-kebaya-kerancang', 'md:col-span-2', '50% 25%'],
]

function Lookbook() {
  const { t, loc } = useLang()
  return (
    <section id="lookbook" className="scroll-mt-24 bg-ivory-deep/40 pt-20 sm:pt-28">
      <div className="container-page">
        <SectionHeading
          eyebrow="Lookbook"
          title={t('Batik dalam keseharian dan perayaan', 'Batik in everyday life and celebration')}
          align="center"
          description={t(
            'Ragam cara mengenakan batik — dari kebaya dan kain panjang hingga panggung peragaan busana.',
            'The many ways to wear batik — from kebaya and long cloths to the fashion runway.'
          )}
        />
      </div>
      {/* kolase penuh selebar layar tanpa jarak antarfoto */}
      <ul className="mt-14 grid grid-flow-dense auto-rows-[15rem] grid-cols-2 sm:auto-rows-[20rem] md:grid-cols-12 md:auto-rows-[22rem] lg:auto-rows-[28rem]">
        {lookbook.map(([id, span, pos], i) => (
          <li key={id} className={span}>
            <ImageReveal className="group relative h-full" delay={(i % 4) * 0.08}>
              <Photo id={id} position={pos} className="transition-transform duration-[1.4s] ease-out group-hover:scale-105 motion-reduce:group-hover:scale-100" />
              <p className="absolute inset-x-0 bottom-0 translate-y-full bg-gradient-to-t from-espresso/85 to-transparent p-5 pt-12 text-sm text-ivory transition-transform duration-500 group-hover:translate-y-0 motion-reduce:translate-y-0">
                {loc(photos[id], 'alt')}
              </p>
            </ImageReveal>
          </li>
        ))}
      </ul>
    </section>
  )
}

// Kutipan yang "menyala" kata demi kata saat di-scroll.
function BrandStory() {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { lang, t } = useLang()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 80%', 'end 55%'] })
  const words = t(
    'Batik bukan sekadar pakaian, melainkan karya budaya yang membawa cerita, identitas, dan nilai estetika.',
    'Batik is more than clothing — it is a cultural work that carries stories, identity, and aesthetic value.'
  ).split(' ')
  const accentWord = lang === 'en' ? 'cultural' : 'budaya'
  return (
    <section ref={ref} className="relative overflow-hidden bg-ivory py-24 sm:py-36">
      <div className="container-page relative mx-auto max-w-5xl text-center">
        <Ornament className="mx-auto text-terracotta" />
        <p className="mt-10 font-display text-4xl leading-tight font-light sm:text-5xl lg:text-6xl">
          {words.map((w, i) => (
            <Word key={lang + i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} still={reduce} accent={w.startsWith(accentWord)}>
              {w}
            </Word>
          ))}
        </p>
        <Ornament className="mx-auto mt-10 text-terracotta" />
      </div>
    </section>
  )
}

function Word({ children, progress, range, still, accent }) {
  const opacity = useTransform(progress, range, [0.15, 1])
  return (
    <motion.span style={{ opacity: still ? 1 : opacity }} className={`mr-[0.25em] inline-block ${accent ? 'text-terracotta-deep italic' : ''}`}>
      {children}
    </motion.span>
  )
}

const feed = [
  ['kain-sekar-jagad', 'manekin-sarung', 'kain-peranakan', 'rak-kemeja', 'kain-bunga-seruni', 'kain-lerek-bunga'],
  ['kain-sarung-kopi', 'kain-tiga-negeri', 'kain-kawung', 'model-batik-1', 'kain-lasem-seri', 'kain-trusmi-flora'],
]

function FeedTile({ id, instagram }) {
  const { t, loc } = useLang()
  const alt = loc(photos[id], 'alt')
  const inner = (
    <>
      <Photo id={id} className="transition-transform duration-700 group-hover:scale-110 motion-reduce:group-hover:scale-100" />
      <span className="absolute inset-0 flex items-end bg-gradient-to-t from-espresso/75 to-transparent p-4 text-sm text-ivory opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        {instagram && <Instagram className="mr-2 h-4 w-4 shrink-0" aria-hidden="true" />}
        {alt}
      </span>
    </>
  )
  return (
    <li className="group relative aspect-square w-52 shrink-0 overflow-hidden sm:w-64 lg:w-80">
      {instagram ? (
        <a href={instagram} target="_blank" rel="noreferrer" className="block h-full" aria-label={`${alt} — ${t('buka Instagram Perada Batik', 'open Perada Batik on Instagram')}`}>
          {inner}
        </a>
      ) : (
        inner
      )}
    </li>
  )
}

// Dua baris foto yang terus bergeser berlawanan arah; berhenti saat disentuh kursor.
// Isi baris digandakan agar putarannya tanpa sambungan (salinan disembunyikan dari pembaca layar).
function FollowUs() {
  const instagram = business.social.find((s) => s.label === 'Instagram')?.url
  const { t } = useLang()
  return (
    <section className="overflow-hidden py-20 sm:py-28">
      <div className="container-page">
        <SectionHeading
          eyebrow={t('Ikuti Kami', 'Follow Us')}
          title="#PeradaBatik"
          align="center"
          description={t('Detail motif, warna, dan tekstur yang kami kagumi.', 'Motifs, colours, and textures we admire.')}
        />
      </div>
      <div className="mt-12 space-y-2 motion-reduce:overflow-x-auto">
        {feed.map((row, r) => (
          <div
            key={r}
            className={`flex w-max hover:[animation-play-state:paused] motion-reduce:animate-none ${r ? 'animate-marquee-reverse' : 'animate-marquee'}`}
          >
            {[false, true].map((copy) => (
              <ul key={String(copy)} className="flex shrink-0 gap-2 pr-2" aria-hidden={copy || undefined}>
                {row.map((id) => (
                  <FeedTile key={id} id={id} instagram={copy ? null : instagram} />
                ))}
              </ul>
            ))}
          </div>
        ))}
      </div>
    </section>
  )
}

export default function Home() {
  useMeta(null)
  return (
    <>
      <Hero />
      <EntryTiles />
      <BrandIntro />
      <ShopTheLook />
      <Lookbook />
      <BrandStory />
      <FollowUs />
    </>
  )
}
