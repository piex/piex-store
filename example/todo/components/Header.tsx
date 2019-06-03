import React, { FC } from 'react';

import { useStore } from '@piex-store/react';
import todoStore from '../todoStore';

import TodoTextInput from './TodoTextInput';

const Header: FC<{}> = () => {
  const store = useStore(todoStore);

  return (
    <header className="header">
      <h1>Todos</h1>
      <TodoTextInput
        newTodo
        text=""
        onSave={(text) => {
          if (text.length !== 0) {
            store.addTodo(text);
          }
        }}
        placeholder="What needs to be done?"
      />
    </header>
  );
};

export default Header;
