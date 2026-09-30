import {
  NavLink,
  useNavigate
} from "react-router-dom";

import {
  LayoutDashboard,
  ListTodo,
  PlusCircle,
  CheckCircle2,
  LogOut,
  ClipboardCheck
} from "lucide-react";

import { useAuth } from "../context/AuthContext";

function Sidebar() {

  const {
    user,
    signOut
  } = useAuth();

  const navigate = useNavigate();

  const handleLogout = () => {
    signOut();
    navigate("/signin");
  };

  return (
    <>
      <aside className="sidebar">

        <div className="brand">

          <div className="brand-icon">
            <ClipboardCheck size={27} />
          </div>

          <div>
            <h2>TaskFlow</h2>
            <span>Task Manager</span>
          </div>

        </div>

        <nav className="side-navigation">

          <p className="menu-label">
            WORKSPACE
          </p>

          <NavLink
            to="/"
            end
            className="side-link"
          >
            <LayoutDashboard size={21} />
            <span>Dashboard</span>
          </NavLink>

          <NavLink
            to="/tasks"
            className="side-link"
          >
            <ListTodo size={21} />
            <span>All Tasks</span>
          </NavLink>

          <NavLink
            to="/add-task"
            className="side-link"
          >
            <PlusCircle size={21} />
            <span>Add Task</span>
          </NavLink>

          <NavLink
            to="/completed"
            className="side-link"
          >
            <CheckCircle2 size={21} />
            <span>Completed</span>
          </NavLink>

        </nav>

        <div className="sidebar-bottom">

          <div className="user-mini">

            <div className="user-avatar">
              {user?.username
                ?.charAt(0)
                .toUpperCase()}
            </div>

            <div className="user-info">

              <strong>
                {user?.username || "User"}
              </strong>

              <small>
                {user?.email || ""}
              </small>

            </div>

          </div>

          <button
            className="logout-button"
            onClick={handleLogout}
          >
            <LogOut size={20} />
            <span>Sign Out</span>
          </button>

        </div>

      </aside>

      <nav className="mobile-nav">

        <NavLink
          to="/"
          end
        >
          <LayoutDashboard size={20} />
          <span>Home</span>
        </NavLink>

        <NavLink to="/tasks">
          <ListTodo size={20} />
          <span>Tasks</span>
        </NavLink>

        <NavLink to="/add-task">
          <PlusCircle size={22} />
          <span>Add</span>
        </NavLink>

        <NavLink to="/completed">
          <CheckCircle2 size={20} />
          <span>Done</span>
        </NavLink>

      </nav>
    </>
  );
}

export default Sidebar;