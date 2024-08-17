import React from 'react';
import TodoList from './components/TodoList';
import TaskForm from './components/TaskForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      labels: [],
      filteredTasks: [],
      searchQuery: '',
    };
  }

  componentDidMount() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const labels = JSON.parse(localStorage.getItem('labels')) || [];
    this.setState({ tasks, labels, filteredTasks: tasks });
  }

  saveTasksToLocalStorage = () => {
    localStorage.setItem('tasks', JSON.stringify(this.state.tasks));
  };

  addTask = (task) => {
    this.setState(
      (prevState) => ({
        tasks: [...prevState.tasks, task],
        filteredTasks: [...prevState.tasks, task],
      }),
      this.saveTasksToLocalStorage
    );
  };

  editTask = (taskId, updatedTask) => {
    const updatedTasks = this.state.tasks.map((task) =>
      task.id === taskId ? updatedTask : task
    );
    this.setState(
      { tasks: updatedTasks, filteredTasks: updatedTasks },
      this.saveTasksToLocalStorage
    );
  };

  deleteTask = (taskId) => {
    const updatedTasks = this.state.tasks.filter((task) => task.id !== taskId);
    this.setState(
      { tasks: updatedTasks, filteredTasks: updatedTasks },
      this.saveTasksToLocalStorage
    );
  };

  markTaskComplete = (taskId) => {
    const updatedTasks = this.state.tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    this.setState(
      { tasks: updatedTasks, filteredTasks: updatedTasks },
      this.saveTasksToLocalStorage
    );
  };

  createLabel = (label) => {
    this.setState((prevState) => ({
      labels: [...prevState.labels, label],
    }));
  };

  handleSearch = () => {
    const searchQuery = this.state.searchQuery.toLowerCase();
    const filteredTasks = this.state.tasks.filter((task) =>
      task.description.toLowerCase().includes(searchQuery)
    );
    this.setState({ filteredTasks });
  };

  handleSearchInputChange = (event) => {
    this.setState({ searchQuery: event.target.value });
  };

  render() {
    const groupedTasks = this.state.labels.reduce((groups, label) => {
      groups[label] = this.state.filteredTasks.filter((task) =>
        task.labels.includes(label)
      );
      return groups;
    }, {});

    const hasTasks = this.state.filteredTasks.length > 0;

    return (
      <div className="app">
        <h1>To-Do List</h1>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search tasks..."
            value={this.state.searchQuery}
            onChange={this.handleSearchInputChange}
          />
          <button className="search-button" onClick={this.handleSearch}>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
        </div>
        <TaskForm
          addTask={this.addTask}
          labels={this.state.labels}
          createLabel={this.createLabel}
        />
        {hasTasks ? (
          Object.entries(groupedTasks).map(([label, tasks]) => (
            <div key={label}>
              <h2>{label} Tasks</h2>
              <TodoList
                tasks={tasks}
                editTask={this.editTask}
                deleteTask={this.deleteTask}
                markTaskComplete={this.markTaskComplete}
              />
            </div>
          ))
        ) : (
          <p>No tasks found</p>
        )}
      </div>
    );
  }
}

export default App;
