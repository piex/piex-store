import React, { FC } from 'react';
import Node from './Node';

const App: FC<{}> = () => {
  return (
    <article>
      <Node parentId="0" id="0" />
    </article>
  );
};

export default App;
