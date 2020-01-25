import { combineReducers } from 'redux';

import sales from './sales/salesReducer';
import products from './products/productsReducer';
import notifications from './notifications/notificationsReducer';

export default combineReducers({
  sales,
  products,
  notifications
});
