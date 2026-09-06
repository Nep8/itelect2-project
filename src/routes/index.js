import express from 'express';
import { fetchSampleUsers } from '../api.js';
import { tasks, validateTask, mergeTaskUpdate, createTask } from '../utils.js';

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

router.post("/tasks", (req, res, next) => {
    if (!validateTask(req.body)) {
        const err = new Error("title and dueDate required");
        err.status = 400;
        return next(err);
    }
    const task = createTask(req.body);
    tasks.push(task);
    res.status(201).json(task);
});

router.put("/tasks/:id", (req, res) => {
    const index = tasks.findIndex((t) => t.id === parseInt(req.params.id));
    if (index === -1) {
        return res.status(404).json({ error: "Task not found" });
    }
    tasks[index] = mergeTaskUpdate(tasks[index], req.body);
    res.status(200).json(tasks[index]);
});

router.delete("/tasks/:id", (req, res) => {
    const index = tasks.findIndex((t) => t.id === parseInt(req.params.id));
    if (index === -1) {
        return res.status(404).json({ error: "Task not found" });
    }
    const [removed] = tasks.splice(index, 1);
    res.status(200).json({ message: "Deleted", task: removed });
});

router.get("/users", (req, res) => {
    res.json(userCache);
});

export default router;