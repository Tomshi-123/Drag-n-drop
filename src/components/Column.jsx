import { useState } from "react";
import { useAppContext } from "../contexts/AppContext";
import Card from "./Card";
import { Link } from "react-router-dom";

export default function Column({ column }) {
  const { tasks, moveTask } = useAppContext();
  const [glow, setGlow] = useState(false);

  function onDrop(e) {
    e.preventDefault();
    const taskId = e.dataTransfer.getData("text/plain");
    moveTask(taskId, column.id);

    // Trigger glow effect
    setGlow(true);
    setTimeout(() => setGlow(false), 180);
  }

  function onDragOver(e) {
  e.preventDefault();

  const scrollMargin = 80; // px från toppen/botten för scroll-trigger
  const scrollSpeed = 10;  // px per event

  const y = e.clientY;
  const windowHeight = window.innerHeight;

  if (y < scrollMargin) {
    window.scrollBy({ top: -scrollSpeed, behavior: "smooth" });
  } else if (y > windowHeight - scrollMargin) {
    window.scrollBy({ top: scrollSpeed, behavior: "smooth" });
  }
}

  const columnTasks = tasks.filter(t => t.columnId === column.id);

  return (
    <div
      className={`bg-white rounded shadow-sm p-3 w-100 column-highlight-box${glow ? " column-border-glow" : ""}`}
      style={{
        minHeight: 350,
        border: "3px solid #e9ecef",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        transition: "box-shadow 0.2s, border-color 0.2s"
      }}
      onDrop={onDrop}
      onDragOver={onDragOver}
    >
      <h5 className="mb-3 text-center">
        <Link to={`/column/${column.id}`} className="text-decoration-none text-dark">
          {column.title}
        </Link>
      </h5>
      <div style={{ flex: 1 }}>
        {columnTasks.map(task => (
          <Card key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}
