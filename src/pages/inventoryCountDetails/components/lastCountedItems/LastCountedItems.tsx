import React, { Fragment } from 'react';
import { Typography, Divider } from '@material-ui/core';

import styles from './styles';
import inventoryImage from '../../../../assets/img/stocktake-emptylist-v1.png';

const Counting = () => {
  const classes = styles();
  return (
    <div className={classes.lastCountedContainer}>
      <div className={classes.titleDiv}>
        <Typography className={classes.title}>Last Counted Items</Typography>
      </div>
      <Divider className={classes.divider} />
      <div className={classes.imageDiv}>
        <img src={inventoryImage} />
      </div>
    </div>
  );
};

export default Counting;
