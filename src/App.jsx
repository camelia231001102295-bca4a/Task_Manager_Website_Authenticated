import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import { TaskProvider } from "./context/TaskContext";

import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/Layout";

import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import Tasks from "./pages/Tasks";
import AddTask from "./pages/AddTask";
import TaskDetails from "./pages/TaskDetails";
import EditTask from "./pages/EditTask";
import CompletedTasks from "./pages/CompletedTasks";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <TaskProvider>
          <Routes>

            <Route
              path="/signin"
              element={<SignIn />}
            />

            <Route
              path="/signup"
              element={<SignUp />}
            />

            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Layout />
                </ProtectedRoute>
              }
            >
              <Route
                index
                element={<Dashboard />}
              />

              <Route
                path="tasks"
                element={<Tasks />}
              />

              <Route
                path="tasks/:id"
                element={<TaskDetails />}
              />

              <Route
                path="tasks/:id/edit"
                element={<EditTask />}
              />

              <Route
                path="add-task"
                element={<AddTask />}
              />

              <Route
                path="completed"
                element={<CompletedTasks />}
              />
            </Route>

            <Route
              path="*"
              element={
                <Navigate
                  to="/signin"
                  replace
                />
              }
            />

          </Routes>
        </TaskProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;