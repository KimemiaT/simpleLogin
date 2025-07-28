import React, { useState, useEffect } from 'react';
import { api } from './api';

export default function Todo() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');

  const loadTodos = async () => {
    const res = await api.get('/items');
    setTodos(res.data);
  };

  useEffect(() => { loadTodos(); }, []);

  const addTodo = async () => {
    await api.post('/items', { text });
    setText('');
    loadTodos();
  };

  const updateTodo = async (id) => {
    const newText = prompt('Edit:', '');
    if (newText) {
      await api.put(`/items/${id}`, { text: newText });
      loadTodos();
    }
  };

  const deleteTodo = async (id) => {
    await api.delete(`/items/${id}`);
    loadTodos();
  };

  return (
    <div>
      <input placeholder="New Todo" value={text} onChange={e => setText(e.target.value)} />
      <button onClick={addTodo}>Add</button>
      <ul>
        {todos.map(t => (
          <li key={t.id}>
            {t.text}
            <button onClick={() => updateTodo(t.id)}>Edit</button>
            <button onClick={() => deleteTodo(t.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
