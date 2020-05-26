import { useState } from 'react';

import api from '../../../api';
import { BatchProduct } from '../types';

export const useBatchProductsSearchBarState = (batchId: string) => {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [searchResults, setSearchResults] = useState<BatchProduct[]>([]);
  const [productSearchLoading, setProductSearchLoading] = useState(false);
  const [productNotFound, setProductNotFound] = useState(false);

  const handleQueryChange = (userQuery: string) => {
    setQuery(userQuery);

    const fetchBatchProducts = async () => {
      try {
        setProductSearchLoading(true);
        const response = await api.get(
          `inventory-count/${batchId}/search-products?query=${userQuery}`
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

    const whiteSpaceBeforeQuery = userQuery.match(/^\s+/);

    userQuery && !whiteSpaceBeforeQuery && fetchBatchProducts();
  };

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
    productNotFound,
  };
};
