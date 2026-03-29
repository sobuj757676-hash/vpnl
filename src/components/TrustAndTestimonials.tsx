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

        {/* Trusted By Logos */}
        <div className="mb-24">
          <p className="text-center text-sm font-bold text-zinc-500 uppercase tracking-[0.2em] mb-8">
            Trusted and Recommended By Industry Leaders
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
            {logos.map((logo, i) => (
              <div key={i} className="text-xl md:text-3xl font-black tracking-tighter text-white">
                {logo}
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
              className="relative p-8 rounded-3xl bg-zinc-900/30 border border-white/10 hover:border-white/20 transition-colors duration-300"
            >
              <div className="text-4xl text-blue-500 opacity-20 font-serif absolute top-6 left-6">"</div>
              <p className="text-lg text-zinc-300 leading-relaxed font-light mb-8 relative z-10 pt-4">
                "{testimonial.quote}"
              </p>

              <div className="flex items-center gap-4 border-t border-white/10 pt-6">
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                  {testimonial.author.charAt(0)}
                </div>
                <div>
                  <h4 className="text-white font-bold">{testimonial.author}</h4>
                  <p className="text-zinc-500 text-sm">{testimonial.role}, {testimonial.company}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
