import type { Metadata } from 'next'
import './globals.css'
import { APP_NAME } from '@/lib/constants'

export const metadata: Metadata = {
  title: APP_NAME,
  description: 'Напомни себе о важном, сделай забываемое незабываемым!'
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='ru'>
      <body className='grey-gradient flex h-full items-center justify-center md:h-screen '>
        {children}
      </body>
    </html>
  )
}
