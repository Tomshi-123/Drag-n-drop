import { useRef } from 'react';

export default function Card({ task }) {
  const cardRef = useRef(null);

  function onDragStart(e) {
    console.log('Drag start:', e.type, task.id); 
    e.dataTransfer.setData('text/plain', task.id);
    if (cardRef.current) {
      cardRef.current.classList.add('dragging');
    }
  }

  function onDragEnd(e) {
    console.log('Drag end:', e.type, task.id); 
    if (cardRef.current) {
      cardRef.current.classList.remove('dragging');
    }
  }

  function onClick(e) {
    e.stopPropagation(); 
    console.log('Clicked card:', task.id); 
  }

  return (
    <div
      ref={cardRef}
      className="card shadow-sm mb-3 task-card"
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onClick={onClick}
      data-task-id={task.id}
      style={{
        cursor: 'grab',
        background: '#2a50699d',
        border: 'none',
        borderRadius: '8px',
        padding: '12px 16px',
        fontSize: '1rem',
        color: '#fff',
        fontWeight: 500,
        position: 'relative',
        zIndex: 10,
      }}
    >
      {task.title}
    </div>
  );
}