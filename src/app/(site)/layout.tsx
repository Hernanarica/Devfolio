import { Layout } from '@/components/Layout'

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex w-full">
      <Layout>{children}</Layout>
    </div>
  )
}
