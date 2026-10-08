// Exporta la ruta /cv a PDF con Chrome. Requiere el sitio corriendo
// (pnpm build && pnpm start, o pnpm dev). Uso: pnpm cv [url]
import { chromium } from 'playwright-core'

const url = process.argv[2] ?? 'http://localhost:3000/cv'
const output = new URL('../public/hernan-arica-cv.pdf', import.meta.url)

const browser = await chromium.launch({ channel: 'chrome' })
const page = await browser.newPage()
await page.emulateMedia({ media: 'print', colorScheme: 'light' })
await page.goto(url, { waitUntil: 'networkidle' })
await page.evaluate(() => document.fonts.ready)
await page.pdf({
  path: output.pathname,
  format: 'A4',
  printBackground: true,
  preferCSSPageSize: true,
  tagged: true,
  outline: true,
})
await browser.close()

console.log(`CV generado en ${output.pathname}`)
