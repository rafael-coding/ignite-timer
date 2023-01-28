import { useContext } from 'react'
import { formatDistanceToNow } from 'date-fns'
import { TasksContext } from '../../contexts/TaskContext'
import { HistoryContainer, HistoryList, Status } from './styles'

export function History() {
  const { tasks } = useContext(TasksContext)

  return (
    <HistoryContainer>
      <h1>History</h1>

      <HistoryList>
        <table>
          <thead>
            <tr>
              <th>Task</th>
              <th>Time</th>
              <th>Created at</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => {
              return (
                <tr key={task.id}>
                  <td>{task.name}</td>
                  <td>{task.minutesAmount} minutos</td>
                  <td>
                    {formatDistanceToNow(new Date(task.startDate), {
                      addSuffix: true,
                    })}
                  </td>
                  <td>
                    {task.finishedDate && (
                      <Status statusColor="green">Done</Status>
                    )}
                    {task.interruptedDate && (
                      <Status statusColor="red">Blocked</Status>
                    )}
                    {!task.finishedDate && !task.interruptedDate && (
                      <Status statusColor="yellow">In progress</Status>
                    )}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </HistoryList>
    </HistoryContainer>
  )
}
