import { useParams, Link } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import Card from "./Card";


export default function SingleColumnView() {
  const { id } = useParams();
  const { columns, tasks } = useAppContext();
  const column = columns.find(col => col.id === id);
  const columnTasks = tasks.filter(t => t.columnId === id);

  if (!column) return <div className="text-center mt-5">Kolumnen finns inte.</div>;

  return (
    <div className="container d-flex flex-column align-items-center">
      <div className="bg-white rounded shadow-sm p-5 mx-auto mt-5" style={{ maxWidth: 400, width: "100%" }}>
        <h3 className="mb-4 text-center">{column.title}</h3>
        {columnTasks.length === 0 && (
          <div className="text-muted text-center">Inga tasks i denna kolumn.</div>
        )}
        {columnTasks.map(task => (
          <Card key={task.id} task={task} />
        ))}
      </div>
      <Link
        to="/"
        className="btn btn-outline-primary mt-3"
        style={{ minWidth: 180 }}
      >
        Tillbaka till boarden
      </Link>
    </div>
  );
}