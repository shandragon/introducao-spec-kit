import React, { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Calendar from './components/Calendar'
import TreeView from './components/TreeView'
import TaskDetail from './components/TaskDetail'
import TaskForm from './components/TaskForm'
import TaskModal from './components/TaskModal'
import { LoginForm } from './components/LoginForm'
import { LoginWrapper } from './components/LoginWrapper'
import { PrivateRoute } from './components/PrivateRoute'
import { LogoutButton } from './components/LogoutButton'
import { AuthProvider } from './context/AuthContext'
import { listTasks, updateTaskDate, createTask, deleteTask, updateTaskStatus, updateTaskDetails } from './services/taskService'
import { Task, Status, CreateTask } from '../../shared/types'
import './App.css'

function AppContent() {
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

  const handleDeleteTask = async (id: string) => {
    try {
      await deleteTask(id)
      setSelectedTask(null)
      fetchTasks()
    } catch (error) {
      console.error('Failed to delete task:', error)
    }
  }

  const handleStatusChange = async (id: string, status: Status) => {
    try {
      await updateTaskStatus(id, status)
      fetchTasks()
    } catch (error) {
      console.error('Failed to update status:', error)
    }
  }

  const handleUpdateDetails = async (id: string, details: { title: string; description?: string }) => {
    try {
      await updateTaskDetails(id, details)
      fetchTasks()
    } catch (error) {
      console.error('Failed to update details:', error)
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
          <LogoutButton />
        </nav>
      </header>

      <main>
        {view === 'calendar' ? (
          <Calendar tasks={tasks} onTaskDrop={handleTaskDrop} onDateClick={openForm} onTaskClick={(task) => setSelectedTask(task)} />
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

      <TaskModal 
        isOpen={!!selectedTask} 
        onClose={() => setSelectedTask(null)}
      >
        {selectedTask && (
          <TaskDetail 
            task={selectedTask} 
            onStatusChange={handleStatusChange}
            onDelete={handleDeleteTask}
            onUpdate={handleUpdateDetails}
          />
        )}
      </TaskModal>
    </div>
  )
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginWrapper />} />
          <Route path="/" element={
            <PrivateRoute>
              <AppContent />
            </PrivateRoute>
          } />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App
