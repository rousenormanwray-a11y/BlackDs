import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'BLVKDOT - ONE SHOT. ONE KING.',
  description: 'BLVKDOT - The ultimate snooker experience. Claim your free game and join the elite.',
  keywords: 'snooker, blvkdot, free game, promo, redemption',
  authors: [{ name: 'BLVKDOT Team' }],
  openGraph: {
    title: 'BLVKDOT - ONE SHOT. ONE KING.',
    description: 'The ultimate snooker experience. Claim your free game and join the elite.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BLVKDOT - ONE SHOT. ONE KING.',
    description: 'The ultimate snooker experience. Claim your free game and join the elite.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-black text-white min-h-screen`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}