import React from 'react';

function TodoItem({ task, updateTask, deleteTask }) {
  const toggleComplete = () => {
    updateTask(task.id, { ...task, completed: !task.completed });
  };

  return (
    <div>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={toggleComplete}
      />
      <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
        {task.description}
      </span>
      <button onClick={() => deleteTask(task.id)}>Delete</button>
    </div>
  );
}

export default TodoItem;
