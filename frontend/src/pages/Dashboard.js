import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import KanbanBoard from "../components/KanbanBoard";
import "../styles/Dashboard.css";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [user, setUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [newTask, setNewTask] = useState({
    title: "",
    priority: "Low",
    category: "Work",
    dueDate: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const getHeaders = useCallback(() => ({
    headers: { Authorization: `Bearer ${token}` },
  }), [token]);

  // Fetch user info
  useEffect(() => {
    if (!token) {
      navigate("/");
      return;
    }
    const stored = localStorage.getItem("user");
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        console.error("Failed to parse user from localStorage");
      }
    }
  }, [token, navigate]);

  // Fetch tasks
  useEffect(() => {
    if (!token) return;
    const fetchTasks = async () => {
      setLoading(true);
      try {
        const res = await axios.get("/api/tasks", getHeaders());
        setTasks(res.data);
      } catch (err) {
        if (err.response?.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          navigate("/");
        } else {
          console.error("Failed to fetch tasks", err);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, [token, navigate, getHeaders]);

  // Add task
  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!newTask.title.trim()) return;
    setError("");
    try {
      const res = await axios.post("/api/tasks", newTask, getHeaders());
      setTasks([res.data, ...tasks]);
      setNewTask({ title: "", priority: "Low", category: "Work", dueDate: "" });
    } catch (err) {
      setError("Failed to add task. Please try again.");
    }
  };

  // Update task status
  const handleStatusChange = async (taskId, newStatus) => {
    try {
      const res = await axios.put(
        `/api/tasks/${taskId}`,
        { status: newStatus },
        getHeaders()
      );
      setTasks(tasks.map((t) => (t._id === taskId ? res.data : t)));
    } catch (err) {
      console.error("Failed to update task status", err);
    }
  };
  // Edit task
  const handleEdit = async (taskId, updatedData) => {
    try {
      const res = await axios.put(
        `/api/tasks/${taskId}`,
        updatedData,
        getHeaders()
      );
      setTasks(tasks.map((t) => (t._id === taskId ? res.data : t)));
    } catch (err) {
      console.error("Failed to edit task", err);
    }
  };

  // Delete task
  const handleDelete = async (taskId) => {
    const confirmed = window.confirm("Are you sure you want to delete this task?");
    if (!confirmed) return;
    try {
      await axios.delete(`/api/tasks/${taskId}`, getHeaders());
      setTasks(tasks.filter((t) => t._id !== taskId));
    } catch (err) {
      console.error("Failed to delete task", err);
    }
  };

  // Stats
  const totalTasks = tasks.length;
  const todoTasks = tasks.filter((t) => t.status === "To Do").length;
  const inProgressTasks = tasks.filter((t) => t.status === "In Progress").length;
  const doneTasks = tasks.filter((t) => t.status === "Done").length;

  return (
    <div className="dashboard-page">

      {/* Navbar */}
      <Navbar />

      <div className="dashboard-content">

        {/* Header */}
        <div className="dashboard-header">
          <div className="dashboard-header-left">
            <h2>Welcome back, {user?.name || "there"} 👋</h2>
            <p>Here's what's on your plate today</p>
          </div>
          <div className="dashboard-header-right">
            <input
              type="text"
              className="dashboard-search"
              placeholder="🔍 Search tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Stats */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-card-top">
              <span className="stat-card-icon">📋</span>
              <p className="stat-card-label">Total Tasks</p>
            </div>
            <p className="stat-card-number">{totalTasks}</p>
          </div>
          <div className="stat-card stat-card-todo">
            <div className="stat-card-top">
              <span className="stat-card-icon">🔘</span>
              <p className="stat-card-label">To Do</p>
            </div>
            <p className="stat-card-number todo">{todoTasks}</p>
          </div>
          <div className="stat-card stat-card-inprogress">
            <div className="stat-card-top">
              <span className="stat-card-icon">⚡</span>
              <p className="stat-card-label">In Progress</p>
            </div>
            <p className="stat-card-number inprogress">{inProgressTasks}</p>
          </div>
          <div className="stat-card stat-card-done">
            <div className="stat-card-top">
              <span className="stat-card-icon">✅</span>
              <p className="stat-card-label">Completed</p>
            </div>
            <p className="stat-card-number done">{doneTasks}</p>
          </div>
        </div>

        {/* Add Task Form */}
        <form className="add-task-form" onSubmit={handleAddTask}>
          <input
            type="text"
            placeholder="What needs to be done?"
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            required
          />
          <input
            type="date"
            value={newTask.dueDate}
            onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
          />
          <select
            value={newTask.priority}
            onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
          >
            <option value="Low">🟢 Low</option>
            <option value="Medium">🟡 Medium</option>
            <option value="High">🔴 High</option>
          </select>
          <select
            value={newTask.category}
            onChange={(e) => setNewTask({ ...newTask, category: e.target.value })}
          >
            <option value="Work">💼 Work</option>
            <option value="Study">📚 Study</option>
            <option value="Personal">🙂 Personal</option>
          </select>
          <button className="btn-add-task" type="submit">
            + Add Task
          </button>
        </form>

        {/* Error */}
        {error && <div className="form-error">{error}</div>}

        {/* Section Title */}
        <div className="kanban-section-header">
          <h3 className="kanban-section-title">📋 My Tasks</h3>
          <span className="kanban-section-count">
            {tasks.length} {tasks.length === 1 ? "task" : "tasks"}
          </span>
        </div>

        {/* Loading */}
        {loading ? (
          <div className="no-tasks">Loading tasks...</div>
        ) : (
          <KanbanBoard
            tasks={tasks}
            onStatusChange={handleStatusChange}
            onEdit={handleEdit}
            onDelete={handleDelete}
            searchQuery={searchQuery}
          />
        )}

      </div>
    </div>
  );
};

export default Dashboard;