'use client'

import { add } from 'date-fns'
import { ru } from 'date-fns/locale/ru'

import { Calendar as CalendarIcon } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { TimePickerDemo } from './time-picker-demo'

type DateTimePickerProps = {
  date: Date
  setDate: (date: Date) => void
}

export function DateTimePicker({ date, setDate }: DateTimePickerProps) {
  const handleSelect = (newDay: Date | undefined) => {
    if (!newDay) return
    if (!date) {
      setDate(newDay)
      return
    }
    const diff = newDay.getTime() - date.getTime()
    const diffInDays = diff / (1000 * 60 * 60 * 24)
    const newDateFull = add(date, { days: Math.ceil(diffInDays) })
    setDate(newDateFull)
  }

  const today = new Date()
  const yesterday = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  )

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          data-test-id='date-time-picker'
          className={cn(
            'w-full justify-center text-left font-normal text-slate-900 ',
            !date && 'text-muted-foreground'
          )}
          suppressHydrationWarning
        >
          <CalendarIcon className='mr-2 size-4 text-slate-900' />
          {date ? (
            Intl.DateTimeFormat('ru-RU', {
              day: 'numeric',
              weekday: 'short',
              month: 'long',
              year: 'numeric',
              hour: 'numeric',
              minute: 'numeric'
            }).format(date)
          ) : (
            <span className='text-slate-900'>Когда?</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-auto p-0'>
        <Calendar
          locale={ru}
          mode='single'
          selected={date}
          onSelect={d => handleSelect(d)}
          disabled={date => date < yesterday || date < new Date('1900-01-01')}
          initialFocus
        />
        <div className='border-border flex justify-center border-t p-3'>
          <TimePickerDemo setDate={setDate} date={date} />
        </div>
      </PopoverContent>
    </Popover>
  )
}
