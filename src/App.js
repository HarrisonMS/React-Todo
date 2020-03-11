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
      todos: tasks
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
  // componentDidMount() {
  //   fetch(data)
  //     .then(res => res.json())
  //     .then(tasks => this.setState({ todos: tasks }))
  //     .catch(err => console.log("noooo"));
  // }
 
  render() { if (this.state.tasks.length > 0){
    console.log('rendering...', this.state);
    return ( 
      <div className="App">
      <div className="header">
        <h1>Todo List</h1>
      </div>
      <div className="buttonWrapper">
        <TodoForm addItem={this.addItem} />
        <button className="button2" onClick={this.handleTasksSave}>
          Save Todos
        </button>
        <button className="button2" onClick={this.fetchLocalStorage}>
         Load Todos
        </button>
        <button className="button2" onClick={this.clearCompleted}>
          Clear Completed Todos
        </button>
        <form onChange={this.filterList}>
      <label className="label" htmlFor="item">Search</label>
        <input type="text"  name="search" id="search"/>
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
        <TodoForm addItem={this.addItem} />
        <div className="buttonWrapper">
        <button className="button2" onClick={this.handleTasksSave}>
          Save Todos
        </button>
        <button className="button2" onClick={this.fetchLocalStorage}>
         Load Todos
        </button>
        <button className="button2" onClick={this.clearCompleted}>
        Clear Completed Todos
      </button>
      </div>
      <form onChange={this.filterList}>
      <label className="label" htmlFor="item">Search</label>
        <input type="text"  name="search" id="search"/>
      </form>
      
        <TodoList
          toggleCompleted={this.toggleCompleted}
          todos={this.state.todos}
        />
      </div>
    )};
  }
}
export default App;
