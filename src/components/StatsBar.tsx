import React from 'react';

interface StatsBarProps {
  stats: {
    number: string;
    label: string;
    icon?: string;
  }[];
}

export function StatsBar({ stats }: StatsBarProps) {
  if (!stats || stats.length === 0) return null;

  return (
    <section className="w-full bg-zinc-900 text-white py-16">
      <div className="container max-w-[1280px] mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-white/10">
          {stats.map((stat, i) => (
            <div key={i} className="flex flex-col items-center justify-center p-6 space-y-2">
              <div className="text-4xl md:text-5xl font-black tracking-tighter text-white">
                {stat.number}
              </div>
              <div className="text-sm md:text-base font-medium text-white/70 uppercase tracking-widest">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
