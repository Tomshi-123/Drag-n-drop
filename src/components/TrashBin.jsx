import { useRef } from "react";
import { useAppContext } from "../contexts/AppContext";

export default function TrashBin() {
  const { removeTask } = useAppContext();
  const binRef = useRef();

  function onDragEnter(e) {
    console.log('Drag enter trashbin:', e.type); // Debug-log
  }

  function onDragOver(e) {
    console.log('Drag over trashbin:', e.type); // Debug-log
    e.preventDefault();
  }

  function onDrop(e) {
    console.log('Drop on trashbin:', e.type); // Debug-log
    e.preventDefault();
    const taskId = e.dataTransfer.getData("text/plain");

    if (binRef.current) {
      binRef.current.classList.add("wiggle-pop");
      setTimeout(() => {
        binRef.current.classList.remove("wiggle-pop");
      }, 400);
    }

    const taskElem = document.querySelector(`[data-task-id="${taskId}"]`);
    if (taskElem && binRef.current) {
      const binRect = binRef.current.getBoundingClientRect();
      const taskRect = taskElem.getBoundingClientRect();
      const deltaX = binRect.left + binRect.width / 2 - (taskRect.left + taskRect.width / 2);
      const deltaY = binRect.top + binRect.height / 2 - (taskRect.top + taskRect.height / 2);

      taskElem.style.transition = "transform 0.4s cubic-bezier(.6,-0.28,.74,.05), opacity 0.4s";
      taskElem.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(0.1)`;
      taskElem.style.opacity = "0";

      setTimeout(() => {
        removeTask(taskId);
      }, 350);
    } else {
      removeTask(taskId);
    }
  }

  return (
    <div
      ref={binRef}
      className="trash-bin mt-4 d-flex align-items-center justify-content-center"
      onDragEnter={onDragEnter}
      onDragOver={onDragOver}
      onDrop={onDrop}
      style={{
        width: 48,
        height: 48,
        borderRadius: "50%",
        background: "#fff",
        border: "1.5px solid #dee2e6",
        boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
        cursor: "pointer",
        transition: "background 0.2s"
      }}
      title="Släpp här för att ta bort"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="#6c757d" className="bi bi-trash3" viewBox="0 0 16 16">
        <path d="M6.5 1.5A1.5 1.5 0 0 1 8 3h3.5A1.5 1.5 0 0 1 13 4.5V5h1.5a.5.5 0 0 1 0 1H14v8.5A1.5 1.5 0 0 1 12.5 16h-9A1.5 1.5 0 0 1 2 14.5V6H1.5a.5.5 0 0 1 0-1H3v-.5A1.5 1.5 0 0 1 4.5 3H8a1.5 1.5 0 0 1 1.5-1.5zm-2 3A.5.5 0 0 0 4 5v.5h8V5a.5.5 0 0 0-.5-.5h-7zM3 6v8.5a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5V6H3zm3.5 2a.5.5 0 0 1 .5.5v5a.5.5 0 0 1-1 0v-5a.5.5 0 0 1 .5-.5zm3 0a.5.5 0 0 1 .5.5v5a.5.5 0 0 1-1 0v-5a.5.5 0 0 1 .5-.5z"/>
      </svg>
    </div>
  );
}