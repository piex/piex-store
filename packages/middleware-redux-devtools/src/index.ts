const devTools = (window as any).__REDUX_DEVTOOLS_EXTENSION__;

(window as any).__PIEX__STORE__ = {};

const config = {
  features: { pause: true, export: true, test: true },
  type: 'piex-store',
  latency: 500,
  autoPause: true,
};

if (devTools) {
  const connect = devTools.connect(config);
  connect.init({});
}

const devToolMiddleware: any = (getState: any, source: any) => (next: any) => {
  next();
  (window as any).__PIEX__STORE__ = Object.assign({}, (window as any).__PIEX__STORE__, {
    [source.origin.name]: getState(),
  });
  devTools && devTools.send(`${source.origin.name}-${source.methodName}`, (window as any).__PIEX__STORE__);
};

export default devToolMiddleware;