import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  status: { type: String, enum: ['To Do', 'On Progress', 'Done'], default: 'To Do' },
  priority: { type: String, enum: ['Low', 'High', 'Completed'], default: 'Low' },
  deadline: { type: Date },
}, { timestamps: true });

const Task = mongoose.model('Task', taskSchema);

export default Task;
