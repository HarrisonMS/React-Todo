import React from 'react';
import TodoList from "./components/TodoList";
import FilteredList from './components/FilteredList'
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

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      todos: data,
      tasks: []
    };
  }

  filterList =(e) => {
    let tasks = this.state.todos;
    tasks = tasks.filter((task) => {
      return task.name.toLowerCase().search(e.target.value.toLowerCase()) !== -1;
    });
    this.setState({
      tasks: tasks
    })
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

  render() { if (this.state.tasks.length > 0){
    console.log('rendering...', this.state);
    return ( 
      <div className="App">
      <div className="header">
        <h1>Todo List</h1>
      </div>
      <div className="formWrapper">
        <TodoForm addItem={this.addItem} />
        <button className="buttonClear" onClick={this.clearCompleted}>
          Clear Completed Todos
        </button>
        <form>
          <input type="text" placeholder="Search" onChange={this.filterList}/>
        </form>
    </div>
      <FilteredList
      toggleCompleted={this.toggleCompleted}
      tasks={this.state.tasks}/>
      </div>)
  } else {
    console.log('rendering...', this.state);
    return (
      <div className="App">
        <div className="header">
          <h1>Todo List</h1>
        </div>
        <div className="formWrapper">
        <TodoForm addItem={this.addItem} />
        <button className="buttonClear" onClick={this.clearCompleted}>
        Clear Completed Todos
      </button>
      <form>
        <input type="text" placeholder="Search" onChange={this.filterList}/>
      </form>
      </div>
        <TodoList
          toggleCompleted={this.toggleCompleted}
          todos={this.state.todos}
        />
      </div>
    )};
  }
}
export default App;
