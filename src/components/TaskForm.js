import React from 'react';

class TaskForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      description: '',
      labels: [],
      newLabel: '',
    };
  }

  handleDescriptionChange = (event) => {
    this.setState({ description: event.target.value });
  };

  handleLabelChange = (event) => {
    const value = event.target.value;
    this.setState((prevState) => ({
      labels: prevState.labels.includes(value)
        ? prevState.labels.filter((label) => label !== value)
        : [...prevState.labels, value],
    }));
  };

  handleNewLabelChange = (event) => {
    this.setState({ newLabel: event.target.value });
  };

  addNewLabel = () => {
    const { newLabel } = this.state;
    if (newLabel) {
      this.props.createLabel(newLabel);
      this.setState({ newLabel: '' });
    }
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { description, labels } = this.state;
    const task = {
      id: Date.now(),
      description,
      labels,
      completed: false,
    };
    this.props.addTask(task);
    this.setState({ description: '', labels: [] });
  };

  render() {
    const { labels } = this.props;
    const { description, newLabel } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          placeholder="Task description"
          value={description}
          onChange={this.handleDescriptionChange}
          required
        />
        <div>
          {labels.map((label) => (
            <label key={label}>
              <input
                type="checkbox"
                value={label}
                onChange={this.handleLabelChange}
              />
              {label}
            </label>
          ))}
          <input
            type="text"
            placeholder="New label"
            value={newLabel}
            onChange={this.handleNewLabelChange}
          />
          <button type="button" onClick={this.addNewLabel}>
            Add Label
          </button><br/>
        </div>
        <button type="submit">Add Task</button>
      </form>
    );
  }
}

export default TaskForm;
