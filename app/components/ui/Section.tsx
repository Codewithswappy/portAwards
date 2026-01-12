'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface SectionProps {
  children: ReactNode
  id?: string
  className?: string
  padding?: boolean
  background?: 'default' | 'surface'
}

export default function Section({
  children,
  id,
  className = '',
  padding = true,
  background = 'default',
}: SectionProps) {
  const backgroundStyles = {
    default: 'bg-background',
    surface: 'bg-surface',
  }
  
  return (
    <section
      id={id}
      className={`
        ${backgroundStyles[background]}
        ${padding ? 'section-padding' : ''}
        ${className}
      `}
    >
      <div className="container-padding mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
        >
          {children}
        </motion.div>
      </div>
    </section>
  )
}