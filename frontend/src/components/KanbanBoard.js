import React from "react";
import TaskCard from "./TaskCard";

const COLUMNS = [
  {
    key: "To Do",
    dot: "#4d5566",
  },
  {
    key: "In Progress",
    dot: "#EF9F27",
  },
  {
    key: "Done",
    dot: "#5DCAA5",
  },
];

const KanbanBoard = ({ tasks, onStatusChange, onDelete,onEdit, searchQuery }) => {
  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes((searchQuery || "").toLowerCase())
  );

  const getTasksByStatus = (status) =>
    filteredTasks.filter((task) => task.status === status);

  const totalFiltered = filteredTasks.length;

  return (
    <>
      {/* No results message */}
      {searchQuery && totalFiltered === 0 && (
        <div className="no-tasks">
          No tasks found matching "<strong>{searchQuery}</strong>"
        </div>
      )}

      {/* No tasks at all */}
      {!searchQuery && tasks.length === 0 && (
        <div className="no-tasks">
          No tasks yet — add one above to get started 🚀
        </div>
      )}

      {/* Kanban columns */}
      {(tasks.length > 0 || searchQuery) && (
        <div className="kanban-board">
          {COLUMNS.map(({ key, dot }) => {
            const columnTasks = getTasksByStatus(key);
            return (
              <div className="kanban-column" key={key}>

                {/* Column Header */}
                <div className="kanban-column-header">
                  <span
                    className="kanban-column-dot"
                    style={{ background: dot }}
                  />
                  <span className="kanban-column-title">{key}</span>
                  <span className="kanban-column-count">
                    {columnTasks.length}
                  </span>
                </div>

                {/* Cards or Empty */}
                {columnTasks.length === 0 ? (
                  <div className="kanban-empty">
                    {searchQuery ? "No matches" : "No tasks here"}
                  </div>
                ) : (
                  columnTasks.map((task) => (
                    <TaskCard
                      key={task._id}
                      task={task}
                      onStatusChange={onStatusChange}
                      onDelete={onDelete}
                      onEdit={onEdit}
                    />
                  ))
                )}

              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default KanbanBoard;