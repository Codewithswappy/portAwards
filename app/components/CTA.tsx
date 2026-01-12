'use client'

import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle, Sparkles } from 'lucide-react'
import Link from 'next/link'

const benefits = [
  'Showcase your best work',
  'Receive quality feedback',
  'Connect with serious developers',
  'No social media distractions',
  'Focus on craftsmanship',
]

export default function CTA() {
  return (
    <section id="submit" className="container-padding mx-auto max-w-5xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-8 md:p-12 border border-primary/20"
      >
        <div className="text-center mb-8">
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-4">
            <Sparkles size={16} />
            <span className="text-sm font-medium">Ready to Showcase Your Work?</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Join Developers Who Value Quality
          </h2>
          
          <p className="text-text-secondary mx-auto">
            Submit your portfolio and join a community that celebrates technical excellence 
            and meaningful feedback over social media metrics.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Benefits List */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-xl font-semibold mb-6">What You'll Get</h3>
            <ul className="space-y-4">
              {benefits.map((benefit, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * index }}
                  className="flex items-start space-x-3"
                >
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-text-secondary">{benefit}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* CTA Form/Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="bg-card rounded-xl p-6 border border-border shadow-lg"
          >
            <div className="text-center mb-6">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Sparkles size={32} className="text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Submit Your Portfolio</h3>
              <p className="text-text-secondary text-sm">
                It's free, takes 5 minutes, and focuses on what matters—your work.
              </p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <div className="h-10 bg-surface rounded-lg"></div>
                <div className="h-10 bg-surface rounded-lg"></div>
                <div className="h-24 bg-surface rounded-lg"></div>
              </div>

              <button className="w-full px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-all duration-300 flex items-center justify-center font-semibold group">
                Submit for Review
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </button>

              <p className="text-center text-xs text-text-muted mt-4">
                By submitting, you agree to our focus on quality and constructive feedback.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-12 pt-8 border-t border-border/50"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-primary">2,500+</div>
              <div className="text-text-secondary text-sm">Portfolios</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary">98%</div>
              <div className="text-text-secondary text-sm">Positive Feedback</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary">24h</div>
              <div className="text-text-secondary text-sm">Review Time</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary">0</div>
              <div className="text-text-secondary text-sm">Ads or Promotions</div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}