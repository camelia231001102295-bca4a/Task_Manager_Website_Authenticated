import { useNavigate } from "react-router-dom";
import {
  CheckCircle2,
  Clock3,
  ListTodo,
  Plus,
  ArrowRight,
  BarChart3
} from "lucide-react";

import { useTasks } from "../context/TaskContext";

function Dashboard() {
  const navigate = useNavigate();
  const { tasks } = useTasks();

  const totalTasks = tasks.length;

  const completedTasks = tasks.filter(
    (task) => task.status === "Closed"
  ).length;

  const pendingTasks = tasks.filter(
    (task) => task.status === "Pending"
  ).length;

  const raisedTasks = tasks.filter(
    (task) => task.status === "Raised"
  ).length;

  const progress =
    totalTasks === 0
      ? 0
      : Math.round((completedTasks / totalTasks) * 100);

  return (
    <div className="page dashboard-page">

      {/* Header */}
      <div className="page-header">
        <div>
          <span className="eyebrow">TASK MANAGER</span>

          <h1>Dashboard</h1>

          <p>
            Track your work, stay organized and complete your goals.
          </p>
        </div>

        <button
          className="btn btn-primary"
          onClick={() => navigate("/add-task")}
        >
          <Plus size={20} />
          Add New Task
        </button>
      </div>


      {/* Statistics */}
      <div className="stats-grid">

        <div className="stat-card">
          <div className="stat-icon blue">
            <ListTodo size={25} />
          </div>

          <div>
            <span>Total Tasks</span>
            <strong>{totalTasks}</strong>
          </div>
        </div>


        <div className="stat-card">
          <div className="stat-icon orange">
            <Clock3 size={25} />
          </div>

          <div>
            <span>Pending</span>
            <strong>{pendingTasks}</strong>
          </div>
        </div>


        <div className="stat-card">
          <div className="stat-icon green">
            <CheckCircle2 size={25} />
          </div>

          <div>
            <span>Completed</span>
            <strong>{completedTasks}</strong>
          </div>
        </div>


        <div className="stat-card">
          <div className="stat-icon yellow">
            <BarChart3 size={25} />
          </div>

          <div>
            <span>Raised</span>
            <strong>{raisedTasks}</strong>
          </div>
        </div>

      </div>


      {/* Main Dashboard */}
      <div className="dashboard-grid">

        {/* Progress */}
        <div className="dashboard-card">

          <div className="card-heading">
            <div>
              <span className="eyebrow">YOUR PROGRESS</span>
              <h2>Completion Rate</h2>
            </div>
          </div>


          <div className="progress-content">

            <div
              className="progress-circle"
              style={{
                "--progress": `${progress}%`
              }}
            >
              <div className="progress-circle-inner">
                <strong>{progress}%</strong>
                <span>Completed</span>
              </div>
            </div>


            <div className="progress-text">

              <h3>
                {progress === 100
                  ? "Everything completed!"
                  : progress >= 50
                  ? "You're doing great!"
                  : progress > 0
                  ? "Keep going!"
                  : "Let's get started!"}
              </h3>

              <p>
                {completedTasks} out of {totalTasks}{" "}
                {totalTasks === 1 ? "task" : "tasks"} completed.
              </p>

              <button
                className="btn btn-secondary"
                onClick={() => navigate("/tasks")}
              >
                View All Tasks
                <ArrowRight size={18} />
              </button>

            </div>

          </div>

        </div>


        {/* Quick Actions */}
        <div className="dashboard-card">

          <div className="card-heading">
            <div>
              <span className="eyebrow">QUICK ACTIONS</span>
              <h2>Manage Tasks</h2>
            </div>
          </div>


          <div className="quick-actions">

            <button
              className="action-box"
              onClick={() => navigate("/add-task")}
            >
              <div className="action-icon green">
                <Plus size={24} />
              </div>

              <div>
                <strong>Add Task</strong>
                <span>Create a new task</span>
              </div>

              <ArrowRight size={19} />
            </button>


            <button
              className="action-box"
              onClick={() => navigate("/tasks")}
            >
              <div className="action-icon blue">
                <ListTodo size={24} />
              </div>

              <div>
                <strong>All Tasks</strong>
                <span>View and manage tasks</span>
              </div>

              <ArrowRight size={19} />
            </button>


            <button
              className="action-box"
              onClick={() => navigate("/completed")}
            >
              <div className="action-icon orange">
                <CheckCircle2 size={24} />
              </div>

              <div>
                <strong>Completed</strong>
                <span>View finished tasks</span>
              </div>

              <ArrowRight size={19} />
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;