import { useState } from 'react';

import api from '../../../api';

export default () => {
  const [startDate, handleStartDateChange] = useState(null);
  const [endDate, handleEndDateChange] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [topSellingProducts, setTopSellingProducts] = useState([]);
  const [lastActivities, setLastActivities] = useState([]);
  const [revenue, setRevenue] = useState(0);
  const [displayOptions, setDisplayOptions] = useState('daily');

  const fetchRevenueStatsData = async () => {
    let url = `/stats/revenue-chart`;

    if (startDate && endDate) {
      url += `?startDate=${startDate}&endDate=${endDate}&option=${displayOptions}`;
    }

    if (startDate) {
      url += `?startDate=${startDate}`;
    }

    if (endDate) {
      url += `?endDate=${endDate}`;
    }
    const response = await api.get(url);
    setRevenue(response.data);
  };

  const fetchTopSellingProducts = async () => {
    const response = await api.get(
      `/stats/top-selling-products?page=${pageNumber}&rowsPerPage=3`
    );
    setTopSellingProducts(response.data);
  };

  const fetchLastActivities = async () => {
    const response = await api.get('/events/sales');
    setLastActivities(response.data);
  };

  return {
    startDate,
    handleStartDateChange,
    endDate,
    handleEndDateChange,
    topSellingProducts,
    lastActivities,
    fetchTopSellingProducts,
    fetchLastActivities,
    fetchRevenueStatsData,
    displayOptions,
    setDisplayOptions,
    revenue,
    pageNumber,
    setPageNumber
  };
};
