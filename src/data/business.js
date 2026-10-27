// GANTI nilai di file ini dengan data resmi Perada Batik.
// Kolom yang dibiarkan kosong ('') otomatis disembunyikan atau dinonaktifkan di website,
// jadi tidak ada nomor, alamat, atau peta palsu yang tampil ke pelanggan.

export const business = {
  name: 'Perada Batik',
  tagline: 'Warisan Nusantara, keanggunan sepanjang masa.',
  description:
    'Perada Batik menghadirkan kain dan busana batik bermotif tradisional Nusantara dengan sentuhan estetika modern yang elegan.',
  en: {
    tagline: 'Indonesian heritage, timeless elegance.',
    description: 'Perada Batik offers batik fabrics and garments in traditional Indonesian motifs, with an elegant modern touch.',
  },
  whatsapp: '', // format internasional tanpa +, mis. '6281234567890'
  whatsappDisplay: '', // mis. '+62 812-3456-7890'
  email: '', // mis. 'halo@peradabatik.id'
  address: '', // isi setelah alamat toko terverifikasi
  hours: '', // mis. 'Senin–Sabtu, 09.00–17.00 WIB'
  mapEmbedUrl: '', // URL "Embed a map" dari Google Maps; peta hanya tampil bila diisi
  social: [
    // dari situs resmi peradabatik.com
    { label: 'Instagram', url: 'https://www.instagram.com/perada_batik/' },
    { label: 'Facebook', url: 'https://www.facebook.com/profile.php?id=100017800155887' },
    { label: 'TikTok', url: '' },
  ],
}
