import { useEffect, useState } from 'react'
import { Input } from './ui/input'
import { useTaskStore } from '@/lib/store'

const Search = () => {
  const { search, setSearch } = useTaskStore(state => state)

  const [searchInput, setSearchInput] = useState('')

  useEffect(() => {
    let timer: NodeJS.Timeout | undefined
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      setSearch(searchInput)
    }, 300)

    return () => clearTimeout(timer)
    // eslint-disable-next-line
  }, [searchInput])

  return (
    <div className='grid w-full gap-4 px-4 pb-2 pt-4 sm:w-[400px] md:w-[360px] md:pt-8'>
      <Input
        placeholder='Поиск...'
        className='col-span-4 bg-white/30 placeholder:text-white'
        onChange={e => setSearchInput(e.target.value)}
        value={searchInput}
      />
    </div>
  )
}

export default Search
