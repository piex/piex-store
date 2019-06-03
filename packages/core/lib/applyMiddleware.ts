import Store from './store';
import compose from './compose';
import { IMiddlewareSource, nextType, middlewareType } from './type';

const applyMiddleware = <S extends Store<{}>>(...middlewares: middlewareType<S>[]) => {
  return (getState: () => S['state'], next: nextType<S>, source: IMiddlewareSource<S>) => {
    const chain = middlewares.map(middleware => middleware(getState, source));

    const newChain = chain.map(c => (next: nextType<S>) => () => c(next));

    compose(...newChain)(next)();
  };
};

export default applyMiddleware;