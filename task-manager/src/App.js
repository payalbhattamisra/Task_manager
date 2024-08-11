import React, { useState } from 'react';
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
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewTask((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleTaskAdd = () => {
    if (newTask.title.trim() !== '') {
      const newTaskId = tasks.length + 1;
      const newTaskItem = {
        id: newTaskId,
        ...newTask,
      };
      setTasks((prevState) => [...prevState, newTaskItem]);
      setNewTask({
        title: '',
        description: '',
        status: 'To Do',
        priority: 'Low',
        deadline: '',
      });
      setIsModalOpen(false); 
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
  

  return (
    <div className="app-container">
      <div className="app-header">
        <div className="search-bar">
        <i class="fa fa-search"></i>
          <input type="text" placeholder="Search Project" />
          <button className='btn'><i class="fa-solid fa-filter"></i> Filter</button>
        </div>
      </div>
      <div className="app-body">
        <div className="task-column">
          <div className="task1">
          <button className='logoo1'><i class="fa-solid fa-flask"></i></button>
            <h2>Expired Tasks</h2>
            <div className="task-count">5</div>
          </div>
          <div className="task2">
            <button className='logoo2'> <i class="fa-solid fa-box"></i></button>
            <h2>All Active Tasks</h2>
            <div className="task-count">7</div>
          </div>
          <div className="task3">
          <button className='logoo3'> <i class="fa-regular fa-clock"></i></button>
            <h2>Completed Tasks</h2>
            <div className="task-count">2/7</div>
          </div>
          <div className="plus">
            <button onClick={() => setIsModalOpen(true)}>
              <i className="fa-solid fa-plus"></i> Add to Task
            </button>
          </div>
          </div>
          <div className="task-column">
            <h2>To Do</h2>
            <div className="task-count">3</div>
            {tasks
              .filter((task) => task.status === 'To Do')
              .map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onUpdate={handleTaskUpdate}
                  onDelete={handleTaskDelete}
                />
              ))}
          </div>
          <div className="task-column">
            <h2>On Progress</h2>
            <div className="task-count">2</div>
            {tasks
              .filter((task) => task.status === 'On Progress')
              .map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onUpdate={handleTaskUpdate}
                  onDelete={handleTaskDelete}
                />
              ))}
          </div>
          <div className="task-column">
            <h2>Done</h2>
            <div className="task-count">2</div>
            {tasks
              .filter((task) => task.status === 'Done')
              .map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onUpdate={handleTaskUpdate}
                  onDelete={handleTaskDelete}
                />
              ))}
          </div>
      </div>
      
      {/* Add Task Modal */}
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Add New Task</h2>
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={newTask.title}
              onChange={handleInputChange}
            />
            <textarea
              name="description"
              placeholder="Description"
              value={newTask.description}
              onChange={handleInputChange}
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
            </select>
            <input
              type="date"
              name="deadline"
              value={newTask.deadline}
              onChange={handleInputChange}
            />
            <div className="modal-actions">
              <button onClick={handleTaskAdd}>Add Task</button>
              <button onClick={() => setIsModalOpen(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function TaskCard({ task, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState({
    title: task.title,
    description: task.description,
    status: task.status,
    priority: task.priority,
    deadline: task.deadline,
  });

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    onUpdate(task.id, editedTask);
    setIsEditing(false);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedTask((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleDeleteClick = () => {
    onDelete(task.id);
  };
  const getPriorityClass = (priority) => {
    switch (priority) {
      case 'High':
        return 'priority-high';
      case 'Low':
        return 'priority-low';
      case 'Completed':
        return 'priority-completed';
      default:
        return '';
    }
  };

  return (
    <div className="task-card">
    {!isEditing ? (
      <>
        <div className="task-card-header">
          <span className={`task-card-priority ${getPriorityClass(task.priority)}`}>
            {task.priority}
          </span>
          <h3>{task.title}</h3>
        </div>
        <div className="task-card-body">
          <p>{task.description}</p>
          <p>Deadline: {task.deadline}</p>
        </div>
        <div className="task-card-footer">
          <button onClick={handleEditClick}>Edit</button>
          <button onClick={handleDeleteClick}>Delete</button>
        </div>
      </>
    ) : (
      <>
        <div className="task-card-header">
          <span className="task-card-priority">
            <select
              name="priority"
              value={editedTask.priority}
              onChange={handleInputChange}
            >
              <option value="Low">Low</option>
              <option value="High">High</option>
              <option value="Completed">Completed</option>
            </select>
          </span>
          <h3>
            <input
              type="text"
              name="title"
              value={editedTask.title}
              onChange={handleInputChange}
            />
          </h3>
        </div>
        <div className="task-card-body">
          <textarea
            name="description"
            value={editedTask.description}
            onChange={handleInputChange}
          />
          <p>Deadline:</p>
          <input
            type="date"
            name="deadline"
            value={editedTask.deadline}
            onChange={handleInputChange}
          />
        </div>
        <div className="task-card-footer">
          <button onClick={handleSaveClick}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
      </>
    )}
  </div>
);
}

export default App;