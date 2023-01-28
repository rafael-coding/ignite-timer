import { differenceInSeconds } from 'date-fns'
import {
  createContext,
  ReactNode,
  useEffect,
  useReducer,
  useState,
} from 'react'
import {
  ActionTypes,
  addNewTaskAction,
  interruptCurrentTaskAction,
  markCurrentTaskAsFinishedAction,
} from '../reducers/tasks/actions'
import { Task, tasksReducer } from '../reducers/tasks/tasks'

interface CreateTaskData {
  name: string
  minutesAmount: number
}

interface TasksContextType {
  tasks: Task[]
  activeTask: Task | undefined
  activeTaskId: string | null
  amountSecondsPassed: number
  markCurrentTaskAsFinished: () => void
  setSecondsPassed: (seconds: number) => void
  createNewTask: (data: CreateTaskData) => void
  interruptCurrentTask: () => void
}

export const TasksContext = createContext({} as TasksContextType)

interface TasksContextProviderProps {
  children: ReactNode
}

export function TasksContextProvider({ children }: TasksContextProviderProps) {
  const [tasksState, dispatch] = useReducer(
    tasksReducer,
    {
      tasks: [],
      activeTaskId: null,
    },
    () => {
      const storedStateAsJSON = localStorage.getItem(
        '@ignite-timer:tasks-state-1.0.0',
      )

      if (storedStateAsJSON) {
        return JSON.parse(storedStateAsJSON)
      }
    },
  )

  const { tasks, activeTaskId } = tasksState
  const activeTask = tasks.find((task) => task.id === activeTaskId)

  const [amountSecondsPassed, setAmountSecondsPassed] = useState(() => {
    if (activeTask) {
      return differenceInSeconds(new Date(), new Date(activeTask.startDate))
    }
    return 0
  })

  useEffect(() => {
    const stateJSON = JSON.stringify(tasksState)

    localStorage.setItem('@ignite-timer:tasks-state-1.0.0', stateJSON)
  }, [tasksState])

  function setSecondsPassed(seconds: number) {
    setAmountSecondsPassed(seconds)
  }

  function markCurrentTaskAsFinished() {
    dispatch(markCurrentTaskAsFinishedAction())
  }

  function createNewTask(data: CreateTaskData) {
    const id = String(new Date().getTime())

    const newTask: Task = {
      id,
      name: data.name,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    }

    dispatch(addNewTaskAction(newTask))

    setAmountSecondsPassed(0)
  }

  function interruptCurrentTask() {
    dispatch(interruptCurrentTaskAction())
  }

  return (
    <TasksContext.Provider
      value={{
        tasks,
        activeTask,
        activeTaskId,
        markCurrentTaskAsFinished,
        amountSecondsPassed,
        setSecondsPassed,
        createNewTask,
        interruptCurrentTask,
      }}
    >
      {children}
    </TasksContext.Provider>
  )
}
