import express from 'express';
import db from "../../models/index.cjs";
import verifyToken from "../../middleware/verifyToken.js";
import requireRole from "../../middleware/requireRole.js";

const { User, Task, Sequelize } = db;
const { Op } = Sequelize;
const router = express.Router();
const TASK_FIELDS = [
    "title",
    "dueDate",
    "completed",
    "userId"
];

// GET /api/tasks and GET /api/tasks?search=book -- public
router.get('/tasks', async (req, res) => {
    const { search } = req.query;
    const where = {};

    if (search) {
        // Sequelize sends search as a VALUE, never as SQL
        where.title = { [Op.iLike]: `%${search}%` };
    }

    const tasks = await Task.findAll({
        where,
        include: User,
        order: [["id", "ASC"]]
    });

    res.json(tasks);
});

router.get("/tasks/:id", async (req, res) => {
    const task = await Task.findByPk(req.params.id, {
        include: User
    });

    if (!task) {
        return res.status(404).json({
            error: "Task not found"
        });
    }

    res.json(task);
});

router.get("/users", async (req, res) => {
    const users = await User.findAll({
        include: Task,
        order: [["id", "ASC"]]
    });

    res.json(users);
});

// POST /api/tasks -- any logged-in user
router.post("/tasks", verifyToken, async (req, res) => {
    const task = await Task.create(req.body, {
        fields: TASK_FIELDS
    });

    res.status(201).json(task);
});

// PUT /api/tasks/:id -- any logged-in user
router.put("/tasks/:id", verifyToken, async (req, res) => {
    const task = await Task.findByPk(req.params.id);

    if (!task) {
        return res.status(404).json({
            error: "Task not found"
        });
    }

    await task.update(req.body, {
        fields: TASK_FIELDS
    });

    res.json(task);
});

// DELETE /api/tasks/:id -- admin only
router.delete(
    "/tasks/:id",
    verifyToken,
    requireRole("admin"),
    async (req, res) => {
        const task = await Task.findByPk(req.params.id);

        if (!task) {
            return res.status(404).json({
                error: "Task not found"
            });
        }

        await task.destroy();

        res.json({
            message: "Deleted",
            task,
            deletedBy: req.user.email
        });
    }
);

export default router;