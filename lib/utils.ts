import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getInitialDate() {
  const date = new Date()
  date.setDate(date.getDate() + 1)
  date.setHours(8)
  date.setMinutes(0)
  date.setSeconds(0)
  return date
}
