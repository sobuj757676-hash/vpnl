"use client";

import React from 'react';
import { motion } from 'framer-motion';

export function TrustAndTestimonials() {
  const logos = ['TechRadar', 'PCMag', 'Forbes', 'Wired', 'CNET', 'TheVerge'];

  const testimonials = [
    {
      quote: "The most comprehensive VPN ecosystem I've ever tested. Having a specialized tool for every privacy need is a game-changer.",
      author: "Alex Rivera",
      role: "Cybersecurity Analyst",
      company: "TechGuard"
    },
    {
      quote: "Our entire company seamlessly transitioned to their business suite. The zero-trust access and dedicated account management are flawless.",
      author: "Sarah Chen",
      role: "CTO",
      company: "Innovate Inc."
    },
    {
      quote: "I travel constantly, and their mobile-first VPN products keep me connected and secure on public Wi-Fi networks worldwide without draining my battery.",
      author: "Marcus Johnson",
      role: "Digital Nomad",
      company: "Freelance"
    }
  ];

  return (
    <section className="w-full py-24 bg-black relative border-y border-white/5">
      <div className="container max-w-[1280px] mx-auto px-4 md:px-6">

        {/* Trusted By Logos - Infinite Marquee */}
        <div className="mb-24 overflow-hidden relative">
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />
          <p className="text-center text-sm font-bold text-zinc-500 uppercase tracking-[0.2em] mb-8">
            Trusted and Recommended By Industry Leaders
          </p>
          <div className="flex w-fit animate-[marquee_30s_linear_infinite]">
            {[...logos, ...logos, ...logos].map((logo, i) => (
              <div key={i} className="flex-shrink-0 mx-8 md:mx-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-300">
                <span className="text-xl md:text-3xl font-black tracking-tighter text-white">
                  {logo}
                </span>
              </div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-white mb-6">
            Loved by Millions Worldwide
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              whileHover="hover"
              className="group relative p-8 rounded-3xl bg-zinc-900/30 border border-white/5 transition-all duration-300 overflow-hidden"
            >
              {/* Radial gradient hover effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-transparent opacity-0 pointer-events-none transition-opacity duration-500"
                variants={{
                  hover: { opacity: 1 }
                }}
              />

              {/* Inner border */}
              <div className="absolute inset-2 border border-white/5 rounded-2xl pointer-events-none group-hover:border-white/10 transition-colors duration-500" />

              <div className="text-4xl text-blue-500/30 font-serif absolute top-6 left-6 group-hover:text-blue-500/50 transition-colors duration-300">&ldquo;</div>
              <p className="text-lg text-zinc-300 leading-relaxed font-light mb-12 relative z-10 pt-4 group-hover:text-white transition-colors duration-300">
                &ldquo;{testimonial.quote}&rdquo;
              </p>

              <div className="flex items-center gap-4 pt-6 relative z-10">
                {/* Overlapping Avatars effect concept (using initials here as avatars) */}
                <div className="relative flex">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-[0_0_15px_rgba(37,99,235,0.3)] ring-2 ring-black relative z-20 group-hover:scale-110 transition-transform duration-300">
                    {testimonial.author.charAt(0)}
                  </div>
                   {/* Decorative background circle */}
                  <div className="absolute -left-2 top-0 w-12 h-12 rounded-full bg-zinc-800 ring-2 ring-black z-10 opacity-50 group-hover:-translate-x-1 transition-transform duration-300" />
                </div>
                <div className="ml-2">
                  <h4 className="text-white font-bold group-hover:text-blue-400 transition-colors duration-300">{testimonial.author}</h4>
                  <p className="text-zinc-500 text-sm group-hover:text-zinc-400 transition-colors duration-300">{testimonial.role}, {testimonial.company}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
