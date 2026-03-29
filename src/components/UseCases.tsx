"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Users, Briefcase, Plane } from 'lucide-react';

export function UseCases() {
  const cases = [
    {
      title: "For Individuals",
      subtitle: "Personal Digital Protection",
      description: "Secure your browsing history, protect sensitive passwords, and block malicious ads on up to 10 devices simultaneously with a single account.",
      icon: Users,
      color: "from-blue-600 to-cyan-500",
      cta: "Explore Personal Solutions"
    },
    {
      title: "For Businesses",
      subtitle: "Zero-Trust Architecture",
      description: "Deploy dedicated IP addresses, manage team access from a centralized dashboard, and ensure compliance with industry-standard encryption.",
      icon: Briefcase,
      color: "from-purple-600 to-pink-500",
      cta: "Explore Business Solutions"
    },
    {
      title: "For Travelers",
      subtitle: "Global Access Anywhere",
      description: "Bypass censorship in restrictive regions and maintain secure connections on untrusted public Wi-Fi networks in airports and hotels.",
      icon: Plane,
      color: "from-amber-500 to-orange-500",
      cta: "Explore Travel Solutions"
    }
  ];

  return (
    <section className="w-full py-32 bg-black relative overflow-hidden">
      <div className="container max-w-[1280px] mx-auto px-4 md:px-6 relative z-10">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-24"
        >
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-white mb-6 leading-tight">
            Tailored For <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Everyone</span>
          </h2>
          <p className="text-xl md:text-2xl text-zinc-400 max-w-3xl mx-auto font-light leading-relaxed">
            Whether you&apos;re protecting your family or securing a global enterprise, we have the perfect digital companion.
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {cases.map((useCase, i) => {
            const Icon = useCase.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: i * 0.2, type: "spring", stiffness: 50 }}
                className="flex-1 group relative rounded-[2.5rem] bg-zinc-900/50 backdrop-blur-xl border border-white/5 p-10 hover:border-white/20 transition-all duration-500 hover:-translate-y-4 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)] overflow-hidden"
              >
                {/* Background Gradient Hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${useCase.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>

                <div className={`w-20 h-20 rounded-3xl bg-gradient-to-br ${useCase.color} flex items-center justify-center mb-8 shadow-xl transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                  <Icon className="w-10 h-10 text-white" strokeWidth={1.5} />
                </div>

                <h3 className="text-4xl font-black text-white mb-2 tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-zinc-400 transition-all duration-300">
                  {useCase.title}
                </h3>
                <h4 className="text-lg font-bold text-zinc-500 uppercase tracking-widest mb-6">
                  {useCase.subtitle}
                </h4>

                <p className="text-zinc-400 text-lg font-light leading-relaxed mb-12">
                  {useCase.description}
                </p>

                <div className="mt-auto border-t border-white/10 pt-8 flex items-center justify-between group-hover:border-white/30 transition-colors duration-500 cursor-pointer">
                  <span className="font-bold text-white uppercase tracking-wider text-sm">
                    {useCase.cta}
                  </span>
                  <div className={`w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white bg-white/5 group-hover:bg-white group-hover:text-black transition-all duration-500`}>
                    <svg className="w-5 h-5 transition-transform duration-500 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
