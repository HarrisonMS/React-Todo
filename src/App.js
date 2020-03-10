import React from 'react';
import TodoList from "./components/TodoList";
import FilteredList from './components/FilteredList'
import TodoForm from "./components/TodoForm"
import  "./components/Todo.css"


const data = [
  {
    name: 'Code a bit',
    id: 1528817077286,
    completed: false
  },
  {
    name: 'Break it a bit',
    id: 1528817084358,
    completed: false
  },
  {
    name: 'Code some more',
    id: 1528817077287,
    completed: false
  },
  {
    name: 'break it real good',
    id: 1528817084359,
    completed: false
  },
  { name: 'Next project',
    id: 1528817084355,
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
    // e.preventDefault()
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

  handleTasksSave = () => {
    const {todos} = this.state;
    localStorage.setItem('todos', JSON.stringify(todos));
  }
  fetchLocalStorage = () => {
    this.setState({
    todos: JSON.parse(window.localStorage.getItem('todos'))
  })}
 
  render() { if (this.state.tasks.length > 0){
    console.log('rendering...', this.state);
    return ( 
      <div className="App">
      <div className="header">
        <h1>Todo List</h1>
      </div>
      <div className="formWrapper">
        <TodoForm addItem={this.addItem} />
        <button className="buttonSave" onClick={this.handleTasksSave}>
          Save Todos
        </button>
        <button className="buttonSave" onClick={this.fetchLocalStorage}>
         Load Todos
        </button>
        <button className="buttonClear" onClick={this.clearCompleted}>
          Clear Completed Todos
        </button>
        <form onChange={this.filterList}>
        <input type="text" placeholder="Search" name="search" id="search"/>
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
        <button className="buttonSave" onClick={this.handleTasksSave}>
          Save Todos
        </button>
        <button className="buttonSave" onClick={this.fetchLocalStorage}>
         Load Todos
        </button>
        <button className="buttonClear" onClick={this.clearCompleted}>
        Clear Completed Todos
      </button>
      <form onChange={this.filterList}>
        <input type="text" placeholder="Search" name="search" id="search"/>
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
