import { useState, useEffect } from 'react';
import api from '../../../../../api/api';

const useSearchInput = addProduct => {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

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
      setLoading(false);
      setOpen(true);
    };
    active && query && fetchProducts();
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
    onProductSelect
  };
};

export default useSearchInput;
