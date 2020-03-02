import { ActionTypes, ProductsState, Product } from './types';

const initialState: ProductsState = {
  count: 0,
  products: {},
  ids: []
};

export default (state = initialState, { type, payload }): ProductsState => {
  switch (type) {
    case ActionTypes.FETCH_PRODUCTS + '_SUCCESS': {
      const { products, count } = payload;
      const objProductsData = products.reduce(
        (obj: { [id: string]: Product }, currProduct: Product) => ({
          ...obj,
          [currProduct.id]: currProduct
        }),
        {}
      );

      return {
        count,
        products: {
          ...objProductsData
        },
        ids: products.map(product => product.id)
      };
    }
    case ActionTypes.EDIT_PRODUCT + '_SUCCESS':
      return {
        ...state,
        products: {
          ...state.products,
          [payload.id]: payload
        }
      };
    case ActionTypes.CREATE_PRODUCT + '_SUCCESS':
      return {
        ...state,
        products: {
          ...state.products,
          [payload.id]: payload
        }
      };
    default:
      return state;
  }
};
