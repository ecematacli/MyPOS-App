import { FETCH_BRANDS } from './types';
import createAPIAction from '../middlewares/createAPIAction';

export const fetchBrands = () => async dispatch =>
  dispatch(createAPIAction(FETCH_BRANDS, 'get', '/brands'));
