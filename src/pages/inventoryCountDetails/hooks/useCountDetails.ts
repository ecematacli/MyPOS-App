import { useState } from 'react';

import api from '../../../api';
import { BatchesProductsData, BatchProduct, BatchData } from '../types';
import useLocalStorageState from '../../../common/hooks/useLocalStorageState';

type SetQuery = React.Dispatch<React.SetStateAction<string>>;

export default (setQuery: SetQuery) => {
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [countBatch, setCountBatch] = useState<BatchData>(null);
  const [batchProducts, setBatchProducts] = useState<BatchesProductsData>({
    counted: 0,
    uncounted: 0,
    products: [],
  });

  const [itemCount, setItemCount] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState<BatchProduct>(null);
  const [lastCountedItems, setLastCountedItems] = useLocalStorageState<
    BatchProduct[]
  >('lastCountedItems', []);

  const handleSelectedProduct = (product: BatchProduct) => {
    setSelectedProduct(product);
    setQuery(product.name);
  };

  const postProductCount = async (id: number, count: number) => {
    const response = await api.post('/inventory-count/count-product', {
      id,
      count,
    });

    const data: BatchProduct = response.data;
    return data;
  };

  const handleCountClick = async () => {
    const updatedSelectedProduct = {
      ...selectedProduct,
      counted: itemCount,
    };
    setSelectedProduct(updatedSelectedProduct);

    const updatedProduct = await postProductCount(
      updatedSelectedProduct.id,
      updatedSelectedProduct.counted
    );

    const matchedPr = batchProducts.products.filter(
      (p) => p.id === selectedProduct.id
    );

    if (matchedPr) {
      const replacedProducts = batchProducts.products.map((product) =>
        product.id === selectedProduct.id ? updatedProduct : product
      );
      setBatchProducts((batchProducts) => ({
        ...batchProducts,
        products: replacedProducts,
      }));
    } else {
      setBatchProducts((batchProducts) => ({
        ...batchProducts,
        products: [...batchProducts.products, updatedProduct],
      }));
    }

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
    } catch (e) {}
  };

  const fetchCountBatch = async (id: number) => {
    try {
      setLoading(true);
      const response = await api.get(`/inventory-count/${id}`);
      const data: BatchData = response.data;
      setCountBatch(data);
      setLoading(false);
    } catch (e) {}
  };

  return {
    loading,
    itemCount,
    setItemCount,
    handleCountClick,
    lastCountedItems,
    handleLastCountedItemDeleteClick,
    countBatch,
    batchProducts,
    fetchCountBatch,
    fetchBatchesProducts,
    page,
    handleChangePage,
    rowsPerPage,
    handleChangeRowsPerPage,
    selectedProduct,
    handleSelectedProduct,
  };
};
