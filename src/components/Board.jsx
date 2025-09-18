import { useAppContext } from "../contexts/AppContext.jsx";
import  Column  from "./Column.jsx";

export default function Board() {
  const { columns } = useAppContext();

  return (
    <div className="container-fluid px-2">
      <div className="row justify-content-center flex-wrap overflow-auto" style={{ gap: 24 }}>

        {columns.map(col => (
          <div
            key={col.id}
            className="col-12 col-sm-6 col-md-4 col-lg-3 d-flex mb-4"
            style={{ minWidth: 280, maxWidth: 400 }}
          >
            <Column column={col} />
          </div>
        ))}
      </div>
    </div>
  );
}
