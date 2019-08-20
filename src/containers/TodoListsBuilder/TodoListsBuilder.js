import React , {Component} from 'react'
import classes from './TodoListsBuilder.module.css'
import TodoLists from '../../components/TodoLists/TodoLists'
import addIcon from '../../assets/add_todo_list.png'
import TodoListHeader from '../../components/TodoListHeader/TodoListHeader'
import TodoItem from '../../modals/TodoItem'
import TodoItemActionsContext from '../../context/todoItemActions'

class TodoListsBuilder extends Component{
    constructor(props){
        super(props);
        this.state ={
            numberOfTodoLists:0,
            todoLists : [],
            showAddModal : false,
            showDeleteModal:false
        }
    }

    toggleModalDisplay = (modalName) =>{
            const updatedState= {
                ...this.state
            }
            updatedState[[modalName]] = !updatedState[[modalName]];
            this.setState({
                [modalName] : updatedState[[modalName]]
            });
    }

    addNewTodoListHandler = (title) =>{
        const stateObject= {
            ...this.state
        }
        stateObject.todoLists.push({
            listId: Date.now().toString(),
            listDetails: [],
            listTitle:title,
            isSelected:false
        });
        stateObject.numberOfTodoLists=stateObject.numberOfTodoLists+1;
        this.setState({
            todoLists : stateObject.todoLists,
            showAddModal : false,
            numberOfTodoLists:stateObject.numberOfTodoLists
        });
    }

    addNewTodoItemHandler = (listId,title)=>{
        const newTodoItem = new TodoItem(title);
        const stateObject= {
            ...this.state
        }
        const todoList=stateObject.todoLists.reduce((result,current)=> {
            result = current.listId === listId ? result[result.length]=current: result;
            return result},[]);
        todoList.listDetails.unshift(newTodoItem);
        this.setState({
            todoLists:stateObject.todoLists
        })
    }

    getCheckedTodoItem =(stateObject,listId,itemId)=>{
        const todoList=stateObject.todoLists.reduce((result,current)=> {
            if(current.listId === listId) result.push(current);return result;
        },[])[0];
        let todoItem = [];
        if(itemId && itemId !== null){
            todoItem = todoList.listDetails.reduce((result,current)=> {
                if(current.id === itemId) result.push(current); return result;
            },[])[0];
        }
        return [todoItem ,todoList];
    }

    toggleMarkCompleteHandler = (listId, itemId) => {
        const stateObject= {
            ...this.state
        }
        const [todoItem ,] = this.getCheckedTodoItem(stateObject,listId,itemId);
        todoItem.toggleMarkComplete();
        this.setState({
            todoLists:stateObject.todoLists
        });
    }

    markCompleteSelectedTodos = (listId, itemId) => {
        const stateObject= {
            ...this.state
        }
        const [todoItem ,] = this.getCheckedTodoItem(stateObject,listId,itemId);
        todoItem.markComplete();
        this.setState({
            todoLists:stateObject.todoLists
        });
    }

    toggleTodoCheckedHandler = (listId, itemId) => {
        const stateObject= {
            ...this.state
        }
        const [todoItem ,] = this.getCheckedTodoItem(stateObject,listId,itemId);
        todoItem.toggleChecked();
        this.setState({
            todoLists:stateObject.todoLists
        });
    }

    deleteTodoHandler =(listId, itemId) => {
        const stateObject= {
            ...this.state
        }
        const [todoItem ,todoList]= this.getCheckedTodoItem(stateObject,listId,itemId);
        const deleteIndex=todoList.listDetails.findIndex((cur)=>cur.id === todoItem.id);
        todoList.listDetails.splice(deleteIndex,1);
        this.setState({
            todoLists:stateObject.todoLists
        });
    }

    toggleTodoListCheckedHandler = (listId) => {
        const stateObject= {
            ...this.state
        }
        const [,todoList] = this.getCheckedTodoItem(stateObject,listId);
        todoList.isSelected=!todoList.isSelected;
        this.setState({
            todoLists:stateObject.todoLists
        });
    }

    deleteTodoListHandler =() => {
        const stateObject= {
            ...this.state
        }
        const listIdsToDelete = stateObject.todoLists.reduce((result,cur) =>
                                 {  if(cur.isSelected) result.push(cur.listId); return result;
                                },[]);
        listIdsToDelete.forEach(element => {
            const deleteIndex=stateObject.todoLists.findIndex((cur) => cur.id === listIdsToDelete);
            stateObject.todoLists.splice(deleteIndex,1); 
            stateObject.numberOfTodoLists=stateObject.numberOfTodoLists-1;
        });      
             
        this.setState({
            todoLists : stateObject.todoLists,
            showDeleteModal : false,
            numberOfTodoLists:stateObject.numberOfTodoLists
        });
    }
    

    render(){
        let addListButton =null;
        if(this.state.numberOfTodoLists !== 0)
        {
            addListButton = (<div>
                <button className = {classes.addIcon} onClick={()=>this.toggleModalDisplay("showAddModal")} >
                    <img src = {addIcon} alt = "add todo list"></img>
                </button>
            </div>);
        }
        return(
            <React.Fragment>
                <TodoListHeader modalStateHandler={this.toggleModalDisplay}
                                 showAddModal={this.state.showAddModal} 
                                 showDeleteModal={this.state.showDeleteModal}
                                 addNewTodoHandler={this.addNewTodoListHandler}  
                                 deleteTodoListHandler={this.deleteTodoListHandler} 
                                 />
                <div className={classes.todoListsContainer}>
                <TodoItemActionsContext.Provider value={{ toggleTodoCheckedHandler: this.toggleTodoCheckedHandler,
                                                          toggleMarkCompleteHandler: this.toggleMarkCompleteHandler ,
                                                          deleteTodoHandler: this.deleteTodoHandler  }}>
                    <TodoLists 
                        todoLists={this.state.todoLists}
                        addNewTodo= {this.addNewTodoItemHandler}
                        numberOfTodoLists={this.state.numberOfTodoLists}
                        markCompleteHandler={this.markCompleteSelectedTodos }
                        deleteTodoHandler={this.deleteTodoHandler}
                        toggleTodoListCheckedHandler ={this.toggleTodoListCheckedHandler}
                        />
                </TodoItemActionsContext.Provider>
                {addListButton}
                </div>
            </React.Fragment>
            
        );
    }

}

export default TodoListsBuilder;
