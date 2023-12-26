import { Dispatch } from 'redux'
import { ActionTypes, ApiAction } from '../types'

import { SaleData } from './types'
import createAPIAction from '../createAPIAction'
import { SalesArgs } from '../../pages/sales/components/pos-table-right/types'

export const completeSale = ({
  products,
  total,
  discount,
  description,
  paymentMethod,
  addNotification,
  discardSale,
  outletId,
}: SalesArgs) => async (dispatch: Dispatch) => {
  const saleData: SaleData = {
    products,
    total: total - discount,
    discount,
    paymentMethod,
    outletId,
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
        addNotification('Satış kaydedildi.', 'success')
        discardSale()
      },
      addNotification
    )
  )
}

export const fetchSales = ({
  rowsPerPage = 10,
  afterCursor,
  beforeCursor,
  startDate,
  endDate,
  outletId,
}: {
  rowsPerPage: number
  afterCursor?: string
  beforeCursor?: string
  startDate?: Date
  endDate?: Date
  outletId?: number
}) => async (dispatch: Dispatch) => {
  let url = `/sales?rowsPerPage=${rowsPerPage}`

  if (afterCursor) {
    url += `&after=${afterCursor}`
  }
  if (beforeCursor) {
    url += `&before=${beforeCursor}`
  }

  if (outletId) {
    url += `&outletId=${outletId}`
  }

  if (startDate) {
    url += `&startDate=${startDate.toISOString()}`
  }
  if (endDate) {
    url += `&endDate=${endDate.toISOString()}`
  }

  dispatch<ApiAction>(createAPIAction(ActionTypes.FETCH_SALES, 'get', url))
}
