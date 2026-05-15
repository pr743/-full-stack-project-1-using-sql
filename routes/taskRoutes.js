const express = require("express");


const router = express.Router();

const { getTasks, addTask, updateTask, deleteTask } = require("../controllers/taskController");

router.post("/", addTask);
router.get("/", getTasks);

router.put("/:id", updateTask);
router.delete("/:id", deleteTask);

module.exports = router;