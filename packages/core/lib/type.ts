import Store from './store';

export interface IMiddlewareSource<S extends Store<{}>> {
  origin: Constructable<S>;
  methodName: keyof S | '[[createStore]]';
}

export type nextType<S extends Store<{}>> = (s?: Partial<S['state']>) => void;

export type middlewareType<S extends Store<{}>> = (getState: () => S['state'], source: IMiddlewareSource<S>) => (next: nextType<S>) => void;

export type applyMiddlewareReturnType<S extends Store<{}>> = (getState: () => S["state"], next: nextType<S>, source: IMiddlewareSource<S>) => void;