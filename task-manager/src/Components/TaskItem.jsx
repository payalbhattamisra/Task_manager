import React from 'react';

function TaskItem({ task }) {
  return (
    <div className={`task-item ${task.status}`}>
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <p>Status: {task.status}</p>
    </div>
  );
}

export default TaskItem;
