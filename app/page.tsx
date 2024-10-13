import Columns from '@/components/columns'
import { Toaster } from '@/components/ui/toaster'

export default function Home() {
  return (
    <main className='flex py-6 text-white'>
      <div className='mx-auto min-w-[360px] max-w-7xl px-6'>
        <Columns />
        <Toaster />
      </div>
    </main>
  )
}
