'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useInView, useSpring, useTransform } from 'framer-motion'

interface ServerLocationsProps {
  serverCount: number
  countryCount: number
  countries: { code: string; name: string }[] // e.g. {code: 'US', name: 'United States'}
}

function Counter({ value, isInView }: { value: number; isInView: boolean }) {
  const springValue = useSpring(0, {
    stiffness: 50,
    damping: 20,
    restDelta: 0.5
  })
  const displayValue = useTransform(springValue, (current) => Math.round(current))

  useEffect(() => {
    if (isInView) {
      springValue.set(value)
    }
  }, [isInView, value, springValue])

  return <motion.span>{displayValue}</motion.span>
}

// Helper to convert ISO code to flag emoji
const getFlagEmoji = (countryCode: string) => {
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map(char => 127397 + char.charCodeAt(0))
  return String.fromCodePoint(...codePoints)
}

export function ServerLocations({ serverCount = 3000, countryCount = 100, countries = [] }: ServerLocationsProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  // Mock countries if none provided
  const displayCountries = countries.length > 0 ? countries : [
    { code: 'US', name: 'United States' },
    { code: 'GB', name: 'United Kingdom' },
    { code: 'CA', name: 'Canada' },
    { code: 'AU', name: 'Australia' },
    { code: 'DE', name: 'Germany' },
    { code: 'FR', name: 'France' },
    { code: 'JP', name: 'Japan' },
    { code: 'SG', name: 'Singapore' },
    { code: 'IN', name: 'India' },
    { code: 'BR', name: 'Brazil' },
    { code: 'NL', name: 'Netherlands' },
    { code: 'SE', name: 'Sweden' },
    { code: 'CH', name: 'Switzerland' },
    { code: 'IT', name: 'Italy' },
    { code: 'ES', name: 'Spain' },
  ]

  return (
    <section className="py-24 bg-gray-50 dark:bg-gray-900/50" id="servers" ref={ref}>
      <div className="container px-4 mx-auto max-w-[1280px] text-center">
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row items-center justify-center gap-4 text-4xl md:text-6xl font-black mb-6"
          >
            <div className="text-primary flex gap-2">
              <Counter value={serverCount} isInView={isInView} />+
            </div>
            <span className="text-h2 md:text-h1 font-bold text-gray-800 dark:text-gray-100">Servers in</span>
            <div className="text-primary flex gap-2">
              <Counter value={countryCount} isInView={isInView} />
            </div>
            <span className="text-h2 md:text-h1 font-bold text-gray-800 dark:text-gray-100">Countries</span>
          </motion.div>
          <p className="text-body-large text-gray-500 max-w-2xl mx-auto">
            Connect anywhere in the world with a single tap. High-speed, secure, and reliable.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
          {displayCountries.map((country, index) => (
            <motion.div
              key={country.code}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{
                duration: 0.4,
                delay: index * 0.05,
                type: 'spring',
                stiffness: 100
              }}
              className="flex items-center gap-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full px-5 py-2.5 shadow-sm hover:shadow-md hover:border-primary/50 transition-all cursor-default group"
            >
              <span className="text-xl leading-none group-hover:scale-110 transition-transform">
                {getFlagEmoji(country.code)}
              </span>
              <span className="font-medium text-gray-700 dark:text-gray-300 group-hover:text-primary transition-colors">
                {country.name}
              </span>
            </motion.div>
          ))}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{
              duration: 0.4,
              delay: displayCountries.length * 0.05,
              type: 'spring',
              stiffness: 100
            }}
            className="flex items-center gap-2 bg-primary/10 rounded-full px-5 py-2.5"
          >
            <span className="font-medium text-primary">
              And {Math.max(0, countryCount - displayCountries.length)} more...
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
