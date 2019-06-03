import { Store, createStore, applyMiddleware } from '@piex-store/core';
import devtools from '@piex-store/middleware-redux-devtools';

import { IProduct } from '../models';
import { getProductsAPI } from '../api/shop';

interface IProductsState {
  products: IProduct[];
}

class ProductsStore extends Store<IProductsState> {
  readonly state: IProductsState = {
    products: [],
  }

  constructor() {
    super();
    this.getAllProducts();
  }

  getAllProducts() {
    getProductsAPI(500).then(res => {
      this.setState({
        products: res,
      });
    });
  }

  addToCart(productId: number) {
    const { products } = this.state;

    this.setState({
      products: products.map(p => {
        p.id === productId && p.inventory--;
        return p;
      }),
    });
  }

  getProductById(productId: number) {
    const { products } = this.state;

    const product = products.filter(({ id }) => productId === id);

    return product[0];
  }
}

export default createStore(ProductsStore, applyMiddleware(devtools));
