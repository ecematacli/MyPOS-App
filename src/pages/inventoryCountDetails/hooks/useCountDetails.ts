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

  const [itemCount, setItemCount] = useState<number>(1);
  const [selectedProduct, setSelectedProduct] = useState<BatchProduct>(null);
  const [countCompletedProducts, setCountCompletedProducts] = useState<{
    [id: string]: BatchProduct;
  }>({});

  const [lastCountedItems, setLastCountedItems] = useLocalStorageState<
    BatchProduct[]
  >(`lastCountedItem-batch${batchId}`, []);

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
    const matchedProduct = batchProducts.products.find(
      (item) => item.id === selectedProduct.id
    );

    const [updatedProduct] = await postProductCount(
      '/inventory-count/count-product',
      {
        id: matchedProduct.id,
        count: (matchedProduct.counted && matchedProduct.counted) + itemCount,
      }
    );

    if (!updatedProduct) {
      return addNotification('Something went wrong!', 'error');
    }

    const replacedProducts = batchProducts.products.map((product) =>
      product.id === selectedProduct.id ? updatedProduct : product
    );

    setSelectedProduct(updatedProduct);

    setBatchProducts((batchProducts) => ({
      ...batchProducts,
      products: replacedProducts,
    }));

    setLastCountedItems([
      {
        ...selectedProduct,
        counted: itemCount,
      },
      ...lastCountedItems,
    ]);

    setItemCount(1);
  };

  const handleLastCountedItemDeleteClick = async (
    itemId: number,
    itemIdx: number
  ) => {
    const deletedItem = lastCountedItems.find(
      (item, i) => item.id + i === itemId + itemIdx
    );

    const matchedProduct = batchProducts.products.find(
      (item) => item.id === deletedItem.id
    );

    const [updatedProduct] = await postProductCount(
      '/inventory-count/count-product',
      {
        id: itemId,
        count: matchedProduct.counted - deletedItem.counted,
      }
    );

    if (!updatedProduct) {
      return addNotification('Something went wrong!', 'error');
    }

    const replacedProducts = batchProducts.products.map((product) =>
      product.id === deletedItem.id ? updatedProduct : product
    );

    setBatchProducts((batchProducts) => ({
      ...batchProducts,
      products: replacedProducts,
    }));

    const filtered = lastCountedItems.filter(
      (item, i) => item.id + i !== itemId + itemIdx
    );

    setLastCountedItems(filtered);
  };

  // Input handlers on pagination
  const handleChangeRowsPerPage = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    const numValue = parseInt(value);
    setRowsPerPage(numValue);

    fetchBatchesProducts(parseInt(batchId), tabsValue, page, numValue);
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
    setSelectedProduct,
    countCompletedProducts,
    handleSelectedProduct,
  };
};
