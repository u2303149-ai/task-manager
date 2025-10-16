import React, { useState } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

function App() {
  const [refresh, setRefresh] = useState(false);

  // function to refresh tasks
  const refreshTasks = () => setRefresh(!refresh);

  return (
    <div style={{ padding: 20 }}>
      <h1>🎯 Student Task Manager</h1>
      <TaskForm onTaskAdded={refreshTasks} />
      <TaskList key={refresh} />
    </div>
  );
}

export default App;
