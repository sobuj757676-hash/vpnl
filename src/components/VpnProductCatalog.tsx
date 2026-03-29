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
    <section id="catalog" className="w-full py-24 bg-black relative overflow-hidden">
      {/* Background glowing effects */}
      <div className="absolute top-0 inset-x-0 h-[500px] bg-gradient-to-b from-zinc-900 to-transparent pointer-events-none opacity-50"></div>

      <div className="container max-w-[1280px] mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-black tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-500">
            Our VPN Portfolio
          </h2>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto font-light">
            Select the perfect privacy companion from our premium collection of VPN services.
          </p>
        </motion.div>

        {/* Filter Tabs */}
        {allTags.length > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-3 mb-16"
          >
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveFilter(tag)}
                className={`relative px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-white overflow-hidden ${
                  activeFilter === tag
                    ? 'text-black shadow-[0_0_15px_rgba(255,255,255,0.2)]'
                    : 'text-zinc-400 hover:text-white bg-zinc-900/50 border border-zinc-800 hover:border-zinc-700'
                }`}
                aria-pressed={activeFilter === tag}
              >
                {activeFilter === tag && (
                  <motion.div
                    layoutId="activeFilterBg"
                    className="absolute inset-0 bg-white"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10">{tag}</span>
              </button>
            ))}
          </motion.div>
        )}

        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredProducts.map((product, index) => {
            const productUrl = `https://${product.subdomainSlug}.${mainDomain}`;

            return (
              <motion.a
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                key={product.id}
                href={productUrl}
                aria-label={`View product details for ${product.name}`}
                className="group relative flex flex-col justify-between overflow-hidden rounded-[2rem] bg-zinc-900/40 backdrop-blur-xl p-8 transition-all duration-500 hover:-translate-y-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-zinc-900 border border-zinc-800/50 hover:border-zinc-700"
              >
                {/* Dynamic Glowing Border effect on hover */}
                <div
                  className="absolute -inset-[1px] rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none blur-sm"
                  style={{ background: `linear-gradient(45deg, transparent, ${product.primaryColor || '#ffffff'}, transparent)` }}
                />

                {/* Glassmorphism gradient effect on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-500 pointer-events-none"
                  style={{ background: product.primaryColor || '#ffffff' }}
                />

                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-8">
                    {product.logoUrl ? (
                      <div className="relative w-20 h-20 rounded-2xl overflow-hidden bg-zinc-950/80 p-3 shadow-[0_8px_16px_-6px_rgba(0,0,0,0.5)] flex-shrink-0 border border-zinc-800">
                        <Image
                          src={product.logoUrl}
                          alt={`${product.name} logo`}
                          fill
                          className="object-contain p-2"
                        />
                      </div>
                    ) : (
                      <div className="w-20 h-20 rounded-2xl bg-zinc-950/80 flex items-center justify-center flex-shrink-0 text-3xl font-black text-white shadow-[0_8px_16px_-6px_rgba(0,0,0,0.5)] border border-zinc-800">
                        {product.name.charAt(0)}
                      </div>
                    )}

                    {/* Star Rating */}
                    {product.appRating && (
                      <div className="flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full text-sm font-bold border border-white/10 shadow-lg">
                        <span className="text-white">{Number(product.appRating).toFixed(1)}</span>
                        <svg className="w-4 h-4 text-yellow-500 fill-current drop-shadow-[0_0_8px_rgba(234,179,8,0.5)]" viewBox="0 0 24 24">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                        </svg>
                      </div>
                    )}
                  </div>

                  <h3 className="text-3xl font-black text-white mb-3 tracking-tight">
                    {product.name}
                  </h3>

                  {product.shortDescription && (
                    <p className="text-zinc-400 line-clamp-2 mb-8 text-base font-light leading-relaxed">
                      {product.shortDescription}
                    </p>
                  )}

                  {/* Tags */}
                  {product.tags && Array.isArray(product.tags) && product.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-8">
                      {(product.tags as string[]).slice(0, 3).map((tag, i) => (
                        <span key={i} className="px-3 py-1.5 rounded-lg text-xs font-bold bg-white/5 text-zinc-300 border border-white/5 backdrop-blur-sm">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="relative z-10 mt-auto pt-6 border-t border-white/5">
                  <div
                    className="flex w-full items-center justify-between group-hover:pl-2 transition-all duration-300"
                  >
                    <span className="text-sm font-bold text-white uppercase tracking-wider">
                      View Product
                    </span>
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white group-hover:bg-white group-hover:text-black transition-colors duration-300">
                      <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </div>
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
