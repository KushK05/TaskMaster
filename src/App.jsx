import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [tasks, setTasks] = useState([])
  const [taskInput, setTaskInput] = useState('')
  const [subjectInput, setSubjectInput] = useState('')
  const [selectedSubject, setSelectedSubject] = useState('ALL')
  const [viewMode, setViewMode] = useState('list') // 'list' or 'grid'
  
  // Timer states
  const [activeMode, setActiveMode] = useState('CLOCK') // 'CLOCK', 'FOCUS', 'SHORT BREAK', 'LONG BREAK'
  const [timerMinutes, setTimerMinutes] = useState(25)
  const [timerSeconds, setTimerSeconds] = useState(0)
  const [isTimerRunning, setIsTimerRunning] = useState(false)
  const [timerInterval, setTimerInterval] = useState(null)

  // Load tasks from localStorage on component mount
  useEffect(() => {
    const savedTasks = localStorage.getItem('taskmaster-tasks')
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks))
    }
  }, [])

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem('taskmaster-tasks', JSON.stringify(tasks))
  }, [tasks])

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  // Timer functionality
  useEffect(() => {
    if (isTimerRunning) {
      const interval = setInterval(() => {
        setTimerSeconds(prevSeconds => {
          if (prevSeconds === 0) {
            if (timerMinutes === 0) {
              // Timer finished
              setIsTimerRunning(false)
              alert(`${activeMode} session completed!`)
              return 0
            } else {
              setTimerMinutes(prev => prev - 1)
              return 59
            }
          } else {
            return prevSeconds - 1
          }
        })
      }, 1000)
      setTimerInterval(interval)
      return () => clearInterval(interval)
    } else {
      if (timerInterval) {
        clearInterval(timerInterval)
        setTimerInterval(null)
      }
    }
  }, [isTimerRunning, timerMinutes, activeMode, timerInterval])

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    }).replace(' ', '')
  }

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).toUpperCase()
  }

  const addTask = () => {
    if (taskInput.trim() && subjectInput.trim()) {
      const newTask = {
        id: Date.now(),
        text: taskInput.trim(),
        subject: subjectInput.trim().toUpperCase(),
        completed: false,
        createdAt: new Date()
      }
      setTasks([...tasks, newTask])
      setTaskInput('')
      setSubjectInput('')
    }
  }

  const toggleTask = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ))
  }

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id))
  }

  const getUniqueSubjects = () => {
    const subjects = tasks.map(task => task.subject)
    return ['ALL', ...new Set(subjects)]
  }

  const filteredTasks = selectedSubject === 'ALL' 
    ? tasks 
    : tasks.filter(task => task.subject === selectedSubject)

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTask()
    }
  }

  const handleModeChange = (mode) => {
    setActiveMode(mode)
    setIsTimerRunning(false)
    if (timerInterval) {
      clearInterval(timerInterval)
      setTimerInterval(null)
    }
    
    // Set timer duration based on mode
    switch (mode) {
      case 'FOCUS':
        setTimerMinutes(25)
        setTimerSeconds(0)
        break
      case 'SHORT BREAK':
        setTimerMinutes(5)
        setTimerSeconds(0)
        break
      case 'LONG BREAK':
        setTimerMinutes(15)
        setTimerSeconds(0)
        break
      default:
        setTimerMinutes(25)
        setTimerSeconds(0)
    }
  }

  const startTimer = () => {
    setIsTimerRunning(true)
  }

  const pauseTimer = () => {
    setIsTimerRunning(false)
  }

  const resetTimer = () => {
    setIsTimerRunning(false)
    if (timerInterval) {
      clearInterval(timerInterval)
      setTimerInterval(null)
    }
    handleModeChange(activeMode) // Reset to original time
  }

  const formatTimerTime = () => {
    const minutes = timerMinutes.toString().padStart(2, '0')
    const seconds = timerSeconds.toString().padStart(2, '0')
    return `${minutes}:${seconds}`
  }

  return (
    <div className="app">
      <div className="background-overlay"></div>
      
      {/* Navigation */}
      <nav className="nav">
        <button 
          className={`nav-btn ${activeMode === 'CLOCK' ? 'active' : ''}`}
          onClick={() => handleModeChange('CLOCK')}
        >
          CLOCK
        </button>
        <button 
          className={`nav-btn ${activeMode === 'FOCUS' ? 'active' : ''}`}
          onClick={() => handleModeChange('FOCUS')}
        >
          FOCUS
        </button>
        <button 
          className={`nav-btn ${activeMode === 'SHORT BREAK' ? 'active' : ''}`}
          onClick={() => handleModeChange('SHORT BREAK')}
        >
          SHORT BREAK
        </button>
        <button 
          className={`nav-btn ${activeMode === 'LONG BREAK' ? 'active' : ''}`}
          onClick={() => handleModeChange('LONG BREAK')}
        >
          LONG BREAK
        </button>
        <button className="nav-btn">SETTINGS</button>
      </nav>

      {/* Main Content */}
      <main className="main-content">
        {/* Time Display */}
        <div className="time-display">
          {activeMode === 'CLOCK' ? (
            <>
              <div className="time">{formatTime(currentTime)}</div>
              <div className="date">{formatDate(currentTime)}</div>
            </>
          ) : (
            <>
              <div className="timer-time">{formatTimerTime()}</div>
              <div className="timer-mode">{activeMode}</div>
              <div className="timer-controls">
                {!isTimerRunning ? (
                  <button className="timer-btn start" onClick={startTimer}>
                    START
                  </button>
                ) : (
                  <button className="timer-btn pause" onClick={pauseTimer}>
                    PAUSE
                  </button>
                )}
                <button className="timer-btn reset" onClick={resetTimer}>
                  RESET
                </button>
              </div>
            </>
          )}
        </div>

        {/* Task Input */}
        <div className="task-input-section">
          <input
            type="text"
            className="task-input"
            placeholder="ENTER A TASK"
            value={taskInput}
            onChange={(e) => setTaskInput(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <div className="input-row">
            <input
              type="text"
              className="subject-input"
              placeholder="SUBJECT"
              value={subjectInput}
              onChange={(e) => setSubjectInput(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <button className="add-task-btn" onClick={addTask}>
              Add Task
            </button>
          </div>
        </div>

        {/* View Controls */}
        <div className="view-controls">
          <button 
            className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
            onClick={() => setViewMode('grid')}
          >
            <div className="grid-icon">⊞</div>
          </button>
          <button 
            className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
            onClick={() => setViewMode('list')}
          >
            <div className="list-icon">☰</div>
          </button>
        </div>

        {/* Subject Filter */}
        <div className="filter-section">
          <div className="filter-title">FILTER BY SUBJECT</div>
          <div className="subject-filters">
            {getUniqueSubjects().map(subject => (
              <button
                key={subject}
                className={`subject-filter ${selectedSubject === subject ? 'active' : ''}`}
                onClick={() => setSelectedSubject(subject)}
              >
                {subject}
              </button>
            ))}
          </div>
        </div>

        {/* Tasks List */}
        <div className={`tasks-container ${viewMode}`}>
          {filteredTasks.length === 0 ? (
            <div className="no-tasks">No tasks yet. Add one above!</div>
          ) : (
            filteredTasks.map(task => (
              <div key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
                <div className="task-content">
                  <div className="task-subject">{task.subject}</div>
                  <div className="task-text">{task.text}</div>
                </div>
                <div className="task-actions">
                  <button 
                    className="task-toggle"
                    onClick={() => toggleTask(task.id)}
                  >
                    {task.completed ? '✓' : '○'}
                  </button>
                  <button 
                    className="task-delete"
                    onClick={() => deleteTask(task.id)}
                  >
                    ×
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  )
}

export default App
