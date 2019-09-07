import React, {Component} from 'react'
import TodoList from './TodoList/TodoList'
import classes from './TodoLists.module.css'

class TodoLists extends Component {
  constructor(props) {
    super(props);
    this.inputRefs = new Map();
    this.emptyTodoErrorRefs = new Map();
  }

  setInputRefs = (listID, ref) => {
    this.inputRefs.set(listID, ref);
    return this.inputRefs.get(listID)
  }

  setEmptyTodoErrorRefs = (listID, ref) => {
    this.emptyTodoErrorRefs.set(listID, ref);
    return this.emptyTodoErrorRefs.get(listID)
  }

  handleAddNewTodoItem = (listID, ref) => {
    if (ref.current.value.trim() === "") {
      this.emptyTodoErrorRefs.get(listID).current.style.visibility = "visible";
      ref.current.focus();
    } else {
      this.emptyTodoErrorRefs.get(listID).current.style.visibility = "hidden";
      this.props.addNewTodo(listID, ref.current.value);
      ref.current.value = "";
      ref.current.focus();
    }
  }

  getCheckedTodoItemsInTheList = (listID) => {
    const todoList = this.props.todoLists.reduce((result, current) => {
      result = current.listId === listID ? result[result.length] = current : result;
      return result
    });
    const checkedTodos = todoList.listDetails.reduce((result, current) => {
      if (current.isChecked) result.push(current.id);
      return result
    }, []);
    return checkedTodos;
  }

  deleteSelectedTodos = (listId) => {
    const checkedTodos = this.getCheckedTodoItemsInTheList(listId);
    for (let todoID of checkedTodos) {
      this.props.deleteTodoHandler(listId, todoID);
    }
  }

  marCompleteSelectedTodos = (listId) => {
    const checkedTodos = this.getCheckedTodoItemsInTheList(listId);
    for (let todoID of checkedTodos) {
      this.props.markCompleteHandler(listId, todoID);
    }
  }

  handleAddNewTodoItemOnEnter = (listId, event) => {
    if (event.which === 13) {
      this.handleAddNewTodoItem(listId, this.inputRefs.get(listId));
    }
  }

  render (){
    let todoListsContainer = "";
    if(this.props.todoLists.length ===0){
      todoListsContainer = (<p className={classes.emptyTodoContainer}>No Todo Lists To display</p>);
    } else {
        todoListsContainer = this.props.todoLists.map((current) => {
          let listID=current.listId;
          return (
                <div className={classes.todoListWrapper} key={listID}>
                  <div className={classes.todoListHeader}>
                    <input type="checkbox" onChange={()=>this.props.toggleTodoListCheckedHandler(listID)}></input>
                    <h2>{current.listTitle}</h2>
                  </div>
                  <div>
                    <input placeholder="Add Your Todo Task" ref={this.setInputRefs(listID,React.createRef())} 
                           onKeyPress={(event) => {this.handleAddNewTodoItemOnEnter(listID,event)}}></input>
                    <button className={classes.addTodoTaskBtn} 
                            onClick={() => {this.handleAddNewTodoItem(listID,this.inputRefs.get(listID))}}>
                            Add Todo
                    </button>
                  </div>
                  <span ref={this.setEmptyTodoErrorRefs(listID,React.createRef())}>
                    <em>Task can not be empty</em>
                  </span>
                  <div className={classes.todoListActionBar}>
                    <button onClick={()=>{this.deleteSelectedTodos(listID)}}>
                        Delete Todo
                    </button>
                    <button onClick={()=>{this.marCompleteSelectedTodos(listID)}}>
                        Mark Complete
                    </button>  
                  </div>
                  <div  className={classes.todoList}>
                    <TodoList todoListID={listID} 
                              todoListDetails={current.listDetails} />   
                  </div> 
                </div>        
            )
          });
        }
    return (todoListsContainer);
  }  
}

export default TodoLists;