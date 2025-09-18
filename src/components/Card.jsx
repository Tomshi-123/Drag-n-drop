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
        background: "#bce4ffff",
        border: "none",
        borderRadius: "8px",
        padding: "12px 16px",
        fontSize: "1rem",
        color: "#343a40",
        fontWeight: 500,
        transition: "box-shadow 0.2s"
      }}
    >
      {task.title}
    </div>
  );
}