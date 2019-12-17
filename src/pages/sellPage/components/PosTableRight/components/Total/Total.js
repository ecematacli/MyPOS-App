import React, { Fragment } from 'react';
import clsx from 'clsx';
import { Typography, Divider, Button } from '@material-ui/core';

import styles from './styles';
import useInputState from '../../../../../../common/hooks/useInputState';

const Total = ({ total, tax, lastPrice, handleDiscountChange }) => {
  const classes = styles();
  const [discountInput, setDiscountInput] = useInputState('');

  const handleFormSubmit = e => {
    e.preventDefault();
    handleDiscountChange(discountInput);
  };

  return (
    <Fragment>
      <div className={classes.totalSection}>
        <Typography>Sub-Total</Typography>
        <Typography>{total - tax}</Typography>
      </div>
      <div className={classes.totalSection}>
        <Typography>Tax</Typography>
        <Typography>{tax}</Typography>
      </div>
      <div className={classes.totalSection}>
        <Typography>Discount</Typography>
        <form onSubmit={handleFormSubmit}>
          <input
            className={classes.discountInput}
            value={discountInput}
            onChange={setDiscountInput}
          />
        </form>
      </div>
      <Divider className={classes.totalDivider} />
      <div className={clsx(classes.totalSection, classes.totalAmount)}>
        <Typography>Total</Typography>
        <Typography>{lastPrice}</Typography>
      </div>
      <div className={classes.paymentBtnContainer}>
        <Button className={classes.paymentButton} fullWidth variant="contained">
          <div className={classes.paymentBtnTextHolder}>
            <Typography className={classes.paymentBtnTxt}>
              Complete Payment
            </Typography>
            <Typography className={classes.paymentBtnTxt}>
              {lastPrice}
            </Typography>
          </div>
        </Button>
      </div>
    </Fragment>
  );
};

export default Total;
