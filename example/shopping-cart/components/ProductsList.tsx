import React, { FC } from 'react';

interface IProductListProps {
  title: string;
}

const ProductList: FC<IProductListProps> = ({ title, children }) => (
  <section>
    <h3>{title}</h3>
    <div>{children}</div>
  </section>
);

export default ProductList;
