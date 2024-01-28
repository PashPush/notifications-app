import { useEffect } from 'react'
import { useTaskStore, Status } from '@/lib/store'
import { useToast } from './use-toast'
import { format } from 'date-fns'
import { ShowDoneToast } from '@/components/ui/toast'

const useReminder = () => {
  const { tasks, changeStatus, postponeTask, setIsStale } = useTaskStore()
  const { toast } = useToast()

  useEffect(() => {
    const staleInterval = setInterval(() => {
      const now = new Date().getTime()
      tasks.forEach(task => {
        if (
          !task.isStale &&
          task.status === Status.PROCESS &&
          new Date(task.date).getTime() <= now
        ) {
          toast({
            title: `🔔 Уже ${format(task.date, 'HH:mm')}: ${task.title}`,
            description: task.description,
            duration: Infinity,
            action: (
              <ShowDoneToast
                task={task}
                changeStatus={changeStatus}
                postponeTask={postponeTask}
              />
            )
          })
          setIsStale(task.id)
          clearInterval(staleInterval)
          return
        }
        if (
          task.isStale &&
          task.status === Status.PROCESS &&
          new Date(task.date).getTime() + 60 * 60 * 1000 <= now
        ) {
          changeStatus(task.id, Status.EXPIRED)
          clearInterval(staleInterval)
        }
      })
    }, 1000)

    return () => {
      clearInterval(staleInterval)
    }
  }, [tasks])
}

export default useReminder
