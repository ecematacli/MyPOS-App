import _ from 'lodash';
import { FETCH_SALES } from './types';

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_SALES:
      return '';
    default:
      return state;
  }
};
