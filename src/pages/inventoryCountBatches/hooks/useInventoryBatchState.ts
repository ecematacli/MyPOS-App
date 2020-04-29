import { useState } from 'react';

import api from '../../../api';
import { BatchesData } from '../types';
import useAsyncError from '../../../common/hooks/useAsyncError';

export default () => {
  const [loading, setLoading] = useState(false);
  const [batches, setBatches] = useState<BatchesData>({
    count: 0,
    batches: [],
  });
  const [status, setStatus] = useState('opened');
  const throwError = useAsyncError();

  const fetchCountBatches = async (page: number, rowsPerPage: number) => {
    try {
      const url = `/inventory-count?page=${page}&rowsPerPage=${rowsPerPage}&status=${status}`;
      setLoading(true);
      const response = await api.get(url);
      const data: BatchesData = response.data;
      setBatches(data);
      setLoading(false);
    } catch (e) {
      throwError(e);
    }
  };

  return {
    fetchCountBatches,
    loading,
    batches,
  };
};
