"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface MainHeroProps {
  headline?: string;
  subHeadline?: string;
  ctaLabel?: string;
  ctaUrl?: string;
  bgStyle?: 'solid' | 'gradient' | 'image' | 'video';
  bgValue?: string;
}

export function MainHero({
  headline = 'The Ultimate VPN Portfolio',
  subHeadline = 'Discover the best VPN products tailored to your needs.',
  ctaLabel = 'Explore Products',
  ctaUrl = '#catalog',
  bgStyle = 'gradient',
  bgValue,
}: MainHeroProps) {
  const getBackgroundStyle = () => {
    switch (bgStyle) {
      case 'solid':
        return { backgroundColor: bgValue || '#09090b' }; // zinc-950
      case 'gradient':
        return {
          background: bgValue || `linear-gradient(135deg, #09090b, #000000)`,
        };
      case 'image':
        return {
          backgroundImage: `url(${bgValue})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        };
      case 'video':
      default:
        return { backgroundColor: '#09090b' };
    }
  };

  return (
    <section
      className="relative w-full min-h-[100dvh] flex items-center justify-center overflow-hidden py-24 md:py-32"
      style={getBackgroundStyle()}
    >
      {/* Abstract Glowing Background Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3], rotate: [0, 90, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-blue-600/20 blur-[120px]"
        />
        <motion.div
          animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0.4, 0.2], rotate: [0, -90, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[40%] -right-[10%] w-[40%] h-[60%] rounded-full bg-purple-600/20 blur-[120px]"
        />
      </div>

      <div className="absolute inset-0 bg-black/60 z-0 pointer-events-none backdrop-blur-[2px]"></div>

      <div className="container relative z-10 px-4 md:px-6 max-w-[1280px] mx-auto text-center text-white">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-center justify-center space-y-8"
        >
          <div className="space-y-6 max-w-5xl">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm font-medium text-white/80 backdrop-blur-md mb-4"
            >
              <span className="flex h-2 w-2 rounded-full bg-blue-500 mr-2 animate-pulse"></span>
              Next-Gen Privacy Solutions
            </motion.div>

            <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[1.1] bg-clip-text text-transparent bg-gradient-to-br from-white via-white to-white/50 pb-2">
              {headline}
            </h1>
            {subHeadline && (
              <p className="text-xl md:text-2xl text-white/70 max-w-3xl mx-auto font-light leading-relaxed">
                {subHeadline}
              </p>
            )}
          </div>

          {ctaLabel && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="pt-10 flex flex-col sm:flex-row items-center gap-4"
            >
              <a
                href={ctaUrl}
                className="group relative inline-flex h-16 items-center justify-center rounded-full bg-white px-10 text-lg font-bold text-black transition-all hover:scale-105 active:scale-95 focus:outline-none focus-visible:ring-4 focus-visible:ring-white/50 overflow-hidden"
                aria-label={ctaLabel}
              >
                <span className="relative z-10">{ctaLabel}</span>
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-zinc-200 to-white group-hover:translate-x-0 transition-transform duration-500 ease-in-out"></div>
              </a>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
