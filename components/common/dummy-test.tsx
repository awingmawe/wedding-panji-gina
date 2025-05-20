'use client'

import Image from 'next/image'
import React from 'react'
import BgFrame from '../assets/images/section-gift/bg-section-gift.png'

const DummyTest: React.FC = () => {
  return (
    <section
      className="relative w-full overflow-hidden"
      id="section-gift"
      style={{
        backgroundImage: `url(${BgFrame.src})`,
        backgroundSize: '100%',
      }}
    >
      {/* Container that establishes size */}
      <div className="relative flex aspect-[9/16] w-full flex-col">
        <Image
          src={`${process.env.NEXT_PUBLIC_URL_IMAGE}section-Photo-10.JPEG`}
          alt="section-gift-frame-rekening"
          width={0}
          height={0}
          sizes="100vw"
          className="h-auto w-full"
          loading="lazy"
        />
      </div>
    </section>
  )
}

export default DummyTest
