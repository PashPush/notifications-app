import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { nanoid } from 'nanoid'
import { addMinutes, setSeconds } from 'date-fns'

export enum Status {
  PROCESS = 'PROCESS',
  EXPIRED = 'EXPIRED',
  DONE = 'DONE'
}

export enum Sorts {
  DATEASC = 'dateAsc',
  DATEDESC = 'dateDesc',
  TITLEASC = 'titleAsc',
  TITLEDESC = 'titleDesc'
}

export type TaskT = {
  id: string
  title: string
  description?: string
  date: Date
  status: Status
  isStale: boolean
}

export type State = {
  tasks: TaskT[]
  sort: Sorts
  filter: Status
  search: string
  editingTaskId: string | null
}

export type Actions = {
  addTask: (title: string, date: Date, description?: string) => void
  removeTask: (id: string) => void
  editTask: (id: string, updatedTask: TaskT) => void
  setEditingTaskId: (id: string | null) => void
  orderTasks: (orderedTasks: TaskT[]) => void
  setSort: (sort: Sorts) => void
  setFilter: (filter: Status) => void
  setSearch: (search: string) => void
  changeStatus: (id: string, status: Status) => void
  postponeTask: (id: string) => void
  setIsStale: (id: string) => void
}
export const useTaskStore = create<State & Actions>()(
  persist(
    set => ({
      tasks: [],
      sort: Sorts.DATEASC,
      filter: Status.PROCESS,
      search: '',
      editingTaskId: null,
      addTask: (title: string, date: Date, description?: string) => {
        set(state => ({
          tasks: [
            {
              id: nanoid(6),
              title,
              description,
              date,
              status: Status.PROCESS,
              isStale: false
            },
            ...state.tasks
          ]
        }))
      },
      removeTask: (id: string) => {
        set(state => {
          return {
            tasks: state.tasks.filter(task => task.id !== id)
          }
        })
      },
      editTask: (id: string, updatedTask: TaskT) =>
        set(state => {
          return {
            tasks: state.tasks.map(task =>
              task.id !== id ? task : updatedTask
            )
          }
        }),
      setEditingTaskId: (id: string | null) => set({ editingTaskId: id }),
      orderTasks: (orderedTasks: TaskT[]) =>
        set(state => ({ ...state, tasks: [...orderedTasks] })),
      setSort: (sort: Sorts) => set({ sort }),
      setFilter: (filter: Status) => set({ filter }),
      setSearch: (search: string) => set({ search }),
      changeStatus: (id: string, status: Status) =>
        set(state => {
          return {
            tasks: state.tasks.map(task =>
              task.id === id ? { ...task, status } : task
            )
          }
        }),
      postponeTask: id =>
        set(state => ({
          tasks: state.tasks.map(task =>
            task.id === id
              ? {
                  ...task,
                  isStale: false,
                  status: Status.PROCESS,
                  date: new Date(addMinutes(setSeconds(new Date(), 0), 10))
                }
              : task
          )
        })),
      setIsStale: (id: string, isStale = true) =>
        set(state => ({
          tasks: state.tasks.map(task =>
            task.id === id
              ? {
                  ...task,
                  isStale: isStale
                }
              : task
          )
        }))
    }),
    {
      name: 'task-store',
      storage: createJSONStorage(() => localStorage),
      skipHydration: true
    }
  )
)
