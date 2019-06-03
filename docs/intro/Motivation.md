---
id: motivation
title: 动机
sidebar_label: 动机 
hide_title: true
---

# 动机

目前 `React` 状态管理的主流方案一般是 [Redux](https://github.com/reduxjs/redux) 和 [Mobx](https://github.com/mobxjs/mobx)，`Vue` 则是 [Vuex](https://github.com/vuejs/vuex/)。

`Vuex` 和 `Redux` 非常类似，都是基于 `Flux` 架构衍生而来的。

`Redux` 是函数式的解决方案，需要写大量的样板文件，太过繁琐，所以很多人基于 `Redux` 进行了二次封装等来简化开发，例如 [Dva](https://github.com/dvajs/dva/) 或者 [Rematch](https://github.com/rematch/rematch/)。其中 `Rematch` 和 `Vuex` 使用体验上比较类似。

`Mobx` 则是通过 `proxy` 和 `defineProperty` 来劫持数据，对每个数据变动进行响应。

还有很多的状态管理工具，例如轻量级的状态管理工具 [Unstated](https://github.com/jamiebuilds/unstated)，被称为最简单的 `React` 状态管理工具。

等等这些状态管理工具在 `React 16.7` 以前都是不错的解决方案，解决了全局状态管理或者跨组件状态共享的痛点，有的注重于功能和范式，有的注重于易用性。

随着 `Hooks` 的横空出世，这些状态管理工具也纷纷推出自己的 `Hooks` 解决方案，例如 [Redux Hooks](https://react-redux.js.org/next/api/hooks)、[mobx-react-lite](https://github.com/mobxjs/mobx-react-lite)、[unstated-next](https://github.com/jamiebuilds/unstated-next) 等等。但在使用过程中，却感觉到有很多的局限性，例如 `Redux` 使用起来一贯的繁琐，而且对 `TS` 的支持很差。`Mobx` 的响应式编程上手比较复杂，而且 API 过于繁琐，`Unstated` 用自定义 `Hooks` 的方式，使用起来比较麻烦，而且还需要用到 `context`。

后来在适用 `Hooks` 的过程中，想到使用 `useState` 完全可以不借助于 `context` 就可以实现状态共享。

于是就参考 `Redux` 动手写了一个简单的 [Demo<sup>1</sup>](https://stackblitz.com/edit/react-ts-global-hooks?file=store%2FuseGlobalState.ts)，但是发现效果并不好，一是对 `TS` 的支持过于复杂，有一定的缺陷，二是会遇到 `Redux` 一样的异步等问题。

后面我想到了另一种解决方案 [Demo<sup>2</sup>](https://stackblitz.com/edit/react-ts-global-hooks2?file=store%2Fstore.ts)，这种方式是完全基于类的编码方式，`state` 和 `setState` 的操作方式 与 `React` 的 `Class Component` 非常相似，上手容易，而且异步问题也非常容易解决。

在上面 Demo 的基础上，又参考 `Redux` 做了中间件支持，所以抽离出了 `createStore`。

为了与 `Hooks` 原则一致，把 `useStore` 单独抽离出来，后来发现，可以把 Hooks 相关逻辑都抽离到 `useStore` 方法中，抽离后，核心的 `Store` 与 `Hooks` 完全无关，然后 `Vue` 也支持 Hooks，所以也可以支持 `Vue`  使用。

这样，一个同事支持 `React 和 Vue` 的基于 `Hooks` 的状态管理工具的架构就完成了，希望大家尽情享用！