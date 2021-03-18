import { useState, useContext } from 'react';

import api from '../../../api';
import {
  InitialDates,
  Loading,
  TopSellingData,
  LastActivitiesData,
  RevenueData,
  SaleStatsData,
} from '../types';
import {
  getInitialLastThirtyDays,
  getUnstatedDisplayOption,
  formatChartDate,
  formatActivitiesData,
} from '../utils';
import { AuthTokenSettingContext } from '../../../contexts/AuthContext';
export default () => {
  const { clearAuthToken } = useContext(AuthTokenSettingContext);
  const { initialStart, initialEnd }: InitialDates = getInitialLastThirtyDays();

  const initialValues = {
    startDate: initialStart,
    endDate: initialEnd,
  };

  const [loading, setLoading] = useState<Loading>({});
  const [startDate, handleStartDateChange] = useState<Date | null>(initialStart);
  const [endDate, handleEndDateChange] = useState<Date | null>(initialEnd);
  const [topSellingProducts, setTopSellingProducts] = useState<TopSellingData>({
    count: 0,
    products: [],
  });
  const [lastActivities, setLastActivities] = useState<LastActivitiesData>([]);
  const [revenue, setRevenue] = useState<RevenueData>([]);
  const [saleStats, setSaleStats] = useState<SaleStatsData>({
    webRevenue: 0,
    storeRevenue: 0,
    saleCount: 0,
    soldProductCount: 0,
  });

  const [appliedFilters, setAppliedFilters] = useState(initialValues);

  // API Call helpers being used by all functions
  const getRequestParams = (
    baseUrl: string,
    startDate: Date,
    endDate: Date,
    firstParam: boolean = false
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

  const makeApiCall = async (
    url: string,
    name: string = '',
    method: string = 'get'
  ) => {
    try {
      setLoading(loading => ({ ...loading, [name]: true }));
      const response = await api[method](url);
      setLoading(loading => ({ ...loading, [name]: false }));
      return response.data;
    } catch (e) {
      console.log(e);
      setLoading(loading => ({ ...loading, [name]: false }));
      if (e.response?.status === 401) {
        clearAuthToken();
      }
    }
  };

  // Dashboard Page API Caller functions
  const fetchRevenueData = async (
    displayOption: string,
    start: Date,
    end: Date
  ) => {
    let option: string;

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
    const data: RevenueData = await makeApiCall(url);

    const formattedChartRevenue: RevenueData = formatChartDate(data, option);

    setRevenue(formattedChartRevenue);
  };

  const fetchSaleStats = async (start: Date, end: Date) => {
    const url = getRequestParams(`/stats/sale-stats`, start, end, true);

    const data: SaleStatsData = await makeApiCall(url);
    setSaleStats(data);
  };

  const fetchTopSellingProducts = async (
    pageNumber: number = 1,
    start: Date,
    end: Date
  ) => {
    const url = getRequestParams(
      `/stats/top-selling-products?page=${pageNumber}&rowsPerPage=3`,
      start,
      end
    );

    const data: TopSellingData = await makeApiCall(url, 'topSellings');

    setTopSellingProducts(data);
  };

  const fetchLastActivities = async () => {
    const data: LastActivitiesData = await makeApiCall(
      '/events/sales',
      'activities'
    );
    const formattedActivities: LastActivitiesData = formatActivitiesData(data);
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
    revenue,
  };
};
