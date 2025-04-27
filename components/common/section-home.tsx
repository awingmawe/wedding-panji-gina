'use client'

import BgSectionHome from '@/components/assets/images/bg-section-1-cropped.png'
import Key from '@/components/assets/images/key.png'
import { motion } from 'framer-motion'
import Image from 'next/image'

export default function SectionHome() {
  // Variants for the text scrolling
  const textScrollVariants = {
    animate: {
      x: ['-100%', '115%'],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: 'loop',
          duration: 8,
          ease: 'linear',
        },
      },
    },
  }

  return (
    <section className="relative">
      {/* DIVIDER */}
      <div className="absolute top-5 h-[10px] w-full border-b-1 border-b-[#8b3438] bg-[#701f24]" />

      {/* TOP PRINTER - With Framer Motion animations */}
      <motion.div
        className="absolute top-10 left-1/2 flex w-[90%] -translate-x-1/2 flex-col gap-2 border-b-1 border-b-[#8b3438]"
        animate="animate"
      >
        <div className="flex justify-between gap-1 rounded-xs bg-[#701f24] px-3 py-2">
          <div className="flex-2 overflow-hidden rounded-sm bg-[#322a23] px-4 py-2.5">
            <motion.p
              className="text-center font-[minecraft] text-xs text-nowrap text-[#8a826c] uppercase"
              variants={textScrollVariants}
              animate="animate"
              // Apply blinking effect to the text
              whileInView={{ opacity: [1, 0, 1] }}
              transition={{
                opacity: {
                  repeat: Infinity,
                  duration: 0.8,
                  ease: 'easeInOut',
                },
              }}
            >
              The Wedding Of
            </motion.p>
          </div>
          <div className="flex-1 overflow-hidden rounded-sm bg-[#322a23] px-3.5 py-2.5">
            <motion.p
              className="text-center font-[minecraft] text-xs text-[#8a826c] uppercase"
              variants={textScrollVariants}
              animate="animate"
              // Apply blinking effect to the text
              whileInView={{ opacity: [1, 0, 1] }}
              transition={{
                opacity: {
                  repeat: Infinity,
                  duration: 0.8,
                  ease: 'easeInOut',
                },
              }}
            >
              Panji
            </motion.p>
          </div>
          <div className="flex-1 overflow-hidden rounded-sm bg-[#322a23] px-3.5 py-2.5">
            <motion.p
              className="text-center font-[minecraft] text-xs text-[#8a826c] uppercase"
              variants={textScrollVariants}
              animate="animate"
              // Apply blinking effect to the text
              whileInView={{ opacity: [1, 0, 1] }}
              transition={{
                opacity: {
                  repeat: Infinity,
                  duration: 0.8,
                  ease: 'easeInOut',
                },
              }}
            >
              Gina
            </motion.p>
          </div>
        </div>
        <div className="rounded-xs bg-[#701f24] px-3 py-2">
          <div className="relative">
            <div className="h-[8px] w-full rounded-tl-sm rounded-tr-sm bg-[#322a23]" />
            <div className="absolute bottom-0 left-1/2 h-[2px] w-[90%] -translate-x-1/2 rounded-tl-xs rounded-tr-xs bg-[#2b201a]" />
          </div>
        </div>
      </motion.div>

      <Image
        src={BgSectionHome}
        alt="background-section-1"
        sizes="100vw"
        width={0}
        height={0}
        priority
        className="h-screen w-full"
      />
      <Image
        src={Key}
        alt="key"
        sizes="100vw"
        width={160}
        height={290}
        priority
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      />
    </section>
  )
}
