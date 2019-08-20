import React from 'react'
import classes from './NewTodoListModal.module.css';

export const newTodoListModal = (props)=>{
    const addList = React.createRef();
    const titleError = React.createRef();

    const validateAndAddNewList=()=>{
        if(addList.current.value.trim() === ""){
            titleError.current.style.visibility= "visible";
            addList.current.focus();

        }else{
            props.addNew(addList.current.value);
        }              
    }

    return (<div className={classes.newTodoListModal}>
                <div>
                    <h3>Add New Todo List</h3>
                </div>
                <div>
                    <div>
                        <label>Enter Title For New Todo List</label>
                    </div>
                    <div>
                        <input type="text" ref={addList}/>
                    </div>
                    <span ref={titleError}>Title can not be empty</span>
                </div>
                <div>
                    <button onClick={props.cancelled}>Cancel</button>
                    <button onClick={validateAndAddNewList}>Add</button>
                </div>
            </div>);
}

export default newTodoListModal;