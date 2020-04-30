import { useState, useEffect } from 'react';

import api from '../../../api';
import useAsyncError from '../../../common/hooks/useAsyncError';

export const useBatchProductsSearchBarState = () => {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  // const [searchResults, setSearchResults] = useState<Product[] | []>([]);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [productNotFound, setProductNotFound] = useState(false);

  const throwError = useAsyncError();

  const handleQueryChange = (productName: string) => {
    console.log('PRODUCT NAME::::::::', productName);
    setQuery(productName);
  };

  console.log('hook query>>', query);

  const onProductSelect = (product) => {
    // addProduct(product);
    setQuery('');
    setOpen(false);
    setSearchResults([]);
  };

  useEffect(() => {
    let active = true;
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/products/search/?q=${query}`);
        setSearchResults(response.data);
        setProductNotFound(response.data.length === 0);
        setLoading(false);
        setOpen(true);
      } catch (e) {
        setLoading(false);
        throwError(new Error(e));
      }
    };

    active && query && fetchProducts();
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
    loading,
    setLoading,
    query,
    setQuery,
    handleQueryChange,
    onProductSelect,
    productNotFound,
  };
};
