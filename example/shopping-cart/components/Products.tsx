import React, { FC } from 'react';

import { useStore } from '@piex-store/react';
import productsStore from '../store/products';

import ProductsList from './ProductsList';
import ProductItem from './ProductItem';


const Products: FC<{}> = () => {
  const store = useStore(productsStore);
  const { products } = store.state;

  return (
    <ProductsList title="Products">
      {products.map(product => {
        return <ProductItem key={product.id} product={product} />;
      })}
    </ProductsList>
  );
};

export default Products;
