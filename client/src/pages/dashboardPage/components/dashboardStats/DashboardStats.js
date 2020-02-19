import React from 'react';
import clsx from 'clsx';
import { Typography, Tooltip, Grid, Paper } from '@material-ui/core';

import styles from './styles';
import { currencyFormatter } from '../../../../common/utils';
import { statsData } from './statsData';

const DashboardStats = ({ saleStats }) => {
  const classes = styles();

  return statsData(saleStats).map(({ label, id, Icon, value, currency }) => (
    <Grid key={id} item xs={12} sm={6} md={3}>
      <div className={classes.dashboardStatDiv}>
        <Paper className={classes.dashboardStatPaper}>
          <div className={clsx(classes.iconDiv, classes[`${id}IconContainer`])}>
            <Tooltip title={label}>
              <Icon className={classes.icon} />
            </Tooltip>
          </div>
          <div className={classes.dashboardStatContent}>
            <div>
              <Typography align="right" className={classes.statLabel}>
                {label}
              </Typography>
            </div>
            <Typography align="right" className={classes.statValue}>
              {currency ? currencyFormatter(value) : value}
            </Typography>
          </div>
        </Paper>
      </div>
    </Grid>
  ));
};

export default DashboardStats;
