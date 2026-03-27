import { notFound } from 'next/navigation'
import { getVpnProductBySlug } from '@/lib/data/vpn-product'
import { Metadata } from 'next'
import { Hero } from './components/Hero'
import { ThemeProvider } from '@/components/ThemeProvider'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const product = await getVpnProductBySlug(slug)

  if (!product) {
    return {
      title: 'Not Found',
    }
  }

  return {
    title: product.metaTitle || product.name,
    description: product.metaDescription || product.shortDescription,
    icons: product.faviconUrl ? [{ rel: 'icon', url: product.faviconUrl }] : undefined,
  }
}

export default async function SubdomainPage({ params }: Props) {
  const { slug } = await params
  const product = await getVpnProductBySlug(slug)

  if (!product) {
    notFound()
  }

  return (
    <ThemeProvider
      primaryColor={product.primaryColor || undefined}
      secondaryColor={product.secondaryColor || undefined}
      fontFamily={product.fontFamily || undefined}
    >
      <div className="flex flex-col min-h-screen font-sans">
        <main className="flex-1">
          <Hero product={product} />
        </main>
      </div>
    </ThemeProvider>
  )
}
