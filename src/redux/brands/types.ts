import { ActionTypes } from '../types'
export interface Brand {
  id: string
  name: string | null
}

export type BrandsState = Brand[]

export interface BrandsAction {
  type: ActionTypes.FETCH_BRANDS
  payload: Brand[]
}
