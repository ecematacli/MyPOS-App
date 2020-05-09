import { useState, useEffect } from 'react';

import api from '../../../api';

export const useBatchProductsSearchBarState = () => {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  // const [searchResults, setSearchResults] = useState<Product[] | []>([]);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [productNotFound, setProductNotFound] = useState(false);

  const handleQueryChange = (productName: string) => {
    setQuery(productName);
  };

  const onProductSelect = (product) => {
    // addProduct(product);
    // setQuery('');
    setOpen(false);
    setSearchResults([]);
  };

  // useEffect(() => {
  //   let active = true;
  //   const fetchProducts = async () => {
  //     try {
  //       setLoading(true);
  //       const response = await api.get(
  //         `inventory-count/4/search-products?${query}`
  //       );
  //       setSearchResults(response.data);
  //       setProductNotFound(response.data.length === 0);
  //       setLoading(false);
  //       setOpen(true);
  //     } catch (e) {
  //       setLoading(false);
  //     }
  //   };

  //   active && query && fetchProducts();
  //   if (!query) {
  //     setProductNotFound(false);
  //   }

  //   return () => {
  //     active = false;
  //   };
  // }, [query]);

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
