import React, { useEffect, useState } from 'react'
import NotificationForm from './notification-form'
import Sort from './sort'
import Filter from './filter'
import Search from './search'
import { useTaskStore } from '@/lib/store'

export const Sidebar = () => {
  const [notificationFormKey, setNotificationFormKey] = useState(0)
  const editingTaskId = useTaskStore(store => store.editingTaskId)

  useEffect(() => {
    setNotificationFormKey(key => key + 1)
  }, [editingTaskId])

  return (
    <div>
      <NotificationForm key={notificationFormKey} />
      <div className='flex justify-between gap-4 px-4'>
        <Sort />
        <Filter />
      </div>
      <Search />
    </div>
  )
}
