import React from 'react';
import TaskList from './Components/TaskList.jsx';
import TaskForm from './Components/TaskForm.jsx';
import CategorySlider from './Components/CategorySlider.jsx';
import { TaskProvider } from './Context/TaskContext.jsx';

function App() {
  return (
    <TaskProvider>
      <div className="app">
        <h1>Task Management Application</h1>
        <TaskForm />
        <CategorySlider />
        <TaskList />
      </div>
    </TaskProvider>
  );
}

export default App;
