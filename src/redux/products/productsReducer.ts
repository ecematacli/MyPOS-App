import {
  FETCH_PRODUCTS,
  EDIT_PRODUCT,
  CREATE_PRODUCT,
  ProductsState,
  Product
} from './types';

const initialState: ProductsState = {
  count: 0,
  products: {},
  ids: []
};

export default (state = initialState, { type, payload }): ProductsState => {
  switch (type) {
    case FETCH_PRODUCTS + '_SUCCESS': {
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
    case EDIT_PRODUCT + '_SUCCESS':
      return {
        ...state,
        products: {
          ...state.products,
          [payload.id]: payload
        }
      };
    case CREATE_PRODUCT + '_SUCCESS':
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
