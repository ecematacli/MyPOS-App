import { useState } from 'react';

import api from '../../../api';

export default () => {
  const [topSellingProducts, setTopSellingProducts] = useState();
  const [lastActivities, setLastActivities] = useState();

  const fetchTopSellingProducts = async () => {
    const response = await api.get('/stats/top-selling-products');
    setTopSellingProducts(response.data);
  };

  const fetchLastActivities = async () => {
    const response = await api.get('/events/sales');
    setLastActivities(response.data);
  };

  return {
    topSellingProducts,
    lastActivities,
    fetchTopSellingProducts,
    fetchLastActivities
  };
};
