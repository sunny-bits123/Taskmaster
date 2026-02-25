import React, { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import StatsCard from "../components/StatsCard";
import TaskTable from "../components/TaskTable";
import "../styles/Dashboard.css";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("Low"); 
  const navigate = useNavigate();

  const fetchTasks = async () => {
    try {
      const res = await API.get("/tasks");
      setTasks(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      if (err.response?.status === 401) navigate("/");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async () => {
    if (!title.trim()) return;

    try {
      const res = await API.post("/tasks", {
        title,
        dueDate,
        priority 
      });

      setTasks([res.data, ...tasks]);
      setTitle("");
      setDueDate("");
      setPriority("Low");
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const deleteTask = async (id) => {
    await API.delete(`/tasks/${id}`);
    setTasks(tasks.filter((task) => task._id !== id));
  };

  const updateTask = (updatedTask) => {
    setTasks(
      tasks.map((task) =>
        task._id === updatedTask._id ? updatedTask : task
      )
    );
  };

  const completed = tasks.filter((t) => t.completed).length;
  const pending = tasks.length - completed;

  return (
    <>
      <Navbar />

      <div className="dashboard">
        <h2>Welcome Back 👋</h2>

        <div className="stats-grid">
          <StatsCard title="Total Tasks" value={tasks.length} color="blue" />
          <StatsCard title="Completed" value={completed} color="green" />
          <StatsCard title="Pending" value={pending} color="orange" />
        </div>

        <div className="add-task">
          <input
            type="text"
            placeholder="Add new task..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />

          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>

          <button onClick={addTask}>+ Add Task</button>
        </div>

        <TaskTable
          tasks={tasks}
          onDelete={deleteTask}
          onUpdate={updateTask}
        />
      </div>
    </>
  );
}

export default Dashboard;