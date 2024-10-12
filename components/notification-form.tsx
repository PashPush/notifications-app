'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from './ui/textarea'

import { useTaskStore, Status } from '@/lib/store'
import { DateTimePicker } from './ui/TimePicker/date-time-picker'
import { useEffect, useMemo, useState } from 'react'
import { getInitialDate } from '@/lib/utils'

export default function NotificationForm() {
  const {
    addTask,
    editingTaskId,
    setEditingTaskId,
    editTask,
    setSearch,
    tasks
  } = useTaskStore()

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [date, setDate] = useState<Date>(() => getInitialDate())

  const isError = useMemo(() => date < new Date(), [date])

  useEffect(() => {
    const task = tasks.find(task => task.id === editingTaskId)

    if (editingTaskId && task) {
      setTitle(task.title)
      setDescription(task.description || '')
      setDate(new Date(task.date))
    }
  }, [editingTaskId, tasks])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (isError) {
      return
    }

    if (!title) return

    if (editingTaskId) {
      editTask(editingTaskId, {
        id: editingTaskId,
        title,
        description,
        date,
        status: Status.PROCESS,
        isStale: false
      })
      setEditingTaskId(null)
    } else {
      addTask(title, date, description)
    }

    setSearch('')
  }

  const handleCancel = () => {
    setEditingTaskId(null)
  }

  return (
    <aside className='flex flex-col'>
      <h2 className='h2-title'>
        {editingTaskId ? 'Изменить напоминание' : 'О чем ты хочешь не забыть?'}
      </h2>
      <form
        className='flex max-w-[400px] flex-col gap-4 px-4 py-4 sm:w-[400px] md:w-[360px] md:py-8'
        onSubmit={handleSubmit}
      >
        <div className='flex flex-col items-center gap-4'>
          <Input
            id='title'
            name='title'
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder='О чем?*'
            className='col-span-4 bg-white/30 placeholder:text-white'
          />
        </div>
        <div className='flex flex-col items-center gap-4'>
          <Textarea
            id='description'
            name='description'
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder='Зачем?'
            className='col-span-4 bg-white/30 placeholder:text-white'
          />
        </div>
        <div
          className={`flex flex-col items-center gap-4 ${isError && 'outline outline-2 outline-red-500'}`}
        >
          <DateTimePicker date={date} setDate={setDate} />
        </div>
        {editingTaskId ? (
          <>
            <Button
              type='button'
              className=' bg-yellow-100 hover:bg-yellow-300'
              size='sm'
              variant='secondary'
              onClick={handleCancel}
            >
              Отмена
            </Button>
            <Button
              type='submit'
              className=' bg-green-100 hover:bg-green-300'
              size='sm'
              variant='secondary'
            >
              Сохранить изменения
            </Button>
          </>
        ) : (
          <Button type='submit' size='sm' variant='secondary'>
            Добавить напоминание
          </Button>
        )}
      </form>
    </aside>
  )
}
