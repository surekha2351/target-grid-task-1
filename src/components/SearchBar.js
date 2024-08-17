import React from 'react';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: ''
    };
  }

  handleSearch = (event) => {
    const query = event.target.value;
    this.setState({ searchQuery: query });
    this.props.onSearch(query);
  }

  render() {
    return (
      <input
        type="text"
        placeholder="Search tasks..."
        value={this.state.searchQuery}
        onChange={this.handleSearch}
        style={{
          width: '100%',
          padding: '10px',
          margin: '10px 0',
          fontSize: '1em'
        }}
      />
    );
  }
}

export default SearchBar;
