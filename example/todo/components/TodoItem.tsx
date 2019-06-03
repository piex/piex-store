import React, { FC, useState, useCallback, useMemo } from 'react';
import { useStore } from '@piex-store/react';
import todoStore from '../todoStore';

import { ITodo } from '../todoStore';
import TodoTextInput from './TodoTextInput';

interface ITodoItemProps {
  todo: ITodo;
}

const TodoItem: FC<ITodoItemProps> = ({ todo }) => {
  const store = useStore(todoStore);
  const [editing, setEditing] = useState(false);

  const handleDoubleClick = useCallback(() => {
    setEditing(true);
  }, []);

  const handleSave = useCallback((id: number, text: string) => {
    if (text.length === 0) {
      store.deleteTodo(id);
    } else {
      store.editTodo(id, text);
      setEditing(false);
    }
    setEditing(false);
  }, [setEditing, store]);

  const element = useMemo(() => {
    if (editing) {
      return (
        <TodoTextInput
          text={todo.text}
          editing={editing}
          onSave={(text) => handleSave(todo.id, text)}
        />
      );
    }

    return (
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          checked={todo.completed}
          onChange={() => store.completeTodo(todo.id)} />
        <label onDoubleClick={handleDoubleClick}>
          {todo.text}
        </label>
        <button
          className="destroy"
          onClick={() => store.deleteTodo(todo.id)}
        />
      </div>
    );
  }, [editing, todo, handleDoubleClick, handleSave, store]);

  return (
    <li className={`${editing ? 'editing' : ''} ${todo.completed ? 'completed' : ''}`}>
      {element}
    </li >
  );
};

export default TodoItem;
