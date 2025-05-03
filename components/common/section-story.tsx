'use client'

import BgSectionStory from '@/components/assets/images/section-story/bg-section-story.png'
import Chapter1 from '@/components/assets/images/section-story/chapter-1-story.svg'
import Image from 'next/image'
import React from 'react'

const SectionStory: React.FC = () => {
  return (
    <section className="section-story overflow-hidden" id="section-story">
      <div className="relative aspect-9/16 w-full">
        <Image
          src={BgSectionStory}
          loading="lazy"
          alt="bg-section-story"
          width={0}
          height={0}
          sizes="100vw"
          className="h-auto w-full"
        />
        <div className="absolute top-1/2 left-1/2 h-auto w-[300px] -translate-x-1/2 -translate-y-1/2">
          <Image
            src={Chapter1}
            loading="lazy"
            alt="chapter-1-story"
            width={0}
            height={0}
            sizes="100vw"
            className="h-auto w-full"
          />
        </div>
      </div>
    </section>
  )
}

export default SectionStory
