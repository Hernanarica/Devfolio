import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { ScrollProgress } from '@/components/Motion'

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ScrollProgress />
      <div className="fixed inset-0 flex justify-center sm:px-8">
        <div className="flex w-full max-w-7xl lg:px-8">
          <div className="w-full bg-white ring-1 ring-zinc-100 dark:bg-zinc-900 dark:ring-zinc-300/20" />
        </div>
      </div>
      <div className="relative flex w-full flex-col">
        <Header />
        <main className="flex-auto">{children}</main>
        <Footer />
      </div>
      {/* Safari 26 tiñe sus barras con el background-color del elemento fijo
          que toca cada borde (opaco, de al menos 3px y casi todo el ancho; si
          tiene opacity lo ignora). En mobile le dan el color de la columna; en
          desktop no hacen falta: cae al body, que es el color de los costados */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-x-0 top-0 z-40 h-1 bg-white sm:hidden dark:bg-zinc-900"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-x-0 bottom-0 z-40 h-1 bg-white sm:hidden dark:bg-zinc-900"
      />
    </>
  )
}
