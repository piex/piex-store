import { cloneDeep } from 'lodash';

interface Store<S extends object> {
  state: S;
}

abstract class Store<S extends object> {
  /**
   * setters 存放 setState 的第二个参数
   * 用来触发对应组件的更新
   */
  private setters: any[] = [];
  /**
   * 每个组件在重新运行时注册到 listeners 里，
   * 在变更后 useEffect 后 resolve(true)，
   * 并从 listeners 里移除
   * 用来确定每个组件的dom更新都完成了
   */
  private listeners: Promise<boolean>[] = [];

  /**
   * setState 和 setStateSync  的参数处理
   * @param updater 
   */
  private getNextState(updater: Partial<S> | ((args: S) => Partial<S>)) {
    let nextState: Partial<S>;

    /**
     * 如果 updater 是个函数，执行并赋值给 nextState
     * 否则，直接把 updater 赋值给 nextState
     */
    if (typeof updater === "function") {
      nextState = updater(this.state);
    } else {
      nextState = updater;
    }
    return nextState;
  }

  /**
   * 更新 FC 组件
   * @param setter 
   * @param changeProperty 
   */
  private updateComponent(setter: any) {

    setter(this.state);
  }

  // 异步更新状态，所有组件更新完成后 resolve
  public setState(updater: Partial<S> | ((args: S) => Partial<S>), cb?: () => void) {
    return new Promise((resolve) => {
      const nextState = this.getNextState(updater);

      // 如果 nextState 没有值，直接 resolve 并 return，不用更新组件
      if (!nextState) {
        cb && cb();
        resolve();
        return;
      }

      // 把 nextState 和 旧 state 合并生产新 state 赋值给 this.state;
      this.state = Object.assign({}, this.state, nextState);

      /**
       * 所有组件更新到 dom 上后 resolve
       */
      Promise.all(this.listeners)
        .then(() => {
          cb && cb();
          resolve();
        });

      // 更新所有用到的组件
      this.setters.forEach(setter => this.updateComponent(setter));
    });
  }

  // 同步更新状态，直接更新值到 state，不会等 dom 渲染后完成
  public setStateSync(updater: Partial<S> | ((args: S) => Partial<S>), cb?: () => void) {
    const nextState = this.getNextState(updater);

    cb && cb();

    // 如果 nextState 没有值，直接 retuen，不会更新组件
    if (!nextState) {
      return;
    }

    // 把 nextState 和 旧 state 合并生产新 state 赋值给 this.state;
    this.state = Object.assign({}, this.state, nextState);
    this.setters.forEach(setter => this.updateComponent(setter));
  }

  // 批量处理
  public beginBatchUpdate() {
    // state 快照
    let state = cloneDeep(this.state);

    // 更新快照 state 的值
    const setState = (updater: Partial<S> | ((args: S) => Partial<S>), cb?: () => void) => {
      let nextState: Partial<S>;

      if (typeof updater === "function") {
        nextState = updater(state);
      } else {
        nextState = updater;
      }

      if (nextState == null) {
        cb && cb();
        return;
      }

      state = Object.assign({}, state, nextState);
    };

    // 将在快照上更新的 state 同步到 this.state
    const commit = () => {
      this.setState(state);
    };

    return { state, setState, commit };
  }
}

export default Store;