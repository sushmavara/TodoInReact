import React from 'react'
const delteTodoListModal ="showDeleteModal";

export const DeleteTodoListModal = (props)=>{
  const deleteTodoListModalDisplayHandler = () =>{
    props.modalDisplayStateHandler(delteTodoListModal);
  }


  return (<div>
            <div>
              <h3>Delete Todo List</h3>
            </div>
            <div>
              <label>Are you sure you want to delete selected Todo Lists ?!! </label>
            </div>
            <div>
              <button onClick={deleteTodoListModalDisplayHandler}>Cancel</button>
              <button onClick={props.deleteList}>Delete</button>
            </div>
          </div>
  );
}

export default DeleteTodoListModal;