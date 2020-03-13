import { Product } from '../../../redux/products/types';

export type State = Product[];

export enum ActionTypes {
  Add,
  Delete,
  DecreaseQuantity,
  IncreaseQuantity,
  DiscardSale,
  EditProductPrice
}

export interface AddAction {
  type: ActionTypes.Add;
  payload: Product;
}

export interface DeleteAction {
  type: ActionTypes.Delete;
  payload: { id: number };
}

export interface DecreaseQtyAction {
  type: ActionTypes.DecreaseQuantity;
  payload: Product;
}

export interface IncreaseQtyAction {
  type: ActionTypes.IncreaseQuantity;
  payload: Product;
}

export interface EditPriceAction {
  type: ActionTypes.EditProductPrice;
  payload: { id: number; newPrice: number };
}

export interface DiscardSaleAction {
  type: ActionTypes.DiscardSale;
}

export type Action =
  | AddAction
  | DeleteAction
  | DecreaseQtyAction
  | IncreaseQtyAction
  | EditPriceAction
  | DiscardSaleAction;
