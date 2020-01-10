import { FETCH_PRODUCTS, EDIT_PRODUCT } from './types';

const initialState = {
  count: 0,
  products: {}
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_PRODUCTS: {
      console.log(payload);
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
        }
      };
    }
    case EDIT_PRODUCT:
      console.log({
        ...state,
        products: {
          [payload.id]: payload
        }
      });
      return '';
    default:
      return state;
  }
};
