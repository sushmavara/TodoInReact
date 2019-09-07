import React from 'react'
import classes from './TodoItem.module.css';
import DeleteTodo from '../../../../assets/todo-delete.png'
import CompleteTodo from '../../../../assets/todo-complete.png'
import TodoItemActionsContext from '../../../../context/todoItemActions'

const TodoItem = ({todoTitle,todoCompleted,todoItemId,todoListID})=>{

  let titleClass= todoCompleted ?[classes.todoTitle ,classes.markComplete].join(" "): classes.todoTitle;
  return (<TodoItemActionsContext.Consumer>
    {
      (context) =>  (
        <li className={classes.todoTask}>
          <input type="checkbox" name="todoSelect" onChange={()=>context.toggleTodoCheckedHandler(todoListID,todoItemId)}/>
          <div className={titleClass}>
            {todoTitle}
          </div>      
          <div> 
            <button onClick={()=>context.toggleMarkCompleteHandler(todoListID,todoItemId)}>
              <img src={CompleteTodo} alt="mark complete todo"/>
            </button>
            <button onClick={()=>context.deleteTodoHandler(todoListID,todoItemId)}>
              <img src={DeleteTodo} alt="delete todo"/>
            </button>  
          </div>            
        </li>)
    }
    </TodoItemActionsContext.Consumer>
  );
}

export default React.memo(TodoItem);