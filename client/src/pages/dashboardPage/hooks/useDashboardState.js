import { useState } from 'react';

import api from '../../../api/api';

export default ({ addNotification }) => {
  const [products, setProducts] = useState();

  const fetchTopSellingProducts = async () => {
    console.log('called!');
    const response = await api.get('/stats/top-selling/products');
    setProducts(response.data);
  };

  return {
    products,
    setProducts,
    fetchTopSellingProducts
  };
};
