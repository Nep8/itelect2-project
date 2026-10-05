import db from "../models/index.cjs";

const { User, Task } = db;

export async function listUsers(req, res) {
    const users = await User.findAll({
        include: Task,
        order: [["id", "ASC"]]
    });

    res.json(users);
}