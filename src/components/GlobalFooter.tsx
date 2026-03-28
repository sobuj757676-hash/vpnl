import React from 'react';

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
    <footer className="w-full bg-zinc-950 text-zinc-400 py-16 text-sm">
      <div className="container max-w-[1280px] mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">

          <div className="md:col-span-1 space-y-6">
            <a href="/" className="inline-flex items-center gap-2">
              <span className="font-bold text-xl text-white tracking-tight">Our VPNs</span>
            </a>

            {contactEmail && (
              <p className="flex items-center gap-2 text-zinc-300">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href={`mailto:${contactEmail}`} className="hover:text-white transition-colors">{contactEmail}</a>
              </p>
            )}

            {socialLinks && socialLinks.length > 0 && (
              <div className="flex gap-4">
                {socialLinks.map((link, i) => (
                  <a key={i} href={link.url} target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-white transition-colors">
                    {link.platform}
                  </a>
                ))}
              </div>
            )}
          </div>

          {navGroups && navGroups.length > 0 ? (
            navGroups.map((group, i) => (
              <div key={i} className="md:col-span-1 space-y-4">
                <h4 className="font-semibold text-white tracking-wider uppercase text-xs">
                  {group.label}
                </h4>
                <ul className="space-y-3">
                  {group.links.map((link, j) => (
                    <li key={j}>
                      <a href={link.url} className="hover:text-white transition-colors">
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))
          ) : (
            <div className="md:col-span-3 grid grid-cols-2 gap-8 text-zinc-500">
              <p>Explore our premium network of privacy solutions.</p>
            </div>
          )}
        </div>

        <div className="border-t border-zinc-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p>{copyrightText || defaultCopyright}</p>
        </div>
      </div>
    </footer>
  );
}
