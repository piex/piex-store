import React, { FC } from 'react';
import { IProduct } from '../models';

import { useStore } from '@piex-store/react';
import cartStore from '../store/cart';
import Product from './Product';

interface IProductItem {
  product: IProduct;
}


const ProductItem: FC<IProductItem> = ({ product }) => {
  const store = useStore(cartStore);

  return (
    <div style={{ marginTop: '20px' }}>
      <Product
        title={product.title}
        price={product.price}
        quantity={product.inventory}
      />
      <button
        disabled={product.inventory === 0}
        onClick={() => store.addToCart(product.id)}
      >
        {product.inventory > 0 ? 'Add to cart' : 'Sold Out'}
      </button>
    </div>
  );
};

export default ProductItem;
