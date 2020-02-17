import React, { Fragment, useEffect } from 'react';
import { Grid } from '@material-ui/core';

import styles from './styles';
import {
  getDisabledOptions,
  formattedActivitiesData,
  formatChartDate
} from './utils';
import DashboardDateFilter from './components/dashboardDateFilter/DashboardDateFilter';
import useDashboardState from './hooks/useDashboardState';
import DashboardStats from './components/dashboardStats/DashboardStats';
import Chart from './components/chart/Chart';
import LastActivities from './components/lastActivities/LastActivities';
import TopSellingProducts from './components/topSellingProducts/TopSellingProducts';

const DashboardPage = () => {
  const classes = styles();
  const {
    startDate,
    handleStartDateChange,
    endDate,
    onDateSelection,
    onDateFilterClearing,
    handleEndDateChange,
    appliedFilters,
    fetchTopSellingProducts,
    topSellingProducts,
    lastActivities,
    fetchLastActivities,
    fetchRevenueData,
    saleStats,
    fetchSaleStats,
    revenue,
    displayOption,
    setDisplayOption
  } = useDashboardState();
  const activities = formattedActivitiesData(lastActivities);
  const chartRevenue = formatChartDate(revenue);

  console.log('DISPLAY OPTION', displayOption);
  useEffect(() => {
    fetchRevenueData();
    fetchSaleStats();
    fetchTopSellingProducts();
    fetchLastActivities();
  }, []);

  return (
    <Fragment>
      <Grid
        className={classes.dateGridContainer}
        container
        justify="flex-end"
        spacing={3}
      >
        <DashboardDateFilter
          startDate={startDate}
          endDate={endDate}
          handleStartDateChange={handleStartDateChange}
          handleEndDateChange={handleEndDateChange}
          onDateSelection={onDateSelection}
          onDateFilterClearing={onDateFilterClearing}
          appliedFilters={appliedFilters}
        />
      </Grid>
      <Grid
        className={classes.gridContainer}
        container
        justify="center"
        spacing={3}
      >
        <DashboardStats saleStats={saleStats} revenue={revenue} />
      </Grid>
      <Grid className={classes.gridContainer} container>
        <Grid item xs={12} sm={12} md={12}>
          <Chart
            revenueData={chartRevenue}
            displayOption={displayOption}
            setDisplayOption={setDisplayOption}
            appliedFilters={appliedFilters}
          />
        </Grid>
      </Grid>
      <Grid className={classes.gridContainer} container>
        <Grid item xs={12} sm={12} md={7}>
          <TopSellingProducts
            topSellingProducts={topSellingProducts}
            fetchTopSellingProducts={fetchTopSellingProducts}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={5}>
          <LastActivities lastActivities={activities} />
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default DashboardPage;
