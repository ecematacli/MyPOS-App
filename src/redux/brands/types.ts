export enum ActionTypes {
  FETCH_BRANDS = 'FETCH_BRANDS'
}

export interface Brand {
  id: number;
  name: string | null;
}

export type BrandsState = Brand[];

export interface BrandsAction {
  type: ActionTypes.FETCH_BRANDS;
  payload: Brand[];
}
