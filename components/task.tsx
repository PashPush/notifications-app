import { TaskT, Status, useTaskStore } from '@/lib/store'
import { cn } from '@/lib/utils'
import { TrashIcon, Pencil2Icon } from '@radix-ui/react-icons'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale/ru'
import { Button } from './ui/button'
import { memo } from 'react'

const Task = memo(function Task({
  id,
  title,
  description,
  status,
  date,
  isStale
}: TaskT) {
  const removeTask = useTaskStore(state => state.removeTask)
  const setEditingTaskId = useTaskStore(state => state.setEditingTaskId)
  const editingTaskId = useTaskStore(state => state.editingTaskId)
  const changeStatus = useTaskStore(state => state.changeStatus)
  const postponeTask = useTaskStore(state => state.postponeTask)

  const handleEdit = (id: string) => {
    setEditingTaskId(id)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  const handleRemove = (id: string) => {
    removeTask(id)
    setEditingTaskId(null)
  }
  return (
    <div
      className={cn(
        'flex items-start justify-between rounded-lg bg-white px-3 py-2 text-gray-900',
        {
          'border-2 border-sky-500': status === Status.PROCESS,
          'border-2 border-orange-500': status === Status.EXPIRED || isStale,
          'border-2 border-emerald-500': status === Status.DONE,
          'bg-sky-300 ': editingTaskId === id
        }
      )}
    >
      <div className='flex flex-col'>
        <p
          className={`text-sm font-medium  ${isStale && status === Status.PROCESS ? 'text-orange-500' : 'text-gray-700'}`}
        >
          {format(date, 'cccccc, PP HH:mm', { locale: ru })}
        </p>
        <h3 className='max-w-[270px] font-medium text-gray-700'>{title}</h3>
        <p className='text-sm font-light text-gray-500'>{description}</p>
      </div>
      <div className='flex flex-col gap-1'>
        <div className='flex flex-row gap-4'>
          <button className='cursor-pointer' onClick={() => handleEdit(id)}>
            <Pencil2Icon className='size-5  hover:text-green-700' />
          </button>
          <button className='cursor-pointer' onClick={() => handleRemove(id)}>
            <TrashIcon className='size-5 hover:text-red-700' />
          </button>
        </div>
        {isStale && status === Status.PROCESS && (
          <>
            <Button
              onClick={() => changeStatus(id, Status.DONE)}
              variant={'outline'}
              size='sm'
              className='mt-1'
            >
              Ок
            </Button>
            <Button
              onClick={() => postponeTask(id)}
              variant={'outline'}
              size='sm'
            >
              10м+
            </Button>
          </>
        )}
      </div>
    </div>
  )
})

export default Task
