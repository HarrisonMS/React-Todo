import React, {Component} from 'react';
import TodoList from "./components/TodoList";
import TodoForm from "./components/TodoForm"
import  "./components/Todo.css"


const data = [
  {
    name: 'Organize Garage',
    id: 1528817077286,
    completed: false
  },
  {
    name: 'Bake Cookies',
    id: 1528817084358,
    completed: false
  }
];

class App extends Component {
  constructor() {
    super();
    this.state = {
      todos: data,
      filtered: []
    };
  }


  addItem = name => {
    const newItem = {
      name: name,
      id: Date.now(),
      completed: false
    };
    this.setState({
      todos: [...this.state.todos, newItem]
    });
  };

 clearCompleted = e => {
   e.preventDefault();
   let todos = this.state.todos.filter(item => !item.completed);
   this.setState({todos})
 }
  toggleCompleted = id => {
    this.setState({
      todos: this.state.todos.map(item => {
        if (item.id === id) {
          return {
            ...item,
            completed: !item.completed
          };
        } else {
          return item;
        }
      })
    });
  };
 

  render() {
    console.log('rendering...', this.state.todos.filter(item => !item.completed));
    return (
      <div className="App">
        <div className="header">
          <h1>Todo List</h1>
        </div>
        <TodoForm addItem={this.addItem} />
        <button className="buttonClear" onClick={this.clearCompleted}>
        Clear Completed Todos
      </button>
        <TodoList
          toggleCompleted={this.toggleCompleted}
          todos={ this.state.todos }
        />
      </div>
    );
  }
}


export default App;