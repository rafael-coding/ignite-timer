import { Task } from './tasks'

export enum ActionTypes {
  ADD_NEW_TASK = 'ADD_NEW_TASK',
  INTERRUPT_CURRENT_TASK = 'INTERRUPT_CURRENT_TASK',
  MARK_CURRENT_TASK_AS_FINISHED = 'MARK_CURRENT_TASK_AS_FINISHED',
}

export function addNewTaskAction(newTask: Task) {
  return {
    type: ActionTypes.ADD_NEW_TASK,
    payload: {
      newTask,
    },
  }
}

export function markCurrentTaskAsFinishedAction() {
  return {
    type: ActionTypes.MARK_CURRENT_TASK_AS_FINISHED,
  }
}

export function interruptCurrentTaskAction() {
  return {
    type: ActionTypes.INTERRUPT_CURRENT_TASK,
  }
}
