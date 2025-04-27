'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function LoadingScreen() {
  const [isFlipped, setIsFlipped] = useState(false)

  // Effect to toggle the flip state at intervals
  useEffect(() => {
    const interval = setInterval(() => {
      setIsFlipped((prev) => !prev)
    }, 800) // Flip every 2 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <motion.div
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{
          duration: 0.5,
          ease: 'easeInOut',
          repeat: Infinity,
          repeatType: 'reverse',
          repeatDelay: 0.5,
        }}
        className="relative h-80 w-40"
      ></motion.div>
    </div>
  )
}
