import { useState, useEffect } from 'react';
import axios from 'axios';

const useSearchInput = addProduct => {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [active, setActive] = useState(true);

  const onProductSelect = product => {
    addProduct(product);
    setQuery('');
    setOpen(false);
    setSearchResults([]);
  };

  useEffect(() => {
    setActive(true);
    const fetchProducts = async () => {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:3091/products?q=${query}`
      );
      setSearchResults(response.data);
      setLoading(false);
      setOpen(true);
    };
    active && query && fetchProducts();
    return () => {
      setActive(false);
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
