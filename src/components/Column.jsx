import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import Card from "./Card";

export default function Column({ column }) {
  const { tasks, moveTask } = useAppContext();
  const [glow, setGlow] = useState(false);
  const navigate = useNavigate();

  const columnTasks = tasks.filter(t => t.columnId === column.id);

  function onDragEnter(e) {
    console.log('Drag enter column:', e.type, column.id);
  }

  function onDragOver(e) {
    console.log('Drag over column:', e.type, column.id); 
    e.preventDefault();
    if (e.type === "touchmove") return;
  }

  function onDrop(e) {
    console.log('Drop on column:', e.type, column.id);
    e.preventDefault();
    const taskId = e.dataTransfer.getData("text/plain");
    moveTask(taskId, column.id);

    setGlow(true);
    setTimeout(() => setGlow(false), 180);
  }

  function handleClick(e) {
    console.log('Clicked column:', column.id); 
    navigate(`/column/${column.id}`);
  }

  function onTouchStart(e) {

    e.stopPropagation();
    console.log('Touch start on column title:', column.id); 
  }

  return (
    <div
      className={`bg-white text-dark rounded shadow-sm p-3 w-100${glow ? " column-border-glow" : ""}`}
      style={{
        minHeight: 350,
        border: "3px solid #e9ecef",
        display: "flex",
        flexDirection: "column",
        transition: "box-shadow 0.2s, border-color 0.2s",
      }}
      onDragEnter={onDragEnter}
      onDragOver={onDragOver}
      onDrop={onDrop}
    >
      <h5
        className="mb-3 text-center column-title"
        onClick={handleClick}
        onTouchStart={onTouchStart}
        style={{ cursor: "pointer" }}
      >
        {column.title}
      </h5>
      <div style={{ flex: 1 }}>
        {columnTasks.map(task => (
          <Card key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}