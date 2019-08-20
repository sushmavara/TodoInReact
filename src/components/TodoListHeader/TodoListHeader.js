import React from 'react'
import classes from './TodoListHeader.module.css'
import Modal from '../../UI/Modal/Modal'
import AddNewTodoListModal from '../DataModal/NewTodoList/NewTodoListModal'
import DeleteTodoListModal from '../DataModal/DeleteTodoList/DeleteTodoListModal'

const todoListAddModal = "showAddModal";
const delteTodoListModal ="showDeleteModal";

function todoListHeader(props){    
    let modalWrapper = props.showAddModal? (<Modal show={props.showAddModal} 
                                            toggleModalState={() => props.modalStateHandler(todoListAddModal)}>
                                            <AddNewTodoListModal
                                                cancelled={() => props.modalStateHandler(todoListAddModal)}
                                                addNew = {props.addNewTodoHandler}
                                                />
                                            </Modal>)
                        :props.showDeleteModal?(<Modal show={props.showDeleteModal} 
                                            toggleModalState={() => props.modalStateHandler(delteTodoListModal)}>
                                            <DeleteTodoListModal
                                                cancelled={() => props.modalStateHandler(delteTodoListModal)}
                                                deleteList={props.deleteTodoListHandler}
                                            /></Modal>)
                        :null;

    return(
            <div className={classes.todoListHeader}>
                {modalWrapper}
                <button onClick={()=>props.modalStateHandler(todoListAddModal)}> Add New Todo List </button>
                <button onClick={()=>props.modalStateHandler(delteTodoListModal)}> Delete Lists</button>
            </div>
      
    )
}
export default todoListHeader;