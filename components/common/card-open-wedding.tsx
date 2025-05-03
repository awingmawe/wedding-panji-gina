'use client'

import BgCardOpenWedding from '@/components/assets/images/card-open-wedding/bg-card-open-wedding.png'
import TextPanjiGina from '@/components/assets/images/card-open-wedding/text-panji-gina.png'
import { motion } from 'framer-motion'
import Image from 'next/image'
import React from 'react'

const CardOpenWedding: React.FC<{ name: string; loading: boolean }> = ({
  name,
  loading,
}) => {
  return (
    <div className="relative aspect-9/16 w-full" id="card-open-wedding">
      <Image
        src={BgCardOpenWedding}
        loading="lazy"
        alt="bg-card-open-wedding"
        width={0}
        height={0}
        sizes="100vw"
        className="h-screen w-full"
      />
      <div className="absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-8">
        <Image
          src={TextPanjiGina}
          loading="lazy"
          alt="text-panji-gina"
          width={0}
          height={0}
          sizes="100vw"
          className="h-auto w-[400px]"
        />
        <motion.button
          className="cursor-pointer rounded-[10px] bg-[#894839] px-[50px] py-3 text-center font-[minecraft] text-lg font-normal text-nowrap text-white uppercase"
          initial={{ opacity: 0 }}
          transition={{ duration: 1, delay: 6 }}
          animate={{ opacity: loading ? 0 : 1 }}
        >
          Lihat Undangan
        </motion.button>
      </div>
    </div>
  )
}

export default CardOpenWedding
