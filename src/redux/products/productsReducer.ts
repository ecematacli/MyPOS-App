import { ProductsState, Product, Action, SuccessActionTypes } from './types';

const initialState = {
  count: 0,
  products: {},
  ids: []
};

export default (
  state: ProductsState = initialState,
  action: Action
): ProductsState => {
  switch (action.type) {
    case SuccessActionTypes.FETCH_PRODUCTS_SUCCESS:
      const { products, count } = action.payload;
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
        ids: products.map((product: Product) => product.id)
      };
    case SuccessActionTypes.EDIT_PRODUCT_SUCCESS:
      return {
        ...state,
        products: {
          ...state.products,
          [action.payload.id]: action.payload
        }
      };
    case SuccessActionTypes.CREATE_PRODUCT_SUCCESS:
      return {
        ...state,
        products: {
          ...state.products,
          [action.payload.id]: action.payload
        }
      };
    default:
      return state;
  }
};
