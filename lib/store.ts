import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { nanoid } from 'nanoid'
import { addMinutes, setSeconds } from 'date-fns'

export type StatusT = 'PROCESS' | 'EXPIRED' | 'DONE'

export type TaskT = {
  id: string
  title: string
  description?: string
  date: Date
  status: StatusT
  isStale: boolean
}

export type SortT = 'dateAsc' | 'dateDesc' | 'titleAsc' | 'titleDesc'

export type State = {
  tasks: TaskT[]
  sort: SortT
  filter: StatusT
  search: string
  editingTaskId: string | null
}

export type Actions = {
  addTask: (title: string, date: Date, description?: string) => void
  removeTask: (id: string) => void
  editTask: (id: string, updatedTask: TaskT) => void
  setEditingTaskId: (id: string | null) => void
  orderTasks: (orderedTasks: TaskT[]) => void
  setSort: (sort: SortT) => void
  setFilter: (filter: StatusT) => void
  setSearch: (search: string) => void
  changeStatus: (id: string, status: StatusT) => void
  postponeTask: (id: string) => void
  setIsStale: (id: string) => void
}
export const useTaskStore = create<State & Actions>()(
  persist(
    set => ({
      tasks: [],
      sort: 'dateAsc',
      filter: 'PROCESS',
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
              status: 'PROCESS',
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
          const filteredState = state.tasks.filter(task => task.id !== id)
          return {
            tasks: [updatedTask, ...filteredState]
          }
        }),
      setEditingTaskId: (id: string | null) => set({ editingTaskId: id }),
      orderTasks: (orderedTasks: TaskT[]) =>
        set(state => ({ ...state, tasks: [...orderedTasks] })),
      setSort: (sort: SortT) => set({ sort }),
      setFilter: (filter: StatusT) => set({ filter }),
      setSearch: (search: string) => set({ search }),
      changeStatus: (id: string, status: StatusT) =>
        set(state => {
          const doneTask = state.tasks.find(task => task.id === id) as TaskT
          const filteredState = state.tasks.filter(task => task.id !== id)
          return {
            tasks: [{ ...doneTask, status: status }, ...filteredState]
          }
        }),
      postponeTask: id =>
        set(state => ({
          tasks: state.tasks.map(task =>
            task.id === id
              ? {
                  ...task,
                  isStale: false,
                  status: 'PROCESS',
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
