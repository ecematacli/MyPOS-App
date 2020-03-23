import React, { Fragment } from 'react';
import clsx from 'clsx';
import { Typography, Tooltip, Grid, Paper } from '@material-ui/core';

import styles from './styles';
import { currencyFormatter } from '../../../../common/utils';
import { statsData } from './statsData';
import { SaleStatsData } from '../../types';

const DashboardStats: React.FC<{ saleStats: SaleStatsData }> = ({
  saleStats
}) => {
  const classes = styles();
  return (
    <Fragment>
      {statsData(saleStats).map(({ label, id, Icon, value, currency }) => (
        <Grid key={id} item xs={12} sm={12} md={3}>
          <div className={classes.dashboardStatDiv}>
            <Paper className={classes.dashboardStatPaper}>
              <div
                className={clsx(classes.iconDiv, classes[`${id}IconContainer`])}
              >
                <Tooltip title={label}>
                  <Icon />
                </Tooltip>
              </div>
              <div className={classes.dashboardStatContent}>
                <Typography align="right" className={classes.statLabel}>
                  {label}
                </Typography>
                <Typography align="right" className={classes.statValue}>
                  {currency ? currencyFormatter(value) : value}
                </Typography>
              </div>
            </Paper>
          </div>
        </Grid>
      ))}
    </Fragment>
  );
};

export default DashboardStats;
