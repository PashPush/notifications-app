'use client'
import { APP_NAME } from '@/lib/constants'
import { useTaskStore } from '@/lib/store'
import { useEffect } from 'react'

const useTitleRefresher = () => {
  const tasks = useTaskStore(state => state.tasks)
  const newNotifications = tasks.filter(
    task => task.status === 'PROCESS' && task.isStale
  )

  useEffect(() => {
    const favicon = document.querySelector(
      "link[rel~='icon']"
    ) as HTMLLinkElement
    if (newNotifications.length > 0) {
      document.title = `(${newNotifications.length} нов.) ${APP_NAME}`
      favicon.href = '/favicon-new.ico'
    } else {
      document.title = APP_NAME
      favicon.href = '/favicon-main.ico'
    }
  }, [tasks, newNotifications.length])
}

export default useTitleRefresher
