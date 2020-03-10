import React from 'react';

class TodoForm extends React.Component {

  constructor() {
    super();
    this.state = {
      newItem: '',
    };
  }

  handleChanges = e => {
    this.setState({
      newItem: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.addItem(this.state.newItem);
    this.setState({ newItem: '' });
  };
//   clearCompleted = e => {
//     e.preventDefault();
//     let todos = this.state.todos.filter(item => !item.completed);
//     this.setState({todos})
//   }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="item">Add Todo</label>
        <input
          type="text"
          name="item"
          id="item"
          value={this.state.newItem}
          onChange={this.handleChanges}
        />
        <button>Add</button>
        
      </form>
    );
  }
}

export default TodoForm;