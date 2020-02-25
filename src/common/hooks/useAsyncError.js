import { useState, useCallback } from 'react';

const useAsyncError = () => {
  const [_, setError] = useState();
  return useCallback(
    e => {
      setError(() => {
        throw e;
      });
    },
    [setError]
  );
};

export default useAsyncError;
