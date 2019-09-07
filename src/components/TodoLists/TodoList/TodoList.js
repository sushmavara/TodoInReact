import React from 'react'
import classes from './TodoList.module.css';
import TodoTask from '../TodoList/TodoTask/TodoTask'

const TodoList = (props) => {
  let todoList = <div className={classes.emptyTodoList}>Empty Todo list</div>;
  if(props.todoListDetails.length !== 0){
    todoList = props.todoListDetails.map((current) =>{
      return (
        <TodoTask key = {current.id} 
                  todoTitle = {current.title} 
                  todoCompleted = {current.isCompleted}
                  todoItemId = { current.id}
                  todoListID = {props.todoListID} />
        )
    });
  }
  return(
    <React.Fragment>
      <ul className={classes.todolistItems}>{todoList}</ul>
    </React.Fragment>
  );
}

export default TodoList;