import {
  ClipboardList,
  Plus
} from "lucide-react";

import { useNavigate } from "react-router-dom";

function EmptyState({
  title = "No tasks found",
  message = "There are no tasks to display.",
  showButton = false
}) {

  const navigate = useNavigate();

  return (
    <div className="empty-state">

      <div className="empty-icon">
        <ClipboardList size={38} />
      </div>

      <h2>{title}</h2>

      <p>{message}</p>

      {showButton && (
        <button
          className="primary-button"
          onClick={() =>
            navigate("/add-task")
          }
        >
          <Plus size={19} />
          Add New Task
        </button>
      )}

    </div>
  );
}

export default EmptyState;