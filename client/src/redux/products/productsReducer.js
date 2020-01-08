import { FETCH_PRODUCTS } from './types';

const initialState = {
  products: {}
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_PRODUCTS:
      return '';
    default:
      return state;
  }
};
