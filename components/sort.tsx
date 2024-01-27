import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { SortT, useTaskStore } from '@/lib/store'

export default function Sort() {
  const { setSort, setEditingTaskId } = useTaskStore(state => state)

  const handleSortChange = (e: SortT) => {
    setSort(e)
    setEditingTaskId(null)
  }

  return (
    <Select onValueChange={handleSortChange}>
      <SelectTrigger className='w-[150px]'>
        <SelectValue placeholder='Ближние даты' />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Отсортировать по:</SelectLabel>
          <SelectItem value='dateAsc'>Ближние даты</SelectItem>
          <SelectItem value='dateDesc'>Далёкие даты</SelectItem>
          <SelectItem value='titleAsc'>От А до Я</SelectItem>
          <SelectItem value='titleDesc'>От Я до А</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
