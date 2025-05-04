'use client'

import BgSectionStory from '@/components/assets/images/section-story/bg-section-story.png'
import Chapter1 from '@/components/assets/images/section-story/chapter-1-story.png'
import Chapter2 from '@/components/assets/images/section-story/chapter-2-story.png'
import Chapter3 from '@/components/assets/images/section-story/chapter-3-story.png'
import Chapter4 from '@/components/assets/images/section-story/chapter-4-story.png'
import Chapter5 from '@/components/assets/images/section-story/chapter-5-story.png'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/components/ui/carousel'
import { cn } from '@/lib/utils'
import Image, { StaticImageData } from 'next/image'
import React, { useState } from 'react'

// Define the story chapter type
interface StoryChapter {
  id: number
  title: string
  subtitle: string
  bgTitle: string
  image: StaticImageData
}

// Create an array of story chapters
const storyChapters: StoryChapter[] = [
  {
    id: 1,
    title: 'Chapter 1',
    subtitle: 'HEY!! NICE TO MEET YOU',
    bgTitle: '#703F4E',
    image: Chapter1,
  },
  {
    id: 2,
    title: 'Chapter 2',
    subtitle: 'KINDA A DATE?',
    bgTitle: '#664550',
    image: Chapter2,
  },
  {
    id: 3,
    title: 'Chapter 3',
    subtitle: '“ JUST THE TWO OF US “',
    bgTitle: '#80423C',
    image: Chapter3,
  },
  {
    id: 4,
    title: 'Chapter 4',
    subtitle: 'LOVE IN DIFFERENT TIME ZONES',
    bgTitle: '#6D394E',
    image: Chapter4,
  },
  {
    id: 5,
    title: 'Chapter 5',
    subtitle: 'A NEW CHAPTER BEGINS',
    bgTitle: '#85352F',
    image: Chapter5,
  },
]

const SectionStory: React.FC = () => {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)

  React.useEffect(() => {
    if (!api) {
      return
    }

    const handleSelect = () => {
      setCurrent(api.selectedScrollSnap())
    }

    api.on('select', handleSelect)

    // Cleanup
    return () => {
      api.off('select', handleSelect)
    }
  }, [api])

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

        <div className="absolute top-1/2 left-1/2 w-[320px] -translate-x-1/2 -translate-y-1/2">
          <Carousel setApi={setApi} className="w-full">
            <CarouselContent>
              {storyChapters.map((chapter) => (
                <CarouselItem key={chapter.id} className="flex flex-col">
                  {/* TITLE */}
                  <div
                    style={{ backgroundColor: chapter.bgTitle }}
                    className="flex w-[310px] flex-col items-center justify-center rounded-tl-[20px] rounded-tr-[20px] p-2"
                  >
                    <p className="text-sm text-white uppercase">
                      {chapter.title}
                    </p>
                    <p className="text-white">{chapter.subtitle}</p>
                  </div>
                  <div className="grid h-auto w-[310px] content-center bg-[#E2E1E0] p-2">
                    {/* CONTENT CHAPTER */}
                    <Image
                      src={chapter.image}
                      loading="lazy"
                      alt={`${chapter.title}-story`}
                      width={310}
                      height={447}
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>

          {/* Dots navigation */}
          <div className="mt-4 flex justify-center gap-2">
            {storyChapters.map((_, index) => (
              <button
                key={index}
                onClick={() => api?.scrollTo(index)}
                className={cn(
                  'h-3 w-3 rounded-full transition-all',
                  current === index ? 'bg-white' : 'bg-[#F2D5BD]'
                )}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 bg-[#A0828E] px-10 py-4">
          <p className="text-white uppercase">Our Story</p>
        </div>
      </div>
    </section>
  )
}

export default SectionStory
