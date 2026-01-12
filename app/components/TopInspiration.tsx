'use client'

import { motion } from 'framer-motion'
import { ChevronRight, Star, TrendingUp } from 'lucide-react'
import { useState } from 'react'

const topPortfolios = [
  {
    id: 1,
    rank: 1,
    name: 'Sarah Johnson',
    role: 'Senior Frontend Engineer',
    tech: ['Next.js', 'TypeScript', 'Tailwind'],
    highlights: 'Exceptional animation implementations',
    score: 9.8,
  },
  {
    id: 2,
    rank: 2,
    name: 'Michael Chen',
    role: 'Full Stack Developer',
    tech: ['React', 'Node.js', 'PostgreSQL'],
    highlights: 'Clean architecture patterns',
    score: 9.6,
  },
  {
    id: 3,
    rank: 3,
    name: 'Emma Rodriguez',
    role: 'UI/UX Engineer',
    tech: ['Figma', 'Framer', 'React'],
    highlights: 'Outstanding design systems',
    score: 9.5,
  },
  {
    id: 4,
    rank: 4,
    name: 'Alex Turner',
    role: 'DevOps Engineer',
    tech: ['AWS', 'Terraform', 'Kubernetes'],
    highlights: 'Infrastructure as Code excellence',
    score: 9.4,
  },
  {
    id: 5,
    rank: 5,
    name: 'James Wilson',
    role: 'Mobile Developer',
    tech: ['React Native', 'Swift', 'Kotlin'],
    highlights: 'Cross-platform performance',
    score: 9.3,
  },
]

const categories = ['All', 'Frontend', 'Backend', 'Mobile', 'Design', 'DevOps']

export default function TopInspiration() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedPortfolio, setSelectedPortfolio] = useState(topPortfolios[0])

  return (
    <section id="inspiration" className="container-padding mx-auto max-w-7xl">
      <div className="text-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-4"
        >
          <Star size={16} />
          <span className="text-sm font-medium">Weekly Rankings</span>
        </motion.div>
        
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl md:text-4xl font-bold mb-4"
        >
          Top 10 Developer Portfolios
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-text-secondary mx-auto"
        >
          Curated inspiration from exceptional work. Rankings update weekly based on quality feedback.
        </motion.p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left: Rankings List */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-2"
        >
          {/* Category Filters */}
          <div className="flex flex-wrap gap-2 mb-6">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-primary text-white'
                    : 'bg-surface text-text-secondary hover:bg-surface/80'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Rankings Table */}
          <div className="bg-card rounded-xl border border-border overflow-hidden">
            {topPortfolios.map((portfolio, index) => (
              <motion.div
                key={portfolio.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                onClick={() => setSelectedPortfolio(portfolio)}
                className={`flex items-center p-4 border-b border-border last:border-b-0 cursor-pointer transition-all ${
                  selectedPortfolio.id === portfolio.id
                    ? 'bg-primary/5'
                    : 'hover:bg-surface'
                }`}
              >
                {/* Rank */}
                <div className="flex-shrink-0 w-12 flex items-center justify-center">
                  <div className={`h-8 w-8 rounded-full flex items-center justify-center ${
                    index < 3 ? 'bg-primary/10 text-primary' : 'bg-surface text-text-secondary'
                  }`}>
                    <span className="font-bold">{portfolio.rank}</span>
                  </div>
                </div>

                {/* Developer Info */}
                <div className="flex-1 ml-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold">{portfolio.name}</h3>
                      <p className="text-sm text-text-secondary">{portfolio.role}</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-1">
                        <Star size={14} className="text-primary" fill="currentColor" />
                        <span className="font-bold">{portfolio.score}</span>
                      </div>
                      <span className="text-xs text-text-muted">Quality Score</span>
                    </div>
                  </div>
                  
                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mt-2">
                    {portfolio.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 bg-surface text-text-secondary rounded text-xs"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right: Featured Portfolio Details */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-1"
        >
          <div className="bg-card rounded-xl border border-border p-6 sticky top-24">
            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-2">
                  #{selectedPortfolio.rank} This Week
                </div>
                <h3 className="text-xl font-bold">{selectedPortfolio.name}</h3>
                <p className="text-text-secondary">{selectedPortfolio.role}</p>
              </div>
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-2xl font-bold text-primary">#{selectedPortfolio.rank}</span>
              </div>
            </div>

            {/* Portfolio Preview */}
            <div className="h-48 rounded-lg bg-gradient-to-br from-primary/5 to-primary/10 mb-6 flex items-center justify-center">
              <div className="text-center">
                <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-3">
                  <span className="font-bold text-primary text-xl">
                    {selectedPortfolio.name.charAt(0)}
                  </span>
                </div>
                <span className="text-sm text-text-secondary">Portfolio Preview</span>
              </div>
            </div>

            {/* Highlights */}
            <div className="mb-6">
              <h4 className="font-semibold mb-2 flex items-center">
                <TrendingUp size={16} className="mr-2 text-primary" />
                What Makes It Stand Out
              </h4>
              <p className="text-text-secondary text-sm">
                {selectedPortfolio.highlights}
              </p>
            </div>

            {/* Tech Stack */}
            <div className="mb-6">
              <h4 className="font-semibold mb-2">Tech Stack</h4>
              <div className="flex flex-wrap gap-2">
                {selectedPortfolio.tech.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-surface text-text-secondary rounded-lg text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Score Breakdown */}
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-text-secondary">Code Quality</span>
                <span className="font-semibold">9.5/10</span>
              </div>
              <div className="w-full bg-surface rounded-full h-2">
                <div className="bg-primary rounded-full h-2" style={{ width: '95%' }}></div>
              </div>
              
              <div className="flex justify-between text-sm">
                <span className="text-text-secondary">Design</span>
                <span className="font-semibold">9.8/10</span>
              </div>
              <div className="w-full bg-surface rounded-full h-2">
                <div className="bg-primary rounded-full h-2" style={{ width: '98%' }}></div>
              </div>
              
              <div className="flex justify-between text-sm">
                <span className="text-text-secondary">Documentation</span>
                <span className="font-semibold">9.2/10</span>
              </div>
              <div className="w-full bg-surface rounded-full h-2">
                <div className="bg-primary rounded-full h-2" style={{ width: '92%' }}></div>
              </div>
            </div>

            <button className="w-full mt-6 px-4 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors flex items-center justify-center font-medium">
              View Full Portfolio
              <ChevronRight size={20} className="ml-2" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}