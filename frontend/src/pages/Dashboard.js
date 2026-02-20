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
    const res = await API.post("/tasks", { title });
    setTasks([res.data, ...tasks]);
    setTitle("");
  };

  const deleteTask = async (id) => {
    await API.delete(`/tasks/${id}`);
    setTasks(tasks.filter((task) => task._id !== id));
  };

  // ADD THIS NEW FUNCTION
  const updateTask = (updatedTask) => {
    setTasks(tasks.map(task => 
      task._id === updatedTask._id ? updatedTask : task
    ));
  };

  const completed = tasks.filter(t => t.completed).length;
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
          <button onClick={addTask}>+ Add Task</button>
        </div>

        {/* ADD onUpdate PROP HERE */}
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