import { Store, createStore } from '@piex-store/core';
import generateTree from './generateTree';

let nextId = 0;

function getAllDescendantIds(tree: ITree, nodeId: string): string[] {
  return (
    tree[nodeId].childIds.reduce((acc: string[], childId) => {
      return [...acc, childId, ...getAllDescendantIds(tree, childId)];
    }, [])
  );
}

const deleteMany = (tree: ITree, ids: string[]) => {
  tree = { ...tree };
  ids.forEach(id => delete tree[id]);
  return tree;
};


export interface INode {
  id: string;
  counter: number;
  childIds: (string)[];
}

export interface ITree {
  [key: string]: INode;
}

interface IState {
  tree: ITree;
}

class TreeStore extends Store<IState> {
  readonly state: IState = {
    tree: generateTree(),
  }

  addChild(nodeId: string) {
    const { tree } = this.state;

    const childId = `new_${nextId++}`;
    this.setState({
      tree: {
        ...tree,
        [nodeId]: {
          ...tree[nodeId],
          childIds: [...tree[nodeId].childIds, childId],
        },
        [childId]: {
          id: childId,
          counter: 0,
          childIds: [],
        },
      },
    });
  }

  deleteNode(nodeId: string) {
    const { tree } = this.state;
    const descendantIds = getAllDescendantIds(tree, nodeId);

    this.setState({
      tree: deleteMany(tree, [nodeId, ...descendantIds]),
    });
  }

  removeChild(parentId: string, id: string) {
    const { tree } = this.state;

    this.setState({
      tree: {
        ...tree,
        [parentId]: {
          ...tree[parentId],
          childIds: tree[parentId].childIds.filter(cid => cid !== id),
        },
      },
    });
  }

  inc(nodeId: string) {
    const { tree } = this.state;
    const node = tree[nodeId];
    this.setState({
      tree: {
        ...tree,
        [nodeId]: { ...node, counter: node.counter + 1 },
      },
    });

  }

}

export default createStore(TreeStore);