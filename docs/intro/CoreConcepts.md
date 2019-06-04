---
id: core-concepts
title: 核心概念
sidebar_label: 核心概念 
hide_title: true
---

# 核心概念

`Piex Store` 的核心概念非常简单，就像处理一个 `React` 的 `Class Component` 一样处理共享状态。

### 编写可预测，符合习惯的代码

所谓可预测（predictable），即容易理解的代码。

Piex Store 的概念非常简单，一个类就是一个 Store，即状态容器。这个状态容器有一个 `state` 保存所有的数据，有一个 `setState` 方法来修改数据并同步到视图上。

每一个 Store 都是对一块业务模型的抽象，通过 `state` 管理数据，`state` 是随着业务流程变更会改变的数据，`methods` 则是业务流转的过程，在流转过程中可以对数据进行操作。并同步到视图上。

一个熟悉 React 的人看一眼就会发现，这不就是一个 `React` 的 `Class Component` 吗？

是的，它的 API 和 `Class Component` 非常类似，你不需要懂什么 `action`、`mutation` 就可以直接使用，没有什么复杂的设计理念，不需要了解 `context` 等 API，就像一个🍔上加了点🍅酱，直接就可以食用。

### 简化的状态模型

状态管理就应该是简单的，有一个或多个对象，对对象进行修改，修改后的数据就会自动同步到所有用到它的地方，这就是状态管理应该干的事情。

这种状态模型是最简单的，也是最符合人们思维习惯的。

Piex Store 就是这么一个简单的状态管理模型，在 Store 中存放状态，在组件中使用 `useStore` 读取和操作状态，其它的都不需要关心。

Piex Store 是单向数据流动，只能通过 `setState` 修改状态，状态变更后会自动流动到视图，触发页面刷新。

### 分散状态管理

Piex Store 并不推崇全局状态管理，不需要把全部的状态都存到一个 Store 里面，只需要把一个业务模型抽离到一个 Store 即可，一个应用可以拥有多个 Store，Store 之间互相并无关联，而且可以互相调用，但是并不推荐。