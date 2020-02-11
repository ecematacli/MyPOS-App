import React from 'react';
import {
  Paper,
  Typography,
  Divider,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell
} from '@material-ui/core';

import styles from './styles';

const LastActivities = ({ lastActivities }) => {
  const classes = styles();

  const renderLastActivities = () => {
    if (!lastActivities) {
      return <TableRow />;
    }
    return lastActivities
      .filter((p, i) => i < 3)
      .map(({ event, created }, i) => (
        <TableRow className={classes.tableBodyRow} key={i}>
          <TableCell>{created}</TableCell>
          <TableCell>{event}</TableCell>
        </TableRow>
      ));
  };

  return (
    <Paper className={classes.lastActivitiesPaper}>
      <div className={classes.title}>
        <Typography>Last Activities</Typography>
      </div>
      <Divider className={classes.divider} />
      <div className={classes.topSellingContent}>
        <Table>
          <TableHead>
            <TableRow className={classes.tableHeadRow}>
              {['Date', 'Action'].map(head => (
                <TableCell key={head}>{head}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>{renderLastActivities()}</TableBody>
        </Table>
      </div>
    </Paper>
  );
};

export default LastActivities;
