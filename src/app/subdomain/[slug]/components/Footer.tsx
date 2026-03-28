import Link from 'next/link'
import Image from 'next/image'

interface FooterProps {
  productName: string
  logoUrl?: string | null
}

export function Footer({ productName, logoUrl }: FooterProps) {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-gray-400 py-12 md:py-16">
      <div className="container px-4 mx-auto max-w-[1280px]">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-8 border-b border-gray-800 pb-12 mb-8">
          <div className="flex flex-col items-center md:items-start space-y-4">
            {logoUrl && (
              <div className="relative w-32 h-10 mb-2">
                <Image
                  src={logoUrl}
                  alt={`${productName} logo`}
                  fill
                  className="object-contain object-left filter brightness-0 invert opacity-80"
                />
              </div>
            )}
            <h3 className="text-xl font-bold text-white tracking-tight">{productName}</h3>
            <p className="max-w-xs text-center md:text-left text-sm">
              Secure, fast, and reliable VPN service for all your devices.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 md:gap-16 text-sm">
            <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <ul className="space-y-3">
                <li><a href="#features" className="hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm">Features</a></li>
                <li><a href="#pricing" className="hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm">Pricing</a></li>
                <li><a href="#servers" className="hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm">Servers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Legal</h4>
              <ul className="space-y-3">
                <li>
                  <Link href="privacy-policy" className="hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="terms" className="hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm">
                    Terms & Conditions
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
          <p className="text-center md:text-left">© {currentYear} {productName}. All rights reserved.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="#" className="hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm" aria-label={`${productName} Twitter`}>Twitter</a>
            <a href="#" className="hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm" aria-label={`${productName} Facebook`}>Facebook</a>
            <a href="#" className="hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm" aria-label={`${productName} Instagram`}>Instagram</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
