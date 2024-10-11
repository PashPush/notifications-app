import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Status, useTaskStore } from '@/lib/store'

export default function Filter() {
  const { setFilter, setEditingTaskId } = useTaskStore(state => state)

  const handleFilterChange = (e: Status) => {
    setFilter(e)
    setEditingTaskId(null)
  }

  return (
    <Select onValueChange={handleFilterChange}>
      <SelectTrigger className='w-[150px]'>
        <SelectValue placeholder='Ожидаемые' />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Отфильтровать по:</SelectLabel>
          <SelectItem value={Status.PROCESS}>Ожидаемые</SelectItem>
          <SelectItem value={Status.DONE}>Выполненные</SelectItem>
          <SelectItem value={Status.EXPIRED}>Пропущенные</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
