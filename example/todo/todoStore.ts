import { Store, createStore, applyMiddleware } from '@piex-store/core';
import devtoolsPlugin from '@piex-store/middleware-redux-devtools';
import { FilterEnum } from './constants';

export interface ITodo {
  text: string;
  completed: boolean;
  id: number;
}

interface IState {
  todos: ITodo[];
  filter: FilterEnum;
}

class TodoStore extends Store<IState> {
  readonly state: IState = {
    todos: [{
      text: 'Use Piex Store',
      completed: false,
      id: 0,
    }],
    filter: FilterEnum.SHOW_ALL,
  };

  addTodo(text: string) {
    this.setState({
      todos: [...this.state.todos, {
        text,
        completed: false,
        id: this.state.todos.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1,
      }],
    });
  }

  deleteTodo(id: number) {
    this.setState({
      todos: this.state.todos.filter(todo => todo.id !== id),
    });
  }

  editTodo(id: number, text: string) {
    const newTodos = this.state.todos.map(t => {
      if (t.id === id) {
        return { ...t, text: text };
      }
      return t;
    });
    this.setState({
      todos: newTodos,
    });
  }

  completeTodo(id: number) {
    this.setState({
      todos: this.state.todos.map(todo => {
        return todo.id === id ? { ...todo, completed: !todo.completed } : todo;
      }),
    });
  }

  completeAllTodos() {
    this.setState(preState => ({
      todos: preState.todos.map(todo => ({ ...todo, completed: true })),
    }));
  }

  clearCompleted() {
    this.setState(({ todos }) => ({
      todos: todos.filter(({ completed }) => completed === false),
    }));
  }

  setVisibilityFilter(filter: FilterEnum) {
    this.setState({
      filter,
    });
  }
}

export default createStore(TodoStore, applyMiddleware(devtoolsPlugin));