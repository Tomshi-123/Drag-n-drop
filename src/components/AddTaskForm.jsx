import { useState } from "react";
import { useAppContext } from "../contexts/AppContext";

function AddTaskForm() {
  const { columns, addTask } = useAppContext();
  const [title, setTitle] = useState("");
  const [columnId, setColumnId] = useState(columns[0].id);

  function handleSubmit(e) {
    e.preventDefault();
    if (title.trim()) {
      addTask(title, columnId);
      setTitle("");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-4 d-flex flex-wrap align-items-center gap-2"
      style={{ maxWidth: 500, width: "100%" }}
    >
      <input
        type="text"
        className="form-control form-control-sm"
        placeholder="Task titel"
        value={title}
        onChange={e => setTitle(e.target.value)}
        style={{ minWidth: 0, flex: 2 }}
      />
      <select
        className="form-select form-select-sm"
        value={columnId}
        onChange={e => setColumnId(e.target.value)}
        style={{ minWidth: 0, flex: 1, maxWidth: 140 }}
      >
        {columns.map(col => (
          <option key={col.id} value={col.id}>{col.title}</option>
        ))}
      </select>
      <button
        type="submit"
        className="btn btn-primary btn-sm"
        style={{ whiteSpace: "nowrap", flex: "0 0 auto" }}
      >
        Lägg till
      </button>
    </form>
  );
}

export default AddTaskForm;