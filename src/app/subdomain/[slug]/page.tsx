import { notFound } from 'next/navigation'
import { getVpnProductBySlug } from '@/lib/data/vpn-product'
import { Metadata } from 'next'
import { Hero } from './components/Hero'
import { ThemeProvider } from '@/components/ThemeProvider'
import { Screenshots } from './components/Screenshots'
import { Features } from './components/Features'
import { ServerLocations } from './components/ServerLocations'
import { Pricing } from './components/Pricing'
import { Footer } from './components/Footer'

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
      <div className="flex flex-col min-h-screen font-sans bg-background text-foreground">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-white focus:rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        >
          Skip to main content
        </a>
        <main id="main-content" className="flex-1 focus:outline-none" tabIndex={-1}>
          <Hero product={product} />
          {product.screenshots && product.screenshots.length > 0 && (
            <Screenshots screenshots={product.screenshots} />
          )}
          {product.features && product.features.length > 0 && (
            <Features features={product.features} />
          )}
          <ServerLocations serverCount={5000} countryCount={60} countries={[]} />
          {product.pricingPlans && product.pricingPlans.length > 0 && (
            <Pricing plans={product.pricingPlans.map(plan => ({
              ...plan,
              monthlyPrice: plan.monthlyPrice ? Number(plan.monthlyPrice) : null,
              yearlyPrice: plan.yearlyPrice ? Number(plan.yearlyPrice) : null,
            }))} />
          )}
        </main>
        <Footer productName={product.name} logoUrl={product.logoUrl} />
      </div>
    </ThemeProvider>
  )
}
