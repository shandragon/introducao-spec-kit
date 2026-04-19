import React, { useState, useEffect } from 'react'
import Calendar from './components/Calendar'
import TreeView from './components/TreeView'
import TaskDetail from './components/TaskDetail'
import { listTasks, updateTaskDate } from './services/taskService'
import { Task, Status } from '../../shared/types'
import './App.css'

function App() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [view, setView] = useState<'calendar' | 'tree'>('calendar')
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)

  const fetchTasks = async () => {
    try {
      const data = await listTasks()
      setTasks(data)
    } catch (error) {
      console.error('Failed to fetch tasks:', error)
    }
  }

  useEffect(() => {
    fetchTasks()
  }, [])

  const handleTaskDrop = async (id: string, newDate: string) => {
    await updateTaskDate(id, newDate)
    fetchTasks()
  }

  return (
    <div className="app-container">
      <header>
        <h1>Task Organizer</h1>
        <nav>
          <button onClick={() => setView('calendar')}>Calendar</button>
          <button onClick={() => setView('tree')}>Tree View</button>
        </nav>
      </header>

      <main>
        {view === 'calendar' ? (
          <Calendar tasks={tasks} onTaskDrop={handleTaskDrop} />
        ) : (
          <TreeView tasks={tasks} />
        )}
      </main>

      {selectedTask && (
        <aside>
          <TaskDetail 
            task={selectedTask} 
            onStatusChange={(id, status) => {
              // Handle status change
              console.log('Status change', id, status)
            }} 
          />
          <button onClick={() => setSelectedTask(null)}>Close</button>
        </aside>
      )}
    </div>
  )
}

export default App
