import React from 'react';
import Image from 'next/image';
import { VpnProduct } from '@prisma/client';

interface VpnProductCatalogProps {
  products: VpnProduct[];
}

export function VpnProductCatalog({ products }: VpnProductCatalogProps) {
  if (!products || products.length === 0) {
    return (
      <div className="py-24 text-center">
        <h3 className="text-2xl font-semibold mb-4 text-zinc-800 dark:text-zinc-200">No products available</h3>
        <p className="text-zinc-500 dark:text-zinc-400">Check back later for exciting new VPN offerings.</p>
      </div>
    );
  }

  const mainDomain = process.env.NEXT_PUBLIC_MAIN_DOMAIN || 'abcd.com';

  return (
    <section id="catalog" className="w-full py-24 bg-zinc-50 dark:bg-zinc-950">
      <div className="container max-w-[1280px] mx-auto px-4 md:px-6">
        <h2 className="text-4xl font-bold tracking-tight mb-12 text-center text-zinc-900 dark:text-zinc-50">
          Our VPN Portfolio
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => {
            const productUrl = `https://${product.subdomainSlug}.${mainDomain}`;

            return (
              <a
                key={product.id}
                href={productUrl}
                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl bg-white p-6 shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800"
              >
                {/* Glassmorphism gradient effect on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none"
                     style={{ background: product.primaryColor || '#ffffff' }}></div>

                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-6">
                    {product.logoUrl ? (
                      <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-zinc-100 dark:bg-zinc-800 p-2 shadow-sm flex-shrink-0">
                        <Image
                          src={product.logoUrl}
                          alt={`${product.name} logo`}
                          fill
                          className="object-contain p-1"
                        />
                      </div>
                    ) : (
                      <div className="w-16 h-16 rounded-xl bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center flex-shrink-0 text-2xl font-bold text-zinc-500">
                        {product.name.charAt(0)}
                      </div>
                    )}

                    {/* Star Rating */}
                    {product.appRating && (
                      <div className="flex items-center gap-1 bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded-full text-sm font-medium">
                        <span className="text-zinc-800 dark:text-zinc-200">{Number(product.appRating).toFixed(1)}</span>
                        <svg className="w-4 h-4 text-yellow-500 fill-current" viewBox="0 0 24 24">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                        </svg>
                      </div>
                    )}
                  </div>

                  <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">
                    {product.name}
                  </h3>

                  {product.shortDescription && (
                    <p className="text-zinc-600 dark:text-zinc-400 line-clamp-2 mb-6 text-sm">
                      {product.shortDescription}
                    </p>
                  )}

                  {/* Tags */}
                  {product.tags && Array.isArray(product.tags) && product.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-6">
                      {(product.tags as string[]).slice(0, 3).map((tag, i) => (
                        <span key={i} className="px-2.5 py-1 rounded-full text-xs font-medium bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="relative z-10 mt-auto pt-6">
                  <div
                    className="flex w-full items-center justify-center rounded-xl border-2 py-3 text-sm font-semibold transition-colors group-hover:text-white"
                    style={{
                      borderColor: product.primaryColor || '#18181b',
                      color: 'currentColor',
                      // We'll use CSS to handle hover state color
                    }}
                  >
                    View Product
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
