import { business } from '../data/business.js'

export const formatRupiah = (n) => 'Rp ' + n.toLocaleString('id-ID')

// null bila nomor bisnis belum diatur, supaya tombol WhatsApp bisa dinonaktifkan dengan jujur.
export const waLink = (text) =>
  business.whatsapp ? `https://wa.me/${business.whatsapp}?text=${encodeURIComponent(text)}` : null

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Validasi sisi klien untuk formulir kontak; server tetap wajib memvalidasi ulang.
export function validateContact({ name = '', email = '', subject = '', message = '' }, lang = 'id') {
  const m = (id, en) => (lang === 'en' ? en : id)
  const e = {}
  if (name.trim().length < 2) e.name = m('Nama minimal 2 karakter.', 'Name must be at least 2 characters.')
  if (!EMAIL.test(email.trim())) e.email = m('Masukkan alamat email yang valid.', 'Please enter a valid email address.')
  if (subject.trim().length < 3) e.subject = m('Subjek minimal 3 karakter.', 'Subject must be at least 3 characters.')
  if (message.trim().length < 10) e.message = m('Pesan minimal 10 karakter.', 'Message must be at least 10 characters.')
  else if (message.length > 2000) e.message = m('Pesan maksimal 2000 karakter.', 'Message must be 2000 characters or fewer.')
  return e
}
