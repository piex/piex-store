---
id: use-store
title: useStore
sidebar_label: useStore
hide_title: true
---

# useStore

useState 是绑定库提供的 Piex Store Hooks 绑定。

```ts
const useStore: <S extends Store<object>>(store: S) => S;
```

`useStore` 只能在函数时组件中使用，详情参考 [vue-hooks](https://github.com/yyx990803/vue-hooks);

它接受一个 `store` 实例，返回处理过的 `store`。

可以从返回值中读取 `store.state` 获取状态，也可以调用 `store.method` 触发 `store` 状态更新。

**注意**

虽然这里把 `setState` 暴露出来了，但是不推荐在组件里修改 setState，请在 Store 中定义方法来修改状态。