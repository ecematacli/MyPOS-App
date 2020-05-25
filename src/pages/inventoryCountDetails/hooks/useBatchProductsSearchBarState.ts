import { useState, useEffect } from 'react';

import api from '../../../api';
import { BatchProduct } from '../types';
import useCountDetails from './useCountDetails';

export const useBatchProductsSearchBarState = (batchId: string) => {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [searchResults, setSearchResults] = useState<BatchProduct[]>([]);
  const [productSearchLoading, setProductSearchLoading] = useState(false);
  const [productNotFound, setProductNotFound] = useState(false);

  const [userQueryVal, setUserQueryVal] = useState('');

  const { handleCountClick, handleSelectedProduct } = useCountDetails(
    setQuery,
    batchId
  );

  const handleQueryChange = (productName: string) => {
    setQuery(productName);
  };

  const onProductSelect = (product: BatchProduct) => {
    handleSelectedProduct(product);
    handleCountClick();
    setQuery('');
    setOpen(false);
    setSearchResults([]);
  };

  useEffect(() => {
    let active = true;
    const fetchBatchProducts = async () => {
      try {
        setProductSearchLoading(true);
        const response = await api.get(
          `inventory-count/${batchId}/search-products?query=${query}`
        );
        setSearchResults(response.data);
        setProductNotFound(response.data.length === 0);
        setProductSearchLoading(false);
        setOpen(true);
      } catch (e) {
        console.log('Error from batch products search bar hook', e);
        setProductSearchLoading(false);
      }
    };

    active && query && fetchBatchProducts();
    if (!query) {
      setProductNotFound(false);
    }

    return () => {
      active = false;
    };
  }, [query]);

  return {
    open,
    setOpen,
    searchResults,
    setSearchResults,
    productSearchLoading,
    setProductSearchLoading,
    query,
    setQuery,
    handleQueryChange,
    onProductSelect,
    productNotFound,
  };
};
