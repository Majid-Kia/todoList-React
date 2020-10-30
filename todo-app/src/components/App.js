import React, { Component } from 'react'
import deleteIcon from '../images/delete.svg'; // Tell webpack this JS file uses this image
import editIcon from '../images/edit.svg'; // Tell webpack this JS file uses this image

class App extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      todoList: [],
      inputTodoText: '',
      editMode : false,
      editItem : null,
    }
    this.textInput = React.createRef();
  }




  handleText = (e) => {

    this.setState({
      inputTodoText: e.target.value
    })

  }

  handleDone = (e,todo) => {
    this.setState(state => {
      const todoList = state.todoList.map(item => {
        if(todo === item){
          item.isSelected = e.target.checked
        }
        return item
      });
      return{
        todoList 
      }
    })
  }

  handleAddTodo = (e) => {

    if(e.keyCode === 13){
      
      if(!this.state.editMode){
        this.setState({
          todoList : [...this.state.todoList , {title : this.state.inputTodoText , isSelected:false}],
          inputTodoText : ''
        });
      }else{
        this.setState(state => {
          const todoList = state.todoList.map(item => {
            if(this.state.editItem === item){
              item.title = this.state.inputTodoText
            }
            return item
          });
          return{
            todoList ,
            editMode : false,
            inputTodoText : ''

          }

        });

        this.textInput.current.blur();


      }
    }
  }

  removeTodo = (todo) => {
    this.setState({
      todoList : this.state.todoList.filter(item => {
        return item !== todo
      })
    })
  }

  editTodo = (todo) => {
    this.setState({
      inputTodoText : todo.title,
      editMode : true,
      editItem : todo
    });
    this.textInput.current.focus();

  }





  render() {

    const renderTodoItem = this.state.todoList.map((todo, index) => {
      return (
        <li key={index}>
          <div>
            <input
             type="checkbox"
             id={todo+index}
             checked={todo.isSelected}
             onChange={(e)=>this.handleDone(e,todo)}
             />
            <label htmlFor={todo+index}></label>
            {todo.title}
          </div>
          <div>
            <span className="remove-todo" onClick={() => this.editTodo(todo)}>
              <img src={editIcon} alt=""/>
            </span>
            <span className="edit-todo" onClick={() => this.removeTodo(todo)}>
              <img src={deleteIcon} alt=""/>
            </span>
        
          </div>
        
        </li>
      )
    });

    return (
      <div className="App">
        <div className="container">
            <h1>Write It Down, Make It Happen</h1>
            <div className="todo">
              <input
                type="text"
                placeholder="Add your todo"
                value={this.state.inputTodoText}
                onChange={this.handleText}
                onKeyUp={this.handleAddTodo}
                ref={this.textInput}
              />

              {this.state.todoList.length > 0 &&
                  <ul>
                  {renderTodoItem}
                </ul>
              }
            
            </div>
        </div>
      </div>
    )
  }
}

export default App;


