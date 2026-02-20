const express = require("express");
const Task = require("../models/Task");
const auth = require("../middleware/auth");

const router = express.Router();

router.get("/", auth, async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user })
      .sort({ createdAt: -1 });

    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch tasks" });
  }
});

router.post("/", auth, async (req, res) => {
  try {
    if (!req.body.title?.trim()) {
      return res.status(400).json({ message: "Title is required" });
    }

    const task = new Task({
      title: req.body.title,
      description: "",
      user: req.user,
    });

    await task.save();
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: "Failed to create task" });
  }
});

router.put("/:id", auth, async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user },
      { description: req.body.description || "" },
      { new: true }
    );

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json(task);
  } catch (err) {
    res.status(500).json({ message: "Failed to update task" });
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      user: req.user,
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json({ message: "Task deleted" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete task" });
  }
});

module.exports = router;