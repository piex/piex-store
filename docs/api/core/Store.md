---
id: store
title: Store
sidebar_label: Store
hide_title: true
---

# Store

```ts
class Store<S extends object>
```

`Store` 是一个抽象类，包含一些变量和方法。

### state

##### 类型：

```ts
Store<S extends object>.state: S;
```

每个 Store 都需要初始化一个 `state`，用来存放当前的状态值。

**`state` 是只读的**，可以从 state 中读取当前的状态，但是不能直接修改 `state` 的值，如 React 的 Class Component 一样，直接修改 `state` 不会触发组件更新。所以如果使用的是 TS，请直接将 `state` 设置成 `readonly` 类型的。

### setState

#### 类型：

```ts
Store<S extends object>.setState(updater: Partial<S> | ((args: S) => Partial<S>), cb?: (() => void) | undefined): Promise<{}>
```

`setState` 是一个公开方法，也是可以直接修改 `state` 的方法。当调用这个函数的时候，Piex Store 会修改 `state` 的值并更新所有依赖组件。

#### 参数

##### 对象参数

传入参数是一个对象的时候，这个对象表示该组件的新状态。但你只需要传入需要更新的部分就可以了，而不需要传入整个对象。Piex Store 会自动把参数和之前的状态用 `Object.assign` 进行合并。

##### 函数参数

与 React 不同的是，当你调用 setState 的时候，Piex Store 会马上修改 `state`。然后再去更新每个组件。但也支持像 React 一样的函数传参数。Piex Store 也会把上一个 `setState` 的结果传入这个函数，你可以使用该结果进行运算、操作，然后返回一个对象作为更新 `state` 的对象。

##### callback

`setState` 还支持第二个参数，改参数是一个 callback，会在所有组件更新完成后调用。