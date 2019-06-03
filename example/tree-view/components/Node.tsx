import React, { FC, memo, useCallback } from 'react';
import { useStore } from '@piex-store/react';
import treeStore from '../store';

interface INodeProps {
  counter: number;
  parentId: string;
  id: string;
  childIds: string[];
  inc: (id: string) => void;
  remove: (id: string, parentId: string) => void;
  addChild: (id: string) => void;
}

const Node: FC<INodeProps> = memo(({ counter, parentId, childIds, id, inc, remove, addChild }) => {
  const child = childIds.map(childId => {
    return (
      <li key={childId}>
        <NodeWrap id={childId} parentId={id} />
      </li>
    );
  });

  const handleRemoveClick = useCallback((e) => {
    e.preventDefault();

    remove(id, parentId);
  }, [remove, id, parentId]);

  const handleAddChildClick = useCallback((e) => {
    e.preventDefault();
    addChild(id);
  }, [addChild, id]);

  return (
    <article>
      Counter: {counter}
      {' '}
      <button onClick={() => inc(id)}>
        +
      </button>
      {' '}
      {typeof parentId !== 'undefined' && (
        <a
          href="#"
          style={{ color: 'lightgray', textDecoration: 'none' }}
          onClick={handleRemoveClick}
        >
          ×
        </a>
      )}
      <ul>
        {child}
        <li key="add">
          <a href="#" onClick={handleAddChildClick}>
            Add Child
          </a>
        </li>
      </ul>
    </article>
  );
});

const NodeWrap: FC<{ id: string; parentId: string }> = ({ id, parentId }) => {
  const store = useStore(treeStore);
  const node = store.state.tree[id];

  const inc = useCallback((id: string) => {
    store.inc(id);
  }, [store]);

  const remove = useCallback((id: string, parentId: string) => {
    store.deleteNode(id);
    store.removeChild(parentId, id);
  }, [store]);

  const addChild = useCallback((id: string) => {
    store.addChild(id);
  }, []);

  return (
    <Node
      parentId={parentId}
      id={id}
      counter={node.counter}
      childIds={node.childIds}
      inc={inc}
      remove={remove}
      addChild={addChild}
    />
  );
};

export default NodeWrap;
