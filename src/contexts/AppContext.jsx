import { createContext, useContext, useState, useEffect } from "react";

const AppContext = createContext();

export function AppProvider({ children }) {
  const [columns] = useState([
    { id: "1", title: "To Do" },
    { id: "2", title: "In Progress" },
    { id: "3", title: "Done" },
  ]);

  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });


  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);


  function moveTask(taskId, toColumnId) {
    setTasks(tasks =>
      tasks.map(task =>
        task.id === taskId ? { ...task, columnId: toColumnId } : task
      )
    );
  }

  function removeTask(taskId) {
    setTasks(tasks => tasks.filter(task => task.id !== taskId));
  }

  function addTask(title, columnId) {
    setTasks(tasks => [
      ...tasks,
      { id: Date.now().toString(), title, columnId }
    ]);
  }

  return (
    <AppContext.Provider value={{ columns, tasks, moveTask, addTask, removeTask }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
