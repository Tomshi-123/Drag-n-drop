import { useState } from "react";
import { useAppContext } from "../contexts/AppContext";
import Card from "./Card";

export default function Column({ column }) {
  const { tasks, moveTask } = useAppContext();
  const [glow, setGlow] = useState(false);

  const columnTasks = tasks.filter(t => t.columnId === column.id);

  function onDrop(e) {
    e.preventDefault();
    const taskId = e.dataTransfer.getData("text/plain");
    moveTask(taskId, column.id);

    setGlow(true);
    setTimeout(() => setGlow(false), 180);
  }

  function onDragOver(e) {
    e.preventDefault();
    // Skip scroll logic on touch, let polyfill handle drag
    if (e.type === "touchmove") return;
  }

  return (
    <div
      className={`bg-white rounded shadow-sm p-3 w-100${glow ? " column-border-glow" : ""}`}
      style={{
        minHeight: 350,
        border: "3px solid #e9ecef",
        display: "flex",
        flexDirection: "column",
        transition: "box-shadow 0.2s, border-color 0.2s"
      }}
      onDrop={onDrop}
      onDragOver={onDragOver}
    >
      <h5 className="mb-3 text-center">{column.title}</h5>
      <div style={{ flex: 1 }}>
        {columnTasks.map(task => (
          <Card key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}
