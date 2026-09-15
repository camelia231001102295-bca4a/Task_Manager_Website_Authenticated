import { useState } from "react";

import {
  ArrowLeft,
  Save
} from "lucide-react";

import {
  useNavigate,
  useParams
} from "react-router-dom";

import { useTasks } from "../context/TaskContext";

function EditTask() {

  const { id } = useParams();

  const navigate = useNavigate();

  const {
    tasks,
    updateTask
  } = useTasks();

  const task = tasks.find(
    item => item.id === id
  );

  const [header, setHeader] =
    useState(task?.header || "");

  const [description, setDescription] =
    useState(
      task?.description || ""
    );

  const [priority, setPriority] =
    useState(
      task?.priority || "Medium"
    );

  const [category, setCategory] =
    useState(
      task?.category || "Academic"
    );

  if (!task) {

    return (
      <div className="page">

        <button
          className="back-button"
          onClick={() =>
            navigate("/tasks")
          }
        >
          <ArrowLeft size={20} />
          Back to Tasks
        </button>

        <div className="empty-state">
          <h2>Task not found</h2>
        </div>

      </div>
    );
  }

  const handleSubmit = e => {

    e.preventDefault();

    if (!header.trim() ||
        !description.trim()) {
      return;
    }

    updateTask(id, {
      header: header.trim(),
      description: description.trim(),
      priority,
      category
    });

    navigate(
      `/tasks/${id}`
    );
  };

  return (
    <div className="page">

      <button
        className="back-button"
        onClick={() =>
          navigate(
            `/tasks/${id}`
          )
        }
      >
        <ArrowLeft size={20} />
        Back to Task Details
      </button>

      <div className="page-heading">

        <p className="eyebrow">
          TASK MANAGEMENT
        </p>

        <h1>Edit Task</h1>

        <p>
          Update the details of your task.
        </p>

      </div>

      <div className="form-card">

        <form onSubmit={handleSubmit}>

          <div className="form-section">

            <div className="form-group">

              <label>
                Task Header
              </label>

              <input
                value={header}
                onChange={e =>
                  setHeader(
                    e.target.value
                  )
                }
              />

            </div>

            <div className="form-group">

              <label>
                Task Description
              </label>

              <textarea
                rows="7"
                value={description}
                onChange={e =>
                  setDescription(
                    e.target.value
                  )
                }
              />

            </div>

            <div className="form-two-columns">

              <div className="form-group">

                <label>
                  Priority
                </label>

                <select
                  value={priority}
                  onChange={e =>
                    setPriority(
                      e.target.value
                    )
                  }
                >
                  <option>High</option>
                  <option>Medium</option>
                  <option>Low</option>
                </select>

              </div>

              <div className="form-group">

                <label>
                  Category
                </label>

                <select
                  value={category}
                  onChange={e =>
                    setCategory(
                      e.target.value
                    )
                  }
                >
                  <option>Academic</option>
                  <option>Personal</option>
                </select>

              </div>

            </div>

          </div>

          <div className="form-actions">

            <button
              type="button"
              className="secondary-button large"
              onClick={() =>
                navigate(
                  `/tasks/${id}`
                )
              }
            >
              <ArrowLeft size={19} />
              Back
            </button>

            <button
              type="submit"
              className="primary-button large"
            >
              <Save size={20} />
              Save Changes
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default EditTask;