import React, { FC, memo } from 'react';
import { render } from 'react-dom';

import githubStore from './store';
import { useStore } from '@piex-store/react';

const Star: FC<{}> = memo(() => {
  const store = useStore(githubStore);
  console.log('Star function component render');

  return (
    <p>
      {store.state.star ?
        (
          <button onClick={() => store.unStar()}>UnStar</button>
        )
        :
        (
          <button onClick={() => store.star()}>Star</button>
        )
      }
    </p>
  );
});

const Issue: FC<{}> = memo(() => {
  const store = useStore(githubStore);
  console.log('Issue function component render');

  return (
    <p>
      <button onClick={() => store.addIssue()}>issue + 1</button>
      <button onClick={() => store.addIssue(5)}>issue + 5</button>
      <button onClick={() => store.deleteIssue()}>delete issue</button>
      <button onClick={() => store.starAsync()}>Star Async</button>
    </p>
  );
});

const Static: FC<{}> = memo(() => {
  console.log('Static function component render');

  return <p>static</p>;
});

const Github: FC = memo(() => {
  const store = useStore(githubStore);
  console.log('Github function component render');

  return (
    <>
      <Static />
      <p>{`Star：${store.state.star}`}</p>
      <p>Issue：{store.state.issue}</p>
      <Star />
      <Issue />
    </>
  );
});

render(<Github />, document.getElementById('react'));
