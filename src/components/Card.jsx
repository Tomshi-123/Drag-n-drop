export default function Card({ task }) {
  function onDragStart(e) {
    e.dataTransfer.setData("text/plain", task.id);
  }

  return (
    <div
      className="card shadow-sm mb-3"
      draggable
      onDragStart={onDragStart}
      data-task-id={task.id}
      style={{
        cursor: "grab",
        background: "#2a50699d",
        border: "none",
        borderRadius: "8px",
        padding: "12px 16px",
        fontSize: "1rem",
        color: "#fff",
        fontWeight: 500,
        touchAction: "none" // ← Viktigt för mobilen
      }}
    >
      {task.title}
    </div>
  );
}
