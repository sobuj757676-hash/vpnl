import React from 'react';
import Image from 'next/image';

interface AboutUsProps {
  heading?: string;
  content?: string; // Rich text HTML
  imageUrl?: string;
  visible?: boolean;
}

export function AboutUs({ heading = 'About Us', content, imageUrl, visible = true }: AboutUsProps) {
  if (!visible) return null;

  return (
    <section className="w-full py-24 bg-white dark:bg-zinc-950">
      <div className="container max-w-[1280px] mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-24">
          <div className="flex-1 space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
              {heading}
            </h2>
            {content ? (
              <div
                className="prose prose-zinc dark:prose-invert max-w-none text-zinc-600 dark:text-zinc-400 text-lg leading-relaxed"
                dangerouslySetInnerHTML={{ __html: content }}
              />
            ) : (
              <p className="text-zinc-600 dark:text-zinc-400 text-lg leading-relaxed">
                We believe in an open, secure, and private internet for everyone. Our mission is to provide
                world-class privacy tools that empower individuals to take back control of their digital lives.
              </p>
            )}
          </div>

          {imageUrl && (
            <div className="flex-1 w-full relative">
              <div className="relative aspect-square md:aspect-[4/3] w-full max-w-lg mx-auto overflow-hidden rounded-3xl bg-zinc-100 dark:bg-zinc-900 shadow-2xl">
                <Image
                  src={imageUrl}
                  alt="About Us"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
