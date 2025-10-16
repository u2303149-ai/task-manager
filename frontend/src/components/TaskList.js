import React, { useEffect, useState } from "react";
import API from "../api";

function TaskList() {
  const [tasks, setTasks] = useState([]);

  // Load tasks from backend
  const loadTasks = async () => {
    try {
      const res = await API.get("/tasks");
      setTasks(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // Delete task
  const deleteTask = async (id) => {
    try {
      await API.delete(`/tasks/${id}`);
      loadTasks(); // reload after delete
    } catch (err) {
      console.error(err);
    }
  };

  // Toggle status
  const toggleStatus = async (task) => {
    try {
      const newStatus = task.status === "Pending" ? "Completed" : "Pending";
      await API.put(`/tasks/${task._id}`, { ...task, status: newStatus });
      loadTasks(); // reload after update
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <div>
      <h3>All Tasks</h3>
      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            <strong>{task.title}</strong> - {task.status}{" "}
            <button onClick={() => toggleStatus(task)}>Toggle</button>{" "}
            <button onClick={() => deleteTask(task._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskList;
