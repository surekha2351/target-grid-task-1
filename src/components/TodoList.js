// src/components/TodoList.js
import React from 'react';
import './TodoList.css'; // Import the CSS file for styling

const TodoList = ({ tasks, editTask, deleteTask, markTaskComplete }) => {
  return (
    <div className="todo-list">
      {tasks.map((task) => (
        <div key={task.id} className={`task-card ${task.completed ? 'completed' : ''}`}>
          <div className="task-content">
            <h3>{task.description}</h3>
            <p>{task.dueDate}</p>
            <div className="task-actions">
              <button onClick={() => markTaskComplete(task.id)}>
                {task.completed ? 'Undo' : 'Complete'}
              </button>
              <button onClick={() => editTask(task.id, { ...task, description: 'Updated' })}>
                Edit
              </button>
              <button onClick={() => deleteTask(task.id)}>Delete</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TodoList;
