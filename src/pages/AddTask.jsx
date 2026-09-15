import { useState } from "react";
import {
  ArrowLeft,
  Plus,
  FileText,
  Settings2
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTasks } from "../context/TaskContext";

function AddTask() {
  const navigate = useNavigate();
  const { addTask } = useTasks();

  const [header, setHeader] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [category, setCategory] = useState("Academic");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!header.trim()) {
      setError("Please enter a task header.");
      return;
    }

    if (!description.trim()) {
      setError("Please enter a task description.");
      return;
    }

    addTask({
      header: header.trim(),
      description: description.trim(),
      priority,
      category
    });

    navigate("/tasks");
  };

  return (
    <div className="page">

      {/* Header */}
      <div className="page-header">
        <div>
          <span className="eyebrow">
            TASK CREATION
          </span>

          <h1>Create New Task</h1>

          <p>
            Add a task and keep your work organized.
          </p>
        </div>
      </div>

      {/* Back */}
      <button
        className="btn btn-back"
        onClick={() => navigate("/")}
      >
        <ArrowLeft size={19} />
        Back to Dashboard
      </button>

      {/* Form */}
      <div className="form-container">

        <div className="form-card">

          <form onSubmit={handleSubmit}>

            {/* Task Information */}
            <div className="form-section">

              <div className="form-section-heading">

                <div className="form-section-icon">
                  <FileText size={23} />
                </div>

                <div>
                  <h2>Task Information</h2>
                  <p>
                    Give your task a clear title and description.
                  </p>
                </div>

              </div>

              <div className="form-group">

                <label>
                  Task Header <span className="required">*</span>
                </label>

                <input
                  type="text"
                  placeholder="e.g. Complete React Assignment"
                  value={header}
                  onChange={(e) => {
                    setHeader(e.target.value);
                    setError("");
                  }}
                />

              </div>

              <div className="form-group">

                <div className="label-row">
                  <label>
                    Task Description{" "}
                    <span className="required">*</span>
                  </label>

                  <small>
                    {description.length}/500
                  </small>
                </div>

                <textarea
                  rows="7"
                  maxLength="500"
                  placeholder="Describe what needs to be completed..."
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                    setError("");
                  }}
                />

              </div>

            </div>

            {/* Task Settings */}
            <div className="form-section">

              <div className="form-section-heading">

                <div className="form-section-icon">
                  <Settings2 size={23} />
                </div>

                <div>
                  <h2>Task Settings</h2>

                  <p>
                    Choose priority and category.
                  </p>
                </div>

              </div>

              <div className="form-two-columns">

                <div className="form-group">

                  <label>Priority</label>

                  <select
                    value={priority}
                    onChange={(e) =>
                      setPriority(e.target.value)
                    }
                  >
                    <option>High</option>
                    <option>Medium</option>
                    <option>Low</option>
                  </select>

                </div>

                <div className="form-group">

                  <label>Category</label>

                  <select
                    value={category}
                    onChange={(e) =>
                      setCategory(e.target.value)
                    }
                  >
                    <option>Academic</option>
                    <option>Personal</option>
                  </select>

                </div>

              </div>

              <div className="form-two-columns">

                <div className="form-group">

                  <label>Raised Date &amp; Time</label>

                  <input
                    type="text"
                    value="Automatically generated"
                    disabled
                    readOnly
                  />

                </div>

                <div className="form-group">

                  <label>Due Date</label>

                  <input
                    type="text"
                    value="28 Aug 2026"
                    disabled
                    readOnly
                  />

                </div>

              </div>

            </div>

            {/* Error */}
            {error && (
              <div className="message error">
                {error}
              </div>
            )}

            {/* Actions */}
            <div className="form-actions">

              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => navigate("/")}
              >
                <ArrowLeft size={19} />
                Back to Dashboard
              </button>

              <button
                type="submit"
                className="btn btn-primary"
              >
                <Plus size={20} />
                Create Task
              </button>

            </div>

          </form>

        </div>

      </div>

    </div>
  );
}

export default AddTask;