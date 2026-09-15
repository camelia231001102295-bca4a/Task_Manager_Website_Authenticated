import {
  createContext,
  useContext,
  useEffect,
  useState
} from "react";

const TaskContext = createContext();

function getSavedTasks() {

  const saved =
    localStorage.getItem(
      "taskManagerTasks"
    );

  if (!saved) {
    return [];
  }

  try {
    return JSON.parse(saved);
  } catch {
    localStorage.removeItem(
      "taskManagerTasks"
    );

    return [];
  }
}

export function TaskProvider({ children }) {

  const [tasks, setTasks] =
    useState(getSavedTasks);

  useEffect(() => {

    localStorage.setItem(
      "taskManagerTasks",
      JSON.stringify(tasks)
    );

  }, [tasks]);

  const addTask = (taskData) => {

    const newTask = {
      ...taskData,

      id: Date.now().toString(),

      raisedDate:
        new Date().toLocaleString(),

      dueDate: "28 Aug 2026",

      status: "Raised"
    };

    setTasks((current) => [
      newTask,
      ...current
    ]);
  };

  const updateTask = (
    id,
    updatedTask
  ) => {

    setTasks((current) =>
      current.map((task) =>
        task.id === id
          ? {
              ...task,
              ...updatedTask
            }
          : task
      )
    );
  };

  const deleteTask = (id) => {

    setTasks((current) =>
      current.filter(
        (task) => task.id !== id
      )
    );
  };

  const completeTask = (id) => {

    setTasks((current) =>
      current.map((task) =>
        task.id === id
          ? {
              ...task,
              status: "Closed"
            }
          : task
      )
    );
  };

  const reopenTask = (id) => {

    setTasks((current) =>
      current.map((task) =>
        task.id === id
          ? {
              ...task,
              status: "Pending"
            }
          : task
      )
    );
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        addTask,
        updateTask,
        deleteTask,
        completeTask,
        reopenTask
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export function useTasks() {
  return useContext(TaskContext);
}