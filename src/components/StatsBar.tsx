"use client";

import React from 'react';
import CountUp from 'react-countup';
import { motion, useInView } from 'framer-motion';
import { Download, ShieldCheck, Globe2 } from 'lucide-react';

interface StatsBarProps {
  stats: {
    number: string;
    label: string;
    icon?: string;
  }[];
}

export function StatsBar({ stats }: StatsBarProps) {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  if (!stats || stats.length === 0) return null;

  const defaultIcons = [Download, ShieldCheck, Globe2];

  return (
    <section ref={ref} className="w-full relative py-24 overflow-hidden bg-black">
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20"></div>

      <div className="container relative z-10 max-w-[1280px] mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, i) => {
            const match = stat.number.match(/^([\d.,]+)(.*)$/);
            const numVal = match ? parseFloat(match[1].replace(/,/g, '')) : null;
            const suffix = match ? match[2] : stat.number;
            const Icon = defaultIcons[i % defaultIcons.length];

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                className="group relative flex flex-col items-center justify-center p-8 md:p-12 rounded-[2rem] bg-zinc-900/50 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_40px_rgba(255,255,255,0.1)] overflow-hidden"
              >
                {/* Glow Effect */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-white/5 rounded-full blur-[50px] group-hover:bg-white/10 transition-colors duration-500"></div>

                <div className="relative z-10 w-16 h-16 mb-6 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-500">
                  <Icon className="w-8 h-8 opacity-80" strokeWidth={1.5} />
                </div>

                <div className="relative z-10 text-5xl md:text-6xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white to-zinc-500 mb-4">
                  {numVal !== null && isInView ? (
                    <CountUp end={numVal} duration={2.5} separator="," suffix={suffix} />
                  ) : (
                    stat.number
                  )}
                </div>

                <div className="relative z-10 text-sm md:text-base font-bold text-zinc-400 uppercase tracking-[0.2em]">
                  {stat.label}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
