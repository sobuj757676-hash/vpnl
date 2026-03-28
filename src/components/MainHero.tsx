import React from 'react';

interface MainHeroProps {
  headline?: string;
  subHeadline?: string;
  ctaLabel?: string;
  ctaUrl?: string;
  bgStyle?: 'solid' | 'gradient' | 'image' | 'video';
  bgValue?: string;
}

export function MainHero({
  headline = 'The Ultimate VPN Portfolio',
  subHeadline = 'Discover the best VPN products tailored to your needs.',
  ctaLabel = 'Explore Products',
  ctaUrl = '#catalog',
  bgStyle = 'gradient',
  bgValue,
}: MainHeroProps) {
  const getBackgroundStyle = () => {
    switch (bgStyle) {
      case 'solid':
        return { backgroundColor: bgValue || '#09090b' }; // zinc-950
      case 'gradient':
        return {
          background: bgValue || `linear-gradient(135deg, #18181b, #000000)`,
        };
      case 'image':
        return {
          backgroundImage: `url(${bgValue})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        };
      case 'video':
      default:
        return { backgroundColor: '#09090b' };
    }
  };

  return (
    <section
      className="relative w-full min-h-[100dvh] md:min-h-[80dvh] flex items-center justify-center overflow-hidden py-24 md:py-32"
      style={getBackgroundStyle()}
    >
      <div className="absolute inset-0 bg-black/40 z-0 pointer-events-none"></div>

      <div className="container relative z-10 px-4 md:px-6 max-w-[1280px] mx-auto text-center text-white">
        <div className="flex flex-col items-center justify-center space-y-8 animate-fade-in-up">
          <div className="space-y-4 max-w-4xl">
            <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-tight">
              {headline}
            </h1>
            {subHeadline && (
              <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto">
                {subHeadline}
              </p>
            )}
          </div>

          {ctaLabel && (
            <div className="pt-8">
              <a
                href={ctaUrl}
                className="inline-flex h-14 items-center justify-center rounded-xl bg-white px-8 text-base font-medium text-black transition-colors hover:bg-zinc-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                aria-label={ctaLabel}
              >
                {ctaLabel}
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
