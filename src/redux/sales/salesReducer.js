import { CREATE_SALE, FETCH_SALES } from './types';

const initialState = {
  count: 0,
  sales: {},
  ids: []
};

export default (state = initialState, { type, payload, callNotification }) => {
  switch (type) {
    case CREATE_SALE:
      callNotification();
      return payload;
    case FETCH_SALES + '_SUCCESS': {
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
        },
        ids: sales.map(sale => sale.id)
      };
    }
    default:
      return state;
  }
};
