const taskModel = require("../models/taskModel");

const getTasks = (req, res) => {
    taskModel.getAllTasks((err, results) => {
        if (err) {
            return res.status(500).json(err);
        }

        res.json(results);
    });
};

const addTask = (req, res) => {
    const { title } = req.body;

    taskModel.createTask(title, (err, result) => {
        if (err) {
            return res.status(500).json(err);
        }

        res.json({
            message: "Task created",
        });
    });
};


const updateTask = (req, res) => {
    const { id } = req.params;

    const { title, completed } = req.body;

    taskModel.updateTask(id, title, completed, (err, result) => {
        if (err) {
            return res.status(500).json(err);
        }

        res.json({
            message: "Task updated",
        });
    });
};

const deleteTask = (req, res) => {
    const { id } = req.params;

    taskModel.deleteTask(id, (err, results) => {
        if (err) {
            return res.status(500).json(err);
        }

        res.json({
            message: "Task deleted",
        });
    });
};

module.exports = {
    getTasks,
    addTask,
    updateTask,
    deleteTask
};