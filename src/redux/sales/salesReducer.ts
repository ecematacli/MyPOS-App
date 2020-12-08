import { SalesState, Sale, FetchSalesAction, SuccessActionTypes } from './types'

const initialState = {
  count: 0,
  cursors: {
    before: '',
    after: '',
  },
  sales: {},
  ids: [],
}

export default (state: SalesState = initialState, action: FetchSalesAction): SalesState => {
  switch (action.type) {
    case SuccessActionTypes.FETCH_SALES_SUCCESS: {
      const { sales, count, cursors } = action.payload
      const objSalesData = sales.reduce(
        (obj: { [id: string]: Sale }, currSale: Sale) => ({
          ...obj,
          [currSale.id]: currSale,
        }),
        {}
      )
      return {
        count,
        cursors,
        sales: {
          ...objSalesData,
        },
        ids: sales.map((sale: Sale) => sale.id),
      }
    }
    default:
      return state
  }
}
