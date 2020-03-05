import { ActionTypes } from '../types';
import { SalesState, Sale } from './types';

const initialState: SalesState = {
  count: 0,
  sales: {},
  ids: []
};

export default (state = initialState, { type, payload }): SalesState => {
  switch (type) {
    case ActionTypes.CREATE_SALE + '_SUCCESS':
      console.log('create sale action payload', payload);
      return payload;
    case ActionTypes.FETCH_SALES + '_SUCCESS': {
      console.log('fetch sales payload', payload);
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
