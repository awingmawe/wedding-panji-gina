'use client'

import BgFrame2 from '@/components/assets/images/section-pengantin/bg-frame-2.png'
import BgFrame from '@/components/assets/images/section-pengantin/bg-frame.png'
import Flower1 from '@/components/assets/images/section-pengantin/flower-1.png'
import Flower2 from '@/components/assets/images/section-pengantin/flower-2.png'
import Flower3 from '@/components/assets/images/section-pengantin/flower-3.png'
import Flower4 from '@/components/assets/images/section-pengantin/flower-4.png'
import FramePengantin2 from '@/components/assets/images/section-pengantin/frame-pengantin-2.png'
import FramePengantin from '@/components/assets/images/section-pengantin/frame-pengantin.png'
import GambarGina from '@/components/assets/images/section-pengantin/gambar-gina.png'
import GambarPanji from '@/components/assets/images/section-pengantin/gambar-panji.png'
import NamaPengantin from '@/components/assets/images/section-pengantin/nama-pengantin.svg'
import JudulPengantin from '@/components/assets/images/section-pengantin/title-pengantin.svg'
import { motion } from 'framer-motion'
import Image from 'next/image'
import React from 'react'

const SectionPengantin: React.FC = () => {
  return (
    <section className="relative w-full overflow-hidden" id="section-pengantin">
      {/* Container that establishes size */}
      <div className="relative aspect-[9/16] w-full">
        {/* Background elements */}
        <div className="absolute h-auto w-full">
          <Image
            src={BgFrame}
            alt="section-pengantin-background-frame"
            width={0}
            height={0}
            sizes="100vw"
            className="h-auto w-full"
            loading="lazy"
          />
        </div>

        <div className="absolute h-auto w-full">
          <Image
            src={BgFrame2}
            alt="section-pengantin-background-frame-2"
            width={0}
            height={0}
            sizes="100vw"
            loading="lazy"
            className="h-auto w-full"
          />
        </div>
        <div className="absolute z-10 h-auto w-full">
          <Image
            src={FramePengantin}
            alt="section-pengantin-frame"
            width={0}
            height={0}
            loading="lazy"
            sizes="100vw"
            className="h-auto w-full"
          />
        </div>
        <div className="absolute top-[44%] left-1/2 z-10 h-auto w-[85%] -translate-x-1/2 -translate-y-1/2">
          <Image
            src={FramePengantin2}
            alt="section-pengantin-frame-2"
            width={0}
            height={0}
            loading="lazy"
            sizes="100vw"
            className="h-auto w-full"
          />
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.8 }}
          className="absolute top-[65px] left-[45px] z-11 h-auto w-1/2"
        >
          <Image
            src={JudulPengantin}
            alt="section-pengantin-judul"
            width={0}
            height={0}
            loading="lazy"
            sizes="100vw"
            className="h-auto w-full"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, rotateY: 180 }}
          whileInView={{
            opacity: 1,
            rotateY: 0,
          }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.5 }}
          className="absolute right-0 bottom-40 z-11 h-auto"
        >
          <Image
            src={Flower1}
            alt="section-pengantin-flower-1"
            width={0}
            height={0}
            loading="lazy"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, rotateY: 180 }}
          whileInView={{
            opacity: 1,
            rotateY: 0,
          }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.8 }}
          className="absolute right-10 bottom-30 z-11 h-auto"
        >
          <Image
            src={Flower2}
            alt="section-pengantin-flower-2"
            width={0}
            height={0}
            loading="lazy"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, rotateY: 180 }}
          whileInView={{
            opacity: 1,
            rotateY: 0,
          }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.8 }}
          className="absolute bottom-30 left-10 z-11 h-auto"
        >
          <Image
            src={Flower3}
            alt="section-pengantin-flower-3"
            width={0}
            height={0}
            loading="lazy"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, rotateY: 180 }}
          whileInView={{
            opacity: 1,
            rotateY: 0,
          }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.8 }}
          className="absolute bottom-40 left-0 z-11"
        >
          <Image
            src={Flower4}
            alt="section-pengantin-flower-4"
            width={0}
            height={0}
            loading="lazy"
          />
        </motion.div>

        <motion.div
          initial={{ y: 150 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.4, ease: 'easeOut', delay: 0.8 }}
          className="absolute z-11 h-auto w-full"
        >
          <Image
            src={NamaPengantin}
            alt="section-pengantin-nama"
            width={0}
            height={0}
            loading="lazy"
            sizes="100vw"
            className="h-auto w-full"
          />
        </motion.div>

        {/* Animated elements */}
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="absolute z-[2] h-auto w-full"
        >
          <Image
            src={GambarGina}
            alt="gambar-gina"
            width={0}
            height={0}
            loading="lazy"
            sizes="100vw"
            className="h-auto w-full"
          />
        </motion.div>

        <motion.div
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="absolute z-[1] h-auto w-full"
        >
          <Image
            src={GambarPanji}
            alt="gambar-panji"
            width={0}
            loading="lazy"
            height={0}
            sizes="100vw"
            className="h-auto w-full"
          />
        </motion.div>
      </div>
    </section>
  )
}

export default SectionPengantin
