// Build lalu unggah ke branch gh-pages (GitHub Pages): npm run deploy
// Situs berada di subfolder https://<user>.github.io/peradabatik/, jadi base path disesuaikan.
import { execSync } from 'node:child_process'
import { copyFileSync, writeFileSync, rmSync } from 'node:fs'

const BASE_PATH = '/peradabatik/'
const run = (cmd, opts = {}) => execSync(cmd, { stdio: 'inherit', ...opts })

const remote = execSync('git remote get-url origin').toString().trim()
run('npx vite build', { env: { ...process.env, BASE_PATH } })
// GitHub Pages tidak punya SPA fallback: 404.html berisi aplikasi yang sama agar deep link & refresh tetap jalan
copyFileSync('dist/index.html', 'dist/404.html')
writeFileSync('dist/.nojekyll', '')
// file konfigurasi hosting lain tidak berguna di Pages
rmSync('dist/_redirects', { force: true })

run('git init -q -b gh-pages', { cwd: 'dist' })
run('git add -A', { cwd: 'dist' })
run('git commit -q -m "Deploy ke GitHub Pages"', { cwd: 'dist' })
run(`git push -f "${remote}" gh-pages`, { cwd: 'dist' })
rmSync('dist/.git', { recursive: true, force: true })
console.log('Selesai. Situs: https://linthlz.github.io/peradabatik/')
