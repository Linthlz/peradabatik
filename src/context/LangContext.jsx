import { createContext, useContext, useEffect, useMemo, useState } from 'react'

// Bahasa Indonesia adalah bahasa utama; English opsional dan diingat di browser.
const KEY = 'perada-lang'
const LangContext = createContext(null)

function initial() {
  try {
    return localStorage.getItem(KEY) === 'en' ? 'en' : 'id'
  } catch {
    return 'id'
  }
}

export function LangProvider({ children }) {
  const [lang, setLang] = useState(initial)

  useEffect(() => {
    document.documentElement.lang = lang
    try {
      localStorage.setItem(KEY, lang)
    } catch {
      /* penyimpanan diblokir: pilihan berlaku selama sesi */
    }
  }, [lang])

  const value = useMemo(
    () => ({
      lang,
      setLang,
      // t('teks Indonesia', 'English text') — teks Indonesia menjadi cadangan bila terjemahan kosong
      t: (id, en) => (lang === 'en' && en ? en : id),
      // loc(obj, 'field') — ambil obj.en.field saat English, selain itu obj.field
      loc: (obj, field) => (lang === 'en' && obj.en?.[field]) || obj[field],
    }),
    [lang]
  )
  return <LangContext.Provider value={value}>{children}</LangContext.Provider>
}

export const useLang = () => useContext(LangContext)
