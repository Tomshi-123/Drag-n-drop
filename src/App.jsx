import { Routes, Route } from "react-router-dom";
import { AppProvider } from "./contexts/AppContext";
import Board from "./components/Board";
import AddTaskForm from "./components/AddTaskForm";
import TrashBin from "./components/TrashBin";
import SingleColumnView from "./components/SingleColumnView";
import "./index.css";

export default function App() {
  return (
    <AppProvider>
      <div className="py-5">
        <h1 className="text-center mb-4">U Gotta Do What U Gotta Do</h1>
        <div className="d-flex flex-column align-items-center">
          <AddTaskForm />
          <Routes>
            <Route path="/" element={<Board />} />
            <Route path="/column/:id" element={<SingleColumnView />} />
          </Routes>
          <TrashBin />
        </div>
      </div>
    </AppProvider>
  );
}