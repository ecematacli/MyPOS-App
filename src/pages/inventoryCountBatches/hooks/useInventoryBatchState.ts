import { useState } from 'react';

import api from '../../../api';
import { BatchesData } from '../types';

export default () => {
  const [loading, setLoading] = useState(false);
  const [batches, setBatches] = useState<BatchesData>({
    count: 0,
    batches: [],
  });
  const [status, setStatus] = useState('opened');

  const fetchCountBatches = async (page: number, rowsPerPage: number) => {
    try {
      const url = `/inventory-count?page=${page}&rowsPerPage=${rowsPerPage}&status=${status}`;
      setLoading(true);
      const response = await api.get(url);
      const data: BatchesData = response.data;
      setBatches(data);
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  return {
    fetchCountBatches,
    loading,
    batches,
  };
};
