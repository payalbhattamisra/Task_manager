import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

let tasks = [];  

app.get('/tasks', (req, res) => res.json(tasks));

app.post('/tasks', (req, res) => {
  const task = req.body;
  tasks.push(task);
  res.status(201).json(task);
});

app.listen(5000, () => console.log('Server running on port 5000'));
