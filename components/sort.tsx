import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Sorts, useTaskStore } from '@/lib/store'

export default function Sort() {
  const { setSort, setEditingTaskId } = useTaskStore(state => state)

  const handleSortChange = (e: Sorts) => {
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
          <SelectItem value={Sorts.DATEASC}>Ближние даты</SelectItem>
          <SelectItem value={Sorts.DATEDESC}>Далёкие даты</SelectItem>
          <SelectItem value={Sorts.TITLEASC}>От А до Я</SelectItem>
          <SelectItem value={Sorts.TITLEDESC}>От Я до А</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
