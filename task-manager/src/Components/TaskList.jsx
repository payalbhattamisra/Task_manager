import React from 'react';
import TaskItem from './TaskItem.jsx';

const TaskList = ({ tasks }) => {
  return (
    <div className="task-list">
      {tasks && tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  );
};

export default TaskList;
