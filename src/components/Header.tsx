"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    {
      name: 'Products',
      href: '#catalog',
      dropdown: [
        { name: 'VPN for PC', href: '#catalog' },
        { name: 'VPN for Mobile', href: '#catalog' },
        { name: 'Browser Extensions', href: '#catalog' },
      ]
    },
    {
      name: 'About',
      href: '#about',
      dropdown: [
        { name: 'Our Mission', href: '#about' },
        { name: 'Core Values', href: '#about' },
        { name: 'Careers', href: '#about' },
      ]
    },
    {
      name: 'Stats',
      href: '#stats',
      dropdown: [
        { name: 'Performance', href: '#stats' },
        { name: 'Global Servers', href: '#stats' },
      ]
    },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b border-transparent ${
        isScrolled
          ? 'bg-zinc-950/70 backdrop-blur-2xl border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.5)] py-2'
          : 'bg-transparent text-white py-4 md:py-6'
      }`}
    >
      <div className="container mx-auto px-4 md:px-8 max-w-[1400px]">
        <div className="flex items-center justify-between">

          <Link href="/" className="flex-shrink-0 flex items-center gap-2 transition-transform hover:scale-105 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white rounded-md z-50 relative">
            <span className="font-black text-2xl tracking-tighter text-white">
              VPN<span className="text-blue-500 font-light">PORTFOLIO</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center space-x-1" aria-label="Main Navigation">
            {navLinks.map((link, index) => (
              <div
                key={link.name}
                className="relative group"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <a
                  href={link.href}
                  className={`relative px-5 py-2.5 text-sm font-medium transition-colors hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-full flex items-center gap-1 ${isScrolled ? 'text-zinc-300' : 'text-white/80'}`}
                  aria-haspopup={link.dropdown ? "true" : "false"}
                  aria-expanded={hoveredIndex === index}
                >
                  {link.name}
                  {link.dropdown && (
                    <svg className={`w-4 h-4 transition-transform duration-300 ${hoveredIndex === index ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  )}
                </a>

                {/* Mega Menu / Dropdown */}
                <AnimatePresence>
                  {hoveredIndex === index && link.dropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: 15, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 15, scale: 0.95 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="absolute top-full left-1/2 -translate-x-1/2 pt-4 w-48"
                    >
                      <div className="bg-zinc-950/90 backdrop-blur-xl border border-white/10 rounded-2xl p-2 shadow-2xl relative overflow-hidden">
                        {/* Glow effect */}
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-50 pointer-events-none" />

                        {link.dropdown.map((item) => (
                          <a
                            key={item.name}
                            href={item.href}
                            className="block px-4 py-2.5 text-sm text-zinc-300 hover:text-white hover:bg-white/10 rounded-xl transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white relative z-10"
                          >
                            {item.name}
                          </a>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </nav>

          <div className="hidden md:flex items-center space-x-4 z-50 relative">
            <a
              href="#catalog"
              className="relative group inline-flex items-center justify-center rounded-full px-6 py-2.5 text-sm font-bold bg-white text-black transition-all hover:scale-105 active:scale-95 focus:outline-none focus-visible:ring-4 focus-visible:ring-white/50 overflow-hidden shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)]"
            >
              <span className="relative z-10">Get Started</span>
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-zinc-300 via-white to-white group-hover:translate-x-0 transition-transform duration-500 ease-out"></div>
            </a>
          </div>

          <button
            className="md:hidden p-2 text-white hover:bg-white/10 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-white transition-colors z-50 relative"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            <motion.div animate={isMenuOpen ? "open" : "closed"} className="relative w-6 h-6 flex items-center justify-center">
              <motion.span
                variants={{
                  closed: { rotate: 0, y: -6 },
                  open: { rotate: 45, y: 0 },
                }}
                className="absolute w-6 h-0.5 bg-white block transition-all"
              />
              <motion.span
                variants={{
                  closed: { opacity: 1 },
                  open: { opacity: 0 },
                }}
                className="absolute w-6 h-0.5 bg-white block transition-all"
              />
              <motion.span
                variants={{
                  closed: { rotate: 0, y: 6 },
                  open: { rotate: -45, y: 0 },
                }}
                className="absolute w-6 h-0.5 bg-white block transition-all"
              />
            </motion.div>
          </button>
        </div>
      </div>

      {/* Full-screen Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: 'circle(0% at top right)' }}
            animate={{ opacity: 1, clipPath: 'circle(150% at top right)' }}
            exit={{ opacity: 0, clipPath: 'circle(0% at top right)' }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 bg-zinc-950/95 backdrop-blur-3xl z-40 flex flex-col justify-center items-center"
          >
            <nav className="flex flex-col items-center space-y-6 w-full px-6" aria-label="Mobile Navigation">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 + 0.2 }}
                  className="w-full flex flex-col items-center"
                >
                  <a
                    href={link.href}
                    className="text-white font-black text-4xl hover:text-blue-400 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-lg p-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.name}
                  </a>
                  {link.dropdown && (
                     <div className="flex flex-col items-center mt-4 space-y-3">
                       {link.dropdown.map(item => (
                         <a
                           key={item.name}
                           href={item.href}
                           className="text-zinc-400 text-lg hover:text-white transition-colors"
                           onClick={() => setIsMenuOpen(false)}
                         >
                           {item.name}
                         </a>
                       ))}
                     </div>
                  )}
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.1 + 0.2 }}
                className="w-full max-w-sm pt-8"
              >
                <a
                  href="#catalog"
                  className="w-full inline-flex items-center justify-center rounded-full px-8 py-4 text-lg font-bold bg-white text-black hover:scale-105 active:scale-95 transition-transform focus:outline-none focus-visible:ring-4 focus-visible:ring-white/50 shadow-[0_0_30px_rgba(255,255,255,0.3)]"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Get Started Now
                </a>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
