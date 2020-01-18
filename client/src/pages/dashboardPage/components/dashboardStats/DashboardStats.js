import React from 'react';
import clsx from 'clsx';
import { Typography, Tooltip, Grid, Paper } from '@material-ui/core';

import styles from './styles';
import { STAT_PROPS } from './statProps';

const DashboardStats = () => {
  const classes = styles();
  return STAT_PROPS.map(({ label, id, currency, Icon }) => {
    return (
      <Grid key={id} item xs={12} sm={6} md={3}>
        <div className={classes.dashboardStatDiv}>
          <Paper className={classes.dashboardStatPaper}>
            <div
              className={clsx(classes.iconDiv, classes[`${id}IconContainer`])}
            >
              <Tooltip title={label}>
                <Icon className={classes.icon} />
              </Tooltip>
            </div>
            <div className={classes.dashboardStatContent}>
              <Typography align="right" className={classes.statLabel}>
                {label}
              </Typography>
              <Typography align="right" className={classes.statInfo}>
                777.66
              </Typography>
            </div>
          </Paper>
        </div>
      </Grid>
    );
  });
};

export default DashboardStats;
