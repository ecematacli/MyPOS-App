import { useState } from 'react';

import api from '../../../api';
import { BatchesProductsData } from '../types';
import useAsyncError from '../../../common/hooks/useAsyncError';

export default () => {
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [loading, setLoading] = useState(false);
  const [batchProducts, setBatchProducts] = useState<BatchesProductsData>({
    counted: 0,
    uncounted: 0,
    products: []
  });

  const throwError = useAsyncError();

  const handleChangeRowsPerPage = ({
    target: { value }
  }: React.ChangeEvent<HTMLInputElement>) => {
    const numValue = parseInt(value);
    setRowsPerPage(numValue);
    // fetchCountBatches(page, numValue);
  };

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    newPage: number
  ) => {
    //To adapt 0-based page of MUI pagination component 1 is added whilst 1 is subtracted for page prop
    if (newPage + 1 < 0) return;
    setPage(newPage + 1);
    // fetchCountBatches(newPage + 1, rowsPerPage);
  };

  const fetchBatchesProducts = async (id: number) => {
    try {
      setLoading(true);
      const response = await api.get(
        `/inventory-count/${id}/products?page=${page}&rowsPerPage=${rowsPerPage}`
      );
      const data: BatchesProductsData = response.data;
      setBatchProducts(data);
      setLoading(false);
    } catch (e) {
      throwError(e);
    }
  };

  return {
    loading,
    batchProducts,
    fetchBatchesProducts,
    page,
    handleChangePage,
    rowsPerPage,
    handleChangeRowsPerPage
  };
};