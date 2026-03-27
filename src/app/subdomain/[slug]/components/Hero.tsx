import Image from 'next/image';
import { VpnProductWithRelations } from '@/lib/data/vpn-product';

interface HeroProps {
  product: VpnProductWithRelations;
}

export function Hero({ product }: HeroProps) {
  const getBackgroundStyle = () => {
    switch (product.heroBgStyle) {
      case 'solid':
        return { backgroundColor: product.heroBgValue || 'var(--primary)' };
      case 'gradient':
        return {
          background: product.heroBgValue || `linear-gradient(135deg, var(--primary), var(--secondary))`
        };
      case 'image':
        return {
          backgroundImage: `url(${product.heroBgValue})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        };
      case 'video':
      default:
        return { backgroundColor: 'var(--primary)' };
    }
  };

  return (
    <section
      className="relative w-full min-h-[100dvh] flex items-center justify-center overflow-hidden py-24 md:py-32"
      style={getBackgroundStyle()}
    >
      <div className="absolute inset-0 bg-black/20 z-0"></div>

      <div className="container relative z-10 px-4 md:px-6 max-w-[1280px] mx-auto text-center text-white">
        <div className="flex flex-col items-center justify-center space-y-8 animate-fade-in-up">
          {product.logoUrl && (
            <div className="mb-4 relative w-24 h-24 md:w-32 md:h-32 drop-shadow-xl">
              <Image
                src={product.logoUrl}
                alt={`${product.name} logo`}
                fill
                className="object-contain"
                priority
                sizes="(max-width: 768px) 96px, 128px"
              />
            </div>
          )}

          <div className="space-y-4 max-w-3xl">
            <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-tight" style={{ fontFamily: 'var(--font-sans)' }}>
              {product.name}
            </h1>
            {product.shortDescription && (
              <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
                {product.shortDescription}
              </p>
            )}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 w-full max-w-lg mx-auto">
            {product.showAppBadge && product.appStoreUrl && (
              <a
                href={product.appStoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-transform hover:scale-105 active:scale-95 inline-block w-48"
                aria-label="Download on the App Store"
              >
                {/* Fallback simple button if we don't have official badge image */}
                <div className="bg-black text-white flex items-center justify-center gap-3 rounded-xl py-2 px-4 border border-white/20 hover:border-white/40 transition-colors min-h-[56px]">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 flex-shrink-0">
                    <path d="M16.365 21.444c-1.08.775-2.138.74-3.238.03-1.077-.696-2.185-.756-3.326.012-1.028.69-2.02.666-3.08-.096C1.94 16.712.983 9.47 5.2 6.444c1.373-.982 2.827-1.168 4.22-.505.815.39 1.503.418 2.348-.008 1.417-.714 3.018-.62 4.296.34 1.348 1.01 1.77 2.344 1.015 3.738-1.554 2.857-.123 5.488 2.378 6.42.368.136.65.412.833.722-1.258 1.838-2.52 3.42-3.925 4.285zM14.636 5.86c-1.353-.197-2.61-1.01-3.26-2.22-.057-.107-.106-.217-.164-.326 1.378-.063 2.627.8 3.23 2.067.062.13.116.262.194.48z"/>
                  </svg>
                  <div className="text-left leading-tight flex flex-col justify-center">
                    <div className="text-[10px] text-gray-300 font-medium">Download on the</div>
                    <div className="text-lg font-semibold -mt-0.5">App Store</div>
                  </div>
                </div>
              </a>
            )}

            {product.showPlayBadge && product.playStoreUrl && (
              <a
                href={product.playStoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-transform hover:scale-105 active:scale-95 inline-block w-48"
                aria-label="Get it on Google Play"
              >
                <div className="bg-black text-white flex items-center justify-center gap-3 rounded-xl py-2 px-4 border border-white/20 hover:border-white/40 transition-colors min-h-[56px]">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 flex-shrink-0">
                    <path d="M3.504 22.826c-.464.088-.844-.06-1.144-.436-.296-.372-.444-.888-.444-1.544V3.15C1.916 2.498 2.064 1.98 2.36 1.61c.296-.372.68-.52 1.144-.432L17.58 11.23c.364.092.612.284.74.576.132.288.132.6 0 .888-.128.292-.376.484-.74.576L3.504 22.826z" />
                  </svg>
                  <div className="text-left leading-tight flex flex-col justify-center">
                    <div className="text-[10px] text-gray-300 font-medium">GET IT ON</div>
                    <div className="text-lg font-semibold -mt-0.5">Google Play</div>
                  </div>
                </div>
              </a>
            )}
          </div>

          {(product.appRating || product.downloadCountDisplay) && (
            <div className="flex items-center gap-4 pt-6 text-white/90">
              {product.appRating && (
                <div className="flex items-center gap-1">
                  <span className="font-bold mr-1">{product.appRating.toFixed(1)}</span>
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-5 h-5 ${i < Math.floor(Number(product.appRating)) ? 'text-yellow-400 fill-current' : 'text-gray-400 fill-current'}`}
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  ))}
                </div>
              )}

              {product.appRating && product.downloadCountDisplay && (
                <span className="w-1 h-1 rounded-full bg-white/50"></span>
              )}

              {product.downloadCountDisplay && (
                <div className="font-medium">
                  {product.downloadCountDisplay} Downloads
                </div>
              )}
            </div>
          )}
        </div>

        {product.deviceMockupUrl && (
          <div className="mt-16 relative w-full max-w-lg mx-auto aspect-[1/2] animate-fade-in-up" style={{ animationDelay: '200ms' }}>
            <Image
              src={product.deviceMockupUrl}
              alt={`${product.name} App Mockup`}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 500px"
              priority
            />
          </div>
        )}
      </div>
    </section>
  );
}
