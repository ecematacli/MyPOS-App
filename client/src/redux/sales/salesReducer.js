import { CREATE_SALE, FETCH_SALES } from './types';

const initialState = {
  count: 0,
  sales: {}
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case CREATE_SALE:
      return '';
    case FETCH_SALES: {
      const { sales, count } = payload;
      const objSalesData = sales.reduce(
        (obj, currSale) => ({
          ...obj,
          [currSale.id]: currSale
        }),
        {}
      );
      return {
        count,
        sales: {
          ...objSalesData
        }
      };
    }
    default:
      return state;
  }
};
