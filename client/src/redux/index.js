import { combineReducers } from 'redux';

import sales from './sales/salesReducer';
import products from './products/productsReducer';

export default combineReducers({
  sales,
  products
});
