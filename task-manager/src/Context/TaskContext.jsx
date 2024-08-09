import React, { createContext, useState, useEffect } from 'react';

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [category, setCategory] = useState('To Do');
  const categories = ['To Do', 'In Progress', 'Done', 'Timeout'];

  useEffect(() => {
    // Fetch tasks from API or initialize with sample data
    setTasks([
      { id: 1, title: 'Sample Task 1', description: 'This is a sample task', status: 'To Do' },
      // Add more tasks
    ]);
  }, []);

  const addTask = (task) => {
    setTasks([...tasks, { ...task, id: tasks.length + 1 }]);
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, category, setCategory, categories }}>
      {children}
    </TaskContext.Provider>
  );
};
