import { useState, useEffect } from "react";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";

export default function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await fetch("https://backend-s6n8.onrender.com/tasks");
        if (!res.ok) throw new Error("Failed to fetch tasks");
        const data = await res.json();
        setTasks(data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    fetchTasks();
  }, []);

  const addTask = async (text) => {
    const res = await fetch("https://backend-s6n8.onrender.com/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });
    const newTask = await res.json();
    setTasks([...tasks, newTask]);
  };

  const toggleTask = async (id, completed) => {
    try {
      const res = await fetch(`https://backend-s6n8.onrender.com/tasks/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: !completed }),
      });

      if (!res.ok) throw new Error("Failed to update task");

      const updatedTask = await res.json();

      setTasks((prevTasks) =>
        prevTasks.map((task) => (task._id === id ? updatedTask : task))
      );
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const editTask = async (id, text) => {
    const res = await fetch(`https://backend-s6n8.onrender.com/tasks/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });
    const updatedTask = await res.json();
    setTasks(tasks.map((task) => (task._id === id ? updatedTask : task)));
  };

  const deleteTask = async (id) => {
    await fetch(`https://backend-s6n8.onrender.com/tasks/${id}`, { method: "DELETE" });
    setTasks(tasks.filter((task) => task._id !== id));
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-br from-[#1e1e2e] to-[#11111a] p-6">
      <div className="bg-white/10 backdrop-blur-lg shadow-2xl rounded-3xl p-8 w-full max-w-lg transition-all border border-white/20">
        <h1 className="text-4xl font-extrabold text-white mb-6 text-center tracking-wide">
          🚀 Task Manager📝
        </h1>
        <TaskInput addTask={addTask} />
        <TaskList tasks={tasks} toggleTask={toggleTask} editTask={editTask} deleteTask={deleteTask} />
      </div>
    </div>
  );
}
