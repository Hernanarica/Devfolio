import { Layout } from '@/components/Layout'
import { SmoothScroll } from '@/components/SmoothScroll'

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SmoothScroll>
      <div className="flex w-full">
        <Layout>{children}</Layout>
      </div>
    </SmoothScroll>
  )
}
