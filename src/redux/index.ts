import { combineReducers } from 'redux';

import sales from './sales/salesReducer';
import products from './products/productsReducer';
import categories from './categories/categoriesReducer';
import brands from './brands/brandsReducer';
import loading from './loading/loadingReducer';
import { StoreState } from './types';

export default combineReducers<StoreState>({
  sales,
  products,
  categories,
  brands,
  loading
});
