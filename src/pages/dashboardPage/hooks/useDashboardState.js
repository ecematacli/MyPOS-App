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
  const { initialStart, initialEnd } = getInitialLastThirtyDays();
  const throwError = useAsyncError();

  const initialValues = {
    startDate: initialStart,
    endDate: initialEnd
  };

  const [loading, setLoading] = useState({});
  const [startDate, handleStartDateChange] = useState(null);
  const [endDate, handleEndDateChange] = useState(null);
  const [topSellingProducts, setTopSellingProducts] = useState([]);
  const [lastActivities, setLastActivities] = useState([]);
  const [revenue, setRevenue] = useState([]);
  const [saleStats, setSaleStats] = useState([]);

  const [appliedFilters, setAppliedFilters] = useState(initialValues);

  // API Call helpers that are being used by all functions
  const getRequestParams = (
    baseUrl,
    startDate,
    endDate,
    firstParam = false
  ) => {
    const filters = { startDate, endDate };

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

  const makeApiCall = async (url, name = '', method = 'get') => {
    try {
      setLoading({ ...loading, [name]: true });
      const response = await api[method](url);
      setLoading({ ...loading, [name]: false });

      return response.data;
    } catch (e) {
      setLoading({ ...loading, [name]: false });
      throwError(new Error(e));
    }
  };

  // Dashboard Page API Calls
  const fetchRevenueData = async (displayOption, start, end) => {
    let option;

    if (!displayOption) {
      option = getUnstatedDisplayOption(start, end);
    } else {
      option = displayOption;
    }

    const url = getRequestParams(
      `/stats/revenue-chart?option=${option}`,
      start,
      end
    );
    const data = await makeApiCall(url);

    const formattedChartRevenue = formatChartDate(data, option);
    setRevenue(formattedChartRevenue);
  };

  const fetchSaleStats = async (start, end) => {
    const url = getRequestParams(`/stats/sale-stats`, start, end, true);

    const data = await makeApiCall(url);
    setSaleStats(data);
  };

  const fetchTopSellingProducts = async (pageNumber = 1, start, end) => {
    const url = getRequestParams(
      `/stats/top-selling-products?page=${pageNumber}&rowsPerPage=3`,
      start,
      end
    );

    const data = await makeApiCall(url, 'topSellings');

    setTopSellingProducts(data);
  };

  const fetchLastActivities = async () => {
    const data = await makeApiCall('/events/sales', 'activities');
    const formattedActivities = formatActivitiesData(data);
    setLastActivities(formattedActivities);
  };

  // Date Picker filter click event handlers
  const onDateSelection = () => {
    setAppliedFilters({ startDate, endDate });
    fetchRevenueData(null, startDate, endDate);
    fetchSaleStats(startDate, endDate);
    fetchTopSellingProducts(1, startDate, endDate);
  };

  const onDateFilterClearing = () => {
    handleStartDateChange(initialStart);
    handleEndDateChange(initialEnd);
    setAppliedFilters(initialValues);
    fetchRevenueData('daily', initialStart, initialEnd);
    fetchSaleStats(initialStart, initialEnd);
    fetchTopSellingProducts(1, initialStart, initialEnd);
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
