import React, { useState, useEffect } from 'react';
import './App.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

function App() {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: 'Brainstorming',
      description: 'Brainstorming brings team members diverse experience into play.',
      status: 'To Do',
      priority: 'Low',
      deadline: '12/5/24',
    },
    {
      id: 2,
      title: 'Research',
      description: 'User research helps you to create an optimal product for users.',
      status: 'To Do',
      priority: 'High',
      deadline: '12/5/24',
    },
    {
      id: 3,
      title: 'Wireframes',
      description: 'Low fidelity wireframes include the most basic content and visuals.',
      status: 'To Do',
      priority: 'High',
      deadline: '12/5/24',
    },
    {
      id: 4,
      title: 'Onboarding Illustrations',
      description: '',
      status: 'On Progress',
      priority: 'Low',
      deadline: '12/5/24',
    },
    {
      id: 5,
      title: 'Moodboard',
      description: '',
      status: 'On Progress',
      priority: 'Low',
      deadline: '12/5/24',
    },
    {
      id: 6,
      title: 'Mobile App Design',
      description: '',
      status: 'Done',
      priority: 'Completed',
      deadline: '12/5/24',
    },
    {
      id: 7,
      title: 'Design System',
      description: 'It just needs to adapt the UI from what you did before',
      status: 'Done',
      priority: 'Completed',
      deadline: '12/5/24',
    },
  ]);

  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    status: 'To Do',
    priority: 'Low',
    deadline: '',
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch('http://localhost:5000/tasks');
        const data = await response.json();
        console.log('Fetched tasks:', data);
        // Optionally merge or update state here if needed
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };
    fetchTasks();
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewTask((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleTaskAdd = async () => {
    if (newTask.title.trim() !== '') {
      try {
        const response = await fetch('http://localhost:5000/tasks', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newTask),
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log('Added task:', data);
        setTasks((prevState) => [...prevState, data.task]);
        setNewTask({
          title: '',
          description: '',
          status: 'To Do',
          priority: 'Low',
          deadline: '',
        });
        setIsModalOpen(false);
      } catch (error) {
        console.error('Error adding task:', error);
      }
    }
  };

  const handleTaskUpdate = (id, updatedTask) => {
    setTasks((prevState) =>
      prevState.map((task) =>
        task.id === id ? { ...task, ...updatedTask } : task
      )
    );
  };

  const handleTaskDelete = (id) => {
    setTasks((prevState) => prevState.filter((task) => task.id !== id));
  };

  const getPriorityClass = (priority) => {
    switch (priority) {
      case 'High':
        return 'high-priority';
      case 'Completed':
        return 'completed-priority';
      default:
        return 'low-priority';
    }
  };
  function TaskCard({ task, onUpdate, onDelete }) {
  return (
    <div className={`task-card ${getPriorityClass(task.priority)}`}>
      <div className='inn'>
        <h2>{task.title}</h2>
        <button className='btn'>{task.priority}</button>
      </div>
      <p>{task.description}</p>
      <p>Status: {task.status}</p>
      <p>Priority: {task.priority}</p>
      <p>Deadline: {task.deadline}</p>
      <button onClick={() => onUpdate(task.id, { status: 'Done' })}>Mark as Done</button>
      <button onClick={() => onDelete(task.id)}>Delete</button>
    </div>
  );
}
  return (
    <div className="app-container">
      <div className="app-header">
        <div className="search-bar">
          <i className="fa fa-search"></i>
          <input type="text" placeholder="Search Project" />
          <button className='btn'><i className="fa-solid fa-filter"></i> Filter</button>
        </div>
      </div>
      <div className="app-body">
        <div className="task-column">
          <div className="task1">
            <button className='logoo1'><i className="fa-solid fa-flask"></i></button>
            <h2>Expired Tasks</h2>
            <div className="task-count">
              {tasks.filter(task => new Date(task.deadline) < new Date() && task.status !== 'Done').length}
            </div>
          </div>
          <div className="task2">
            <button className='logoo2'><i className="fa-solid fa-box"></i></button>
            <h2>All Active Tasks</h2>
            <div className="task-count">{tasks.filter(task => task.status !== 'Done').length}</div>
          </div>
          <div className="task3">
            <button className='logoo3'><i className="fa-regular fa-clock"></i></button>
            <h2>Completed Tasks</h2>
            <div className="task-count">{tasks.filter(task => task.status === 'Done').length}</div>
          </div>
          <div className="plus">
            <button onClick={() => setIsModalOpen(true)}>
              <i className="fa-solid fa-plus"></i> Add to Task
            </button>
          </div>
        </div>
        <div className="task-column">
          <h2>To Do</h2>
          <div className="task-count">{tasks.filter(task => task.status === 'To Do').length}</div>
          {tasks
            .filter((task) => task.status === 'To Do')
            .map((task) => (
              <div key={task.id} className={`task-card ${getPriorityClass(task.priority)}`}>
                  <div className='inn'>
                <h2>{task.title}</h2>
                <button className='btn'>{task.priority}</button>
                </div>
                <p>{task.description}</p>
                <p>Status: {task.status}</p>
                <p>Priority: {task.priority}</p>
                <p>Deadline: {task.deadline}</p>
                <button onClick={() => handleTaskUpdate(task.id, { status: 'Done' })}>Mark as Done</button>
                <button onClick={() => handleTaskDelete(task.id)}>Delete</button>
              </div>
            ))}
        </div>
        <div className="task-column">
          <h2>On Progress</h2>
          <div className="task-count">{tasks.filter(task => task.status === 'On Progress').length}</div>
          {tasks
            .filter((task) => task.status === 'On Progress')
            .map((task) => (
              <div key={task.id} className={`task-card ${getPriorityClass(task.priority)}`}>
                <div className='inn'>
                <h2>{task.title}</h2>
                <button className='btn'>{task.priority}</button>
                </div>
                <p>{task.description}</p>
                <p>Status: {task.status}</p>
                <p>Priority: {task.priority}</p>
                <p>Deadline: {task.deadline}</p>
                <button onClick={() => handleTaskUpdate(task.id, { status: 'Done' })}>Mark as Done</button>
                <button onClick={() => handleTaskDelete(task.id)}>Delete</button>
              </div>
            ))}
        </div>
        <div className="task-column">
          <h2>Done</h2>
          <div className="task-count">{tasks.filter(task => task.status === 'Done').length}</div>
          {tasks
            .filter((task) => task.status === 'Done')
            .map((task) => (
              <div key={task.id} className={`task-card ${getPriorityClass(task.priority)}`}>
                <div className='inn'>
                <h2>{task.title}</h2>
                <button className='btn'>{task.priority}</button>
                </div>
                <p>{task.description}</p>
                <p>Status: {task.status}</p>
                <p>Priority: {task.priority}</p>
                <p>Deadline: {task.deadline}</p>
                <button onClick={() => handleTaskUpdate(task.id, { status: 'To Do' })}>Reopen</button>
                <button onClick={() => handleTaskDelete(task.id)}>Delete</button>
              </div>
            ))}
        </div>
      </div>
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Add New Task</h2>
            <input
              type="text"
              name="title"
              value={newTask.title}
              onChange={handleInputChange}
              placeholder="Title"
            />
            <textarea
              name="description"
              value={newTask.description}
              onChange={handleInputChange}
              placeholder="Description"
            />
            <select
              name="status"
              value={newTask.status}
              onChange={handleInputChange}
            >
              <option value="To Do">To Do</option>
              <option value="On Progress">On Progress</option>
              <option value="Done">Done</option>
            </select>
            <select
              name="priority"
              value={newTask.priority}
              onChange={handleInputChange}
            >
              <option value="Low">Low</option>
              <option value="High">High</option>
              <option value="Completed">Completed</option>
            </select>
            <input
              type="date"
              name="deadline"
              value={newTask.deadline}
              onChange={handleInputChange}
            />
            <button onClick={handleTaskAdd}>Add Task</button>
            <button onClick={() => setIsModalOpen(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}
const getPriorityClass = (priority) => {
  switch (priority) {
    case 'High':
      return 'high-priority';
    case 'Completed':
      return 'completed-priority';
    default:
      return 'low-priority';
  }
};
function TaskCard({ task, onUpdate, onDelete }) {
  return (
    <div className={`task-card ${getPriorityClass(task.priority)}`}>
      <div className='inn'>
        <h2>{task.title}</h2>
        <button className='btn'>{task.priority}</button>
      </div>
      <p>{task.description}</p>
      <p>Status: {task.status}</p>
      <p>Priority: {task.priority}</p>
      <p>Deadline: {task.deadline}</p>
      <button onClick={() => onUpdate(task.id, { status: 'Done' })}>Mark as Done</button>
      <button onClick={() => onDelete(task.id)}>Delete</button>
    </div>
  );
}


export default App;
