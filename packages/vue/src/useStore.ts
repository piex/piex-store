import { useState, useEffect, useRef, Dispatch, SetStateAction } from 'vue-hooks';

import { Store } from '@piex-store/core';

type SettersType<S extends Store<{}>> = Dispatch<SetStateAction<S>>;

const useStore = <S extends Store<object>>(store: S): S => {
  const resolveRef = useRef<(value?: boolean | PromiseLike<boolean>) => void>();
  const listener = new Promise<boolean>((resolve) => {
    resolveRef.current = resolve;
  });

  const listeners: Promise<boolean>[] = Reflect.get(store, 'listeners');
  Reflect.set(store, 'listeners', [...listeners, listener]);

  const [, setState] = useState(store.state);

  useEffect(() => {

    const setters: SettersType<S>[] = Reflect.get(store, 'setters');
    Reflect.set(store, 'setters', [...setters, setState]);

    return () => {
      const setters: SettersType<S>[] = Reflect.get(store, 'setters');
      Reflect.set(store, 'setters', setters.filter((setter) => setter !== setState));
    };
  }, []);

  useEffect(() => {
    typeof resolveRef.current === "function" && resolveRef.current(true);

    const listeners: Promise<boolean>[] = Reflect.get(store, 'listeners');
    Reflect.set(store, 'listeners', listeners.filter(l => l === listener));
  });

  return store;
};

export default useStore;
