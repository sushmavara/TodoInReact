import React from 'react'

const todoListAddModal = "showAddModal";


export const AddNewTodoListModal = (props) => {
  const addList = React.createRef();
  const titleError = React.createRef();

  const validateAndAddNewList = () => {
    if (addList.current.value.trim() === "") {
      titleError.current.style.visibility = "visible";
      addList.current.focus();
    } else {
      props.addNew(addList.current.value);
    }
  }

  const addNewTodoListModalDisplayHandler = () =>{
    props.modalDisplayStateHandler(todoListAddModal);
  }

  return (<div>
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
              <span ref={titleError}>Title can not be empty
              </span>
            </div>
            <div>
              <button onClick={addNewTodoListModalDisplayHandler}>Cancel</button>
              <button onClick={validateAndAddNewList}>Add</button>
            </div>
          </div>
  );
}

export default AddNewTodoListModal;