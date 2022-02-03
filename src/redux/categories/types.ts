import { ActionTypes } from '../types'

export interface Category {
  id: string
  name: string | null
}

export type CategoriesState = Category[]

export interface CategoriesAction {
  type: ActionTypes.FETCH_CATEGORIES
  payload: Category[]
}
