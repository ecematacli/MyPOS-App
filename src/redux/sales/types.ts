import { Product } from '../products/types'

export enum PaymentMethod {
  Cash = 'Cash',
  CreditCard = 'CreditCard',
  OnCredit = 'OnCredit',
}

export const PAYMENT_METHODS = [
  { label: 'Cash', value: PaymentMethod.Cash },
  { label: 'Credit Card', value: PaymentMethod.CreditCard },
  { label: 'On Credit', value: PaymentMethod.OnCredit },
]

export enum SuccessActionTypes {
  FETCH_SALES_SUCCESS = 'FETCH_SALES_SUCCESS',
}
export interface Sale {
  id: number
  createdAt: string
  outlet: string
  status: string
  orderNo: null
  total: number
  discount: number
  paymentMethod: PaymentMethod
  products: Product[]
}

export interface SalesState {
  count: number
  cursors: {
    before: string
    after: string
  }
  sales: { [id: string]: Sale }
  ids: number[]
}

export interface SaleData {
  products: Product[]
  total: number
  discount: number
  paymentMethod: PaymentMethod
  description?: string
}

// Action creator
export interface FetchSalesAction {
  type: SuccessActionTypes.FETCH_SALES_SUCCESS
  payload: {
    count: number
    sales: Sale[]
    cursors: {
      before: string
      after: string
    }
  }
}
