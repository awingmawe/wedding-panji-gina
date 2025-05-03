'use client'

import BgSectionHome from '@/components/assets/images/section-awal/bg-section-1-cropped.png'
import BgSectionBottomCropped from '@/components/assets/images/section-awal/bg-section-bottom-cropped.png'
import Key from '@/components/assets/images/section-awal/key.png'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { useEffect, useState } from 'react'

export default function SectionHome() {
  const [loading, setLoading] = useState(true)
  const [progress, setProgress] = useState(0)

  // Simulate loading progress
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(timer)
          // Add a small delay before showing main content fully
          setTimeout(() => setLoading(false), 2000)
          return 100
        }
        return prevProgress + Math.floor(Math.random() * 5) + 1
      })
    }, 200)

    return () => clearInterval(timer)
  }, [])

  // Variants for the text scrolling
  const textScrollVariants = {
    animate: {
      x: ['-100%', '100%'],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: 'loop',
          duration: 6,
          ease: 'linear',
        },
      },
    },
  }

  // Calculate opacity percentage based on progress
  const contentOpacity = progress / 100

  return (
    <section className="relative">
      {/* Loading overlay - always present but opacity changes with progress */}
      <motion.div
        className="absolute bottom-30 left-1/2 z-50 flex w-full max-w-md -translate-x-1/2 flex-col items-center justify-center bg-transparent"
        initial={{ opacity: 1 }}
        animate={{ opacity: loading ? 1 : 0 }}
        transition={{ duration: 1 }}
        style={{ pointerEvents: loading ? 'auto' : 'none' }} // Disable interaction when faded out
      >
        <div className="w-[80%]">
          <h1
            className={`mb-6 text-center font-[minecraft] text-xl ${progress < 50 ? 'text-[#322a23]' : 'text-white'} transition-all duration-300 ease-in`}
          >
            Tunggu Sebentar Yaa...
          </h1>

          {/* Minecraft-style dirt loading bar background */}
          <div className="relative h-8 w-full overflow-hidden rounded border-2 border-black bg-[#322a23]">
            <motion.div
              className="absolute top-0 left-0 flex h-full items-center justify-center bg-[#8b3438]"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.2 }}
            >
              <p className={`text-xs text-white`}>{progress}%</p>
            </motion.div>
          </div>

          {/* Loading text */}
          <div
            className={`mt-4 text-center font-[minecraft] text-xs ${progress < 50 ? 'text-[#322a23]' : 'text-white'} transition-all duration-300 ease-in`}
          >
            <motion.p
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              {progress < 33
                ? 'Lagi memuat...'
                : progress < 66
                  ? 'Sudah setengah jalan...'
                  : progress < 100
                    ? 'Dikit lagi...'
                    : 'Selamat datang!'}
            </motion.p>
          </div>
        </div>
      </motion.div>

      {/* Main content with progressive opacity based on loading progress */}
      <motion.div
        animate={{ opacity: contentOpacity }}
        transition={{ duration: 0.5 }}
        style={{ pointerEvents: loading ? 'none' : 'auto' }} // Disable interaction when faded out
      >
        {/* DIVIDER */}
        <div className="absolute top-5 h-[10px] w-full border-b-2 border-b-[#8b3438] bg-[#701f24]" />

        {/* TOP PRINTER*/}
        <motion.div
          className="absolute top-10 left-1/2 flex w-[90%] -translate-x-1/2 flex-col gap-2 border-b-2 border-b-[#8b3438]"
          animate="animate"
        >
          {/* ITEM FOR TEXT WEDDING */}
          <div className="flex justify-between gap-1 rounded-xs border-b-2 border-b-[#8b3438] bg-[#701f24] px-3 py-2">
            <div className="flex-2 overflow-hidden rounded-sm bg-[#322a23] px-4 py-2.5">
              <motion.p
                className="text-center font-[minecraft] text-xs text-nowrap text-[#8a826c] uppercase"
                variants={textScrollVariants}
                animate="animate"
                whileInView={{ opacity: [1, 0, 1] }}
                transition={{
                  opacity: {
                    repeat: Infinity,
                    duration: 1.5,
                    ease: 'easeInOut',
                  },
                }}
              >
                The Wedding Of Panji Gina
              </motion.p>
            </div>
            <div className="absolute left-[33%] h-1/2 w-2.5 bg-[#701f24]" />
            <div className="absolute right-[33%] h-1/2 w-2.5 bg-[#701f24]" />
          </div>
          {/* ITEM FOR PRINTING THE CARD */}
          <div className="rounded-xs bg-[#701f24] px-3 py-2">
            <div className="relative">
              <div className="h-[8px] w-full rounded-tl-sm rounded-tr-sm bg-[#322a23]" />
              <div className="absolute bottom-0 left-1/2 h-[2px] w-[90%] -translate-x-1/2 rounded-tl-xs rounded-tr-xs bg-[#2b201a]" />
            </div>
          </div>
        </motion.div>

        {/* BACKGROUND RED */}
        <Image
          src={BgSectionHome}
          alt="background-section-1"
          sizes="100vw"
          width={0}
          height={0}
          priority
          className="h-screen w-full"
        />

        {/* KEY IMAGE */}
        <Image
          src={Key}
          alt="key"
          sizes="100vw"
          width={160}
          height={290}
          priority
          className="absolute top-1/2 left-1/2 h-auto -translate-x-1/2 -translate-y-1/2"
        />

        {/* BOTTOM CROPPED */}
        <Image
          src={BgSectionBottomCropped}
          alt="key"
          sizes="100vw"
          width={0}
          height={0}
          priority
          className="absolute bottom-0 h-auto w-full"
        />
      </motion.div>
    </section>
  )
}
