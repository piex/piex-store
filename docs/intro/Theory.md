---
id: theory
title: 原理
sidebar_label: 原理
hide_title: true
---

# 原理

在 [动机](motivation) 里的后半部分介绍了 `Piex Store` 出现的原因和 API 的构建过程，这里就详细的介绍一下其实现原理。

在 [Demo<sup>1</sup>](https://stackblitz.com/edit/react-ts-global-hooks?file=store%2FuseGlobalState.ts) 和 [Demo<sup>2</sup>](https://stackblitz.com/edit/react-ts-global-hooks2?file=store%2Fstore.ts) 中状态共享的原理是一致的。

在 `Demo1` 中，有 `useGlobalState` 这个 API，代码如下：

```ts
function useGlobalState(): [S, (arg: ActionTypes<P>) => void] {
  const [, setState] = useState(_state);

  useEffect(() => {
    _setters.push(setState);
    return () => _setters = _setters.filter(setter => setter !== setState);
  }, []);

  return [_state, dispatch];
}
```

首先，`useStore` 会在组件里创建一个局部状态，初始状态就是保存在 `createGlobalState` 的闭包变量 `_state`，