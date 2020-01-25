import { useState, useEffect } from 'react';
import api from '../../../../../api/api';

const useSearchInput = addProduct => {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [productNotFound, setProductNotFound] = useState(false);

  const onProductSelect = product => {
    addProduct(product);
    setQuery('');
    setOpen(false);
    setSearchResults([]);
  };
  useEffect(() => {
    let active = true;
    const fetchProducts = async () => {
      setLoading(true);
      const response = await api.get(`/products?q=${query}`);
      setSearchResults(response.data);
      setProductNotFound(response.data.length === 0);
      setLoading(false);
      setOpen(true);
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
    productNotFound
  };
};

export default useSearchInput;
