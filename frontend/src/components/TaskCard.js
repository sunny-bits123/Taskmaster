import React, { useState } from "react";

const STATUS_ORDER = ["To Do", "In Progress", "Done"];

const PRIORITY_CLASS = {
  High: "tag tag-high",
  Medium: "tag tag-medium",
  Low: "tag tag-low",
};

const CATEGORY_CLASS = {
  Work: "tag tag-work",
  Study: "tag tag-study",
  Personal: "tag tag-personal",
};

const TaskCard = ({ task, onStatusChange, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    title: task.title,
    priority: task.priority,
    category: task.category,
    dueDate: task.dueDate
      ? new Date(task.dueDate).toISOString().split("T")[0]
      : "",
  });

  const currentIndex = STATUS_ORDER.indexOf(task.status);
  const nextStatus =
    currentIndex < STATUS_ORDER.length - 1
      ? STATUS_ORDER[currentIndex + 1]
      : null;
  const prevStatus = currentIndex > 0 ? STATUS_ORDER[currentIndex - 1] : null;

  const formatDate = (date) => {
    if (!date) return null;
    return new Date(date).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
    });
  };

  const formattedDate = formatDate(task.dueDate);

  const isOverdue =
    task.dueDate &&
    task.status !== "Done" &&
    new Date(task.dueDate) < new Date();

  const handleEditSave = () => {
    if (!editData.title.trim()) return;
    onEdit(task._id, editData);
    setIsEditing(false);
  };

  const handleEditCancel = () => {
    setEditData({
      title: task.title,
      priority: task.priority,
      category: task.category,
      dueDate: task.dueDate
        ? new Date(task.dueDate).toISOString().split("T")[0]
        : "",
    });
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="task-card task-card-editing">
        <div className="edit-field">
          <input
            className="edit-input"
            type="text"
            value={editData.title}
            onChange={(e) =>
              setEditData({ ...editData, title: e.target.value })
            }
            placeholder="Task title"
            autoFocus
          />
        </div>

        <div className="edit-row">
          <select
            className="edit-select"
            value={editData.priority}
            onChange={(e) =>
              setEditData({ ...editData, priority: e.target.value })
            }
          >
            <option value="Low">🟢 Low</option>
            <option value="Medium">🟡 Medium</option>
            <option value="High">🔴 High</option>
          </select>

          <select
            className="edit-select"
            value={editData.category}
            onChange={(e) =>
              setEditData({ ...editData, category: e.target.value })
            }
          >
            <option value="Work">💼 Work</option>
            <option value="Study">📚 Study</option>
            <option value="Personal">🙂 Personal</option>
          </select>
        </div>

        <div className="edit-field">
          <input
            className="edit-input"
            type="date"
            value={editData.dueDate}
            onChange={(e) =>
              setEditData({ ...editData, dueDate: e.target.value })
            }
          />
        </div>

        <div className="edit-actions">
          <button className="btn-save" onClick={handleEditSave}>
            ✓ Save
          </button>
          <button className="btn-cancel" onClick={handleEditCancel}>
            ✕ Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`task-card ${task.status === "Done" ? "done" : ""}`}>

    
      <p className="task-card-title">{task.title}</p>

    
      <div className="task-card-tags">
        {task.status === "Done" ? (
          <span className="tag tag-done">✓ Done</span>
        ) : (
          <>
            {task.priority && (
              <span className={PRIORITY_CLASS[task.priority] || "tag"}>
                {task.priority}
              </span>
            )}
            {task.category && (
              <span className={CATEGORY_CLASS[task.category] || "tag"}>
                {task.category}
              </span>
            )}
          </>
        )}
      </div>
      <div className="task-card-footer">
        <span
          className="task-card-date"
          style={isOverdue ? { color: "#F0997B" } : {}}
        >
          {formattedDate
            ? `📅 ${formattedDate}${isOverdue ? " • Overdue" : ""}`
            : ""}
        </span>

        <div className="task-card-actions">
         
          {prevStatus && (
            <button
              className="btn-status"
              onClick={() => onStatusChange(task._id, prevStatus)}
              title={`Move to ${prevStatus}`}
            >
              ←
            </button>
          )}

          {nextStatus && (
            <button
              className="btn-status"
              onClick={() => onStatusChange(task._id, nextStatus)}
              title={`Move to ${nextStatus}`}
            >
              {nextStatus === "Done" ? "✓" : "→"}
            </button>
          )}

          {task.status !== "Done" && (
            <button
              className="btn-edit"
              onClick={() => setIsEditing(true)}
              title="Edit task"
            >
              ✏️
            </button>
          )}

          <button
            className="btn-delete"
            onClick={() => onDelete(task._id)}
            title="Delete task"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;