import React, { useEffect, useState } from 'react'
import NotificationForm from './notification-form'
import Sort from './sort'
import Filter from './filter'
import Search from './search'

export const Sidebar = () => {
  return (
    <div>
      <NotificationForm />
      <div className='flex justify-between gap-4 px-4'>
        <Sort />
        <Filter />
      </div>
      <Search />
    </div>
  )
}
