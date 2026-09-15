import { useState } from "react";
import {
  Search,
  SlidersHorizontal,
  ArrowLeft,
  Plus,
  RotateCcw
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTasks } from "../context/TaskContext";
import TaskCard from "../components/TaskCard";
import EmptyState from "../components/EmptyState";

function Tasks() {
  const navigate = useNavigate();

  const {
    tasks,
    deleteTask,
    completeTask
  } = useTasks();

  const [search, setSearch] = useState("");
  const [priority, setPriority] = useState("All");
  const [category, setCategory] = useState("All");
  const [status, setStatus] = useState("All");

  const filteredTasks = tasks.filter((task) => {
    const searchMatch =
      task.header.toLowerCase().includes(search.toLowerCase()) ||
      task.description.toLowerCase().includes(search.toLowerCase());

    const priorityMatch =
      priority === "All" || task.priority === priority;

    const categoryMatch =
      category === "All" || task.category === category;

    const statusMatch =
      status === "All" || task.status === status;

    return (
      searchMatch &&
      priorityMatch &&
      categoryMatch &&
      statusMatch
    );
  });

  const clearFilters = () => {
    setSearch("");
    setPriority("All");
    setCategory("All");
    setStatus("All");
  };

  return (
    <div className="page">

      {/* Header */}
      <div className="page-header">

        <div>
          <span className="eyebrow">
            TASK MANAGEMENT
          </span>

          <h1>All Tasks</h1>

          <p>
            Search, filter and manage everything in your workspace.
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

      {/* Filters */}
      <div className="tasks-toolbar">

        <div className="filter-group">

          <div className="search-wrapper">
            <Search size={20} />

            <input
              type="text"
              placeholder="Search tasks..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />
          </div>

          <div className="filter-control">
            <SlidersHorizontal size={18} />

            <select
              value={priority}
              onChange={(e) =>
                setPriority(e.target.value)
              }
            >
              <option>All</option>
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>
          </div>

          <div className="filter-control">

            <select
              value={category}
              onChange={(e) =>
                setCategory(e.target.value)
              }
            >
              <option>All</option>
              <option>Academic</option>
              <option>Personal</option>
            </select>

          </div>

          <div className="filter-control">

            <select
              value={status}
              onChange={(e) =>
                setStatus(e.target.value)
              }
            >
              <option>All</option>
              <option>Raised</option>
              <option>Pending</option>
              <option>Closed</option>
            </select>

          </div>

          <button
            className="filter-btn"
            onClick={clearFilters}
            title="Clear filters"
          >
            <RotateCcw size={18} />
            Reset
          </button>

        </div>

      </div>

      {/* Task Count */}
      <div className="task-count">
        Showing{" "}
        <strong>{filteredTasks.length}</strong>{" "}
        of{" "}
        <strong>{tasks.length}</strong>{" "}
        {tasks.length === 1 ? "task" : "tasks"}
      </div>

      {/* Tasks */}
      {filteredTasks.length === 0 ? (

        <EmptyState
          title="No matching tasks"
          message="Try changing your search or filters."
          showButton={tasks.length === 0}
        />

      ) : (

        <div className="tasks-grid">

          {filteredTasks.map((task) => (
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

export default Tasks;