import React, { Fragment } from 'react';
import {
  Typography,
  Divider,
  Button,
  FormControl,
  OutlinedInput
} from '@material-ui/core';

import styles from './styles';

const Total = ({ totalToPay, taxTotalToPay }) => {
  const classes = styles();

  return (
    <Fragment>
      <div className={classes.totalSection}>
        <Typography>Sub-Total</Typography>
        <Typography>1000</Typography>
      </div>
      <div className={classes.totalSection}>
        <Typography>Tax</Typography>
        <Typography>15%</Typography>
      </div>
      <div className={classes.totalSection}>
        <Typography>Discount</Typography>
        <FormControl>
          <OutlinedInput
            className={classes.discountInput}
            id="outlined-adornment-weight"
            aria-describedby="outlined-weight-helper-text"
            classes={classes.inputRoot}
            color="secondary"
          />
        </FormControl>
      </div>
      <Divider className={classes.totalDivider} />
      <div className={classes.totalSection}>
        <Typography>Total</Typography>
        <Typography>3000 TL</Typography>
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
