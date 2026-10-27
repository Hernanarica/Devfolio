import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { PageBackground } from '@/components/PageBackground'
import { ScrollProgress } from '@/components/Motion'

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ScrollProgress />
      <PageBackground />
      <div className="relative flex w-full flex-col">
        <Header />
        <main className="flex-auto">{children}</main>
        <Footer />
      </div>
    </>
  )
}
