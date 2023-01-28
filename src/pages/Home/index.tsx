import { HandPalm, Play } from 'phosphor-react'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { useContext } from 'react'

import {
  HomeContainer,
  StartCountdownButton,
  StopCountdownButton,
} from './styles'

import { NewTaskForm } from './components/NewTaskForm'
import { Countdown } from './components/Countdown'
import { TasksContext } from '../../contexts/TaskContext'

const newTaskFormValidationSchema = zod.object({
  name: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod
    .number()
    .min(5, 'O ciclo precisa ser de no mínimo 5 minutos.')
    .max(60, 'O ciclo precisa ser de no máximo 60 minutos.'),
})

type NewTaskFormData = zod.infer<typeof newTaskFormValidationSchema>

export function Home() {
  const { activeTask, createNewTask, interruptCurrentTask } =
    useContext(TasksContext)

  const newTaskForm = useForm<NewTaskFormData>({
    resolver: zodResolver(newTaskFormValidationSchema),
    defaultValues: {
      name: '',
      minutesAmount: 0,
    },
  })

  const { handleSubmit, watch, reset } = newTaskForm

  function handleCreateTask(data: NewTaskFormData) {
    createNewTask(data)
    reset()
  }

  const task = watch('name')
  const isSubmitDisable = !task

  return (
    <HomeContainer>
      <form action="" onSubmit={handleSubmit(handleCreateTask)}>
        <FormProvider {...newTaskForm}>
          <NewTaskForm />
        </FormProvider>
        <Countdown />
        {activeTask ? (
          <StopCountdownButton onClick={interruptCurrentTask} type="button">
            <HandPalm size={24} /> Pause
          </StopCountdownButton>
        ) : (
          <StartCountdownButton disabled={isSubmitDisable} type="submit">
            <Play size={24} /> Start
          </StartCountdownButton>
        )}
      </form>
    </HomeContainer>
  )
}
