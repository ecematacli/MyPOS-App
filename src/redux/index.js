import { combineReducers } from 'redux';

import sales from './sales/salesReducer';
import products from './products/productsReducer';
import categories from './categories/categoriesReducer';
import brands from './brands/brandsReducer';

export default combineReducers({
  sales,
  products,
  categories,
  brands
});
