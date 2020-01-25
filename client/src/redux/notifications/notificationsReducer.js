import { DISPLAY_ERROR, DISPLAY_SUCCESS } from './types';

const INITIAL_STATE = {
  error: '',
  success: ''
};

export default (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case DISPLAY_SUCCESS:
      console.log('DISPLAY SUCCESS');
      return {
        success: payload
      };
    case DISPLAY_ERROR:
      console.log('DISPLAY ERROR');
      return {
        error: payload
      };
    default:
      return state;
  }
};
