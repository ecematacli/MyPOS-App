import { combineReducers } from 'redux';

import sales from './sales/salesReducer';
import products from './products/productsReducer';
import categories from './categories/categoriesReducer';
import brands from './brands/brandsReducer';
import loading from './loading/loadingReducer';

export interface StoreState {
  sales: any;
  products: any;
  categories: any;
  brands: any;
  loading: any;
}
export default combineReducers<StoreState>({
  sales,
  products,
  categories,
  brands,
  loading
});
