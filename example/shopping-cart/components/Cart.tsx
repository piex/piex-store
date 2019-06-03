import React, { FC } from 'react';
import { useStore } from '@piex-store/react';

import cartStore from '../store/cart';
import Product from './Product';

const Cart: FC<{}> = () => {
  const store = useStore(cartStore);

  const carProducts = store.getCartProducts();

  return (
    <article >
      <h3>Your Cart</h3>
      <div>
        {carProducts.map(product => (
          <Product
            key={product.id}
            title={product.title}
            price={product.price}
            quantity={product.quantity}
          />
        ))}
        {carProducts.length === 0 && (
          <em>Please add some products to cart.</em>
        )}
      </div>
      <p>Total: ¥{store.getTotal()}</p>
      <button onClick={() => store.checkout()}>Checkout</button>
    </article>
  );
};

export default Cart;
