import {
  ArrowLeft,
  CalendarDays,
  Tag,
  Flag,
  CheckCircle2,
  Pencil,
  RotateCcw,
  Trash2,
  Clock3
} from "lucide-react";

import {
  useNavigate,
  useParams
} from "react-router-dom";

import { useTasks } from "../context/TaskContext";

function TaskDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    tasks,
    completeTask,
    reopenTask,
    deleteTask
  } = useTasks();

  const task = tasks.find(
    (item) => item.id === id
  );

  /* =========================
     TASK NOT FOUND
     ========================= */

  if (!task) {
    return (
      <div className="page task-details-page">

        <div className="details-not-found">

          <div className="not-found-icon">
            <Trash2 size={30} />
          </div>

          <span className="eyebrow">
            TASK DETAILS
          </span>

          <h1>Task Not Found</h1>

          <p>
            This task may have been deleted or is no longer available.
          </p>

          <button
            className="btn btn-primary"
            onClick={() => navigate("/tasks")}
          >
            <ArrowLeft size={19} />
            Back to All Tasks
          </button>

        </div>

      </div>
    );
  }

  /* =========================
     DELETE TASK
     ========================= */

  const handleDelete = () => {
    deleteTask(task.id);
    navigate("/tasks");
  };

  return (
    <div className="page task-details-page">

      {/* =====================================
          PAGE HEADER
          ===================================== */}

      <div className="details-page-heading">

        <div>
          <span className="eyebrow">
            TASK DETAILS
          </span>

          <h1>
            Task Overview
          </h1>

          <p>
            View the complete information and manage this task.
          </p>
        </div>

        <button
          className="btn btn-secondary"
          onClick={() => navigate("/")}
        >
          <ArrowLeft size={19} />
          Dashboard
        </button>

      </div>


      {/* =====================================
          BACK TO TASKS
          ===================================== */}

      <button
        className="btn btn-back"
        onClick={() => navigate("/tasks")}
      >
        <ArrowLeft size={19} />
        Back to All Tasks
      </button>


      {/* =====================================
          MAIN DETAILS CARD
          ===================================== */}

      <div className="details-card">


        {/* ===================================
            TASK HEADER / HERO
            =================================== */}

        <div className="details-hero">


          {/* LEFT SIDE */}

          <div className="details-hero-content">

            <span className="eyebrow">
              TASK
            </span>

            <h2>
              {task.header}
            </h2>

            <p className="details-description">
              {task.description}
            </p>

          </div>


          {/* RIGHT SIDE
              HIGHLIGHTED INFORMATION */}

          <div className="task-status-panel">


            {/* PRIORITY */}

            <div className="task-highlight-card task-highlight-priority">

              <div className="task-highlight-icon">
                <Flag size={23} />
              </div>

              <div className="task-highlight-info">

                <span>
                  PRIORITY
                </span>

                <strong>
                  {task.priority}
                </strong>

              </div>

            </div>


            {/* CATEGORY */}

            <div className="task-highlight-card task-highlight-category">

              <div className="task-highlight-icon">
                <Tag size={23} />
              </div>

              <div className="task-highlight-info">

                <span>
                  CATEGORY
                </span>

                <strong>
                  {task.category}
                </strong>

              </div>

            </div>


            {/* STATUS */}

            <div className="task-highlight-card task-highlight-status">

              <div className="task-highlight-icon">
                <CheckCircle2 size={23} />
              </div>

              <div className="task-highlight-info">

                <span>
                  STATUS
                </span>

                <strong>

                  <i className="task-status-dot"></i>

                  {task.status}

                </strong>

              </div>

            </div>

          </div>

        </div>


        {/* ===================================
            TASK INFORMATION
            =================================== */}

        <div className="details-section">


          <div className="details-section-heading">

            <div className="details-section-icon">
              <Clock3 size={22} />
            </div>

            <div>

              <span className="eyebrow">
                TASK INFORMATION
              </span>

              <h3>
                Schedule & Details
              </h3>

            </div>

          </div>


          <div className="details-grid">


            {/* RAISED DATE */}

            <div className="detail-item">

              <div className="detail-icon blue">
                <CalendarDays size={22} />
              </div>

              <div>

                <span>
                  Raised Date & Time
                </span>

                <strong>
                  {task.raisedDate}
                </strong>

              </div>

            </div>


            {/* DUE DATE */}

            <div className="detail-item">

              <div className="detail-icon orange">
                <CalendarDays size={22} />
              </div>

              <div>

                <span>
                  Due Date
                </span>

                <strong>
                  {task.dueDate}
                </strong>

              </div>

            </div>


            {/* PRIORITY */}

            <div className="detail-item">

              <div className="detail-icon yellow">
                <Flag size={22} />
              </div>

              <div>

                <span>
                  Priority
                </span>

                <strong>
                  {task.priority}
                </strong>

              </div>

            </div>


            {/* CATEGORY */}

            <div className="detail-item">

              <div className="detail-icon green">
                <Tag size={22} />
              </div>

              <div>

                <span>
                  Category
                </span>

                <strong>
                  {task.category}
                </strong>

              </div>

            </div>

          </div>

        </div>


        {/* ===================================
            ACTIONS
            =================================== */}

        <div className="details-actions-section">


          <div className="details-actions-heading">

            <div>

              <span className="eyebrow">
                ACTIONS
              </span>

              <h3>
                Manage This Task
              </h3>

            </div>

            <p>
              Update the status or modify this task.
            </p>

          </div>


          <div className="details-actions">


            {/* COMPLETE / REOPEN */}

            {task.status !== "Closed" ? (

              <button
                className="details-action complete-details-action"
                onClick={() =>
                  completeTask(task.id)
                }
              >

                <CheckCircle2 size={21} />

                <span>
                  Mark Complete
                </span>

              </button>

            ) : (

              <button
                className="details-action reopen-details-action"
                onClick={() =>
                  reopenTask(task.id)
                }
              >

                <RotateCcw size={21} />

                <span>
                  Reopen Task
                </span>

              </button>

            )}


            {/* EDIT */}

            <button
              className="details-action edit-details-action"
              onClick={() =>
                navigate(`/tasks/${task.id}/edit`)
              }
            >

              <Pencil size={21} />

              <span>
                Edit Task
              </span>

            </button>


            {/* DELETE */}

            <button
              className="details-action delete-details-action"
              onClick={handleDelete}
            >

              <Trash2 size={21} />

              <span>
                Delete Task
              </span>

            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default TaskDetails;