import { ActionTypes } from '../types';
import { SalesState, Sale } from './types';

import { EnhancedAction } from '../middlewares';

const initialState: SalesState = {
  count: 0,
  sales: {},
  ids: []
};

export default (
  state = initialState,
  { type, payload }: EnhancedAction
): SalesState => {
  switch (type) {
    case ActionTypes.CREATE_SALE:
      return payload;
    case ActionTypes.FETCH_SALES + '_SUCCESS': {
      const { sales, count } = payload;
      const objSalesData = sales.reduce(
        (obj: { [id: string]: Sale }, currSale: Sale) => ({
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
        ids: sales.map((sale: Sale) => sale.id)
      };
    }
    default:
      return state;
  }
};
