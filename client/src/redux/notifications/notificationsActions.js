import { DISPLAY_ERROR, DISPLAY_SUCCESS } from './types';

export const displayErrorMsg = message => {
  // console.log('display error msg action creator here');
  return {
    type: DISPLAY_ERROR,
    payload: message
  };
};

export const displaySuccessMsg = message => {
  return { type: DISPLAY_SUCCESS, payload: message };
};
