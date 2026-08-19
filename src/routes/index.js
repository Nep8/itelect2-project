import express from 'express';
import {tasks} from '../utils.js';
import { fetchSampleUsers } from '../api.js';

const router = express.Router();
let userCache = [];
userCache = await fetchSampleUsers();

router.get('/tasks', (req, res) => {
    res.json(tasks);
});

router.get("/tasks/:id", (req, res) => {
    const task = tasks.find((t) => t.id === parseInt(req.params.id));
    if (task) { 
    res.json(task);
} else { 
    res.status(404).json({ error: "Task not found" }); 
}
});

router.get("/users", (req, res) => {
    res.json(userCache);
});

export default router;