import { useState } from 'react';

import api from '../../../api';

export default ({ startDate, endDate, displayType }) => {
  const fetchStatsData = async () => {
    const response = await api.get(
      ` /stats/revenue-chart?startDate=${startDate}&endDate=${endDate}&option=${displayType}`
    );
    setTopSellingProducts(response.data);
  };

  return {
    topSellingProducts,
    fetchStatsData,
    pageNumber,
    setPageNumber
  };
};
