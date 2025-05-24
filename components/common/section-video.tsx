'use client'

import Flower1 from '@/components/assets/images/section-video/flower-1.svg'
import Flower2 from '@/components/assets/images/section-video/flower-2.svg'
import Flower3 from '@/components/assets/images/section-video/flower-3.svg'
import Flower4 from '@/components/assets/images/section-video/flower-4.svg'
import Frame from '@/components/assets/images/section-video/frame-section-video.svg'
import TextVideo from '@/components/assets/images/section-video/text-video.svg'
import { motion } from 'framer-motion'
import Image from 'next/image'
import React from 'react'

const SectionVideo: React.FC = () => {
  const flipVariant = {
    hidden: { opacity: 0, rotateY: -180 },
    visible: (i: number) => ({
      opacity: 1,
      rotateY: 0,
      transition: {
        delay: 0.2 + i * 0.1,
        duration: 0.8,
      },
    }),
  }
  return (
    <section className="relative w-full" id="section-video">
      {/* Container that establishes size */}
      <div className="relative grid aspect-[9/16] w-full">
        <div className="absolute h-auto w-full">
          <Image
            src={`${process.env.NEXT_PUBLIC_URL_IMAGE}bg-section-video.svg`}
            alt="section-video-background-frame"
            width={0}
            height={0}
            sizes="100vw"
            className="h-auto w-full"
            loading="lazy"
          />
        </div>
        <div className="absolute right-0 z-11 h-auto">
          <Image
            src={TextVideo}
            alt="section-video-text"
            width={0}
            height={0}
            sizes="100vw"
            className="h-auto w-full"
            loading="lazy"
          />
        </div>
        <div className="relative mt-20 h-[250px] w-full">
          <Image
            src={Frame}
            alt="section-video-frame"
            width={0}
            height={0}
            loading="lazy"
            className="h-auto w-full"
          />
          <div className="absolute -bottom-10 left-1/2 h-[270px] w-full max-w-[400px] min-w-[280px] -translate-x-1/2 rounded-lg max-[400px]:top-[2vw]">
            <iframe
              src="https://www.youtube.com/embed/4I-BUN-swrA?si=xDVyxa_wawLhSMDG&amp;autoplay=1"
              title="YouTube video player"
              allow="autoplay;  gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              className="h-full w-full rounded-lg"
            ></iframe>
          </div>
          <motion.div
            className="absolute right-0 -bottom-60 z-11 max-[400]:-bottom-20"
            variants={flipVariant}
            initial="hidden"
            whileInView="visible"
            custom={1}
            viewport={{ once: false }}
            style={{ perspective: '500px' }}
          >
            <Image
              src={Flower1}
              alt="section-video-flower-1"
              width={0}
              height={0}
              loading="lazy"
              className="h-auto"
            />
          </motion.div>
          <motion.div
            className="absolute -right-2 -bottom-50 h-auto max-[400px]:-bottom-10"
            variants={flipVariant}
            initial="hidden"
            whileInView="visible"
            custom={1}
            viewport={{ once: false }}
            style={{ perspective: '500px' }}
          >
            <Image
              src={Flower2}
              alt="section-video-flower-2"
              width={0}
              height={0}
              loading="lazy"
              className="h-auto"
            />
          </motion.div>
          <motion.div
            className="absolute -bottom-60 -left-5 z-11 h-auto max-[400px]:-bottom-30"
            variants={flipVariant}
            initial="hidden"
            whileInView="visible"
            custom={1}
            viewport={{ once: false }}
            style={{ perspective: '500px' }}
          >
            <Image
              src={Flower3}
              alt="section-video-flower-3"
              width={0}
              height={0}
              loading="lazy"
              className="h-auto"
            />
          </motion.div>
          <motion.div
            className="absolute -left-10 h-auto max-[400px]:-bottom-20"
            variants={flipVariant}
            initial="hidden"
            whileInView="visible"
            custom={1}
            viewport={{ once: false }}
            style={{ perspective: '500px' }}
          >
            <Image
              src={Flower4}
              alt="section-video-flower-4"
              width={0}
              height={0}
              loading="lazy"
              className="h-auto"
            />
          </motion.div>
        </div>
        <Image
          src={`${process.env.NEXT_PUBLIC_URL_IMAGE}section-video-foto.svg`}
          alt="section-video-foto"
          width={0}
          height={0}
          sizes="100vw"
          className="absolute bottom-0 z-10 h-auto w-full"
          loading="lazy"
        />
      </div>
    </section>
  )
}

export default SectionVideo
