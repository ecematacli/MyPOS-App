import React, { Fragment, useEffect } from 'react';
import { Grid } from '@material-ui/core';

import styles from './styles';
import DashboardDateFilter from './components/dashboardDateFilter/DashboardDateFilter';
import useDashboardState from './hooks/useDashboardState';
import { formatDate } from '../../common/utils';
import DashboardStats from './components/dashboardStats/DashboardStats';
import Chart from './components/chart/Chart';
import LastActivities from './components/lastActivities/LastActivities';
import TopSellingProducts from './components/topSellingProducts/TopSellingProducts';

const DashboardPage = () => {
  const {
    startDate,
    handleStartDateChange,
    endDate,
    handleEndDateChange,
    fetchTopSellingProducts,
    topSellingProducts,
    lastActivities,
    fetchLastActivities,
    fetchRevenueStatsData,
    pageNumber,
    setPageNumber,
    revenue,
    displayOptions,
    setDisplayOptions
  } = useDashboardState();

  const classes = styles();

  // console.log(getEachDay(startDate, endDate));

  useEffect(() => {
    fetchTopSellingProducts();
    fetchLastActivities();
    fetchRevenueStatsData();
  }, []);

  console.log(displayOptions);

  const formattedActivitiesData = () =>
    lastActivities.map(action => ({
      ...action,
      created: formatDate(action.created, 'd MMMM y - p')
    }));

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
        />
      </Grid>
      <Grid
        className={classes.gridContainer}
        container
        justify="center"
        spacing={3}
      >
        <DashboardStats revenue={revenue} />
      </Grid>
      <Grid className={classes.gridContainer} container>
        <Grid item xs={12} sm={12} md={12}>
          <Chart setDisplayOptions={setDisplayOptions} />
        </Grid>
      </Grid>
      <Grid className={classes.gridContainer} container>
        <Grid item xs={12} sm={12} md={7}>
          <TopSellingProducts
            pageNumber={pageNumber}
            setPageNumber={setPageNumber}
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
