'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { VpnFeature } from '@prisma/client'
import Image from 'next/image'

interface FeaturesProps {
  features: VpnFeature[]
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' as const }
  }
}

const iconVariants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: { duration: 0.8, ease: 'easeInOut' as const }
  }
}

export function Features({ features }: FeaturesProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  if (!features || features.length === 0) {
    return null
  }

  const orderedFeatures = [...features].sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0))

  // Default SVG for Phosphor icons or fallback
  const getIcon = (feature: VpnFeature) => {
    if (feature.iconName === 'custom' && feature.iconSvgUrl) {
      return (
        <div className="relative w-10 h-10 group-hover:scale-110 transition-transform duration-300">
          <Image src={feature.iconSvgUrl} alt={feature.title || ''} fill className="object-contain" />
        </div>
      )
    }

    // Default SVG Path (Shield Check as generic fallback if phosphor icon name not specifically handled)
    return (
      <motion.svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="var(--primary)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-10 h-10 group-hover:scale-110 transition-transform duration-300"
      >
        <motion.path
          d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
          variants={iconVariants}
        />
        <motion.path
          d="M9 12l2 2 4-4"
          variants={iconVariants}
        />
      </motion.svg>
    )
  }

  return (
    <section className="py-24 bg-background relative overflow-hidden" id="features">
      <div className="container px-4 mx-auto max-w-[1280px]">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="text-h2 md:text-h1 font-bold mb-4">Why Choose Us</h2>
          <p className="text-body-large text-gray-500">
            Engineered for privacy, speed, and absolute freedom on the internet.
          </p>
        </div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {orderedFeatures.map((feature) => (
            <motion.div
              key={feature.id}
              variants={itemVariants}
              className="group p-6 sm:p-8 rounded-2xl bg-white dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 ease-out flex flex-col items-start text-left"
            >
              <div className="mb-6 bg-primary/10 p-4 rounded-xl text-primary">
                {getIcon(feature)}
              </div>
              <h3 className="text-h3 font-semibold mb-3">{feature.title}</h3>
              <p className="text-body text-gray-500 dark:text-gray-400">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
