import { useState } from 'react';

import api from '../../../api';
import useAsyncError from '../../../common/hooks/useAsyncError';
import {
  getInitialLastThirtyDays,
  getUnstatedDisplayOption,
  formatChartDate,
  formatActivitiesData
} from '../utils';

export default () => {
  const { start, end } = getInitialLastThirtyDays();
  const throwError = useAsyncError();

  const initialValue = {
    startDate: start,
    endDate: end
  };

  const [loading, setLoading] = useState(false);
  const [startDate, handleStartDateChange] = useState(null);
  const [endDate, handleEndDateChange] = useState(null);
  const [topSellingProducts, setTopSellingProducts] = useState([]);
  const [lastActivities, setLastActivities] = useState([]);
  const [revenue, setRevenue] = useState([]);
  const [saleStats, setSaleStats] = useState([]);

  const [appliedFilters, setAppliedFilters] = useState(initialValue);

  // API Call helpers that are being used by all functions
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

  const makeApiCall = async (url, method = 'get') => {
    setLoading(true);
    try {
      const response = await api[method](url);
      setLoading(false);
      return response.data;
    } catch (e) {
      console.log(e);
      setLoading(false);
      throwError(new Error(e));
    }
  };

  // Dashboard Page API Calls
  const fetchRevenueData = async displayOption => {
    let option;

    if (!displayOption) {
      option = getUnstatedDisplayOption(startDate, endDate);
    } else {
      option = displayOption;
    }

    const url = getRequestParams(`/stats/revenue-chart?option=${option}`);
    const data = await makeApiCall(url);

    const formattedChartRevenue = formatChartDate(data, option);
    setRevenue(formattedChartRevenue);
  };

  const fetchSaleStats = async () => {
    const url = getRequestParams(`/stats/sale-stats`, true);

    const data = await makeApiCall(url);
    setSaleStats(data);
  };

  const fetchTopSellingProducts = async (pageNumber = 1) => {
    const url = getRequestParams(
      `/stats/top-selling-products?page=${pageNumber}&rowsPerPage=3`
    );

    const data = await makeApiCall(url);

    setTopSellingProducts(data);
  };

  const fetchLastActivities = async () => {
    const data = await makeApiCall('/events/sales');
    const formattedActivities = formatActivitiesData(data);
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
    loading,
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
