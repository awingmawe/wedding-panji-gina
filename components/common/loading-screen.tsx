'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function LoadingScreen() {
  const [isFlipped, setIsFlipped] = useState(false)
  const [progress, setProgress] = useState(0)

  // Effect to toggle the flip state at intervals
  useEffect(() => {
    const interval = setInterval(() => {
      setIsFlipped((prev) => !prev)
    }, 800)

    return () => clearInterval(interval)
  }, [])

  // Effect to increment the progress bar
  useEffect(() => {
    if (progress < 100) {
      const interval = setInterval(() => {
        setProgress((prevProgress) => {
          // Random increment between 1-5 to make it feel more natural
          const increment = Math.floor(Math.random() * 5) + 1
          const newProgress = Math.min(prevProgress + increment, 100)

          return newProgress
        })
      }, 200)

      return () => clearInterval(interval)
    }
  }, [progress])

  return (
    <div className="absolute flex h-screen w-full flex-col items-center justify-center space-y-8 bg-gray-100">
      {/* Flip animation container */}
      <motion.div
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{
          duration: 0.5,
          ease: 'easeInOut',
          repeat: Infinity,
          repeatType: 'reverse',
          repeatDelay: 0.5,
        }}
        className="relative mb-8 h-80 w-40"
      >
        {/* You can place your existing content here */}
      </motion.div>

      {/* Progress bar and percentage */}
      <div className="w-64 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">Loading</span>
          <span className="text-sm font-medium text-gray-700">{progress}%</span>
        </div>

        <div className="h-2.5 w-full rounded-full bg-gray-200">
          <motion.div
            className="h-2.5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>

        {/* Loading status text */}
        <div className="text-xs text-gray-500 italic">
          {progress < 30
            ? 'Initializing...'
            : progress < 60
              ? 'Loading assets...'
              : progress < 90
                ? 'Almost there...'
                : progress < 100
                  ? 'Finalizing...'
                  : 'Complete!'}
        </div>
      </div>
    </div>
  )
}
