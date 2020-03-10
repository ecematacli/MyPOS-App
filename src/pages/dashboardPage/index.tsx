import React, { Fragment, useEffect } from 'react';
import { Grid } from '@material-ui/core';

import styles from './styles';
import { getInitialLastThirtyDays } from './utils';
import DashboardDateFilter from './components/dashboardDateFilter/DashboardDateFilter';
import useDashboardState from './hooks/useDashboardState';
import DashboardStats from './components/dashboardStats/DashboardStats';
import Chart from './components/chart/Chart';
import LastActivities from './components/lastActivities/LastActivities';
import TopSellingItems from './components/topSellingItems/TopSellingItems';

const DashboardPage: React.FC = () => {
  const classes = styles();
  const { initialStart, initialEnd } = getInitialLastThirtyDays();
  const {
    loading: { topSellings, activities },
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
    revenue
  } = useDashboardState();

  useEffect(() => {
    fetchRevenueData('daily', initialStart, initialEnd);
    fetchSaleStats(initialStart, initialEnd);
    fetchTopSellingProducts(1, initialStart, initialEnd);
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
        <DashboardStats saleStats={saleStats} />
      </Grid>
      <Grid className={classes.gridContainer} container>
        <Grid item xs={12} sm={12} md={12}>
          <Chart
            revenueData={revenue}
            fetchRevenueData={fetchRevenueData}
            appliedFilters={appliedFilters}
          />
        </Grid>
      </Grid>
      <Grid className={classes.gridContainer} container>
        <Grid item xs={12} sm={12} md={7}>
          <TopSellingItems
            loading={topSellings && topSellings}
            topSellingProducts={topSellingProducts}
            fetchTopSellingProducts={fetchTopSellingProducts}
            startDate={startDate}
            endDate={endDate}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={5}>
          <LastActivities
            lastActivities={lastActivities}
            loading={activities && activities}
          />
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default DashboardPage;
