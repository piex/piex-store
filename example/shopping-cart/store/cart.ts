import { Store, createStore, applyMiddleware } from '@piex-store/core';
import devtools from '@piex-store/middleware-redux-devtools';
import productsStore from './products';
import { buyProductsAPI } from '../api/shop';

interface ICartState {
  addedIds: number[];
  quantityById: {
    [key: number]: number;
  };
}


class CartStore extends Store<ICartState>{
  readonly state: ICartState = {
    addedIds: [],
    quantityById: {},
  };

  getQuantity(productId: number) {
    return this.state.quantityById[productId] || 0;
  }

  getTotal() {
    return this.state.addedIds.reduce((total, id) => {
      return total + (productsStore.getProductById(id).price * this.getQuantity(id));
    }, 0).toFixed(2);
  }

  // 加入购物车
  addToCart(productId: number) {
    const { addedIds, quantityById } = this.state;
    if (!addedIds.includes(productId)) {
      this.setState({
        addedIds: [...addedIds, productId],
        quantityById: {
          ...quantityById,
          [productId]: (quantityById[productId] || 0) + 1,
        },
      });
    } else {
      this.setState({
        quantityById: {
          ...quantityById,
          [productId]: (quantityById[productId] || 0) + 1,
        },
      });
    }

    productsStore.addToCart(productId);
  }

  getCartProducts() {
    const { addedIds, quantityById } = this.state;
    return addedIds.map(id => {
      const product = productsStore.getProductById(id);
      return { ...product, quantity: quantityById[id] };
    });
  }

  checkout() {
    const products = this.state.addedIds.map(id => ({
      id,
      quantity: this.getQuantity(id),
    }));

    buyProductsAPI(products, 500)
      .then((res) => {
        console.log(res);
        this.setState({
          addedIds: [],
          quantityById: {},
        });
      });
  }
}

export default createStore(CartStore, applyMiddleware(devtools));
