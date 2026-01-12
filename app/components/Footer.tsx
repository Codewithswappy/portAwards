'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Github, Twitter, Linkedin, Heart } from 'lucide-react'

const footerLinks = {
  Product: ['Discover', 'Inspiration', 'Submit', 'Guidelines'],
  Company: ['About', 'Blog', 'Careers', 'Press'],
  Resources: ['Documentation', 'API', 'Help Center', 'Community'],
  Legal: ['Privacy', 'Terms', 'Security', 'Cookies'],
}

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-surface border-t border-border">
      <div className="container-padding mx-auto max-w-7xl py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="font-mono font-bold text-white">DR</span>
              </div>
              <span className="text-xl font-semibold text-text-primary">DevRank</span>
            </Link>
            
            <p className="text-text-secondary mb-6">
              A professional platform where developer portfolios speak louder than resumes. 
              Focus on quality, craftsmanship, and meaningful connections.
            </p>
            
            <div className="flex space-x-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="h-10 w-10 rounded-lg bg-card border border-border flex items-center justify-center hover:bg-surface transition-colors"
                aria-label="GitHub"
              >
                <Github size={20} className="text-text-secondary" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="h-10 w-10 rounded-lg bg-card border border-border flex items-center justify-center hover:bg-surface transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={20} className="text-text-secondary" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="h-10 w-10 rounded-lg bg-card border border-border flex items-center justify-center hover:bg-surface transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} className="text-text-secondary" />
              </a>
            </div>
          </motion.div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([category, links], categoryIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: categoryIndex * 0.1 }}
            >
              <h3 className="font-semibold text-text-primary mb-4">{category}</h3>
              <ul className="space-y-3">
                {links.map((link, linkIndex) => (
                  <li key={link}>
                    <Link
                      href="#"
                      className="text-text-secondary hover:text-primary transition-colors text-sm"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center"
        >
          <div className="text-text-secondary text-sm mb-4 md:mb-0">
            © {currentYear} DevRank. All rights reserved.
          </div>
          
          <div className="flex items-center space-x-6 text-sm text-text-secondary">
            <Link href="#" className="hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-primary transition-colors">
              Terms of Service
            </Link>
            <Link href="#" className="hover:text-primary transition-colors">
              Cookie Policy
            </Link>
            <div className="flex items-center">
              <span>Made with</span>
              <Heart size={16} className="mx-1 text-primary" fill="currentColor" />
              <span>for developers</span>
            </div>
          </div>
        </motion.div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-text-muted"
        >
          <div className="flex items-center space-x-2">
            <div className="h-2 w-2 rounded-full bg-primary"></div>
            <span>No tracking cookies</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="h-2 w-2 rounded-full bg-primary"></div>
            <span>GDPR compliant</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="h-2 w-2 rounded-full bg-primary"></div>
            <span>Ad-free experience</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="h-2 w-2 rounded-full bg-primary"></div>
            <span>Open source</span>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}