'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { VpnPricingPlan } from '@prisma/client'

interface SerializedPricingPlan extends Omit<VpnPricingPlan, 'monthlyPrice' | 'yearlyPrice'> {
  monthlyPrice: number | null
  yearlyPrice: number | null
}

interface PricingProps {
  plans: SerializedPricingPlan[]
}

export function Pricing({ plans }: PricingProps) {
  const [isYearly, setIsYearly] = useState(true)

  if (!plans || plans.length === 0) {
    return null
  }

  const orderedPlans = [...plans].sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0))

  return (
    <section className="py-24 bg-background relative overflow-hidden" id="pricing">
      <div className="container px-4 mx-auto max-w-[1280px]">
        <div className="text-center mb-16">
          <h2 className="text-h2 md:text-h1 font-bold mb-4">Simple, Transparent Pricing</h2>
          <p className="text-body-large text-gray-500 max-w-2xl mx-auto mb-10">
            Choose the plan that fits your needs. 30-day money-back guarantee.
          </p>

          <div className="flex items-center justify-center gap-4">
            <span className={`text-lg font-medium transition-colors ${!isYearly ? 'text-foreground' : 'text-gray-500'}`}>
              Monthly
            </span>
            <button
              onClick={() => setIsYearly(!isYearly)}
              className="relative inline-flex h-8 w-16 items-center rounded-full bg-gray-200 dark:bg-gray-800 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              role="switch"
              aria-checked={isYearly}
            >
              <span className="sr-only">Toggle billing period</span>
              <motion.span
                layout
                className="inline-block h-6 w-6 transform rounded-full bg-white shadow-sm ring-0 transition-transform"
                animate={{ x: isYearly ? 36 : 4 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            </button>
            <span className={`text-lg font-medium transition-colors ${isYearly ? 'text-foreground' : 'text-gray-500'}`}>
              Yearly
            </span>
            <span className="ml-2 inline-flex items-center rounded-full bg-green-100 dark:bg-green-900/30 px-2.5 py-0.5 text-xs font-semibold text-green-800 dark:text-green-300">
              Save up to 60%
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch">
          {orderedPlans.map((plan) => {
            const features = (plan.featuresList as string[]) || []
            const price = isYearly ? plan.yearlyPrice : plan.monthlyPrice

            // Calculate savings if yearly is cheaper per month
            const monthlyEquivalent = isYearly ? (Number(plan.yearlyPrice) / 12).toFixed(2) : plan.monthlyPrice
            const hasDiscount = isYearly && Number(plan.yearlyPrice) < (Number(plan.monthlyPrice) * 12)
            const discountPercent = hasDiscount
              ? Math.round((1 - Number(plan.yearlyPrice) / (Number(plan.monthlyPrice) * 12)) * 100)
              : 0

            return (
              <motion.div
                key={plan.id}
                whileHover={{ y: -8 }}
                className={`relative flex flex-col rounded-3xl p-6 sm:p-8 bg-white dark:bg-gray-800 shadow-xl border-2 transition-colors ${
                  plan.isFeatured
                    ? 'border-primary dark:border-primary shadow-primary/20 scale-105 z-10'
                    : 'border-transparent dark:border-gray-700 hover:border-primary/50'
                }`}
              >
                {plan.isFeatured && (
                  <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-primary text-white px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wide shadow-md">
                    Most Popular
                  </div>
                )}

                <div className="mb-8">
                  <h3 className="text-h3 font-bold text-gray-900 dark:text-white mb-2">{plan.planName}</h3>
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-4xl font-black text-gray-900 dark:text-white">
                      {plan.currency === 'USD' ? '$' : plan.currency === 'EUR' ? '€' : plan.currency === 'GBP' ? '£' : ''}
                      {price?.toString()}
                    </span>
                    <span className="text-gray-500 font-medium">
                      /{isYearly ? 'year' : 'month'}
                    </span>
                  </div>

                  {isYearly && hasDiscount && (
                    <div className="text-sm font-medium text-green-600 dark:text-green-400 h-6">
                      Equivalent to ${monthlyEquivalent?.toString()}/mo (Save {discountPercent}%)
                    </div>
                  )}
                  {(!isYearly || !hasDiscount) && <div className="h-6" />}
                </div>

                <ul className="flex-1 space-y-4 mb-8">
                  {features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <svg
                        className="w-5 h-5 text-primary shrink-0 mt-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2.5"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-600 dark:text-gray-300 font-medium">{feature}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href={plan.ctaUrl || '#'}
                  className={`mt-auto block w-full py-4 px-6 rounded-xl text-center font-bold text-lg transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
                    plan.isFeatured
                      ? 'bg-primary text-white hover:bg-primary-dark shadow-lg shadow-primary/30 hover:shadow-primary/50'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                  aria-label={`${plan.ctaLabel || 'Get Started'} with ${plan.planName}`}
                >
                  {plan.ctaLabel || 'Get Started'}
                </a>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
