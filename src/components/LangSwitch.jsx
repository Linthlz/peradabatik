import { Fragment } from 'react'
import { useLang } from '../context/LangContext.jsx'

const options = [
  ['id', 'Bahasa Indonesia'],
  ['en', 'English'],
]

export default function LangSwitch({ className = '' }) {
  const { lang, setLang } = useLang()
  return (
    <div role="group" aria-label="Bahasa / Language" className={`flex items-center text-[13px] tracking-wider ${className}`}>
      {options.map(([code, name], i) => (
        <Fragment key={code}>
          {i > 0 && <span className="opacity-40" aria-hidden="true">/</span>}
          <button
            type="button"
            lang={code}
            onClick={() => setLang(code)}
            aria-pressed={lang === code}
            aria-label={name}
            className={`flex h-11 min-w-8 items-center justify-center px-1 uppercase transition-opacity ${
              lang === code ? 'font-semibold' : 'opacity-55 hover:opacity-100'
            }`}
          >
            {code}
          </button>
        </Fragment>
      ))}
    </div>
  )
}
