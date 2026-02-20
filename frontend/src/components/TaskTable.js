import React, { useState } from "react";
import API from "../services/api";
import "../styles/Dashboard.css";

function TaskTable({ tasks, onDelete, onUpdate }) {
  const [activeTaskId, setActiveTaskId] = useState(null);
  const [description, setDescription] = useState("");

  const handleTaskClick = (task) => {
    setActiveTaskId(task._id);
    setDescription(task.description || "");
  };

 const saveDescription = async (taskId) => {
  try {
    const res = await API.put(`/tasks/${taskId}`, {
      description,
    });

    onUpdate(res.data);
    setActiveTaskId(null);
  } catch (error) {
    console.error('Error saving description:', error);
    alert('Failed to save description. Please try again.');
  }
};
  return (
    <div className="task-table">
      <table>
        <thead>
          <tr>
            <th>Task</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {tasks.length === 0 ? (
            <tr>
              <td colSpan="3" style={{ textAlign: "center" }}>
                No tasks added yet 🚀
              </td>
            </tr>
          ) : (
            tasks.map((task) => (
              <React.Fragment key={task._id}>
                {/* TASK ROW */}
                <tr
                  onClick={() => handleTaskClick(task)}
                  style={{ cursor: "pointer" }}
                >
                  <td>{task.title}</td>
                  <td>
                    {task.completed ? (
                      <span className="status completed">Completed</span>
                    ) : (
                      <span className="status pending">Pending</span>
                    )}
                  </td>
                  <td>
                    <button
                      className="delete-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        onDelete(task._id);
                      }}
                    >
                      ❌
                    </button>
                  </td>
                </tr>

                {/* DESCRIPTION EDITOR */}
                {activeTaskId === task._id && (
                  <tr>
                    <td colSpan="3">
                      <textarea
                        className="task-textarea"
                        placeholder="Write task description..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      />

                      <div className="task-actions">
                        <button
                          className="save-btn"
                          onClick={() => saveDescription(task._id)}
                        >
                          💾 Save
                        </button>

                        <button
                          className="cancel-btn"
                          onClick={() => setActiveTaskId(null)}
                        >
                          ✖ Cancel
                        </button>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default TaskTable;
