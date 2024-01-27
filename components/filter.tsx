import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { StatusT, useTaskStore } from '@/lib/store'

export default function Filter() {
  const { setFilter, setEditingTaskId } = useTaskStore(state => state)

  const handleFilterChange = (e: StatusT) => {
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
          <SelectItem value='PROCESS'>Ожидаемые</SelectItem>
          <SelectItem value='DONE'>Выполненные</SelectItem>
          <SelectItem value='EXPIRED'>Пропущенные</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
