---
id: start
title: 开始
sidebar_label: 开始
hide_title: true
---

## 开始

这里会从头构建一个最近单的 Counter 示例。

> 所有的代码都以 TS 实现。

### 安装

安装稳定版：

```bash
npm install @piex-store/core
```

核心库只包含框架无关的核心状态管理工具，如果需要在 React 和 Vue 中使用，还需要对应的绑定库：

```bash
# React
npm install @piex-store/react

# Vue
npm install @piex-store/vue
```

> 绑定库暴露出来的 API 完全一样，只是不同框架的实现而已，而 React 和 Vue 的 hooks API 功能和命名都一致，所以使用上完全一样。

### 构建 Store

安装完核心库后就可以创建一个 Store 了，Store 的创建不依赖绑定库，所以 Store 是框架无关的。

一个 Store 就像一个 `React` 的 `Class Component`，只需要一个 `State` 和一些方法来 `setState` 就可以了。

```ts
import { Store, createStore } from '@piex-store/core';

interface initialState {
  count: 0;
}

type State = typeof initialState;

class CounterStore extends Store<State> {
  readonly state = initialState;

  increment() {
    const { count } = this.state;

    this.setState({ count: count + 1 });
  }
}

const counterStore = createStore(CounterStore);
```

这样一个 Store 就创建好了，可以通过 `counterStore.state` 来获取状态，以及通过 `counterStore.increment` 触发状态变更。

```ts
console.log(counterStore.state.count); // -> 0

counterStore.increment();

console.log(counterStore.state.count); // -> 1
```

使用过 React 的同学都清楚，直接修改 `state` 的方法是无效的，必须通过 `setState` 来更新 `state` 才会触发 `render`。在这里也是这样，调用 `setState` 后，Piex Store 会更改  `state` 并触发每个 `useStore` 组件的更新。

可以在 [最基本的 Piex Store 计数应用]() 查看源码实现。
