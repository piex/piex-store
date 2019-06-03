// eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
import Store from './store';
import { IMiddlewareSource, applyMiddlewareReturnType } from './type';

const createStore = <S extends Store<object>>(Store: Constructable<S>, middleware?: applyMiddlewareReturnType<S>) => {
  const proxyHandle: ProxyHandler<S> = {
    get(target, property: keyof S) {
      let prop = target[property];
      if (property !== 'setState' && typeof prop === "function") {
        const setState = (updater: Partial<S['state']> | ((args: S['state']) => Partial<S['state']>), cb?: () => void) => {
          return new Promise((resolve) => {
            let nextState: Partial<S['state']>;

            if (typeof updater === "function") {
              nextState = updater(target.state);
            } else {
              nextState = updater;
            }

            const next = () => {
              target.setState(nextState, cb)
                .then(() => {
                  resolve();
                });
            };

            const getState = () => { return target.state; };

            const source: IMiddlewareSource<S> = {
              origin: Store,
              methodName: property,
            };

            // 每次调用 setState 调用中间件
            if (middleware) {
              middleware(getState, next, source);
            } else {
              next();
            }
          });
        };

        const setStateSync = (updater: Partial<S['state']> | ((args: S['state']) => Partial<S['state']>), cb?: () => void) => {
          let nextState: Partial<S['state']>;

          if (typeof updater === "function") {
            nextState = updater(target.state);
          } else {
            nextState = updater;
          }

          const next = () => target.setStateSync(nextState, cb);

          const getState = () => { return target.state; };

          const source: IMiddlewareSource<S> = {
            origin: Store,
            methodName: property,
          };

          // 每次调用 setState 调用中间件
          if (middleware) {
            middleware(getState, next, source);
          } else {
            next();
          }

        };

        const cloneProxy = new Proxy(target, {
          get(target, property: keyof S) {
            if (property === 'setState') {
              return setState;
            }
            if (property === 'setStateSync') {
              return setStateSync;
            }
            return target[property];
          },
        });
        prop = prop.bind(cloneProxy);
      }

      return prop;
    },
    // set<K extends keyof S>(target: S, property: K, value: S[K]) {
    //   const res = Reflect.set(target, property, value);
    //   return res;
    // }
  };

  const proxyStore = new Proxy(new Store(), proxyHandle);

  // createStore 时执行一次中间件
  if (middleware) {
    middleware(() => proxyStore.state, () => { }, {
      origin: Store,
      methodName: '[[createStore]]',
    });
  }

  return proxyStore;
};

export default createStore;
