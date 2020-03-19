import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { Paper, Typography, Divider } from '@material-ui/core';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

import styles from './styles';
import { LastActivitiesData } from '../../types';
import Loading from '../../../../common/components/loading';

interface Props {
  loading: boolean;
  lastActivities: LastActivitiesData;
}

const LastActivities: React.FC<Props> = ({ loading, lastActivities }) => {
  const classes = styles();

  const renderLastActivities = () => {
    if (loading) {
      return <Loading />;
    }

    if (!lastActivities) {
      return (
        <Typography className={classes.noDisplayMsg}>
          No activities to display
        </Typography>
      );
    }

    return lastActivities.map(({ event, created }, i) => (
      <div className={classes.activitiesContentDiv} key={i}>
        <div className={classes.eventContentDiv}>
          <div className={classes.eventContent}>
            <ArrowRightIcon className={classes.arrowIcon} />
          </div>
          <div className={classes.eventContent}>
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
      <Scrollbars
        renderTrackHorizontal={props => (
          <div {...props} style={{ display: 'none' }} />
        )}
        renderThumbHorizontal={props => (
          <div {...props} style={{ display: 'none' }} />
        )}
        style={{ width: 'auto', height: 498 }}
      >
        <div className={classes.lastActivitiesContainer}>
          {renderLastActivities()}
        </div>
      </Scrollbars>
    </Paper>
  );
};

export default LastActivities;
