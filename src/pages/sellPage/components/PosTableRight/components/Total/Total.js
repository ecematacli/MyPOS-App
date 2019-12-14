import React, { Fragment } from 'react';
import { Typography, Divider, Button } from '@material-ui/core';

import styles from './styles';

const Total = () => {
  const classes = styles();
  return (
    <Fragment>
      <div className={classes.totalSection}>
        <Typography>Sub-Total</Typography>
        <Typography>900</Typography>
      </div>
      <div className={classes.totalSection}>
        <Typography>Tax</Typography>
        <Typography>15%</Typography>
      </div>
      <div className={classes.totalSection}>
        <Typography>Discount</Typography>
        <Typography>50 TL</Typography>
      </div>
      <Divider className={classes.totalDivider} />
      <div className={classes.totalSection}>
        <Typography>Total</Typography>
        <Typography>2000 TL</Typography>
      </div>
      <div className={classes.paymentBtnContainer}>
        <Button className={classes.paymentButton} fullWidth variant="contained">
          <div className={classes.paymentBtnTextHolder}>
            <Typography className={classes.paymentBtnTxt}>
              Complete Payment
            </Typography>
            <Typography className={classes.paymentBtnTxt}> 2000 TL</Typography>
          </div>
        </Button>
      </div>
    </Fragment>
  );
};

export default Total;
