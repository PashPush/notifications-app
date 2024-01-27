'use client'
import { useEffect, useMemo } from 'react'
import List from './list'
import { StatusT, useTaskStore } from '@/lib/store'
import { compareAsc, compareDesc } from 'date-fns'
import useReminder from '@/hooks/use-reminder'
import useTitleRefresher from '@/hooks/use-title-refresher'
import { Sidebar } from './sidebar'

export default function Columns() {
  const { sort, search, filter, tasks, setSort, setFilter, setEditingTaskId } =
    useTaskStore(state => state)
  const filteredTasks = useMemo(
    () =>
      tasks
        .filter(
          task =>
            task.status === filter &&
            (task.title.includes(search) || task.description?.includes(search))
        )
        .sort((a, b) => {
          if (sort === 'dateAsc') return compareAsc(a.date, b.date)
          if (sort === 'dateDesc') return compareDesc(a.date, b.date)
          if (sort === 'titleAsc') return a.title < b.title ? -1 : 1
          if (sort === 'titleDesc') return a.title > b.title ? -1 : 1
          return 0
        }),
    [tasks, filter, sort, search]
  )

  function getTitleForList(status: StatusT) {
    switch (status) {
      case 'PROCESS':
        return 'Ожидаемые напоминания'
      case 'EXPIRED':
        return 'Пропущенные напоминания'
      case 'DONE':
        return 'Выполненные напоминания'
    }
  }

  useReminder()
  useTitleRefresher()

  useEffect(() => {
    useTaskStore.persist.rehydrate()
    setSort('dateAsc')
    setFilter('PROCESS')
    setEditingTaskId(null)
    // eslint-disable-next-line
  }, [])

  return (
    <section className='flex flex-col gap-4 md:flex-row'>
      <Sidebar />
      <List tasks={filteredTasks} title={getTitleForList(filter)} />
    </section>
  )
}
