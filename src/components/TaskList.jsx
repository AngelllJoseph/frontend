import { useState } from "react"; 
import { FaTrash, FaEdit, FaCheckCircle, FaRegCircle } from "react-icons/fa";

export default function TaskList({ tasks, toggleTask, editTask, deleteTask }) {
  const [editingIndex, setEditingIndex] = useState(null);
  const [editText, setEditText] = useState("");

  const startEditing = (id, text) => {
    setEditingIndex(id);
    setEditText(text);
  };

  const saveEdit = (id) => {
    editTask(id, editText);
    setEditingIndex(null);
  };

  return (
    <ul className="space-y-4">
      {tasks.map((task) => (
        <li
          key={task._id}
          className={`flex items-center justify-between p-4 bg-white/10 backdrop-blur-md shadow-lg rounded-xl transition-all border border-white/20 transform hover:scale-105 ${
            task.completed ? "line-through text-gray-400" : "text-white"
          }`}
        >
          <button
            className="text-green-400 hover:text-green-500 transition"
            onClick={() => toggleTask(task._id, task.completed)}
          >
            {task.completed ? <FaCheckCircle size={24} /> : <FaRegCircle size={24} />}
          </button>
          {editingIndex === task._id ? (
            <input
              type="text"
              className="flex-1 p-2 border border-gray-400 rounded-md bg-transparent text-white focus:outline-none"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
            />
          ) : (
            <span
              onClick={() => toggleTask(task._id, task.completed)}
              className="cursor-pointer flex-1 mx-4 text-lg hover:text-blue-300 transition"
            >
              {task.text}
            </span>
          )}
          <div className="flex space-x-3">
            {editingIndex === task._id ? (
              <button
                className="text-green-400 hover:text-green-500 transition"
                onClick={() => saveEdit(task._id)}
              >
                <FaCheckCircle size={20} />
              </button>
            ) : (
              <button
                className="text-blue-400 hover:text-blue-500 transition"
                onClick={() => startEditing(task._id, task.text)}
              >
                <FaEdit size={20} />
              </button>
            )}
            <button
              className="text-red-400 hover:text-red-500 transition"
              onClick={() => deleteTask(task._id)}
            >
              <FaTrash size={20} />
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
