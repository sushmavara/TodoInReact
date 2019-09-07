import React from 'react'

export const deleteTodoListModal = (props)=>{
  return (<div>
            <div>
              <h3>Delete Todo List</h3>
            </div>
            <div>
              <label>Are you sure you want to delete selected Todo Lists ?!! </label>
            </div>
            <div>
              <button onClick={props.cancelled}>Cancel</button>
              <button onClick={props.deleteList}>Delete</button>
            </div>
          </div>
  );
}

export default deleteTodoListModal;