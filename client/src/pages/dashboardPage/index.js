import React, { Fragment, useEffect } from 'react';
import { Grid } from '@material-ui/core';

import styles from './styles';
import useDashboardState from './hooks/useDashboardState';
import DashboardStats from './components/dashboardStats/DashboardStats';
import Chart from './components/chart/Chart';
import LastActivities from './components/lastActivities/LastActivities';
import TopSellingProducts from './components/topSellingProducts/TopSellingProducts';

const DashboardPage = () => {
  const { fetchTopSellingProducts, products } = useDashboardState();

  useEffect(() => {
    fetchTopSellingProducts();
  }, []);
  const classes = styles();
  return (
    <Fragment>
      <Grid
        className={classes.statsGridContainer}
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
          <TopSellingProducts topSellingProducts={products} />
        </Grid>
        <Grid item xs={12} sm={12} md={5}>
          <LastActivities />
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default DashboardPage;
