import { Product } from '../../../redux/products/types'

export type State = Product[]

export enum ActionTypes {
  Add,
  Delete,
  DecreaseQuantity,
  IncreaseQuantity,
  DiscardSale,
  EditProductField,
}

export interface NewProductData {
  barcode: string
  name: string
  qty: number
  sku: string
  price: number
  variation: string
  discountPrice: number
  taxRate: number
  categoryId: string
  brandId: string
}

export interface AdditionalInputs {
  taxRate: number
  category: string
  brand: string
}

export interface AddAction {
  type: ActionTypes.Add
  payload: Product
}

export interface DeleteAction {
  type: ActionTypes.Delete
  payload: { id: number }
}

export interface DecreaseQtyAction {
  type: ActionTypes.DecreaseQuantity
  payload: Product
}

export interface IncreaseQtyAction {
  type: ActionTypes.IncreaseQuantity
  payload: Product
}

export interface EditPriceAction {
  type: ActionTypes.EditProductField
  payload: { id: number; field: string; newValue: number }
}

export interface DiscardSaleAction {
  type: ActionTypes.DiscardSale
}

export type Action =
  | AddAction
  | DeleteAction
  | DecreaseQtyAction
  | IncreaseQtyAction
  | EditPriceAction
  | DiscardSaleAction
