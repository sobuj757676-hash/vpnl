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
          background: bgValue || `linear-gradient(to bottom, #000000, #09090b)`,
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

  // Split headline into words for staggered animation
  const words = headline.split(" ");

  // Framer motion variants
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.04 * i },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: "spring" as const,
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <section
      className="relative w-full min-h-[100dvh] flex items-center justify-center overflow-hidden py-24 md:py-32"
      style={getBackgroundStyle()}
    >
      {/* Advanced Animated Background - Glowing Grid and Aurora */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {/* Animated Grid */}
        <div
          className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"
        />

        {/* Aurora Orbs */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
            x: [0, 50, 0],
            y: [0, -30, 0]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-10%] left-[10%] w-[40vw] h-[40vw] rounded-full bg-blue-600/30 blur-[120px] mix-blend-screen"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.5, 0.2],
            x: [0, -60, 0],
            y: [0, 40, 0]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[20%] right-[5%] w-[35vw] h-[35vw] rounded-full bg-purple-600/30 blur-[130px] mix-blend-screen"
        />
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.1, 0.4, 0.1],
            y: [0, 50, 0]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[-10%] left-[30%] w-[50vw] h-[30vw] rounded-full bg-emerald-600/20 blur-[140px] mix-blend-screen"
        />
      </div>

      <div className="container relative z-10 px-4 md:px-8 max-w-[1400px] mx-auto text-center flex flex-col lg:flex-row items-center justify-between gap-12">

        {/* Left Content Area */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-8 lg:w-1/2"
        >
          <div className="space-y-6 w-full">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm font-medium text-white/80 backdrop-blur-xl mb-4 shadow-[0_0_15px_rgba(255,255,255,0.05)]"
            >
              <span className="flex h-2 w-2 rounded-full bg-blue-500 mr-2 animate-[pulse_2s_cubic-bezier(0.4,0,0.6,1)_infinite]"></span>
              Next-Gen Privacy Solutions
            </motion.div>

            {/* Staggered Text Reveal */}
            <motion.h1
              className="text-5xl md:text-7xl lg:text-8xl font-black tracking-[-0.04em] leading-[1.05] pb-2 flex flex-wrap justify-center lg:justify-start gap-x-4"
              variants={container}
              initial="hidden"
              animate="visible"
            >
              {words.map((word, index) => (
                <motion.span
                  key={index}
                  variants={child}
                  className="bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/40"
                >
                  {word}
                </motion.span>
              ))}
            </motion.h1>

            {subHeadline && (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="text-xl md:text-2xl text-zinc-400 max-w-2xl font-light leading-relaxed tracking-wide"
              >
                {subHeadline}
              </motion.p>
            )}
          </div>

          {ctaLabel && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1 }}
              className="pt-6 flex flex-col sm:flex-row items-center gap-4"
            >
              {/* Magnetic Glowing Button */}
              <a
                href={ctaUrl}
                className="group relative inline-flex h-14 items-center justify-center rounded-full bg-white px-8 text-base font-bold text-black transition-all hover:scale-105 active:scale-95 focus:outline-none focus-visible:ring-4 focus-visible:ring-white/50"
                aria-label={ctaLabel}
              >
                {/* Outer Glow */}
                <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-emerald-500 opacity-0 blur-lg group-hover:opacity-70 transition-opacity duration-500" />

                <span className="relative z-10 flex items-center gap-2">
                  {ctaLabel}
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
                <div className="absolute inset-0 rounded-full overflow-hidden">
                   <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-black/10 to-transparent group-hover:translate-x-[200%] transition-transform duration-1000 ease-in-out" />
                </div>
              </a>
            </motion.div>
          )}
        </motion.div>

        {/* Right Area - Abstract 3D Floating Element */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="hidden lg:flex lg:w-1/2 justify-center relative"
        >
           <motion.div
             animate={{
               y: [-20, 20, -20],
               rotateZ: [-2, 2, -2]
             }}
             transition={{
               duration: 6,
               repeat: Infinity,
               ease: "easeInOut"
             }}
             className="relative w-full max-w-md aspect-square rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-3xl shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden flex items-center justify-center"
           >
              {/* Mock Dashboard UI elements */}
              <div className="absolute inset-0 p-8 flex flex-col gap-4 opacity-70">
                 <div className="w-full flex items-center justify-between">
                    <div className="w-12 h-12 rounded-full bg-white/10 animate-pulse" />
                    <div className="w-24 h-6 rounded-full bg-white/10" />
                 </div>
                 <div className="flex-1 rounded-2xl bg-gradient-to-t from-blue-500/20 to-transparent border border-white/5 mt-4" />
                 <div className="w-full flex gap-4 h-24">
                    <div className="flex-1 rounded-2xl bg-white/5 border border-white/5" />
                    <div className="flex-1 rounded-2xl bg-white/5 border border-white/5" />
                 </div>
              </div>

              {/* Center Shield Icon */}
              <div className="relative z-10 w-24 h-24 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-[0_0_30px_rgba(59,130,246,0.5)] flex items-center justify-center border border-white/20">
                 <svg className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                 </svg>
              </div>
           </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
