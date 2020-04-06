import { useState, useEffect } from 'react';

import api from '../../../../api';
import { Product } from '../../../../redux/products/types';
import useAsyncError from '../../../../common/hooks/useAsyncError';

type AddProduct = (product: Product) => void;

const useSearchInput = (addProduct: AddProduct) => {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [searchResults, setSearchResults] = useState<Product[] | []>([]);
  const [loading, setLoading] = useState(false);
  const [productNotFound, setProductNotFound] = useState(false);

  const throwError = useAsyncError();

  const onProductSelect = (product: Product) => {
    addProduct(product);
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
    onProductSelect,
    productNotFound,
  };
};

export default useSearchInput;
