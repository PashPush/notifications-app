import Task from './task'
import { TaskT, useTaskStore } from '@/lib/store'
import { memo } from 'react'

const List = memo(({ tasks, title }: { tasks: TaskT[]; title: string }) => {
  const hasSrarch = useTaskStore(state => state.search.length > 0)
  return (
    <article>
      <h2 className='h2-title'>{title}</h2>

      <div className='mt-2 h-[500px] max-w-[400px] flex-1 overflow-scroll rounded-xl bg-gray-700/40 px-3 py-5 sm:w-[400px]'>
        <div className='flex flex-col gap-4'>
          {tasks.length > 0 ? (
            tasks.map(task => <Task key={task.id} {...task} />)
          ) : hasSrarch ? (
            <p className='text-center text-gray-400'>Ничего не найдено</p>
          ) : (
            <p className='text-center text-gray-400'>Пока ничего нет</p>
          )}
        </div>
      </div>
    </article>
  )
})

export default List
