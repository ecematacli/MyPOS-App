import { CREATE_SALE, FETCH_SALES } from './types';

const initialState = {
  count: 0,
  sales: {}
};

export default (state = initialState, { type, payload }) => {
  console.log(payload);
  switch (type) {
    case CREATE_SALE:
      return '';
    case FETCH_SALES: {
      const objSalesData = sales.reduce(
        (obj, currSale) => ({
          ...obj,
          [currSale.id]: currSale
        }),
        {}
      );
      return {
        ...state,
        sales: {
          ...objSalesData
        }
      };
    }
    default:
      return state;
  }
};
