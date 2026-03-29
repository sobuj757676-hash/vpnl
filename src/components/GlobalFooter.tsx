"use client";

import React from 'react';
import Link from 'next/link';

interface FooterProps {
  contactEmail?: string;
  copyrightText?: string;
  socialLinks?: { platform: string; url: string }[];
  navGroups?: { label: string; links: { label: string; url: string }[] }[];
}

export function GlobalFooter({
  contactEmail,
  copyrightText,
  socialLinks = [],
  navGroups = [],
}: FooterProps) {
  const currentYear = new Date().getFullYear();
  const defaultCopyright = `© ${currentYear} Our Company. All rights reserved.`;

  return (
    <footer className="w-full bg-black text-zinc-400 text-sm relative border-t border-white/5 overflow-hidden">

      {/* Top CTA Section */}
      <div className="relative border-b border-white/5 py-16">
        {/* Glow behind CTA */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 via-purple-900/20 to-zinc-900/20 blur-3xl pointer-events-none"></div>
        <div className="container max-w-[1280px] mx-auto px-4 md:px-6 relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-3xl md:text-4xl font-black text-white tracking-tight">Ready to take control?</h3>
            <p className="text-zinc-400 text-lg">Secure your digital life with our premium VPN solutions today.</p>
          </div>
          <a
            href="#catalog"
            className="group relative inline-flex items-center justify-center rounded-full px-8 py-4 text-base font-bold bg-white text-black transition-all hover:scale-105 active:scale-95 focus:outline-none focus-visible:ring-4 focus-visible:ring-white/50 overflow-hidden shadow-[0_0_30px_rgba(255,255,255,0.2)]"
          >
            <span className="relative z-10">Get Started Now</span>
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-zinc-300 to-white group-hover:translate-x-0 transition-transform duration-300 ease-out"></div>
          </a>
        </div>
      </div>

      <div className="container max-w-[1280px] mx-auto px-4 md:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">

          <div className="md:col-span-1 space-y-6">
            <Link href="/" className="inline-flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-md">
              <span className="font-black text-2xl tracking-tighter text-white">
                VPN<span className="text-blue-500 font-light">PORTFOLIO</span>
              </span>
            </Link>

            <p className="text-zinc-500 font-light leading-relaxed">
              Empowering your digital freedom through world-class privacy tools and premium VPN services.
            </p>

            {contactEmail && (
              <p className="flex items-center gap-3 text-zinc-300 pt-4">
                <span className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                  <svg className="w-4 h-4 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </span>
                <a href={`mailto:${contactEmail}`} className="hover:text-white font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-sm">
                  {contactEmail}
                </a>
              </p>
            )}
          </div>

          {navGroups && navGroups.length > 0 ? (
            navGroups.map((group, i) => (
              <div key={i} className="md:col-span-1 space-y-6">
                <h4 className="font-bold text-white tracking-widest uppercase text-xs">
                  {group.label}
                </h4>
                <ul className="space-y-4">
                  {group.links.map((link, j) => (
                    <li key={j}>
                      <a href={link.url} className="text-zinc-500 hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-sm font-medium">
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))
          ) : (
            <div className="md:col-span-3 grid grid-cols-2 gap-8 text-zinc-500 font-light">
              <p>Explore our premium network of privacy solutions.</p>
            </div>
          )}
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="font-light text-zinc-600">{copyrightText || defaultCopyright}</p>

          {socialLinks && socialLinks.length > 0 && (
            <div className="flex gap-4">
              {socialLinks.map((link, i) => (
                <a
                  key={i}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 text-zinc-500 hover:text-white hover:bg-white/10 transition-all hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                  aria-label={link.platform}
                >
                  <span className="text-xs font-bold uppercase tracking-wider">{link.platform.substring(0, 2)}</span>
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </footer>
  );
}
