import React from 'react';
import { useState } from 'react';

export default function AppTest() {
  const [title, setTitle] = useState('');
  const [todos, setTodos] = useState([ {id: 1, title: "새로운 일", check: false} ]);

  const onAdd = (text) => {
    const id = (todos[todos.length-1].id) + 1;
    setTodos([...todos, {id, title:text, check:false}])
  }
  const onUpdate = (id, check) => {
    setTodos( todos.map( todo => {
      if (todo.id === id) return {...todo, check}
      return todo
    }))
  }
  const onDelete = (id) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }
    
  return (
    <div>
      <h1>Todo</h1>

      <input type='text' 
        style={{ fontSize: 30, borderColor: 'red', borderWidth: 2 }}
        onKeyDown={ (evt)=>{
          if (evt.key === 'Enter'){
            onAdd(title);
            setTitle('');
          }
        }}
        onChange={(evt) => setTitle(evt.target.value)} 
        value={title} 
      />

      <hr />
      
      {todos.map( (todo, index) => (
        <div style={{ fontSize: 30}}>
          <span>{index+1} : </span>
          <span> { (()=>{ if(todo.check) return "[  ]"; else return "[X]"; })()} </span>
          <span onClick={()=> onUpdate(todo.id, !todo.check) }>{todo.title}</span>
          <button 
            onClick={ () => onDelete(todo.id) }
            style={{marginLeft: "10px"}}
            >del</button>
        </div>))
      }

      <hr />

      <div style={{ fontSize: 30, color: 'blue' }}>
        남은일:{todos.filter(todo => todo.check===false).length}개/{todos.length}개
      </div>

    </div>
  );
}