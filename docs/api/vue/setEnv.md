---
id: set-env
title: setEnv
sidebar_label: setEnv
hide_title: true
---

# setEnv

在 Vue 中使用 Piex Store 和 React 中不同的就是需要先调用 `setEnv` API 把 [vue-hooks](https://github.com/yyx990803/vue-hooks) 的 `useState`、`useEffect`、`useRef` 三个 API 传给 Piex Store。

这是因为 `vue-hooks` 的机制是全局唯一的，如果在组件里引入了 `vue-hooks`，那么就会出现两个不同的状态，就会出现错误。所以需要实现调用 `serEnv` 传递变量。

> Piex Store 会支持 Vue3。