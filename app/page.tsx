'use client'

import { motion } from 'framer-motion'
import Hero from '@/components/Hero'
import FeaturedPortfolios from '@/components/FeaturedPortfolios'
import TopInspiration from '@/components/TopInspiration'
import HowItWorks from '@/components/HowItWorks'
import CTA from '@/components/CTA'

export default function Home() {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  }

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <motion.section
        initial="initial"
        animate="animate"
        variants={fadeInUp}
      >
        <Hero />
      </motion.section>

      {/* Featured Portfolios */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="section-padding bg-surface"
      >
        <FeaturedPortfolios />
      </motion.section>

      {/* Top Inspiration */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="section-padding"
      >
        <TopInspiration />
      </motion.section>

      {/* How It Works */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="section-padding bg-surface"
      >
        <HowItWorks />
      </motion.section>

      {/* Call to Action */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="section-padding"
      >
        <CTA />
      </motion.section>
    </div>
  )
}