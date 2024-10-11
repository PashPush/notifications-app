'use client'
import { useEffect, useMemo } from 'react'
import List from './list'
import { Sorts, Status, useTaskStore } from '@/lib/store'
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
            (task.title.includes(search.toLowerCase()) ||
              task.description?.includes(search.toLowerCase()))
        )
        .sort((a, b) => {
          switch (sort) {
            case Sorts.DATEASC:
              return compareAsc(a.date, b.date)
            case Sorts.DATEDESC:
              return compareDesc(a.date, b.date)
            case Sorts.TITLEASC:
              return a.title < b.title ? -1 : 1
            case Sorts.TITLEDESC:
              return a.title > b.title ? -1 : 1
          }
        }),
    [tasks, filter, sort, search]
  )

  function getTitleForList(status: Status) {
    switch (status) {
      case Status.PROCESS:
        return 'Ожидаемые напоминания'
      case Status.EXPIRED:
        return 'Пропущенные напоминания'
      case Status.DONE:
        return 'Выполненные напоминания'
    }
  }

  useReminder()
  useTitleRefresher()

  useEffect(() => {
    useTaskStore.persist.rehydrate()
    setSort(Sorts.DATEASC)
    setFilter(Status.PROCESS)
    setEditingTaskId(null)
  }, [])

  return (
    <section className='flex flex-col gap-4 md:flex-row'>
      <Sidebar />
      <List tasks={filteredTasks} title={getTitleForList(filter)} />
    </section>
  )
}
