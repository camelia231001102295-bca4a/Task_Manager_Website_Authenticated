import {
  CheckCircle2,
  ArrowLeft,
  Trophy,
  Plus
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import { useTasks } from "../context/TaskContext";

import TaskCard from "../components/TaskCard";
import EmptyState from "../components/EmptyState";

function CompletedTasks() {
  const navigate = useNavigate();

  const {
    tasks,
    deleteTask,
    completeTask
  } = useTasks();

  const completedTasks = tasks.filter(
    (task) => task.status === "Closed"
  );

  const total = tasks.length;

  const completionRate =
    total === 0
      ? 0
      : Math.round(
          (completedTasks.length / total) * 100
        );

  return (
    <div className="page">

      {/* Header */}
      <div className="page-header">

        <div>
          <span className="eyebrow">
            YOUR PROGRESS
          </span>

          <h1>Completed Tasks</h1>

          <p>
            Everything you have successfully finished.
          </p>
        </div>

        <button
          className="btn btn-primary"
          onClick={() => navigate("/add-task")}
        >
          <Plus size={20} />
          Add Task
        </button>

      </div>

      {/* Back Button */}
      <button
        className="btn btn-back"
        onClick={() => navigate("/")}
      >
        <ArrowLeft size={19} />
        Back to Dashboard
      </button>

      {/* Completion Summary */}
      <div className="completion-summary">

        <div className="completion-summary-icon">
          <Trophy size={28} />
        </div>

        <div className="completion-summary-content">

          <div className="completion-summary-top">

            <div>
              <strong>
                {completionRate}% Complete
              </strong>

              <span>
                {completedTasks.length} of {total} tasks finished
              </span>
            </div>

            <CheckCircle2 size={30} />

          </div>

          <div className="completion-progress">

            <div
              className="completion-progress-fill"
              style={{
                width: `${completionRate}%`
              }}
            />

          </div>

        </div>

      </div>

      {/* Completed Tasks */}
      {completedTasks.length === 0 ? (

        <EmptyState
          title="No completed tasks yet"
          message="Finish a task and it will appear here."
          showButton={true}
        />

      ) : (

        <div className="tasks-grid">

          {completedTasks.map((task) => (

            <TaskCard
              key={task.id}
              task={task}
              onDelete={deleteTask}
              onComplete={completeTask}
            />

          ))}

        </div>

      )}

    </div>
  );
}

export default CompletedTasks;