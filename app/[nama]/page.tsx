import SectionBride from '@/components/common/section-bride'
import SectionCountdown from '@/components/common/section-countdown'
import SectionDoa from '@/components/common/section-doa'
import SectionGroom from '@/components/common/section-groom'
import SectionHome from '@/components/common/section-home-with-loading'
import SectionPengantin from '@/components/common/section-pengantin'
import SectionStory from '@/components/common/section-story'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { FC } from 'react'

// Update the interface to use Promise for params
interface PageProps {
  params: Promise<{
    nama: string
  }>
}

export const metadata: Metadata = {
  title: 'Wedding Invitation | Gina & Panji',
  description: 'Wedding invitation for Gina & Panji',
}

// The rest of your code remains the same
const Page: FC<PageProps> = async ({ params }) => {
  const { nama } = await params

  if (!nama) {
    notFound()
  }

  // const decodedNama = decodeURIComponent(nama)

  return (
    <main className="container min-h-screen ">
      <SectionHome name={nama} />

      <SectionPengantin />

      <SectionStory />

      <SectionDoa />

      <SectionGroom />

      <SectionBride />

      <SectionCountdown />
    </main>
  )
}

export default Page
