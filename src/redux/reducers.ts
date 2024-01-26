import { combineReducers } from 'redux'

import { StoreState } from './types'
import sales from './sales/salesReducer'
import products from './products/productsReducer'
import categories from './categories/categoriesReducer'
import brands from './brands/brandsReducer'
import loading from './loading/loadingReducer'

export const appReducer = combineReducers<StoreState>({
  sales,
  products,
  categories,
  brands,
  loading,
})
