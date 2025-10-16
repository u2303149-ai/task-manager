import React, { useState } from "react";
import API from "../api";

function TaskForm({ onTaskAdded }) {
  const [form, setForm] = useState({ title: "", description: "", dueDate: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/tasks", { ...form, status: "Pending" }); // default status
      setForm({ title: "", description: "", dueDate: "" });
      onTaskAdded(); // refresh TaskList
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="title"
        placeholder="Title"
        value={form.title}
        onChange={handleChange}
        required
      />
      <input
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
      />
      <input
        type="date"
        name="dueDate"
        value={form.dueDate}
        onChange={handleChange}
      />
      <button type="submit">Add Task</button>
    </form>
  );
}

export default TaskForm;
