import { useEffect } from 'react'
import { useTaskStore } from '@/lib/store' 
import { useToast } from './use-toast'
import { ToastAction } from '@/components/ui/toast'
import { Button } from '@/components/ui/button'
import { format } from 'date-fns'

const useReminder = () => {
  const { tasks, changeStatus, postponeTask, setIsStale } = useTaskStore(
    state => state
  )
  const { toast } = useToast()

  useEffect(() => {
    const staleInterval = setInterval(() => {
      const now = new Date().getTime()
      tasks.forEach(task => {
        if (
          !task.isStale &&
          task.status === 'PROCESS' &&
          new Date(task.date).getTime() <= now
        ) {
          toast({
            title: `🔔 Уже ${format(task.date, 'HH:mm')}: ${task.title}`,
            description: task.description,
            duration: Infinity,
            action: (
              <ToastAction altText='Ok' asChild>
                <div className='flex flex-col gap-2'>
                  <Button
                    size='sm'
                    onClick={() => {
                      changeStatus(task.id, 'DONE')
                    }}
                    data-test-id='toaster-done'
                  >
                    Ок
                  </Button>
                  <Button
                    size='sm'
                    variant='ghost'
                    onClick={() => postponeTask(task.id)}
                    data-test-id='toaster-postpone'
                  >
                    Напомнить позже
                  </Button>
                </div>
              </ToastAction>
            )
          })
          setIsStale(task.id)
          clearInterval(staleInterval)
        }
      })
    }, 1000)

    const expiredInterval = setInterval(() => {
      const now = new Date().getTime()
      tasks.forEach(task => {
        if (
          task.isStale &&
          task.status === 'PROCESS' &&
          new Date(task.date).getTime() + 60 * 60 * 1000 <= now
        ) {
          changeStatus(task.id, 'EXPIRED')
          clearInterval(expiredInterval)
        }
      })
    }, 1000)

    return () => {
      clearInterval(staleInterval)
      clearInterval(expiredInterval)
    }
    // eslint-disable-next-line
  }, [tasks])
}

export default useReminder
