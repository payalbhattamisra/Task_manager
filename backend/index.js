import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

let tasks = [];  // Array to store tasks

// GET route to fetch all tasks
app.get('/tasks', (req, res) => res.json(tasks));
app.post('/tasks', (req, res) => {
  const newTask = req.body;
  tasks.push(newTask); // Add the new task to the tasks array
  res.status(201).json({ message: 'Task added successfully', task: newTask });
});



app.listen(5000, () => console.log('Server running on port 5000'));
