import OrientationLock from '@/lib/useDisableLandscape'
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Wedding Invitation | Gina & Panji',
  description: 'Wedding invitation for Gina & Panji',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`mx-auto max-w-md shadow-lg`}>
        <OrientationLock />
        {children}
      </body>
    </html>
  )
}
