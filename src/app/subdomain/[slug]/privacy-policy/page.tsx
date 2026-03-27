import { notFound } from 'next/navigation'
import { getVpnProductBySlug } from '@/lib/data/vpn-product'
import { ThemeProvider } from '@/components/ThemeProvider'
import { Footer } from '../components/Footer'
import Link from 'next/link'

type Props = {
  params: Promise<{ slug: string }>
}

export default async function PrivacyPolicyPage({ params }: Props) {
  const { slug } = await params
  const product = await getVpnProductBySlug(slug)

  if (!product || !product.legal || product.legal.length === 0) {
    notFound()
  }

  const legalContent = product.legal[0]

  return (
    <ThemeProvider
      primaryColor={product.primaryColor || undefined}
      secondaryColor={product.secondaryColor || undefined}
      fontFamily={product.fontFamily || undefined}
    >
      <div className="flex flex-col min-h-screen font-sans bg-background text-foreground">
        <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
          <div className="container px-4 mx-auto max-w-[1280px] h-16 flex items-center justify-between">
            <Link href={`/subdomain/${slug}`} className="font-bold text-xl text-primary flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Home
            </Link>
          </div>
        </header>

        <main className="flex-1 container px-4 mx-auto max-w-[800px] py-16 md:py-24">
          <h1 className="text-4xl md:text-5xl font-bold mb-8 text-gray-900 dark:text-white">Privacy Policy</h1>
          <div className="text-sm text-gray-500 mb-12 pb-8 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center">
            <span>Effective Date: {legalContent.effectiveDate?.toLocaleDateString() || 'Not specified'}</span>
            {legalContent.contactEmail && (
              <a href={`mailto:${legalContent.contactEmail}`} className="text-primary hover:underline">
                Contact: {legalContent.contactEmail}
              </a>
            )}
          </div>

          <div
            className="prose prose-lg dark:prose-invert max-w-none prose-a:text-primary prose-headings:font-bold prose-h2:mt-12"
            dangerouslySetInnerHTML={{ __html: legalContent.privacyPolicyHtml || 'No content provided.' }}
          />
        </main>

        <Footer productName={product.name} logoUrl={product.logoUrl} />
      </div>
    </ThemeProvider>
  )
}
