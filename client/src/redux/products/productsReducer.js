import { FETCH_PRODUCTS, EDIT_PRODUCT, CREATE_PRODUCT } from './types';

const initialState = {
  count: 0,
  products: {},
  ids: []
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_PRODUCTS + '_SUCCESS': {
      const { products, count } = payload;
      const objProductsData = products.reduce(
        (obj, currProduct) => ({
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
    case EDIT_PRODUCT + '_SUCCESS':
      return {
        ...state,
        products: {
          ...state.products,
          [payload.id]: payload
        }
      };
    case CREATE_PRODUCT + '_SUCCESS':
      console.log('success case create product!');
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
