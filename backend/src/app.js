import express from "express" 
import cors from "cors" 
import cookieParser from "cookie-parser" 
import path from 'path';
import { fileURLToPath } from 'url';

 
const app = express()


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(cors())
app.use(express.json({ limit: "20kb" }))
app.use(express.urlencoded({ extended: true, limit: "20kb" }))
app.use(express.static("public"))
app.use(cookieParser())
// Use routes
 
import taskRoutes from './routes/tasks.js';
app.use('/api/tasks', taskRoutes);

export { app }