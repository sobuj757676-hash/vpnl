"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Products', href: '#catalog' },
    { name: 'About', href: '#about' },
    { name: 'Stats', href: '#stats' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent ${
        isScrolled
          ? 'bg-zinc-950/60 backdrop-blur-2xl border-white/10 shadow-lg py-1'
          : 'bg-transparent text-white py-3'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 max-w-[1280px]">
        <div className="flex items-center justify-between h-16">

          <Link href="/" className="flex-shrink-0 flex items-center gap-2 transition-transform hover:scale-105 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white rounded-md">
            <span className="font-black text-2xl tracking-tighter text-white">
              VPN<span className="text-blue-500 font-light">PORTFOLIO</span>
            </span>
          </Link>

          <nav className="hidden md:flex space-x-1" aria-label="Main Navigation">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`relative px-4 py-2 text-sm font-medium transition-colors hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-full ${isScrolled ? 'text-zinc-300' : 'text-white/80'}`}
              >
                {link.name}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <a
              href="#catalog"
              className="relative group inline-flex items-center justify-center rounded-full px-6 py-2.5 text-sm font-bold bg-white text-black transition-all hover:scale-105 active:scale-95 focus:outline-none focus-visible:ring-4 focus-visible:ring-white/50 overflow-hidden shadow-[0_0_20px_rgba(255,255,255,0.3)]"
            >
              <span className="relative z-10">Get Started</span>
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-zinc-300 to-white group-hover:translate-x-0 transition-transform duration-300 ease-out"></div>
            </a>
          </div>

          <button
            className="md:hidden p-2 text-white hover:bg-white/10 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-white transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="md:hidden absolute top-full left-0 right-0 bg-zinc-950/90 backdrop-blur-xl border-b border-white/10 shadow-2xl p-4 m-2 rounded-2xl"
          >
            <nav className="flex flex-col space-y-2" aria-label="Mobile Navigation">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-white font-medium py-3 hover:bg-white/10 rounded-xl px-4 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <a
                href="#catalog"
                className="mt-4 w-full inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-bold bg-white text-black hover:bg-zinc-200 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                onClick={() => setIsMenuOpen(false)}
              >
                Get Started
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
