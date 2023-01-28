import { ActionTypes } from './actions'

export interface Task {
  id: string
  name: string
  minutesAmount: number
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
}

interface TaskState {
  tasks: Task[]
  activeTaskId: string | null
}

export function tasksReducer(state: TaskState, action: any) {
  switch (action.type) {
    case ActionTypes.ADD_NEW_TASK:
      return {
        ...state,
        tasks: [...state.tasks, action.payload.newTask],
        activeTaskId: action.payload.newTask.id,
      }
    case ActionTypes.INTERRUPT_CURRENT_TASK:
      return {
        ...state,
        tasks: state.tasks.map((task) => {
          if (task.id === state.activeTaskId) {
            return { ...task, interruptedDate: new Date() }
          } else {
            return task
          }
        }),
        activeTaskId: null,
      }
    case ActionTypes.MARK_CURRENT_TASK_AS_FINISHED:
      return {
        ...state,
        tasks: state.tasks.map((task) => {
          if (task.id === state.activeTaskId) {
            return { ...task, finishedDate: new Date() }
          } else {
            return task
          }
        }),
        activeTaskId: null,
      }
    default:
      return state
  }
}
