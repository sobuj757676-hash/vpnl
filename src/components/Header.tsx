"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

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

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 border-b border-transparent ${
        isScrolled
          ? 'bg-white/70 backdrop-blur-xl border-zinc-200/50 shadow-sm dark:bg-zinc-950/70 dark:border-zinc-800/50'
          : 'bg-transparent text-white'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 max-w-[1280px]">
        <div className="flex items-center justify-between h-20">

          <Link href="/" className="flex-shrink-0 flex items-center gap-2 transition-transform active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-zinc-500 rounded-md">
            <span className={`font-bold text-2xl tracking-tighter ${isScrolled ? 'text-zinc-900 dark:text-white' : 'text-white'}`}>
              VPN<span className={isScrolled ? 'text-zinc-500' : 'text-white/70'}>PORTFOLIO</span>
            </span>
          </Link>

          <nav className="hidden md:flex space-x-8" aria-label="Main Navigation">
            <a href="#catalog" className={`text-sm font-medium transition-colors hover:text-zinc-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-zinc-500 rounded-sm ${isScrolled ? 'text-zinc-600 dark:text-zinc-300' : 'text-white/80'}`}>
              Products
            </a>
            <a href="#about" className={`text-sm font-medium transition-colors hover:text-zinc-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-zinc-500 rounded-sm ${isScrolled ? 'text-zinc-600 dark:text-zinc-300' : 'text-white/80'}`}>
              About
            </a>
            <a href="#stats" className={`text-sm font-medium transition-colors hover:text-zinc-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-zinc-500 rounded-sm ${isScrolled ? 'text-zinc-600 dark:text-zinc-300' : 'text-white/80'}`}>
              Stats
            </a>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <a
              href="#catalog"
              className={`inline-flex items-center justify-center rounded-xl px-5 py-2.5 text-sm font-semibold transition-all hover:scale-105 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-zinc-500 ${
                isScrolled
                  ? 'bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200'
                  : 'bg-white text-zinc-900 hover:bg-zinc-200'
              }`}
            >
              Get Started
            </a>
          </div>

          <button
            className={`md:hidden p-2 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-zinc-500 ${isScrolled ? 'text-zinc-900 dark:text-white' : 'text-white'}`}
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

      {isMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 right-0 bg-white dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800 shadow-xl p-4">
          <nav className="flex flex-col space-y-4" aria-label="Mobile Navigation">
            <a href="#catalog" className="text-zinc-900 dark:text-zinc-100 font-medium py-2 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-lg px-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 dark:focus-visible:ring-zinc-100" onClick={() => setIsMenuOpen(false)}>
              Products
            </a>
            <a href="#about" className="text-zinc-900 dark:text-zinc-100 font-medium py-2 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-lg px-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 dark:focus-visible:ring-zinc-100" onClick={() => setIsMenuOpen(false)}>
              About
            </a>
            <a href="#stats" className="text-zinc-900 dark:text-zinc-100 font-medium py-2 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-lg px-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 dark:focus-visible:ring-zinc-100" onClick={() => setIsMenuOpen(false)}>
              Stats
            </a>
            <a
              href="#catalog"
              className="mt-4 w-full inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-zinc-900"
              onClick={() => setIsMenuOpen(false)}
            >
              Get Started
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
