import { useState } from 'react';

import api from '../../../api';

export default () => {
  const [products, setProducts] = useState();

  console.log(products);
  const fetchTopSellingProducts = async () => {
    const response = await api.get('/stats/top-selling-products');
    setProducts(response.data);
  };

  return {
    products,
    setProducts,
    fetchTopSellingProducts
  };
};
