import { notFound } from 'next/navigation'
import { getVpnProductBySlug } from '@/lib/data/vpn-product'
import { Metadata } from 'next'

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
    <div className="flex flex-col min-h-screen">
      <header className="p-4 border-b">
        <h1 className="text-2xl font-bold">{product.name}</h1>
      </header>
      <main className="flex-1 p-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <section>
            <h2 className="text-xl font-semibold mb-4">Product Details</h2>
            <pre className="bg-gray-100 dark:bg-zinc-900 p-4 rounded-lg overflow-x-auto text-sm">
              {JSON.stringify(
                {
                  id: product.id,
                  name: product.name,
                  slug: product.subdomainSlug,
                  status: product.status,
                  featuresCount: product.features.length,
                  pricingPlansCount: product.pricingPlans.length,
                  screenshotsCount: product.screenshots.length,
                  testimonialsCount: product.testimonials.length,
                  primaryColor: product.primaryColor,
                  secondaryColor: product.secondaryColor,
                  fontFamily: product.fontFamily,
                },
                null,
                2
              )}
            </pre>
          </section>
        </div>
      </main>
    </div>
  )
}
