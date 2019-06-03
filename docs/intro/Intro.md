---
id: intro
title: 简介
sidebar_label: 简介
hide_title: true
---

# 简介

**Piex Store** 是一个基于 `Hooks` 构建的，可以同时应用于 `React` 和 `Vue` 的 **轻量的** **状态共享工具**。

### 为什么是 “状态共享工具”

目前的状态管理工具有很多，主流的状态管理方案在 `React` 中一般是 [Redux](https://github.com/reduxjs/redux) 和 [Mobx](https://github.com/mobxjs/mobx)，在 `Vue` 则是 [Vuex](https://github.com/vuejs/vuex/)。但它们都是全局状态管理工具，整个应用的状态都塞到一个容器中，单一状态管理的职责过于巨大。

但是在绝大多数场景下，各个页面的业务领域大多是独立的，并不需要在一个容器中管理到所有的状态。状态按照业务分离，每个状态容器都是一个业务的数据模型，每个容器的状态可以在任意组件中获取状态或者修改状态，也能各个容器之间共享，才是大多数场景更需要的模式。

![](assets/piex-store.png)

### React 设计哲学

遵从 `React` 设计哲学，采用了**面向对象**的语法，API 类似于 `React` 的 `Class Component`，如果你是一个 `React` 老手，非常容易就可以直接使用。

### No Context

与常规的状态管理不同，**Piex Store** 只依赖于 Hooks 的 `useState`、`useEffect` 和 `useCallback` 实现，没有对 `Context` 的依赖，所以不需要 `Provider` 等。

### 支持 Class Component

**Piex Store** 可以直接在 `Function Component` 中用 `自定义hooks` 的方式使用，同时也提供 `render props` 的方式在 `Class Component` 中使用。

### TypeScript 支持

**Piex Store** 源码由 `TypeScript` 编写，完全支持类型推断。

