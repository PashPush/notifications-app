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
      <body className='flex h-full items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-400 to-slate-900 md:h-screen'>
        {children}
      </body>
    </html>
  )
}
