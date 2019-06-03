import React, { FC } from 'react';
import Products from './Products';
import Cart from './Cart';

const App: FC<{}> = () => (
  <article>
    <h2>Shopping Cart Example</h2>
    <hr />
    <Products />
    <hr />
    <Cart />
  </article>
);

export default App;
