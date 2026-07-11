const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Task = require("../models/Task");

// GET /api/tasks — get all tasks for logged in user
router.get("/", auth, async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user }).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    console.error("Get tasks error:", err);
    res.status(500).json({ message: "Failed to fetch tasks" });
  }
});

// POST /api/tasks — create new task
router.post("/", auth, async (req, res) => {
  try {
    const { title, description, status, priority, category, dueDate } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({ message: "Title is required" });
    }

    const task = new Task({
      user: req.user,
      title: title.trim(),
      description: description || "",
      status: status || "To Do",
      priority: priority || "Low",
      category: category || "Work",
      dueDate: dueDate || null,
    });

    await task.save();
    res.status(201).json(task);
  } catch (err) {
    console.error("Create task error:", err);
    res.status(500).json({ message: "Failed to create task" });
  }
});

// PUT /api/tasks/:id — update task
router.put("/:id", auth, async (req, res) => {
  try {
    const { title, description, status, priority, category, dueDate, completed } = req.body;

    const updates = {};
    if (title !== undefined) updates.title = title.trim();
    if (description !== undefined) updates.description = description;
    if (status !== undefined) {
      updates.status = status;
      updates.completed = status === "Done";
    }
    if (priority !== undefined) updates.priority = priority;
    if (category !== undefined) updates.category = category;
    if (dueDate !== undefined) updates.dueDate = dueDate;
    if (completed !== undefined) updates.completed = completed;

    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user },
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json(task);
  } catch (err) {
    console.error("Update task error:", err);
    res.status(500).json({ message: "Failed to update task" });
  }
});

// DELETE /api/tasks/:id — delete task
router.delete("/:id", auth, async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      user: req.user,
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json({ message: "Task deleted successfully" });
  } catch (err) {
    console.error("Delete task error:", err);
    res.status(500).json({ message: "Failed to delete task" });
  }
});

// GET /api/tasks/stats — get task statistics
router.get("/stats", auth, async (req, res) => {
  try {
    const total = await Task.countDocuments({ user: req.user });
    const todo = await Task.countDocuments({ user: req.user, status: "To Do" });
    const inProgress = await Task.countDocuments({ user: req.user, status: "In Progress" });
    const done = await Task.countDocuments({ user: req.user, status: "Done" });
    const highPriority = await Task.countDocuments({ user: req.user, priority: "High" });

    res.json({ total, todo, inProgress, done, highPriority });
  } catch (err) {
    console.error("Stats error:", err);
    res.status(500).json({ message: "Failed to fetch stats" });
  }
});

module.exports = router;