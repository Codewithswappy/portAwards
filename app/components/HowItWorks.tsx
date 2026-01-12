'use client'

import { motion } from 'framer-motion'
import { Upload, Users, TrendingUp, Shield } from 'lucide-react'

const steps = [
  {
    icon: Upload,
    title: 'Submit Your Work',
    description: 'Share your portfolio with a focus on quality, not quantity. Showcase your best projects with clear documentation.',
    color: 'bg-primary/10 text-primary',
  },
  {
    icon: Users,
    title: 'Receive Peer Feedback',
    description: 'Get constructive feedback from fellow developers. Our community focuses on technical excellence and craftsmanship.',
    color: 'bg-secondary/10 text-secondary',
  },
  {
    icon: TrendingUp,
    title: 'Gain Organic Visibility',
    description: 'High-quality work naturally rises to the top through engagement metrics that matter—not follower counts.',
    color: 'bg-accent/10 text-accent',
  },
  {
    icon: Shield,
    title: 'Build Your Reputation',
    description: 'Establish yourself as a skilled developer based on your actual work, not social media presence.',
    color: 'bg-primary-dark/10 text-primary-dark',
  },
]

export default function HowItWorks() {
  return (
    <section id="guidelines" className="container-padding mx-auto max-w-7xl">
      <div className="text-center mb-12">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold mb-4"
        >
          Quality-First Approach
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-text-secondary mx-auto"
        >
          DevRank focuses on what matters—exceptional work, constructive feedback, and meaningful connections.
        </motion.p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((step, index) => {
          const Icon = step.icon
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative"
            >
              {/* Step Number */}
              <div className="absolute -top-3 -left-3 h-8 w-8 rounded-full bg-background border border-border flex items-center justify-center">
                <span className="font-bold text-sm">{index + 1}</span>
              </div>
              
              {/* Step Card */}
              <div className="bg-card rounded-xl p-6 border border-border h-full">
                <div className={`h-12 w-12 rounded-lg ${step.color} flex items-center justify-center mb-4`}>
                  <Icon size={24} />
                </div>
                
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-text-secondary">{step.description}</p>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Divider */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
        className="mt-12 pt-8 border-t border-border"
      >
        <div className=" mx-auto text-center">
          <h4 className="text-lg font-semibold mb-4">What Makes DevRank Different</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="text-center">
              <div className="font-bold text-primary">No Awards</div>
              <div className="text-text-secondary">Focus on work</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-primary">No Gamification</div>
              <div className="text-text-secondary">Quality over points</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-primary">No Social Noise</div>
              <div className="text-text-secondary">Just portfolios</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-primary">No Ads</div>
              <div className="text-text-secondary">Clean experience</div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}