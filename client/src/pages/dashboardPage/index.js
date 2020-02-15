import React, { Fragment, useEffect } from 'react';
import { Grid } from '@material-ui/core';

import styles from './styles';
import DashboardDateFilter from './components/dashboardDateFilter/DashboardDateFilter';
import useDashboardState from './hooks/useDashboardState';
import DashboardStats from './components/dashboardStats/DashboardStats';
import Chart from './components/chart/Chart';
import LastActivities from './components/lastActivities/LastActivities';
import TopSellingProducts from './components/topSellingProducts/TopSellingProducts';

const DashboardPage = () => {
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
    formattedActivitiesData,
    formatChartDate,
    fetchLastActivities,
    fetchRevenueData,
    saleStats,
    fetchSaleStats,
    revenue,
    displayOptions,
    setDisplayOptions
  } = useDashboardState();

  const classes = styles();

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
          handleStartDateChange={handleStartDateChange}
          endDate={endDate}
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
            revenueData={formatChartDate()}
            setDisplayOptions={setDisplayOptions}
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
          <LastActivities lastActivities={formattedActivitiesData()} />
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default DashboardPage;
