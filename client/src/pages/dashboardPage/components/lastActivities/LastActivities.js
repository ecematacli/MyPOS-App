import React from 'react';
import { Paper, Typography, Divider } from '@material-ui/core';

import styles from './styles';

const LastActivities = () => {
  const classes = styles();
  return (
    <Paper className={classes.lastActivitiesPaper}>
      <div className={classes.title}>
        <Typography>Last Activities</Typography>
      </div>
      <Divider />
      <div>Last Activities are: </div>
      <div>1- Some jskd</div>
      <div>2- ahjkfd</div>
      <div>2</div>
      <div>2</div>
    </Paper>
  );
};

export default LastActivities;
