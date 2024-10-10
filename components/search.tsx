import { useEffect, useState } from 'react'
import { Input } from './ui/input'
import { useTaskStore } from '@/lib/store'
import { Cross1Icon } from '@radix-ui/react-icons'

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
    <div className='relative mt-4 flex w-full gap-4 px-4 pb-2 sm:w-[400px] md:mt-8 md:w-[360px]'>
      <Input
        placeholder='Поиск...'
        className='col-span-4 bg-white/30 placeholder:text-white'
        onChange={e => setSearchInput(e.target.value)}
        value={searchInput}
      />
      {searchInput && (
        <Cross1Icon
          onClick={() => setSearchInput('')}
          className='absolute right-7 top-3 size-3 cursor-pointer text-white'
        />
      )}
    </div>
  )
}

export default Search
