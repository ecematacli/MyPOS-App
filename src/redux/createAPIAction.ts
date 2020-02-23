export const CALL_API = 'CALL_API';

export default (
  type: string,
  method: string,
  url: string,
  data?: any,
  successMessage?: Function,
  errorMessage?: Function
) => ({
  [CALL_API]: {
    type,
    method,
    url,
    data,
    successMessage,
    errorMessage
  }
});
