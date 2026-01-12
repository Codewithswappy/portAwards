'use client'

import { motion } from 'framer-motion'
import { Eye, Heart, MessageCircle } from 'lucide-react'

const featuredPortfolios = [
  {
    id: 1,
    name: 'Alex Morgan',
    role: 'Full Stack Developer',
    tags: ['React', 'Node.js', 'TypeScript'],
    likes: 248,
    comments: 42,
    views: 1200,
  },
  {
    id: 2,
    name: 'Samantha Chen',
    role: 'UI/UX Engineer',
    tags: ['Figma', 'Next.js', 'Tailwind'],
    likes: 312,
    comments: 56,
    views: 1800,
  },
  {
    id: 3,
    name: 'David Park',
    role: 'DevOps Specialist',
    tags: ['AWS', 'Docker', 'Kubernetes'],
    likes: 189,
    comments: 23,
    views: 950,
  },
]

export default function FeaturedPortfolios() {
  return (
    <section id="discover" className="container-padding mx-auto max-w-7xl">
      <div className="text-center mb-12">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold mb-4"
        >
          Featured Portfolios
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-text-secondary mx-auto"
        >
          Handpicked projects that demonstrate exceptional craftsmanship and attention to detail
        </motion.p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {featuredPortfolios.map((portfolio, index) => (
          <motion.div
            key={portfolio.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="bg-card rounded-xl p-6 shadow-md card-hover border border-border"
          >
            {/* Portfolio Preview */}
            <div className="h-48 rounded-lg mb-6 bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
              <div className="text-center">
                <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-3">
                  <span className="font-mono font-bold text-primary">
                    {portfolio.name.charAt(0)}
                  </span>
                </div>
                <span className="text-sm text-text-secondary">Portfolio Preview</span>
              </div>
            </div>

            {/* Developer Info */}
            <div className="mb-4">
              <h3 className="text-xl font-semibold mb-1">{portfolio.name}</h3>
              <p className="text-text-secondary text-sm mb-4">{portfolio.role}</p>
              
              {/* Tech Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {portfolio.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-surface text-text-secondary rounded-full text-xs font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Engagement Stats */}
            <div className="flex justify-between text-sm text-text-muted border-t border-border pt-4">
              <div className="flex items-center space-x-1">
                <Heart size={16} className="text-primary-light" />
                <span>{portfolio.likes}</span>
              </div>
              <div className="flex items-center space-x-1">
                <MessageCircle size={16} className="text-primary-light" />
                <span>{portfolio.comments}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Eye size={16} className="text-primary-light" />
                <span>{portfolio.views.toLocaleString()}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
        className="text-center mt-12"
      >
        <button className="px-6 py-3 border-2 border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition-all duration-300 font-medium">
          View All Featured Portfolios
        </button>
      </motion.div>
    </section>
  )
}