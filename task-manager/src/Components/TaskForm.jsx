 // TaskForm.jsx
import React from 'react';

function TaskForm({ task, onInputChange, onSave, onCancel }) {
  return (
    <div className="task-form">
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={task.title}
        onChange={onInputChange}
      />
      <textarea
        name="description"
        placeholder="Description"
        value={task.description}
        onChange={onInputChange}
      />
      <select name="status" value={task.status} onChange={onInputChange}>
        <option value="To Do">To Do</option>
        <option value="On Progress">On Progress</option>
        <option value="Done">Done</option>
      </select>
      <select name="priority" value={task.priority} onChange={onInputChange}>
        <option value="Low">Low</option>
        <option value="High">High</option>
        <option value="Completed">Completed</option>
      </select>
      <input
        type="date"
        name="deadline"
        value={task.deadline}
        onChange={onInputChange}
      />
      <div className="form-buttons">
        <button onClick={onSave}>Save</button>
        <button onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
}

export default TaskForm;
