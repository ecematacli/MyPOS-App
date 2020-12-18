import { ApiAction } from './types';

export default (
  type: string,
  method: string,
  url: string,
  data?: any,
  successMessage?: () => void,
  errorMessage?: (m: string, t: string) => void
): ApiAction => ({
  type,
  callApi: {
    method,
    url,
    data,
    successMessage,
    errorMessage,
  },
});
