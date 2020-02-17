import { useState } from 'react';

import api from '../../../api';
import { getInitialLastThirtyDays } from '../utils';

export default () => {
  const { start, end } = getInitialLastThirtyDays();

  const initialValue = {
    startDate: start,
    endDate: end
  };

  const [startDate, handleStartDateChange] = useState(null);
  const [endDate, handleEndDateChange] = useState(null);
  const [topSellingProducts, setTopSellingProducts] = useState([]);
  const [lastActivities, setLastActivities] = useState([]);
  const [revenue, setRevenue] = useState([]);
  const [saleStats, setSaleStats] = useState([]);
  const [displayOption, setDisplayOption] = useState('daily');
  const [appliedFilters, setAppliedFilters] = useState(initialValue);

  const getRequestParams = (baseUrl, firstParam = false) => {
    const filters = { startDate: startDate, endDate: endDate };

    const params = Object.keys(filters)
      .reduce((arr, key) => {
        if (filters[key]) {
          arr.push(`${key}=${filters[key].toISOString()}`);
        }
        return arr;
      }, [])
      .join('&');

    if (!params.length) return baseUrl;

    if (firstParam) {
      return baseUrl + '?' + params;
    } else {
      return baseUrl + '&' + params;
    }
  };

  const fetchRevenueData = async () => {
    const url = getRequestParams(
      `/stats/revenue-chart?option=${displayOption}`
    );
    const response = await api.get(url);
    setRevenue(response.data);
  };

  const fetchSaleStats = async () => {
    const url = getRequestParams(`/stats/sale-stats`, true);

    const response = await api.get(url);
    setSaleStats(response.data);
  };

  const fetchTopSellingProducts = async (pageNumber = 1) => {
    const url = getRequestParams(
      `/stats/top-selling-products?page=${pageNumber}&rowsPerPage=3`
    );

    const response = await api.get(url);
    setTopSellingProducts(response.data);
  };

  const fetchLastActivities = async () => {
    const response = await api.get('/events/sales');
    setLastActivities(response.data);
  };

  // Date Picker filter click event handlers
  const onDateSelection = () => {
    setAppliedFilters({ startDate, endDate });
    fetchRevenueData();
    fetchSaleStats();
    fetchTopSellingProducts();
  };

  const onDateFilterClearing = () => {
    handleStartDateChange(null);
    handleEndDateChange(null);
    setAppliedFilters(initialValue);
  };

  return {
    startDate,
    handleStartDateChange,
    endDate,
    handleEndDateChange,
    onDateSelection,
    appliedFilters,
    onDateFilterClearing,
    topSellingProducts,
    fetchTopSellingProducts,
    lastActivities,
    fetchLastActivities,
    fetchRevenueData,
    saleStats,
    fetchSaleStats,
    displayOption,
    setDisplayOption,
    revenue
  };
};
