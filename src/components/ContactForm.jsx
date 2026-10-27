import { useState } from 'react'
import { AlertCircle, CheckCircle2, Info, Loader2, Send } from 'lucide-react'
import { business } from '../data/business.js'
import { validateContact } from '../lib/utils.js'
import { useLang } from '../context/LangContext.jsx'

// Isi VITE_CONTACT_ENDPOINT di .env (mis. URL Formspree) agar formulir benar-benar mengirim.
// Endpoint menerima POST JSON { name, email, subject, message } dan membalas status 2xx bila berhasil.
const endpoint = import.meta.env.VITE_CONTACT_ENDPOINT || ''

const fields = [
  { name: 'name', label: ['Nama lengkap', 'Full name'], type: 'text', autoComplete: 'name' },
  { name: 'email', label: ['Email', 'Email'], type: 'email', autoComplete: 'email' },
  { name: 'subject', label: ['Subjek', 'Subject'], type: 'text' },
]

export default function ContactForm() {
  const [values, setValues] = useState({ name: '', email: '', subject: '', message: '' })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | success | error | unconfigured
  const { lang, t } = useLang()

  const update = (e) => {
    const next = { ...values, [e.target.name]: e.target.value }
    setValues(next)
    if (errors[e.target.name]) setErrors(validateContact(next, lang))
  }

  const submit = async (e) => {
    e.preventDefault()
    const errs = validateContact(values, lang)
    setErrors(errs)
    if (Object.keys(errs).length) {
      e.currentTarget.querySelector(`[name="${Object.keys(errs)[0]}"]`)?.focus()
      return
    }
    if (!endpoint) return setStatus('unconfigured')
    setStatus('sending')
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(values),
      })
      if (!res.ok) throw new Error(res.status)
      setStatus('success')
      setValues({ name: '', email: '', subject: '', message: '' })
    } catch {
      setStatus('error') // isi formulir tetap disimpan agar bisa dikirim ulang
    }
  }

  const mailto =
    business.email &&
    `mailto:${business.email}?subject=${encodeURIComponent(values.subject)}&body=${encodeURIComponent(`${values.message}\n\n${values.name}\n${values.email}`)}`

  const field = (f, input) => (
    <div key={f.name}>
      <label htmlFor={`c-${f.name}`} className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.16em] text-espresso-soft">
        {t(...f.label)} <span className="text-terracotta-deep" aria-hidden="true">*</span>
      </label>
      {input}
      {errors[f.name] && (
        <p id={`c-${f.name}-err`} className="mt-1.5 text-sm text-terracotta-dark">{errors[f.name]}</p>
      )}
    </div>
  )
  const aria = (name) => ({
    id: `c-${name}`,
    name,
    value: values[name],
    onChange: update,
    required: true,
    'aria-invalid': !!errors[name],
    'aria-describedby': errors[name] ? `c-${name}-err` : undefined,
  })

  return (
    <form onSubmit={submit} noValidate className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        {fields.slice(0, 2).map((f) => field(f, <input type={f.type} autoComplete={f.autoComplete} className="input" {...aria(f.name)} />))}
      </div>
      {field(fields[2], <input type="text" className="input" {...aria('subject')} />)}
      {field({ name: 'message', label: ['Pesan', 'Message'] }, <textarea rows={6} maxLength={2000} className="input resize-y" {...aria('message')} />)}

      <button type="submit" disabled={status === 'sending'} className="btn-primary w-full sm:w-auto">
        {status === 'sending' ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : <Send className="h-4 w-4" aria-hidden="true" />}
        {status === 'sending' ? t('Mengirim…', 'Sending…') : t('Kirim Pesan', 'Send Message')}
      </button>

      <div aria-live="polite">
        {status === 'success' && (
          <p className="flex gap-3 border border-[#3f6b3a]/40 bg-[#3f6b3a]/10 p-4 text-sm">
            <CheckCircle2 className="h-5 w-5 shrink-0 text-[#3f6b3a]" aria-hidden="true" />
            {t('Terima kasih, pesan Anda sudah kami terima. Kami akan membalas melalui email.', 'Thank you, we have received your message. We will reply by email.')}
          </p>
        )}
        {status === 'error' && (
          <p className="flex gap-3 border border-terracotta/40 bg-terracotta/10 p-4 text-sm">
            <AlertCircle className="h-5 w-5 shrink-0 text-terracotta-dark" aria-hidden="true" />
            {t('Pesan gagal terkirim. Periksa koneksi Anda lalu coba lagi', 'Your message could not be sent. Check your connection and try again')}
            {business.email ? t(', atau kirim langsung lewat email.', ', or send it directly by email.') : '.'}
          </p>
        )}
        {status === 'unconfigured' && (
          <div className="flex gap-3 border border-amber bg-amber/15 p-4 text-sm">
            <Info className="h-5 w-5 shrink-0 text-terracotta-dark" aria-hidden="true" />
            <div>
              <p>
                {t('Formulir online belum terhubung ke server, jadi pesan Anda', 'The online form is not connected to a server yet, so your message has')}{' '}
                <strong>{t('belum terkirim', 'not been sent')}</strong>.
              </p>
              {mailto && (
                <a href={mailto} className="link-underline mt-3">{t('Kirim pesan ini lewat aplikasi email', 'Send this message with your email app')}</a>
              )}
            </div>
          </div>
        )}
      </div>
    </form>
  )
}
