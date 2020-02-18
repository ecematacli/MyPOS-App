export const CALL_API = 'CALL_API';

export default (type, method, url, data, successMessage, errorMessage) => ({
  [CALL_API]: {
    type,
    method,
    url,
    data,
    successMessage,
    errorMessage
  }
});
