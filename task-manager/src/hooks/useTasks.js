import { useState, useEffect } from 'react';

function useTasks() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // Fetch tasks from API or initialize with sample data
    setTasks([
      { id: 1, title: 'Sample Task', description: 'This is a sample task', status: 'To Do' },
      // Add more tasks
    ]);
  }, []);

  const addTask = (task) => {
    setTasks([...tasks, { ...task, id: tasks.length + 1 }]);
  };

  return {
    tasks,
    addTask,
  };
}

export default useTasks;
