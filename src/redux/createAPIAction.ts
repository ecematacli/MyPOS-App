import { ApiAction } from './types';

export const CALL_API = 'CALL_API';

export default (
  type: string,
  method: string,
  url: string,
  data?: any,
  successMessage?: (m: string, t: string) => void,
  errorMessage?: (m: string, t: string) => void
): ApiAction => ({
  [CALL_API]: {
    type,
    method,
    url,
    data,
    successMessage,
    errorMessage
  }
});
