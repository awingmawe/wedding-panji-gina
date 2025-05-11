'use client'

import BgFrame from '@/components/assets/images/section-akad/bg-section-akad.png'
import Flower1 from '@/components/assets/images/section-akad/flower-1.png'
import Flower2 from '@/components/assets/images/section-akad/flower-2.png'
import Flower3 from '@/components/assets/images/section-akad/flower-3.png'
import Flower4 from '@/components/assets/images/section-akad/flower-4.png'
import Flower5 from '@/components/assets/images/section-akad/flower-5.png'
import Flower6 from '@/components/assets/images/section-akad/flower-6.png'
import Frame from '@/components/assets/images/section-akad/frame-section-akad.png'
import { motion } from 'framer-motion'
import Image from 'next/image'
import React from 'react'

const SectionCountdown: React.FC = () => {
  // Different flip variants for flowers (without scale)
  const flipVariants = [
    // Flip on X axis (horizontal flip)
    {
      hidden: { opacity: 0, rotateY: -180 },
      visible: (i: number) => ({
        opacity: 1,
        rotateY: 0,
        transition: {
          delay: 0.3 + i * 0.1,
          duration: 0.8,
        },
      }),
    },
  ]

  return (
    <section className="relative w-full overflow-hidden" id="section-akad">
      {/* Container that establishes size */}
      <div className="relative aspect-[9/16] w-full">
        {/* Background elements */}
        <div className="absolute z-0 h-auto w-full">
          <Image
            src={BgFrame}
            alt="section-akad-background"
            width={0}
            height={0}
            sizes="100vw"
            className="h-auto w-full"
            loading="lazy"
          />
        </div>

        {/* ANIMATION HERE */}
        <motion.div
          className="absolute top-1/2 left-1/2 w-full max-w-[350px] min-w-[300px] -translate-x-1/2 -translate-y-1/2"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <div className="relative flex flex-col items-center gap-2">
            {/* Flowers positioning */}
            {/* Flower 1 - top left - X axis flip */}
            <motion.div
              className="absolute -top-8 -left-5 z-7"
              variants={flipVariants[0]}
              initial="hidden"
              whileInView="visible"
              custom={0}
              viewport={{ once: true }}
              style={{ perspective: '500px' }}
            >
              <Image
                src={Flower1}
                alt="decorative-flower-1"
                width={0}
                height={0}
                sizes="100vw"
                className="h-auto"
                loading="lazy"
              />
            </motion.div>

            {/* Flower 2 - middle left - Y axis flip */}
            <motion.div
              className="absolute top-25 -left-10 z-7"
              variants={flipVariants[0]}
              initial="hidden"
              whileInView="visible"
              custom={1}
              viewport={{ once: true }}
              style={{ perspective: '500px' }}
            >
              <Image
                src={Flower2}
                alt="decorative-flower-2"
                width={0}
                height={0}
                sizes="100vw"
                className="h-auto"
                loading="lazy"
              />
            </motion.div>

            {/* Flower 3 - bottom left - Z axis flip */}
            <motion.div
              className="absolute bottom-45 -left-3 z-7"
              variants={flipVariants[0]}
              initial="hidden"
              whileInView="visible"
              custom={2}
              viewport={{ once: true }}
              style={{ perspective: '500px' }}
            >
              <Image
                src={Flower3}
                alt="decorative-flower-3"
                width={0}
                height={0}
                sizes="100vw"
                className="h-auto"
                loading="lazy"
              />
            </motion.div>

            {/* Flower 4 - bottom left corner - X axis flip */}
            <motion.div
              className="absolute -bottom-10 -left-15 z-7"
              variants={flipVariants[0]}
              initial="hidden"
              whileInView="visible"
              custom={3}
              viewport={{ once: true }}
              style={{ perspective: '500px' }}
            >
              <Image
                src={Flower4}
                alt="decorative-flower-4"
                width={0}
                height={0}
                sizes="100vw"
                className="h-auto object-cover"
                loading="lazy"
              />
            </motion.div>

            {/* Flower 5 - top right - Y axis flip */}
            <motion.div
              className="absolute top-0 -right-10 z-7"
              variants={flipVariants[0]}
              initial="hidden"
              whileInView="visible"
              custom={4}
              viewport={{ once: true }}
              style={{ perspective: '500px' }}
            >
              <Image
                src={Flower5}
                alt="decorative-flower-5"
                width={0}
                height={0}
                sizes="100vw"
                className="h-auto"
                loading="lazy"
              />
            </motion.div>

            {/* Flower 6 - middle right - Z axis flip */}
            <motion.div
              className="absolute top-40 -right-10 z-7"
              variants={flipVariants[0]}
              initial="hidden"
              whileInView="visible"
              custom={5}
              viewport={{ once: true }}
              style={{ perspective: '500px' }}
            >
              <Image
                src={Flower6}
                alt="decorative-flower-6"
                width={0}
                height={0}
                sizes="100vw"
                className="h-auto"
                loading="lazy"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="absolute top-20 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2"
            >
              <p className="font-[milk-honey] text-2xl text-[#3D3D3D] uppercase">
                Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila
                Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu
                kepada kedua mempelai
              </p>
              <p className="text-xs text-[#3D3D3D] uppercase">Countdown</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Image
                src={Frame}
                alt="section-akad-frame"
                width={0}
                height={0}
                sizes="100vw"
                className="mx-auto h-auto"
                loading="lazy"
              />
            </motion.div>
            <motion.a
              href={'https://maps.app.goo.gl/6i8ZZFUpJDyC1Qw76'}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute -bottom-10 left-1/2 z-11 -translate-x-1/2 text-nowrap text-white uppercase transition-all hover:bg-[#896B58] max-lg:-bottom-[3vw]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1 }}
            >
              <span className="rounded-full border-1 border-[#CF935F] bg-[#8D4F5D] px-4 py-2.5 font-[milk-honey] text-[8px] font-thin">
                Lihat Maps
              </span>
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default SectionCountdown
