"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Globe, Zap, Smartphone, Key, Fingerprint } from 'lucide-react';

interface Feature {
  title: string;
  description: string;
  icon: React.ElementType;
}

const defaultFeatures: Feature[] = [
  {
    title: 'Next-Gen Encryption',
    description: 'Military-grade AES-256 encryption ensuring your data is unreadable by hackers, ISPs, or governments.',
    icon: ShieldCheck,
  },
  {
    title: 'Global Server Network',
    description: 'Access thousands of ultra-fast servers in 100+ countries to bypass geo-restrictions effortlessly.',
    icon: Globe,
  },
  {
    title: 'Lightning Fast Speeds',
    description: 'Optimized protocols including WireGuard® deliver buffer-free streaming and lag-free gaming.',
    icon: Zap,
  },
  {
    title: 'Cross-Platform Support',
    description: 'Dedicated, easy-to-use apps for Windows, macOS, iOS, Android, Linux, and your favorite routers.',
    icon: Smartphone,
  },
  {
    title: 'Strict No-Logs Policy',
    description: 'Independently audited infrastructure guaranteeing we never track, collect, or share your private data.',
    icon: Fingerprint,
  },
  {
    title: 'Advanced Threat Protection',
    description: 'Built-in ad blockers, malware scanners, and dark web monitoring keep your digital life secure.',
    icon: Key,
  },
];

export function WhyChooseUs() {
  return (
    <section className="w-full py-24 bg-zinc-950 relative overflow-hidden">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+PGFyY2ggZD0iTTAgMGg0MHY0MEgweiIgZmlsbD0ibm9uZSIvPjxwb2x5bGluZSBwb2ludHM9IjQwIDQwIDAgNDAgMCAwIiBmaWxsPSJub25lIiBzdHJva2U9IiMyNzI3MmEiIHN0cm9rZS13aWR0aD0iMSIvPjwvc3ZnPg==')] opacity-30 pointer-events-none"></div>

      <div className="container relative z-10 max-w-[1280px] mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center rounded-full border border-zinc-800 bg-zinc-900/50 px-4 py-1.5 text-sm font-bold text-zinc-400 backdrop-blur-md mb-6 uppercase tracking-widest">
            The Portfolio Advantage
          </div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-white mb-6">
            Why Choose Our Ecosystem?
          </h2>
          <p className="text-xl text-zinc-400 max-w-3xl mx-auto font-light leading-relaxed">
            We don&apos;t just offer one VPN; we provide a comprehensive suite of specialized privacy tools designed to tackle any digital security challenge you face.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8 auto-rows-[minmax(180px,auto)]">
          {defaultFeatures.map((feature, i) => {
            const Icon = feature.icon;
            // Bento grid layout classes
            let colSpanClass = "md:col-span-1 lg:col-span-1";
            let rowSpanClass = "row-span-1";

            if (i === 0) {
              colSpanClass = "md:col-span-2 lg:col-span-2";
              rowSpanClass = "row-span-2";
            } else if (i === 3) {
              colSpanClass = "md:col-span-2 lg:col-span-2";
            } else if (i === 4) {
              rowSpanClass = "row-span-2";
            }

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`group relative p-8 rounded-3xl bg-zinc-900/40 border border-zinc-800/50 hover:bg-zinc-800/60 hover:border-zinc-700 transition-all duration-300 overflow-hidden flex flex-col ${colSpanClass} ${rowSpanClass}`}
              >
                {/* Abstract animated background patterns */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(59,130,246,0.1),transparent_70%)]" />
                  <div className="absolute top-0 right-0 w-64 h-64 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPjxjaXJjbGUgY3g9IjEiIGN5PSIxIiByPSIxIiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMSkiLz48L3N2Zz4=')] [mask-image:linear-gradient(to_bottom_left,white,transparent)] group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform duration-700" />
                </div>

                <div className="relative z-10 w-14 h-14 rounded-2xl bg-gradient-to-br from-zinc-800 to-zinc-900 flex items-center justify-center mb-6 shadow-lg border border-zinc-700/50 group-hover:border-blue-500/50 transition-colors duration-300">
                  <Icon className="w-7 h-7 text-white group-hover:text-blue-400 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300" strokeWidth={1.5} />
                  {/* Icon glow on hover */}
                  <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                <div className="relative z-10 flex-grow flex flex-col justify-end">
                  <h3 className={`font-bold text-white mb-3 tracking-tight group-hover:text-blue-400 transition-colors duration-300 ${i === 0 ? 'text-3xl lg:text-4xl' : 'text-2xl'}`}>
                    {feature.title}
                  </h3>

                  <p className={`text-zinc-400 leading-relaxed font-light ${i === 0 ? 'text-lg lg:text-xl max-w-md' : 'text-base'}`}>
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
