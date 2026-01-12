'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Sparkles, Code, Eye, Zap } from 'lucide-react'
import Link from 'next/link'

export default function Hero() {
  const portfolioStats = [
    { icon: Code, label: 'Projects', value: '2.5K+' },
    { icon: Eye, label: 'Monthly Views', value: '500K+' },
    { icon: Zap, label: 'Active Devs', value: '15K+' },
  ]

  return (
    <section className="relative overflow-hidden pt-24 md:pt-32 lg:pt-40 pb-16 md:pb-24 lg:pb-32">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-surface to-background" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />

      <div className="relative px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8"
            >
              <Sparkles className="w-4 h-4" />
              <span>Where Quality Code Meets Recognition</span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-balance mb-6"
            >
              Your Portfolio,{' '}
              <span className="text-gradient">Ranked by Peers</span>,
              Not Algorithms
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-lg text-text-secondary mb-8"
            >
              DevRank is the trusted platform where developers showcase their best work and 
              receive meaningful feedback from fellow professionals. No social noise, just pure craftsmanship.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 mb-12"
            >
              <Link
                href="#discover"
                className="inline-flex items-center justify-center px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary-dark transition-all duration-200 hover:shadow-md hover:-translate-y-0.5"
              >
                Explore Top Portfolios
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link
                href="#submit"
                className="inline-flex items-center justify-center px-6 py-3 border-2 border-border text-text-primary rounded-lg font-medium hover:border-primary hover:text-primary transition-all duration-200"
              >
                Submit Your Work
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="grid grid-cols-3 gap-6 "
            >
              {portfolioStats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <stat.icon className="w-5 h-5 text-primary" />
                    <div className="text-2xl font-bold text-text-primary">
                      {stat.value}
                    </div>
                  </div>
                  <div className="text-sm text-text-muted">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right - Portfolio Showcase */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            {/* Main Showcase Card */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 3 }}
              className="portfolio-card relative z-10 p-6"
            >
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-primary-light flex items-center justify-center">
                      <span className="font-bold text-white">SJ</span>
                    </div>
                    <div>
                      <div className="font-semibold text-text-primary">
                        Sarah Johnson
                      </div>
                      <div className="text-sm text-text-muted">
                        Senior Frontend Engineer
                      </div>
                    </div>
                  </div>
                  <div className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                    #1 This Week
                  </div>
                </div>
                
                <div className="h-48 rounded-lg bg-gradient-to-br from-primary/10 to-primary-light/10 mb-4" />
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {['React', 'TypeScript', 'Next.js', 'Tailwind'].map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-surface text-text-secondary rounded-full text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                
                <div className="flex justify-between text-sm text-text-muted">
                  <span>9.8/10 Quality Score</span>
                  <span>248 Reviews</span>
                </div>
              </div>
            </motion.div>

            {/* Floating Cards */}
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="absolute -bottom-6 -left-6 w-64"
            >
              <div className="portfolio-card bg-white/90 backdrop-blur-sm p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center">
                    <span className="text-sm font-bold text-secondary">MC</span>
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-sm">Michael Chen</div>
                    <div className="text-xs text-text-muted">Full Stack</div>
                  </div>
                  <div className="text-xs font-medium text-primary">#2</div>
                </div>
                <div className="h-20 rounded bg-gradient-to-r from-secondary/10 to-secondary-light/10" />
              </div>
            </motion.div>

            <motion.div
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="absolute -top-6 -right-6 w-64"
            >
              <div className="portfolio-card bg-white/90 backdrop-blur-sm p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center">
                    <span className="text-sm font-bold text-accent">ER</span>
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-sm">Emma Rodriguez</div>
                    <div className="text-xs text-text-muted">UI/UX Engineer</div>
                  </div>
                  <div className="text-xs font-medium text-primary">#3</div>
                </div>
                <div className="h-20 rounded bg-gradient-to-r from-accent/10 to-accent/20" />
              </div>
            </motion.div>

            {/* Floating Elements */}
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute top-4 -right-4 w-16 h-16 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center"
            >
              <Zap className="w-6 h-6 text-primary" />
            </motion.div>

            <motion.div
              animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
              className="absolute -bottom-8 right-1/4 w-12 h-12 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center"
            >
              <Sparkles className="w-5 h-5 text-accent" />
            </motion.div>
          </motion.div>
        </div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-16 pt-8 border-t border-border/50"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-sm text-text-muted">
              Trusted by developers at leading companies
            </div>
            <div className="flex items-center justify-center gap-8 opacity-60">
              <div className="font-mono font-bold text-text-primary">TechCorp</div>
              <div className="font-mono font-bold text-text-primary">DevStudio</div>
              <div className="font-mono font-bold text-text-primary">CodeLabs</div>
              <div className="font-mono font-bold text-text-primary">StackHouse</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}