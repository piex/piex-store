import React, { FC } from 'react';

interface IProductProps {
  price: number;
  title: string;
  quantity: number;
}

const Product: FC<IProductProps> = ({ price, title, quantity }) => (
  <div>
    {title} - ¥{price}{quantity ? ` x ${quantity}` : null}
  </div>
);

export default Product;
