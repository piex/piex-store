import React, { FC, useMemo } from 'react';
import { useStore } from '@piex-store/react';
import todoStore from '../todoStore';
import TodoItem from './TodoItem';

import { FilterEnum } from '../constants';

const TodoList: FC<{}> = () => {
  const store = useStore(todoStore);

  const todos = useMemo(() => {
    const { todos, filter } = store.state;
    switch (filter) {
      case FilterEnum.SHOW_ALL:
        return todos;
      case FilterEnum.SHOW_COMPLETED:
        return todos.filter(t => t.completed);
      case FilterEnum.SHOW_ACTIVE:
        return todos.filter(t => !t.completed);
      default:
        throw new Error('Unknown filter: ' + filter);
    }
  }, [store.state]);

  return (
    <ul className="todo-list">
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
        />
      ))}
    </ul>
  );
};

export default TodoList;
