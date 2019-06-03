import { IProduct } from '../models';
import products from './products.json';

export const getProductsAPI = (timeout: number) => {
  return new Promise<IProduct[]>(resolve => {
    setTimeout(() => {
      resolve(products);
    }, timeout);
  });
};

export const buyProductsAPI = (payload: any, timeout: number) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(payload);
    }, timeout);
  });
};
