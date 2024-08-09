import React, { useContext } from 'react';
import TaskItem from './TaskItem.jsx';
import { TaskContext } from '../Context/TaskContext.jsx';

function TaskList() {
  const { tasks } = useContext(TaskContext);

  return (
    <div className="task-list">
      {tasks.map(task => (
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  );
}

export default TaskList;
