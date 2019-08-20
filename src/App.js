import React from 'react';
import Header from './components/Header/Header'
import TodoListsBuilder from './containers/TodoListsBuilder/TodoListsBuilder'

function App() {
  return (
    <div>
      <Header/>
      <TodoListsBuilder/>
    </div>
  );
}

export default App;
