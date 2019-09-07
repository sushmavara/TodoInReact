import React from 'react'
import classes from './TodoTask.module.css';
import DeleteTodo from '../../../../assets/todo-delete.png'
import CompleteTodo from '../../../../assets/todo-complete.png'
import TodoItemActionsContext from '../../../../context/todoItemActions'

const todoItem = (props)=>{
  let titleClass= props.todoInfo.isCompleted ?[classes.todoTitle ,classes.markComplete].join(" "): classes.todoTitle;
  return (<TodoItemActionsContext.Consumer>
    {
      (context) =>  (
        <li className={classes.todoTask}>
          <input type="checkbox" name="todoSelect" onChange={()=>context.toggleTodoCheckedHandler(props.todoListID,props.todoInfo.id)}/>
          <div className={titleClass}>
            {props.todoInfo.title}
          </div>      
          <div> 
            <button onClick={()=>context.toggleMarkCompleteHandler(props.todoListID,props.todoInfo.id)}>
              <img src={CompleteTodo} alt="mark complete todo"/>
            </button>
            <button onClick={()=>context.deleteTodoHandler(props.todoListID,props.todoInfo.id)}>
              <img src={DeleteTodo} alt="delete todo"/>
            </button>  
          </div>            
        </li>)
    }
    </TodoItemActionsContext.Consumer>
  );
}

export default todoItem;