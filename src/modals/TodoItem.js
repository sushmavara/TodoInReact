
function ToDoItem(title){
    this.title = title;
    this.id = Date.now().toString();
    this.isCompleted = false;
    this.isChecked = false;
}

ToDoItem.prototype.toggleMarkComplete = function(){
    this.isCompleted = !this.isCompleted;
    return this;
}

ToDoItem.prototype.markComplete = function(){
    this.isCompleted = true;
    return this;
}

ToDoItem.prototype.toggleChecked= function(){
    this.isChecked = !this.isChecked;
    return this;
}
export default ToDoItem;