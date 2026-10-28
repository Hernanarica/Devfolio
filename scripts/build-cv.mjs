// Exporta la ruta /cv a PDF con Chrome. Requiere el sitio corriendo
// (vp run build && pnpm preview, o pnpm dev). Uso: pnpm cv [url]
import { writeFile } from 'node:fs/promises'
import { chromium } from 'playwright-core'

const url = process.argv[2] ?? 'http://localhost:4321/cv'
const output = new URL('../public/hernan-arica-cv.pdf', import.meta.url)

function pageCount(pdf) {
  return pdf.toString('latin1').match(/\/Type\s*\/Page[^s]/g)?.length ?? 0
}

const browser = await chromium.launch({ channel: 'chrome' })
const page = await browser.newPage()
await page.emulateMedia({ media: 'print', colorScheme: 'light' })
await page.goto(url, { waitUntil: 'networkidle' })
await page.evaluate(() => document.fonts.ready)

// El CV tiene que entrar en una sola hoja: si no entra a escala 1 se achica
// de a poco hasta que entre
let scale = 1
let pdf
while (true) {
  pdf = await page.pdf({
    format: 'A4',
    printBackground: true,
    preferCSSPageSize: true,
    tagged: true,
    outline: true,
    scale,
  })
  if (pageCount(pdf) <= 1 || scale <= 0.5) break
  scale = Math.round((scale - 0.02) * 100) / 100
}
await browser.close()

await writeFile(output, pdf)
console.log(
  `CV generado en ${output.pathname} (${pageCount(pdf)} página, escala ${scale})`,
)
