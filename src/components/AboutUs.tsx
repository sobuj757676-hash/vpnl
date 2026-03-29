"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface AboutUsProps {
  heading?: string;
  content?: string; // Rich text HTML
  imageUrl?: string;
  visible?: boolean;
}

export function AboutUs({ heading = 'About Us', content, imageUrl, visible = true }: AboutUsProps) {
  if (!visible) return null;

  return (
    <section className="w-full py-32 bg-black relative overflow-hidden">
      {/* Abstract Background Element */}
      <div className="absolute top-1/2 -right-[20%] w-[60%] h-[80%] -translate-y-1/2 rounded-full bg-zinc-900/40 blur-[120px] pointer-events-none"></div>

      <div className="container relative z-10 max-w-[1280px] mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">

          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex-1 space-y-8 lg:pr-10"
          >
            <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm font-medium text-white/80 backdrop-blur-md">
              Our Mission
            </div>

            <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-white leading-[1.1]">
              {heading}
            </h2>

            <div className="relative">
              <div className="absolute -left-6 top-0 bottom-0 w-1 bg-gradient-to-b from-white to-transparent rounded-full opacity-20"></div>
              {content ? (
                <div
                  className="prose prose-invert max-w-none text-zinc-400 text-xl md:text-2xl font-light leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: content }}
                />
              ) : (
                <p className="text-zinc-400 text-xl md:text-2xl font-light leading-relaxed">
                  We believe in an open, secure, and private internet for everyone. Our mission is to provide
                  world-class privacy tools that empower individuals to take back control of their digital lives.
                </p>
              )}
            </div>
          </motion.div>

          {imageUrl && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              className="flex-1 w-full relative"
            >
              <div className="relative group perspective-1000">
                <div className="absolute -inset-1 rounded-[2.5rem] bg-gradient-to-tr from-white/20 to-white/0 opacity-50 blur-xl group-hover:opacity-100 transition-opacity duration-700"></div>
                <div className="relative aspect-square lg:aspect-[4/5] w-full max-w-lg mx-auto overflow-hidden rounded-[2rem] bg-zinc-900 shadow-2xl border border-white/10 transform transition-transform duration-700 group-hover:rotate-y-[-5deg] group-hover:rotate-x-[5deg]">
                  <Image
                    src={imageUrl}
                    alt="About Us"
                    fill
                    className="object-cover transform transition-transform duration-1000 group-hover:scale-110"
                  />
                  {/* Glass overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60"></div>
                </div>

                {/* Decorative floating card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                  className="absolute -bottom-8 -left-8 bg-zinc-900/80 backdrop-blur-xl border border-white/10 p-6 rounded-2xl shadow-2xl max-w-[200px] hidden md:block"
                >
                  <div className="text-4xl font-black text-white mb-2">100%</div>
                  <div className="text-sm font-bold text-zinc-400 uppercase tracking-wider">Privacy Guaranteed</div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
