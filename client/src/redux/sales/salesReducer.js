import { CREATE_SALE, FETCH_SALES } from './types';

export default (state = {}, { type, payload }) => {
  switch (type) {
    case CREATE_SALE:
      return '';
    case FETCH_SALES: {
      const objSalesData = payload.reduce(
        (obj, currSale) => ({
          ...obj,
          [currSale.id]: currSale
        }),
        {}
      );
      return {
        ...state,
        ...objSalesData
      };
    }
    default:
      return state;
  }
};
