import SectionHome from '@/components/common/section-home'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { FC } from 'react'

interface PageProps {
  params: {
    nama: string
  }
}

export const metadata: Metadata = {
  title: 'Wedding Invitation | Gina & Panji',
  description: 'Wedding invitation for Gina & Panji',
}

const Page: FC<PageProps> = async ({ params }) => {
  const { nama } = await params

  if (!nama) {
    notFound()
  }

  const decodedNama = decodeURIComponent(nama)

  return (
    <main className="container min-h-screen ">
      {/* <LoadingScreen /> */}
      <SectionHome />
    </main>
  )
}

export default Page
