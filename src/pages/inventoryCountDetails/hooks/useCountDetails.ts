import { useState, useContext, useEffect } from 'react';

import api from '../../../api';
import { BatchesProductsData, BatchProduct, BatchData } from '../types';
import useLocalStorageState from '../../../common/hooks/useLocalStorageState';
import { usePostRequest } from '../../../common/hooks/usePostRequest';
import { useGetRequest } from '../../../common/hooks/useGetRequest';
import { NotificationsContext } from '../../../contexts/NotificationsContext';

type SetQuery = React.Dispatch<React.SetStateAction<string>>;

export default (setQuery: SetQuery, batchId: string) => {
  const { addNotification } = useContext(NotificationsContext);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [itemCount, setItemCount] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState<BatchProduct>(null);
  const [lastCountedItems, setLastCountedItems] = useLocalStorageState<
    BatchProduct[]
  >('lastCountedItems', []);

  const [tabsValue, setTabsValue] = useState('all');
  const [batchProducts, setBatchProducts] = useState<BatchesProductsData>({
    counted: 0,
    uncounted: 0,
    products: [],
  });

  //API Requests
  const { value: batch } = useGetRequest<BatchData>(
    `/inventory-count/${batchId}`
  );

  const [postProductCount] = usePostRequest();

  const fetchBatchesProducts = async (
    id: number,
    status = 'all',
    page = 1,
    rowsPerPage = 10
  ) => {
    try {
      setLoading(true);
      const response = await api.get(
        `/inventory-count/${id}/products?page=${page}&rowsPerPage=${rowsPerPage}&status=${status}`
      );
      const data: BatchesProductsData = response.data;
      setBatchProducts(data);
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  // Helper functions
  const handleTabsChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    newValue: string
  ) => {
    setTabsValue(newValue);
    fetchBatchesProducts(parseInt(batchId), newValue, page, rowsPerPage);
  };

  const handleSelectedProduct = (product: BatchProduct) => {
    setSelectedProduct(product);
    setQuery(product.name);
  };

  const handleCountClick = async () => {
    const updatedSelectedProduct = {
      ...selectedProduct,
      counted: itemCount,
    };
    setSelectedProduct(updatedSelectedProduct);

    const [updatedProduct] = await postProductCount(
      '/inventory-count/count-product',
      {
        id: updatedSelectedProduct.id,
        count: updatedSelectedProduct.counted,
      }
    );

    if (!updatedProduct) {
      return addNotification('Something went wrong!', 'error');
    }

    const replacedProducts = batchProducts.products.map((product) =>
      product.id === selectedProduct.id ? updatedProduct : product
    );

    setBatchProducts((batchProducts) => ({
      ...batchProducts,
      products: replacedProducts,
    }));

    setLastCountedItems([updatedSelectedProduct, ...lastCountedItems]);
    setItemCount(1);
  };

  const handleLastCountedItemDeleteClick = (itemId: number) => {
    const updatedItems = lastCountedItems.filter((item) => item.id !== itemId);
    setLastCountedItems(updatedItems);
  };

  const handleChangeRowsPerPage = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    const numValue = parseInt(value);
    setRowsPerPage(numValue);
    // fetchCountBatches(page, numValue);
  };

  const handleChangePage = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    newPage: number
  ) => {
    //To adapt 0-based page of MUI pagination component 1 is added whilst 1 is subtracted for page prop
    if (newPage + 1 < 0) return;
    setPage(newPage + 1);
    fetchBatchesProducts(
      parseInt(batchId),
      tabsValue,
      newPage + 1,
      rowsPerPage
    );
  };

  return {
    tabsValue,
    handleTabsChange,
    loading,
    itemCount,
    setItemCount,
    handleCountClick,
    lastCountedItems,
    handleLastCountedItemDeleteClick,
    batch,
    batchProducts,
    fetchBatchesProducts,
    page,
    handleChangePage,
    rowsPerPage,
    handleChangeRowsPerPage,
    selectedProduct,
    handleSelectedProduct,
  };
};
