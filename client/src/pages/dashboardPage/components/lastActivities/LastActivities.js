import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { Paper, Typography, Divider } from '@material-ui/core';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

import styles from './styles';

const LastActivities = ({ lastActivities }) => {
  const classes = styles();

  const renderLastActivities = () => {
    if (!lastActivities) {
      return <Typography>No action to display</Typography>;
    }
    return lastActivities.map(({ event, created }, i) => (
      <div className={classes.activitiesContentDiv} key={i}>
        <div className={classes.eventContent}>
          <div className={classes.iconDiv}>
            <ArrowRightIcon className={classes.arrowIcon} />
          </div>
          <div className={classes.eventDiv}>
            <Typography className={classes.eventText}>{event}</Typography>
          </div>
        </div>
        <div className={classes.createdContent}>
          <Typography className={classes.createdText}>{created}</Typography>
        </div>
      </div>
    ));
  };

  return (
    <Paper className={classes.lastActivitiesPaper}>
      <div className={classes.title}>
        <Typography>Last Activities</Typography>
      </div>
      <Divider className={classes.divider} />
      <Scrollbars style={{ width: 'auto', height: 485 }}>
        <div className={classes.lastActivitiesContainer}>
          {renderLastActivities()}
        </div>
      </Scrollbars>
    </Paper>
  );
};

export default LastActivities;
