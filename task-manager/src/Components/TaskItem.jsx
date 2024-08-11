 // TaskItem.jsx
import React, { useState } from 'react';
import TaskForm from './TaskForm.jsx';
function TaskItem({ task, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState({ ...task });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedTask((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSaveClick = () => {
    onUpdate(task.id, editedTask);
    setIsEditing(false);
  };

  const handleDeleteClick = () => {
    onDelete(task.id);
  };

  return (
    <div className="task-item">
      {!isEditing ? (
        <>
          <div className="task-item-header">
            <h3>{task.title}</h3>
            <p>{task.priority}</p>
          </div>
          <div className="task-item-body">
            <p>{task.description}</p>
            <p>Deadline: {task.deadline}</p>
          </div>
          <div className="task-item-footer">
            <button onClick={() => setIsEditing(true)}>Edit</button>
            <button onClick={handleDeleteClick}>Delete</button>
          </div>
        </>
      ) : (
        <>
          <TaskForm
            task={editedTask}
            onInputChange={handleInputChange}
            onSave={handleSaveClick}
            onCancel={() => setIsEditing(false)}
          />
        </>
      )}
    </div>
  );
}

export default TaskItem;
