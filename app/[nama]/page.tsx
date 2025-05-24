import SectionAkad from '@/components/common/section-akad'
import SectionAttire from '@/components/common/section-attire'
import SectionBride from '@/components/common/section-bride'
import SectionCountdown from '@/components/common/section-countdown'
import SectionDoa from '@/components/common/section-doa'
import SectionGift from '@/components/common/section-gift'
import SectionGroom from '@/components/common/section-groom'
import SectionHome from '@/components/common/section-home-with-loading'
import SectionKonfirmasi from '@/components/common/section-konfirmasi'
import SectionPengantin from '@/components/common/section-pengantin'
import SectionPesan from '@/components/common/section-pesan'
import SectionPhoto from '@/components/common/section-photo'
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
    <main className="container min-h-screen overflow-x-hidden">
      <SectionHome name={nama} />

      <SectionPengantin />

      <SectionStory />

      <SectionDoa />

      <SectionBride />

      <SectionGroom />

      <SectionCountdown />

      <SectionAkad />

      <SectionKonfirmasi />

      <SectionAttire />

      <SectionPhoto />

      <SectionGift />

      <SectionPesan />
    </main>
  )
}

export default Page
