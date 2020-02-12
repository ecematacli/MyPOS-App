import React, { Fragment, useEffect } from 'react';
import { format } from 'date-fns';
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
    fetchTopSellingProducts,
    topSellingProducts,
    lastActivities,
    fetchLastActivities
  } = useDashboardState();

  const classes = styles();

  useEffect(() => {
    fetchTopSellingProducts();
    fetchLastActivities();
  }, []);

  const formattedActivitiesData = () =>
    lastActivities.map(action => ({
      ...action,
      created: format(new Date(action.created), ' d MMMM y - p')
    }));

  return (
    <Fragment>
      <Grid
        className={classes.dateGridContainer}
        container
        justify="flex-end"
        spacing={3}
      >
        <DashboardDateFilter />
      </Grid>
      <Grid
        className={classes.gridContainer}
        container
        justify="center"
        spacing={3}
      >
        <DashboardStats />
      </Grid>
      <Grid className={classes.gridContainer} container>
        <Grid item xs={12} sm={12} md={12}>
          <Chart />
        </Grid>
      </Grid>
      <Grid className={classes.gridContainer} container>
        <Grid item xs={12} sm={12} md={7}>
          <TopSellingProducts topSellingProducts={topSellingProducts} />
        </Grid>
        <Grid item xs={12} sm={12} md={5}>
          <LastActivities lastActivities={formattedActivitiesData()} />
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default DashboardPage;
