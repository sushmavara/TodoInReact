import React from 'react'
import TodoList from './TodoList/TodoList'
import classes from './TodoLists.module.css'

const todoLists = (props) => {
    const inputRefs = new Map();
    const emptyTodoErrorRefs = new Map();
    let todoListsContainer = "";

    const setInputRefs= (listID,ref) => {
        inputRefs.set(listID,ref);
        return inputRefs.get(listID)
    }

    const setEmptyTodoErrorRefs= (listID,ref) => {
        emptyTodoErrorRefs.set(listID,ref);
        return emptyTodoErrorRefs.get(listID)
    }

    const handleAddNewTodoItem = (listID,ref)=> {
        if(ref.current.value.trim()===""){
            emptyTodoErrorRefs.get(listID).current.style.visibility="visible";
            ref.current.focus();
        }
        else{ 
            emptyTodoErrorRefs.get(listID).current.style.visibility="hidden";
            props.addNewTodo(listID,ref.current.value);
            ref.current.value="";
            ref.current.focus();
        }
    }


    const getCheckedTodoItemsInTheList = (listID) => {
        const todoList=props.todoLists.reduce((result,current)=> {
            result = current.listId === listID ? result[result.length]=current: result;
            return result});
        const checkedTodos= todoList.listDetails.reduce((result,current)=> {
                if(current.isChecked) result.push(current.id);
            return result},[]);
        return checkedTodos;
    }

    const deleteSelectedTodos = (listId) =>{
        const checkedTodos= getCheckedTodoItemsInTheList(listId);
        for(let todoID of checkedTodos){
            props.deleteTodoHandler(listId,todoID);
        }
    }

    const marCompleteSelectedTodos = (listId) =>{
        const checkedTodos= getCheckedTodoItemsInTheList(listId);
        for(let todoID of checkedTodos){
            props.markCompleteHandler(listId,todoID);
        } 
    }

    const handleAddNewTodoItemOnEnter = (listId,event) =>{
        if(event.which === 13){
            handleAddNewTodoItem(listId,inputRefs.get(listId));
        }
    }

    if(props.numberOfTodoLists ===0){
        todoListsContainer =<p className={classes.emptyTodoContainer}>No Todo Lists To display</p>
    }else {
        todoListsContainer = props.todoLists.map((current) =>{
        let listID=current.listId;
        return (
            <div className={classes.todoListWrapper} key={listID}>
                <div className={classes.todoListHeader}>
                    <input type="checkbox" onChange={()=>props.toggleTodoListCheckedHandler(listID)}></input>
                    <h2>{current.listTitle}</h2>
                </div>
                <div>
                    <input placeholder="Add Your Todo Task" ref={setInputRefs(listID,React.createRef())} 
                            onKeyPress={(event) => {handleAddNewTodoItemOnEnter(listID,event)}}></input>
                    <button className={classes.addTodoTaskBtn} 
                            onClick={() => {handleAddNewTodoItem(listID,inputRefs.get(listID))}}>
                        Add Todo
                    </button>
                </div>
                <span ref={setEmptyTodoErrorRefs(listID,React.createRef())}><em>Task can not be empty</em></span>
                <div className={classes.todoListActionBar}>
                    <button onClick={()=>{deleteSelectedTodos(listID)}}>
                        Delete Todo
                    </button>
                    <button onClick={()=>{marCompleteSelectedTodos(listID)}}>
                        Mark Complete
                    </button>  
                </div>
                <div  className={classes.todoList}>
                    <TodoList
                        todoListID={listID} 
                        todoListDetails={current.listDetails}
                        />   
                </div> 
            </div>        
            )
        });
    }
    return todoListsContainer;
}

export default todoLists;