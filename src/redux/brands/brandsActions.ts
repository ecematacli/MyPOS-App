import { ActionTypes } from './types';
import { Dispatch } from 'redux';
import createAPIAction from '../createAPIAction';

interface BrandsAction {
  type: ActionTypes.fetchBrands;
  method: string;
  url: string;
}

export const fetchBrands = () =>
  createAPIAction(ActionTypes.fetchBrands, 'get', '/brands');
