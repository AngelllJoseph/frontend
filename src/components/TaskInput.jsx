import { useState } from "react"; 
import { FaPlus } from "react-icons/fa";

export default function TaskInput({ addTask }) {
  const [newTask, setNewTask] = useState("");

  const handleAdd = () => {
    if (newTask.trim() !== "") {
      addTask(newTask);
      setNewTask("");
    }
  };

  return (
    <div className="relative flex mb-6">
      <input
        type="text"
        className="w-full p-4 border border-white/20 rounded-xl shadow-md bg-white/10 backdrop-blur-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
        placeholder="Add a new task..."
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
      />
      <button
        className="absolute right-2 top-2 bottom-2 bg-blue-600 text-white px-4 rounded-xl flex items-center justify-center hover:bg-blue-700 transition"
        onClick={handleAdd}
      >
        <FaPlus size={20} />
      </button>
    </div>
  );
}
