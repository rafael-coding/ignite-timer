import { FormContainer, MinutesAmountInput, TaskInput } from './styles'
import { useContext } from 'react'
import { useFormContext } from 'react-hook-form'
import { TasksContext } from '../../../../contexts/TaskContext'

export function NewTaskForm() {
  const { activeTask } = useContext(TasksContext)
  const { register } = useFormContext()

  return (
    <FormContainer>
      <label htmlFor="name">Vou trabalhar em</label>
      <TaskInput
        id="name"
        list="task-suggestions"
        placeholder="Dê um nome para o seu projeto"
        disabled={!!activeTask}
        {...register('name')}
      />

      <datalist id="task-suggestions">
        <option value="Projeto 1" />
        <option value="Projeto 2" />
        <option value="Projeto 3" />
      </datalist>

      <label htmlFor="minutesAmount">durante</label>
      <MinutesAmountInput
        type="number"
        id="minutesAmount"
        placeholder="00"
        step={5}
        min={5}
        max={60}
        disabled={!!activeTask}
        {...register('minutesAmount', { valueAsNumber: true })}
      />
      <span>minutos.</span>
    </FormContainer>
  )
}
