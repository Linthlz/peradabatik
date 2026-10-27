import { Award, Feather, Landmark, ShieldCheck } from 'lucide-react'
import Breadcrumb from '../components/Breadcrumb.jsx'
import Photo from '../components/Photo.jsx'
import Ornament from '../components/Ornament.jsx'
import Reveal from '../components/Reveal.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import CTASection from '../components/CTASection.jsx'
import { photos } from '../data/photos.js'
import { useMeta } from '../lib/useMeta.js'
import { useLang } from '../context/LangContext.jsx'

// GANTI: semua teks di bawah ini adalah konten contoh. Sesuaikan dengan sejarah, proses, dan fakta bisnis
// Perada Batik yang sebenarnya. Jangan menambahkan tahun berdiri, sertifikasi, atau klaim "100% handmade"
// sebelum terkonfirmasi.
// Setiap teks: [Indonesia, English]
const story = [
  [
    'Perada Batik lahir dari kecintaan pada kain-kain Nusantara dan keinginan untuk menghadirkannya kembali dalam keseharian masa kini.',
    'Perada Batik was born from a love of Indonesian textiles and a wish to bring them back into everyday life today.',
  ],
  [
    'Kami percaya batik bukan benda masa lalu. Ia terus hidup setiap kali dikenakan, dirawat, dan diceritakan ulang. Dari keyakinan itulah setiap koleksi Perada disusun.',
    'We believe batik is not a thing of the past. It lives on every time it is worn, cared for, and retold. Every Perada collection is built on that belief.',
  ],
]

const mission = [
  ['Menghadirkan koleksi batik bermotif tradisional dengan kualitas yang terjaga.', 'To offer batik collections in traditional motifs with consistent quality.'],
  ['Menyertakan cerita dan makna motif agar pelanggan mengenal apa yang mereka kenakan.', 'To share the story and meaning of each motif so customers know what they wear.'],
  ['Memberikan informasi produk yang jujur dan jelas, termasuk bahan dan teknik pembuatannya.', 'To give honest, clear product information, including materials and techniques.'],
]

const values = [
  { icon: Award, title: ['Kualitas', 'Quality'], text: ['Setiap produk diperiksa sebelum sampai ke tangan Anda.', 'Every product is checked before it reaches you.'] },
  { icon: ShieldCheck, title: ['Keaslian', 'Authenticity'], text: ['Informasi bahan dan teknik kami sampaikan apa adanya.', 'We describe materials and techniques exactly as they are.'] },
  { icon: Landmark, title: ['Budaya', 'Culture'], text: ['Motif dihadirkan bersama cerita dan daerah asalnya.', 'Motifs are presented with their stories and places of origin.'] },
  { icon: Feather, title: ['Estetika', 'Aesthetics'], text: ['Keanggunan klasik yang tetap relevan untuk masa kini.', 'Classic elegance that stays relevant today.'] },
]

// Foto kegiatan Perada (data/photos.js). Tambahkan id foto baru di sini untuk memperbanyak galeri.
const activities = [
  'kegiatan-membatik',
  'kegiatan-display',
  'model-perada-1',
  'kegiatan-pertemuan',
  'kegiatan-rak',
  'kegiatan-detail',
  'kegiatan-tamu',
  'model-perada-2',
]

const process = [
  { title: ['Kurasi motif', 'Motif curation'], text: ['Memilih motif berdasarkan keindahan, makna, dan kecocokannya dengan koleksi.', 'Choosing motifs for their beauty, meaning, and fit with the collection.'] },
  { title: ['Pemilihan kain', 'Fabric selection'], text: ['Menentukan bahan yang nyaman dan menampilkan warna motif dengan baik.', 'Selecting comfortable fabrics that show the motif colours well.'] },
  { title: ['Pemeriksaan kualitas', 'Quality check'], text: ['Memeriksa warna, motif, dan jahitan sebelum produk dipajang.', 'Checking colour, motif, and stitching before a product is displayed.'] },
  { title: ['Pengemasan', 'Packaging'], text: ['Mengemas dengan rapi agar kain tiba dalam kondisi terbaik.', 'Packing carefully so every piece arrives in the best condition.'] },
]

