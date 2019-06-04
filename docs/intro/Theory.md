---
id: theory
title: 原理
sidebar_label: 原理
hide_title: true
---

# 原理

在 [动机](motivation) 里的后半部分介绍了 `Piex Store` 出现的原因和 API 的构建过程，这里就详细的介绍一下其实现原理。

在 [Demo<sup>1</sup>](https://stackblitz.com/edit/react-ts-global-hooks?file=store%2FuseGlobalState.ts) 和 [Demo<sup>2</sup>](https://stackblitz.com/edit/react-ts-global-hooks2?file=store%2Fstore.ts) 中状态共享的原理是一致的。

在 `Demo1` 中，去掉类型的代码如下：

```ts
export default function createStore(state, actions) {
  let _state = state;
  const _actions = actions;
  let _setters = [];

  async function dispatch(action) {
    _state = await _actions[action.type](_state, action.payload);
    _setters.forEach(setter => setter(_state));
  }

  function useStore() {
    const [, setState] = useState(_state);

    useEffect(() => {
      _setters.push(setState);
      return () => _setters = _setters.filter(setter => setter !== setState);
    }, []);

    return [_state, dispatch];
  }

  return { useStore, dispatch };
}
```

首先，`createStore` 会创建一个闭包，闭包里有 `_state`、`_actions`、`_setters` 三个变量。

`useStore` 是一个 [自定义 hooks](https://zh-hans.reactjs.org/docs/hooks-custom.html)，会在组件里创建一个局部状态，初始状态就是闭包变量 `_state`，同时会把 `useState` 返回值数组第二个参数 `setState` 存到 `_setters`。并返回 `_state` 变量和 `dispatch` 方法。

`_state` 是一个引用类型，可以从中读取当前的状态数据。而 `diaspatch` 方法可以触发一个 `action`，返回一个新的 `state`，这里会把新的 `state` 赋值给 `_state`，然后把 `_setters` 里面存储的 `setState` 调用一遍。

我们知道 Hooks 的 `setState` 方法被调用后会触发组件的更新，这里，每个用到 `useStore` 的组件的 `setState` 都会被触发，然后组件会更新，从 `_state` 中取到最新的状态数据，然后 `render` 呈现到界面上。

`Demo2` 的原理与 `Demo1` 一样，只是写法不同：

```ts
abstract class Store {
  readonly state = {};
  private setters = [];

  public useStore = this._useStore.bind(this);

  private _useStore() {
    const [, setState] = useState(_state);

    useEffect(() => {
      this.setters.push(setState);

      return () => this.setters = this.setters.filter(setter => setter !== setState);
    }, []);

    return [_state, dispatch];
  }

  public setState(updater) {
    this.state = Object.assign({}, this.state, nextState);
    
    this.setters.forEach(setter => setter(this.state));
  }
}
```

Demo2 中由 `createStore` 的闭包变成了 `Store` 对象，`_state` 变成了 `this.state`，`_setters` 变成了 `this.setters`，`useStore` 从一个函数变成了 `Store` 对象的方法，`dispatch` 变成了 `setState`，只是 API 和表现形式上变了，内在逻辑还是一样的。

`useStore` 是一个自定义 Hooks，生成 `setState` 存到 `this.setters`，每次 `setState` 会生成一个新的 `state`，触发所有的组件更新。

Piex Store 的原理就是如此简单，自定义 Hooks 的更新机制实现起来不到二十行代码，却大有可为。
