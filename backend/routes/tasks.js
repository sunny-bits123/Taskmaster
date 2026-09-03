const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Task = require("../models/Task");

router.get("/", auth, async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user }).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    console.error("Get tasks error:", err);
    res.status(500).json({ message: "Failed to fetch tasks" });
  }
});

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

router.get("/analytics", auth, async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user });

    
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    
    const weeklyData = {
      Work:     [0, 0, 0, 0, 0, 0, 0],
      Study:    [0, 0, 0, 0, 0, 0, 0],
      Personal: [0, 0, 0, 0, 0, 0, 0],
    };

    const now = new Date();
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay());
    startOfWeek.setHours(0, 0, 0, 0);

    const doneTasks = tasks.filter(t => {
      return t.status === "Done" &&
        new Date(t.updatedAt) >= startOfWeek;
    });

    doneTasks.forEach(task => {
      const day = new Date(task.updatedAt).getDay();
      const category = task.category || "Work";
      if (weeklyData[category]) {
        weeklyData[category][day]++;
      }
    });

    const priorityData = {
      High:   tasks.filter(t => t.priority === "High").length,
      Medium: tasks.filter(t => t.priority === "Medium").length,
      Low:    tasks.filter(t => t.priority === "Low").length,
    };

    const categoryData = {
      Work:     tasks.filter(t => t.category === "Work").length,
      Study:    tasks.filter(t => t.category === "Study").length,
      Personal: tasks.filter(t => t.category === "Personal").length,
    };

    const totalPerDay = days.map((_, i) =>
      weeklyData.Work[i] + weeklyData.Study[i] + weeklyData.Personal[i]
    );
    const bestDayIndex = totalPerDay.indexOf(Math.max(...totalPerDay));
    const bestDay = Math.max(...totalPerDay) === 0 ? "N/A" : days[bestDayIndex];
    const bestDayCount = Math.max(...totalPerDay);

    const topCategory = Object.entries(categoryData).sort((a, b) => b[1] - a[1])[0][0];
    const topCategoryPercent = tasks.length > 0
      ? Math.round((categoryData[topCategory] / tasks.length) * 100)
      : 0;

    const thisWeekTotal = doneTasks.length;

    let streak = 0;
    const today = new Date();
    today.setHours(23, 59, 59, 999);
    for (let i = 0; i < 30; i++) {
      const day = new Date(today);
      day.setDate(today.getDate() - i);
      const dayStart = new Date(day); dayStart.setHours(0, 0, 0, 0);
      const dayEnd = new Date(day); dayEnd.setHours(23, 59, 59, 999);
      const hasTask = tasks.some(t =>
        t.status === "Done" &&
        new Date(t.updatedAt) >= dayStart &&
        new Date(t.updatedAt) <= dayEnd
      );
      if (hasTask) streak++;
      else break;
    }

    res.json({
      weeklyData,
      priorityData,
      categoryData,
      bestDay,
      bestDayCount,
      topCategory,
      topCategoryPercent,
      thisWeekTotal,
      streak,
      days,
    });
  } catch (err) {
    console.error("Analytics error:", err);
    res.status(500).json({ message: "Failed to fetch analytics" });
  }
});

module.exports = router;