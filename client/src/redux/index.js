import { combineReducers } from 'redux';

import sales from './sales/salesReducer';
import products from './products/productsReducer';
import categories from './categories/categoriesReducer';

export default combineReducers({
  sales,
  products,
  categories
});
