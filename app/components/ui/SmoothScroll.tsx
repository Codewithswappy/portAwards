'use client'

import { ReactNode } from 'react'
import { LazyMotion, domAnimation } from 'framer-motion'

interface SmoothScrollProps {
  children: ReactNode
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  return (
    <LazyMotion features={domAnimation}>
      {children}
    </LazyMotion>
  )
}