export default function About() {
  const { t, loc } = useLang()
  useMeta(
    t('Tentang Kami', 'About Us'),
    t('Kenali Perada Batik: visi, misi, dan nilai yang kami jaga dalam menghadirkan batik Nusantara.', 'Get to know Perada Batik: the vision, mission, and values behind our Indonesian batik.')
  )
  return (
    <>
      <section className="relative overflow-hidden bg-espresso text-ivory">
        <div className="absolute inset-0">
          <Photo id="kegiatan-workshop" eager position="50% 40%" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-espresso via-espresso/75 to-espresso/20" aria-hidden="true" />
        <div className="container-page relative pt-38 pb-20 sm:pt-46 sm:pb-28 lg:pt-54 lg:pb-36">
          <Breadcrumb items={[{ label: t('Tentang Kami', 'About Us') }]} light />
          <p className="mt-10 text-xs font-semibold uppercase tracking-[0.22em] text-amber">{t('Kisah Perada', 'Our Story')}</p>
          <h1 className="mt-4 max-w-3xl text-5xl font-light leading-[1.05] sm:text-6xl lg:text-7xl">{t('Merawat cerita di setiap helai kain', 'Caring for the story in every piece of cloth')}</h1>
          <Ornament className="mt-6 text-amber" />
        </div>
      </section>

      <section className="container-page grid gap-12 py-20 sm:py-28 md:grid-cols-12">
        <Reveal className="md:col-span-5">
          <p className="eyebrow">{t('Latar Belakang', 'Background')}</p>
          <h2 className="mt-4 text-4xl font-light leading-tight sm:text-5xl">{t('Berawal dari kecintaan pada kain Nusantara', 'It began with a love of Indonesian textiles')}</h2>
        </Reveal>
        <Reveal className="space-y-5 text-lg leading-relaxed text-espresso-soft md:col-span-6 md:col-start-7" delay={0.1}>
          {story.map((p) => <p key={p[0]}>{t(...p)}</p>)}
        </Reveal>
      </section>

      <section className="pb-20 sm:pb-28">
        <div className="container-page">
          <SectionHeading
            eyebrow={t('Kegiatan Perada', 'Life at Perada')}
            title={t('Dari ruang produksi hingga ruang pamer', 'From the workshop to the showroom')}
            description={t('Sekilas aktivitas sehari-hari di Perada Batik — membatik, menata koleksi, dan menyambut tamu.', 'A glimpse of daily life at Perada Batik — making batik, arranging the collection, and welcoming guests.')}
          />
        </div>
        {/* grid simetris: semua foto berasio sama, keterangan berada di dalam foto */}
        <ul className="mt-12 grid grid-cols-2 gap-3 px-3 sm:gap-4 sm:px-4 lg:grid-cols-4">
          {activities.map((id, i) => (
            <Reveal as="li" key={id} delay={(i % 4) * 0.08}>
              <figure className="group relative aspect-[4/5] overflow-hidden">
                <Photo id={id} className="transition-transform duration-[1.2s] ease-out group-hover:scale-105 motion-reduce:group-hover:scale-100" />
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-espresso/90 via-espresso/50 to-transparent px-4 pt-16 pb-4 text-sm leading-snug text-ivory sm:px-5 sm:pb-5 sm:text-base">
                  {loc(photos[id], 'alt')}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </ul>
      </section>

      <section className="border-y border-line bg-ivory-deep/50 py-20 sm:py-28">
        <div className="container-page grid gap-12 lg:grid-cols-2">
          <Reveal className="border border-line bg-ivory p-8 sm:p-12">
            <p className="eyebrow">{t('Visi', 'Vision')}</p>
            <p className="mt-5 font-display text-3xl leading-snug sm:text-4xl">
              {t(
                'Menjadi rumah batik yang menghadirkan warisan Nusantara dengan keanggunan yang relevan sepanjang masa.',
                'To be a home of batik that brings Indonesian heritage forward with timeless, relevant elegance.'
              )}
            </p>
          </Reveal>
          <Reveal className="border border-line bg-ivory p-8 sm:p-12" delay={0.1}>
            <p className="eyebrow">{t('Misi', 'Mission')}</p>
            <ol className="mt-5 space-y-5">
              {mission.map((m, i) => (
                <li key={m[0]} className="flex gap-4">
                  <span className="font-display text-3xl leading-none text-terracotta">{String(i + 1).padStart(2, '0')}</span>
                  <span className="leading-relaxed text-espresso-soft">{t(...m)}</span>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>

      <section className="container-page py-20 sm:py-28">
        <SectionHeading eyebrow={t('Nilai Utama', 'Core Values')} title={t('Yang kami jaga', 'What we uphold')} align="center" />
        <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map(({ icon: Icon, title, text }, i) => (
            <Reveal as="li" key={title[0]} delay={i * 0.06} className="border-t-2 border-amber pt-6">
              <Icon className="h-7 w-7 text-terracotta-deep" aria-hidden="true" />
              <h3 className="mt-4 text-2xl font-normal">{t(...title)}</h3>
              <p className="mt-2 text-sm leading-relaxed text-espresso-soft">{t(...text)}</p>
            </Reveal>
          ))}
        </ul>
      </section>

      <section className="pb-20 sm:pb-28">
        <div className="container-page grid gap-12 lg:grid-cols-12 lg:items-start">
          <Reveal className="lg:col-span-5">
            <div className="aspect-[4/5] overflow-hidden border border-line">
              <Photo id="kegiatan-showroom" />
            </div>
          </Reveal>
          <div className="lg:col-span-6 lg:col-start-7">
            <SectionHeading eyebrow={t('Proses Kami', 'Our Process')} title={t('Dari kurasi hingga ke tangan Anda', 'From curation to your hands')} />
            <ol className="mt-10 space-y-8 border-l border-line pl-8">
              {process.map((s, i) => (
                <Reveal as="li" key={s.title[0]} delay={i * 0.06} className="relative">
                  <span className="absolute top-1 -left-[2.55rem] flex h-5 w-5 items-center justify-center rounded-full border border-terracotta bg-ivory text-[10px] font-semibold text-terracotta-deep">
                    {i + 1}
                  </span>
                  <h3 className="text-2xl font-normal">{t(...s.title)}</h3>
                  <p className="mt-1 leading-relaxed text-espresso-soft">{t(...s.text)}</p>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-ivory-deep/50 py-20 sm:py-28">
        <Reveal className="container-page mx-auto max-w-3xl text-center">
          <p className="eyebrow">{t('Komitmen Kami', 'Our Commitment')}</p>
          <h2 className="mt-4 text-4xl font-light leading-tight sm:text-5xl">{t('Ikut menjaga warisan agar tetap hidup', 'Helping heritage stay alive')}</h2>
          <Ornament className="mx-auto mt-5 text-amber" />
          <p className="mt-6 text-lg leading-relaxed text-espresso-soft">
            {t(
              'Kami berkomitmen menyampaikan makna motif dengan hati-hati, menghormati keberagaman tradisi batik di setiap daerah, dan mengajak lebih banyak orang untuk mengenakan serta merawat batik dengan bangga.',
              'We are committed to sharing the meaning of motifs with care, respecting the diversity of batik traditions across regions, and inviting more people to wear and care for batik with pride.'
            )}
          </p>
        </Reveal>
      </section>

      <CTASection />
    </>
  )
}
