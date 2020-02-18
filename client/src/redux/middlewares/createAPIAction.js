export const CALL_API = 'CALL_API';

export default (type, method, url, data, notification) => ({
  [CALL_API]: {
    type,
    method,
    url,
    data,
    notification
  }
});
