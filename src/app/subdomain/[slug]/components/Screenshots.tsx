'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { VpnScreenshot } from '@prisma/client'

interface ScreenshotsProps {
  screenshots: VpnScreenshot[]
}

export function Screenshots({ screenshots }: ScreenshotsProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)

  if (!screenshots || screenshots.length === 0) {
    return null
  }

  // Ensure screenshots are ordered
  const orderedScreenshots = [...screenshots].sort((a, b) => a.displayOrder - b.displayOrder)

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % orderedScreenshots.length)
  }

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + orderedScreenshots.length) % orderedScreenshots.length)
  }

  return (
    <section className="py-24 bg-background overflow-hidden">
      <div className="container px-4 mx-auto max-w-[1280px]">
        <div className="text-center mb-16">
          <h2 className="text-h2 md:text-h1 font-bold mb-4">See It In Action</h2>
          <p className="text-body-large text-gray-500 max-w-2xl mx-auto">
            A seamless experience across all your devices.
          </p>
        </div>

        {/* Desktop 3D Carousel */}
        <div className="hidden md:flex justify-center items-center h-[600px] relative perspective-1000">
          <div className="relative w-full max-w-5xl h-full flex justify-center items-center">
            {orderedScreenshots.map((img, index) => {
              const isActive = index === activeIndex
              const isPrev = index === (activeIndex - 1 + orderedScreenshots.length) % orderedScreenshots.length
              const isNext = index === (activeIndex + 1) % orderedScreenshots.length

              let zIndex = 0
              let x = '0%'
              let scale = 0.8
              let rotateY = 0
              let opacity = 0
              let blur = 'blur(4px)'

              if (isActive) {
                zIndex = 30
                x = '0%'
                scale = 1
                rotateY = 0
                opacity = 1
                blur = 'blur(0px)'
              } else if (isPrev) {
                zIndex = 20
                x = '-50%'
                scale = 0.9
                rotateY = 15
                opacity = 0.7
              } else if (isNext) {
                zIndex = 20
                x = '50%'
                scale = 0.9
                rotateY = -15
                opacity = 0.7
              }

              const isPortrait = img.orientation === 'portrait'

              return (
                <motion.div
                  key={img.id}
                  className="absolute cursor-pointer rounded-2xl overflow-hidden shadow-2xl"
                  style={{
                    width: isPortrait ? '300px' : '600px',
                    height: isPortrait ? '600px' : '337.5px', // 16:9 ratio
                    zIndex,
                    filter: blur
                  }}
                  animate={{
                    x,
                    scale,
                    rotateY,
                    opacity,
                  }}
                  transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                  onClick={() => {
                    if (isActive) setLightboxOpen(true)
                    else if (isPrev) handlePrev()
                    else if (isNext) handleNext()
                  }}
                >
                  <Image
                    src={img.imageUrl}
                    alt={img.altText || `Screenshot ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 600px"
                  />
                  {!isActive && (
                    <div className="absolute inset-0 bg-black/10 hover:bg-black/0 transition-colors" />
                  )}
                </motion.div>
              )
            })}
          </div>

          <button
            onClick={handlePrev}
            className="absolute left-8 z-40 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-gray-200 dark:border-gray-700 rounded-full p-4 transition-transform hover:scale-105"
            aria-label="Previous screenshot"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={handleNext}
            className="absolute right-8 z-40 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-gray-200 dark:border-gray-700 rounded-full p-4 transition-transform hover:scale-105"
            aria-label="Next screenshot"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Mobile Swipe Carousel */}
        <div className="md:hidden flex overflow-x-auto snap-x snap-mandatory hide-scrollbar gap-4 px-4 pb-8">
          {orderedScreenshots.map((img, index) => {
            const isPortrait = img.orientation === 'portrait'
            return (
              <div
                key={img.id}
                className="snap-center shrink-0 rounded-xl overflow-hidden shadow-lg relative"
                style={{
                  width: isPortrait ? '280px' : '85vw',
                  height: isPortrait ? '560px' : 'calc(85vw * 9 / 16)'
                }}
                onClick={() => {
                  setActiveIndex(index)
                  setLightboxOpen(true)
                }}
              >
                <Image
                  src={img.imageUrl}
                  alt={img.altText || `Screenshot ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 300px"
                />
              </div>
            )
          })}
        </div>

        {/* Dot Indicators */}
        <div className="flex justify-center mt-8 gap-2">
          {orderedScreenshots.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`w-2.5 h-2.5 rounded-full transition-colors ${idx === activeIndex ? 'bg-primary' : 'bg-gray-300 dark:bg-gray-700'}`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
            onClick={() => setLightboxOpen(false)}
          >
            <button
              className="absolute top-6 right-6 text-white hover:text-gray-300 z-50"
              onClick={() => setLightboxOpen(false)}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div
              className="relative w-[90vw] h-[90vh] flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={orderedScreenshots[activeIndex].imageUrl}
                alt={orderedScreenshots[activeIndex].altText || `Screenshot full`}
                fill
                className="object-contain"
                sizes="100vw"
              />

              <button
                onClick={handlePrev}
                className="absolute left-4 z-40 text-white bg-black/50 hover:bg-black/80 rounded-full p-3"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <button
                onClick={handleNext}
                className="absolute right-4 z-40 text-white bg-black/50 hover:bg-black/80 rounded-full p-3"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  )
}
