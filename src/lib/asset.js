// Path file di public/ mengikuti base deploy (akar domain atau subfolder seperti /peradabatik/).
export const asset = (path) => import.meta.env.BASE_URL.replace(/\/$/, '') + path

// Path router tanpa base, untuk navigate() yang sudah memakai basename.
export const routePath = (pathname) => {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '')
  return base && pathname.startsWith(base) ? pathname.slice(base.length) || '/' : pathname
}
