import React, { useState, useEffect } from 'react'
import Calendar from './components/Calendar'
import TreeView from './components/TreeView'
import TaskDetail from './components/TaskDetail'
import TaskForm from './components/TaskForm'
import { listTasks, updateTaskDate, createTask } from './services/taskService'
import { Task, Status, CreateTask } from '../../shared/types'
import './App.css'

function App() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [view, setView] = useState<'calendar' | 'tree'>('calendar')
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [initialDate, setInitialDate] = useState<string | undefined>()

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
    // FullCalendar's startStr for all-day events is usually 'YYYY-MM-DD'.
    // We append the UTC suffix to ensure backend consistency.
    const utcDate = newDate.includes('T') ? newDate : `${newDate}T00:00:00.000Z`;
    await updateTaskDate(id, utcDate)
    fetchTasks()
  }

  const handleCreateTask = async (taskData: CreateTask) => {
    try {
      await createTask(taskData)
      setIsFormOpen(false)
      fetchTasks()
    } catch (error) {
      console.error('Failed to create task:', error)
    }
  }

  const openForm = (date?: string) => {
    setInitialDate(date)
    setIsFormOpen(true)
  }

  return (
    <div className="app-container">
      <header>
        <h1>Task Organizer</h1>
        <nav>
          <button onClick={() => setView('calendar')}>Calendar</button>
          <button onClick={() => setView('tree')}>Tree View</button>
          <button className="primary" onClick={() => openForm()}>+ Nova Tarefa</button>
        </nav>
      </header>

      <main>
        {view === 'calendar' ? (
          <Calendar tasks={tasks} onTaskDrop={handleTaskDrop} onDateClick={openForm} />
        ) : (
          <TreeView tasks={tasks} />
        )}
      </main>

      {isFormOpen && (
        <TaskForm 
          initialDate={initialDate} 
          onClose={() => setIsFormOpen(false)} 
          onSubmit={handleCreateTask} 
        />
      )}

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
