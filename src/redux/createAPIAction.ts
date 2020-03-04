import { ApiAction } from './types';

export const CALL_API = 'CALL_API';

const Api = (
  type: string,
  method: string,
  url: string,
  data?: any,
  successMessage?: () => void,
  errorMessage?: () => void
): ApiAction => ({
  type,
  callApi: {
    method,
    url,
    data,
    successMessage,
    errorMessage
  }
});

export default Api;
