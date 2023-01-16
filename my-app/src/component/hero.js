import React, { useState } from 'react';

function TodoList() {
  const [todoItems, setTodoItems] = useState(
    JSON.parse(localStorage.getItem('todoItems')) || []
  );
  const [todo, setTodo] = useState('');

  // Check if it's a new day and clear to-do list if necessary
  const currentDate = new Date().toLocaleDateString();
  const lastSavedDate = localStorage.getItem('date');
  if (currentDate !== lastSavedDate) {
    setTodoItems([]);
    localStorage.setItem('todoItems', JSON.stringify([]));
    localStorage.setItem('date', currentDate);
  }

  const handleSubmit = event => {
    event.preventDefault();
    setTodoItems([...todoItems, todo]);
    localStorage.setItem('todoItems', JSON.stringify([...todoItems, todo]));
    setTodo('');
  };

  const handleChange = event => {
    setTodo(event.target.value);
  };

  const handleDelete = index => {
    const newTodoItems = [...todoItems];
    newTodoItems.splice(index, 1);
    setTodoItems(newTodoItems);
    localStorage.setItem('todoItems', JSON.stringify(newTodoItems));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Add a to-do"
          value={todo}
          onChange={handleChange}
        />
        <button type="submit">Add</button>
      </form>
      <ul>
        {todoItems.map((item, index) => (
          <li key={index}>
            {item} <button onClick={() => handleDelete(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
