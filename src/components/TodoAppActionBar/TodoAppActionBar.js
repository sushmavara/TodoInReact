import React from 'react'
import classes from './TodoAppActionBar.module.css'
import Modal from '../../UI/Modal/Modal'
import AddNewTodoListModal from '../DataModal/AddNewTodoListModal/AddNewTodoListModal'
import DeleteTodoListModal from '../DataModal/DeleteTodoListModal/DeleteTodoListModal'

const todoListAddModal = "showAddModal";
const delteTodoListModal ="showDeleteModal";

const TodoAppActionBar = (props) => {    
  let modalWrapper = props.showAddModal? (<Modal show={props.showAddModal} 
                                          toggleModalState={() => props.modalStateHandler(todoListAddModal)}>
                                            <AddNewTodoListModal
                                              modalDisplayStateHandler={props.modalStateHandler}
                                              addNew = {props.addNewTodoHandler}
                                            />
                                          </Modal>)
                    :props.showDeleteModal?(<Modal show={props.showDeleteModal} 
                                            toggleModalState={() => props.modalStateHandler(delteTodoListModal)}>
                                              <DeleteTodoListModal
                                                modalDisplayStateHandler={props.modalStateHandler}
                                                deleteList={props.deleteTodoListHandler}
                                              />
                                            </Modal>)
                    :null;
  return(
    <div className={classes.todoListHeader}>
      {modalWrapper}
      <button onClick={()=>props.modalStateHandler(todoListAddModal)}> Add New Todo List </button>
      <button onClick={()=>props.modalStateHandler(delteTodoListModal)}> Delete Lists</button>
    </div>
  )
}
export default TodoAppActionBar;