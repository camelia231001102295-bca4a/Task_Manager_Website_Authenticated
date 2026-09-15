import {
  Eye,
  Check,
  Trash2,
  Clock,
  ArrowUpRight
} from "lucide-react";

import { useNavigate } from "react-router-dom";

function TaskCard({
  task,
  onDelete,
  onComplete
}) {
  const navigate = useNavigate();

  return (
    <article className="task-card">

      {/* Top Section */}
      <div className="task-card-top">

        <div className="task-tags">
          <span
            className={`priority priority-${task.priority.toLowerCase()}`}
          >
            {task.priority}
          </span>

          <span className="category-tag">
            {task.category}
          </span>
        </div>

        <span
          className={`status status-${task.status.toLowerCase()}`}
        >
          {task.status}
        </span>

      </div>

      {/* Task Content */}
      <div className="task-card-content">

        <h3>{task.header}</h3>

        <p>{task.description}</p>

      </div>

      {/* Due Date */}
      <div className="task-date">

        <Clock size={20} />

        <div className="task-date-text">
          <span>Due Date</span>
          <strong>{task.dueDate}</strong>
        </div>

      </div>

      {/* Actions */}
      <div className="task-actions">

        <button
          className="card-action view-action"
          onClick={() => navigate(`/tasks/${task.id}`)}
        >
          <Eye size={19} />
          <span>View Task</span>
          <ArrowUpRight size={17} />
        </button>

        {task.status !== "Closed" && (
          <button
            className="card-action complete-action"
            onClick={() => onComplete(task.id)}
          >
            <Check size={19} />
            <span>Complete</span>
          </button>
        )}

        <button
          className="card-action delete-action"
          onClick={() => onDelete(task.id)}
          title="Delete task"
        >
          <Trash2 size={19} />
          <span>Delete</span>
        </button>

      </div>

    </article>
  );
}

export default TaskCard;