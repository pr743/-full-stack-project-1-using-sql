const db = require("../config/db");


const getAllTasks = (callback) => {
    db.query("SELECT * FROM tasks", callback);
};


const createTask = (title, callback) => {
    db.query("INSERT INTO tasks (title) VALUES (?)", [title], callback);
};


const updateTask = (id, title, completed, callback) => {
    db.query("UPDATE tasks SET title = ?, completed = ? WHERE id = ?", [title, completed, id], callback);
};


const deleteTask = (id, callback) => {
    db.query("DELETE FROM tasks WHERE id = ?", [id], callback);
};


module.exports = {
    getAllTasks,
    createTask,
    updateTask,
    deleteTask,
};