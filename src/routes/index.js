import express from 'express';
import db from "../../models/index.cjs";

const { User, Task } = db;
const router = express.Router();

router.get('/tasks', async (req, res) => {
    const tasks = await Task.findAll({ include: User, order: [["id", "ASC"]] });
    res.json(tasks);
});

router.get("/tasks/:id", async (req, res) => {
    const task = await Task.findByPk(req.params.id, { include: User });
    if (!task) {
        return res.status(404).json({ error: "Task not found" });
    }
    res.json(task);
});

router.post("/tasks", async (req, res) => {
    const task = await Task.create(req.body);
    res.status(201).json(task);
});

router.put("/tasks/:id", async (req, res) => {
    const task = await Task.findByPk(req.params.id);
    if (!task) {
        return res.status(404).json({ error: "Task not found" });
    }
    await task.update(req.body);
    res.json(task);
});

router.delete("/tasks/:id", async (req, res) => {
    const task = await Task.findByPk(req.params.id);
    if (!task) {
        return res.status(404).json({ error: "Task not found" });
    }
    await task.destroy();
    res.json({ message: "Deleted", task });
});

router.get("/users", async (req, res) => {
    const users = await User.findAll();
    res.json(users);
});

export default router;