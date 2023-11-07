import React, { useState, useRef } from 'react';

export default function AppCRUDB01() {
  const [todos, setTodos] = useState([
    { id: 1, title: '밥먹기', check: false },
    { id: 2, title: '공부하기', check: true },
  ]);

  return (
    <div>
      <TodoInput todos={todos} setTodos={setTodos} />
      <TodoList todos={todos} setTodos={setTodos} />
      <TodoStatus todos={todos} />
    </div>
  );
}

// todos 배열, setTodos함수를 참조하여 사용!
const TodoInput = ({ todos, setTodos }) => { 
  const [title, setTitle] = useState('');
  const refTitle = useRef(null);

  // todos에 데이터를 추가함
  const onAdd = (title) => {
    const id = todos[todos.length - 1].id + 1;
    setTodos([...todos, { id, title, check: false }]);
  };

  return (
    <input
      type="text"
      style={{ fontSize: 30, borderColor: 'red', borderWidth: 2 }}
      ref={refTitle}
      onKeyDown={(evt) => {
        if (evt.key === 'Enter') {
          onAdd(title);
          setTitle('');
          refTitle.current.focus();
        }
      }}
      onChange={(evt) => setTitle(evt.target.value)}
      value={title}
    />
  );
};

// 각 todo를 출력
const TodoList = ({ todos, setTodos }) => {
  return todos.map((todo) => (
    <TodoItem key={todo.id} todo={todo} todos={todos} setTodos={setTodos} />
  ));
};

// TodoList에서 하나 씩 출려함
const TodoItem = ({ todo, todos, setTodos }) => {

  // setTodos를 참조하여 삭제 버튼을 구현
  const onDelete = (id) => {
    setTodos(todos.filter((todo) => todo.id != id));
  };

  // setTodos를 참조하여 수정(체크 여부) 버튼을 구현
  const onUpdate = (id, check) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id == id) return { ...todo, check };
        return todo;
      })
    );
  };

  return (
    <div>
      <span
        onClick={() => onUpdate(todo.id, !todo.check)}
        style={{
          fontSize: 30,
          textDecorationLine: todo.check ? 'line-through' : '',
        }}
      >
        {todo.title}
      </span>
      <button onClick={() => onDelete(todo.id)}>del</button>
    </div>
  );
};

// todos 데이터를 통해 남은 일을 체크
const TodoStatus = ({ todos }) => {
  const remain = todos.filter((todo) => todo.check == false).length;
  return (
    <div style={{ marginTop: 10, fontSize: 30, color: 'blue' }}>
      남은일:{remain}개/{todos.length}개
    </div>
  );
};
