---
id: createStore
title: createStore
sidebar_label: createStore
hide_title: true
---

# createStore

```ts
const createStore: <S extends Store<object>>(Store: Constructable<S>, middleware?: applyMiddlewareReturnType<S> | undefined) => S;
```

当用 [Store](store) 创建了一个状态容器后，还需要用 `createStore` 创建状态容器。

为什么用 `createStore` 创建实例，而不是用 `new` 操作符呢？

当使用 `new` 操作符时，所有对状态容器的操作 Piex Store 都无法监听和控制，也就无法实现中间件，如日志，devtools 等统一监控所有的状态变更流程。

`createStore` 做的事情就是在每次调用 `Store` 的方法去 `setState` 时，触发中间件逻辑的执行，记录下每一次的状态变更，或者进行一些副作用操作。

如果你不需要任何中间件，直接 `new` 的效果和 `createStore` 是一样的。