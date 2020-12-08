import { Dispatch } from 'redux'
import { ActionTypes, ApiAction } from '../types'

import { SaleData, PaymentMethod } from './types'
import createAPIAction from '../createAPIAction'
import { Product } from '../products/types'

export const completeSale = (
  products: Product[],
  total: number,
  discount: number,
  description: string,
  paymentMethod: PaymentMethod,
  addNotification: (m: string, t: string) => void,
  discardSale: () => void
) => async (dispatch: Dispatch) => {
  const saleData: SaleData = {
    products,
    total: total - discount,
    discount,
    paymentMethod,
  }

  if (description) {
    saleData.description = description
  }

  dispatch<ApiAction>(
    createAPIAction(
      ActionTypes.CREATE_SALE,
      'post',
      '/sales',
      saleData,
      () => {
        addNotification('Sale has been completed successfully', 'success')
        discardSale()
      },
      () => addNotification('Sale could not been created!', 'error')
    )
  )
}

export const fetchSales = (
  rowsPerPage: number = 10,
  afterCursor?: string,
  beforeCursor?: string,
  startDate?: Date,
  endDate?: Date
) => async (dispatch: Dispatch) => {
  let url = `/sales?rowsPerPage=${rowsPerPage}`
  if (afterCursor) {
    url += `&after=${afterCursor}`
  }
  if (beforeCursor) {
    url += `&before=${beforeCursor}`
  }

  if (startDate) {
    url += `&startDate=${startDate.toISOString()}`
  }
  if (endDate) {
    url += `&endDate=${endDate.toISOString()}`
  }

  dispatch<ApiAction>(createAPIAction(ActionTypes.FETCH_SALES, 'get', url))
}
