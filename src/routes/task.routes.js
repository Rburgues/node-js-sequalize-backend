import { Router } from "express";
import { getTasks, createTask, getTask, updateTask, deleteTask  } from '../controllers/task.controller.js';

const router = Router()

router.get('/tasks', getTasks);
router.post('/tasks', createTask);
router.put('/tasks/:id', updateTask );
router.delete('/tasks/:id', deleteTask);
router.get('/tasks/:id', getTask );

export default router;