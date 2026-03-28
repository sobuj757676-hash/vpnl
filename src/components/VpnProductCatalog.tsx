"use client";

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { VpnProduct } from '@prisma/client';
import { motion, AnimatePresence } from 'framer-motion';

interface VpnProductCatalogProps {
  products: VpnProduct[];
}

export function VpnProductCatalog({ products }: VpnProductCatalogProps) {
  const [activeFilter, setActiveFilter] = useState<string>('All');

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    products.forEach((product) => {
      if (Array.isArray(product.tags)) {
        product.tags.forEach((tag) => tags.add(String(tag)));
      }
    });
    return ['All', ...Array.from(tags)];
  }, [products]);

  const filteredProducts = useMemo(() => {
    if (activeFilter === 'All') return products;
    return products.filter((product) => {
      if (!Array.isArray(product.tags)) return false;
      return product.tags.some((tag) => String(tag) === activeFilter);
    });
  }, [products, activeFilter]);

  if (!products || products.length === 0) {
    return (
      <div className="py-24 text-center">
        <div className="max-w-md mx-auto">
          <svg className="mx-auto h-24 w-24 text-zinc-300 dark:text-zinc-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
          <h3 className="mt-4 text-2xl font-semibold mb-4 text-zinc-800 dark:text-zinc-200">No VPN Products Found</h3>
          <p className="text-zinc-500 dark:text-zinc-400">Check back later for exciting new VPN offerings.</p>
        </div>
      </div>
    );
  }

  const mainDomain = process.env.NEXT_PUBLIC_MAIN_DOMAIN || 'abcd.com';

  return (
    <section id="catalog" className="w-full py-24 bg-zinc-50 dark:bg-zinc-950">
      <div className="container max-w-[1280px] mx-auto px-4 md:px-6">
        <h2 className="text-4xl font-bold tracking-tight mb-8 text-center text-zinc-900 dark:text-zinc-50">
          Our VPN Portfolio
        </h2>

        {/* Filter Tabs */}
        {allTags.length > 1 && (
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveFilter(tag)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 dark:focus-visible:ring-zinc-100 ${
                  activeFilter === tag
                    ? 'bg-zinc-900 text-white shadow-md dark:bg-zinc-100 dark:text-zinc-900'
                    : 'bg-white text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800'
                }`}
                aria-pressed={activeFilter === tag}
              >
                {tag}
              </button>
            ))}
          </div>
        )}

        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredProducts.map((product) => {
            const productUrl = `https://${product.subdomainSlug}.${mainDomain}`;

            return (
              <motion.a
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                key={product.id}
                href={productUrl}
                aria-label={`View product details for ${product.name}`}
                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl bg-white p-6 shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-zinc-900 dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800"
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
              </motion.a>
            );
          })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
