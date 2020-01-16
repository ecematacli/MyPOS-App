import React from 'react';
import { Grid } from '@material-ui/core';

import styles from './styles';
import DashboardStats from './components/dashboardStats/DashboardStats';

const DashboardPage = () => {
  const classes = styles();
  return (
    <Grid container justify="center" spacing={3}>
      <DashboardStats />
    </Grid>
  );
};

export default DashboardPage;
