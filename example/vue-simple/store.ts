import { Store, createStore, applyMiddleware, middlewareType } from '@piex-store/core';
import devToolsPlugin from '@piex-store/middleware-redux-devtools';

interface IGitHubState {
  issue: number;
  star: boolean;
}

class GithubStore extends Store<IGitHubState> {
  readonly state: IGitHubState = {
    issue: 0,
    star: false,
  }

  star() {
    this.setState({ star: true });
  }

  unStar() {
    this.setState({ star: false });
  }

  addIssue(offset: number = 1) {
    this.setState({ issue: this.state.issue + offset });
  }

  deleteIssue() {
    this.addIssue(-1);
  }

  starAsync() {
    setTimeout(() => {
      this.setState({ star: !this.state.star });
    }, 3000);
  }
}

const logger: middlewareType<GithubStore> = (getState, source) => next => {
  console.log('before', source.origin.name, source.methodName, getState());
  next();
  console.log('after', source.origin.name, source.methodName, getState());
};

const logger2: middlewareType<GithubStore> = (getState, source) => next => {
  console.log('before2', source.origin.name, source.methodName, getState());
  next();
  console.log('after2', source.origin.name, source.methodName, getState());
};

export const middlewares = applyMiddleware(devToolsPlugin, logger, logger2);

export default createStore(GithubStore, middlewares);
