import React, { FC, useMemo } from 'react';

import { useStore } from '@piex-store/react';
import todoStore from '../todoStore';
import TodoList from './TodoList';
import Footer from './Footer';

const MainSection: FC<{}> = () => {
  const store = useStore(todoStore);

  const todosCount = useMemo(() => {
    return store.state.todos.length;
  }, [store.state.todos.length]);

  const completedCount = useMemo(() => {
    return store.state.todos.reduce((count, todo) => (
      todo.completed ? count + 1 : count
    ), 0);
  }, [store.state.todos]);

  return (
    <section className="main">
      {
        !!todosCount && (
          <span>
            <input
              className="toggle-all"
              type="checkbox"
              checked={completedCount === todosCount}
              readOnly
            />
            <label onClick={store.completeAllTodos} />
          </span>
        )
      }
      <TodoList />
      <Footer
        completedCount={completedCount}
        activeCount={todosCount - completedCount}
      />
    </section>
  );
};

export default MainSection;
