import React, { Fragment } from 'react';
import { Grid } from '@material-ui/core';

import styles from './styles';
import DashboardStats from './components/dashboardStats/DashboardStats';
import Chart from './components/chart/Chart';

const DashboardPage = () => {
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
      <Grid className={classes.chartGridContainer} container>
        <Grid item xs={12} sm={12} md={12}>
          <Chart />
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12} sm={12} md={6}></Grid>
      </Grid>
    </Fragment>
  );
};

export default DashboardPage;
