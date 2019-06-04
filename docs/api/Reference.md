---
id: reference
title: 介绍
sidebar_label: 介绍 
hide_title: true
---

# API 文档

> Piex Store 的代码全部由 TS 实现，良好的支持类型推断，如果您是一个新项目，建议您使用 TS 来构建。

Piex Store 的核心代码非常简单，只有二百行代码左右，绑定库也只有一百行左右，完全不用担心给您的项目带来任何负担。而且代码简单易懂，如果您由任何想法，欢迎提 [Issue](https://github.com/piex/piex-store/issues) 和 PR。

这部分完整介绍了 Piex Store 的 API，包括核心库 `@piex-store/core` 和 React 的绑定库 `@piex-store/react`、Vue 的绑定库 `@piex-store/vue`，以及一些插件的使用。

## 安装

> Piex Store 是使用 [Lerna](https://github.com/lerna/lerna) 管理的 [monorepo](https://en.wikipedia.org/wiki/Monorepo)，使用时应注意核心库应与绑定库的版本一致！！！

安装核心库：

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
