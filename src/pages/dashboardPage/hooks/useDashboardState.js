import { useState } from 'react';

import api from '../../../api';
import {
  getInitialLastThirtyDays,
  formatChartDate,
  formatActivitiesData
} from '../utils';

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

  const fetchRevenueData = async (displayOption = 'daily') => {
    const url = getRequestParams(
      `/stats/revenue-chart?option=${displayOption}`
    );

    const response = await api.get(url);

    const formattedChartRevenue = formatChartDate(response.data, displayOption);
    setRevenue(formattedChartRevenue);
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
    const formattedActivities = formatActivitiesData(response.data);
    setLastActivities(formattedActivities);
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
    revenue
  };
};
